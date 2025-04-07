const axios = require('axios');
const cheerio = require('cheerio');
const BaseScraper = require('./base');

/**
 * Carousell平台爬蟲
 */
class CarousellScraper extends BaseScraper {
  constructor(options = {}) {
    super({
      name: 'carousell',
      baseUrl: 'https://hk.carousell.com',
      ...options
    });
  }

  /**
   * 搜索商品
   * @param {string} keyword - 搜索關鍵詞
   * @param {Object} options - 搜索選項
   * @returns {Promise<Array>} - 搜索結果
   */
  async search(keyword, options = {}) {
    try {
      const { limit = 20, sort = 'popular', category = '' } = options;
      
      // 構建搜索URL
      let searchUrl = `${this.baseUrl}/search/${encodeURIComponent(keyword)}`;
      if (category) {
        searchUrl += `/c/${category}`;
      }
      searchUrl += `?sort_by=${sort}`;
      
      this.log(`Searching for "${keyword}" on Carousell...`);
      
      // 發送HTTP請求
      const response = await this.withRetry(async () => {
        return await axios.get(searchUrl, {
          headers: this.defaultHeaders,
          timeout: this.timeout
        });
      }, `carousell-search-${keyword}`);
      
      // 解析HTML
      const $ = cheerio.load(response.data);
      const products = [];
      
      // 提取商品信息 (選擇器可能需要根據實際HTML結構調整)
      $('.product-card').each((index, element) => {
        if (index >= limit) return false;
        
        const $el = $(element);
        
        // 解析商品詳情
        const title = $el.find('.product-title').text().trim();
        const priceText = $el.find('.product-price').text().trim();
        const price = this.parsePrice(priceText);
        const url = $el.find('a.product-link').attr('href');
        const fullUrl = url.startsWith('/') ? `${this.baseUrl}${url}` : url;
        const imageUrl = $el.find('.product-image img').attr('src') || '';
        
        // 規格化數據
        const item = this.normalizeItem({
          title,
          price,
          currency: 'HKD',
          url: fullUrl,
          images: imageUrl ? [imageUrl] : [],
          metadata: {
            platform: 'carousell',
            originalPrice: priceText
          }
        });
        
        products.push(item);
      });
      
      this.log(`Found ${products.length} products for "${keyword}"`);
      return products;
    } catch (error) {
      this.handleError(error, `search-${keyword}`);
      throw error;
    }
  }
  
  /**
   * 解析價格文本
   * @param {string} priceText - 價格文本
   * @returns {number|null} - 解析後的價格數字
   */
  parsePrice(priceText) {
    if (!priceText) return null;
    
    // 處理價格範圍 (例如: "HK$100 - HK$200")
    if (priceText.includes('-')) {
      const parts = priceText.split('-');
      const lowerPrice = this.parsePrice(parts[0]);
      return lowerPrice; // 返回較低價格
    }
    
    // 移除貨幣符號和非數字字符
    const numericPrice = priceText.replace(/[^0-9,.]/g, '');
    
    // 轉換為數字
    try {
      return parseFloat(numericPrice.replace(/,/g, ''));
    } catch (e) {
      return null;
    }
  }
  
  /**
   * 獲取商品詳情
   * @param {string} url - 商品URL
   * @returns {Promise<Object>} - 商品詳情
   */
  async getProductDetails(url) {
    try {
      this.log(`Fetching product details from ${url}`);
      
      // 發送HTTP請求
      const response = await this.withRetry(async () => {
        return await axios.get(url, {
          headers: this.defaultHeaders,
          timeout: this.timeout
        });
      }, `carousell-details-${url}`);
      
      // 解析HTML
      const $ = cheerio.load(response.data);
      
      // 提取詳細信息
      const title = $('.product-detail-title').text().trim();
      const description = $('.product-detail-description').text().trim();
      const priceText = $('.product-detail-price').text().trim();
      const price = this.parsePrice(priceText);
      const condition = $('.product-detail-condition').text().trim();
      const category = $('.product-detail-category').text().trim();
      
      // 提取圖片
      const images = [];
      $('.product-detail-images img').each((index, img) => {
        const src = $(img).attr('src');
        if (src) images.push(src);
      });
      
      // 規格化並返回數據
      return this.normalizeItem({
        title,
        description,
        price,
        condition,
        category,
        url,
        images,
        metadata: {
          platform: 'carousell',
          originalPrice: priceText
        }
      });
    } catch (error) {
      this.handleError(error, `getProductDetails-${url}`);
      throw error;
    }
  }
}

module.exports = CarousellScraper; 