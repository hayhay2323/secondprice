import { useState } from 'react';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import UserTimeline from '../../components/UserTimeline';

export default function Timeline() {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>我的交易編年史 - SecondPrice</title>
        <meta name="description" content="查看您在 SecondPrice 上的所有二手交易記錄" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <UserTimeline />
      </main>

      <Footer />
    </div>
  );
} 