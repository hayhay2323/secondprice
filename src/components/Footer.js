import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Footer = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // 關於我們的連結
  const aboutLinks = [
    { name: "關於我們", href: "/about" },
    { name: "我們的使命", href: "/mission" },
    { name: "隱私政策", href: "/privacy" },
    { name: "服務條款", href: "/terms" },
  ];

  // 服務連結
  const serviceLinks = [
    { name: "二手比價", href: "/search" },
    { name: "物品評估", href: "/evaluate" },
    { name: "回收指南", href: "/recycle-guide" },
    { name: "賣家中心", href: "/seller" },
  ];

  // 資源連結
  const resourceLinks = [
    { name: "環保知識庫", href: "/knowledge" },
    { name: "常見問題", href: "/faq" },
    { name: "使用教學", href: "/tutorial" },
    { name: "聯絡我們", href: "/contact" },
  ];

  // 社交媒體鏈接
  const socialLinks = [
    { 
      name: 'Facebook', 
      href: 'https://facebook.com',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
        </svg>
      )
    },
    { 
      name: 'Twitter', 
      href: 'https://twitter.com',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
        </svg>
      ) 
    },
    { 
      name: 'Instagram', 
      href: 'https://instagram.com',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ) 
    },
    { 
      name: 'LinkedIn', 
      href: 'https://linkedin.com',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
        </svg>
      ) 
    },
  ];

  return (
    <footer className="relative">
      {/* 背景裝飾 */}
      <div className="absolute inset-0 bg-gray-900 -z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/30 to-secondary-900/30 -z-10"></div>
      
      {/* 波浪分隔符 */}
      <div className="absolute top-0 left-0 right-0 transform -translate-y-99%">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto text-gray-900 fill-current">
          <path d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,218.7C672,203,768,149,864,117.3C960,85,1056,75,1152,80C1248,85,1344,107,1392,117.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      <div className="container-custom pt-16 pb-12 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-10">
          {/* Logo與介紹區 */}
          <motion.div 
            className="lg:col-span-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Link href="/" className="inline-block mb-6">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">SP</span>
                </div>
                <span className="ml-2 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-300">
                  SecondPrice
                </span>
              </div>
            </Link>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              我們致力於推動循環經濟發展，透過智能比價和資源匹配，讓二手物品找到新主人，減少資源浪費與環境汙染。
            </p>
            
            {/* 社交媒體鏈接 */}
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a 
                  key={index} 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800/30 rounded-full"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </motion.div>
          
          {/* 連結區域 */}
          <FooterLinkColumn title="關於我們" links={aboutLinks} delay={0.1} />
          <FooterLinkColumn title="我們的服務" links={serviceLinks} delay={0.2} />
          <FooterLinkColumn title="資源中心" links={resourceLinks} delay={0.3} />
          
          {/* 訂閱區域 */}
          <motion.div
            className="lg:col-span-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            custom={0.4}
          >
            <h3 className="text-lg font-semibold mb-4">訂閱最新消息</h3>
            <p className="text-gray-300 mb-4">獲取最新的二手市場趨勢、環保資訊與優惠活動</p>
            <form className="space-y-3">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="您的電子郵件" 
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
                />
                <button 
                  type="submit"
                  className="absolute right-1.5 top-1.5 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white rounded-md px-4 py-1.5 text-sm font-medium transition-all duration-300 hover:shadow-lg"
                >
                  訂閱
                </button>
              </div>
              <p className="text-xs text-gray-500">我們尊重您的隱私，不會發送垃圾郵件。</p>
            </form>
          </motion.div>
        </div>
        
        {/* 分隔線 */}
        <div className="border-t border-gray-800 my-8"></div>
        
        {/* 底部版權資訊 */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} SecondPrice.hk 版權所有</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-primary-400 transition-colors">隱私政策</Link>
            <Link href="/terms" className="hover:text-primary-400 transition-colors">使用條款</Link>
            <Link href="/sitemap" className="hover:text-primary-400 transition-colors">網站地圖</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// 頁腳連結欄目組件
const FooterLinkColumn = ({ title, links, delay = 0 }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { 
          opacity: 1, 
          y: 0, 
          transition: { 
            duration: 0.6,
            delay 
          } 
        }
      }}
    >
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ul className="space-y-3">
        {links.map((link, index) => (
          <li key={index}>
            <Link 
              href={link.href} 
              className="text-gray-300 hover:text-primary-400 transition-colors hover:translate-x-1 inline-block hover:underline decoration-primary-500 underline-offset-4"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Footer; 