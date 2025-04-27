import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function UserBidding() {
  const router = useRouter();
  
  // 競價記錄狀態
  const [bidRecords, setBidRecords] = useState([
    {
      id: 1,
      itemName: "Apple iPhone 14 Pro Max 256GB",
      itemImage: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      currentBid: 5800,
      yourBid: 5500,
      status: "outbid", // outbid, winning, won, lost, ended
      endTime: "2023-12-30T16:00:00",
      bidsCount: 12,
      category: "電子產品"
    },
    {
      id: 2,
      itemName: "Sony PlayStation 5 Disc Edition",
      itemImage: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      currentBid: 3200,
      yourBid: 3200,
      status: "winning",
      endTime: "2023-12-28T20:00:00",
      bidsCount: 8,
      category: "電子產品"
    },
    {
      id: 3,
      itemName: "Nike Air Jordan 1 High OG",
      itemImage: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      currentBid: 1200,
      yourBid: 1000,
      status: "outbid",
      endTime: "2023-12-29T12:00:00",
      bidsCount: 15,
      category: "服裝鞋履"
    },
    {
      id: 4,
      itemName: "純手工陶瓷茶具組",
      itemImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      currentBid: 850,
      yourBid: 820,
      status: "outbid",
      endTime: "2023-12-25T18:00:00",
      bidsCount: 6,
      category: "家居生活"
    },
    {
      id: 5,
      itemName: "復古機械手錶",
      itemImage: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      currentBid: 4500,
      yourBid: 4500,
      status: "winning",
      endTime: "2023-12-27T14:00:00",
      bidsCount: 9,
      category: "手錶珠寶"
    },
    {
      id: 6,
      itemName: "Canon EOS R5 全片幅無反相機",
      itemImage: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      currentBid: 15000,
      yourBid: 14800,
      status: "won",
      endTime: "2023-12-10T10:00:00",
      bidsCount: 18,
      category: "電子產品"
    },
    {
      id: 7,
      itemName: "古典實木書桌",
      itemImage: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      currentBid: 2200,
      yourBid: 2000,
      status: "lost",
      endTime: "2023-12-05T22:00:00",
      bidsCount: 11,
      category: "家居生活"
    },
  ]);

  // 當前活動的篩選標籤
  const [activeFilter, setActiveFilter] = useState('all');
  
  // 檢查用戶是否登入
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      router.push('/');
    }
  }, [router]);
  
  // 根據過濾條件獲取顯示的競價記錄
  const getFilteredBids = () => {
    switch (activeFilter) {
      case 'active':
        return bidRecords.filter(record => ['outbid', 'winning'].includes(record.status));
      case 'winning':
        return bidRecords.filter(record => record.status === 'winning');
      case 'outbid':
        return bidRecords.filter(record => record.status === 'outbid');
      case 'won':
        return bidRecords.filter(record => record.status === 'won');
      case 'lost':
        return bidRecords.filter(record => record.status === 'lost');
      default:
        return bidRecords;
    }
  };
  
  // 處理增加競價
  const handleIncreaseBid = (id) => {
    setBidRecords(prevRecords => 
      prevRecords.map(record => {
        if (record.id === id) {
          const newBid = record.currentBid + 100;
          return {
            ...record,
            yourBid: newBid,
            currentBid: newBid,
            status: 'winning'
          };
        }
        return record;
      })
    );
  };
  
  // 計算剩餘時間
  const getRemainingTime = (endTime) => {
    const end = new Date(endTime);
    const now = new Date();
    const diff = end - now;
    
    if (diff <= 0) return '已結束';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}天 ${hours}小時`;
    if (hours > 0) return `${hours}小時 ${minutes}分鐘`;
    return `${minutes}分鐘`;
  };
  
  // 獲取狀態標籤樣式
  const getStatusStyle = (status) => {
    switch (status) {
      case 'winning':
        return 'bg-green-100 text-green-800';
      case 'outbid':
        return 'bg-red-100 text-red-800';
      case 'won':
        return 'bg-blue-100 text-blue-800';
      case 'lost':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // 獲取狀態文字
  const getStatusText = (status) => {
    switch (status) {
      case 'winning':
        return '領先中';
      case 'outbid':
        return '已被超過';
      case 'won':
        return '已得標';
      case 'lost':
        return '未得標';
      default:
        return '已結束';
    }
  };
  
  const profileNavItems = [
    { name: '個人檔案', href: '/profile', current: false },
    { name: '我的物品', href: '/profile/items', current: false },
    { name: '我的競價', href: '/profile/bidding', current: true },
    { name: '收藏夾', href: '/profile/favorites', current: false },
    { name: '設定', href: '/profile/settings', current: false },
  ];

  const filterTabs = [
    { id: 'all', name: '全部競價' },
    { id: 'active', name: '進行中' },
    { id: 'winning', name: '領先中' },
    { id: 'outbid', name: '已被超過' },
    { id: 'won', name: '已得標' },
    { id: 'lost', name: '未得標' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>我的競價 | SecondPrice.hk</title>
        <meta name="description" content="管理您的競價記錄和狀態" />
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
          <h1 className="text-2xl font-bold text-gray-900">我的競價</h1>
          <p className="mt-1 text-sm text-gray-500">管理您的競價記錄，查看競價狀態並調整您的出價</p>
        </div>

        {/* 競價統計卡片 */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-6">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      進行中的競價
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {bidRecords.filter(record => ['outbid', 'winning'].includes(record.status)).length}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      領先的競價
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {bidRecords.filter(record => record.status === 'winning').length}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      已得標的物品
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {bidRecords.filter(record => record.status === 'won').length}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 競價列表過濾標籤 */}
        <div className="bg-white shadow rounded-lg mb-6 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-4 px-4 sm:px-6">
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`
                    whitespace-nowrap py-4 px-2 border-b-2 font-medium text-sm
                    ${activeFilter === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  {tab.name}
                  {tab.id !== 'all' && (
                    <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${activeFilter === tab.id ? 'bg-indigo-100' : 'bg-gray-100'}`}>
                      {
                        tab.id === 'active' 
                          ? bidRecords.filter(record => ['outbid', 'winning'].includes(record.status)).length
                          : bidRecords.filter(record => record.status === tab.id).length
                      }
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* 競價記錄列表 */}
          <ul className="divide-y divide-gray-200">
            {getFilteredBids().length > 0 ? (
              getFilteredBids().map((record) => (
                <li key={record.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden">
                      <img className="h-full w-full object-cover" src={record.itemImage} alt={record.itemName} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-indigo-600 truncate">
                        {record.itemName}
                      </p>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <span className="truncate">{record.category}</span>
                        <span className="mx-1">•</span>
                        <span>{record.bidsCount} 個出價</span>
                      </div>
                      <div className="mt-1 flex items-center">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusStyle(record.status)}`}>
                          {getStatusText(record.status)}
                        </span>
                        {['outbid', 'winning'].includes(record.status) && (
                          <span className="ml-2 text-sm text-gray-500">
                            剩餘時間: {getRemainingTime(record.endTime)}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex-shrink-0 flex flex-col items-end space-y-1">
                      <p className="text-sm text-gray-500">當前價格</p>
                      <p className="text-base font-semibold">HK$ {record.currentBid}</p>
                      <p className={`text-sm ${record.yourBid === record.currentBid ? 'text-green-600 font-medium' : 'text-gray-500'}`}>
                        您的出價: HK$ {record.yourBid}
                      </p>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      {record.status === 'outbid' && new Date(record.endTime) > new Date() && (
                        <button
                          onClick={() => handleIncreaseBid(record.id)}
                          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          加價
                        </button>
                      )}
                      
                      {record.status === 'won' && (
                        <button
                          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          付款
                        </button>
                      )}

                      <button
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-2"
                        onClick={() => router.push(`/items/${record.id}`)}
                      >
                        查看詳情
                      </button>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="px-4 py-12 sm:px-6 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">沒有{getStatusText(activeFilter)}的競價記錄</h3>
                <p className="mt-1 text-sm text-gray-500">開始出價參與競標或者瀏覽更多競價物品</p>
                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => router.push('/?tab=bidding')}
                  >
                    <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    瀏覽競價物品
                  </button>
                </div>
              </li>
            )}
          </ul>
        </div>
      </main>
    </div>
  );
} 