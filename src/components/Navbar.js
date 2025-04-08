import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

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
    { name: '搜索', path: '/search' },
    { name: '關於', path: '/about' },
    { name: '聯繫我們', path: '/contact' },
  ];

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container-custom">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className={`text-2xl font-bold ${isScrolled ? 'text-primary-600' : 'text-primary-600'}`}>
              Second<span className="text-primary-800">Price</span>
            </span>
          </Link>

          {/* 桌面導航 */}
          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <Link 
                href={item.path} 
                key={item.name}
                className={`font-medium hover:text-primary-600 transition-colors ${
                  isActive(item.path) 
                    ? 'text-primary-600 border-b-2 border-primary-600' 
                    : isScrolled ? 'text-gray-700' : 'text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* 行動裝置選單按鈕 */}
          <div className="md:hidden">
            <button
              type="button"
              className={`p-2 rounded-md ${isScrolled ? 'text-gray-700' : 'text-gray-700'}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* 行動裝置選單 */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2">
            <div className="flex flex-col space-y-3">
              {navigationItems.map((item) => (
                <Link 
                  href={item.path} 
                  key={item.name}
                  className={`px-3 py-2 rounded-md font-medium ${
                    isActive(item.path) 
                      ? 'bg-primary-50 text-primary-600' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 