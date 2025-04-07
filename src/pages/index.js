import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Footer from '../components/Footer'
import Image from 'next/image';

// Helper function for conditional class names
const cn = (...classes) => classes.filter(Boolean).join(' ');

export default function Home() {
  const router = useRouter();
  const [searchKeyword, setSearchKeyword] = useState('');

  // State for chat functionality
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '你好！上傳物品照片或描述你想處理的物品，我將幫你評估價值並找到最理想方式。' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  
  // State for content feed
  const [activeTab, setActiveTab] = useState('explore');
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
    }
  ]);

  // Suggestions for chat
  const suggestions = [
    '二手iPhone能賣多少錢？',
    '如何回收舊電腦？',
    '二手傢俱推薦',
    '電子產品回收價值'
  ];

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle file upload
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setUploadedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  // Handle sending a message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if ((!inputValue.trim() && !uploadedImage) || isLoading) return;
    
    // Add user message to chat
    const userMessage = {
      role: 'user',
      content: inputValue,
      image: previewUrl
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Clear image preview after sending
    if (previewUrl) {
      setUploadedImage(null);
      setPreviewUrl(null);
      if (fileInputRef.current) fileInputRef.current.value = null;
    }

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage = { role: 'assistant', content: '', isLoading: true };
      setMessages(prev => [...prev, assistantMessage]);
      
      // Determine response based on input
      setTimeout(() => {
        let responseContent = '';
        
        if (userMessage.content.toLowerCase().includes('iphone') || (userMessage.image && userMessage.content.includes('手機'))) {
          responseContent = '感謝您的詢問！根據目前市場行情，二手iPhone的價值取決於幾個因素：\n\n1. 型號與規格：iPhone 13 Pro Max (256GB) 約可獲得4,000-5,500港幣\n2. 機況：螢幕無損、電池健康度>85%可獲更高報價\n3. 配件齊全度：原廠盒裝、充電器等配件可增加200-300港幣價值\n\n若您希望獲得更精確估價，可提供更多細節：具體型號、購買時間、使用狀況等。';
        } else if (userMessage.content.toLowerCase().includes('電腦') || userMessage.content.toLowerCase().includes('computer')) {
          responseContent = '關於舊電腦回收，我建議以下步驟：\n\n1. 資料備份與清除：使用專業軟件徹底清除硬碟資料\n2. 評估價值：根據品牌、配置、年份判斷是轉售還是回收\n3. 回收渠道：\n   - 電器店回收計劃（如豐澤）\n   - 環保署電子廢物回收計劃\n   - 專業回收商（如電腦村）\n\n一般來說，3年內的中高階電腦仍有可觀轉售價值，建議在電腦討論區或二手平台出售。5年以上的電腦可考慮零件拆售或直接回收。';
        } else if (userMessage.image) {
          responseContent = '我已收到您上傳的物品照片，初步評估這件物品狀況良好，可考慮以下處理方式：\n\n1. 二手轉售：估計可獲得約 600-800港幣\n2. 回收利用：若不希望轉售，可透過環保組織回收\n3. 專業翻新：經適當修復後價值可提升20-30%\n\n建議您提供物品的購買時間、使用頻率等資訊，以便我給予更精確的評估和建議。';
        } else {
          responseContent = '感謝您的訊息！為了更準確地評估您物品的價值，我需要更多資訊：\n\n1. 物品種類、品牌和型號\n2. 物品狀況和使用年限\n3. 是否有原包裝或配件\n\n您也可以直接上傳物品照片，我將進行AI分析並提供估價。';
        }
        
        setMessages(prev => prev.map((msg, i) => 
          i === prev.length - 1 ? { ...msg, content: responseContent, isLoading: false } : msg
        ));
        setIsLoading(false);
      }, 1500);
    }, 700);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    handleSendMessage({ preventDefault: () => {} });
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // 處理搜索
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchKeyword.trim()) return;
    
    router.push({
      pathname: '/search',
      query: { keyword: searchKeyword },
    });
  };

  // 平台優勢
  const features = [
    {
      title: '多平台整合',
      description: '一站式搜索Carousell、Facebook等多個二手交易平台，無需分別瀏覽各個網站。',
      icon: '🔍'
    },
    {
      title: '價格比較',
      description: '輕鬆比較同類商品在不同平台上的價格差異，找到最划算的選擇。',
      icon: '💰'
    },
    {
      title: '即時結果',
      description: '使用先進爬蟲技術，提供即時更新的商品信息和價格數據。',
      icon: '⚡'
    },
    {
      title: '環保再利用',
      description: '促進二手商品交易，減少資源浪費，支持循環經濟發展。',
      icon: '♻️'
    }
  ];

  // 支持的平台
  const platforms = [
    {
      name: 'Carousell',
      logo: '/carousell-logo.png',
      description: '香港流行的二手交易平台，提供多種類別商品。'
    },
    {
      name: 'Facebook Marketplace',
      logo: '/facebook-logo.png',
      description: 'Facebook旗下二手市集，用戶基數龐大。'
    }
  ];

  // Add state for scraped products
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

  // Add state for product search
  const [productSearchTerm, setProductSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('全部');

  // Filter products based on search term and filter
  const filteredProducts = scrapedProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(productSearchTerm.toLowerCase());
    const matchesFilter = activeFilter === '全部' || 
                          (activeFilter === 'Carousell' && product.platform === 'Carousell') ||
                          (activeFilter === 'Facebook' && product.platform === 'Facebook');
    return matchesSearch && matchesFilter;
  });

  // Add a function to calculate price savings and find best deals
  const calculateSavings = (price, originalPrice) => {
    if (!originalPrice || originalPrice <= price) return null;
    const savingsAmount = originalPrice - price;
    const savingsPercent = Math.round((savingsAmount / originalPrice) * 100);
    return { amount: savingsAmount, percent: savingsPercent };
  };

  // Find the products with the best deals (highest discount percentage)
  const productsWithSavings = scrapedProducts.map(product => {
    const savings = calculateSavings(product.price, product.originalPrice);
    return {
      ...product,
      savings,
      isBestDeal: savings && savings.percent >= 20 // Consider 20% or more as a "best deal"
    };
  });

  // Sort the filtered products by discount percentage (highest first)
  const sortedFilteredProducts = filteredProducts.sort((a, b) => {
    const savingsA = calculateSavings(a.price, a.originalPrice);
    const savingsB = calculateSavings(b.price, b.originalPrice);
    const percentA = savingsA ? savingsA.percent : 0;
    const percentB = savingsB ? savingsB.percent : 0;
    return percentB - percentA;
  });

  // Add state for bidding functionality
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
  
  // State for bidding input
  const [bidAmount, setBidAmount] = useState({});
  
  // State for creating a new bidding
  const [isCreatingBidding, setIsCreatingBidding] = useState(false);
  const [newBidding, setNewBidding] = useState({
    title: '',
    description: '',
    startPrice: '',
    endTime: ''
  });
  
  // Function to handle placing a bid
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
    
    // Clear the bid input
    setBidAmount({ ...bidAmount, [biddingId]: '' });
  };
  
  // Function to handle creating a new bidding
  const handleCreateBidding = () => {
    // Validate inputs
    if (!newBidding.title || !newBidding.startPrice || !newBidding.endTime) return;
    
    // Create new bidding
    const newBiddingObj = {
      id: activeBiddings.length + 1,
      title: newBidding.title,
      description: newBidding.description,
      image: 'https://images.unsplash.com/photo-1607435097405-db48f377bff7?w=500', // placeholder image
      startPrice: Number(newBidding.startPrice),
      currentBid: Number(newBidding.startPrice),
      bidCount: 0,
      endTime: new Date(newBidding.endTime).toISOString(),
      seller: {
        name: '您',
        avatar: 'https://i.pravatar.cc/150?img=20',
        rating: 5.0
      },
      bidders: []
    };
    
    // Add to active biddings
    setActiveBiddings([...activeBiddings, newBiddingObj]);
    
    // Reset form and close modal
    setNewBidding({
      title: '',
      description: '',
      startPrice: '',
      endTime: ''
    });
    setIsCreatingBidding(false);
  };
  
  // Function to format remaining time
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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-50 font-sans">
      <Head>
        <title>SecondPrice.hk - AI 驅動的循環經濟平台</title>
        <meta name="description" content="透過AI技術估算物品價值，快速匹配二手買家或回收商" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      {/* Page container */}
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header - much cleaner, lighter design */}
        <header className="sticky top-0 z-50 bg-white py-3 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-md flex items-center justify-center text-white font-bold text-sm">
              SP
            </div>
            <h1 className="text-gray-900 font-semibold">SecondPrice.hk</h1>
          </div>
          
          <div className="flex gap-3">
            <button className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              登入
            </button>
            <button className="px-3 py-1.5 text-sm font-medium bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors">
              註冊
            </button>
          </div>
        </header>

        {/* Main content with tabs */}
        <main className="py-2">
          {/* Top navigation tabs */}
          <div className="flex border-b border-gray-100 mb-4">
            <button 
              onClick={() => handleTabChange('關注')}
              className={cn(
                "pb-3 px-4 text-sm font-medium relative",
                activeTab === '關注' 
                  ? 'text-gray-900 font-medium' 
                  : 'text-gray-500 hover:text-gray-700'
              )}
            >
              關注
              {activeTab === '關注' && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
                />
              )}
            </button>
            <button 
              onClick={() => handleTabChange('explore')}
              className={cn(
                "pb-3 px-4 text-sm font-medium relative",
                activeTab === 'explore' 
                  ? 'text-gray-900 font-medium' 
                  : 'text-gray-500 hover:text-gray-700'
              )}
            >
              探索
              {activeTab === 'explore' && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
                />
              )}
            </button>
            <button 
              onClick={() => handleTabChange('products')}
              className={cn(
                "pb-3 px-4 text-sm font-medium relative",
                activeTab === 'products' 
                  ? 'text-gray-900 font-medium' 
                  : 'text-gray-500 hover:text-gray-700'
              )}
            >
              二手物品
              {activeTab === 'products' && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
                />
              )}
            </button>
            <button 
              onClick={() => handleTabChange('bidding')}
              className={cn(
                "pb-3 px-4 text-sm font-medium relative",
                activeTab === 'bidding' 
                  ? 'text-gray-900 font-medium' 
                  : 'text-gray-500 hover:text-gray-700'
              )}
            >
              競價平台
              {activeTab === 'bidding' && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
                />
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Left content area - cards */}
            <div className="lg:col-span-3">
              {activeTab === 'bidding' ? (
                <div className="space-y-4">
                  {/* Bidding title and create button */}
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
                  
                  {/* Filter for biddings - simplified to categories */}
                  <div className="flex gap-2 mb-4">
                    {['全部', '電子產品', '時尚服飾', '遊戲娛樂'].map((category) => (
                      <button
                        key={category}
                        onClick={() => setActiveFilter(category)}
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
                  
                  {/* Biddings grid */}
                  <div className="space-y-3">
                    {activeBiddings
                      .filter(bidding => activeFilter === '全部' || true) // Update with actual category filtering
                      .map((bidding) => (
                      <motion.div
                        key={bidding.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          delay: bidding.id * 0.05,
                          duration: 0.3
                        }}
                        className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm"
                      >
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3 aspect-square md:aspect-auto relative">
                            <img 
                              src={bidding.image} 
                              alt={bidding.title} 
                              className="w-full h-full object-cover"
                            />
                            {/* Type indicator for new product */}
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
                                    <img 
                                      src={bidding.seller.avatar} 
                                      alt={bidding.seller.name}
                                      className="w-full h-full object-cover"
                                    />
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
                    <div className="bg-gray-50 rounded-lg p-8 text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mx-auto text-gray-400 mb-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-gray-600">沒有進行中的競價</p>
                    </div>
                  )}
                  
                  {/* Create Bidding Modal */}
                  {isCreatingBidding && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                      <div className="bg-white rounded-xl w-full max-w-md p-6 m-4">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-bold text-gray-900">建立新競價</h3>
                          <button 
                            onClick={() => setIsCreatingBidding(false)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">商品名稱</label>
                            <input
                              type="text"
                              value={newBidding.title}
                              onChange={(e) => setNewBidding({...newBidding, title: e.target.value})}
                              placeholder="例：iPhone 15 Pro Max 256GB 黑色"
                              className="w-full rounded-lg border border-gray-200 px-3 py-2"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">商品描述</label>
                            <textarea
                              value={newBidding.description}
                              onChange={(e) => setNewBidding({...newBidding, description: e.target.value})}
                              placeholder="描述商品的狀態、特點等..."
                              className="w-full rounded-lg border border-gray-200 px-3 py-2 h-24"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">起標價格 (HK$)</label>
                            <input
                              type="number"
                              value={newBidding.startPrice}
                              onChange={(e) => setNewBidding({...newBidding, startPrice: e.target.value})}
                              placeholder="例：1000"
                              className="w-full rounded-lg border border-gray-200 px-3 py-2"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">結束時間</label>
                            <input
                              type="datetime-local"
                              value={newBidding.endTime}
                              onChange={(e) => setNewBidding({...newBidding, endTime: e.target.value})}
                              className="w-full rounded-lg border border-gray-200 px-3 py-2"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">商品類別</label>
                            <select
                              value={newBidding.category}
                              onChange={(e) => setNewBidding({...newBidding, category: e.target.value})}
                              className="w-full rounded-lg border border-gray-200 px-3 py-2"
                            >
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
                          <button
                            onClick={() => setIsCreatingBidding(false)}
                            className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
                          >
                            取消
                          </button>
                          <button
                            onClick={handleCreateBidding}
                            className="px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700"
                          >
                            建立競價
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : activeTab === 'products' ? (
                <div className="space-y-3">
                  {/* Section title and price comparison */}
                  <div className="flex justify-between items-center">
                    <h2 className="font-medium text-gray-900">爬取的二手物品 ({sortedFilteredProducts.length})</h2>
                    <div className="flex items-center text-xs text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 mr-1 text-indigo-600">
                        <path fillRule="evenodd" d="M2.5 3A1.5 1.5 0 001 4.5v4A1.5 1.5 0 002.5 10h6A1.5 1.5 0 0010 8.5v-4A1.5 1.5 0 008.5 3h-6zm11 2A1.5 1.5 0 0012 6.5v7a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5v-7A1.5 1.5 0 0019.5 5h-6z" clipRule="evenodd" />
                      </svg>
                      價格比較已啟用
                    </div>
                  </div>

                  {/* Search and filter for products */}
                  <div className="flex flex-col sm:flex-row gap-2 mb-3">
                    <div className="relative flex-grow">
                      <input
                        type="text"
                        value={productSearchTerm}
                        onChange={(e) => setProductSearchTerm(e.target.value)}
                        placeholder="搜索二手物品..."
                        className="w-full px-4 py-2 rounded-full bg-gray-50 text-gray-900 border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder-gray-500 text-sm"
                      />
                      <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex gap-2">
                      {['全部', 'Carousell', 'Facebook'].map((filter) => (
                        <button
                          key={filter}
                          onClick={() => setActiveFilter(filter)}
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

                  {/* Products grid - modified to have 3 columns on larger screens */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {sortedFilteredProducts.map((product) => {
                      const savings = calculateSavings(product.price, product.originalPrice);
                      return (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          whileHover={{ 
                            y: -4,
                            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)'
                          }}
                          transition={{ 
                            delay: product.id * 0.05,
                            hover: { duration: 0.2 }
                          }}
                          className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm transition-all duration-300"
                        >
                          <a href={product.url} className="block">
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
                                {product.platform === 'Carousell' && Math.random() > 0.7 && (
                                  <div className="ml-2 text-xs text-blue-600 whitespace-nowrap flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 mr-0.5">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>
                                    FB更平
                                  </div>
                                )}
                                {product.platform === 'Facebook' && Math.random() > 0.7 && (
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
                          </a>
                        </motion.div>
                      );
                    })}
                  </div>
                  
                  {filteredProducts.length === 0 && (
                    <div className="bg-gray-50 rounded-lg p-8 text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mx-auto text-gray-400 mb-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                      </svg>
                      <p className="text-gray-600">沒有找到相關的二手物品</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {feedItems.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ 
                        y: -5,
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)'
                      }}
                      transition={{ 
                        delay: item.id * 0.1,
                        hover: { duration: 0.2 }
                      }}
                      className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm transition-all duration-300"
                    >
                      {item.image && (
                        <div className="aspect-[4/3] relative">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-6 h-6 rounded-full overflow-hidden">
                            <img 
                              src={item.author.avatar} 
                              alt={item.author.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-xs font-medium text-gray-900">{item.author.name}</span>
                        </div>
                        <h3 className="text-base font-bold mb-2 text-gray-900 line-clamp-2">{item.title}</h3>
                        <p className="text-gray-700 text-sm line-clamp-2 mb-3">
                          {item.content}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {item.tags.map((tag, idx) => (
                            <span 
                              key={idx} 
                              className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center gap-4">
                            <button className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                                <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
                              </svg>
                              <span>{item.likes}</span>
                            </button>
                            <button className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                                <path fillRule="evenodd" d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902 1.168.188 2.352.327 3.55.414.28.02.521.18.642.413l1.713 3.293a.75.75 0 001.33 0l1.713-3.293a.783.783 0 01.642-.413 41.102 41.102 0 003.55-.414c1.437-.232 2.43-1.49 2.43-2.902V5.426c0-1.413-.993-2.67-2.43-2.902A41.289 41.289 0 0010 2zM6.75 6a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zm0 2.5a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z" clipRule="evenodd" />
                              </svg>
                              <span>{item.comments}</span>
                            </button>
                          </div>
                          <button className="hover:text-indigo-600 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                              <path d="M13 4.5a2.5 2.5 0 11.702 1.737L6.97 9.604a2.518 2.518 0 010 .792l6.733 3.367a2.5 2.5 0 11-.671 1.341l-6.733-3.367a2.5 2.5 0 110-3.475l6.733-3.366A2.52 2.52 0 0113 4.5z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Right sidebar - AI Chat */}
            <div className="lg:col-span-2 sticky top-16 self-start">
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm h-[calc(100vh-120px)]">
                <div className="flex flex-col h-full">
                  {/* Chat Header */}
                  <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-indigo-600">
                          <path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                      </div>
                      <h3 className="font-medium text-sm text-gray-900">SecondPrice AI 助理</h3>
                    </div>
                    <button className="text-gray-500 hover:text-gray-900">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
                      </svg>
                    </button>
                  </div>

                  {/* Messages Area */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={cn('flex', message.role === 'user' ? 'justify-end' : 'justify-start')}
                      >
                        <div className={cn(
                          'max-w-[85%] rounded-2xl px-4 py-2',
                          message.role === 'user' 
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white text-gray-900 border border-gray-200'
                        )}>
                          {message.image && (
                            <div className="mb-2 rounded-lg overflow-hidden">
                              <img src={message.image} alt="Uploaded" className="w-full max-h-48 object-cover" />
                            </div>
                          )}
                          {message.isLoading ? (
                            <div className="flex items-center gap-1.5">
                              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-pulse"></div>
                              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-pulse delay-150"></div>
                              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-pulse delay-300"></div>
                            </div>
                          ) : (
                            <div className="text-sm leading-relaxed whitespace-pre-line">{message.content}</div>
                          )}
                        </div>
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
                            className="px-3 py-1.5 text-xs bg-white hover:bg-gray-50 rounded-full text-gray-700 border border-gray-200 transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Input Area */}
                  <div className="p-3 border-t border-gray-100">
                    {previewUrl && (
                      <div className="relative mb-2 w-16 h-16 rounded overflow-hidden border border-gray-200 group">
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
                          className="w-full px-4 py-2 rounded-full bg-gray-50 text-gray-900 border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder-gray-500 text-sm"
                          disabled={isLoading}
                        />
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          accept="image/*"
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={handleUploadClick}
                          title="上傳圖片"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-600 p-1 rounded-full"
                          disabled={isLoading}
                        >
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
                          'p-2 rounded-full',
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
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-6 border-t border-gray-100 mt-10">
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
        </footer>
      </div>
    </div>
  )
} 