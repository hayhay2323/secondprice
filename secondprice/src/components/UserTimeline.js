import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Marker, Popup } from 'react-map-gl';

// 動態導入地圖組件以避免 SSR 問題
const Map = dynamic(() => import('react-map-gl'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-gray-100 animate-pulse rounded-xl flex items-center justify-center">
      <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    </div>
  )
});

const TimelineItem = ({ item, isActive, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`relative cursor-pointer group ${isActive ? 'z-10' : ''}`}
    onClick={() => onClick(item)}
  >
    <div className={`
      absolute w-4 h-4 rounded-full left-0 top-1/2 -translate-y-1/2 -translate-x-[calc(50%-1px)]
      ${isActive ? 'bg-primary-500 ring-4 ring-primary-100' : 'bg-gray-300 group-hover:bg-primary-400'}
      transition-all duration-300
    `} />
    <div className={`
      ml-6 p-4 rounded-xl border transition-all duration-300
      ${isActive 
        ? 'bg-white shadow-lg border-primary-200 scale-105 -translate-y-1' 
        : 'bg-white/50 border-gray-100 group-hover:bg-white group-hover:border-primary-100'
      }
    `}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">{new Date(item.date).toLocaleDateString('zh-HK')}</p>
          <h4 className="font-medium mt-1">{item.title}</h4>
        </div>
        <span className={`
          px-2 py-1 text-xs rounded-full
          ${item.status === 'sold' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}
        `}>
          {item.status === 'sold' ? '已售出' : '銷售中'}
        </span>
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-lg font-bold text-primary-600">HK${item.price.toLocaleString()}</span>
        {item.originalPrice && (
          <span className="text-sm text-gray-400 line-through">HK${item.originalPrice.toLocaleString()}</span>
        )}
      </div>
      <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span>{item.location}</span>
      </div>
    </div>
  </motion.div>
);

const TimelineStats = ({ items }) => {
  const totalItems = items.length;
  const soldItems = items.filter(item => item.status === 'sold').length;
  const totalValue = items.reduce((sum, item) => sum + item.price, 0);
  
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-4 border border-gray-100"
      >
        <p className="text-sm text-gray-500">總商品數</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{totalItems}</p>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl p-4 border border-gray-100"
      >
        <p className="text-sm text-gray-500">已售出</p>
        <p className="text-2xl font-bold text-green-600 mt-1">{soldItems}</p>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl p-4 border border-gray-100"
      >
        <p className="text-sm text-gray-500">總價值</p>
        <p className="text-2xl font-bold text-primary-600 mt-1">HK${totalValue.toLocaleString()}</p>
      </motion.div>
    </div>
  );
};

const MapMarker = ({ item, isSelected, onClick }) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <Marker
        longitude={item.coordinates[0]}
        latitude={item.coordinates[1]}
        anchor="bottom"
      >
        <motion.div
          initial={{ scale: 0, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          whileHover={{ scale: 1.2 }}
          onClick={() => {
            onClick(item);
            setShowPopup(true);
          }}
          onMouseEnter={() => setShowPopup(true)}
          onMouseLeave={() => setShowPopup(false)}
          className={`
            w-8 h-8 cursor-pointer relative
            ${isSelected ? 'z-20' : 'z-10'}
          `}
        >
          <div className={`
            absolute inset-0 rounded-full 
            ${item.status === 'sold' 
              ? 'bg-green-500' 
              : 'bg-primary-500'
            }
            ${isSelected 
              ? 'animate-ping opacity-50' 
              : ''
            }
          `} />
          <div className={`
            absolute inset-0 rounded-full flex items-center justify-center
            ${item.status === 'sold' 
              ? 'bg-green-500' 
              : 'bg-primary-500'
            }
            shadow-lg
          `}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 text-white" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={item.status === 'sold' 
                  ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  : "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                } 
              />
            </svg>
          </div>
        </motion.div>
      </Marker>

      {showPopup && (
        <Popup
          longitude={item.coordinates[0]}
          latitude={item.coordinates[1]}
          anchor="bottom"
          closeButton={false}
          closeOnClick={false}
          className="z-30"
        >
          <div className="p-2 min-w-[200px]">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium text-sm">{item.title}</h4>
                <p className="text-xs text-gray-500">{item.location}</p>
                <p className="text-sm font-bold text-primary-600 mt-1">
                  HK${item.price.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </Popup>
      )}
    </>
  );
};

export default function UserTimeline({ items }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewState, setViewState] = useState({
    longitude: 114.1694,
    latitude: 22.3193,
    zoom: 11
  });

  // 模擬數據
  const mockItems = [
    {
      id: 1,
      title: 'iPhone 13 Pro Max 256GB',
      price: 4580,
      originalPrice: 5200,
      status: 'sold',
      location: '荃灣',
      coordinates: [114.1118, 22.3708],
      date: '2023-12-01',
      image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5'
    },
    {
      id: 2,
      title: 'MacBook Pro M1 16吋',
      price: 9800,
      originalPrice: 12000,
      status: 'active',
      location: '中環',
      coordinates: [114.1589, 22.2817],
      date: '2023-12-15',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8'
    },
    {
      id: 3,
      title: 'Sony WH-1000XM4',
      price: 1200,
      originalPrice: 2599,
      status: 'sold',
      location: '觀塘',
      coordinates: [114.2269, 22.3089],
      date: '2024-01-05',
      image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">
            我的二手交易編年史
          </h2>
          <p className="mt-2 text-gray-600">
            記錄您在 SecondPrice 上的每一筆交易
          </p>
        </motion.div>

        <TimelineStats items={mockItems} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="order-2 lg:order-1">
            <div className="space-y-6 relative">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200" />
              {mockItems.map((item) => (
                <TimelineItem
                  key={item.id}
                  item={item}
                  isActive={selectedItem?.id === item.id}
                  onClick={setSelectedItem}
                />
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="sticky top-24">
              <Map
                {...viewState}
                onMove={evt => setViewState(evt.viewState)}
                mapStyle="mapbox://styles/mapbox/light-v11"
                mapboxAccessToken="YOUR_MAPBOX_TOKEN"
                className="w-full h-[400px] rounded-xl shadow-lg"
              >
                {mockItems.map((item) => (
                  <MapMarker
                    key={item.id}
                    item={item}
                    isSelected={selectedItem?.id === item.id}
                    onClick={setSelectedItem}
                  />
                ))}
              </Map>

              {selectedItem && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 bg-white rounded-xl p-4 border border-gray-200 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={selectedItem.image}
                        alt={selectedItem.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">{selectedItem.title}</h4>
                      <p className="text-sm text-gray-500 mt-1">{selectedItem.location}</p>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-lg font-bold text-primary-600">
                          HK${selectedItem.price.toLocaleString()}
                        </span>
                        {selectedItem.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            HK${selectedItem.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 