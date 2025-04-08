import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// 骨架屏組件
const ProductSkeleton = () => (
  <div className="border rounded-lg overflow-hidden shadow-sm bg-white">
    <div className="relative pt-[75%] bg-gray-200 animate-pulse"></div>
    <div className="p-4">
      <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
      <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3 mb-4"></div>
      <div className="flex justify-between items-center mb-4">
        <div className="h-5 bg-gray-200 rounded animate-pulse w-1/3"></div>
        <div className="h-4 bg-gray-200 rounded-full animate-pulse w-1/4"></div>
      </div>
      <div className="h-9 bg-gray-200 rounded animate-pulse"></div>
    </div>
  </div>
);

// 產品卡片組件
const ProductCard = ({ product, onCompare, isCompared }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all bg-white relative group"
  >
    {product.source === 'carousell' && (
      <span className="absolute top-2 left-2 z-10 bg-primary-500 text-white px-2 py-1 text-xs rounded-full">
        Carousell
      </span>
    )}
    {product.source === 'facebook-marketplace' && (
      <span className="absolute top-2 left-2 z-10 bg-blue-500 text-white px-2 py-1 text-xs rounded-full">
        FB Market
      </span>
    )}
    <div className="relative pt-[75%] bg-gray-100 overflow-hidden">
      {product.images && product.images.length > 0 ? (
        <img
          src={product.images[0]}
          alt={product.title}
          className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      ) : (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      )}
      <button 
        onClick={() => onCompare(product)} 
        className={`absolute top-2 right-2 p-2 rounded-full ${isCompared ? 'bg-primary-500 text-white' : 'bg-white/80 text-gray-600 hover:bg-primary-50'} transition-colors`}
        title={isCompared ? "從比較中移除" : "添加到比較"}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      </button>
    </div>
    
    <div className="p-4">
      <h3 className="font-medium text-lg mb-2 line-clamp-2 h-12" title={product.title}>
        {product.title}
      </h3>
      
      <div className="flex justify-between items-center mb-3">
        <p className="text-primary-600 font-bold text-lg">
          {product.price ? `HK$${product.price.toLocaleString()}` : '價格未知'}
        </p>
      </div>
      
      <div className="flex space-x-2">
        <a
          href={product.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center px-3 py-2 bg-secondary-500 text-white rounded-md hover:bg-secondary-600 transition-colors"
        >
          查看詳情
        </a>
      </div>
    </div>
  </motion.div>
);

// 比較抽屜組件
const CompareDrawer = ({ products, onClose, onRemove }) => {
  if (products.length === 0) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-white shadow-lg rounded-t-xl z-40 border-t border-gray-200"
    >
      <div className="container-custom py-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">比較選擇的商品（{products.length}）</h3>
          <div className="flex space-x-2">
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="flex overflow-x-auto pb-4 space-x-4">
          {products.map(product => (
            <div key={product.id} className="flex-shrink-0 w-48 border rounded-lg overflow-hidden">
              <div className="relative pt-[75%] bg-gray-100">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                <button
                  onClick={() => onRemove(product)}
                  className="absolute top-1 right-1 p-1 rounded-full bg-white/80 text-gray-600 hover:bg-red-50 hover:text-red-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-2">
                <h4 className="text-sm font-medium line-clamp-1">{product.title}</h4>
                <p className="text-primary-600 font-bold text-sm">
                  {product.price ? `HK$${product.price.toLocaleString()}` : '價格未知'}
                </p>
                <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">
                  {product.source}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function SearchPage() {
  const router = useRouter();
  const { keyword, platform, sort, sortOrder } = router.query;

  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [sortBy, setSortBy] = useState('price');
  const [sortDir, setSortDir] = useState('asc');
  const [compareProducts, setCompareProducts] = useState([]);
  const [showCompare, setShowCompare] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [maxPrice, setMaxPrice] = useState(10000);

  // 搜索商品
  async function searchProducts(params) {
    try {
      setLoading(true);
      setError(null);

      // 構建API URL
      const queryParams = new URLSearchParams();
      queryParams.append('keyword', params.keyword);
      if (params.platform && params.platform !== 'all') {
        queryParams.append('platform', params.platform);
      }
      queryParams.append('sort', params.sort || 'price');
      queryParams.append('sortOrder', params.sortOrder || 'asc');
      queryParams.append('limit', '40');

      // 發送API請求
      const response = await fetch(`/api/scrapers/search?${queryParams.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to search products');
      }

      // 找出最大價格來設定篩選器範圍
      if (data.results && data.results.length > 0) {
        const prices = data.results.map(p => p.price).filter(p => p !== null);
        if (prices.length > 0) {
          const highestPrice = Math.ceil(Math.max(...prices) / 1000) * 1000;
          setMaxPrice(highestPrice);
          setPriceRange([0, highestPrice]);
        }
      }

      setSearchResults(data.results || []);
    } catch (err) {
      console.error('Search error:', err);
      setError(err.message || 'An error occurred while searching');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }

  // 處理表單提交
  function handleSubmit(e) {
    e.preventDefault();
    if (!searchKeyword.trim()) return;

    // 更新URL參數
    const query = {
      keyword: searchKeyword,
    };
    if (selectedPlatform !== 'all') {
      query.platform = selectedPlatform;
    }
    query.sort = sortBy;
    query.sortOrder = sortDir;

    router.push({
      pathname: '/search',
      query,
    });
  }

  // 處理比較功能
  function handleCompare(product) {
    setCompareProducts(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      } else {
        if (prev.length >= 4) {
          // 限制最多比較4個產品
          return [...prev.slice(1), product];
        }
        return [...prev, product];
      }
    });
  }

  // 篩選結果
  const filteredResults = searchResults.filter(product => {
    // 價格範圍篩選
    if (product.price === null) return true;
    return product.price >= priceRange[0] && product.price <= priceRange[1];
  });

  // 當比較產品列表改變時，更新顯示狀態
  useEffect(() => {
    setShowCompare(compareProducts.length > 0);
  }, [compareProducts]);

  // 處理排序變化
  function handleSortChange(e) {
    setSortBy(e.target.value);
  }

  // 處理排序方向變化
  function handleSortDirChange(e) {
    setSortDir(e.target.value);
  }

  // 處理平台變化
  function handlePlatformChange(e) {
    setSelectedPlatform(e.target.value);
  }

  // 初始化時從URL讀取參數並搜索
  useEffect(() => {
    if (keyword) {
      setSearchKeyword(keyword);
      setSelectedPlatform(platform || 'all');
      setSortBy(sort || 'price');
      setSortDir(sortOrder || 'asc');

      searchProducts({
        keyword,
        platform,
        sort: sort || 'price',
        sortOrder: sortOrder || 'asc'
      });
    }
  }, [keyword, platform, sort, sortOrder]);

  // 在 searchResults 變化時添加動畫
  useEffect(() => {
    if (searchResults.length > 0) {
      // 在 useEffect 內部動態導入並執行
      if (typeof window !== 'undefined') {
        import('animejs').then(({ default: anime }) => {
          if (anime) {
            anime({
              targets: '.search-result-item',
              translateY: [20, 0],
              opacity: [0, 1],
              delay: anime.stagger(50),
              duration: 400,
              easing: 'easeOutQuad'
            });
          }
        });
      }
    }
  }, [searchResults]); // 移除 anime 依賴

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-3">二手商品搜索</h1>
            <p className="text-gray-600">從多個平台比較二手商品價格，找到最划算的選擇</p>
          </div>

          {/* 搜索表單 */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-grow">
                  <input
                    type="text"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    placeholder="輸入關鍵詞搜索二手商品..."
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <select
                    value={selectedPlatform}
                    onChange={handlePlatformChange}
                    className="px-4 py-3 rounded-md border border-gray-300"
                  >
                    <option value="all">所有平台</option>
                    <option value="carousell">Carousell</option>
                    <option value="facebook">Facebook</option>
                  </select>
                  
                  <select
                    value={sortBy}
                    onChange={handleSortChange}
                    className="px-4 py-3 rounded-md border border-gray-300"
                  >
                    <option value="price">價格</option>
                    <option value="popular">熱度</option>
                    <option value="recent">最新</option>
                  </select>
                  
                  <select
                    value={sortDir}
                    onChange={handleSortDirChange}
                    className="px-4 py-3 rounded-md border border-gray-300"
                  >
                    <option value="asc">升序</option>
                    <option value="desc">降序</option>
                  </select>
                  
                  <button
                    type="submit"
                    className="btn btn-primary py-3 px-6"
                    disabled={loading}
                  >
                    {loading ? '搜索中...' : '搜索'}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* 搜索結果區域 */}
          <div className="grid grid-cols-12 gap-6">
            {/* 篩選器側邊欄 */}
            {searchResults.length > 0 && !loading && (
              <div className="col-span-12 md:col-span-3 lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm p-5 sticky top-24">
                  <h3 className="font-bold text-lg mb-4">篩選</h3>
                  
                  <div className="mb-6">
                    <h4 className="font-medium mb-2">價格範圍</h4>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500">HK${priceRange[0]}</span>
                      <span className="text-sm text-gray-500">HK${priceRange[1]}</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={maxPrice}
                      value={priceRange[1]}
                      onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">平台</h4>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="platform-filter"
                          value="all"
                          checked={selectedPlatform === 'all'}
                          onChange={handlePlatformChange}
                          className="mr-2"
                        />
                        所有平台
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="platform-filter"
                          value="carousell"
                          checked={selectedPlatform === 'carousell'}
                          onChange={handlePlatformChange}
                          className="mr-2"
                        />
                        Carousell
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="platform-filter"
                          value="facebook"
                          checked={selectedPlatform === 'facebook'}
                          onChange={handlePlatformChange}
                          className="mr-2"
                        />
                        Facebook Marketplace
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 搜索結果 */}
            <div className={`col-span-12 ${searchResults.length > 0 && !loading ? 'md:col-span-9 lg:col-span-10' : ''}`}>
              {error && (
                <div className="p-4 mb-6 bg-red-100 text-red-700 rounded-lg">
                  <p>{error}</p>
                </div>
              )}

              {loading ? (
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    正在搜索 "{keyword}" 的結果...
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Array(8).fill(0).map((_, index) => (
                      <ProductSkeleton key={index} />
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {keyword && (
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold">
                        "{keyword}" 的搜索結果 ({filteredResults.length})
                      </h2>
                      {compareProducts.length > 0 && (
                        <button
                          onClick={() => setShowCompare(!showCompare)}
                          className="flex items-center text-primary-600 hover:text-primary-700"
                        >
                          <span>比較 ({compareProducts.length})</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ml-1 transform ${showCompare ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      )}
                    </div>
                  )}

                  {filteredResults.length === 0 && !loading && keyword ? (
                    <div className="p-12 bg-white rounded-lg shadow-sm text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-xl text-gray-600 mb-4">未找到相關商品</p>
                      <p className="text-gray-500 mb-6">請嘗試其他關鍵詞或調整篩選條件</p>
                      <button
                        onClick={() => setPriceRange([0, maxPrice])}
                        className="btn btn-outline"
                      >
                        重置篩選條件
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {filteredResults.map((product) => (
                        <div key={product.id} className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 search-result-item">
                          <ProductCard 
                            product={product} 
                            onCompare={handleCompare}
                            isCompared={compareProducts.some(p => p.id === product.id)}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* 比較抽屜 */}
      {showCompare && (
        <CompareDrawer 
          products={compareProducts} 
          onClose={() => setShowCompare(false)}
          onRemove={product => handleCompare(product)}
        />
      )}

      <Footer />
    </div>
  );
} 