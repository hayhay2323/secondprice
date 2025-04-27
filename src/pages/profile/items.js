import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function UserItems() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('all');
  
  // 示例物品數據
  const [userItems, setUserItems] = useState([
    {
      id: 1,
      title: 'iPhone 13 Pro Max 256GB 銀色',
      price: 5800,
      originalPrice: 8999,
      image: 'https://images.unsplash.com/photo-1606041011872-596597976b25?w=500',
      condition: '二手 - 良好',
      status: 'active',
      type: 'sale',
      likes: 23,
      views: 142,
      createdAt: '2023/12/05'
    },
    {
      id: 2,
      title: 'MacBook Pro 2021 M1 Pro 16吋',
      price: 9200,
      originalPrice: 15999,
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500',
      condition: '二手 - 極佳',
      status: 'active',
      type: 'bidding',
      currentBids: 5,
      endTime: '2024/01/15',
      likes: 32,
      views: 205,
      createdAt: '2023/12/10'
    },
    {
      id: 3,
      title: 'Sony PlayStation 5 光碟版',
      price: 3300,
      originalPrice: 4980,
      image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=500',
      condition: '二手 - 良好',
      status: 'sold',
      type: 'sale',
      likes: 45,
      views: 231,
      createdAt: '2023/11/28',
      soldAt: '2023/12/12'
    },
    {
      id: 4,
      title: 'AirPods Pro 2 帶無線充電盒',
      price: 1150,
      originalPrice: 1799,
      image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=500',
      condition: '二手 - 極佳',
      status: 'active',
      type: 'sale',
      likes: 18,
      views: 152,
      createdAt: '2023/12/15'
    },
    {
      id: 5,
      title: 'Samsung Galaxy S21 Ultra 黑色 512GB',
      price: 3200,
      originalPrice: 7599,
      image: 'https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00?w=500',
      condition: '二手 - 良好',
      status: 'bidding_ended',
      type: 'bidding',
      finalBid: 3200,
      bidders: 8,
      likes: 29,
      views: 187,
      createdAt: '2023/11/20',
      endedAt: '2023/12/01'
    }
  ]);
  
  useEffect(() => {
    // 檢查用戶是否已登入
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      router.push('/');
    }
    
    // 可以從localStorage或後端API獲取物品數據
  }, [router]);

  // 處理物品操作
  const handleAddItem = () => {
    router.push('/profile/items/new');
  };
  
  const handleEditItem = (itemId) => {
    router.push(`/profile/items/edit/${itemId}`);
  };
  
  const handleDeleteItem = (itemId) => {
    if (confirm('確定要刪除這個物品嗎？此操作不可撤銷。')) {
      setUserItems(userItems.filter(item => item.id !== itemId));
      // 在這裡可以添加API調用來從後端刪除物品
    }
  };
  
  // 根據tab篩選物品
  const getFilteredItems = () => {
    if (activeTab === 'all') return userItems;
    if (activeTab === 'active') return userItems.filter(item => item.status === 'active');
    if (activeTab === 'sold') return userItems.filter(item => item.status === 'sold' || item.status === 'bidding_ended');
    if (activeTab === 'bidding') return userItems.filter(item => item.type === 'bidding');
    return userItems;
  };
  
  // 計算折扣百分比
  const calculateDiscount = (price, originalPrice) => {
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  const profileNavItems = [
    { name: '個人檔案', href: '/profile', current: false },
    { name: '我的物品', href: '/profile/items', current: true },
    { name: '我的競價', href: '/profile/bidding', current: false },
    { name: '收藏夾', href: '/profile/favorites', current: false },
    { name: '設定', href: '/profile/settings', current: false },
  ];

  const itemTabs = [
    { id: 'all', name: '全部物品' },
    { id: 'active', name: '在售物品' },
    { id: 'sold', name: '已售物品' },
    { id: 'bidding', name: '競價物品' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>我的物品 | SecondPrice.hk</title>
        <meta name="description" content="管理您發布的二手物品和競價物品" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* 導航欄 */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <a href="/" className="text-indigo-600 text-xl font-bold">SecondPrice.hk</a>
              </div>
            </div>
            <div className="flex items-center">
              <button 
                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                onClick={() => router.push('/')}
              >
                返回首頁
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* 個人檔案導航 */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {profileNavItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                  ${item.current
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
                aria-current={item.current ? 'page' : undefined}
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>

        {/* 頁面頭部 */}
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">我的物品</h1>
          <button
            onClick={handleAddItem}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            新增物品
          </button>
        </div>

        {/* 分類標籤 */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {itemTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                    ${activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* 物品列表 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {getFilteredItems().map((item) => (
            <div 
              key={item.id} 
              className="bg-white overflow-hidden shadow rounded-lg border border-gray-200 transition-all hover:shadow-lg"
            >
              {/* 物品圖片 */}
              <div className="relative aspect-w-1 aspect-h-1 bg-gray-200">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
                  }}
                />
                {/* 狀態標籤 */}
                {item.status === 'sold' && (
                  <div className="absolute top-2 right-2 bg-gray-900 text-white px-2 py-1 rounded text-xs font-medium">
                    已售出
                  </div>
                )}
                {item.status === 'bidding_ended' && (
                  <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-medium">
                    競價結束
                  </div>
                )}
                {item.type === 'bidding' && item.status === 'active' && (
                  <div className="absolute top-2 right-2 bg-purple-600 text-white px-2 py-1 rounded text-xs font-medium">
                    競價中
                  </div>
                )}
                {/* 折扣標籤 */}
                {calculateDiscount(item.price, item.originalPrice) > 0 && (
                  <div className="absolute bottom-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
                    省 {calculateDiscount(item.price, item.originalPrice)}%
                  </div>
                )}
              </div>
              
              {/* 物品信息 */}
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{item.title}</h3>
                <div className="mt-2 flex justify-between items-end">
                  <div>
                    <p className="text-lg font-semibold text-gray-900">HK${item.price.toLocaleString()}</p>
                    {item.originalPrice > item.price && (
                      <p className="text-sm text-gray-500 line-through">HK${item.originalPrice.toLocaleString()}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">{item.condition}</p>
                  </div>
                  <div className="flex space-x-1 text-xs text-gray-500">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                      {item.likes}
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                      {item.views}
                    </div>
                  </div>
                </div>
                
                {/* 競價相關信息 */}
                {item.type === 'bidding' && item.status === 'active' && (
                  <div className="mt-2 text-xs text-gray-500">
                    <p>目前競標次數: {item.currentBids}</p>
                    <p>結束時間: {item.endTime}</p>
                  </div>
                )}
                
                {item.type === 'bidding' && item.status === 'bidding_ended' && (
                  <div className="mt-2 text-xs text-gray-500">
                    <p>最終競標價: HK${item.finalBid.toLocaleString()}</p>
                    <p>參與競標人數: {item.bidders}</p>
                  </div>
                )}
                
                {/* 操作按鈕 */}
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => handleEditItem(item.id)}
                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-md text-xs font-medium hover:bg-gray-200"
                  >
                    編輯
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="bg-red-100 text-red-800 px-3 py-1 rounded-md text-xs font-medium hover:bg-red-200"
                  >
                    刪除
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* 空狀態提示 */}
        {getFilteredItems().length === 0 && (
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">沒有找到相關物品</h3>
            <p className="text-gray-500 mb-4">您尚未發布任何{activeTab !== 'all' ? itemTabs.find(tab => tab.id === activeTab).name.replace('物品', '') : ''}物品</p>
            <button
              onClick={handleAddItem}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 inline-flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              立即發布物品
            </button>
          </div>
        )}
      </main>
    </div>
  );
} 