import '../styles/globals.css'
import { useEffect } from 'react'
import Head from 'next/head'

// 獲取基礎路徑
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // 確保在客戶端渲染時加載字體
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@400;500;600;700&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)
  }, [])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={`${basePath}/favicon.ico`} />
        {/* 預加載關鍵字體 */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          as="style"
        />
        {/* 確保樣式正確加載 */}
        <link 
          rel="stylesheet" 
          href={`${basePath}/_next/static/css/app.css`}
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp 