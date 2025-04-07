import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const ChatInterface = ({ initialMessage = "你好！上傳物品照片或描述你想處理的物品，我將幫你評估價值並找到最理想方式。", suggestions = [] }) => {
  // State管理
  const [messages, setMessages] = useState([
    { role: 'assistant', content: initialMessage }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  
  // 消息自動滾動到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 處理文件上傳點擊
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // 處理文件選擇
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setUploadedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  // 清除上傳的圖片
  const handleClearImage = () => {
    setUploadedImage(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  // 處理發送消息
  const handleSendMessage = async (e) => {
    e?.preventDefault();
    
    if ((!inputValue.trim() && !uploadedImage) || isLoading) return;
    
    // 添加用戶消息到聊天
    const userMessage = {
      role: 'user',
      content: inputValue,
      image: previewUrl
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // 清除圖片預覽
    if (previewUrl) {
      setUploadedImage(null);
      setPreviewUrl(null);
      if (fileInputRef.current) fileInputRef.current.value = null;
    }

    // 模擬AI響應 (將來會替換為真正的API調用)
    setTimeout(() => {
      const assistantMessage = { role: 'assistant', content: '', isLoading: true };
      setMessages(prev => [...prev, assistantMessage]);
      
      // 根據輸入確定響應
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

  // 處理建議點擊
  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    // 允許用戶修改建議後再發送，而不是立即發送
  };
  
  // 處理消息內容格式化，支持換行
  const formatMessageContent = (content) => {
    if (!content) return '';
    return content.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line}
        {i < content.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };
  
  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg overflow-hidden border border-gray-200">
      {/* 聊天標題 */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-14v2h2V6h-2zm0 4v8h2v-8h-2z" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="font-bold text-gray-800">SecondPrice AI 助手</h3>
            <p className="text-xs text-gray-500">隨時回覆、專業估價</p>
          </div>
        </div>
        <div className="flex items-center">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-xs font-medium text-gray-600 ml-2">在線</span>
        </div>
      </div>
      
      {/* 聊天消息容器 */}
      <div 
        ref={chatContainerRef} 
        className="flex-1 overflow-y-auto p-4 space-y-4"
        style={{ scrollBehavior: 'smooth' }}
      >
        <AnimatePresence initial={false}>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-2xl p-4 ${
                  message.role === 'user' 
                    ? 'bg-primary-500 text-white rounded-tr-none' 
                    : 'bg-white border border-gray-200 shadow-sm rounded-tl-none'
                }`}
              >
                {/* 圖片預覽（如果有） */}
                {message.image && (
                  <div className="mb-2 rounded-lg overflow-hidden">
                    <img 
                      src={message.image} 
                      alt="Uploaded" 
                      className="max-w-full h-auto object-cover"
                      style={{ maxHeight: '200px' }}
                    />
                  </div>
                )}
                
                {/* 消息內容 */}
                <div className={`text-sm ${message.role === 'user' ? 'text-white' : 'text-gray-800'}`}>
                  {message.isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '600ms' }}></div>
                    </div>
                  ) : (
                    formatMessageContent(message.content)
                  )}
                </div>
                
                {/* 時間戳記 */}
                <div className={`text-xs mt-1 text-right ${message.role === 'user' ? 'text-primary-100' : 'text-gray-400'}`}>
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
      
      {/* 建議選項 */}
      {suggestions.length > 0 && (
        <div className="p-3 bg-gray-50 border-t border-gray-200 overflow-x-auto whitespace-nowrap">
          <div className="flex space-x-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 border border-gray-200 hover:bg-gray-100 transition-colors whitespace-nowrap flex-shrink-0"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* 訊息輸入區 */}
      <div className="p-4 bg-white border-t border-gray-200">
        {/* 圖片預覽 */}
        {previewUrl && (
          <div className="mb-3 relative">
            <div className="relative inline-block rounded-lg overflow-hidden border border-gray-200">
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="max-h-20 w-auto object-cover"
              />
              <button
                onClick={handleClearImage}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}
        
        {/* 輸入表單 */}
        <form onSubmit={handleSendMessage} className="flex items-end space-x-2">
          <button
            type="button"
            onClick={handleUploadClick}
            className="p-2 rounded-full text-gray-500 hover:text-primary-500 hover:bg-primary-50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="relative flex-1">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="輸入您的問題或上傳照片..."
              className="w-full border border-gray-300 rounded-full py-3 px-4 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || (!inputValue.trim() && !uploadedImage)}
            className={`p-3 rounded-full ${
              isLoading || (!inputValue.trim() && !uploadedImage)
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-primary-500 text-white hover:bg-primary-600'
            } transition-colors`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface; 