import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

// Helper function for conditional class names
const cn = (...classes) => classes.filter(Boolean).join(' ');

export default function ChatInterface() {
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
    
    // 使用模擬回覆 (保持模擬邏輯)
    setTimeout(() => {
      let responseContent = '感謝您的訊息！目前為演示模式，稍後將連接真實AI。請提供更多細節，或嘗試我們的推薦問題。';
      setMessages(prev => prev.map((msg, i) => 
        i === prev.length - 1 ? { ...msg, content: responseContent, isLoading: false } : msg
      ));
      setIsLoading(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    // Simulate sending message
    handleSendMessage({ preventDefault: () => {} }); 
  };

  // Auto scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm h-[calc(100vh-230px)] flex flex-col">
      {/* Chat Header */}
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
              onClick={() => { setPreviewUrl(null); setUploadedImage(null); if (fileInputRef.current) fileInputRef.current.value = null; }}
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
  );
} 