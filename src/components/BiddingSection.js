import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Helper function for conditional class names
const cn = (...classes) => classes.filter(Boolean).join(' ');

export default function BiddingSection({ initialBiddings }) {
  const [activeBiddings, setActiveBiddings] = useState(initialBiddings || []);
  const [bidAmount, setBidAmount] = useState({});
  const [isCreatingBidding, setIsCreatingBidding] = useState(false);
  const [newBidding, setNewBidding] = useState({
    title: '',
    description: '',
    startPrice: '',
    endTime: '',
    category: ''
  });
  const [activeFilter, setActiveFilter] = useState('全部'); // Keep filter local for now

  // Bidding 函數
  const handlePlaceBid = (biddingId) => {
    if (!bidAmount[biddingId] || isNaN(bidAmount[biddingId])) return;
    const amount = Number(bidAmount[biddingId]);
    setActiveBiddings(prevBiddings => prevBiddings.map(bidding => {
      if (bidding.id === biddingId && amount > bidding.currentBid) {
        // Simulate bid success
        return {
          ...bidding,
          currentBid: amount,
          bidCount: bidding.bidCount + 1,
          // In a real app, you would add the actual bidder info
          // bidders: [...bidding.bidders, { name: '您', amount, time: new Date().toISOString() }]
        };
      }
      return bidding;
    }));
    setBidAmount({ ...bidAmount, [biddingId]: '' });
  };
  
  const handleCreateBidding = () => {
    if (!newBidding.title || !newBidding.startPrice || !newBidding.endTime) return;
    const newBiddingObj = {
      id: activeBiddings.length + 1, // Simple ID generation for demo
      title: newBidding.title,
      description: newBidding.description,
      image: 'https://images.unsplash.com/photo-1607435097405-db48f377bff7?w=500', // Placeholder
      startPrice: Number(newBidding.startPrice),
      currentBid: Number(newBidding.startPrice),
      bidCount: 0,
      endTime: new Date(newBidding.endTime).toISOString(),
      seller: { name: '您', avatar: 'https://i.pravatar.cc/150?img=20', rating: 5.0 }, // Demo seller
      // category: newBidding.category, // Add category if needed
    };
    setActiveBiddings([newBiddingObj, ...activeBiddings]); // Add to the beginning
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

  // TODO: Implement actual category filtering based on bidding object properties if needed
  const filteredBiddings = activeBiddings.filter(bidding => activeFilter === '全部' || true);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">競價平台</h2>
        <button 
          onClick={() => setIsCreatingBidding(true)} 
          className="px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors text-sm font-medium flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          建立競價
        </button>
      </div>

      {/* Filter Buttons - Can be extracted to a separate Filter component later */}
      <div className="flex gap-2 mb-4">
        {['全部', '電子產品', '時尚服飾', '遊戲娛樂'].map((category) => (
          <button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={cn(
              "px-4 py-2 text-sm rounded-full transition-colors",
              activeFilter === category
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Bidding List */}
      <div className="space-y-3">
        {filteredBiddings.map((bidding, index) => (
          <motion.div
            key={bidding.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm"
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 aspect-square md:aspect-auto relative bg-gray-100">
                <img 
                  src={bidding.image} 
                  alt={bidding.title} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute top-2 left-2 bg-green-500 rounded-full px-2 py-1 text-xs font-medium text-white shadow-sm">
                  全新
                </div>
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between mb-2">
                  <h3 className="font-bold text-gray-900 text-lg">{bidding.title}</h3>
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
                      <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-200">
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
                  <form onSubmit={(e) => { e.preventDefault(); handlePlaceBid(bidding.id); }} className="flex gap-2">
                    <input
                      type="number"
                      value={bidAmount[bidding.id] || ''}
                      onChange={(e) => setBidAmount({...bidAmount, [bidding.id]: e.target.value})}
                      placeholder={`HK$${bidding.currentBid + 100}或更高`}
                      className="flex-grow rounded-lg border border-gray-200 px-3 py-2 text-sm"
                      min={bidding.currentBid + 1}
                    />
                    <button
                      type="submit"
                      disabled={!bidAmount[bidding.id] || Number(bidAmount[bidding.id]) <= bidding.currentBid}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium",
                        (!bidAmount[bidding.id] || Number(bidAmount[bidding.id]) <= bidding.currentBid)
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-indigo-600 text-white hover:bg-indigo-700"
                      )}
                    >
                      出價
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredBiddings.length === 0 && (
        <div className="bg-gray-100 rounded-lg p-8 text-center text-gray-500">
          沒有進行中的競價
        </div>
      )}

      {/* Create Bidding Modal */}
      {isCreatingBidding && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl w-full max-w-md p-6 m-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-900">建立新競價</h3>
              <button onClick={() => setIsCreatingBidding(false)} className="text-gray-400 hover:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleCreateBidding(); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">商品名稱</label>
                <input 
                  type="text" 
                  value={newBidding.title} 
                  onChange={(e) => setNewBidding({...newBidding, title: e.target.value})} 
                  placeholder="例：iPhone 15 Pro Max 256GB 黑色" 
                  className="w-full rounded-lg border border-gray-200 px-3 py-2"
                  required
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
                  required
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">結束時間</label>
                <input 
                  type="datetime-local" 
                  value={newBidding.endTime} 
                  onChange={(e) => setNewBidding({...newBidding, endTime: e.target.value})} 
                  className="w-full rounded-lg border border-gray-200 px-3 py-2"
                  required
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
              <div className="mt-6 flex justify-end gap-2">
                <button type="button" onClick={() => setIsCreatingBidding(false)} className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200">取消</button>
                <button type="submit" className="px-4 py-2 rounded-full text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700">建立競價</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
} 