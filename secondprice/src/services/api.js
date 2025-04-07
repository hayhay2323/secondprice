import axios from 'axios';

// 創建axios實例
const api = axios.create({
  baseURL: process.env.API_URL,
  timeout: 30000, // 30秒超時
  headers: {
    'Content-Type': 'application/json',
  },
});

// 搜索二手商品
export const searchProducts = async (keyword, options = {}) => {
  try {
    const { platform, limit = 20, sort = 'price', sortOrder = 'asc' } = options;
    
    const params = {
      keyword,
      limit,
      sort,
      sortOrder,
    };
    
    // 如果指定了平台，添加到參數中
    if (platform) {
      params.platform = platform;
    }
    
    const response = await api.get('/api/scrapers/search', { params });
    return response.data;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};

// 獲取產品詳情
export const getProductDetails = async (platform, url) => {
  try {
    const params = {
      platform,
      url,
    };
    
    const response = await api.get('/api/scrapers/product', { params });
    return response.data;
  } catch (error) {
    console.error('Error getting product details:', error);
    throw error;
  }
};

export default api; 