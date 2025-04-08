import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navigationItems = [
    { name: '首頁', path: '/' },
    { name: '搜尋', path: '/search' },
    { name: '關於我們', path: '/about' },
    { name: '聯絡我們', path: '/contact' },
  ];

  const isActive = (path) => {
    return router.pathname === path;
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className={`fixed w-full top-0 z-50 transition-all duration-300 backdrop-blur-lg ${
        isScrolled ? 'bg-white/90 shadow-lg py-2' : 'bg-white/80 py-4'
      }`}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div 
              whileHover={{ rotate: 5, scale: 1.1 }}
              className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center text-white font-bold text-sm"
            >
              SP
            </motion.div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600 transition-all duration-300 group-hover:tracking-wider">
              SecondPrice
            </span>
          </Link>

          {/* 桌面導航 */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link 
                href={item.path} 
                key={item.name}
                className="group relative font-medium transition-colors text-gray-700 hover:text-primary-600"
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full ${
                  isActive(item.path) ? 'w-full' : ''
                }`}></span>
              </Link>
            ))}
          </nav>

          {/* 搜尋和用戶操作區 */}
          <div className="flex items-center space-x-4">
            {/* 搜尋按鈕 */}
            <AnimatePresence>
              {isSearchOpen ? (
                <motion.div 
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 200, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="relative"
                >
                  <input
                    type="text"
                    placeholder="搜尋二手商品..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-3 pr-10 py-2 text-sm rounded-full border-2 border-primary-300 focus:outline-none focus:border-primary-500"
                  />
                  <button 
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute right-3 top-2.5 text-gray-500 hover:text-primary-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </motion.div>
              ) : (
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="搜尋"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </motion.button>
              )}
            </AnimatePresence>

            {/* 登入/註冊按鈕 */}
            <div className="hidden sm:flex items-center space-x-3">
              <motion.button 
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                登入
              </motion.button>
              <motion.button 
                whileHover={{ y: -2, boxShadow: '0 4px 6px rgba(0, 100, 100, 0.2)' }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-1.5 text-sm font-medium text-white rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 transition-all duration-300"
              >
                註冊
              </motion.button>
            </div>

            {/* 手機選單按鈕 */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md md:hidden hover:bg-gray-100 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* 手機選單 */}
        <AnimatePresence>
        {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 overflow-hidden"
            >
              <div className="flex flex-col space-y-3 py-4">
              {navigationItems.map((item) => (
                <Link 
                  href={item.path} 
                  key={item.name}
                    className={`px-4 py-2 rounded-lg ${
                    isActive(item.path) 
                        ? 'bg-primary-50 text-primary-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
                <div className="flex space-x-3 px-4 pt-2">
                  <button className="flex-1 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    登入
                  </button>
                  <button className="flex-1 py-2 text-sm font-medium text-white rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 transition-colors">
                    註冊
                  </button>
            </div>
          </div>
            </motion.div>
        )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
} 