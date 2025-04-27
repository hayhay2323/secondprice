import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Helper function for conditional class names
const cn = (...classes) => classes.filter(Boolean).join(' ');

export default function CardDetailModal({ 
  isOpen, 
  onClose, 
  cardData, 
  initialPosition, 
  calculateSavings, // Pass helper from parent
  feedItems, // Needed for related posts
  scrapedProducts // Needed for related products
}) {
  const [likedPosts, setLikedPosts] = useState({}); // Manage likes locally or lift state up if needed elsewhere
  const [commentInputs, setCommentInputs] = useState({});
  const [comments, setComments] = useState({}); // Manage comments locally or lift state up
  const [showComments, setShowComments] = useState({});
  const [isClosing, setIsClosing] = useState(false);

  // Effect to initialize comments when cardData changes
  useEffect(() => {
    if (cardData && !(comments[`${cardData.type}-${cardData.id}`])) {
      setComments(prev => ({ ...prev, [`${cardData.type}-${cardData.id}`]: [] }));
    }
    // Reset closing state when modal opens with new data
    setIsClosing(false);
  }, [cardData, comments]);

  // Effect to handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup function
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true); // Start closing animation
    setTimeout(() => {
      onClose(); // Call parent's close function after animation
    }, 200); // Match exit animation duration
  };

  // ---- Interaction Handlers ----
  const handleLike = (itemId, type) => {
    setLikedPosts(prev => ({
      ...prev,
      [`${type}-${itemId}`]: !prev[`${type}-${itemId}`]
    }));
  };

  const handleCommentInputChange = (itemId, type, value) => {
    setCommentInputs(prev => ({
      ...prev,
      [`${type}-${itemId}`]: value
    }));
  };

  const handleSubmitComment = (itemId, type) => {
    const commentText = commentInputs[`${type}-${itemId}`];
    if (!commentText || commentText.trim() === '') return;
    
    const newComment = {
      id: Date.now(),
      text: commentText,
      author: { name: '我', avatar: 'https://i.pravatar.cc/150?img=33' }, // Demo user
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
    
    setShowComments(prev => ({
      ...prev,
      [`${type}-${itemId}`]: true
    }));
  };

  const toggleComments = (itemId, type) => {
    setShowComments(prev => ({
      ...prev,
      [`${type}-${itemId}`]: !prev[`${type}-${itemId}`]
    }));
  };

  const handleShare = (item) => {
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.content || `查看更多關於 ${item.title} 的內容`,
        url: window.location.href, // Consider using a specific item URL if available
      })
      .catch((error) => console.log('分享失敗:', error));
    } else {
      navigator.clipboard.writeText(window.location.href) // Consider specific item URL
        .then(() => alert('連結已複製到剪貼板'))
        .catch((error) => console.log('複製失敗:', error));
    }
  };

  // --- Related Content Logic (simplified) ---
  const getRelatedFeedItems = () => {
    if (!cardData || cardData.type !== 'feed' || !feedItems) return [];
    return feedItems.filter(item => 
      item.id !== cardData.id && 
      item.tags?.some(tag => cardData.tags?.includes(tag))
    ).slice(0, 2);
  };

  const getRelatedProducts = () => {
    if (!cardData || cardData.type !== 'product' || !scrapedProducts) return [];
    // Basic related logic: match first word if longer than 2 chars
    const titleWords = cardData.title.split(' ');
    const firstSignificantWord = titleWords.find(word => word.length > 2);
    if (!firstSignificantWord) return [];

    return scrapedProducts.filter(item => 
      item.id !== cardData.id && 
      item.title.includes(firstSignificantWord)
    ).slice(0, 2);
  };

  const relatedFeed = getRelatedFeedItems();
  const relatedProducts = getRelatedProducts();

  // Render nothing if not open or no data
  if (!isOpen || !cardData) {
    return null;
  }

  const itemKey = `${cardData.type}-${cardData.id}`;
  const currentComments = comments[itemKey] || [];
  const showCommentSection = showComments[itemKey];
  const isLiked = likedPosts[itemKey];
  const commentInputValue = commentInputs[itemKey] || '';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose} // Use internal handleClose
          />
          
          {/* Modal Container */}
          <motion.div
            initial={{
              position: 'absolute',
              top: initialPosition.top,
              left: initialPosition.left,
              width: initialPosition.width,
              height: initialPosition.height,
              borderRadius: '0.5rem',
              zIndex: 60,
              overflow: 'hidden',
              opacity: 1
            }}
            animate={{
              top: typeof window !== 'undefined' ? window.innerHeight * 0.05 : '5vh',
              left: typeof window !== 'undefined' ? window.innerWidth * 0.1 : '10vw',
              width: typeof window !== 'undefined' ? window.innerWidth * 0.8 : '80vw',
              height: typeof window !== 'undefined' ? window.innerHeight * 0.9 : '90vh',
              borderRadius: '1rem',
              opacity: 1,
              transition: { type: 'spring', damping: 25, stiffness: 300, duration: 0.3 }
            }}
            exit={{
              top: initialPosition.top,
              left: initialPosition.left,
              width: initialPosition.width,
              height: initialPosition.height,
              borderRadius: '0.5rem',
              opacity: 0,
              transition: { duration: 0.2 }
            }}
            className="bg-white overflow-hidden flex flex-col md:flex-row shadow-2xl"
            layout
          >
            {/* Left Side (Image) */}
            <div className="md:w-1/2 h-1/3 md:h-full relative bg-gray-100 flex items-center justify-center">
              <div className="relative w-full h-full md:h-auto md:aspect-[4/3] overflow-hidden flex items-center justify-center">
                {!isClosing && (
                  <img 
                    src={cardData.image} 
                    alt={cardData.title}
                    className="w-full h-full object-contain md:object-cover"
                    loading="eager"
                    decoding="async"
                  />
                )}
                {/* Image controls (optional) */}
              </div>
              <button 
                onClick={handleClose}
                className="absolute top-4 left-4 z-10 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
              >
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
              </button>
              {!isClosing && (
                <button 
                  onClick={() => handleShare(cardData)}
                  className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 0 2.25 2.25 0 00-3.935 0z" />
                   </svg>
                </button>
              )}
            </div>

            {/* Right Side (Content) */}
            <div className="md:w-1/2 h-2/3 md:h-full overflow-y-auto p-4 md:p-6 flex flex-col">
              {!isClosing && (
                <div className="flex flex-col h-full">
                  {/* Content Header */}
                  <div className="flex items-center gap-3 mb-3">
                    {cardData.type === 'feed' && cardData.author && (
                      <>
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                          <img src={cardData.author.avatar} alt={cardData.author.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{cardData.author.name}</h3>
                          <p className="text-xs text-gray-500">發布於 {new Date().toLocaleDateString('zh-HK')}</p> {/* Dynamic date needed */}
                        </div>
                      </>
                    )}
                    {cardData.type === 'product' && (
                       <div className="flex items-center gap-2 text-sm">
                         <div className={`w-3 h-3 rounded-full ${cardData.platform === 'Carousell' ? 'bg-orange-500' : 'bg-blue-500'}`}></div>
                         <span className="font-medium">{cardData.platform}</span>
                         <span className="mx-2 text-gray-300">|</span>
                         <span className="text-gray-600">{cardData.condition}</span>
                       </div>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">{cardData.title}</h2>

                  {/* Content / Price */}
                  {cardData.type === 'feed' && (
                    <>
                      <div className="prose prose-sm mb-4 text-gray-700">
                        <p>{cardData.content}</p>
                      </div>
                      {cardData.tags && cardData.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {cardData.tags.map((tag, idx) => (
                            <span key={idx} className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 cursor-pointer transition-colors">#{tag}</span>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                  {cardData.type === 'product' && (
                    <>
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl font-bold text-indigo-600">HK${cardData.price}</span>
                          {calculateSavings(cardData.price, cardData.originalPrice)?.percent >= 5 && (
                            <span className="px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded-full font-medium">省 {calculateSavings(cardData.price, cardData.originalPrice).percent}%</span>
                          )}
                        </div>
                        {cardData.originalPrice && (
                          <div className="text-sm text-gray-500">原價: <span className="line-through">HK${cardData.originalPrice}</span></div>
                        )}
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1 text-gray-400"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                          {cardData.location}
                        </div>
                        <a href={cardData.url || '#'} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors">
                          查看原始頁面
                        </a>
                      </div>
                    </>
                  )}

                  {/* Interaction Buttons */}
                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                     <div className="flex gap-4">
                       <button 
                         onClick={() => handleLike(cardData.id, cardData.type)}
                         className={`flex items-center gap-1.5 ${isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'} transition-colors`}
                       >
                         {isLiked ? (
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" /></svg>
                         ) : (
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
                         )}
                         <span className="text-sm font-medium">喜歡</span>
                       </button>
                       <button 
                         onClick={() => toggleComments(cardData.id, cardData.type)}
                         className={`flex items-center gap-1.5 ${showCommentSection ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'} transition-colors`}
                       >
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>
                         <span className="text-sm font-medium">評論</span>
                         {currentComments.length > 0 && (
                           <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded-full">{currentComments.length}</span>
                         )}
                       </button>
                     </div>
                     <button 
                       onClick={() => handleShare(cardData)}
                       className="flex items-center gap-1.5 text-gray-500 hover:text-indigo-600 transition-colors"
                     >
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 0 2.25 2.25 0 00-3.935 0z" /></svg>
                       <span className="text-sm font-medium">分享</span>
                     </button>
                  </div>

                  {/* Comments Section */}
                  {showCommentSection && (
                    <div className="mt-4 pt-4 border-t border-gray-100 flex-1 flex flex-col">
                      <h3 className="font-medium text-gray-900 mb-3 flex-shrink-0">評論</h3>
                      <div className="space-y-3 mb-4 flex-1 overflow-y-auto pr-2"> {/* Comments List */}
                        {currentComments.length > 0 ? (
                          currentComments.map((comment) => (
                            <div key={comment.id} className="flex gap-2">
                              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                                <img src={comment.author.avatar} alt={comment.author.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1">
                                <div className="bg-gray-50 rounded-lg p-3">
                                  <div className="flex justify-between items-start">
                                    <p className="text-sm font-medium text-gray-900">{comment.author.name}</p>
                                    <span className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleTimeString('zh-HK', { hour: '2-digit', minute: '2-digit' })}</span>
                                  </div>
                                  <p className="text-sm text-gray-700 mt-1 whitespace-pre-line">{comment.text}</p>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-4 text-gray-500 text-sm">還沒有評論，來發表第一條評論吧</div>
                        )}
                      </div>
                      <div className="flex gap-2 mt-auto flex-shrink-0"> {/* Comment Input */}
                        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                          <img src="https://i.pravatar.cc/150?img=33" alt="我" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 flex">
                          <input 
                            type="text"
                            value={commentInputValue}
                            onChange={(e) => handleCommentInputChange(cardData.id, cardData.type, e.target.value)}
                            placeholder="寫下你的評論..."
                            className="flex-1 bg-gray-100 rounded-l-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 border border-gray-200"
                            onKeyPress={(e) => e.key === 'Enter' && handleSubmitComment(cardData.id, cardData.type)}
                          />
                          <button 
                            onClick={() => handleSubmitComment(cardData.id, cardData.type)}
                            className="bg-indigo-600 hover:bg-indigo-700 rounded-r-full px-4 text-white text-sm font-medium transition-colors"
                            disabled={!commentInputValue.trim()}
                          >
                            發送
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Related Content - Simplified */} 
                  {cardData.type === 'feed' && relatedFeed.length > 0 && (
                     <div className="mt-auto pt-4 border-t border-gray-100 flex-shrink-0">
                       <h3 className="font-medium text-gray-900 mb-3">相關文章</h3>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                         {relatedFeed.map(item => (
                           <div key={item.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => { handleClose(); /* TODO: Add delay for parent to update card */ }}>
                             <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 bg-gray-200"><img src={item.image} alt={item.title} className="w-full h-full object-cover" /></div>
                             <div className="flex-1">
                               <h4 className="font-medium text-sm line-clamp-2 mb-1">{item.title}</h4>
                               <p className="text-xs text-gray-500">{item.author?.name}</p>
                             </div>
                           </div>
                         ))}
                       </div>
                     </div>
                   )}
                   {cardData.type === 'product' && relatedProducts.length > 0 && (
                      <div className="mt-auto pt-4 border-t border-gray-100 flex-shrink-0">
                       <h3 className="font-medium text-gray-900 mb-3">類似商品</h3>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                         {relatedProducts.map(item => (
                           <div key={item.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => { handleClose(); /* TODO: Add delay for parent to update card */ }}>
                             <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 bg-gray-200"><img src={item.image} alt={item.title} className="w-full h-full object-cover" /></div>
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
  );
} 