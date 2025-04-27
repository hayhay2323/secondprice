import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function UserFavorites() {
  const router = useRouter();
  
  // 收藏夾物品狀態
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: "Apple MacBook Pro 14\" M1 Pro",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      price: 9800,
      originalPrice: 12999,
      seller: "AppleFan123",
      isBidding: false,
      isNew: true,
      addedDate: "2023-12-15T10:30:00",
      category: "電子產品"
    },
    {
      id: 2,
      name: "Sony WH-1000XM4 無線降噪耳機",
      image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      price: 1500,
      originalPrice: 2799,
      seller: "MusicLover",
      isBidding: false,
      isNew: false,
      addedDate: "2023-12-14T14:45:00",
      category: "電子產品"
    },
    {
      id: 3,
      name: "Adidas Ultraboost 21 跑鞋",
      image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      currentBid: 450,
      startingBid: 300,
      bidEndsAt: "2023-12-30T12:00:00",
      seller: "RunningStar",
      isBidding: true,
      isNew: true,
      addedDate: "2023-12-13T09:15:00",
      category: "服裝鞋履"
    },
    {
      id: 4,
      name: "銀色純銀手鐲",
      image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      price: 880,
      originalPrice: 1200,
      seller: "SilverCraft",
      isBidding: false,
      isNew: false,
      addedDate: "2023-12-12T16:20:00",
      category: "手錶珠寶"
    },
    {
      id: 5,
      name: "IKEA BILLY 書櫃",
      image: "https://images.unsplash.com/photo-1588200618450-3a5b1d3b9aa5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      price: 350,
      originalPrice: 599,
      seller: "HomeDecor",
      isBidding: false,
      isNew: false,
      addedDate: "2023-12-11T11:10:00",
      category: "家居生活"
    },
    {
      id: 6,
      name: "限量版 Nike Air Jordan 4",
      image: "https://images.unsplash.com/photo-1588361861040-ac9b1018f6d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      currentBid: 2800,
      startingBid: 2000,
      bidEndsAt: "2023-12-28T18:00:00",
      seller: "SneakerHead",
      isBidding: true,
      isNew: false,
      addedDate: "2023-12-10T08:30:00",
      category: "服裝鞋履"
    },
    {
      id: 7,
      name: "Nintendo Switch 主機",
      image: "https://images.unsplash.com/photo-1581481615985-ba4775734a9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      price: 1700,
      originalPrice: 2399,
      seller: "GamePlayer",
      isBidding: false,
      isNew: true,
      addedDate: "2023-12-09T13:25:00",
      category: "電子產品"
    },
    {
      id: 8,
      name: "手工皮革錢包",
      image: "https://images.unsplash.com/photo-1630508580126-6b7c94be4eba?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      price: 550,
      originalPrice: 899,
      seller: "LeatherArtisan",
      isBidding: false,
      isNew: true,
      addedDate: "2023-12-08T15:40:00",
      category: "服裝鞋履"
    },
  ]);

  // 當前活動的分類標籤
  const [activeCategory, setActiveCategory] = useState('all');
  // 當前活動的排序方式
  const [sortBy, setSortBy] = useState('date');
  
  // 檢查用戶是否登入
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      router.push('/');
    }
  }, [router]);
  
  // 根據分類過濾收藏項目
  const getFilteredFavorites = () => {
    if (activeCategory === 'all') {
      return favorites;
    } else if (activeCategory === 'bidding') {
      return favorites.filter(item => item.isBidding);
    } else if (activeCategory === 'fixed') {
      return favorites.filter(item => !item.isBidding);
    } else {
      return favorites.filter(item => item.category === activeCategory);
    }
  };
  
  // 排序收藏項目
  const getSortedFavorites = () => {
    const filtered = getFilteredFavorites();
    
    switch (sortBy) {
      case 'price-low':
        return [...filtered].sort((a, b) => (a.price || a.currentBid) - (b.price || b.currentBid));
      case 'price-high':
        return [...filtered].sort((a, b) => (b.price || b.currentBid) - (a.price || a.currentBid));
      case 'date':
      default:
        return [...filtered].sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));
    }
  };
  
  // 從收藏夾中移除物品
  const handleRemoveFromFavorites = (id) => {
    setFavorites(prevFavorites => prevFavorites.filter(item => item.id !== id));
  };
  
  // 計算競標剩餘時間
  const getRemainingTime = (endTime) => {
    const end = new Date(endTime);
    const now = new Date();
    const diff = end - now;
    
    if (diff <= 0) return '已結束';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}天 ${hours}小時`;
    return `${hours}小時`;
  };
  
  // 計算折扣百分比
  const getDiscountPercentage = (price, originalPrice) => {
    if (!originalPrice || originalPrice <= price) return null;
    return Math.round((1 - price / originalPrice) * 100);
  };
  
  const profileNavItems = [
    { name: '個人檔案', href: '/profile', current: false },
    { name: '我的物品', href: '/profile/items', current: false },
    { name: '我的競價', href: '/profile/bidding', current: false },
    { name: '收藏夾', href: '/profile/favorites', current: true },
    { name: '設定', href: '/profile/settings', current: false },
  ];
  
  const categories = [
    { id: 'all', name: '全部' },
    { id: 'bidding', name: '競價物品' },
    { id: 'fixed', name: '定價物品' },
    { id: '電子產品', name: '電子產品' },
    { id: '服裝鞋履', name: '服裝鞋履' },
    { id: '家居生活', name: '家居生活' },
    { id: '手錶珠寶', name: '手錶珠寶' },
  ];
  
  const sortOptions = [
    { id: 'date', name: '最近加入' },
    { id: 'price-low', name: '價格由低至高' },
    { id: 'price-high', name: '價格由高至低' },
  ];
  
  // 獲取展示的收藏項目
  const displayFavorites = getSortedFavorites();

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>我的收藏 | SecondPrice.hk</title>
        <meta name="description" content="查看並管理您收藏的二手和競拍物品" />
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
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">我的收藏</h1>
          <p className="mt-1 text-sm text-gray-500">管理您收藏的物品，快速查看您感興趣的商品</p>
        </div>

        {/* 過濾和排序 */}
        <div className="bg-white shadow rounded-lg mb-6 overflow-hidden">
          <div className="px-4 py-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex overflow-x-auto py-2 space-x-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`
                      whitespace-nowrap px-3 py-2 rounded-md text-sm font-medium
                      ${activeCategory === category.id
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
              <div className="mt-3 sm:mt-0">
                <select
                  id="sort-by"
                  name="sort-by"
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  {sortOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* 收藏列表 */}
        {displayFavorites.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {displayFavorites.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-48 object-cover"
                  />
                  {item.isNew && (
                    <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                      全新
                    </span>
                  )}
                  {item.isBidding && (
                    <span className="absolute top-2 right-2 bg-indigo-500 text-white text-xs font-bold px-2 py-1 rounded">
                      競價中
                    </span>
                  )}
                  <button
                    onClick={() => handleRemoveFromFavorites(item.id)}
                    className="absolute top-2 right-2 bg-white bg-opacity-70 p-1.5 rounded-full text-red-500 hover:bg-opacity-100 focus:outline-none"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path 
                        fillRule="evenodd" 
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    <a href={`/items/${item.id}`} className="hover:text-indigo-600">
                      {item.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">{item.category} • 賣家: {item.seller}</p>
                  
                  {item.isBidding ? (
                    <div className="mt-2">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium text-gray-900">目前出價</p>
                        <p className="text-sm font-medium text-gray-900">HK$ {item.currentBid}</p>
                      </div>
                      <div className="mt-1 flex justify-between items-center">
                        <p className="text-xs text-gray-500">起標價</p>
                        <p className="text-xs text-gray-500">HK$ {item.startingBid}</p>
                      </div>
                      <div className="mt-1 flex items-center text-xs text-indigo-600">
                        <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>剩餘 {getRemainingTime(item.bidEndsAt)}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <p className="text-base font-medium text-gray-900">HK$ {item.price}</p>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <p className="ml-2 text-sm text-gray-500 line-through">HK$ {item.originalPrice}</p>
                          )}
                        </div>
                        {getDiscountPercentage(item.price, item.originalPrice) && (
                          <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded">
                            -{getDiscountPercentage(item.price, item.originalPrice)}%
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={() => router.push(`/items/${item.id}`)}
                      className="flex-1 bg-white border border-gray-300 rounded-md py-2 px-3 flex items-center justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      查看詳情
                    </button>
                    {item.isBidding ? (
                      <button
                        onClick={() => router.push(`/items/${item.id}`)}
                        className="flex-1 bg-indigo-600 border border-transparent rounded-md py-2 px-3 flex items-center justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        參與競價
                      </button>
                    ) : (
                      <button
                        onClick={() => router.push(`/items/${item.id}`)}
                        className="flex-1 bg-indigo-600 border border-transparent rounded-md py-2 px-3 flex items-center justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        立即購買
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">您的收藏夾是空的</h3>
            <p className="mt-1 text-sm text-gray-500">浏覽物品並加入您的收藏夾</p>
            <div className="mt-6">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => router.push('/')}
              >
                <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                瀏覽更多物品
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 