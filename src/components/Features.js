import React from 'react';
import { motion } from 'framer-motion';

const Features = ({ title, subtitle, features }) => {
  // 如果沒有傳入features，使用默認功能列表
  const defaultFeatures = [
    {
      title: 'AI 識別技術',
      description: '透過先進的電腦視覺和深度學習算法，準確識別不同類型的物品及其屬性。',
      icon: '🤖',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      title: '多維度價值評估',
      description: '從二手價值、零件價值、材料回收價值等多個維度，全面評估物品的潛在價值。',
      icon: '💰',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      title: '智能匹配系統',
      description: '根據物品特性和市場需求，自動匹配最佳的回收渠道或二手買家。',
      icon: '🔄',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: '環保數據追蹤',
      description: '記錄每次回收或二手交易所節省的資源和減少的碳排放，量化您對環保的貢獻。',
      icon: '🌱',
      color: 'from-green-500 to-lime-500'
    }
  ];

  const displayFeatures = features || defaultFeatures;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div id="features" className="bg-gradient-to-b from-white to-gray-50 py-20 sm:py-28">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block">
              {title || "強大功能，智能回收"}
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 transform -skew-x-12"></div>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto mt-6"
          >
            {subtitle || "我們的平台結合了先進的 AI 技術和循環經濟理念，提供全方位的廢品處理解決方案。"}
          </motion.p>
        </div>

        <motion.div 
          className="mt-16 px-4 sm:px-0"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayFeatures.map((feature, index) => (
              <motion.div 
                key={index} 
                className="group"
                variants={item}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full">
                  <div className={`p-6 pb-8 h-full flex flex-col`}>
                    <div className="flex items-center mb-4">
                      <div className={`text-4xl p-3 rounded-xl bg-gradient-to-br ${feature.color || 'from-primary-500 to-secondary-500'} text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold ml-4 group-hover:text-primary-600 transition-colors">{feature.title}</h3>
                    </div>
                    
                    <p className="text-gray-600 mt-2 flex-grow">{feature.description}</p>
                    
                    <motion.div 
                      className="mt-6 w-8 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full group-hover:w-full transition-all duration-300"
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 統計區塊 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-24 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-2xl p-8 sm:p-10"
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-gray-800">平台成效</h3>
            <p className="text-gray-600 mt-2">透過數據展示我們為環境帶來的積極影響</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <Stat number="5.2萬" label="已回收物品" />
            <Stat number="1.3萬" label="成功交易" />
            <Stat number="876噸" label="減少碳排放" />
            <Stat number="98%" label="用戶滿意度" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// 統計數字動畫組件
const Stat = ({ number, label }) => {
  return (
    <div className="text-center relative">
      <div className="absolute inset-0 bg-primary-500/5 rounded-xl -z-10 transform rotate-3"></div>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-xl py-6 shadow-sm"
      >
        <div className="text-3xl sm:text-4xl font-bold text-primary-600">{number}</div>
        <div className="text-gray-600 mt-1">{label}</div>
      </motion.div>
    </div>
  );
};

export default Features; 