import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Helper function for conditional class names
const cn = (...classes) => classes.filter(Boolean).join(' ');

export default function AuthModal({ showModal, setShowModal, setIsLoggedIn, setActiveTab }) {
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
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Check credentials (remove this in production)
      if (loginForm.email && loginForm.password) {
        setIsLoggedIn(true);
        setActiveTab('explore'); // Or navigate to dashboard
        setShowModal(false);
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
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Auto login after registration
      setLoginForm({ email: registerForm.email, password: registerForm.password });
      setAuthMode('login');
      setAuthError('註冊成功！請使用您的新賬戶登入。'); // Provide feedback
      
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
    // Reset forms when toggling
    setLoginForm({ email: '', password: '' });
    setRegisterForm({ username: '', email: '', password: '', confirmPassword: '' });
  };

  const handleInputChange = (e, formType) => {
    const { name, value } = e.target;
    if (formType === 'login') {
      setLoginForm(prev => ({ ...prev, [name]: value }));
    } else {
      setRegisterForm(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
          onClick={() => setShowModal(false)} // Close on backdrop click
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md relative dark:bg-gray-800"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <button 
              onClick={() => setShowModal(false)} 
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
              {authMode === 'login' ? '登入您的帳戶' : '創建新帳戶'}
            </h2>

            {authError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <span className="block sm:inline">{authError}</span>
              </div>
            )}

            {authMode === 'login' ? (
              <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="login-email">
                    電郵地址
                  </label>
                  <input 
                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 dark:text-gray-200 dark:bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    id="login-email" 
                    type="email" 
                    name="email"
                    placeholder="you@example.com" 
                    value={loginForm.email}
                    onChange={(e) => handleInputChange(e, 'login')}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="login-password">
                    密碼
                  </label>
                  <input 
                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 dark:text-gray-200 dark:bg-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    id="login-password" 
                    type="password" 
                    name="password"
                    placeholder="******************" 
                    value={loginForm.password}
                    onChange={(e) => handleInputChange(e, 'login')}
                    required
                  />
                  {/* Optional: Forgot password link */}
                </div>
                <div className="flex items-center justify-between">
                  <button 
                    className={cn(
                      "bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-full focus:outline-none focus:shadow-outline transition-colors duration-200 w-full disabled:opacity-50 text-sm",
                      authLoading && "cursor-not-allowed"
                    )}
                    type="submit" 
                    disabled={authLoading}
                  >
                    {authLoading ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        處理中...
                      </div>
                    ) : '登入'}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
                 <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="register-username">
                    用戶名稱
                  </label>
                  <input 
                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 dark:text-gray-200 dark:bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    id="register-username" 
                    type="text" 
                    name="username"
                    placeholder="選擇一個用戶名" 
                    value={registerForm.username}
                    onChange={(e) => handleInputChange(e, 'register')}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="register-email">
                    電郵地址
                  </label>
                  <input 
                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 dark:text-gray-200 dark:bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    id="register-email" 
                    type="email" 
                    name="email"
                    placeholder="you@example.com" 
                    value={registerForm.email}
                    onChange={(e) => handleInputChange(e, 'register')}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="register-password">
                    密碼
                  </label>
                  <input 
                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 dark:text-gray-200 dark:bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    id="register-password" 
                    type="password" 
                    name="password"
                    placeholder="請輸入密碼" 
                    value={registerForm.password}
                    onChange={(e) => handleInputChange(e, 'register')}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="register-confirm-password">
                    確認密碼
                  </label>
                  <input 
                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 dark:text-gray-200 dark:bg-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    id="register-confirm-password" 
                    type="password" 
                    name="confirmPassword"
                    placeholder="再次輸入密碼" 
                    value={registerForm.confirmPassword}
                    onChange={(e) => handleInputChange(e, 'register')}
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button 
                     className={cn(
                      "bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-full focus:outline-none focus:shadow-outline transition-colors duration-200 w-full disabled:opacity-50 text-sm",
                      authLoading && "cursor-not-allowed"
                    )}
                    type="submit" 
                    disabled={authLoading}
                  >
                     {authLoading ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        處理中...
                      </div>
                    ) : '註冊'}
                  </button>
                </div>
              </form>
            )}

            <div className="text-center mt-6">
              <button 
                onClick={toggleAuthMode}
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                {authMode === 'login' ? '沒有帳戶？註冊一個' : '已有帳戶？登入'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 