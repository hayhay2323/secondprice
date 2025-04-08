import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Hero = ({ title, subtitle, children }) => {
  // 高級動畫配置
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };
  
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-primary-50">
      {/* 裝飾元素 */}
      <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-gradient-to-br from-primary-300/20 to-secondary-300/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-96 h-96 bg-gradient-to-tl from-secondary-300/20 to-primary-300/10 rounded-full blur-3xl" />
      
      {/* 網格背景 */}
      <div className="absolute inset-0 opacity-10 bg-grid-pattern" />
      
      <div className="container-custom py-16 sm:py-24 md:py-28 lg:py-32 relative z-10">
        <motion.div 
          className="lg:grid lg:grid-cols-12 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="sm:text-center md:mx-auto lg:col-span-6 lg:text-left flex flex-col justify-center">
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-800 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1.5">
                  <path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75z" clipRule="evenodd" />
                </svg>
                AI 驅動 • 循環經濟 • 環保創新
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl font-display font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600"
              variants={itemVariants}
            >
              {title || "讓閒置物品，創造最大價值"}
            </motion.h1>
            
            <motion.p 
              className="mt-6 text-lg text-gray-600 sm:mx-auto lg:mx-0"
              variants={itemVariants}
            >
              {subtitle || "SecondPrice 通過 AI 技術，識別閒置物品的潛在價值，並為您匹配最佳回收或二手買家渠道，讓物品獲得新生，同時為您帶來最大收益。"}
            </motion.p>
            
            <motion.div 
              className="mt-8 sm:flex sm:justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
              variants={itemVariants}
            >
              <button className="btn bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white rounded-full px-8 py-3.5 w-full sm:w-auto font-medium shadow-md hover:shadow-lg transition-all duration-300">
                立即嘗試 AI 估價
              </button>
              <button className="btn btn-outline border-2 border-primary-500 text-primary-700 rounded-full px-8 py-3.5 w-full sm:w-auto font-medium hover:bg-primary-50 transition-all duration-300">
                了解更多
              </button>
            </motion.div>
            
            <motion.div 
              className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4"
              variants={itemVariants}
            >
              <div className="flex items-center p-3 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm">
                <div className="flex-shrink-0 bg-primary-100 rounded-full p-2 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                </div>
                <span className="font-medium text-gray-800">AI 精準評估</span>
              </div>
              <div className="flex items-center p-3 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm">
                <div className="flex-shrink-0 bg-primary-100 rounded-full p-2 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <span className="font-medium text-gray-800">快速匹配買家</span>
              </div>
              <div className="flex items-center p-3 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm">
                <div className="flex-shrink-0 bg-primary-100 rounded-full p-2 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                  </svg>
                </div>
                <span className="font-medium text-gray-800">環保減廢</span>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="relative mt-12 sm:mx-auto lg:mt-0 lg:col-span-6 flex items-center justify-center"
            variants={itemVariants}
          >
            <div className="relative lg:ml-auto max-w-lg">
              {/* 3D效果卡片 */}
              <div className="absolute inset-0 -rotate-6 transform-gpu rounded-2xl bg-gradient-to-r from-primary-400 to-secondary-400 opacity-20 blur-2xl"></div>
              <div className="absolute inset-0 rotate-2 transform-gpu rounded-2xl bg-gradient-to-r from-secondary-300 to-primary-300 opacity-30 blur-xl"></div>
              
              <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1582578598774-a375d1a2c31b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="AI recycling analysis"
                  width={600}
                  height={500}
                  className="w-full h-auto object-cover"
                  unoptimized={true}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-6">
                  <div className="backdrop-blur-sm bg-white/20 rounded-xl p-4 w-full">
                    <h3 className="text-white font-bold text-lg">AI 智能回收評估</h3>
                    <p className="text-white/90 text-sm mt-1">透過物品照片，AI 即可評估最優回收方式和價值</p>
                  </div>
                </div>
                
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <button className="pointer-events-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:opacity-90 focus:outline-none transform transition-transform hover:scale-105 shadow-lg">
                    <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* 漂浮元素 */}
              <div className="absolute -top-6 -right-6 bg-white rounded-lg shadow-lg p-3 transform rotate-3">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-500 rounded-full h-8 w-8 flex items-center justify-center text-white mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">平均回收價值提升</p>
                    <p className="text-lg font-bold text-gray-900">+32%</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-8 bg-white rounded-lg shadow-lg p-3 transform -rotate-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-500 rounded-full h-8 w-8 flex items-center justify-center text-white mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">本月減少碳排放</p>
                    <p className="text-lg font-bold text-gray-900">895 公斤</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Hero; 