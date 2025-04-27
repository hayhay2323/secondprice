import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Settings() {
  const router = useRouter();
  
  // 用戶設定狀態
  const [settings, setSettings] = useState({
    account: {
      email: 'user@example.com',
      password: '••••••••',
      twoFactorAuth: false,
      language: 'zh-HK',
      currency: 'HKD'
    },
    privacy: {
      showEmail: false,
      showPhone: false,
      profileVisibility: 'public',
      allowMessages: true
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      bidUpdates: true,
      priceDropAlerts: true,
      newMessages: true,
      marketingEmails: false
    },
    appearance: {
      theme: 'system',
      compactMode: false
    }
  });
  
  // 當前活動的設定標籤
  const [activeTab, setActiveTab] = useState('account');
  
  // 顯示成功訊息
  const [showSuccess, setShowSuccess] = useState(false);
  
  useEffect(() => {
    // 檢查用戶是否已登入
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      router.push('/');
    }
    
    // 從localStorage或後端API獲取用戶設定
    const storedSettings = localStorage.getItem('userSettings');
    if (storedSettings) {
      setSettings(JSON.parse(storedSettings));
    }
    
    // 從URL參數獲取初始標籤
    if (router.query.tab) {
      setActiveTab(router.query.tab);
    }
  }, [router]);
  
  // 處理設定變更
  const handleChange = (section, key, value) => {
    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [key]: value
      }
    });
  };
  
  // 處理設定保存
  const handleSave = () => {
    // 保存到localStorage
    localStorage.setItem('userSettings', JSON.stringify(settings));
    
    // 顯示成功訊息
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    
    // 在這裡可以添加API調用來保存設定到後端
  };
  
  const profileNavItems = [
    { name: '個人檔案', href: '/profile', current: false },
    { name: '我的物品', href: '/profile/items', current: false },
    { name: '我的競價', href: '/profile/bidding', current: false },
    { name: '收藏夾', href: '/profile/favorites', current: false },
    { name: '設定', href: '/profile/settings', current: true },
  ];
  
  const settingTabs = [
    { id: 'account', name: '賬戶設定' },
    { id: 'privacy', name: '隱私設定' },
    { id: 'notifications', name: '通知設定' },
    { id: 'appearance', name: '外觀設定' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>設定 | SecondPrice.hk</title>
        <meta name="description" content="管理您的用戶設定和偏好" />
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
          <h1 className="text-2xl font-bold text-gray-900">設定</h1>
          <p className="mt-1 text-sm text-gray-500">管理您的賬戶設定、隱私和通知偏好</p>
        </div>

        {/* 設定區域 */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
          {/* 設定標籤 */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {settingTabs.map((tab) => (
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

          {/* 賬戶設定 */}
          {activeTab === 'account' && (
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">電子郵箱</label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md sm:text-sm border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                      value={settings.account.email}
                      onChange={(e) => handleChange('account', 'email', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">密碼</label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md sm:text-sm border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                      value={settings.account.password}
                      readOnly
                    />
                    <button
                      type="button"
                      className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      更改
                    </button>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="twoFactorAuth"
                        name="twoFactorAuth"
                        type="checkbox"
                        checked={settings.account.twoFactorAuth}
                        onChange={(e) => handleChange('account', 'twoFactorAuth', e.target.checked)}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="twoFactorAuth" className="font-medium text-gray-700">啟用兩步驗證</label>
                      <p className="text-gray-500">在登錄時增加額外的安全層，通過短信或驗證器應用程序接收驗證碼</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="language" className="block text-sm font-medium text-gray-700">語言</label>
                  <select
                    id="language"
                    name="language"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    value={settings.account.language}
                    onChange={(e) => handleChange('account', 'language', e.target.value)}
                  >
                    <option value="zh-HK">繁體中文 (香港)</option>
                    <option value="zh-TW">繁體中文 (台灣)</option>
                    <option value="en">English</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="currency" className="block text-sm font-medium text-gray-700">貨幣</label>
                  <select
                    id="currency"
                    name="currency"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    value={settings.account.currency}
                    onChange={(e) => handleChange('account', 'currency', e.target.value)}
                  >
                    <option value="HKD">港幣 (HKD)</option>
                    <option value="USD">美元 (USD)</option>
                    <option value="CNY">人民幣 (CNY)</option>
                    <option value="TWD">台幣 (TWD)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* 隱私設定 */}
          {activeTab === 'privacy' && (
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="showEmail"
                      name="showEmail"
                      type="checkbox"
                      checked={settings.privacy.showEmail}
                      onChange={(e) => handleChange('privacy', 'showEmail', e.target.checked)}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="showEmail" className="font-medium text-gray-700">在個人檔案中顯示電子郵箱</label>
                    <p className="text-gray-500">允許其他用戶在您的個人檔案頁面上看到您的電子郵箱</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="showPhone"
                      name="showPhone"
                      type="checkbox"
                      checked={settings.privacy.showPhone}
                      onChange={(e) => handleChange('privacy', 'showPhone', e.target.checked)}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="showPhone" className="font-medium text-gray-700">在個人檔案中顯示電話號碼</label>
                    <p className="text-gray-500">允許其他用戶在您的個人檔案頁面上看到您的電話號碼</p>
                  </div>
                </div>

                <div>
                  <label htmlFor="profileVisibility" className="block text-sm font-medium text-gray-700">個人檔案可見性</label>
                  <select
                    id="profileVisibility"
                    name="profileVisibility"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    value={settings.privacy.profileVisibility}
                    onChange={(e) => handleChange('privacy', 'profileVisibility', e.target.value)}
                  >
                    <option value="public">公開 - 所有人可見</option>
                    <option value="registered">已註冊用戶 - 只有註冊用戶可見</option>
                    <option value="private">私密 - 只有您自己可見</option>
                  </select>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="allowMessages"
                      name="allowMessages"
                      type="checkbox"
                      checked={settings.privacy.allowMessages}
                      onChange={(e) => handleChange('privacy', 'allowMessages', e.target.checked)}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="allowMessages" className="font-medium text-gray-700">允許接收私信</label>
                    <p className="text-gray-500">允許其他用戶向您發送私人訊息</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 通知設定 */}
          {activeTab === 'notifications' && (
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">通知方式</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="emailNotifications"
                        name="emailNotifications"
                        type="checkbox"
                        checked={settings.notifications.emailNotifications}
                        onChange={(e) => handleChange('notifications', 'emailNotifications', e.target.checked)}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="emailNotifications" className="font-medium text-gray-700">電子郵件通知</label>
                      <p className="text-gray-500">通過電子郵件接收重要更新和通知</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="pushNotifications"
                        name="pushNotifications"
                        type="checkbox"
                        checked={settings.notifications.pushNotifications}
                        onChange={(e) => handleChange('notifications', 'pushNotifications', e.target.checked)}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="pushNotifications" className="font-medium text-gray-700">推送通知</label>
                      <p className="text-gray-500">在您的設備上接收即時推送通知</p>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg leading-6 font-medium text-gray-900 pt-4">通知類型</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="bidUpdates"
                        name="bidUpdates"
                        type="checkbox"
                        checked={settings.notifications.bidUpdates}
                        onChange={(e) => handleChange('notifications', 'bidUpdates', e.target.checked)}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="bidUpdates" className="font-medium text-gray-700">競價更新</label>
                      <p className="text-gray-500">當您的競價物品有新出價或您參與的競價有更新時收到通知</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="priceDropAlerts"
                        name="priceDropAlerts"
                        type="checkbox"
                        checked={settings.notifications.priceDropAlerts}
                        onChange={(e) => handleChange('notifications', 'priceDropAlerts', e.target.checked)}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="priceDropAlerts" className="font-medium text-gray-700">價格下降提醒</label>
                      <p className="text-gray-500">當您收藏的物品價格下降時收到通知</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="newMessages"
                        name="newMessages"
                        type="checkbox"
                        checked={settings.notifications.newMessages}
                        onChange={(e) => handleChange('notifications', 'newMessages', e.target.checked)}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="newMessages" className="font-medium text-gray-700">新訊息</label>
                      <p className="text-gray-500">當您收到新訊息時收到通知</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="marketingEmails"
                        name="marketingEmails"
                        type="checkbox"
                        checked={settings.notifications.marketingEmails}
                        onChange={(e) => handleChange('notifications', 'marketingEmails', e.target.checked)}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="marketingEmails" className="font-medium text-gray-700">營銷電子郵件</label>
                      <p className="text-gray-500">接收有關優惠、折扣和新功能的信息</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 外觀設定 */}
          {activeTab === 'appearance' && (
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="theme" className="block text-sm font-medium text-gray-700">主題</label>
                  <select
                    id="theme"
                    name="theme"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    value={settings.appearance.theme}
                    onChange={(e) => handleChange('appearance', 'theme', e.target.value)}
                  >
                    <option value="light">淺色模式</option>
                    <option value="dark">深色模式</option>
                    <option value="system">跟隨系統</option>
                  </select>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="compactMode"
                      name="compactMode"
                      type="checkbox"
                      checked={settings.appearance.compactMode}
                      onChange={(e) => handleChange('appearance', 'compactMode', e.target.checked)}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="compactMode" className="font-medium text-gray-700">精簡模式</label>
                    <p className="text-gray-500">減小界面元素的間距，在同一頁面顯示更多內容</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 保存按鈕 */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              保存設定
            </button>
          </div>
        </div>

        {/* 成功訊息 */}
        {showSuccess && (
          <div className="fixed bottom-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-md transition-all">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p>設定已成功保存！</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 