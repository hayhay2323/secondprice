import React from 'react';
import { motion } from 'framer-motion';

// Helper function for conditional class names
const cn = (...classes) => classes.filter(Boolean).join(' ');

export default function ProductList({ 
  products, 
  onCardClick, 
  cardRefs, 
  likedPosts,
  calculateSavings, // Pass the helper function as a prop
  showPlatformComparison // Pass state for comparison display
}) {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
      {products.map((product, index) => { // Use index for staggering delay
        const savings = calculateSavings(product.price, product.originalPrice);
        const isLiked = likedPosts[`product-${product.id}`];
        // Use optional chaining for safety
        const shouldShowComparison = showPlatformComparison?.[`${product.platform}-${product.id}`] ?? false;

        return (
          <motion.div 
            key={product.id} // Use unique product id as key
            ref={el => cardRefs.current[`product-${product.id}`] = el}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }} // Stagger based on index
            className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm transition-all duration-300 product-card cursor-pointer"
            onClick={() => onCardClick(product, 'product')} // Pass type explicitly
          >
            {/* 產品卡片內部結構 */}
            <div className="aspect-[4/3] relative">
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-full object-cover"
                loading="lazy"
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
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2 flex-1" title={product.title}>{product.title}</h3>
                {product.platform === 'Carousell' && shouldShowComparison && (
                  <div className="ml-2 text-xs text-blue-600 whitespace-nowrap flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 mr-0.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                    FB更平
                  </div>
                )}
                {product.platform === 'Facebook' && shouldShowComparison && (
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
      })}
    </div>
  );
} 