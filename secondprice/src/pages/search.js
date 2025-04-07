import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchResults from '../components/SearchResults';
import ChatInterface from '../components/ChatInterface';
import { searchProducts } from '../services/api';

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
const ProductCard = ({ product, onCompare, isCompared }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="border rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all bg-white relative group"
    >
      {product.source === 'carousell' && (
        <motion.span 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="absolute top-2 left-2 z-10 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-3 py-1 text-xs rounded-full shadow-sm"
        >
          Carousell
        </motion.span>
      )}
      {product.source === 'facebook-marketplace' && (
        <motion.span 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="absolute top-2 left-2 z-10 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 text-xs rounded-full shadow-sm"
        >
          FB Market
        </motion.span>
      )}
      <div className="relative pt-[75%] bg-gray-100 overflow-hidden">
        {product.images && product.images.length > 0 ? (
          <motion.img
            src={product.images[0]}
            alt={product.title}
            className="absolute top-0 left-0 w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          />
        ) : (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-gray-400">
            <motion.svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-12 w-12"
              animate={{ rotate: isHovered ? 360 : 0 }}
              transition={{ duration: 0.5 }}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </motion.svg>
          </div>
        )}
        
        {/* 快速操作按鈕組 */}
        <motion.div 
          className="absolute inset-0 bg-black/40 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-full bg-white shadow-lg hover:bg-primary-50 transition-colors"
            onClick={() => onCompare(product)}
            title={isCompared ? "從比較中移除" : "添加到比較"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </motion.button>
          <motion.a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-full bg-primary-500 shadow-lg hover:bg-primary-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </motion.a>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-full bg-white shadow-lg hover:bg-red-50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </motion.button>
        </motion.div>
        
        {/* 價格標籤 */}
        {product.originalPrice && product.originalPrice > product.price && (
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 text-xs font-bold rounded-full shadow-sm"
          >
            節省 {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </motion.div>
        )}
      </div>
      
      <div className="p-4">
        <motion.h3 
          className="font-medium text-lg mb-2 line-clamp-2 h-12 group-hover:text-primary-600 transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          title={product.title}
        >
          {product.title}
        </motion.h3>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-baseline gap-2">
            <motion.p 
              className="text-xl font-bold text-primary-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              HK${product.price.toLocaleString()}
            </motion.p>
            {product.originalPrice && product.originalPrice > product.price && (
              <motion.span 
                className="text-sm text-gray-500 line-through"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
              >
                HK${product.originalPrice.toLocaleString()}
              </motion.span>
            )}
          </div>
          {product.location && (
            <motion.span 
              className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {product.location}
            </motion.span>
          )}
        </div>
        
        {product.condition && (
          <motion.div 
            className="inline-flex items-center gap-1 text-xs text-primary-700 bg-primary-50 px-2 py-1 rounded-full mb-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="w-2 h-2 rounded-full bg-primary-500"></span>
            {product.condition}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

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

export default function Search() {
  const router = useRouter();
  const { keyword, platform } = router.query;
  
  // 狀態管理
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showChat, setShowChat] = useState(false);
  
  // 搜索建議
  const suggestions = [
    `找更便宜的 ${keyword || '商品'}`,
    '這個價格合理嗎？',
    '哪個平台最划算？',
    '如何判斷二手品質？'
  ];
  
  // 搜索結果數據
  useEffect(() => {
    if (!keyword) return;
    
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // 在實際專案中，這裡將調用後端API
        // const response = await searchProducts(keyword, { platform });
        // setResults(response.results);
        
        // 模擬API調用
        setTimeout(() => {
          // 模擬數據
          const mockResults = [
            {
              id: 1,
              title: `iPhone 13 Pro Max 256GB 銀色`,
              price: 4580,
              originalPrice: 5200,
              condition: '9成新',
              platform: 'Carousell',
              location: '荃灣',
              image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=500',
              url: '#',
              date: '2023-12-01'
            },
            {
              id: 2,
              title: 'Samsung Galaxy S21 Ultra 黑色 512GB',
              price: 3200,
              originalPrice: null,
              condition: '8成新',
              platform: 'Facebook',
              location: '觀塘',
              image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500',
              url: '#',
              date: '2023-12-10'
            },
            {
              id: 3,
              title: 'MacBook Pro 2021 M1 Pro 16吋',
              price: 9800,
              originalPrice: 12000,
              condition: '95%新',
              platform: 'Carousell',
              location: '中環',
              image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
              url: '#',
              date: '2023-12-05'
            },
            {
              id: 4,
              title: 'Sony WH-1000XM4 無線降噪耳機',
              price: 1200,
              originalPrice: 2599,
              condition: '全新',
              platform: 'Facebook',
              location: '沙田',
              image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500',
              url: '#',
              date: '2023-11-28'
            },
            {
              id: 5,
              title: 'Apple Watch Series 7 45mm',
              price: 2300,
              originalPrice: 3199,
              condition: '98%新',
              platform: 'Carousell',
              location: '太古',
              image: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=500',
              url: '#',
              date: '2023-12-08'
            },
            {
              id: 6,
              title: '佳能 Canon EOS R5 全幅無反相機',
              price: 18500,
              originalPrice: 25999,
              condition: '淨機',
              platform: 'Carousell',
              location: '旺角',
              image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500',
              url: '#',
              date: '2023-11-25'
            },
            {
              id: 7,
              title: 'Dyson V11 無線吸塵機',
              price: 2800,
              originalPrice: 4500,
              condition: '9成新',
              platform: 'Facebook',
              location: '將軍澳',
              image: 'https://images.unsplash.com/photo-1595187139760-5cedf9de4b40?w=500',
              url: '#',
              date: '2023-12-02'
            },
            {
              id: 8,
              title: 'Nintendo Switch OLED版',
              price: 1900,
              originalPrice: 2400,
              condition: '全套',
              platform: 'Carousell',
              location: '黃大仙',
              image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=500',
              url: '#',
              date: '2023-12-12'
            }
          ];
          
          // 如果指定了平台，過濾結果
          const filteredResults = platform 
            ? mockResults.filter(item => item.platform.toLowerCase() === platform.toLowerCase())
            : mockResults;
          
          setResults(filteredResults);
          setIsLoading(false);
        }, 1500);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('搜索時發生錯誤，請稍後再試。');
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, [keyword, platform]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-white">
      <Head>
        <title>{keyword ? `${keyword} - SecondPrice` : 'Search - SecondPrice'}</title>
        <meta name="description" content={`在SecondPrice搜尋二手${keyword || '商品'}的結果，比較多個平台價格`} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" />
      </Head>
      
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        {/* 搜索標題區域 */}
        <motion.div 
          className="mb-8 text-center md:text-left"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">
            {keyword ? (
              <>搜尋：<span className="text-primary-600">「{keyword}」</span></>
            ) : (
              '搜尋二手商品'
            )}
          </h1>
          <p className="mt-2 text-gray-600 text-lg">
            從多個二手平台整合結果，幫您找到最好的價格
          </p>
          
          {/* 搜索統計 */}
          {!isLoading && results.length > 0 && (
            <motion.div 
              className="mt-4 inline-flex items-center gap-4 text-sm text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>找到 {results.length} 個結果</span>
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>搜索耗時 0.5 秒</span>
              </div>
            </motion.div>
          )}
        </motion.div>
        
        {/* 主要內容區 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SearchResults 
              results={results}
              isLoading={isLoading}
              keyword={keyword}
              onSortChange={(option) => console.log('排序變更:', option)}
              onFilterChange={(filter) => console.log('過濾變更:', filter)}
            />
          </motion.div>
          
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="sticky top-20 space-y-6">
              {/* AI助手卡片 */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 transform transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="p-6 bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-500 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-16 -translate-y-8">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="opacity-20">
                      <path fill="currentColor" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,89.1,-0.5C88.1,15.3,83.5,30.6,75.4,43.9C67.3,57.3,55.7,68.7,41.7,76.5C27.7,84.4,11.3,88.8,-4.4,88.1C-20.1,87.4,-40.2,81.7,-57.4,71.1C-74.6,60.5,-88.9,45,-93.4,27.2C-97.9,9.4,-92.7,-10.7,-84.2,-28.5C-75.7,-46.3,-63.9,-61.7,-49,-71.4C-34.1,-81.1,-16,-85,-0.9,-83.5C14.3,-82,30.5,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold relative z-10">AI 商品顧問</h2>
                  <p className="mt-2 text-primary-50 relative z-10">
                    需要幫助找到最適合的二手商品？我們的AI助手可以提供專業建議和價格分析。
                  </p>
                </div>
                
                <div className="p-6">
                  {showChat ? (
                    <div className="h-[400px]">
                      <ChatInterface suggestions={suggestions} />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-gray-600">常見問題：</p>
                      <div className="space-y-2">
                        {suggestions.map((suggestion, index) => (
                          <motion.button
                            key={index}
                            onClick={() => setShowChat(true)}
                            className="w-full py-2 px-4 text-left bg-gray-50 hover:bg-primary-50 hover:text-primary-600 rounded-lg border border-gray-200 transition-all text-sm"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {suggestion}
                          </motion.button>
                        ))}
                      </div>
                      <motion.button 
                        onClick={() => setShowChat(true)}
                        className="w-full mt-4 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white py-3 rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        開始諮詢
                      </motion.button>
                    </div>
                  )}
                </div>
              </div>

              {/* 相關推薦卡片 */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transform transition-all hover:shadow-xl">
                <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                  <h3 className="font-bold text-gray-800">相關推薦</h3>
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    {[1, 2, 3].map((_, index) => (
                      <motion.a
                        key={index}
                        href="#"
                        className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-all group"
                        whileHover={{ scale: 1.02, x: 5 }}
                      >
                        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={`https://source.unsplash.com/random/200x200?product=${index}`}
                            className="w-full h-full object-cover"
                            alt="推薦商品"
                          />
                        </div>
                        <div className="ml-3 flex-1">
                          <p className="text-sm font-medium text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-1">
                            推薦商品 {index + 1}
                          </p>
                          <p className="text-sm text-primary-600 font-bold">HK$299</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                              95% 新
                            </span>
                            <span className="text-xs text-gray-500">
                              觀塘
                            </span>
                          </div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-primary-500 transition-colors" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 