// Gemini AI API 集成
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '只支持POST請求' });
  }

  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: '缺少prompt參數' });
    }

    // 需要在環境變數中設置 GEMINI_API_KEY
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ error: 'API密鑰未設置' });
    }

    // Gemini API請求 - 使用gemini-2.0-flash模型
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      }
    );

    // 解析並返回Gemini API的響應
    const result = response.data.candidates[0].content.parts[0].text;
    return res.status(200).json({ result });
    
  } catch (error) {
    console.error('Gemini API錯誤:', error.response?.data || error.message);
    return res.status(500).json({ 
      error: '調用AI API時出錯',
      details: error.response?.data || error.message
    });
  }
} 