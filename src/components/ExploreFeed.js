import React from 'react';
import { motion } from 'framer-motion';

// Helper function for conditional class names
const cn = (...classes) => classes.filter(Boolean).join(' ');

// ExploreFeed component to render the feed cards grid
export default function ExploreFeed({ 
  items, 
  onCardClick, 
  cardRefs, 
  likedPosts,
  comments,
  likeCounts,
  commentCounts,
  viewCounts
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item, index) => {
        const isHigherCard = index % 3 === 0 || index % 5 === 0;
        const isLiked = likedPosts[`feed-${item.id}`];
        // Use optional chaining and nullish coalescing for safety
        const commentCount = comments?.[`feed-${item.id}`]?.length ?? commentCounts?.[`feed-${item.id}`] ?? 0;
        const likeCount = likeCounts?.[`feed-${item.id}`] ?? 0;
        const viewCount = viewCounts?.[`feed-${item.id}`] ?? 0;

        return (
          <motion.div
            key={item.id} // Use item.id which should be unique
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
            onClick={() => onCardClick(item, 'feed')} // Pass type explicitly
          >
            {/* 圖片部分 */}
            <div className="aspect-[4/3] bg-gray-100 relative">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover"
                loading="lazy" // Add lazy loading
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
                <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-200"> {/* Added fallback bg */}
                  <img 
                    src={item.author?.avatar} 
                    alt={item.author?.name || 'Author'}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <span className="text-xs text-gray-600">{item.author?.name || '匿名作者'}</span>
              </div>
              <h3 className="font-medium text-sm mb-1 line-clamp-2" title={item.title}>{item.title}</h3>
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
                    {likeCount}
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 mr-1 text-gray-400">
                      <path fillRule="evenodd" d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902 1.168.188 2.352.327 3.55.414.28.02.521.18.642.413l1.713 3.293a.75.75 0 001.33 0l1.713-3.293a.783.783 0 01.642-.413 41.102 41.102 0 003.55-.414c1.437-.231 2.43-1.49 2.43-2.902V5.426c0-1.413-.993-2.67-2.43-2.902A41.289 41.289 0 0010 2zM6.75 6a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zm0 2.5a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z" clipRule="evenodd" />
                    </svg>
                    {commentCount}
                  </div>
                </div>
                <span>{viewCount} 瀏覽</span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
} 