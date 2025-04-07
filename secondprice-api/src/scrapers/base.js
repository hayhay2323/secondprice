/**
 * 基礎爬蟲類
 * 提供通用的爬蟲方法和錯誤處理
 */
class BaseScraper {
  constructor(options = {}) {
    this.name = options.name || 'unnamed-scraper';
    this.baseUrl = options.baseUrl || '';
    this.defaultHeaders = {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      ...options.headers
    };
    this.timeout = options.timeout || 30000; // 30秒超時
    this.retryCount = options.retryCount || 3;
    this.retryDelay = options.retryDelay || 2000; // 2秒延遲
  }

  /**
   * 等待指定的毫秒數
   * @param {number} ms - 等待的毫秒數
   * @returns {Promise} - 等待完成的Promise
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * 將數據規格化為統一格式
   * @param {Object} item - 爬取的原始數據
   * @returns {Object} - 規格化後的數據
   */
  normalizeItem(item) {
    return {
      id: item.id || `${this.name}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: item.title || '',
      description: item.description || '',
      price: item.price || null,
      currency: item.currency || 'HKD',
      condition: item.condition || 'unknown',
      category: item.category || 'unknown',
      source: this.name,
      url: item.url || '',
      images: item.images || [],
      createdAt: item.createdAt || new Date().toISOString(),
      metadata: item.metadata || {}
    };
  }

  /**
   * 記錄爬蟲信息
   * @param {string} message - 日誌信息
   * @param {string} level - 日誌等級
   */
  log(message, level = 'info') {
    const timestamp = new Date().toISOString();
    console[level](`[${timestamp}] [${this.name}] [${level.toUpperCase()}] ${message}`);
  }

  /**
   * 錯誤處理
   * @param {Error} error - 錯誤對象
   * @param {string} context - 錯誤上下文
   */
  handleError(error, context) {
    this.log(`Error in ${context}: ${error.message}`, 'error');
    if (error.stack) {
      this.log(`Stack: ${error.stack}`, 'debug');
    }
  }

  /**
   * 執行帶重試機制的任務
   * @param {Function} task - 要執行的任務函數
   * @param {string} name - 任務名稱
   * @returns {Promise} - 任務結果的Promise
   */
  async withRetry(task, name) {
    let lastError;
    for (let attempt = 1; attempt <= this.retryCount; attempt++) {
      try {
        this.log(`Attempt ${attempt}/${this.retryCount} for task: ${name}`);
        return await task();
      } catch (error) {
        lastError = error;
        this.log(`Attempt ${attempt} failed: ${error.message}`, 'warn');
        
        if (attempt < this.retryCount) {
          const delay = this.retryDelay * attempt;
          this.log(`Retrying in ${delay}ms...`);
          await this.sleep(delay);
        }
      }
    }
    
    this.handleError(lastError, `Task ${name} failed after ${this.retryCount} attempts`);
    throw lastError;
  }
}

module.exports = BaseScraper; 