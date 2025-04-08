import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // 驗證密碼
    if (password !== confirmPassword) {
      return setError('密碼不匹配');
    }
    
    if (password.length < 6) {
      return setError('密碼必須至少包含6個字符');
    }
    
    setIsLoading(true);

    try {
      // 模擬註冊請求
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 創建用戶數據
      const userData = {
        id: Date.now().toString(),
        name,
        email,
        avatar: '',
      };
      
      // 登入新用戶
      login(userData);
      
      // 重定向到首頁
      router.push('/');
    } catch (err) {
      setError('註冊時發生錯誤，請稍後再試');
      console.error('Signup error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // 輸入欄位變體動畫
  const inputVariants = {
    focus: { scale: 1.02, boxShadow: '0 0 8px rgba(0, 175, 167, 0.3)' },
    blur: { scale: 1, boxShadow: '0 0 0px rgba(0, 0, 0, 0)' }
  };

  // 頁面元素淡入動畫
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  // 單個元素動畫
  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center bg-gray-50">
      <motion.div 
        initial="initial"
        animate="animate"
        variants={pageVariants}
        className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 space-y-8"
      >
        <motion.div variants={itemVariants} className="text-center">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">
            創建帳戶
          </h1>
          <p className="mt-2 text-gray-600">加入我們成為會員，獲取更多優惠</p>
        </motion.div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="p-4 bg-red-50 text-red-600 rounded-lg text-sm"
          >
            {error}
          </motion.div>
        )}

        <motion.form variants={itemVariants} onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              姓名
            </label>
            <motion.input
              whileFocus="focus"
              whileTap="focus"
              variants={inputVariants}
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="輸入您的姓名"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-primary-500"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              電子郵件
            </label>
            <motion.input
              whileFocus="focus"
              whileTap="focus"
              variants={inputVariants}
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="輸入您的電子郵件"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-primary-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              密碼
            </label>
            <motion.input
              whileFocus="focus"
              whileTap="focus"
              variants={inputVariants}
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="輸入您的密碼"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-primary-500"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
              確認密碼
            </label>
            <motion.input
              whileFocus="focus"
              whileTap="focus"
              variants={inputVariants}
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="再次輸入您的密碼"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-primary-500"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              required
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              我同意
              <a href="#" className="text-primary-600 hover:underline ml-1">服務條款</a>
              和
              <a href="#" className="text-primary-600 hover:underline ml-1">隱私政策</a>
            </label>
          </div>

          <motion.button
            whileHover={{ y: -2, boxShadow: '0 4px 8px rgba(0, 175, 167, 0.25)' }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-6 rounded-xl font-medium text-white transition-all duration-300 
            ${isLoading 
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600'
            }`}
          >
            {isLoading ? '註冊中...' : '註冊'}
          </motion.button>
        </motion.form>

        <motion.div variants={itemVariants} className="text-center mt-6">
          <p className="text-sm text-gray-600">
            已經有帳戶？{' '}
            <Link href="/login" className="font-medium text-primary-600 hover:text-primary-500">
              立即登入
            </Link>
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">或使用其他方式註冊</span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
          <motion.button
            whileHover={{ y: -2, boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)' }}
            whileTap={{ scale: 0.98 }}
            type="button"
            className="w-full py-2.5 px-4 border border-gray-300 rounded-xl font-medium text-gray-700 bg-white hover:bg-gray-50 flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.68 17.57V20.29H19.18C21.16 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4" />
              <path d="M12 23C14.97 23 17.46 22.07 19.18 20.29L15.68 17.57C14.77 18.19 13.53 18.57 12 18.57C9.16 18.57 6.8 16.68 5.93 14.09H2.32V16.89C4.03 20.47 7.72 23 12 23Z" fill="#34A853" />
              <path d="M5.93 14.09C5.7 13.47 5.57 12.8 5.57 12C5.57 11.2 5.7 10.53 5.93 9.91V7.11H2.32C1.61 8.58 1.17 10.23 1.17 12C1.17 13.77 1.61 15.42 2.32 16.89L5.93 14.09Z" fill="#FBBC05" />
              <path d="M12 5.43C13.62 5.43 15.06 5.99 16.21 7.09L19.36 3.94C17.46 2.19 14.97 1 12 1C7.72 1 4.03 3.53 2.32 7.11L5.93 9.91C6.8 7.32 9.16 5.43 12 5.43Z" fill="#EA4335" />
            </svg>
            Google
          </motion.button>
          
          <motion.button
            whileHover={{ y: -2, boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)' }}
            whileTap={{ scale: 0.98 }}
            type="button"
            className="w-full py-2.5 px-4 border border-gray-300 rounded-xl font-medium text-gray-700 bg-white hover:bg-gray-50 flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.6 5.82C15.2 5.82 14 6.5 13.26 7.58H10.74C10 6.5 8.8 5.82 7.4 5.82C4.94 5.82 3 7.76 3 10.22C3 12.68 4.94 14.62 7.4 14.62C8.8 14.62 10 13.94 10.74 12.86H13.26C14 13.94 15.2 14.62 16.6 14.62C19.06 14.62 21 12.68 21 10.22C21 7.76 19.06 5.82 16.6 5.82Z" fill="#4267B2" />
              <path d="M12 15C8.13 15 5 18.13 5 22H19C19 18.13 15.87 15 12 15Z" fill="#4267B2" />
            </svg>
            Facebook
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
} 