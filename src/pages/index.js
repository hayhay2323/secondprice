import { useState, useRef, useEffect } from 'react';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Footer from '../components/Footer'
import Image from 'next/image';
import axios from 'axios'; // 引入 axios
import AuthModal from '../components/AuthModal'; // Import the new component
import ExploreFeed from '../components/ExploreFeed'; // Import ExploreFeed
import ProductList from '../components/ProductList'; // Import ProductList
import BiddingSection from '../components/BiddingSection'; // Import BiddingSection

// Helper function for conditional class names
const cn = (...classes) => classes.filter(Boolean).join(' ');

export default function Home() {
  const router = useRouter();
  const [searchKeyword, setSearchKeyword] = useState('');

  // 添加語言偏好狀態
  const [language, setLanguage] = useState('zh-HK'); // 默認為繁體中文

  // 登入狀態
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Add state for showing the modal
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  // 發帖子模態框的狀態
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    image: '',
    tags: ''
  });
  const [postSuccess, setPostSuccess] = useState(false);
  
  // Add random values state to avoid hydration mismatch
  const [likeCounts, setLikeCounts] = useState({});
  const [commentCounts, setCommentCounts] = useState({});
  const [viewCounts, setViewCounts] = useState({});
  const [showPlatformComparison, setShowPlatformComparison] = useState({});
  
  // Effect to initialize random values client-side only
  useEffect(() => {
    // Generate random values after component mounts (client-side only)
    const newLikeCounts = {};
    const newCommentCounts = {};
    const newViewCounts = {};
    const newShowPlatformComparison = {};
    
    feedItems.forEach(item => {
      newLikeCounts[`feed-${item.id}`] = Math.floor(Math.random() * 50) + 5;
      newCommentCounts[`feed-${item.id}`] = Math.floor(Math.random() * 20);
      newViewCounts[`feed-${item.id}`] = Math.floor(Math.random() * 1000) + 100;
    });
    
    scrapedProducts.forEach(product => {
      newShowPlatformComparison[`${product.platform}-${product.id}`] = Math.random() > 0.7;
    });
    
    setLikeCounts(newLikeCounts);
    setCommentCounts(newCommentCounts);
    setViewCounts(newViewCounts);
    setShowPlatformComparison(newShowPlatformComparison);
  }, []);
  
  // 內容 feed 項目
  const [feedItems, setFeedItems] = useState([
    {
      id: 1,
      title: '舊iPhone回收價值攻略',
      content: '不同型號舊iPhone的回收價值差異巨大！iPhone 12以上機型仍保持較高轉售價值，特別是Pro系列。電池健康度>85%，無螢幕破裂的機型可獲更高評價。',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500',
      likes: 278,
      comments: 32,
      author: {
        name: '科技達人',
        avatar: 'https://i.pravatar.cc/150?img=11'
      },
      tags: ['電子產品', '回收指南', 'iPhone']
    },
    {
      id: 2,
      title: '二手傢俱翻新技巧',
      content: '木質傢俱只需簡單打磨和上漆，就能煥然一新！分享幾個我最近翻新的實例，以及使用的工具和材料。正確翻新不僅環保，還能為你節省上萬元購買新傢俱的費用。',
      image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=500',
      likes: 156,
      comments: 24,
      author: {
        name: '家居設計師',
        avatar: 'https://i.pravatar.cc/150?img=5'
      },
      tags: ['傢俱', '翻新', 'DIY']
    },
    {
      id: 3,
      title: '古着收藏與保養指南',
      content: '收集復古服飾既環保又能彰顯個性！這篇文章分享如何鑑別真正有價值的古着，以及正確的保養方法。特別說明哪些品牌和年份的服裝最值得收藏。',
      image: 'https://images.unsplash.com/photo-1616048056617-93b94a339009?w=500',
      likes: 342,
      comments: 47,
      author: {
        name: '復古時尚達人',
        avatar: 'https://i.pravatar.cc/150?img=3'
      },
      tags: ['古着', '時尚', '收藏']
    },
    {
      id: 4,
      title: '香港電子垃圾回收指南',
      content: '電子垃圾含有多種可回收的貴重金屬！詳解香港各區的電子垃圾回收點位置，以及各類電子產品的回收價值。特別推薦幾家誠信的回收商，讓你的舊電子產品得到合理的價格。',
      image: 'https://images.unsplash.com/photo-1610126998920-be192904731a?w=500',
      likes: 189,
      comments: 29,
      author: {
        name: '環保先鋒',
        avatar: 'https://i.pravatar.cc/150?img=7'
      },
      tags: ['電子垃圾', '回收', '香港']
    },
    {
      id: 5,
      title: '二手單反相機選購指南',
      content: '入手二手單反相機前需要注意什麼？本文詳細介紹如何檢查快門數、感光元件和鏡頭狀況，避開常見陷阱。還有各品牌二手相機的保值率比較。',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500',
      likes: 215,
      comments: 38,
      author: {
        name: '攝影愛好者',
        avatar: 'https://i.pravatar.cc/150?img=21'
      },
      tags: ['相機', '攝影', '二手選購']
    },
    {
      id: 6,
      title: '百變舊衣改造計劃',
      content: '別急著丟棄不穿的舊衣服！這篇文章分享 10 種簡單的改造方法，讓你的舊T恤、牛仔褲煥發新生。只需要基本的縫紉技巧，就能創造獨一無二的時尚單品。',
      image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500',
      likes: 302,
      comments: 54,
      author: {
        name: '創意時尚家',
        avatar: 'https://i.pravatar.cc/150?img=32'
      },
      tags: ['舊衣改造', '可持續時尚', 'DIY']
    },
    {
      id: 7,
      title: '二手遊戲主機比較：PS5 vs Xbox Series X',
      content: '兩大主機二手市場價格走勢分析。哪個平台遊戲更保值？哪些配件最值得額外投資？全面分析各區域二手主機價格差異，以及如何避免買到翻新機或故障機。',
      image: 'https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=500',
      likes: 178,
      comments: 42,
      author: {
        name: '遊戲評論家',
        avatar: 'https://i.pravatar.cc/150?img=15'
      },
      tags: ['遊戲主機', 'PS5', 'Xbox']
    },
    {
      id: 8,
      title: '舊書回收與二手書店地圖',
      content: '香港二手書店完全指南！除了常見的天光墟，還有這些隱藏在小巷中的寶藏書店。文章還包括不同類型舊書的回收價值評估，以及如何通過網絡平台賣出你的舊書。',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500',
      likes: 203,
      comments: 27,
      author: {
        name: '書蟲達人',
        avatar: 'https://i.pravatar.cc/150?img=28'
      },
      tags: ['舊書', '二手書店', '閱讀']
    }
  ]);

  // ---- 恢復登入後需要的狀態 ----
  const [activeTab, setActiveTab] = useState('explore'); // 默認顯示探索
  
  // 二手物品狀態
  const [scrapedProducts, setScrapedProducts] = useState([
    {
      id: 1,
      title: 'iPhone 13 Pro Max 256GB 銀色',
      price: 4580,
      originalPrice: 5200,
      condition: '9成新',
      platform: 'Carousell',
      location: '荃灣',
      image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=500',
      url: '#',
      category: '電子產品'
    },
    {
      id: 2,
      title: 'Samsung Galaxy S21 Ultra 黑色 512GB',
      price: 3200,
      originalPrice: null,
      condition: '8成新',
      platform: 'Facebook',
      location: '觀塘',
      image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500',
      url: '#',
      category: '電子產品'
    },
    {
      id: 3,
      title: 'MacBook Pro 2021 M1 Pro 16吋',
      price: 9200,
      originalPrice: 10500,
      condition: '95%新',
      platform: 'Carousell',
      location: '中環',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
      url: '#',
      category: '電子產品'
    },
    {
      id: 4,
      title: 'AirPods Pro 2 帶保養',
      price: 1150,
      originalPrice: 1799,
      condition: '全新',
      platform: 'Facebook',
      location: '太古',
      image: 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=500',
      url: '#',
      category: '電子產品'
    },
    {
      id: 5,
      title: 'Sony PlayStation 5 光碟版',
      price: 3300,
      originalPrice: 3980,
      condition: '9成新',
      platform: 'Carousell',
      location: '旺角',
      image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500',
      url: '#',
      category: '電子產品'
    },
    {
      id: 6,
      title: 'iPad Pro 11 2022 M2 256GB',
      price: 5900,
      originalPrice: 6799,
      condition: '95%新',
      platform: 'Facebook',
      location: '將軍澳',
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500',
      url: '#',
      category: '電子產品'
    },
    {
      id: 7,
      title: 'IKEA MALM 書桌 橡木',
      price: 550,
      originalPrice: 899,
      condition: '9成新',
      platform: 'Carousell',
      location: '大埔',
      image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=500',
      url: '#',
      category: '家居用品'
    },
    {
      id: 8,
      title: 'MUJI 無印良品 單人沙發',
      price: 1200,
      originalPrice: 1999,
      condition: '8成新',
      platform: 'Facebook',
      location: '沙田',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500',
      url: '#',
      category: '家居用品'
    },
    {
      id: 9,
      title: 'Levi\'s 501 牛仔褲 30x32',
      price: 280,
      originalPrice: 650,
      condition: '全新',
      platform: 'Carousell',
      location: '銅鑼灣',
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
      url: '#',
      category: '時尚服飾'
    },
    {
      id: 10,
      title: 'Nike Air Force 1 白色 US9',
      price: 550,
      originalPrice: 899,
      condition: '9成新',
      platform: 'Facebook',
      location: '旺角',
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500',
      url: '#',
      category: '時尚服飾'
    },
    {
      id: 11,
      title: '哈利波特全集 繁體中文版',
      price: 350,
      originalPrice: 690,
      condition: '9成新',
      platform: 'Carousell',
      location: '屯門',
      image: 'https://images.unsplash.com/photo-1500697017927-99763262c802?w=500',
      url: '#',
      category: '書籍文具'
    },
    {
      id: 12,
      title: 'Canon EOS R6 無反相機',
      price: 10800,
      originalPrice: 15999,
      condition: '95%新',
      platform: 'Facebook',
      location: '尖沙咀',
      image: 'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=500',
      url: '#',
      category: '攝影器材'
    }
  ]);
  const [productSearchTerm, setProductSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('全部'); // Filter for platform
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('全部'); // Filter for category

  // 競價平台狀態
  const [activeBiddings, setActiveBiddings] = useState([
    {
      id: 1,
      title: 'Apple MacBook Pro M3 Pro',
      description: '全新 Apple MacBook Pro，搭載 M3 Pro 晶片，16GB 統一記憶體，512GB SSD',
      image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500',
      startPrice: 11999,
      currentBid: 12500,
      bidCount: 8,
      endTime: new Date(Date.now() + 3600000 * 24 * 2).toISOString(), // 2 days from now
      seller: {
        name: '蘋果專賣店',
        avatar: 'https://i.pravatar.cc/150?img=12',
        rating: 4.9
      },
      bidders: []
    },
    {
      id: 2,
      title: 'Sony a7IV 全片幅無反相機',
      description: '全新 Sony a7IV，支援4K 60p錄像，3300萬有效像素，優異的自動對焦性能',
      image: 'https://images.unsplash.com/photo-1621520291095-aa6c7137f048?w=500',
      startPrice: 15800,
      currentBid: 16200,
      bidCount: 5,
      endTime: new Date(Date.now() + 3600000 * 24 * 3).toISOString(), // 3 days from now
      seller: {
        name: '攝影器材專門店',
        avatar: 'https://i.pravatar.cc/150?img=14',
        rating: 4.7
      },
      bidders: []
    },
    {
      id: 3,
      title: 'Nike x Stussy 限量聯名T恤',
      description: '全新 Nike x Stussy 2024春季限量聯名系列T恤，S/M/L/XL尺寸可選',
      image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500',
      startPrice: 799,
      currentBid: 920,
      bidCount: 12,
      endTime: new Date(Date.now() + 3600000 * 24 * 1).toISOString(), // 1 day from now
      seller: {
        name: '潮流前線',
        avatar: 'https://i.pravatar.cc/150?img=16',
        rating: 4.8
      },
      bidders: []
    },
    {
      id: 4,
      title: 'Nintendo Switch OLED 白色',
      description: '全新 Nintendo Switch OLED 白色主機，7吋OLED螢幕，增強音效，64GB儲存空間',
      image: 'https://images.unsplash.com/photo-1662997137207-305055d61a86?w=500',
      startPrice: 2380,
      currentBid: 2550,
      bidCount: 7,
      endTime: new Date(Date.now() + 3600000 * 24 * 5).toISOString(), // 5 days from now
      seller: {
        name: '遊戲世界',
        avatar: 'https://i.pravatar.cc/150?img=18',
        rating: 4.6
      },
      bidders: []
    }
  ]);
  const [bidAmount, setBidAmount] = useState({});
  const [isCreatingBidding, setIsCreatingBidding] = useState(false);
  const [newBidding, setNewBidding] = useState({
    title: '',
    description: '',
    startPrice: '',
    endTime: '',
    category: ''
  });
  
  // Add login/register modal state
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ 
    username: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });

  // Updated login handler
  const handleLogin = async () => {
    try {
      setAuthLoading(true);
      setAuthError('');
      
      // Simulate API call to backend
      // In a real implementation, this would be:
      // const response = await axios.post('/api/login', loginForm);
      
      // For now, we'll simulate a successful login after a delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Check credentials (remove this in production)
      if (loginForm.email && loginForm.password) {
        setIsLoggedIn(true);
        setActiveTab('explore');
        setShowAuthModal(false);
      } else {
        setAuthError('請輸入有效的電郵地址和密碼');
      }
    } catch (error) {
      setAuthError('登入失敗，請檢查您的憑證');
    } finally {
      setAuthLoading(false);
    }
  };

  // Handle registration
  const handleRegister = async () => {
    try {
      setAuthLoading(true);
      setAuthError('');
      
      // Validate form
      if (!registerForm.username || !registerForm.email || !registerForm.password) {
        setAuthError('請填寫所有必填欄位');
        setAuthLoading(false);
        return;
      }
      
      if (registerForm.password !== registerForm.confirmPassword) {
        setAuthError('密碼和確認密碼不匹配');
        setAuthLoading(false);
        return;
      }
      
      // Simulate API call to backend
      // In a real implementation, this would be:
      // const response = await axios.post('/api/register', registerForm);
      
      // For now, we'll simulate a successful registration after a delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Auto login after registration
      setLoginForm({ email: registerForm.email, password: registerForm.password });
      setAuthMode('login');
      setAuthError('');
      
      // Optional: auto login after registration
      // setIsLoggedIn(true);
      // setActiveTab('explore');
      // setShowAuthModal(false);
    } catch (error) {
      setAuthError('註冊失敗，請稍後再試');
    } finally {
      setAuthLoading(false);
    }
  };

  // Toggle between login and register
  const toggleAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'register' : 'login');
    setAuthError('');
  };

  // Handle login button click in header
  const handleLoginClick = () => {
    setShowAuthModal(true);
    // The auth mode will be handled inside the modal itself
  };

  // 切換標籤
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Products 函數
  const calculateSavings = (price, originalPrice) => {
    if (!originalPrice || originalPrice <= price) return null;
    const savingsAmount = originalPrice - price;
    const savingsPercent = Math.round((savingsAmount / originalPrice) * 100);
    return { amount: savingsAmount, percent: savingsPercent };
  };

  const filteredProducts = scrapedProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(productSearchTerm.toLowerCase());
    const matchesPlatformFilter = activeFilter === '全部' || 
                      (activeFilter === 'Carousell' && product.platform === 'Carousell') ||
                      (activeFilter === 'Facebook' && product.platform === 'Facebook');
    const matchesCategoryFilter = activeCategoryFilter === '全部' || product.category === activeCategoryFilter;
    return matchesSearch && matchesPlatformFilter && matchesCategoryFilter;
  });

  const sortedFilteredProducts = filteredProducts.sort((a, b) => {
    const savingsA = calculateSavings(a.price, a.originalPrice);
    const savingsB = calculateSavings(b.price, b.originalPrice);
    const percentA = savingsA ? savingsA.percent : 0;
    const percentB = savingsB ? savingsB.percent : 0;
    return percentB - percentA;
  });
  
  // Product card animation effect
  useEffect(() => {
    if (isLoggedIn && activeTab === 'products' && filteredProducts.length > 0) {
      if (typeof window !== 'undefined') {
        import('animejs').then(({ default: anime }) => {
          if (anime) {
            anime({
              targets: '.product-card',
              translateY: [20, 0],
              opacity: [0, 1],
              delay: anime.stagger(100),
              duration: 500,
              easing: 'easeOutQuad'
            });
          }
        });
      }
    }
  }, [filteredProducts, isLoggedIn, activeTab]);

  // Feed card animation effect
  useEffect(() => {
    if (!isLoggedIn && feedItems.length > 0) {
       if (typeof window !== 'undefined') {
        import('animejs').then(({ default: anime }) => {
          if (anime) {
            anime({
              targets: '.feed-card',
              translateY: [20, 0],
              opacity: [0, 1],
              delay: anime.stagger(50),
              duration: 400,
              easing: 'easeOutQuad'
            });
          }
        });
      }
    }
  }, [feedItems, isLoggedIn]);
  
  // 添加卡片詳情模態框的狀態
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardModalOpen, setCardModalOpen] = useState(false);
  const [cardModalPosition, setCardModalPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const cardRefs = useRef({});
  
  // 處理卡片點擊
  const handleCardClick = (item, type = 'feed') => {
    // 獲取卡片的DOM元素位置
    const cardElement = cardRefs.current[`${type}-${item.id}`];
    if (cardElement) {
      const rect = cardElement.getBoundingClientRect();
      setCardModalPosition({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height
      });
    }
    
    // 如果是第一次點擊此卡片，初始化評論
    if (!(comments[`${type}-${item.id}`])) {
      setComments(prev => ({
        ...prev,
        [`${type}-${item.id}`]: []
      }));
    }
    
    setSelectedCard({ ...item, type });
    setCardModalOpen(true);
    
    // 防止滾動
    document.body.style.overflow = 'hidden';
  };
  
  // 關閉模態框函數優化
  const closeCardModal = () => {
    // 先標記卡片正在關閉中
    if (selectedCard) {
      setSelectedCard(prev => ({...prev, isClosing: true}));
      
      // 使用較短的延遲時間
      setTimeout(() => {
        setCardModalOpen(false);
        document.body.style.overflow = 'auto';
        // 完全關閉後重置selectedCard
        setSelectedCard(null);
      }, 200); // 縮短關閉動畫時間
    } else {
      setCardModalOpen(false);
      document.body.style.overflow = 'auto';
    }
  };
  
  // ---- JSX 渲染 ----
  
  // 添加卡片性能優化函數
  const optimizeCardRender = (item, type = 'feed') => {
    // 只在真正需要渲染時渲染完整內容
    // 如果卡片已被標記為正在關閉，則不渲染詳細內容
    if (selectedCard?.isClosing && selectedCard.id === item.id && selectedCard.type === type) {
      return false;
    }
    return true;
  };

  // 渲染瀑布流卡片 (用於未登入和登入後的探索頁)
  const renderFeedCards = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {feedItems.map((item, index) => {
        const isHigherCard = index % 3 === 0 || index % 5 === 0;
        const isLiked = likedPosts[`feed-${item.id}`];
        const commentCount = comments[`feed-${item.id}`]?.length || 0;

        return (
          <motion.div
            key={item.id}
            ref={el => cardRefs.current[`feed-${item.id}`] = el}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: index * 0.05,
              duration: 0.3
            }}
            whileHover={{ 
              y: -5,
              transition: { duration: 0.2 }
            }}
            className={cn(
              "bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 feed-card cursor-pointer",
              isHigherCard ? "row-span-2" : ""
            )}
            onClick={() => handleCardClick(item, 'feed')}
          >
            {/* 圖片部分 */}
            <div className="aspect-[4/3] bg-gray-100 relative">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover"
              />
              {isLiked && (
                <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ef4444" className="w-4 h-4">
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                </div>
              )}
            </div>
            <div className="p-3">
              {/* 作者信息 */}
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full overflow-hidden">
                  <img 
                    src={item.author.avatar} 
                    alt={item.author.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xs text-gray-600">{item.author.name}</span>
              </div>
              <h3 className="font-medium text-sm mb-1 line-clamp-2">{item.title}</h3>
              <p className="text-xs text-gray-500 line-clamp-3">{item.content}</p>
              
              {/* 標籤 */}
              {item.tags && item.tags.length > 0 && (
                <div className="flex gap-1 mt-2 flex-wrap">
                  {item.tags.slice(0, 2).map((tag, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">
                      #{tag}
                    </span>
                  ))}
                  {item.tags.length > 2 && (
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">
                      +{item.tags.length - 2}
                    </span>
                  )}
                </div>
              )}
              
              {/* 互動信息 */}
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 mr-1 text-gray-400">
                      <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2.25 10.352 2.25 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
                    </svg>
                    {likeCounts[`feed-${item.id}`] || 0}
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 mr-1 text-gray-400">
                      <path fillRule="evenodd" d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902 1.168.188 2.352.327 3.55.414.28.02.521.18.642.413l1.713 3.293a.75.75 0 001.33 0l1.713-3.293a.783.783 0 01.642-.413 41.102 41.102 0 003.55-.414c1.437-.231 2.43-1.49 2.43-2.902V5.426c0-1.413-.993-2.67-2.43-2.902A41.289 41.289 0 0010 2zM6.75 6a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zm0 2.5a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z" clipRule="evenodd" />
                    </svg>
                    {comments[`feed-${item.id}`]?.length || commentCounts[`feed-${item.id}`] || 0}
                  </div>
                </div>
                <span>{viewCounts[`feed-${item.id}`] || 0} 瀏覽</span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );

  // 在Home函數頂部添加這些狀態
  const [likedPosts, setLikedPosts] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const [comments, setComments] = useState({});
  const [showComments, setShowComments] = useState({});

  // 處理喜歡按鈕
  const handleLike = (itemId, type) => {
    setLikedPosts(prev => ({
      ...prev,
      [`${type}-${itemId}`]: !prev[`${type}-${itemId}`]
    }));
  };

  // 處理評論輸入變化
  const handleCommentInputChange = (itemId, type, value) => {
    setCommentInputs(prev => ({
      ...prev,
      [`${type}-${itemId}`]: value
    }));
  };

  // 處理提交評論
  const handleSubmitComment = (itemId, type) => {
    const commentText = commentInputs[`${type}-${itemId}`];
    if (!commentText || commentText.trim() === '') return;
    
    const newComment = {
      id: Date.now(),
      text: commentText,
      author: { name: '我', avatar: 'https://i.pravatar.cc/150?img=33' },
      createdAt: new Date()
    };
    
    setComments(prev => ({
      ...prev,
      [`${type}-${itemId}`]: [...(prev[`${type}-${itemId}`] || []), newComment]
    }));
    
    setCommentInputs(prev => ({
      ...prev,
      [`${type}-${itemId}`]: ''
    }));
    
    // 自動展開評論區
    setShowComments(prev => ({
      ...prev,
      [`${type}-${itemId}`]: true
    }));
  };

  // 切換評論展示
  const toggleComments = (itemId, type) => {
    setShowComments(prev => ({
      ...prev,
      [`${type}-${itemId}`]: !prev[`${type}-${itemId}`]
    }));
  };

  // 分享功能
  const handleShare = (item) => {
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.content || `查看更多關於 ${item.title} 的內容`,
        url: window.location.href,
      })
      .catch((error) => console.log('分享失敗:', error));
    } else {
      // 複製連結
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('連結已複製到剪貼板'))
        .catch((error) => console.log('複製失敗:', error));
    }
  };

  // 處理建立新帖子
  const handleCreatePost = () => {
    if (!newPost.title || !newPost.content) return;
    
    // 生成隨機圖片
    const randomImageId = Math.floor(Math.random() * 1000);
    const defaultImage = `https://picsum.photos/seed/${randomImageId}/500/300`;
    
    // 處理標籤
    const tagList = newPost.tags 
      ? newPost.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
      : [];
    
    const newPostObj = {
      id: Date.now(), // 使用時間戳作為臨時ID
      title: newPost.title,
      content: newPost.content,
      image: newPost.image || defaultImage,
      likes: 0,
      comments: 0,
      author: {
        name: '我',
        avatar: 'https://i.pravatar.cc/150?img=33'
      },
      tags: tagList,
      createdAt: new Date()
    };
    
    // 添加新帖子到現有列表的最前面
    setFeedItems(prevItems => [newPostObj, ...prevItems]);
    
    // 顯示成功提示並在2秒後關閉模態框
    setPostSuccess(true);
    setTimeout(() => {
      setPostSuccess(false);
      setIsCreatingPost(false);
      // 重置表單
      setNewPost({
        title: '',
        content: '',
        image: '',
        tags: ''
      });
    }, 1500);
  };

  // 處理圖片上傳
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // 檢查文件大小，限制在2MB以內
    if (file.size > 2 * 1024 * 1024) {
      alert('圖片大小不能超過2MB');
      return;
    }
    
    // 檢查文件類型，只允許圖片格式
    if (!file.type.startsWith('image/')) {
      alert('只能上傳圖片文件');
      return;
    }
    
    // 使用FileReader將圖片轉換為Base64字符串
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewPost({...newPost, image: reader.result});
    };
    reader.readAsDataURL(file);
  };

  // AI助理相關狀態
  const [showAiAssistant, setShowAiAssistant] = useState(false);
  const [aiMessages, setAiMessages] = useState([
    { role: 'assistant', content: '您好！我可以幫您估價二手物品、尋找最佳買家或回收商，或回答循環經濟相關問題。有什麼我能幫助您的嗎？' }
  ]);
  const [aiInputValue, setAiInputValue] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([
    '這個iPhone大概值多少錢？',
    '如何最大化我的二手物品價值？',
    '哪些平台適合賣家具？',
    '回收和二手賣出哪個更划算？'
  ]);
  const [showAiSuggestions, setShowAiSuggestions] = useState(true);
  const [isPulsing, setIsPulsing] = useState(true);
  const [aiPosition, setAiPosition] = useState({ right: 20, bottom: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [aiMinimized, setAiMinimized] = useState(false);
  const messagesEndRef = useRef(null);
  const aiContainerRef = useRef(null);

  // AI建議上下文相關狀態 - 每個標籤頁顯示不同建議
  useEffect(() => {
    if (activeTab === 'products') {
      setAiSuggestions([
        '這個二手物品大概值多少？',
        '如何判斷二手手機的品質？',
        '哪種款式更保值？',
        '推薦我一些高性價比的二手物品'
      ]);
    } else if (activeTab === 'bidding') {
      setAiSuggestions([
        '如何設定起標價格？',
        '拍賣和一口價哪個更好？',
        '如何增加競價物品的吸引力？',
        '什麼時間結束競價最理想？'
      ]);
    } else if (activeTab === 'explore') {
      setAiSuggestions([
        '最近有什麼循環經濟新聞？',
        '如何開始實踐永續生活？',
        '舊物改造有什麼創意點子？',
        '向我推薦環保相關的文章'
      ]);
    }
    // 停止按鈕脈動效果
    setTimeout(() => {
      setIsPulsing(false);
    }, 5000);
  }, [activeTab]);

  // 處理AI聊天滾動
  useEffect(() => {
    if (messagesEndRef.current && showAiAssistant) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [aiMessages, showAiAssistant]);

  // 處理AI助理發送消息
  const handleAiSendMessage = async (e) => {
    e.preventDefault();
    
    if (!aiInputValue.trim() || isAiLoading) return;
    
    // 添加用戶消息
    const userMessage = {
      role: 'user',
      content: aiInputValue
    };
    
    setAiMessages(prev => [...prev, userMessage]);
    setAiInputValue('');
    setIsAiLoading(true);
    
    // 添加空的 AI 回應並顯示載入動畫
    setAiMessages(prev => [...prev, {
      role: 'assistant',
      content: '',
      isLoading: true
    }]);
    
    // 模擬 AI 回應延遲
    setTimeout(() => {
      // 根據不同內容生成不同回應
      let aiResponse = '';
      
      if (aiInputValue.includes('價值') || aiInputValue.includes('價格') || aiInputValue.includes('值多少錢')) {
        aiResponse = '根據最近市場數據，類似商品的二手價格約為原價的60-70%，具體取決於物品狀況、使用時間和市場需求。\n\n您可以在「二手物品」頁面查看類似產品的實時價格作為參考。';
      } else if (aiInputValue.includes('如何') && (aiInputValue.includes('賣') || aiInputValue.includes('出售'))) {
        aiResponse = '在SecondPrice平台上出售物品的步驟：\n1. 拍攝清晰的物品照片\n2. 填寫詳細描述，包括物品狀況、購買時間\n3. 設定合理價格（可參考平台上類似物品）\n4. 選擇配送方式\n5. 發布並回應買家查詢';
      } else if (aiInputValue.includes('競價') || aiInputValue.includes('拍賣')) {
        aiResponse = '成功競價的策略：\n1. 研究物品市場價值，設定心理價位\n2. 不要過早出價，觀察其他買家動向\n3. 接近結束時再出價\n4. 考慮使用奇數金額，如 $1,999 而非 $2,000\n5. 設置自動競價，但記得設上限';
      } else {
        aiResponse = '感謝您的提問！我是SecondPrice的AI助理，隨時為您提供二手交易、估價和競價相關幫助。\n\n您可以詢問我關於如何估算物品價值、選擇平台、提高售價或安全交易的建議。';
      }
      
      // 更新 AI 回應
      setAiMessages(prev => prev.map((msg, i) => 
        i === prev.length - 1 ? { role: 'assistant', content: aiResponse } : msg
      ));
      
      setIsAiLoading(false);
      
      // 根據當前頁面更新建議問題
      setTimeout(() => {
        // 更新建議問題
        if (activeTab === 'products') {
          setAiSuggestions([
            '這款產品的二手市場價值是多少？',
            '購買二手電子產品需要注意什麼？',
            '如何判斷二手物品的品質好壞？'
          ]);
        } else if (activeTab === 'bidding') {
          setAiSuggestions([
            '什麼時候出價最合適？',
            '如何避免競價過熱？',
            '競價時如何評估物品真實價值？'
          ]);
        } else {
          setAiSuggestions([
            '二手奢侈品如何鑑別真偽？',
            '哪類二手物品保值率最高？',
            '如何安全進行二手交易？'
          ]);
        }
        setShowAiSuggestions(true);
      }, 1000);
    }, 1500);
  };

  // 處理AI建議點擊
  const handleAiSuggestionClick = (suggestion) => {
    setAiInputValue(suggestion);
    handleAiSendMessage({ preventDefault: () => {} });
  };
  
  // 處理AI消息內容格式化，支持換行
  const formatAiMessageContent = (content) => {
    if (!content) return '';
    return content.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line}
        {i < content.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  // 處理AI對話框拖動
  const handleDragStart = (e) => {
    if (aiContainerRef.current && !aiMinimized) {
      setIsDragging(true);
      setDragStart({ 
        x: e.clientX, 
        y: e.clientY 
      });
      // 阻止其他事件
      e.preventDefault();
    }
  };

  const handleDrag = (e) => {
    if (isDragging && aiContainerRef.current) {
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      
      // 計算新位置，確保不超出屏幕邊界
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const containerWidth = aiContainerRef.current.offsetWidth;
      const containerHeight = aiContainerRef.current.offsetHeight;
      
      let newRight = aiPosition.right - dx;
      let newBottom = aiPosition.bottom - dy;
      
      // 確保不超出屏幕
      newRight = Math.max(10, Math.min(newRight, viewportWidth - containerWidth - 10));
      newBottom = Math.max(10, Math.min(newBottom, viewportHeight - containerHeight - 10));

      setAiPosition({ right: newRight, bottom: newBottom });
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // 添加事件監聽器
  useEffect(() => {
    if (showAiAssistant) {
      window.addEventListener('mousemove', handleDrag);
      window.addEventListener('mouseup', handleDragEnd);
      return () => {
        window.removeEventListener('mousemove', handleDrag);
        window.removeEventListener('mouseup', handleDragEnd);
      };
    }
  }, [isDragging, dragStart, showAiAssistant]);

  // 標籤頁列表
  const tabs = [
    { key: 'follow', label: '關注' },
    { key: 'explore', label: '探索' },
    { key: 'products', label: '二手平台' },
    { key: 'bidding', label: '競價' },
  ];

  // Remove duplicate state definitions that were already defined earlier
  const [products, setProducts] = useState([]);
  const [bidItems, setBidItems] = useState([]);
  const [followed, setFollowed] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');

  // Add a toast notification state
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });
  
  // Function to show toast notification
  const showToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast({ visible: false, message: '', type: 'success' });
    }, 2000);
  };

  // 添加收藏功能
  const toggleFavorite = (productId) => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }
    
    if (favorites.includes(productId)) {
      setFavorites(prev => prev.filter(id => id !== productId));
      showToast('已從收藏中移除', 'info'); // Use our custom toast instead of antd message
    } else {
      setFavorites(prev => [...prev, productId]);
      showToast('已加入收藏', 'success'); // Use our custom toast instead of antd message
    }
  };

  const isFavorited = (productId) => {
    return favorites.includes(productId);
  };

  // 處理語言切換
  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'zh-HK' ? 'en' : 'zh-HK');
  };

  // 更新 AI 建議問題，確保使用中文
  const updateAiSuggestions = (tab) => {
    if (tab === 'products' || activeTab === 'products') {
      setAiSuggestions([
        '如何估算這款電子產品的二手價值？',
        '哪些因素會影響二手物品的價格？',
        '這個價格合理嗎？',
        '二手物品交易需要注意什麼？',
        '如何辨別產品的真偽？'
      ]);
    } else if (tab === 'bidding' || activeTab === 'bidding') {
      setAiSuggestions([
        '如何制定競價策略？',
        '這個起標價合理嗎？',
        '競價時應該設置怎樣的價格上限？',
        '什麼物品適合競價？',
        '競價成功的關鍵因素是什麼？'
      ]);
    } else {
      setAiSuggestions([
        '如何估算我的二手物品價值？',
        '哪個平台最適合賣我的物品？',
        '如何提高二手物品的售價？',
        '回收和轉售哪個更划算？',
        '如何安全地進行二手交易？'
      ]);
    }
    setShowAiSuggestions(true);
  };

  // 獲取產品分類列表
  const productCategories = ['全部', ...Array.from(new Set(scrapedProducts.map(product => product.category)))];

  // 添加收藏卡牌數據
  const [collectionCards, setCollectionCards] = useState([
    {
      id: 1,
      title: 'Charizard GX 噴火龍 (彩虹稀有)',
      price: 12800,
      originalPrice: null,
      condition: 'PSA 10',
      platform: 'Yahoo拍賣',
      location: '旺角',
      image: 'https://images.unsplash.com/photo-1605148230176-e2e86fc3b494?w=500',
      category: 'Pokemon',
      rarity: '彩虹稀有',
      year: 2019,
      language: '日文',
      description: '稀有噴火龍GX彩虹卡，PSA 10評級完美狀態，完美的投資收藏品。'
    },
    {
      id: 2,
      title: 'Pikachu V-Union 皮卡丘 (特別收藏)',
      price: 3200,
      originalPrice: 4500,
      condition: 'PSA 9',
      platform: 'Carousell',
      location: '銅鑼灣',
      image: 'https://images.unsplash.com/photo-1613771404721-1f92d799e49f?w=500',
      category: 'Pokemon',
      rarity: '特別版',
      year: 2021,
      language: '英文',
      description: '限量版皮卡丘V-Union卡組，四張卡片組成一個大型藝術畫，狀態良好，PSA 9評級。'
    },
    {
      id: 3,
      title: 'Kobe Bryant Rookie Card 簽名版',
      price: 75000,
      originalPrice: null,
      condition: 'BGS 9.5',
      platform: '私人收藏',
      location: '中環',
      image: 'https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?w=500',
      category: '籃球卡',
      rarity: '簽名新人卡',
      year: 1996,
      language: '英文',
      description: 'Kobe Bryant 1996-97 Topps Chrome 新人卡親筆簽名版，BGS 9.5超高評級，極其稀有。'
    },
    {
      id: 4,
      title: 'LeBron James Prizm 平行閃卡',
      price: 23000,
      originalPrice: 27500,
      condition: 'PSA 9',
      platform: 'Yahoo拍賣',
      location: '尖沙咀',
      image: 'https://images.unsplash.com/photo-1574975544222-0d94930f28e3?w=500',
      category: '籃球卡',
      rarity: '平行閃卡',
      year: 2020,
      language: '英文',
      description: '2020 Panini Prizm LeBron James 銀色平行閃卡，PSA 9評級，品相極佳，投資價值高。'
    },
    {
      id: 5,
      title: 'Lionel Messi Rookie Card',
      price: 45000,
      originalPrice: null,
      condition: 'PSA 8',
      platform: 'Facebook',
      location: '觀塘',
      image: 'https://images.unsplash.com/photo-1553481187-be93c21490a9?w=500',
      category: '足球卡',
      rarity: '新人卡',
      year: 2004,
      language: '西班牙文',
      description: '稀有梅西2004年新人卡，PSA 8評級，良好品相，值得投資收藏。'
    },
    {
      id: 6,
      title: 'Cristiano Ronaldo Autographed Card',
      price: 38000,
      originalPrice: 42000,
      condition: 'BGS 9',
      platform: 'Carousell',
      location: '太古',
      image: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=500',
      category: '足球卡',
      rarity: '簽名卡',
      year: 2018,
      language: '英文',
      description: 'Cristiano Ronaldo 2018 Panini 親筆簽名卡，BGS 9高評級，全球限量100張。'
    },
    {
      id: 7,
      title: 'Magic The Gathering Black Lotus',
      price: 350000,
      originalPrice: null,
      condition: 'CGC 9',
      platform: '私人收藏',
      location: '中環',
      image: 'https://images.unsplash.com/photo-1528143358888-6d3c7f67bd5d?w=500',
      category: '遊戲王',
      rarity: 'Alpha版',
      year: 1993,
      language: '英文',
      description: '傳奇的Alpha版Black Lotus卡，CGC 9評級，萬智牌中最具收藏價值的卡片之一。'
    },
    {
      id: 8,
      title: 'Yu-Gi-Oh! Blue-Eyes White Dragon',
      price: 18500,
      originalPrice: 22000,
      condition: 'PSA 10',
      platform: 'Yahoo拍賣',
      location: '旺角',
      image: 'https://images.unsplash.com/photo-1627131597135-1cb0abdc3568?w=500',
      category: '遊戲王',
      rarity: '初版',
      year: 2002,
      language: '日文',
      description: '初版青眼白龍，PSA 10完美評級，遊戲王收藏中的經典卡片。'
    }
  ]);

  const [cardSearchTerm, setCardSearchTerm] = useState('');
  const [activeCardFilter, setActiveCardFilter] = useState('全部'); // 卡牌類型篩選

  // 添加卡牌過濾邏輯
  const filteredCards = collectionCards.filter(card => {
    const matchesSearch = card.title.toLowerCase().includes(cardSearchTerm.toLowerCase()) || 
                          card.description.toLowerCase().includes(cardSearchTerm.toLowerCase());
    const matchesCategoryFilter = activeCardFilter === '全部' || card.category === activeCardFilter;
    return matchesSearch && matchesCategoryFilter;
  });

  // 獲取卡牌類別列表
  const cardCategories = ['全部', ...Array.from(new Set(collectionCards.map(card => card.category)))];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      <Head>
        <title>SecondPrice.hk - 循環經濟平台</title>
        <meta name="description" content="透過AI技術估算物品價值，快速匹配二手買家或回收商" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      {/* 統一的頂部導航 */}
      <header className="sticky top-0 z-40 bg-white py-3 px-4 md:px-6 border-b border-gray-100 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              SP
            </div>
            <h1 className="text-gray-900 font-semibold hidden sm:block">SecondPrice.hk</h1>
          </div>
          
          {/* 中央搜索欄 */}
          <div className="hidden md:block relative max-w-md w-full mx-4">
            <input
              type="text"
              placeholder={language === 'zh-HK' ? "搜索二手物品、競價或文章..." : "Search for second-hand items, auctions or articles..."}
              className="w-full bg-gray-100 border border-gray-200 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
          </div>
          
        <div className="flex items-center gap-3">
          {/* 只在移動端顯示的搜索按鈕 */}
          <button className="md:hidden p-2 rounded-full hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
          
          {/* 語言切換按鈕 */}
          <button 
            onClick={toggleLanguage}
            className="p-2 rounded-full hover:bg-gray-100 flex items-center"
          >
            <span className="text-sm font-medium mr-1">{language === 'zh-HK' ? '繁' : 'EN'}</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
            </svg>
          </button>
          
          {/* 通知按鈕 - 登入後顯示 */}
          {isLoggedIn && (
            <div className="relative">
              <button className="p-2 rounded-full hover:bg-gray-100 relative">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>
                {/* 通知提示點 */}
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          )}
          
          {/* 登入/用戶頭像按鈕 */}
          {!isLoggedIn ? (
            <>
              <button 
                onClick={() => {
                  setShowAuthModal(true);
                  setAuthMode('register');
                }}
                className="px-4 py-2 text-sm font-medium bg-white text-indigo-600 border border-indigo-600 rounded-full hover:bg-indigo-50 transition-colors"
              >
              註冊
            </button>
              <button 
                onClick={handleLoginClick}
                className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 transition-colors shadow-sm"
              >
                登入
              </button>
            </>
          ) : (
            <div className="relative group">
              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-indigo-300 to-purple-300 p-0.5 cursor-pointer">
                <img src="https://i.pravatar.cc/150?img=33" alt="用戶頭像" className="w-full h-full object-cover rounded-full" />
              </div>
              
              {/* 下拉菜單 */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 hidden group-hover:block z-50">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  個人檔案
                </a>
                <a href="/favorites" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  我的收藏
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  我的物品
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  設定
                </a>
                <div className="border-t border-gray-100 my-1"></div>
                <button 
                  onClick={() => setIsLoggedIn(false)} 
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                >
                  登出
                </button>
              </div>
            </div>
          )}
          </div>
        </header>

      {/* 主體內容 - 使用flex-grow確保主內容區域佔據所有可用空間，並將頁腳推到底部 */}
      <main className="flex-grow max-w-7xl mx-auto px-4 md:px-6 py-6 w-full">
        {!isLoggedIn ? (
          // ---- 未登入狀態：瀑布流 ----
          <>
            {/* 移除之前的標籤欄，換成標題說明 */}
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900 flex items-center">
                為您推薦的內容
                <div className="group relative ml-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 cursor-help">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                  </svg>
                  <div className="absolute left-0 bottom-full mb-2 w-60 bg-gray-800 text-white p-2 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    基於瀏覽用戶的興趣和平台熱門內容自動推薦，登入後可獲得更個性化的內容
                  </div>
                </div>
              </h2>
              <div className="text-xs text-gray-500 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 mr-1 text-indigo-600">
                  <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                </svg>
                根據您的興趣自動生成
              </div>
            </div>
            {/* 瀑布流卡片 */}
            {renderFeedCards()}
            {/* 加載更多按鈕 */}
            <div className="flex justify-center mt-8">
              <button className="px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-600 rounded-full hover:bg-indigo-50 transition-colors">
                查看更多
              </button>
            </div>
          </>
        ) : (
          // ---- 已登入狀態：多標籤界面 ----
          <>
            {/* 麵包屑導航 */}
            <div className="text-xs text-gray-500 mb-4 flex items-center">
              <span className="text-indigo-600">首頁</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mx-1">
                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">{activeTab === 'explore' ? '探索' : activeTab === 'products' ? '二手物品' : activeTab === 'bidding' ? '競價平台' : '關注'}</span>
            </div>
            
            {/* 標籤導航 - 改進樣式 */}
            <div className="flex border-b border-gray-200 mb-6">
              {[
                { key: 'follow', label: '關注', icon: 
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                }, 
                { key: 'explore', label: '探索', icon:
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                },
                { key: 'favorites', label: '收藏', icon:
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                  </svg>
                },
                { key: 'products', label: '二手物品', icon:
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                },
                { key: 'cards', label: '收藏卡牌', icon:
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                  </svg>
                },
                { key: 'bidding', label: '競價平台', icon:
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                  </svg>
                }
              ].map(tab => (
            <button 
                  key={tab.key}
                  onClick={() => handleTabChange(tab.key)}
              className={cn(
                "pb-3 px-5 text-sm font-medium relative flex items-center transition-colors",
                    activeTab === tab.key
                      ? 'text-indigo-600 font-semibold' 
                  : 'text-gray-500 hover:text-gray-700'
              )}
            >
                  {tab.icon}
                  {tab.label}
                  {activeTab === tab.key && (
                <motion.div 
                      layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
                />
              )}
            </button>
              ))}
            </div>

            {/* 標籤內容 */}
            <AnimatePresence mode="wait">
                <motion.div 
                key={activeTab} // 關鍵：讓 AnimatePresence 檢測到變化
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'follow' && (
                  <div className="bg-gray-50 rounded-xl p-12 text-center flex flex-col items-center justify-center border border-gray-200">
                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-indigo-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">關注功能即將推出</h3>
                    <p className="text-gray-500 max-w-md mb-6">您可以關注感興趣的賣家、循環經濟話題，或二手物品類別，以獲取個人化更新。</p>
                    <button className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors font-medium">
                      獲取功能推出通知
                    </button>
                  </div>
                )}

                {activeTab === 'explore' && (
                  <>
                    {/* 添加發帖子按鈕 */}
                    <div className="relative mb-4">
                      <div className="flex justify-between items-center">
                        <h2 className="font-medium text-gray-900">探索文章</h2>
                        <button 
                          className="px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors flex items-center shadow-md"
                          onClick={() => setIsCreatingPost(true)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                          </svg>
                          發帖子
                        </button>
                      </div>
                    </div>
                    {/* {renderFeedCards()} */}{/* Replace with ExploreFeed component */} 
                    <ExploreFeed 
                      items={feedItems} 
                      onCardClick={handleCardClick}
                      cardRefs={cardRefs}
                      likedPosts={likedPosts}
                      comments={comments}
                      likeCounts={likeCounts}
                      commentCounts={commentCounts}
                      viewCounts={viewCounts}
                    /> 
                    <div className="flex justify-center mt-8">
                      <button className="px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-600 rounded-full hover:bg-indigo-50 transition-colors">
                        查看更多
                      </button>
                    </div>
                    
                    {/* 浮動發帖子按鈕 */}
                    <motion.button
                      className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center z-10 hover:bg-indigo-700 transition-colors"
                      onClick={() => setIsCreatingPost(true)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                    </motion.button>
                  </>
                )}

              {activeTab === 'products' && (
                  <>
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-medium text-gray-900">二手物品</h2>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="搜索物品..."
                            value={productSearchTerm}
                            onChange={(e) => setProductSearchTerm(e.target.value)}
                            className="bg-gray-100 border border-gray-200 rounded-full py-1.5 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white w-full md:w-60"
                          />
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                          </svg>
                        </div>
                      </div>

                      {/* 平台和分類過濾器 */}
                      <div className="flex flex-col sm:flex-row gap-4 mb-4">
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500 mb-1.5">平台</span>
                          <div className="flex space-x-2">
                            {['全部', 'Carousell', 'Facebook'].map(filter => (
                              <button
                                key={`platform-${filter}`}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-3 py-1.5 text-xs rounded-full ${
                                  activeFilter === filter 
                                    ? 'bg-indigo-100 text-indigo-700 font-medium' 
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                              >
                                {filter}
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500 mb-1.5">分類</span>
                          <div className="flex flex-wrap gap-2">
                            {productCategories.map(category => (
                              <button
                                key={`category-${category}`}
                                onClick={() => setActiveCategoryFilter(category)}
                                className={`px-3 py-1.5 text-xs rounded-full ${
                                  activeCategoryFilter === category 
                                    ? 'bg-indigo-100 text-indigo-700 font-medium' 
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                              >
                                {category}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* 顯示篩選結果數量 */}
                      <div className="flex justify-between items-center mb-4">
                        <p className="text-sm text-gray-500">
                          {filteredProducts.length} 項結果 {activeCategoryFilter !== '全部' ? `- ${activeCategoryFilter}` : ''}
                        </p>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">排序:</span>
                          <select className="text-xs border rounded-md px-2 py-1 bg-white">
                            <option>價格低至高</option>
                            <option>價格高至低</option>
                            <option>最新上架</option>
                            <option>最高折扣</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* AI智能洞察區域 */}
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 mb-6">
                      <div className="flex items-start mb-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">AI智能洞察</h3>
                          <p className="text-xs text-gray-600">根據最近二手市場數據分析</p>
                        </div>
                      </div>
                      
                      <div className="ml-12">
                        <p className="text-sm text-gray-700 mb-3">
                          {activeCategoryFilter === '電子產品' 
                            ? '電子產品二手價格正處於下降趨勢，iPhone 13系列和高階筆電保值率最高。' 
                            : activeCategoryFilter === '家居用品'
                            ? '無印良品和IKEA的二手家居商品近期需求上升，平均成交價格比新品低40%。'
                            : activeCategoryFilter === '時尚服飾'
                            ? '限量球鞋和高級成衣在二手市場保值率高，部分款式甚至溢價交易。'
                            : activeCategoryFilter === '書籍文具'
                            ? '教科書和限量版書籍在二手市場最受歡迎，價格約為原價的50-60%。'
                            : activeCategoryFilter === '攝影器材'
                            ? '高階相機鏡頭保值率高於機身，成色良好的專業鏡頭可保留70%以上價值。'
                            : '二手電子產品交易量最大，其中手機和筆電最熱門。限量款運動鞋價格持續上漲。'}
                        </p>
                        
                        <div className="flex space-x-2 text-xs">
                          <button className="px-3 py-1 bg-white rounded-full border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors text-gray-700">
                            查看完整市場分析
                          </button>
                          <button className="px-3 py-1 bg-white rounded-full border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors text-gray-700">
                            設置價格提醒
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* 產品卡片網格 */}
                    {filteredProducts.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {sortedFilteredProducts.map((product) => (
                          <motion.div
                            key={product.id}
                            ref={el => cardRefs.current[`product-${product.id}`] = el}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all product-card cursor-pointer relative group"
                            onClick={() => handleCardClick(product, 'product')}
                          >
                            {/* 分類標籤 */}
                            <div className="absolute top-2 left-2 z-10">
                              <span className="text-xs px-2 py-0.5 bg-black/60 text-white rounded-full backdrop-blur-sm">
                                {product.category}
                              </span>
                            </div>
                            
                            {/* 收藏按鈕 */}
                            <button
                              className="absolute top-2 right-2 z-10 p-1.5 bg-white/70 backdrop-blur-sm rounded-full shadow hover:bg-white transition-all"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(product.id);
                              }}
                            >
                              {isFavorited(product.id) ? (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ef4444" className="w-4 h-4">
                                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                </svg>
                              ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg>
                              )}
                            </button>
                            
                            {/* 圖片部分 */}
                            <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                              <img 
                                src={product.image} 
                                alt={product.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                              />
                              <div className="absolute bottom-2 left-2">
                                <span className={`text-xs px-2 py-0.5 rounded-full ${
                                  product.platform === 'Carousell' 
                                    ? 'bg-orange-500/90 text-white' 
                                    : 'bg-blue-500/90 text-white'
                                } backdrop-blur-sm`}>
                                  {product.platform}
                                </span>
                              </div>
                            </div>
                            
                            <div className="p-3">
                              <h3 className="font-medium text-sm mb-1 line-clamp-2">{product.title}</h3>
                              <div className="flex justify-between items-center mt-2">
                                <div>
                                  <div className="text-indigo-600 font-bold">HK${product.price}</div>
                                  {product.originalPrice && (
                                    <div className="text-xs text-gray-500 line-through">HK${product.originalPrice}</div>
                                  )}
                                </div>
                                <div className="text-xs text-gray-500">{product.location}</div>
                              </div>
                              
                              {/* 條件標籤 */}
                              <div className="mt-2 flex justify-between items-center">
                                <span className="text-xs py-0.5 px-2 bg-gray-100 text-gray-600 rounded-full">
                                  {product.condition}
                                </span>
                                
                                {/* AI估價 */}
                                <span className="text-xs text-indigo-600 flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 mr-0.5">
                                    <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                                    <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                  </svg>
                                  AI估價
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-gray-50 rounded-xl p-12 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">找不到匹配的物品</h3>
                        <p className="text-gray-500 max-w-md mx-auto mb-6">
                          嘗試更改搜索條件或分類過濾器，以查找更多二手物品。
                        </p>
                        <button 
                          onClick={() => {
                            setProductSearchTerm('');
                            setActiveFilter('全部');
                            setActiveCategoryFilter('全部');
                          }}
                          className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors font-medium"
                        >
                          清除所有過濾條件
                        </button>
                      </div>
                    )}
                  </>
                )}

                {activeTab === 'bidding' && (
                  <div className="space-y-4">
                    {/* AI競價策略建議元素 */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-100 mb-3"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-indigo-900">AI 競價策略師</h3>
                            <button 
                              onClick={() => setShowAiAssistant(true)}
                              className="text-xs bg-indigo-600 text-white px-2.5 py-1 rounded-full hover:bg-indigo-700 transition-colors flex items-center space-x-1"
                            >
                              <span>AI建議</span>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                              </svg>
                            </button>
                          </div>
                          <p className="text-sm text-indigo-800 mt-1">當前競價分析：電子產品競價活躍度最高，週末結標的物品平均獲得<span className="font-semibold">23%</span>更高的最終價格。設定合理起標價可吸引更多競標者。</p>
                          <div className="mt-3 flex gap-2 flex-wrap">
                            <button 
                              className="px-3 py-1 bg-white rounded-full text-xs text-indigo-700 border border-indigo-200 hover:bg-indigo-50 transition-colors shadow-sm"
                              onClick={() => {
                                setAiInputValue("我的競價物品如何設定起價？");
                                setShowAiAssistant(true);
                                handleAiSendMessage({ preventDefault: () => {} });
                              }}
                            >
                              獲取定價建議
                            </button>
                            <button 
                              className="px-3 py-1 bg-white rounded-full text-xs text-indigo-700 border border-indigo-200 hover:bg-indigo-50 transition-colors shadow-sm"
                              onClick={() => {
                                setAiInputValue("哪些因素影響競價成功率？");
                                setShowAiAssistant(true);
                                handleAiSendMessage({ preventDefault: () => {} });
                              }}
                            >
                              提高競價成功率
                            </button>
                            <button 
                              className="px-3 py-1 bg-white rounded-full text-xs text-indigo-700 border border-indigo-200 hover:bg-indigo-50 transition-colors shadow-sm"
                              onClick={() => {
                                setAiInputValue("我的物品適合競價嗎？");
                                setShowAiAssistant(true);
                                handleAiSendMessage({ preventDefault: () => {} });
                              }}
                            >
                              競價適合度評估
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                    
                    <BiddingSection initialBiddings={activeBiddings} /> {/* Render BiddingSection */}
                  </div>
                )}

                {activeTab === 'favorites' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-gray-800">我的收藏</h2>
                      <span className="text-sm text-gray-500">共 {favorites.length} 個收藏項目</span>
                    </div>
                    
                    {favorites.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {scrapedProducts
                          .filter(product => favorites.includes(product.id))
                          .map(product => (
                            <div
                              key={product.id}
                              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                              onClick={() => handleCardClick(product, 'product')}
                            >
                              <div className="relative">
                                <img
                                  src={product.image || "https://via.placeholder.com/300x200?text=No+Image"}
                                  alt={product.title}
                                  className="w-full h-48 object-cover"
                                  onError={(e) => {
                                    e.target.src = "https://via.placeholder.com/300x200?text=Invalid+Image";
                                  }}
                                />
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite(product.id);
                                  }}
                                  className="absolute top-2 right-2 bg-white bg-opacity-70 rounded-full p-1.5 
                                            hover:bg-opacity-100 transition-all z-10"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
                                      className="w-5 h-5 text-red-500">
                                    <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" 
                                      clipRule="evenodd" />
                                  </svg>
                                </button>
                                {product.condition && (
                                  <span className="absolute top-2 left-2 px-2 py-1 text-xs font-semibold bg-white bg-opacity-80 rounded-full">
                                    {product.condition}
                                  </span>
                                )}
                              </div>
                              <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.title}</h3>
                                <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center">
                                    <span className="text-red-600 font-semibold">HK${product.price}</span>
                                    {product.originalPrice && (
                                      <span className="text-gray-400 text-sm line-through ml-2">
                                        HK${product.originalPrice}
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {product.location}
                                  </div>
                                </div>
                              </div>
                            </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                            strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-gray-300 mx-auto mb-4">
                          <path strokeLinecap="round" strokeLinejoin="round" 
                            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                        </svg>
                        <h3 className="text-lg font-medium text-gray-700">您還沒有收藏任何物品</h3>
                        <p className="text-gray-500 mt-2">瀏覽二手物品並點擊收藏圖標添加您喜歡的商品</p>
                        <button 
                          onClick={() => setActiveTab('products')}
                          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                        >
                          瀏覽二手物品
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* 收藏卡牌標籤內容 */}
                {activeTab === 'cards' && (
                  <>
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-medium text-gray-900">收藏卡牌市場</h2>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="搜索收藏卡牌..."
                            value={cardSearchTerm}
                            onChange={(e) => setCardSearchTerm(e.target.value)}
                            className="bg-gray-100 border border-gray-200 rounded-full py-1.5 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white w-full md:w-60"
                          />
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                          </svg>
                        </div>
                      </div>

                      {/* 卡牌類型過濾器 */}
                      <div className="mb-5">
                        <span className="text-xs text-gray-500 mb-2 block">卡牌類型</span>
                        <div className="flex flex-wrap gap-2">
                          {cardCategories.map(category => (
                            <button
                              key={`card-category-${category}`}
                              onClick={() => setActiveCardFilter(category)}
                              className={`px-3 py-1.5 text-xs rounded-full ${
                                activeCardFilter === category 
                                  ? 'bg-indigo-100 text-indigo-700 font-medium' 
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              {category}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* 收藏卡牌市場洞察 */}
                      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 mb-6">
                        <div className="flex items-start mb-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">收藏卡牌市場洞察</h3>
                            <p className="text-xs text-gray-600">根據近期拍賣數據和市場趨勢分析</p>
                          </div>
                        </div>
                        
                        <div className="ml-12">
                          <p className="text-sm text-gray-700 mb-3">
                            {activeCardFilter === 'Pokemon' 
                              ? 'Pokemon卡牌市場持續上升，特別是早期稀有卡片如初版噴火龍和皮卡丘。PSA 10評級的卡片尤其搶手，價格在過去一年上漲了約30%。' 
                              : activeCardFilter === '籃球卡'
                              ? '籃球卡市場在傳奇球星如Kobe Bryant和Michael Jordan的簽名卡和新人卡方面表現強勁。限量版和平行閃卡的需求也在快速上升。'
                              : activeCardFilter === '足球卡'
                              ? '頂級球星如梅西、C羅的早期卡片持續升值，尤其是評級良好的新人卡和簽名卡。歐洲杯和世界杯期間，市場通常會迎來一波升值高峰。'
                              : activeCardFilter === '遊戲王'
                              ? '遊戲王卡片市場由稀有程度和玩家需求驅動，初版和限量版卡片持續保持高價值。日文版原版卡片在收藏家中特別受歡迎。'
                              : '收藏卡牌市場整體呈上升趨勢，尤其是評級高的稀有卡片和經典角色。限量版、簽名卡和早期版本通常具有更高的收藏和投資價值。'}
                          </p>
                          
                          <div className="flex space-x-2 text-xs">
                            <button className="px-3 py-1 bg-white rounded-full border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors text-gray-700">
                              查看完整市場分析
                            </button>
                            <button className="px-3 py-1 bg-white rounded-full border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors text-gray-700">
                              卡牌投資指南
                            </button>
                            <button className="px-3 py-1 bg-white rounded-full border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors text-gray-700">
                              評級服務
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 卡牌列表 */}
                    {filteredCards.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCards.map((card) => (
                          <motion.div
                            key={card.id}
                            ref={el => cardRefs.current[`card-${card.id}`] = el}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all card-product relative group"
                            onClick={() => handleCardClick(card, 'card')}
                          >
                            {/* 稀有度標籤 */}
                            <div className="absolute top-2 left-2 z-10">
                              <span className="text-xs px-2 py-0.5 bg-black/70 text-white rounded-full backdrop-blur-sm">
                                {card.rarity}
                              </span>
                            </div>
                            
                            {/* 卡牌類型標籤 */}
                            <div className="absolute top-2 right-2 z-10">
                              <span className="text-xs px-2 py-0.5 bg-indigo-600/70 text-white rounded-full backdrop-blur-sm">
                                {card.category}
                              </span>
                            </div>
                            
                            {/* 卡牌圖片 */}
                            <div className="aspect-square bg-gray-100 relative overflow-hidden">
                              <img 
                                src={card.image} 
                                alt={card.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                              />
                              <div className="absolute bottom-2 left-2">
                                <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/90 text-white backdrop-blur-sm">
                                  {card.condition}
                                </span>
                              </div>
                            </div>
                            
                            <div className="p-4">
                              <h3 className="font-medium text-sm mb-2 line-clamp-2">{card.title}</h3>
                              <p className="text-xs text-gray-500 mb-3 line-clamp-2">{card.description}</p>
                              
                              <div className="flex justify-between items-center">
                                <div>
                                  <div className="text-indigo-600 font-bold text-lg">HK${card.price.toLocaleString()}</div>
                                  {card.originalPrice && (
                                    <div className="text-xs text-gray-500 line-through">HK${card.originalPrice.toLocaleString()}</div>
                                  )}
                                </div>
                                <div className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                                  {card.year}年 · {card.language}
                                </div>
                              </div>
                              
                              <div className="mt-3 flex justify-between items-center">
                                <span className="text-xs text-gray-500">{card.platform} · {card.location}</span>
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite(card.id);
                                  }}
                                  className="p-1.5 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                                >
                                  {isFavorited(card.id) ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ef4444" className="w-4 h-4">
                                      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                    </svg>
                                  ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                    </svg>
                                  )}
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-gray-50 rounded-xl p-12 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">找不到匹配的收藏卡牌</h3>
                        <p className="text-gray-500 max-w-md mx-auto mb-6">
                          嘗試更改搜索條件或卡牌類型過濾器，以查找更多收藏卡牌。
                        </p>
                        <button 
                          onClick={() => {
                            setCardSearchTerm('');
                            setActiveCardFilter('全部');
                          }}
                          className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors font-medium"
                        >
                          清除所有過濾條件
                        </button>
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </>
        )}
        </main>

      {/* 統一的頁腳 - 頁腳不再使用固定高度，而是自適應其內容高度 */}
      <footer className="w-full bg-white border-t border-gray-100 mt-auto z-30 relative">
         <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo和介紹 */}
            <div className="col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                  SP
                </div>
                <span className="font-semibold text-gray-900">SecondPrice.hk</span>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                SecondPrice是香港首個結合AI估價的二手物品和循環經濟平台，為您提供即時估價、買賣和競價服務。
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-twitter" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            {/* 鏈接列表 */}
            <div className="col-span-1">
              <h3 className="font-medium text-gray-900 mb-4">快速鏈接</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">二手物品</a></li>
                <li><a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">競價平台</a></li>
                <li><a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">AI估價</a></li>
                <li><a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">循環經濟資訊</a></li>
                <li><a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">回收服務</a></li>
              </ul>
            </div>
            
            {/* 法律和條款 */}
            <div className="col-span-1">
              <h3 className="font-medium text-gray-900 mb-4">法律與條款</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">使用條款</a></li>
                <li><a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">隱私政策</a></li>
                <li><a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">買家保障</a></li>
                <li><a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">賣家指南</a></li>
                <li><a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">知識產權</a></li>
              </ul>
            </div>
            
            {/* 聯繫我們 */}
            <div className="col-span-1">
              <h3 className="font-medium text-gray-900 mb-4">聯繫我們</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-gray-400 mt-0.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <span className="text-gray-500">香港九龍觀塘開源道64號源成中心11樓</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <a href="mailto:info@secondprice.hk" className="text-gray-500 hover:text-indigo-600 transition-colors">info@secondprice.hk</a>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <a href="tel:+85212345678" className="text-gray-500 hover:text-indigo-600 transition-colors">+852 1234 5678</a>
                </li>
              </ul>
              
              {/* 電子報訂閱 */}
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-900 mb-2">訂閱最新消息</h4>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="您的電子郵件" 
                    className="flex-grow px-3 py-2 text-sm bg-gray-100 border border-gray-200 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white transition-all"
                  />
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-r-lg px-3 text-sm transition-colors">
                    訂閱
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* 版權信息 */}
          <div className="pt-8 mt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} SecondPrice.hk 版權所有</p>
            <div className="flex items-center mt-4 md:mt-0">
              <img src="/hong-kong.png" alt="Made in Hong Kong" className="h-5 mr-2" onError={(e) => e.target.style.display = 'none'} />
              <span className="text-xs text-gray-500">香港設計與製作</span>
            </div>
          </div>
          </div>
        </footer>

      {/* Authentication Modal */}
      <AuthModal 
        showModal={showAuthModal} 
        setShowModal={setShowAuthModal} 
        setIsLoggedIn={setIsLoggedIn} 
        setActiveTab={setActiveTab} 
      />

      {/* 發帖子模態框 */}
      <AnimatePresence>
        {isCreatingPost && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl w-full max-w-md p-6 m-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900">發布新帖子</h3>
                <button onClick={() => setIsCreatingPost(false)} className="text-gray-400 hover:text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={(e) => { e.preventDefault(); handleCreatePost(); }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">帖子標題</label>
                  <input 
                    type="text" 
                    value={newPost.title} 
                    onChange={(e) => setNewPost({...newPost, title: e.target.value})} 
                    placeholder="輸入標題..." 
                    className="w-full rounded-lg border border-gray-200 px-3 py-2"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">帖子內容</label>
                  <textarea 
                    value={newPost.content} 
                    onChange={(e) => setNewPost({...newPost, content: e.target.value})} 
                    placeholder="分享你的想法..." 
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 h-32"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">圖片</label>
                  <div className="flex gap-2 mb-2">
                    <input 
                      type="url" 
                      value={newPost.image && newPost.image.startsWith('http') ? newPost.image : ''} 
                      onChange={(e) => setNewPost({...newPost, image: e.target.value})} 
                      placeholder="https://example.com/image.jpg" 
                      className="flex-grow rounded-lg border border-gray-200 px-3 py-2"
                    />
                    <label className="cursor-pointer px-3 py-2 bg-gray-100 text-gray-700 rounded-lg border border-gray-200 hover:bg-gray-200 transition-colors text-sm font-medium">
                      <span>上傳圖片</span>
                      <input 
                        type="file" 
                        accept="image/*"
                        className="hidden" 
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">輸入圖片連結或上傳本地圖片（max: 2MB），若不提供圖片，系統將隨機生成一張圖片</p>
                  
                  {/* 圖片預覽 */}
                  {newPost.image && (
                    <div className="mt-2 relative rounded-lg overflow-hidden bg-gray-100 group">
                      <img 
                        src={newPost.image} 
                        alt="圖片預覽"
                        className="w-full h-40 object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://placehold.co/600x400?text=無法載入圖片';
                        }}
                      />
                      <button 
                        type="button"
                        onClick={() => setNewPost({...newPost, image: ''})}
                        className="absolute top-2 right-2 bg-white/80 p-1 rounded-full text-gray-700 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">標籤 (用逗號分隔)</label>
                  <input 
                    type="text" 
                    value={newPost.tags} 
                    onChange={(e) => setNewPost({...newPost, tags: e.target.value})} 
                    placeholder="回收指南, 二手市場, 環保" 
                    className="w-full rounded-lg border border-gray-200 px-3 py-2"
                  />
                </div>
                
                <div className="mt-6 flex justify-end gap-2">
                  <button 
                    type="button" 
                    onClick={() => setIsCreatingPost(false)} 
                    className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
                    disabled={postSuccess}
                  >
                    取消
                  </button>
                  <button 
                    type="submit" 
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      postSuccess 
                        ? 'bg-green-500 text-white' 
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    } transition-colors flex items-center justify-center`}
                    disabled={postSuccess}
                  >
                    {postSuccess ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        發布成功
                      </>
                    ) : '發布帖子'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 添加卡片詳情模態框 */}
      <AnimatePresence mode="wait">
        {cardModalOpen && selectedCard && (
          <div className="fixed inset-0 z-50">
            {/* Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={closeCardModal}
            />
            
            {/* Modal Container */}
            <motion.div
              initial={{
                position: 'absolute',
                top: cardModalPosition.top,
                left: cardModalPosition.left,
                width: cardModalPosition.width,
                height: cardModalPosition.height,
                borderRadius: '0.5rem',
                zIndex: 60,
                overflow: 'hidden',
                opacity: 1
              }}
              animate={{
                top: window.innerHeight * 0.05,
                left: window.innerWidth * 0.1,
                width: window.innerWidth * 0.8,
                height: window.innerHeight * 0.9,
                borderRadius: '1rem',
                opacity: 1,
                transition: { type: 'spring', damping: 25, stiffness: 300, duration: 0.3 }
              }}
              exit={{
                top: cardModalPosition.top,
                left: cardModalPosition.left,
                width: cardModalPosition.width,
                height: cardModalPosition.height,
                borderRadius: '0.5rem',
                opacity: 0,
                transition: { duration: 0.2 }
              }}
              className="bg-white overflow-hidden flex flex-col md:flex-row"
              layout
            >
              {/* 左側圖片區域 */}
              <div className="md:w-1/2 h-1/3 md:h-full relative bg-gray-100 flex items-center justify-center">
                {/* 圖片容器 */}
                <div className="relative w-full h-full md:h-auto md:aspect-[4/3] overflow-hidden flex items-center justify-center">
                  {selectedCard && !selectedCard.isClosing && (
                    <img 
                      src={selectedCard.image} 
                      alt={selectedCard.title}
                      className="w-full h-full object-contain md:object-cover"
                      loading="eager"
                      decoding="async"
                    />
                  )}
                  
                  {/* 圖片控制按鈕 */}
                  {selectedCard && !selectedCard.isClosing && (
                    <div className="absolute bottom-4 right-4 flex space-x-2">
                      <button className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                      </button>
                      <button className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
                
                {/* 返回按鈕 */}
                <button 
                  onClick={closeCardModal}
                  className="absolute top-4 left-4 z-10 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                {/* 分享按鈕 */}
                {selectedCard && !selectedCard.isClosing && (
                  <button 
                    onClick={() => handleShare(selectedCard)}
                    className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 0 2.25 2.25 0 00-3.935 0z" />
                    </svg>
                  </button>
                )}
              </div>
              
              {/* 右側內容區域 */}
              <div className="md:w-1/2 h-2/3 md:h-full overflow-y-auto p-4 md:p-6 flex flex-col">
                {selectedCard && !selectedCard.isClosing && (
                  <div className="flex flex-col h-full">
                    {/* 內容頭部 */}
                    <div className="flex items-center justify-between mb-3">
                      {selectedCard.type === 'feed' && (
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden">
                            <img 
                              src={selectedCard.author?.avatar} 
                              alt={selectedCard.author?.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{selectedCard.author?.name}</h3>
                            <p className="text-xs text-gray-500">發布於 {new Date().toLocaleDateString('zh-HK')}</p>
                          </div>
                        </div>
                      )}
                      
                      {selectedCard.type === 'product' && (
                        <div className="flex items-center gap-2 text-sm">
                          <div className={`w-3 h-3 rounded-full ${selectedCard.platform === 'Carousell' ? 'bg-orange-500' : 'bg-blue-500'}`}></div>
                          <span className="font-medium">{selectedCard.platform}</span>
                          <span className="mx-2 text-gray-300">|</span>
                          <span className="text-gray-600">{selectedCard.condition}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* 標題 */}
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">{selectedCard.title}</h2>
                    
                    {/* 內容 */}
                    {selectedCard.type === 'feed' && (
                      <>
                        <div className="prose prose-sm mb-4 text-gray-700">
                          <p>{selectedCard.content}</p>
                        </div>
                        
                        {/* 標籤 */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {selectedCard.tags?.map((tag, idx) => (
                            <span 
                              key={idx} 
                              className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 cursor-pointer transition-colors"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                    
                    {selectedCard.type === 'product' && (
                      <>
                        {/* 價格信息 */}
                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-2xl font-bold text-indigo-600">HK${selectedCard.price}</span>
                            {calculateSavings(selectedCard.price, selectedCard.originalPrice)?.percent >= 5 && (
                              <span className="px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded-full font-medium">
                                省 {calculateSavings(selectedCard.price, selectedCard.originalPrice).percent}%
                              </span>
                            )}
                          </div>
                          {selectedCard.originalPrice && (
                            <div className="text-sm text-gray-500">
                              原價: <span className="line-through">HK${selectedCard.originalPrice}</span>
                            </div>
                          )}
                        </div>
                        
                        {/* 位置和按鈕 */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1 text-gray-400">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                            </svg>
                            {selectedCard.location}
                          </div>
                          
                          <button className="px-4 py-2 bg-indigo-600 text-white rounded-full text-sm font-medium transition-colors hover:bg-indigo-700">
                            查看原始頁面
                          </button>
                        </div>
                      </>
                    )}
                    
                    {/* 交互按鈕 */}
                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                      <div className="flex gap-4">
                        <button 
                          onClick={() => handleLike(selectedCard.id, selectedCard.type)}
                          className={`flex items-center gap-1.5 ${likedPosts[`${selectedCard.type}-${selectedCard.id}`] ? 'text-red-500' : 'text-gray-500 hover:text-red-500'} transition-colors`}
                        >
                          {likedPosts[`${selectedCard.type}-${selectedCard.id}`] ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                          )}
                          <span className="text-sm font-medium">喜歡</span>
                        </button>
                        
                        <button 
                          onClick={() => toggleComments(selectedCard.id, selectedCard.type)} 
                          className={`flex items-center gap-1.5 ${showComments[`${selectedCard.type}-${selectedCard.id}`] ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'} transition-colors`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                          </svg>
                          <span className="text-sm font-medium">評論</span>
                          {(comments[`${selectedCard.type}-${selectedCard.id}`]?.length || 0) > 0 && (
                            <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded-full">
                              {comments[`${selectedCard.type}-${selectedCard.id}`].length}
                            </span>
                          )}
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => handleShare(selectedCard)}
                        className="flex items-center gap-1.5 text-gray-500 hover:text-indigo-600 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 0 2.25 2.25 0 00-3.935 0z" />
                        </svg>
                        <span className="text-sm font-medium">分享</span>
                      </button>
                    </div>
                    
                    {/* 評論區 */}
                    {showComments[`${selectedCard.type}-${selectedCard.id}`] && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <h3 className="font-medium text-gray-900 mb-3">評論</h3>
                        
                        {/* 評論列表 */}
                        <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                          {comments[`${selectedCard.type}-${selectedCard.id}`]?.length > 0 ? (
                            comments[`${selectedCard.type}-${selectedCard.id}`].map((comment) => (
                              <div key={comment.id} className="flex gap-2">
                                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                                  <img 
                                    src={comment.author.avatar} 
                                    alt={comment.author.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex-1">
                                  <div className="bg-gray-50 rounded-lg p-3">
                                    <div className="flex justify-between items-start">
                                      <p className="text-sm font-medium text-gray-900">{comment.author.name}</p>
                                      <span className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleTimeString('zh-HK', { hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                    <p className="text-sm text-gray-700 mt-1">{comment.text}</p>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="text-center py-4 text-gray-500 text-sm">
                              還沒有評論，來發表第一條評論吧
                            </div>
                          )}
                        </div>
                        
                        {/* 評論輸入框 */}
                        <div className="flex gap-2">
                          <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                            <img 
                              src="https://i.pravatar.cc/150?img=33" 
                              alt="我"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 flex">
                            <input 
                              type="text"
                              value={commentInputs[`${selectedCard.type}-${selectedCard.id}`] || ''}
                              onChange={(e) => handleCommentInputChange(selectedCard.id, selectedCard.type, e.target.value)}
                              placeholder="寫下你的評論..."
                              className="flex-1 bg-gray-100 rounded-l-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                              onKeyPress={(e) => e.key === 'Enter' && handleSubmitComment(selectedCard.id, selectedCard.type)}
                            />
                            <button 
                              onClick={() => handleSubmitComment(selectedCard.id, selectedCard.type)}
                              className="bg-indigo-600 hover:bg-indigo-700 rounded-r-full px-4 py-2 text-white text-sm font-medium transition-colors"
                            >
                              發送
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* 相關內容區 - 限制DOM數量，只在必要時渲染 */}
                    {!selectedCard.isClosing && selectedCard.type === 'feed' && feedItems.filter(item => 
                      item.id !== selectedCard.id && 
                      item.tags.some(tag => selectedCard.tags.includes(tag))
                    ).length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <h3 className="font-medium text-gray-900 mb-3">相關文章</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {feedItems.filter(item => 
                            item.id !== selectedCard.id && 
                            item.tags.some(tag => selectedCard.tags.includes(tag))
                          ).slice(0, 2).map(item => (
                            <div key={item.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => {
                              closeCardModal();
                              setTimeout(() => handleCardClick(item, 'feed'), 350);
                            }}>
                              <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-sm line-clamp-2 mb-1">{item.title}</h4>
                                <p className="text-xs text-gray-500">{item.author.name}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {!selectedCard.isClosing && selectedCard.type === 'product' && scrapedProducts.filter(item => 
                      item.id !== selectedCard.id && 
                      item.title.split(' ').some(word => 
                        word.length > 1 && selectedCard.title.includes(word)
                      )
                    ).length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <h3 className="font-medium text-gray-900 mb-3">類似商品</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {scrapedProducts.filter(item => 
                            item.id !== selectedCard.id && 
                            item.title.split(' ').some(word => 
                              word.length > 1 && selectedCard.title.includes(word)
                            )
                          ).slice(0, 2).map(item => (
                            <div key={item.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => {
                              closeCardModal();
                              setTimeout(() => handleCardClick(item, 'product'), 350);
                            }}>
                              <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-sm line-clamp-2 mb-1">{item.title}</h4>
                                <div className="flex justify-between items-center">
                                  <p className="text-xs font-medium text-indigo-600">HK${item.price}</p>
                                  <p className="text-xs text-gray-500">{item.platform}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 確保底部沒有額外的浮動按鈕 */}
      <div className="fixed right-6 bottom-6 z-40 space-y-2">
        {/* 完全清空，刪除所有"+"按鈕 */}
      </div>

      {/* AI助理浮動按鈕 - 使用framer-motion使其可拖動，加入半透明效果 */}
      {!showAiAssistant && (
        <motion.button 
          drag
          dragMomentum={false}
          dragConstraints={{
            top: 60,
            left: 20,
            right: 20,
            bottom: 100
          }}
          initial={{ bottom: 120, right: 20 }}
          className="fixed z-50 w-14 h-14 bg-gradient-to-r from-indigo-600/90 to-purple-600/90 text-white rounded-full shadow-lg flex items-center justify-center hover:from-indigo-700/90 hover:to-purple-700/90 transition-all backdrop-blur-sm"
          onClick={() => setShowAiAssistant(true)}
          style={{
            position: 'fixed',
            bottom: '120px',
            right: '20px'
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
          </svg>
        </motion.button>
      )}
      
      {/* AI助理漂浮窗口 - 改進定位方式確保不會與頁腳重疊 */}
      {showAiAssistant && (
        <motion.div 
          drag
          dragMomentum={false}
          dragElastic={0.1}
          dragConstraints={{ 
            left: 10, 
            right: window.innerWidth - 290, 
            top: 70, 
            bottom: window.innerHeight - 450  // 限制在頁腳上方
          }}
          className={`fixed z-50 bg-white/90 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden border border-purple-200/70 transition-all ${aiMinimized ? 'w-64 h-12' : 'w-80 h-[450px]'}`}
          initial={{ 
            x: window.innerWidth - 330, 
            y: 100  // 初始位置設置在頁面頂部而非底部
          }}
        >
          {/* 標題欄 */}
          <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-indigo-600/90 to-purple-600/90 backdrop-blur-sm text-white cursor-grab">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </div>
              <h3 className="font-bold text-sm">AI 智能助理</h3>
            </div>
            <div className="flex items-center space-x-1">
              <button 
                onClick={() => setAiMinimized(!aiMinimized)} 
                className="p-1 rounded-full hover:bg-white/20"
              >
                {aiMinimized ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.25V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18V8.25m-18 0V6a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6zM7.5 6h.008v.008H7.5V6zm2.25 0h.008v.008H9.75V6z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                  </svg>
                )}
              </button>
              <button 
                onClick={() => setShowAiAssistant(false)} 
                className="p-1 rounded-full hover:bg-white/20"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* 最小化時不顯示內容 */}
          {!aiMinimized && (
            <>
              {/* 聊天消息 */}
              <div className="flex-1 overflow-y-auto p-3 bg-gray-50/90 backdrop-blur-sm" style={{ height: 'calc(100% - 40px - 110px)' }}>
                <div className="space-y-3">
                  {aiMessages.length === 0 && (
                    <div className="text-center p-4">
                      <p className="text-sm text-gray-500">您好！我是SecondPrice的AI助理，有什麼可以幫您的嗎？</p>
                    </div>
                  )}
                  {aiMessages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[85%] rounded-2xl p-2.5 ${
                        message.role === 'user' 
                          ? 'bg-indigo-600/90 backdrop-blur-sm text-white' 
                          : 'bg-white/90 backdrop-blur-sm border border-gray-200/70 shadow-sm'
                      }`}>
                        {message.isLoading ? (
                          <div className="flex items-center space-x-1 h-5 px-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '600ms' }}></div>
                          </div>
                        ) : (
                          <div className={`text-xs ${message.role === 'user' ? 'text-white' : 'text-gray-800'}`}>
                            {formatAiMessageContent(message.content)}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>
              
              {/* 建議選項 */}
              {showAiSuggestions && aiSuggestions.length > 0 && (
                <div className="p-2 bg-gray-50/90 backdrop-blur-sm border-t border-gray-200/70 overflow-x-auto">
                  <div className="flex space-x-1.5">
                    {aiSuggestions.slice(0, 3).map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setAiInputValue(suggestion);
                          handleAiSendMessage({ preventDefault: () => {} });
                        }}
                        className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs text-gray-700 border border-gray-200/70 hover:bg-gray-100/90 transition-colors whitespace-nowrap flex-shrink-0"
                      >
                        {suggestion.length > 15 ? `${suggestion.slice(0, 15)}...` : suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* 訊息輸入區 */}
              <div className="p-2 bg-white/90 backdrop-blur-sm border-t border-gray-200/70">
                <form onSubmit={handleAiSendMessage} className="flex gap-1.5">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="詢問我關於二手物品的問題..."
                      value={aiInputValue}
                      onChange={(e) => setAiInputValue(e.target.value)}
                      className="w-full rounded-full border border-gray-300/70 bg-white/70 backdrop-blur-sm py-1.5 pl-3 pr-8 focus:outline-none focus:border-indigo-500 text-xs"
                    />
                    <button 
                      type="button" 
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-600 p-0.5"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                      </svg>
                    </button>
                  </div>
                  <button
                    type="submit"
                    disabled={!aiInputValue.trim() || isAiLoading}
                    className={`rounded-full p-1.5 ${
                      !aiInputValue.trim() || isAiLoading 
                      ? 'bg-gray-200/90 text-gray-400' 
                      : 'bg-indigo-600/90 backdrop-blur-sm text-white hover:bg-indigo-700/90'
                    } transition-colors`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                  </button>
                </form>
              </div>
            </>
          )}
        </motion.div>
      )}
      
      {/* Toast notification */}
      <AnimatePresence>
        {toast.visible && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-4 right-4 z-50 px-4 py-2 rounded-lg shadow-lg ${
              toast.type === 'success' ? 'bg-green-500' : 
              toast.type === 'error' ? 'bg-red-500' : 
              'bg-blue-500'
            } text-white`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 