const express = require('express');
const router = express.Router();
const ScraperManager = require('../scrapers');

// 初始化爬蟲管理器
let scraperManager = null;

/**
 * 獲取爬蟲管理器實例
 * @returns {ScraperManager} - 爬蟲管理器實例
 */
function getScraperManager() {
  if (!scraperManager) {
    scraperManager = new ScraperManager({
      carousell: {
        // Carousell爬蟲特定配置
      },
      facebook: {
        // Facebook爬蟲特定配置
        // credentials: { email: 'your-email', password: 'your-password' } // 登入憑證（如需登入）
      }
    });
  }
  return scraperManager;
}

/**
 * 搜索API路由
 * GET /api/scrapers/search
 */
router.get('/search', async (req, res, next) => {
  try {
    const { keyword, platform, limit = 20, sort = 'price', sortOrder = 'asc' } = req.query;
    
    // 關鍵詞必須提供
    if (!keyword) {
      return res.status(400).json({ error: 'Keyword is required' });
    }
    
    const manager = getScraperManager();
    let results;
    
    // 如果指定了平台，則只搜索該平台
    if (platform) {
      results = await manager.searchPlatform(platform, keyword, { 
        limit: parseInt(limit, 10),
        sort
      });
      
      return res.status(200).json({
        success: true,
        platform,
        keyword,
        count: results.length,
        results
      });
    } 
    // 否則搜索所有平台並合併結果
    else {
      results = await manager.searchAndMerge(keyword, { 
        limit: parseInt(limit, 10), 
        totalLimit: parseInt(limit, 10),
        sortBy: sort,
        sortOrder
      });
      
      return res.status(200).json({
        success: true,
        keyword,
        count: results.length,
        results
      });
    }
  } catch (error) {
    next(error);
  }
});

/**
 * 產品詳情API路由
 * GET /api/scrapers/product
 */
router.get('/product', async (req, res, next) => {
  try {
    const { platform, url } = req.query;
    
    // 平台和URL必須提供
    if (!platform) {
      return res.status(400).json({ error: 'Platform is required' });
    }
    
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }
    
    const manager = getScraperManager();
    
    // 獲取產品詳情
    const productDetails = await manager.getProductDetails(platform, url);
    
    return res.status(200).json({
      success: true,
      platform,
      product: productDetails
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router; 