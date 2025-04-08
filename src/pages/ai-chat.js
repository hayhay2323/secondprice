import React from 'react';
import Head from 'next/head';
import GeminiChat from '../components/GeminiChat';

export default function AiChatPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>AI 智能助手 - SecondPrice</title>
        <meta name="description" content="使用Gemini AI智能助手提供幫助" />
      </Head>

      <main className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">AI 智能助手</h1>
        <p className="text-center text-gray-600 mb-8">
          使用我們的AI智能助手獲取更多關於二手商品的信息和建議
        </p>
        
        <GeminiChat />
      </main>
    </div>
  );
} 