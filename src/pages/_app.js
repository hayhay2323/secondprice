import '../styles/globals.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    // 確保只在客戶端執行
    if (typeof window === 'undefined') return;

    // 正確的方式直接在需要使用的地方導入
    const initPageAnimation = async () => {
      try {
        // 引入動畫庫，處理 animejs 導出格式
        const animeModule = await import('animejs');
        // 檢查不同的可能的導出格式
        let anime = animeModule.default || animeModule;
        
        // 如果 anime 仍然不是函數，嘗試檢查其他屬性
        if (typeof anime !== 'function' && anime.hasOwnProperty('default')) {
          anime = anime.default;
        }
        
        // 進入頁面時的初始動畫
        anime({
          targets: '#page-content',
          opacity: [0, 1],
          translateY: [10, 0],
          duration: 300,
          easing: 'easeOutQuad'
        });
      } catch (err) {
        console.error('Error loading anime.js:', err);
      }
    };

    initPageAnimation();

    const handleRouteChangeStart = async () => {
      try {
        // 引入動畫庫，處理 animejs 導出格式
        const animeModule = await import('animejs');
        // 檢查不同的可能的導出格式
        let anime = animeModule.default || animeModule;
        
        // 如果 anime 仍然不是函數，嘗試檢查其他屬性
        if (typeof anime !== 'function' && anime.hasOwnProperty('default')) {
          anime = anime.default;
        }
        
        anime({
          targets: '#page-content',
          opacity: 0,
          translateY: -10,
          duration: 200,
          easing: 'easeInQuad'
        });
      } catch (err) {
        console.error('Error loading anime.js:', err);
      }
    };
    
    const handleRouteChangeComplete = async () => {
      try {
        // 引入動畫庫，處理 animejs 導出格式
        const animeModule = await import('animejs');
        // 檢查不同的可能的導出格式
        let anime = animeModule.default || animeModule;
        
        // 如果 anime 仍然不是函數，嘗試檢查其他屬性
        if (typeof anime !== 'function' && anime.hasOwnProperty('default')) {
          anime = anime.default;
        }
        
        anime({
          targets: '#page-content',
          opacity: [0, 1],
          translateY: [10, 0],
          duration: 300,
          easing: 'easeOutQuad'
        });
      } catch (err) {
        console.error('Error loading anime.js:', err);
      }
    };
    
    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router]);

  return (
    <div id="page-content">
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp 