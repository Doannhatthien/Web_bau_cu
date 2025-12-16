const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://BauCuWeb:wpgjFkXMN1Z5EFpZ@cluster0.viv3ng4.mongodb.net/BauCuDB?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✓ Đã kết nối MongoDB Atlas');
  } catch (error) {
    console.error('Lỗi kết nối MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
