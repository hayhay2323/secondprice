import '../styles/globals.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>SecondPrice.hk - 香港二手商品比價平台</title>
        <meta name="description" content="SecondPrice.hk 匯集香港各大二手平台商品，智能比價，讓您輕鬆找到最划算的二手寶貝，同時響應可持續發展。" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp 