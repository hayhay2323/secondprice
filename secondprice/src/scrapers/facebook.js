const puppeteer = require('puppeteer');
const BaseScraper = require('./base');

/**
 * Facebook Marketplace爬蟲
 * 使用Puppeteer進行瀏覽器模擬
 */
class FacebookMarketplaceScraper extends BaseScraper {
  constructor(options = {}) {
    super({
      name: 'facebook-marketplace',
      baseUrl: 'https://www.facebook.com/marketplace',
      ...options
    });
    
    this.browser = null;
    this.isLoggedIn = false;
    this.loginCredentials = options.credentials || null;
  }
  
  /**
   * 初始化瀏覽器
   * @returns {Promise<void>}
   */
  async initBrowser() {
    if (this.browser) return;
    
    this.log('Initializing browser...');
    this.browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu'
      ]
    });
  }
  
  /**
   * 關閉瀏覽器
   * @returns {Promise<void>}
   */
  async closeBrowser() {
    if (this.browser) {
      this.log('Closing browser...');
      await this.browser.close();
      this.browser = null;
    }
  }
  
  /**
   * 登入Facebook
   * @returns {Promise<boolean>}
   */
  async login() {
    if (this.isLoggedIn) return true;
    if (!this.loginCredentials) {
      this.log('No login credentials provided. Some features may be limited.', 'warn');
      return false;
    }
    
    try {
      await this.initBrowser();
      
      const page = await this.browser.newPage();
      await page.setViewport({ width: 1280, height: 800 });
      await page.setUserAgent(this.defaultHeaders['User-Agent']);
      
      this.log('Navigating to Facebook login page...');
      await page.goto('https://www.facebook.com/login', { 
        waitUntil: 'networkidle2',
        timeout: this.timeout 
      });
      
      // 同意Cookie（如果出現）
      const cookieButton = await page.$('button[data-testid="cookie-policy-manage-dialog-accept-button"]');
      if (cookieButton) {
        await cookieButton.click();
        await page.waitForNavigation({ waitUntil: 'networkidle2' });
      }
      
      // 填寫登入表單
      this.log('Filling login credentials...');
      await page.type('#email', this.loginCredentials.email);
      await page.type('#pass', this.loginCredentials.password);
      
      // 點擊登入按鈕
      await Promise.all([
        page.click('#loginbutton'),
        page.waitForNavigation({ waitUntil: 'networkidle2' })
      ]);
      
      // 檢查登入是否成功
      const currentUrl = page.url();
      this.isLoggedIn = !currentUrl.includes('login') && !currentUrl.includes('checkpoint');
      
      if (this.isLoggedIn) {
        this.log('Successfully logged in to Facebook');
      } else {
        this.log('Failed to login. Check your credentials or there might be a security check.', 'error');
      }
      
      await page.close();
      return this.isLoggedIn;
    } catch (error) {
      this.handleError(error, 'login');
      return false;
    }
  }
  
  /**
   * 搜索商品
   * @param {string} keyword - 搜索關鍵詞
   * @param {Object} options - 搜索選項
   * @returns {Promise<Array>} - 搜索結果
   */
  async search(keyword, options = {}) {
    try {
      const { limit = 20, location = 'hongkong' } = options;
      
      await this.initBrowser();
      
      // 嘗試登入（非必須）
      if (this.loginCredentials && !this.isLoggedIn) {
        await this.login();
      }
      
      const page = await this.browser.newPage();
      await page.setViewport({ width: 1280, height: 800 });
      await page.setUserAgent(this.defaultHeaders['User-Agent']);
      
      // 構建搜索URL
      const searchUrl = `${this.baseUrl}/search?query=${encodeURIComponent(keyword)}&exact=false`;
      
      this.log(`Searching for "${keyword}" on Facebook Marketplace...`);
      await page.goto(searchUrl, { 
        waitUntil: 'networkidle2',
        timeout: this.timeout 
      });
      
      // 處理Cookie同意對話框（如果出現）
      const cookieButton = await page.$('button[data-testid="cookie-policy-manage-dialog-accept-button"]');
      if (cookieButton) {
        await cookieButton.click();
        await page.waitForTimeout(1000);
      }
      
      // 等待商品列表加載
      await page.waitForSelector('[aria-label="Marketplace items"]', { timeout: this.timeout });
      
      // 滾動頁面以加載更多商品
      this.log('Scrolling to load more items...');
      await this.autoScroll(page, limit);
      
      // 提取商品信息
      this.log('Extracting product information...');
      const products = await page.evaluate((limit) => {
        const items = [];
        const productCards = document.querySelectorAll('[aria-label="Marketplace items"] > div > div');
        
        for (let i = 0; i < Math.min(productCards.length, limit); i++) {
          const card = productCards[i];
          
          // 提取URL
          const linkElement = card.querySelector('a[href*="/marketplace/item/"]');
          if (!linkElement) continue;
          
          const url = linkElement.href;
          
          // 提取標題
          const titleElement = card.querySelector('span.a8c37x1j');
          const title = titleElement ? titleElement.textContent.trim() : '';
          
          // 提取價格
          const priceElement = card.querySelector('span.d2edcug0');
          const priceText = priceElement ? priceElement.textContent.trim() : '';
          
          // 提取圖片
          const imageElement = card.querySelector('img');
          const image = imageElement ? imageElement.src : '';
          
          // 提取位置
          const locationElement = card.querySelector('span.a8c37x1j + span.a8c37x1j');
          const location = locationElement ? locationElement.textContent.trim() : '';
          
          if (url && title) {
            items.push({
              title,
              priceText,
              url,
              image,
              location,
              platform: 'facebook'
            });
          }
        }
        
        return items;
      }, limit);
      
      await page.close();
      
      // 處理並規格化數據
      const normalizedProducts = products.map(item => {
        return this.normalizeItem({
          title: item.title,
          price: this.parsePrice(item.priceText),
          url: item.url,
          images: item.image ? [item.image] : [],
          metadata: {
            platform: 'facebook',
            originalPrice: item.priceText,
            location: item.location
          }
        });
      });
      
      this.log(`Found ${normalizedProducts.length} products for "${keyword}"`);
      return normalizedProducts;
    } catch (error) {
      this.handleError(error, `search-${keyword}`);
      return [];
    }
  }
  
  /**
   * 獲取商品詳情
   * @param {string} url - 商品URL
   * @returns {Promise<Object>} - 商品詳情
   */
  async getProductDetails(url) {
    try {
      await this.initBrowser();
      
      const page = await this.browser.newPage();
      await page.setViewport({ width: 1280, height: 800 });
      await page.setUserAgent(this.defaultHeaders['User-Agent']);
      
      this.log(`Fetching product details from ${url}`);
      await page.goto(url, { 
        waitUntil: 'networkidle2',
        timeout: this.timeout 
      });
      
      // 等待商品詳情加載
      await page.waitForSelector('[data-pagelet="MainFeed"]', { timeout: this.timeout });
      
      // 提取商品詳情
      const productDetails = await page.evaluate(() => {
        // 提取標題
        const titleElement = document.querySelector('h1.a8c37x1j');
        const title = titleElement ? titleElement.textContent.trim() : '';
        
        // 提取價格
        const priceElement = document.querySelector('span.d2edcug0');
        const priceText = priceElement ? priceElement.textContent.trim() : '';
        
        // 提取描述
        const descriptionElement = document.querySelector('div[data-pagelet="MainFeed"] span.d2edcug0.hpfvmrgz');
        const description = descriptionElement ? descriptionElement.textContent.trim() : '';
        
        // 提取位置
        const locationElement = document.querySelector('[data-pagelet="MainFeed"] a.a8c37x1j[href*="facebook.com/marketplace/"]');
        const location = locationElement ? locationElement.textContent.trim() : '';
        
        // 提取圖片
        const images = [];
        const imageElements = document.querySelectorAll('[data-pagelet="MainFeed"] img');
        imageElements.forEach(img => {
          if (img.src && !images.includes(img.src)) {
            images.push(img.src);
          }
        });
        
        // 提取類別
        const categoryElement = document.querySelector('[data-pagelet="MainFeed"] a.a8c37x1j[href*="/category/"]');
        const category = categoryElement ? categoryElement.textContent.trim() : '';
        
        return {
          title,
          priceText,
          description,
          location,
          images,
          category
        };
      });
      
      await page.close();
      
      // 規格化並返回數據
      return this.normalizeItem({
        title: productDetails.title,
        description: productDetails.description,
        price: this.parsePrice(productDetails.priceText),
        category: productDetails.category,
        url,
        images: productDetails.images,
        metadata: {
          platform: 'facebook',
          originalPrice: productDetails.priceText,
          location: productDetails.location
        }
      });
    } catch (error) {
      this.handleError(error, `getProductDetails-${url}`);
      throw error;
    }
  }
  
  /**
   * 自動滾動頁面
   * @param {Page} page - Puppeteer頁面對象
   * @param {number} itemCount - 目標商品數量
   * @returns {Promise<void>}
   */
  async autoScroll(page, itemCount) {
    await page.evaluate(async (itemCount) => {
      const getItemCount = () => document.querySelectorAll('[aria-label="Marketplace items"] > div > div').length;
      
      await new Promise((resolve) => {
        let totalHeight = 0;
        let timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, 100);
          totalHeight += 100;
          
          if (getItemCount() >= itemCount || totalHeight >= scrollHeight * 3) {
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    }, itemCount);
    
    // 等待一下確保內容已加載
    await page.waitForTimeout(1000);
  }
  
  /**
   * 解析價格文本
   * @param {string} priceText - 價格文本
   * @returns {number|null} - 解析後的價格數字
   */
  parsePrice(priceText) {
    if (!priceText) return null;
    
    // 移除貨幣符號和非數字字符
    const numericPrice = priceText.replace(/[^0-9,.]/g, '');
    
    // 轉換為數字
    try {
      return parseFloat(numericPrice.replace(/,/g, ''));
    } catch (e) {
      return null;
    }
  }
}

module.exports = FacebookMarketplaceScraper; 