import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Footer from '../components/Footer'
import Image from 'next/image';
import axios from 'axios'; // 引入 axios

// Helper function for conditional class names
const cn = (...classes) => classes.filter(Boolean).join(' ');

export default function Home() {
  const router = useRouter();
  const [searchKeyword, setSearchKeyword] = useState('');

  // 登入狀態
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
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
  
  // AI Chat 狀態
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '你好！上傳物品照片或描述你想處理的物品，我將幫你評估價值並找到最理想方式。' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const suggestions = [
    '二手iPhone能賣多少錢？',
    '如何回收舊電腦？',
    '二手傢俱推薦',
    '電子產品回收價值'
  ];

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
      url: '#'
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
      url: '#'
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
      url: '#'
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
      url: '#'
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
      url: '#'
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
      url: '#'
    }
  ]);
  const [productSearchTerm, setProductSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('全部'); // Filter for products and bidding

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
  const [showAuthModal, setShowAuthModal] = useState(false);
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
    setAuthMode('login');
  };

  // 切換標籤
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Chat 函數
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setUploadedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      // 可選：添加圖片預覽動畫
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if ((!inputValue.trim() && !uploadedImage) || isLoading) return;
    
    const userMessage = {
      role: 'user',
      content: inputValue,
      image: previewUrl
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    if (previewUrl) {
      setUploadedImage(null);
      setPreviewUrl(null);
      if (fileInputRef.current) fileInputRef.current.value = null;
    }

    const assistantMessage = { role: 'assistant', content: '', isLoading: true };
    setMessages(prev => [...prev, assistantMessage]);
    
    // 使用模擬回覆
    setTimeout(() => {
      let responseContent = '感謝您的訊息！請提供更多細節，或嘗試我們的推薦問題。'; // 默認回覆
      // ... (可加入之前的模擬回覆邏輯)
      setMessages(prev => prev.map((msg, i) => 
        i === prev.length - 1 ? { ...msg, content: responseContent, isLoading: false } : msg
      ));
      setIsLoading(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    // 觸發 handleSendMessage，但創建一個模擬事件對象
    handleSendMessage({ preventDefault: () => {} }); 
  };

  // 自動滾動到聊天底部
  useEffect(() => {
    if (messages.length > 0 && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Products 函數
  const calculateSavings = (price, originalPrice) => {
    if (!originalPrice || originalPrice <= price) return null;
    const savingsAmount = originalPrice - price;
    const savingsPercent = Math.round((savingsAmount / originalPrice) * 100);
    return { amount: savingsAmount, percent: savingsPercent };
  };

  const filteredProducts = scrapedProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(productSearchTerm.toLowerCase());
    const matchesFilter = activeFilter === '全部' || 
                          (activeFilter === 'Carousell' && product.platform === 'Carousell') ||
                          (activeFilter === 'Facebook' && product.platform === 'Facebook');
    return matchesSearch && matchesFilter;
  });

  const sortedFilteredProducts = filteredProducts.sort((a, b) => {
    const savingsA = calculateSavings(a.price, a.originalPrice);
    const savingsB = calculateSavings(b.price, b.originalPrice);
    const percentA = savingsA ? savingsA.percent : 0;
    const percentB = savingsB ? savingsB.percent : 0;
    return percentB - percentA;
  });
  
  // Bidding 函數
  const handlePlaceBid = (biddingId) => {
    if (!bidAmount[biddingId] || isNaN(bidAmount[biddingId])) return;
    const amount = Number(bidAmount[biddingId]);
    setActiveBiddings(prevBiddings => prevBiddings.map(bidding => {
      if (bidding.id === biddingId && amount > bidding.currentBid) {
        return {
          ...bidding,
          currentBid: amount,
          bidCount: bidding.bidCount + 1,
          bidders: [...bidding.bidders, { name: '您', amount, time: new Date().toISOString() }]
        };
      }
      return bidding;
    }));
    setBidAmount({ ...bidAmount, [biddingId]: '' });
  };
  
  const handleCreateBidding = () => {
    if (!newBidding.title || !newBidding.startPrice || !newBidding.endTime) return;
    const newBiddingObj = {
      id: activeBiddings.length + 1,
      title: newBidding.title,
      description: newBidding.description,
      image: 'https://images.unsplash.com/photo-1607435097405-db48f377bff7?w=500', // placeholder
      startPrice: Number(newBidding.startPrice),
      currentBid: Number(newBidding.startPrice),
      bidCount: 0,
      endTime: new Date(newBidding.endTime).toISOString(),
      seller: { name: '您', avatar: 'https://i.pravatar.cc/150?img=20', rating: 5.0 },
      bidders: []
    };
    setActiveBiddings([...activeBiddings, newBiddingObj]);
    setNewBidding({ title: '', description: '', startPrice: '', endTime: '', category: '' });
    setIsCreatingBidding(false);
  };
  
  const formatTimeRemaining = (endTimeStr) => {
    const endTime = new Date(endTimeStr);
    const now = new Date();
    const diff = endTime - now;
    if (diff <= 0) return '已結束';
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    if (days > 0) return `${days}天 ${hours}小時`;
    if (hours > 0) return `${hours}小時 ${minutes}分鐘`;
    return `${minutes}分鐘`;
  };

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
                      <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
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

  // 修改二手物品卡片，添加點擊事件
  const renderProductCards = () => {
    return sortedFilteredProducts.map((product) => {
      const savings = calculateSavings(product.price, product.originalPrice);
      const isLiked = likedPosts[`product-${product.id}`];
      
      return (
        <motion.div 
          key={product.id}
          ref={el => cardRefs.current[`product-${product.id}`] = el}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: product.id * 0.05, duration: 0.3 }}
          className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm transition-all duration-300 product-card cursor-pointer"
          onClick={() => handleCardClick(product, 'product')}
        >
          {/* 產品卡片內部結構 */}
          <div className="aspect-[4/3] relative">
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2 bg-white rounded-full px-2 py-1 text-xs font-medium text-gray-900 shadow-sm flex items-center gap-1">
              {product.platform === 'Carousell' ? (
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
              ) : (
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              )}
              {product.platform}
            </div>
            <div className="absolute top-2 right-2 bg-indigo-600 rounded-full px-2 py-1 text-xs font-medium text-white shadow-sm">
              {product.condition}
            </div>
            {isLiked && (
              <div className="absolute bottom-2 left-2 bg-white rounded-full p-1 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ef4444" className="w-4 h-4">
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
              </div>
            )}
            {savings && savings.percent >= 20 && (
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <div className="bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1 inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 mr-1">
                    <path fillRule="evenodd" d="M10 1a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 1zM5.05 3.05a.75.75 0 011.06 0l1.062 1.06a.75.75 0 11-1.061 1.061L5.05 4.11a.75.75 0 010-1.06zM15.95 3.05a.75.75 0 010 1.06l-1.06 1.061a.75.75 0 01-1.062-1.06l1.061-1.06a.75.75 0 011.06 0zM3 10a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 013 10zm13.25-.75a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5h-1.5zM5.05 15.95a.75.75 0 010-1.06l1.06-1.061a.75.75 0 111.062 1.06l-1.061 1.06a.75.75 0 01-1.06 0zM15.95 15.95a.75.75 0 01-1.06 0l-1.06-1.06a.75.75 0 111.06-1.06l1.06 1.06a.75.75 0 010 1.06zM10 16.25a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                  </svg>
                  最佳價格
                </div>
              </div>
            )}
          </div>
          <div className="p-2">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-sm font-medium text-gray-900 line-clamp-2 flex-1">{product.title}</h3>
              {product.platform === 'Carousell' && showPlatformComparison[`${product.platform}-${product.id}`] && (
                <div className="ml-2 text-xs text-blue-600 whitespace-nowrap flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 mr-0.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                  FB更平
                </div>
              )}
              {product.platform === 'Facebook' && showPlatformComparison[`${product.platform}-${product.id}`] && (
                <div className="ml-2 text-xs text-orange-600 whitespace-nowrap flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 mr-0.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                  CL更平
                </div>
              )}
            </div>
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center">
                  <span className="text-indigo-600 font-bold">HK${product.price}</span>
                  {savings && (
                    <span className="ml-2 text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded">
                      省{savings.percent}%
                    </span>
                  )}
                </div>
                {product.originalPrice && (
                  <div className="text-xs text-gray-500 line-through">HK${product.originalPrice}</div>
                )}
              </div>
              <div className="text-xs text-gray-500">{product.location}</div>
            </div>
          </div>
        </motion.div>
      );
    });
  };

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

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Head>
        <title>SecondPrice.hk - 循環經濟平台</title>
        <meta name="description" content="透過AI技術估算物品價值，快速匹配二手買家或回收商" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      {/* 統一的頂部導航 */}
      <header className="sticky top-0 z-50 bg-white py-3 px-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-md flex items-center justify-center text-white font-bold text-sm">
              SP
            </div>
            <h1 className="text-gray-900 font-semibold">SecondPrice.hk</h1>
          </div>
          
        <div className="flex items-center gap-3">
          {/* 搜索按鈕 */}
          <button className="p-2 rounded-full hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            </button>
          
          {/* 登入/用戶頭像按鈕 */}
          {!isLoggedIn ? (
            <>
              <button 
                onClick={() => {
                  setShowAuthModal(true);
                  setAuthMode('register');
                }}
                className="px-3 py-1.5 text-sm font-medium bg-white text-indigo-600 border border-indigo-600 rounded-full hover:bg-indigo-50 transition-colors"
              >
              註冊
            </button>
              <button 
                onClick={handleLoginClick}
                className="px-3 py-1.5 text-sm font-medium bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
              >
                登入
              </button>
            </>
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
              <img src="https://i.pravatar.cc/150?img=33" alt="用戶頭像" className="w-full h-full object-cover" />
            </div>
          )}
          </div>
        </header>

      {/* 主體內容 */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {!isLoggedIn ? (
          // ---- 未登入狀態：瀑布流 ----
          <>
            {/* 移除之前的標籤欄，換成標題說明 */}
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">為您推薦的內容</h2>
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
            {/* 標籤導航 */}
            <div className="flex border-b border-gray-200 mb-6">
              {[
                { key: 'follow', label: '關注' }, 
                { key: 'explore', label: '探索' }, 
                { key: 'products', label: '二手物品' },
                { key: 'bidding', label: '競價平台' }, 
                { key: 'chat', label: 'AI 助理' }
              ].map(tab => (
            <button 
                  key={tab.key}
                  onClick={() => handleTabChange(tab.key)}
              className={cn(
                "pb-3 px-4 text-sm font-medium relative",
                    activeTab === tab.key
                      ? 'text-indigo-600 font-semibold' 
                  : 'text-gray-500 hover:text-gray-700'
              )}
            >
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
                  <div className="text-center py-16 text-gray-500">
                    關注功能開發中...
                  </div>
                )}

                {activeTab === 'explore' && (
                  <>
                    {renderFeedCards()} {/* 複用瀑布流渲染函數 */}
                    <div className="flex justify-center mt-8">
                      <button className="px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-600 rounded-full hover:bg-indigo-50 transition-colors">
                        查看更多
            </button>
                    </div>
                  </>
                )}

              {activeTab === 'products' && (
                  <div className="space-y-3">
                    {/* ... 二手物品列表和篩選 ... */} 
                    <div className="flex justify-between items-center">
                      <h2 className="font-medium text-gray-900">爬取的二手物品 ({sortedFilteredProducts.length})</h2>
                      <div className="flex items-center text-xs text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 mr-1 text-indigo-600">
                          <path fillRule="evenodd" d="M2.5 3A1.5 1.5 0 001 4.5v4A1.5 1.5 0 002.5 10h6A1.5 1.5 0 0010 8.5v-4A1.5 1.5 0 008.5 3h-6zm11 2A1.5 1.5 0 0012 6.5v7a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5v-7A1.5 1.5 0 0019.5 5h-6z" clipRule="evenodd" />
                        </svg>
                        價格比較已啟用
                      </div>
                    </div>
                    {/* 搜索和篩選 */}
                    <div className="flex flex-col sm:flex-row gap-2 mb-3">
                       <div className="relative flex-grow">
                        <input
                          type="text"
                          value={productSearchTerm}
                          onChange={(e) => setProductSearchTerm(e.target.value)}
                          placeholder="搜索二手物品..."
                          className="w-full px-4 py-2 rounded-full bg-gray-100 text-gray-900 border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder-gray-500 text-sm"
                        />
                        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                          </svg>
            </button>
                      </div>
                      <div className="flex gap-2">
                        {['全部', 'Carousell', 'Facebook'].map((filter) => (
            <button 
                            key={filter}
                            onClick={() => setActiveFilter(filter)} // 共用 activeFilter 狀態
              className={cn(
                              "px-3 py-1.5 text-xs rounded-full transition-colors",
                              activeFilter === filter
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            )}
                          >
                            {filter}
            </button>
                        ))}
          </div>
                    </div>
                    {/* 產品網格 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {renderProductCards()}
                    </div>
                    {filteredProducts.length === 0 && (
                      <div className="bg-gray-100 rounded-lg p-8 text-center text-gray-500">
                        沒有找到相關的二手物品
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'bidding' && (
                <div className="space-y-4">
                    {/* ... 競價平台列表和篩選 ... */}
                  <div className="flex justify-between items-center">
                    <h2 className="font-medium text-gray-900">競價平台 ({activeBiddings.length})</h2>
                    <button 
                      onClick={() => setIsCreatingBidding(true)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-600 text-white rounded-full text-xs font-medium hover:bg-indigo-700 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                      </svg>
                      建立競價
                    </button>
                  </div>
                    {/* 篩選 */}
                  <div className="flex gap-2 mb-4">
                    {['全部', '電子產品', '時尚服飾', '遊戲娛樂'].map((category) => (
                      <button
                        key={category}
                          onClick={() => setActiveFilter(category)} // 共用 activeFilter
                        className={cn(
                          "px-3 py-1.5 text-xs rounded-full transition-colors",
                          activeFilter === category
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        )}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                    {/* 競價列表 */}
                  <div className="space-y-3">
                    {activeBiddings
                        .filter(bidding => activeFilter === '全部' || true) // TODO: Implement actual category filtering
                      .map((bidding) => (
                      <motion.div
                        key={bidding.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: bidding.id * 0.05, duration: 0.3 }}
                        className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm"
                      >
                          {/* ... 競價卡片內部結構 ... */}
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3 aspect-square md:aspect-auto relative">
                            <img 
                              src={bidding.image} 
                              alt={bidding.title} 
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 left-2 bg-green-500 rounded-full px-2 py-1 text-xs font-medium text-white shadow-sm">
                              全新
                            </div>
                          </div>
                          <div className="p-4 flex flex-col flex-grow">
                            <div className="flex justify-between mb-2">
                              <h3 className="font-bold text-gray-900">{bidding.title}</h3>
                              <div className="flex items-center text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 mr-1">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
                                </svg>
                                剩餘 {formatTimeRemaining(bidding.endTime)}
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{bidding.description}</p>
                            <div className="flex justify-between mb-4">
                              <div>
                                <div className="text-sm text-gray-500">目前出價</div>
                                <div className="text-xl font-bold text-indigo-600">HK${bidding.currentBid}</div>
                                <div className="text-xs text-gray-500">起標價: HK${bidding.startPrice}</div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-500">出價次數</div>
                                <div className="text-xl font-bold text-gray-900">{bidding.bidCount}</div>
                              </div>
                            </div>
                            <div className="mt-auto">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-full overflow-hidden">
                                      <img src={bidding.seller.avatar} alt={bidding.seller.name} className="w-full h-full object-cover"/>
                                  </div>
                                  <span className="text-xs text-gray-700">{bidding.seller.name}</span>
                                  <div className="flex items-center text-xs text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-yellow-400">
                                      <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                                    </svg>
                                    <span className="ml-1">{bidding.seller.rating}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <input
                                  type="number"
                                  value={bidAmount[bidding.id] || ''}
                                  onChange={(e) => setBidAmount({...bidAmount, [bidding.id]: e.target.value})}
                                  placeholder={`HK$${bidding.currentBid + 100}或更高`}
                                  className="flex-grow rounded-lg border border-gray-200 px-3 py-2 text-sm"
                                  min={bidding.currentBid + 1}
                                />
                                <button
                                  onClick={() => handlePlaceBid(bidding.id)}
                                  disabled={!bidAmount[bidding.id] || Number(bidAmount[bidding.id]) <= bidding.currentBid}
                                  className={cn(
                                    "px-4 py-2 rounded-lg text-sm font-medium",
                                    (!bidAmount[bidding.id] || Number(bidAmount[bidding.id]) <= bidding.currentBid)
                                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                      : "bg-indigo-600 text-white hover:bg-indigo-700"
                                  )}
                                >
                                  出價
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  {activeBiddings.filter(bidding => activeFilter === '全部' || true).length === 0 && (
                      <div className="bg-gray-100 rounded-lg p-8 text-center text-gray-500">
                        沒有進行中的競價
                    </div>
                  )}
                    {/* 創建競價模態框 */} 
                  {isCreatingBidding && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                      <div className="bg-white rounded-xl w-full max-w-md p-6 m-4">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-bold text-gray-900">建立新競價</h3>
                            <button onClick={() => setIsCreatingBidding(false)} className="text-gray-400 hover:text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">商品名稱</label>
                              <input type="text" value={newBidding.title} onChange={(e) => setNewBidding({...newBidding, title: e.target.value})} placeholder="例：iPhone 15 Pro Max 256GB 黑色" className="w-full rounded-lg border border-gray-200 px-3 py-2" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">商品描述</label>
                              <textarea value={newBidding.description} onChange={(e) => setNewBidding({...newBidding, description: e.target.value})} placeholder="描述商品的狀態、特點等..." className="w-full rounded-lg border border-gray-200 px-3 py-2 h-24" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">起標價格 (HK$)</label>
                              <input type="number" value={newBidding.startPrice} onChange={(e) => setNewBidding({...newBidding, startPrice: e.target.value})} placeholder="例：1000" className="w-full rounded-lg border border-gray-200 px-3 py-2" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">結束時間</label>
                              <input type="datetime-local" value={newBidding.endTime} onChange={(e) => setNewBidding({...newBidding, endTime: e.target.value})} className="w-full rounded-lg border border-gray-200 px-3 py-2" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">商品類別</label>
                              <select value={newBidding.category} onChange={(e) => setNewBidding({...newBidding, category: e.target.value})} className="w-full rounded-lg border border-gray-200 px-3 py-2">
                              <option value="">選擇類別</option>
                              <option value="電子產品">電子產品</option>
                              <option value="時尚服飾">時尚服飾</option>
                              <option value="遊戲娛樂">遊戲娛樂</option>
                              <option value="家居生活">家居生活</option>
                              <option value="其他">其他</option>
                            </select>
                          </div>
                        </div>
                        <div className="mt-6 flex justify-end gap-2">
                            <button onClick={() => setIsCreatingBidding(false)} className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200">取消</button>
                            <button onClick={handleCreateBidding} className="px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700">建立競價</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                )}

                {activeTab === 'chat' && (
                  <div className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm h-[calc(100vh-230px)] flex flex-col">
                    {/* Chat Header (simplified) */}
                    <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-indigo-600">
                          <path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                      </div>
                      <h3 className="font-medium text-sm text-gray-900">SecondPrice AI 助理</h3>
                    </div>
                      {/* Optional: Add refresh or other controls */}
                  </div>
                  {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={cn('flex', message.role === 'user' ? 'justify-end' : 'justify-start')}
                      >
                          <motion.div 
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className={cn(
                              'max-w-[85%] rounded-2xl px-4 py-2 message-bubble',
                          message.role === 'user' 
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white text-gray-900 border border-gray-200'
                            )}
                          >
                          {message.image && (
                            <div className="mb-2 rounded-lg overflow-hidden">
                              <img src={message.image} alt="Uploaded" className="w-full max-h-48 object-cover" />
                            </div>
                          )}
                          {message.isLoading ? (
                            <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse"></div>
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse delay-300"></div>
                            </div>
                          ) : (
                            <div className="text-sm leading-relaxed whitespace-pre-line">{message.content}</div>
                          )}
                          </motion.div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                  {/* Quick Suggestions */}
                  {messages.length <= 2 && (
                    <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
                      <p className="text-xs text-gray-500 mb-2">推薦問題</p>
                      <div className="flex flex-wrap gap-2">
                        {suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                              className="px-3 py-1.5 text-xs bg-white hover:bg-gray-100 rounded-full text-gray-700 border border-gray-200 transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Input Area */}
                    <div className="p-3 border-t border-gray-200 bg-white">
                    {previewUrl && (
                        <div className="relative mb-2 w-16 h-16 rounded overflow-hidden border border-gray-200 group preview-image-container">
                        <img src={previewUrl} alt="Preview" className="object-cover w-full h-full"/>
                        <button 
                          onClick={() => { setPreviewUrl(null); setUploadedImage(null); fileInputRef.current.value = null; }}
                          className="absolute top-0.5 right-0.5 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    )}
                    <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          placeholder="描述物品或上傳圖片..."
                            className="w-full px-4 py-2 rounded-full bg-gray-100 text-gray-900 border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder-gray-500 text-sm"
                          disabled={isLoading}
                        />
                          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                          <button type="button" onClick={handleUploadClick} title="上傳圖片" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-600 p-1 rounded-full" disabled={isLoading}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                          </svg>
                        </button>
                      </div>
                      <button
                        type="submit"
                        disabled={(!inputValue.trim() && !uploadedImage) || isLoading}
                        className={cn(
                            'p-2 rounded-full send-button',
                          (!inputValue.trim() && !uploadedImage) || isLoading
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        )}
                      >
                        {isLoading ? (
                          <div className="w-4 h-4 border-2 border-t-transparent border-current rounded-full animate-spin"></div>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
                          </svg>
                        )}
                      </button>
                    </form>
                  </div>
                </div>
                )}
              </motion.div>
            </AnimatePresence>
          </>
        )}
        </main>

      {/* 統一的頁腳 */}
      <footer className="py-6 border-t border-gray-100 mt-10 bg-white">
         <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-indigo-600 rounded-md flex items-center justify-center text-white text-xs font-bold">
                SP
              </div>
              <p className="text-gray-500 text-sm">© 2024 SecondPrice.hk</p>
            </div>
            
            <div className="flex gap-6">
              <a href="#" className="text-gray-500 hover:text-indigo-600 text-sm">關於我們</a>
              <a href="#" className="text-gray-500 hover:text-indigo-600 text-sm">使用條款</a>
              <a href="#" className="text-gray-500 hover:text-indigo-600 text-sm">隱私政策</a>
              <a href="#" className="text-gray-500 hover:text-indigo-600 text-sm">聯繫我們</a>
            </div>
            </div>
          </div>
        </footer>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl w-full max-w-md p-6 m-4"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-900 text-xl">
                {authMode === 'login' ? '登入 SecondPrice' : '註冊新帳戶'}
              </h3>
              <button 
                onClick={() => setShowAuthModal(false)} 
                className="text-gray-400 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
      </div>
            
            {authError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {authError}
              </div>
            )}
            
            {authMode === 'login' ? (
              /* Login Form */
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">電郵地址</label>
                  <input 
                    type="email" 
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                    placeholder="your@email.com" 
                    className="w-full rounded-lg border border-gray-200 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">密碼</label>
                  <input 
                    type="password" 
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                    placeholder="••••••••" 
                    className="w-full rounded-lg border border-gray-200 px-3 py-2"
                  />
                </div>
                <div className="pt-2">
                  <button 
                    onClick={handleLogin}
                    disabled={authLoading}
                    className="w-full py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center"
                  >
                    {authLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    ) : null}
                    登入
                  </button>
                </div>
                <div className="text-center text-sm text-gray-500">
                  還沒有帳戶？{' '}
                  <button 
                    onClick={toggleAuthMode}
                    className="text-indigo-600 font-medium hover:underline"
                  >
                    立即註冊
                  </button>
                </div>
              </div>
            ) : (
              /* Registration Form */
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">用戶名稱</label>
                  <input 
                    type="text" 
                    value={registerForm.username}
                    onChange={(e) => setRegisterForm({...registerForm, username: e.target.value})}
                    placeholder="用戶名稱" 
                    className="w-full rounded-lg border border-gray-200 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">電郵地址</label>
                  <input 
                    type="email" 
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                    placeholder="your@email.com" 
                    className="w-full rounded-lg border border-gray-200 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">密碼</label>
                  <input 
                    type="password" 
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                    placeholder="••••••••" 
                    className="w-full rounded-lg border border-gray-200 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">確認密碼</label>
                  <input 
                    type="password" 
                    value={registerForm.confirmPassword}
                    onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
                    placeholder="••••••••" 
                    className="w-full rounded-lg border border-gray-200 px-3 py-2"
                  />
                </div>
                <div className="pt-2">
                  <button 
                    onClick={handleRegister}
                    disabled={authLoading}
                    className="w-full py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center"
                  >
                    {authLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    ) : null}
                    註冊
                  </button>
                </div>
                <div className="text-center text-sm text-gray-500">
                  已有帳戶？{' '}
                  <button 
                    onClick={toggleAuthMode}
                    className="text-indigo-600 font-medium hover:underline"
                  >
                    登入
                  </button>
                </div>
              </div>
            )}
            
            {/* Social Login Options */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">或使用</span>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="#4285F4" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="white"></path>
                    <path d="M12.0003 4.6665C14.7003 4.6665 17.0169 5.9165 18.5336 7.8665L15.8836 10.5165C15.0503 9.4665 13.6003 8.7665 12.0003 8.7665C9.33362 8.7665 7.16695 10.9332 7.16695 13.5998C7.16695 16.2665 9.33362 18.4332 12.0003 18.4332C14.1503 18.4332 16.0003 17.0332 16.5836 15.0832H12.0003V11.1665H20.767C20.9336 11.8665 21.0003 12.5832 21.0003 13.3332C21.0003 17.8332 17.117 21.3332 12.0003 21.3332C7.40028 21.3332 3.66695 17.5998 3.66695 12.9998C3.66695 8.3998 7.40028 4.6665 12.0003 4.6665Z" fill="#4285F4"></path>
                  </svg>
                  Google
                </button>
                <button className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 10C20 4.48 15.52 0 10 0C4.48 0 0 4.48 0 10C0 14.84 3.44 18.87 8 19.8V13H6V10H8V7.5C8 5.57 9.57 4 11.5 4H14V7H12C11.45 7 11 7.45 11 8V10H14V13H11V19.95C16.05 19.45 20 15.19 20 10Z" fill="#1877F2"></path>
                  </svg>
                  Facebook
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      
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
                    <div className="flex items-center gap-3 mb-3">
                      {selectedCard.type === 'feed' && (
                        <>
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
                        </>
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
                          
                          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors">
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
                              className="bg-indigo-600 hover:bg-indigo-700 rounded-r-full px-4 text-white text-sm font-medium transition-colors"
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
    </div>
  )
} 