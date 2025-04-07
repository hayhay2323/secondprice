import Head from 'next/head';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// 團隊成員數據
const teamMembers = [
  {
    name: '陳志明',
    role: '創始人兼首席執行官',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    bio: '擁有10年電商與循環經濟領域經驗，致力於通過技術創新解決社會問題。'
  },
  {
    name: '黃淑華',
    role: '產品總監',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    bio: '前領先科技公司產品經理，專注於打造無縫用戶體驗和數據驅動的產品決策。'
  },
  {
    name: '李文傑',
    role: '技術負責人',
    image: 'https://randomuser.me/api/portraits/men/76.jpg',
    bio: '全棧開發者與AI專家，熱衷於將複雜技術轉化為解決實際問題的應用。'
  },
  {
    name: '張美玲',
    role: '市場營銷主管',
    image: 'https://randomuser.me/api/portraits/women/66.jpg',
    bio: '擅長品牌建設和數位營銷策略，曾幫助多家初創公司成功打入市場。'
  }
];

// 公司核心價值觀
const coreValues = [
  {
    title: '環境可持續性',
    description: '我們致力於減少浪費和環境污染，推動資源的循環再利用。',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: '技術創新',
    description: '我們不斷探索和應用先進技術，為用戶提供最佳的價值比較體驗。',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    )
  },
  {
    title: '社會責任',
    description: '我們相信企業有責任創造積極的社會影響，促進更平等、可持續的經濟模式。',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  },
  {
    title: '用戶至上',
    description: '我們的產品和服務始終以用戶需求為中心，致力於提供最優質的體驗。',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
      </svg>
    )
  },
];

// 里程碑數據
const milestones = [
  {
    year: '2021',
    title: '創立',
    description: 'Second Price在香港成立，開始構建二手物品價格比較平台的願景。'
  },
  {
    year: '2022',
    title: '第一階段發展',
    description: '推出測試版產品，整合Carousell平台數據，獲得第一批用戶反饋。'
  },
  {
    year: '2023',
    title: '技術升級',
    description: '引入AI技術，優化搜索和比較算法，平台支持多個二手交易平台。'
  },
  {
    year: '2024',
    title: '全面升級',
    description: '全新UI/UX設計和功能升級，用戶數量實現顯著增長，獲得投資者關注。'
  }
];

export default function AboutPage() {
  // 動畫變量
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Head>
        <title>關於我們 | Second Price</title>
        <meta name="description" content="了解Second Price的使命、團隊和我們如何幫助用戶找到最優惠的二手商品。" />
      </Head>

      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        {/* 頁面標題區域 */}
        <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16">
          <div className="container-custom">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">關於 Second Price</h1>
              <p className="text-xl text-primary-100">
                我們的使命是讓每個人都能輕鬆找到最優惠的二手商品，
                促進循環經濟的發展，為地球創造更可持續的未來。
              </p>
            </motion.div>
          </div>
        </section>

        {/* 我們的故事 */}
        <section className="py-16">
          <div className="container-custom">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            >
              <div>
                <h2 className="text-3xl font-bold mb-6">我們的故事</h2>
                <p className="text-gray-600 mb-4">
                  Second Price 源於創始人陳志明在尋找二手物品時的親身經歷。他發現要在多個平台比較價格既耗時又繁瑣，而這往往導致消費者無法找到真正物超所值的選擇。
                </p>
                <p className="text-gray-600 mb-4">
                  2021年，團隊決定創建一個解決方案，利用技術將多個平台的二手物品信息整合在一起，讓用戶能夠一目了然地比較價格和狀態，做出最明智的購買決定。
                </p>
                <p className="text-gray-600">
                  如今，Second Price 已經成為香港領先的二手商品比較平台，每月幫助數萬用戶節省時間和金錢，同時也為環境可持續發展貢獻力量。
                </p>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="二手市場" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* 核心價值觀 */}
        <section className="py-16 bg-gray-100">
          <div className="container-custom">
            <div className="text-center mb-12">
              <motion.h2 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="text-3xl font-bold mb-4"
              >
                我們的核心價值觀
              </motion.h2>
              <motion.p 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="text-xl text-gray-600 max-w-3xl mx-auto"
              >
                這些價值觀指導我們的決策和產品開發過程
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreValues.map((value, index) => (
                <motion.div 
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      transition: { 
                        duration: 0.5,
                        delay: index * 0.1
                      } 
                    }
                  }}
                  className="bg-white rounded-lg p-6 shadow-sm"
                >
                  <div className="mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 我們的團隊 */}
        <section className="py-16">
          <div className="container-custom">
            <div className="text-center mb-12">
              <motion.h2 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="text-3xl font-bold mb-4"
              >
                認識我們的團隊
              </motion.h2>
              <motion.p 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="text-xl text-gray-600 max-w-3xl mx-auto"
              >
                由充滿熱情的專業人士組成，致力於實現我們的使命
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div 
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    hidden: { opacity: 0, scale: 0.9 },
                    visible: { 
                      opacity: 1, 
                      scale: 1, 
                      transition: { 
                        duration: 0.5,
                        delay: index * 0.1
                      } 
                    }
                  }}
                  className="bg-white rounded-lg overflow-hidden shadow-sm"
                >
                  <div className="aspect-square">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-primary-600 mb-3">{member.role}</p>
                    <p className="text-gray-600">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 我們的發展歷程 */}
        <section className="py-16 bg-gray-100">
          <div className="container-custom">
            <div className="text-center mb-16">
              <motion.h2 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="text-3xl font-bold mb-4"
              >
                我們的發展歷程
              </motion.h2>
              <motion.p 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="text-xl text-gray-600 max-w-3xl mx-auto"
              >
                從創立至今的重要里程碑
              </motion.p>
            </div>
            
            <div className="relative">
              {/* 連接線 */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-200"></div>
              
              <div className="relative z-10">
                {milestones.map((milestone, index) => (
                  <motion.div 
                    key={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
                      visible: { 
                        opacity: 1, 
                        x: 0, 
                        transition: { 
                          duration: 0.5,
                          delay: index * 0.2
                        } 
                      }
                    }}
                    className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                      <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                      <div className="bg-primary-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-md">
                        {milestone.year}
                      </div>
                    </div>
                    <div className="w-1/2"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 聯繫我們區域 */}
        <section className="py-16 bg-gradient-to-br from-primary-500 to-primary-700 text-white">
          <div className="container-custom text-center">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-3xl font-bold mb-6"
            >
              有任何問題？
            </motion.h2>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto"
            >
              我們很樂意聽取您的意見和問題。您可以通過以下方式聯繫我們。
            </motion.p>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <a 
                href="mailto:contact@secondprice.hk" 
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors inline-block"
              >
                聯繫我們
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
} 