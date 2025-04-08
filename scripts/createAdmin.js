const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

// 連接到數據庫
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// 創建用戶模型
const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  isAdmin: Boolean,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', UserSchema);

async function createAdmin() {
  try {
    // 檢查是否已存在
    const existingAdmin = await User.findOne({ email: 'admin@secondprice.hk' });
    
    if (existingAdmin) {
      console.log('管理員帳號已存在');
      mongoose.disconnect();
      return;
    }
    
    // 創建密碼哈希
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    
    // 創建管理員
    const admin = new User({
      username: 'admin',
      email: 'admin@secondprice.hk',
      password: hashedPassword,
      isAdmin: true
    });
    
    await admin.save();
    console.log('管理員帳號創建成功');
    
    mongoose.disconnect();
  } catch (error) {
    console.error('創建管理員時出錯:', error);
    mongoose.disconnect();
  }
}

createAdmin(); 