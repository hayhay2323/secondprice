require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const scraperRoutes = require('./routes/scrapers');

const app = express();
const PORT = process.env.PORT || 5000;

// 中間件
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// 路由
app.use('/api/scrapers', scraperRoutes);

// 首頁路由
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to SecondPrice API',
    version: '1.0.0',
    endpoints: {
      scrapers: {
        search: '/api/scrapers/search?keyword=<keyword>&platform=<platform>&limit=<limit>',
        product: '/api/scrapers/product?platform=<platform>&url=<url>'
      }
    }
  });
});

// 錯誤處理中間件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

// 啟動服務器
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 