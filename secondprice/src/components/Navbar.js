import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';

// 模擬認證狀態 (實際應用中應替換為真實的認證邏輯)
const useAuth = () => {
  // 暫時設為 true 以便演示登入後的效果
  // 可以改成 false 來查看未登入狀態
  const [isLoggedIn, setIsLoggedIn] = useState(true); 
  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);
  return { isLoggedIn, login, logout };
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const router = useRouter();
  const { isLoggedIn, login, logout } = useAuth(); // 使用模擬認證

  // 監聽滾動事件
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 檢查當前頁面路徑
  const isActive = (path) => {
    return router.pathname === path;
  };

  // 導航項目
  const navigationItems = [
    { name: '首頁', path: '/' },
    { name: '探索', path: '/explore' }, // 假設有個探索頁面
    { name: '二手物品', path: '/items' }, // 假設有二手物品列表頁
    { name: '競價平台', path: '/auctions' }, // 假設有競價頁面
  ];

  // 用戶選單項目
  const userMenuItems = [
    { name: '個人資料', path: '/profile' },
    { name: '我的商品', path: '/profile/items' },
    { name: '交易編年史', path: '/profile/timeline', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    )},
    { name: '設定', path: '/profile/settings' },
  ];

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/80 backdrop-blur-md py-4'}`}>
      <div className="container-custom">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className={`text-2xl font-bold ${isScrolled ? 'text-primary-600' : 'text-primary-600'}`}>
              Second<span className="text-secondary-600">Price</span>
            </span>
          </Link>

          {/* 桌面導航 */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navigationItems.map((item) => (
              <Link 
                href={item.path} 
                key={item.name}
                className={`font-medium hover:text-primary-600 transition-colors text-gray-700 ${
                  isActive(item.path) 
                    ? 'text-primary-600' // border-b-2 border-primary-600 - 可以考慮加底線或不同樣式
                    : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* 右側操作區域 */} 
          <div className="flex items-center space-x-2">
            {isLoggedIn ? (
              // --- 登入後狀態 --- 
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200 ${isUserMenuOpen ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  aria-label="用戶選單"
                >
                  {/* --- 獨特用戶圖標 --- */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {/* 可以替換成更獨特的 SVG 圖標 */} 
                </motion.button>
  
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none py-2"
                    >
                      <div className="px-4 py-3">
                        <p className="text-sm font-medium text-gray-900">用戶名稱</p>
                        <p className="text-xs text-gray-500">user@example.com</p>
                      </div>
                      <hr className="my-1" />
                      {userMenuItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.path}
                          className={`
                            flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors
                            ${isActive(item.path) ? 'bg-primary-50 text-primary-600 font-medium' : ''}
                          `}
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          {item.icon && <span className="mr-3 opacity-70">{item.icon}</span>}
                          {item.name}
                        </Link>
                      ))}
                      <hr className="my-1" />
                      <button
                        className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          logout(); // 觸發登出
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        登出
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              // --- 未登入狀態 --- 
              <div className="hidden md:flex items-center space-x-2">
                <Link href="/login">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    登入
                  </motion.button>
                </Link>
                <Link href="/register">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
                  >
                    註冊
                  </motion.button>
                </Link>
              </div>
            )}

            {/* 行動裝置選單按鈕 */} 
            <div className="md:hidden">
              <button
                type="button"
                className={`p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="開啟選單"
              >
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* 行動裝置選單 */} 
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="pt-4 pb-3 border-t border-gray-200">
                <nav className="flex flex-col space-y-1">
                  {navigationItems.map((item) => (
                    <Link 
                      href={item.path} 
                      key={`mobile-${item.name}`}
                      className={`px-3 py-2 rounded-md font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors ${
                        isActive(item.path) ? 'bg-primary-50 text-primary-600' : ''
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
                
                {/* 行動端用戶選單 */} 
                <div className="mt-4 pt-4 border-t border-gray-200">
                  {isLoggedIn ? (
                    <div className="space-y-1">
                      <div className="px-3 py-2">
                        <p className="text-sm font-medium text-gray-900">用戶名稱</p>
                        <p className="text-xs text-gray-500">user@example.com</p>
                      </div>
                      {userMenuItems.map((item) => (
                        <Link 
                          href={item.path} 
                          key={`mobile-user-${item.name}`}
                          className={`flex items-center px-3 py-2 rounded-md font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors ${
                            isActive(item.path) ? 'bg-primary-50 text-primary-600' : ''
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.icon && <span className="mr-3 opacity-70">{item.icon}</span>}
                          {item.name}
                        </Link>
                      ))}
                      <button
                        className="flex w-full items-center px-3 py-2 rounded-md font-medium text-red-600 hover:bg-red-50 transition-colors"
                        onClick={() => {
                          setIsMenuOpen(false);
                          logout(); // 觸發登出
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        登出
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-2">
                       <Link href="/login">
                        <motion.button 
                          className="w-full px-3 py-2 text-center text-sm font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          登入
                        </motion.button>
                      </Link>
                      <Link href="/register">
                        <motion.button 
                          className="w-full px-3 py-2 text-center text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          註冊
                        </motion.button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
} 