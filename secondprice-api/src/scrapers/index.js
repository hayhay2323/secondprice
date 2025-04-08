/**
 * 爬蟲管理器
 * 統一管理多個平台的爬蟲
 */

const CarousellScraper = require('./carousell');
const FacebookMarketplaceScraper = require('./facebook');

/**
 * 爬蟲管理器類
 */
class ScraperManager {
  constructor(options = {}) {
    this.scrapers = {};
    
    // 初始化各平台爬蟲
    this.registerScraper('carousell', new CarousellScraper(options.carousell || {}));
    this.registerScraper('facebook', new FacebookMarketplaceScraper(options.facebook || {}));
    
    // 可以在這裡添加更多平台爬蟲的初始化
    
    this.log('ScraperManager initialized');
  }
  
  /**
   * 註冊爬蟲
   * @param {string} platform - 平台名稱
   * @param {BaseScraper} scraper - 爬蟲實例
   */
  registerScraper(platform, scraper) {
    this.scrapers[platform] = scraper;
    this.log(`Registered ${platform} scraper`);
  }
  
  /**
   * 獲取爬蟲
   * @param {string} platform - 平台名稱
   * @returns {BaseScraper|null} - 爬蟲實例
   */
  getScraper(platform) {
    return this.scrapers[platform] || null;
  }
  
  /**
   * 獲取所有爬蟲
   * @returns {Object} - 所有爬蟲實例
   */
  getAllScrapers() {
    return this.scrapers;
  }
  
  /**
   * 在指定平台上搜索商品
   * @param {string} platform - 平台名稱 
   * @param {string} keyword - 搜索關鍵詞
   * @param {Object} options - 搜索選項
   * @returns {Promise<Array>} - 搜索結果
   */
  async searchPlatform(platform, keyword, options = {}) {
    try {
      const scraper = this.getScraper(platform);
      if (!scraper) {
        throw new Error(`Scraper for platform "${platform}" not found`);
      }
      
      this.log(`Searching for "${keyword}" on ${platform}...`);
      return await scraper.search(keyword, options);
    } catch (error) {
      this.handleError(error, `searchPlatform-${platform}-${keyword}`);
      return [];
    }
  }
  
  /**
   * 在所有平台上搜索商品
   * @param {string} keyword - 搜索關鍵詞 
   * @param {Object} options - 搜索選項
   * @returns {Promise<Object>} - 各平台搜索結果
   */
  async searchAll(keyword, options = {}) {
    try {
      this.log(`Searching for "${keyword}" on all platforms...`);
      
      const { platforms = Object.keys(this.scrapers), limit = 20 } = options;
      const results = {};
      
      // 並行搜索各平台
      const searchPromises = platforms.map(platform => 
        this.searchPlatform(platform, keyword, { ...options, limit })
          .then(items => {
            results[platform] = items;
            this.log(`Found ${items.length} items on ${platform}`);
          })
          .catch(error => {
            this.handleError(error, `searchAll-${platform}`);
            results[platform] = [];
          })
      );
      
      await Promise.all(searchPromises);
      return results;
    } catch (error) {
      this.handleError(error, `searchAll-${keyword}`);
      return {};
    }
  }
  
  /**
   * 在所有平台上搜索並合併結果
   * @param {string} keyword - 搜索關鍵詞
   * @param {Object} options - 搜索選項 
   * @returns {Promise<Array>} - 合併後的結果
   */
  async searchAndMerge(keyword, options = {}) {
    try {
      const results = await this.searchAll(keyword, options);
      
      // 合併各平台結果
      let mergedResults = [];
      for (const platform in results) {
        mergedResults = mergedResults.concat(results[platform]);
      }
      
      // 根據價格排序（可選）
      if (options.sortBy === 'price') {
        mergedResults.sort((a, b) => {
          if (a.price === null) return 1;
          if (b.price === null) return -1;
          return options.sortOrder === 'desc' ? b.price - a.price : a.price - b.price;
        });
      }
      
      // 截取指定數量
      if (options.totalLimit && mergedResults.length > options.totalLimit) {
        mergedResults = mergedResults.slice(0, options.totalLimit);
      }
      
      this.log(`Merged results: ${mergedResults.length} items`);
      return mergedResults;
    } catch (error) {
      this.handleError(error, `searchAndMerge-${keyword}`);
      return [];
    }
  }
  
  /**
   * 獲取商品詳情
   * @param {string} platform - 平台名稱 
   * @param {string} url - 商品URL
   * @returns {Promise<Object>} - 商品詳情
   */
  async getProductDetails(platform, url) {
    try {
      const scraper = this.getScraper(platform);
      if (!scraper) {
        throw new Error(`Scraper for platform "${platform}" not found`);
      }
      
      this.log(`Getting product details from ${platform}: ${url}`);
      return await scraper.getProductDetails(url);
    } catch (error) {
      this.handleError(error, `getProductDetails-${platform}-${url}`);
      throw error;
    }
  }
  
  /**
   * 關閉所有爬蟲
   * @returns {Promise<void>}
   */
  async close() {
    try {
      this.log('Closing all scrapers...');
      
      for (const platform in this.scrapers) {
        const scraper = this.scrapers[platform];
        if (typeof scraper.closeBrowser === 'function') {
          await scraper.closeBrowser();
        }
      }
      
      this.log('All scrapers closed');
    } catch (error) {
      this.handleError(error, 'close');
    }
  }
  
  /**
   * 記錄日誌
   * @param {string} message - 日誌信息
   * @param {string} level - 日誌等級
   */
  log(message, level = 'info') {
    const timestamp = new Date().toISOString();
    console[level](`[${timestamp}] [ScraperManager] [${level.toUpperCase()}] ${message}`);
  }
  
  /**
   * 處理錯誤
   * @param {Error} error - 錯誤對象
   * @param {string} context - 錯誤上下文
   */
  handleError(error, context) {
    this.log(`Error in ${context}: ${error.message}`, 'error');
    if (error.stack) {
      this.log(`Stack: ${error.stack}`, 'debug');
    }
  }
}

module.exports = ScraperManager; 