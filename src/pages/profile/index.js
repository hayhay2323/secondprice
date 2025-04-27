import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState({
    name: '用戶名稱',
    email: 'user@example.com',
    avatar: 'https://via.placeholder.com/150',
    bio: '這是一段關於用戶的簡介。描述一下你自己，以及你對二手物品和循環經濟的興趣。',
    phone: '+852 1234 5678',
    address: '香港九龍灣', 
    registeredDate: '2023年12月1日',
    followers: 35,
    following: 42
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  useEffect(() => {
    // 檢查用戶是否已登入
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      router.push('/');
    }
    
    // 從localStorage中獲取用戶數據
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setEditedUser(JSON.parse(storedUser));
    }
  }, [router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({
      ...editedUser,
      [name]: value
    });
  };

  const handleSave = () => {
    setUser(editedUser);
    setIsEditing(false);
    
    // 保存到localStorage
    localStorage.setItem('userData', JSON.stringify(editedUser));
    
    // 在這裡可以添加API調用來保存數據到後端
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  const profileNavItems = [
    { name: '個人檔案', href: '/profile', current: true },
    { name: '我的物品', href: '/profile/items', current: false },
    { name: '我的競價', href: '/profile/bidding', current: false },
    { name: '收藏夾', href: '/profile/favorites', current: false },
    { name: '設定', href: '/profile/settings', current: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>個人檔案 | SecondPrice.hk</title>
        <meta name="description" content="管理您的個人資料" />
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

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          {/* 個人檔案頭部 */}
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">個人資料</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">您的個人信息和聯繫方式</p>
            </div>
            <div>
              {!isEditing ? (
                <button
                  type="button"
                  className="bg-indigo-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-indigo-700"
                  onClick={() => setIsEditing(true)}
                >
                  編輯資料
                </button>
              ) : (
                <div className="space-x-3">
                  <button
                    type="button"
                    className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-300"
                    onClick={handleCancel}
                  >
                    取消
                  </button>
                  <button
                    type="button"
                    className="bg-indigo-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-indigo-700"
                    onClick={handleSave}
                  >
                    保存
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 用戶基本信息 */}
          <div className="border-t border-gray-200">
            <div className="px-4 py-5 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 頭像區 */}
              <div className="flex flex-col items-center p-4">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 mb-4">
                  <img
                    src={user.avatar}
                    alt="用戶頭像"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/150";
                    }}
                  />
                </div>
                {isEditing && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">更換頭像</label>
                    <input 
                      type="text" 
                      name="avatar" 
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" 
                      value={editedUser.avatar} 
                      onChange={handleInputChange}
                      placeholder="輸入頭像URL"
                    />
                  </div>
                )}
                <div className="flex space-x-4 mt-4">
                  <div className="text-center">
                    <span className="block text-lg font-semibold text-gray-900">{user.followers}</span>
                    <span className="block text-sm text-gray-500">粉絲</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-lg font-semibold text-gray-900">{user.following}</span>
                    <span className="block text-sm text-gray-500">關注</span>
                  </div>
                </div>
              </div>

              {/* 用戶詳細信息 */}
              <div className="col-span-2 p-4">
                {!isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">{user.name}</h4>
                      <p className="text-sm text-gray-500">註冊於 {user.registeredDate}</p>
                    </div>
                    <p className="text-gray-700">{user.bio}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div>
                        <h5 className="text-sm font-medium text-gray-500">電子郵件</h5>
                        <p className="mt-1 text-sm text-gray-900">{user.email}</p>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-gray-500">聯絡電話</h5>
                        <p className="mt-1 text-sm text-gray-900">{user.phone}</p>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-gray-500">地址</h5>
                        <p className="mt-1 text-sm text-gray-900">{user.address}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">用戶名稱</label>
                        <input 
                          type="text" 
                          name="name" 
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" 
                          value={editedUser.name} 
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">電子郵件</label>
                        <input 
                          type="email" 
                          name="email" 
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" 
                          value={editedUser.email} 
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">聯絡電話</label>
                        <input 
                          type="text" 
                          name="phone" 
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" 
                          value={editedUser.phone} 
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">地址</label>
                        <input 
                          type="text" 
                          name="address" 
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" 
                          value={editedUser.address} 
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">個人簡介</label>
                      <textarea 
                        name="bio" 
                        rows={4} 
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md" 
                        value={editedUser.bio} 
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 