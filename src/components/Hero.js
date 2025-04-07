import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('all');
  
  const handleSearch = (e) => {
    e.preventDefault();
    // 實現搜索邏輯
    console.log('搜索:', searchTerm, '類別:', searchCategory);
  };

  const categories = [
    { id: 'all', name: '全部' },
    { id: 'electronics', name: '電子產品' },
    { id: 'furniture', name: '傢俬' },
    { id: 'fashion', name: '服裝' },
    { id: 'collectibles', name: '收藏品' }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const scaleIn = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } }
  };

  const statsItems = [
    { label: '二手物品', value: '25,000+' },
    { label: '活躍用戶', value: '5,000+' },
    { label: '平均省下', value: '40%' },
    { label: '成功交易', value: '10,000+' }
  ];

  return (
    <div className="relative pt-20 overflow-hidden">
      {/* 背景裝飾 */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[30%] -right-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary-100/40 to-primary-200/40 blur-3xl"></div>
        <div className="absolute top-[60%] -left-[10%] w-[400px] h-[400px] rounded-full bg-gradient-to-tl from-secondary-100/40 to-secondary-200/40 blur-3xl"></div>
      </div>

      <motion.div 
        className="container-custom pt-16 pb-24 md:pb-32"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 左側文字區塊 */}
          <div className="space-y-8">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              variants={itemVariants}
            >
              <span className="block">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">比價省錢</span> 更環保
              </span>
              <span className="block mt-1">二手購物新選擇</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 max-w-xl"
              variants={itemVariants}
            >
              SecondPrice.hk 匯集香港各大二手平台商品，智能比價，讓您輕鬆找到最划算的二手寶貝，同時響應可持續發展。
            </motion.p>

            {/* 搜索框 */}
            <motion.div variants={itemVariants}>
              <form 
                onSubmit={handleSearch}
                className="flex flex-col sm:flex-row sm:items-center gap-3 p-2 bg-white rounded-xl shadow-lg max-w-lg"
              >
                <div className="flex-1 relative">
                  <div className="absolute left-3 top-3 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="搜尋二手商品..."
                    className="w-full pl-10 pr-4 py-3 text-gray-900 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <select
                    className="px-3 py-3 rounded-lg border-none bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={searchCategory}
                    onChange={(e) => setSearchCategory(e.target.value)}
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="px-5 py-3 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium transition-all duration-300 hover:shadow-lg"
                  >
                    搜尋
                  </motion.button>
                </div>
              </form>
            </motion.div>

            {/* 統計信息 */}
            <motion.div 
              className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4"
              variants={fadeIn}
            >
              {statsItems.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary-600">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* 右側圖片/示意圖 */}
          <motion.div 
            className="relative"
            variants={scaleIn}
          >
            <div className="relative z-10 bg-white p-3 rounded-2xl shadow-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1555529771-835f59fc5efe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                alt="二手市場"
                className="w-full h-auto rounded-xl"
              />
              
              {/* 浮動價格標籤 */}
              <motion.div 
                className="absolute top-6 right-6 bg-white px-3 py-1.5 rounded-full shadow-lg flex items-center"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <span className="text-green-600 font-semibold">$1,299</span>
                <span className="text-gray-400 text-sm line-through ml-2">$2,199</span>
                <span className="ml-2 bg-green-100 text-green-800 text-xs px-1.5 py-0.5 rounded-full">省 41%</span>
              </motion.div>
              
              {/* 浮動評分標籤 */}
              <motion.div 
                className="absolute bottom-6 left-6 bg-white px-3 py-1.5 rounded-full shadow-lg flex items-center"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map(star => (
                    <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-1 text-gray-700 text-sm">4.85 (94)</span>
              </motion.div>
            </div>
            
            {/* 裝飾性元素 */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-primary-200 to-primary-300 rounded-full -z-10 blur-md"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-secondary-200 to-secondary-300 rounded-full -z-10 blur-md"></div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero; 