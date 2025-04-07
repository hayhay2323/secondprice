import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const SearchResults = ({ 
  results = [], 
  isLoading = false, 
  keyword = '', 
  onSortChange = () => {},
  onFilterChange = () => {}
}) => {
  // 狀態管理
  const [sortOption, setSortOption] = useState('price_asc');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [displayResults, setDisplayResults] = useState([]);
  
  // 獨特平台列表
  const platforms = ['all', ...new Set(results.map(item => item.platform))].filter(Boolean);
  
  // 排序和過濾結果
  useEffect(() => {
    let filtered = [...results];
    
    // 平台過濾
    if (platformFilter !== 'all') {
      filtered = filtered.filter(item => item.platform === platformFilter);
    }
    
    // 排序
    const [sortField, sortDirection] = sortOption.split('_');
    filtered.sort((a, b) => {
      if (sortField === 'price') {
        return sortDirection === 'asc' 
          ? a.price - b.price 
          : b.price - a.price;
      } else if (sortField === 'date') {
        // 假設有日期字段，如果沒有，可以修改或移除
        return sortDirection === 'asc'
          ? new Date(a.date || Date.now()) - new Date(b.date || Date.now())
          : new Date(b.date || Date.now()) - new Date(a.date || Date.now());
      }
      return 0;
    });
    
    setDisplayResults(filtered);
    
    // 通知父組件
    onSortChange(sortOption);
    onFilterChange(platformFilter);
  }, [results, sortOption, platformFilter, onSortChange, onFilterChange]);
  
  // 計算節省金額
  const calculateSavings = (price, originalPrice) => {
    if (!originalPrice || originalPrice <= price) return null;
    
    const savings = originalPrice - price;
    const savingsPercent = Math.round((savings / originalPrice) * 100);
    
    return {
      amount: savings,
      percent: savingsPercent
    };
  };
  
  // 條件渲染函數
  const renderGridView = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {displayResults.map((item, index) => {
        const savings = calculateSavings(item.price, item.originalPrice);
        
        return (
          <motion.div
            key={item.id || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col"
          >
            {/* 圖片容器 */}
            <div className="relative overflow-hidden aspect-square bg-gray-100">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={400}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  unoptimized={true}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </div>
              )}
              
              {/* 平台標籤 */}
              <div className="absolute top-2 left-2 bg-white/80 backdrop-blur-sm rounded-full py-1 px-2 text-xs font-medium text-gray-700 shadow-sm">
                {item.platform}
              </div>
              
              {/* 折扣標籤 */}
              {savings && (
                <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full py-1 px-2 text-xs font-bold shadow-sm">
                  節省 {savings.percent}%
                </div>
              )}
              
              {/* 狀態標籤 */}
              {item.condition && (
                <div className="absolute bottom-2 left-2 bg-primary-500/80 backdrop-blur-sm text-white rounded-full py-1 px-2 text-xs font-medium shadow-sm">
                  {item.condition}
                </div>
              )}
              
              {/* 快速操作按鈕 */}
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
                <button className="bg-white rounded-full p-3 shadow-md hover:shadow-lg transform transition hover:scale-105">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                </button>
                <button className="bg-primary-500 rounded-full p-3 shadow-md hover:shadow-lg transform transition hover:scale-105">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* 內容 */}
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="font-medium text-gray-900 line-clamp-2 mb-1 text-sm sm:text-base" title={item.title}>
                {item.title}
              </h3>
              
              <div className="mt-auto pt-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-lg font-bold text-primary-600">${item.price.toLocaleString()}</span>
                    {item.originalPrice && item.originalPrice > item.price && (
                      <span className="ml-2 text-sm text-gray-500 line-through">${item.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                  
                  {item.location && (
                    <span className="text-xs text-gray-500">{item.location}</span>
                  )}
                </div>
              </div>
            </div>
            
            {/* 連結覆蓋 */}
            <a 
              href={item.url || '#'} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="absolute inset-0 z-10"
              aria-label={`查看 ${item.title}`}
            ></a>
          </motion.div>
        );
      })}
    </div>
  );

  const renderListView = () => (
    <div className="space-y-4">
      {displayResults.map((item, index) => {
        const savings = calculateSavings(item.price, item.originalPrice);
        
        return (
          <motion.div
            key={item.id || index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.03 }}
            className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex"
          >
            {/* 圖片 */}
            <div className="relative w-32 h-32 sm:w-48 sm:h-48 flex-shrink-0 bg-gray-100">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  width={200}
                  height={200}
                  className="object-cover w-full h-full"
                  unoptimized={true}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </div>
              )}
              
              {/* 平台標籤 */}
              <div className="absolute top-2 left-2 bg-white/80 backdrop-blur-sm rounded-full py-1 px-2 text-xs font-medium text-gray-700 shadow-sm">
                {item.platform}
              </div>
              
              {/* 條件標籤 */}
              {item.condition && (
                <div className="absolute bottom-2 left-2 bg-primary-500/80 backdrop-blur-sm text-white rounded-full py-1 px-2 text-xs font-medium shadow-sm">
                  {item.condition}
                </div>
              )}
            </div>
            
            {/* 內容 */}
            <div className="flex-1 p-4 flex flex-col">
              <div className="flex items-start justify-between">
                <h3 className="font-medium text-gray-900 line-clamp-2 text-sm sm:text-base flex-1" title={item.title}>
                  {item.title}
                </h3>
                
                {savings && (
                  <div className="ml-2 flex-shrink-0 bg-red-500 text-white rounded-full py-1 px-2 text-xs font-bold">
                    節省 {savings.percent}%
                  </div>
                )}
              </div>
              
              {item.description && (
                <p className="mt-2 text-xs text-gray-500 line-clamp-2">{item.description}</p>
              )}
              
              <div className="mt-auto pt-3 flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-primary-600">${item.price.toLocaleString()}</span>
                  {item.originalPrice && item.originalPrice > item.price && (
                    <span className="ml-2 text-sm text-gray-500 line-through">${item.originalPrice.toLocaleString()}</span>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  {item.location && (
                    <span className="text-xs text-gray-500">{item.location}</span>
                  )}
                  
                  <div className="flex space-x-1">
                    <button className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-700">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                      </svg>
                    </button>
                    <button className="bg-primary-500 hover:bg-primary-600 rounded-full p-2 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 連結覆蓋 */}
            <a 
              href={item.url || '#'} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="absolute inset-0 z-10"
              aria-label={`查看 ${item.title}`}
            ></a>
          </motion.div>
        );
      })}
    </div>
  );
  
  // 渲染加載狀態
  const renderLoading = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-24 h-24">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-t-primary-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-gray-600 font-medium">搜尋中...</p>
      <p className="text-sm text-gray-500">正在為您尋找「{keyword}」的最佳結果</p>
    </div>
  );
  
  // 渲染空結果
  const renderEmpty = () => (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="rounded-full bg-gray-100 p-6 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">沒有找到相關結果</h3>
      <p className="text-gray-600 max-w-md">
        很抱歉，我們沒有找到與「{keyword}」相關的商品。請嘗試使用不同的關鍵詞，或聯繫我們的AI助手獲取更多幫助。
      </p>
      <div className="mt-6">
        <button className="px-4 py-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors shadow-sm hover:shadow-md">
          詢問 AI 助手
        </button>
      </div>
    </div>
  );
  
  return (
    <div className="bg-gray-50 rounded-xl p-4 md:p-6">
      {/* 頁頭區域 */}
      {!isLoading && displayResults.length > 0 && (
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* 結果計數 */}
          <div>
            <h2 className="text-gray-900 font-bold text-lg">
              {keyword && `「${keyword}」`}搜尋結果
              <span className="ml-2 text-primary-500">{displayResults.length}</span>
            </h2>
            <p className="text-sm text-gray-500">從多個平台為您整合的優質二手產品</p>
          </div>
          
          {/* 控制項 */}
          <div className="flex flex-wrap gap-2 items-center justify-end">
            {/* 平台過濾 */}
            <div className="relative">
              <select
                value={platformFilter}
                onChange={(e) => setPlatformFilter(e.target.value)}
                className="text-sm appearance-none rounded-lg py-2 pl-3 pr-8 border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {platforms.map(platform => (
                  <option key={platform} value={platform}>
                    {platform === 'all' ? '所有平台' : platform}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            
            {/* 排序選項 */}
            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="text-sm appearance-none rounded-lg py-2 pl-3 pr-8 border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="price_asc">價格：由低至高</option>
                <option value="price_desc">價格：由高至低</option>
                <option value="date_desc">最新上架</option>
                <option value="date_asc">最早上架</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            
            {/* 視圖切換 */}
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-primary-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-primary-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* 結果或加載/空狀態 */}
      {isLoading ? renderLoading() : (
        displayResults.length > 0 
          ? (viewMode === 'grid' ? renderGridView() : renderListView())
          : renderEmpty()
      )}
    </div>
  );
};

export default SearchResults; 