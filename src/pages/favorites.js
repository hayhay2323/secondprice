import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { HeartIcon, XCircleIcon } from '@heroicons/react/solid';
import { CalendarIcon, TagIcon, ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/outline';

export default function UserFavorites() {
  const router = useRouter();
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: "Apple MacBook Pro 2021",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      price: 8500,
      originalPrice: 10000,
      seller: "電子專家",
      isBidding: false,
      isNew: false,
      addedDate: "2023-05-15",
      category: "電子產品"
    },
    {
      id: 2,
      name: "Sony WH-1000XM5 降噪耳機",
      image: "https://images.unsplash.com/photo-1545127398-14699f92334b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      price: 1800,
      originalPrice: 2500,
      seller: "音樂愛好者",
      isBidding: false,
      isNew: true,
      addedDate: "2023-06-20",
      category: "電子產品"
    },
    {
      id: 3,
      name: "Nike Air Max 97 運動鞋",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      price: 0,
      currentBid: 750,
      originalPrice: 1200,
      seller: "運動裝備店",
      isBidding: true,
      bidEndTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      isNew: false,
      addedDate: "2023-05-28",
      category: "服飾鞋包"
    },
    {
      id: 4,
      name: "IKEA BILLY 書櫃",
      image: "https://images.unsplash.com/photo-1588499756197-5dea5e074392?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      price: 450,
      originalPrice: 600,
      seller: "家居達人",
      isBidding: false,
      isNew: false,
      addedDate: "2023-06-05",
      category: "家居用品"
    },
    {
      id: 5,
      name: "精裝版哈利波特全集",
      image: "https://images.unsplash.com/photo-1551029506-0807df4e2031?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      price: 0,
      currentBid: 980,
      originalPrice: 1500,
      seller: "書籍收藏家",
      isBidding: true,
      bidEndTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      isNew: false,
      addedDate: "2023-06-12",
      category: "書籍文具"
    }
  ]);
  
  const [activeCategory, setActiveCategory] = useState('全部');
  const [sortBy, setSortBy] = useState('最新');
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    // 檢查用戶是否登入，若沒有登入則導向首頁
    // 這裡用模擬的登入狀態，實際應用中應該從您的認證系統獲取
    if (!isLoggedIn) {
      router.push('/');
    }
    
    // 實際應用中，這裡應該從API獲取用戶收藏的項目
    // fetchFavorites();
  }, [isLoggedIn, router]);

  const categories = ['全部', '電子產品', '家居用品', '服飾鞋包', '書籍文具', '其他'];

  const filteredFavorites = favorites.filter(item => {
    if (activeCategory === '全部') return true;
    return item.category === activeCategory;
  });

  const sortedFavorites = [...filteredFavorites].sort((a, b) => {
    if (sortBy === '價格從低到高') {
      const aPrice = a.isBidding ? a.currentBid : a.price;
      const bPrice = b.isBidding ? b.currentBid : b.price;
      return aPrice - bPrice;
    } else if (sortBy === '價格從高到低') {
      const aPrice = a.isBidding ? a.currentBid : a.price;
      const bPrice = b.isBidding ? b.currentBid : b.price;
      return bPrice - aPrice;
    } else if (sortBy === '折扣最多') {
      const aDiscount = ((a.originalPrice - (a.isBidding ? a.currentBid : a.price)) / a.originalPrice) * 100;
      const bDiscount = ((b.originalPrice - (b.isBidding ? b.currentBid : b.price)) / b.originalPrice) * 100;
      return bDiscount - aDiscount;
    } else {
      // 默認按最新排序
      return new Date(b.addedDate) - new Date(a.addedDate);
    }
  });

  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter(item => item.id !== id));
    // 實際應用中，這裡應該調用API來從用戶的收藏中移除項目
  };

  const calculateRemainingTime = (endTime) => {
    const now = new Date();
    const diff = endTime - now;
    
    if (diff <= 0) return '已結束';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) {
      return `${days} 天 ${hours} 小時`;
    } else {
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      return `${hours} 小時 ${minutes} 分鐘`;
    }
  };

  const calculateDiscount = (original, current) => {
    if (!original || !current) return 0;
    return Math.round(((original - current) / original) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 導航欄 */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <button 
                onClick={() => router.back()}
                className="mr-4 text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-2xl font-bold text-gray-900">我的收藏</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 類別過濾器 */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-3">按類別篩選</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full ${
                  activeCategory === category 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                } transition-colors duration-200`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* 排序選項 */}
        <div className="mb-8 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {filteredFavorites.length} 個收藏項目
          </div>
          <div className="inline-flex rounded-md shadow-sm">
            <select
              className="bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
            >
              <option value="最新">最新</option>
              <option value="價格從低到高">價格從低到高</option>
              <option value="價格從高到低">價格從高到低</option>
              <option value="折扣最多">折扣最多</option>
            </select>
          </div>
        </div>

        {/* 收藏列表 */}
        {sortedFavorites.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="mx-auto h-24 w-24 text-gray-400">
              <HeartIcon className="h-full w-full" />
            </div>
            <h3 className="mt-2 text-lg font-medium text-gray-900">暫無收藏項目</h3>
            <p className="mt-1 text-sm text-gray-500">開始瀏覽商品並添加到您的收藏列表！</p>
            <div className="mt-6">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => router.push('/')}
              >
                瀏覽商品
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedFavorites.map(item => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="h-48 w-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/300x200?text=圖片載入失敗';
                    }}
                  />
                  <button 
                    onClick={() => removeFromFavorites(item.id)} 
                    className="absolute top-2 right-2 bg-white rounded-full p-1 text-red-500 hover:text-red-700 shadow-sm"
                    aria-label="從收藏中移除"
                  >
                    <XCircleIcon className="h-6 w-6" />
                  </button>
                  
                  {item.isNew && (
                    <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs font-bold rounded">
                      全新
                    </div>
                  )}
                  
                  {item.isBidding && (
                    <div className="absolute bottom-2 left-2 bg-indigo-600 text-white px-2 py-1 text-xs font-bold rounded flex items-center">
                      <span>競價中: {calculateRemainingTime(item.bidEndTime)}</span>
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 truncate" title={item.name}>
                    {item.name}
                  </h3>
                  
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <TagIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                    {item.category}
                  </div>
                  
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <CalendarIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                    {item.addedDate}
                  </div>
                  
                  <div className="mt-2 flex items-center">
                    {item.isBidding ? (
                      <div className="text-lg font-medium text-gray-900">
                        目前出價: ${item.currentBid}
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <div className="text-lg font-medium text-gray-900">
                          ${item.price}
                        </div>
                        {item.originalPrice > item.price && (
                          <>
                            <div className="ml-2 text-sm line-through text-gray-500">
                              ${item.originalPrice}
                            </div>
                            <div className="ml-2 text-sm font-medium text-red-600">
                              {calculateDiscount(item.originalPrice, item.price)}% 折扣
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 flex justify-between">
                    <div className="text-sm text-gray-500">
                      賣家: {item.seller}
                    </div>
                    <button
                      className={`px-3 py-1 rounded-md text-sm font-medium ${
                        item.isBidding
                          ? 'text-white bg-indigo-600 hover:bg-indigo-700' 
                          : 'text-white bg-green-600 hover:bg-green-700'
                      }`}
                      onClick={() => router.push(`/item/${item.id}`)}
                    >
                      {item.isBidding ? '參與競價' : '查看詳情'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 