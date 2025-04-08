import ScraperManager from '../../../scrapers';

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
 * 搜索API處理函數
 * @param {object} req - Next.js請求對象
 * @param {object} res - Next.js響應對象
 */
export default async function handler(req, res) {
  // 只允許GET請求
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
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
    console.error('Error in search API:', error.message);
    
    // 返回錯誤響應
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message
    });
  } finally {
    // 在開發階段，可能不關閉爬蟲以提高性能
    // 但在生產環境中應該考慮每次請求後關閉瀏覽器
    // await getScraperManager().close();
  }
} 