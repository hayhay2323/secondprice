import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

export default function GeminiChat() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const responseRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const animateContainer = async () => {
        try {
          const animeModule = await import('animejs');
          // 檢查不同的可能的導出格式
          let anime = animeModule.default || animeModule;
          
          // 如果 anime 仍然不是函數，嘗試檢查其他屬性
          if (typeof anime !== 'function' && anime.hasOwnProperty('default')) {
            anime = anime.default;
          }
          
          anime({
            targets: '.chat-container',
            translateY: [20, 0],
            opacity: [0, 1],
            duration: 600,
            easing: 'easeOutQuad'
          });
        } catch (err) {
          console.error('Error loading anime.js:', err);
        }
      };
      
      animateContainer();
    }
  }, []);

  useEffect(() => {
    if (response && responseRef.current) {
      if (typeof window !== 'undefined') {
        const animateResponse = async () => {
          try {
            const animeModule = await import('animejs');
            // 檢查不同的可能的導出格式
            let anime = animeModule.default || animeModule;
            
            // 如果 anime 仍然不是函數，嘗試檢查其他屬性
            if (typeof anime !== 'function' && anime.hasOwnProperty('default')) {
              anime = anime.default;
            }
            
            anime({
              targets: '.response-container',
              translateY: [10, 0],
              opacity: [0, 1],
              duration: 500,
              easing: 'easeOutQuad'
            });
          } catch (err) {
            console.error('Error loading anime.js:', err);
          }
        };
        
        animateResponse();
      }
    }
  }, [response]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!prompt.trim()) return;
    
    if (typeof window !== 'undefined') {
      try {
        const animeModule = await import('animejs');
        // 檢查不同的可能的導出格式
        let anime = animeModule.default || animeModule;
        
        // 如果 anime 仍然不是函數，嘗試檢查其他屬性
        if (typeof anime !== 'function' && anime.hasOwnProperty('default')) {
          anime = anime.default;
        }
        
        anime({
          targets: '.submit-button',
          scale: [1, 0.95, 1],
          duration: 300,
          easing: 'easeInOutQuad'
        });
      } catch (err) {
        console.error('Error loading anime.js:', err);
      }
    }
    
    setLoading(true);
    setError('');
    
    try {
      const res = await axios.post('/api/gemini', { prompt });
      setResponse(res.data.result);
    } catch (err) {
      console.error('API請求失敗:', err);
      setError(err.response?.data?.error || '請求失敗，請稍後再試');
      
      if (typeof window !== 'undefined' && !error) {
        try {
          const animeModule = await import('animejs');
          // 檢查不同的可能的導出格式
          let anime = animeModule.default || animeModule;
          
          // 如果 anime 仍然不是函數，嘗試檢查其他屬性
          if (typeof anime !== 'function' && anime.hasOwnProperty('default')) {
            anime = anime.default;
          }
          
          anime({
            targets: '.error-message',
            translateY: [10, 0],
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuad'
          });
        } catch (err) {
          console.error('Error loading anime.js:', err);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 chat-container">
      <h2 className="text-2xl font-bold mb-4">Gemini AI 智能助手</h2>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <textarea
            className="w-full p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="4"
            placeholder="請輸入您的問題..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        
        <button
          type="submit"
          disabled={loading || !prompt.trim()}
          className={`px-4 py-2 rounded font-medium text-white submit-button ${
            loading || !prompt.trim() 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? '處理中...' : '發送'}
        </button>
      </form>

      {error && (
        <div className="p-3 mb-4 bg-red-100 border border-red-300 text-red-700 rounded error-message">
          {error}
        </div>
      )}

      {response && (
        <div ref={responseRef} className="p-4 bg-gray-50 border border-gray-200 rounded response-container">
          <h3 className="text-lg font-semibold mb-2">AI回覆:</h3>
          <div className="whitespace-pre-wrap">{response}</div>
        </div>
      )}
    </div>
  );
} 