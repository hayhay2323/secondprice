import '../styles/globals.css'
import { useEffect } from 'react'
import Head from 'next/head'

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
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          as="style"
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp 