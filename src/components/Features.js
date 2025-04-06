import React from 'react';
import { motion } from 'framer-motion'

const Features = ({ title, subtitle, features }) => {
  // 如果沒有傳入features，使用默認功能列表
  const defaultFeatures = [
    {
      title: 'AI 識別技術',
      description: '透過先進的電腦視覺和深度學習算法，準確識別不同類型的物品及其屬性。',
      icon: '🤖'
    },
    {
      title: '多維度價值評估',
      description: '從二手價值、零件價值、材料回收價值等多個維度，全面評估物品的潛在價值。',
      icon: '💰'
    },
    {
      title: '智能匹配系統',
      description: '根據物品特性和市場需求，自動匹配最佳的回收渠道或二手買家。',
      icon: '🔄'
    },
    {
      title: '環保數據追蹤',
      description: '記錄每次回收或二手交易所節省的資源和減少的碳排放，量化您對環保的貢獻。',
      icon: '🌱'
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
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <div id="features" className="bg-white py-16 sm:py-24">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {title || "強大功能，智能回收"}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {subtitle || "我們的平台結合了先進的 AI 技術和循環經濟理念，提供全方位的廢品處理解決方案。"}
          </p>
        </div>

        <motion.div 
          className="mt-16"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayFeatures.map((feature, index) => (
              <motion.div 
                key={index} 
                className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow"
                variants={item}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Features; 