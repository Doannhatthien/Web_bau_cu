require('dotenv').config();
const mongoose = require('mongoose');

async function fixDatabase() {
  try {
    // Kết nối MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected');

    // Drop collection để xóa index cũ
    try {
      await mongoose.connection.db.collection('users').drop();
      console.log('🗑️  Dropped users collection');
    } catch (err) {
      console.log('ℹ️  Collection not found, creating new');
    }

    console.log('✅ Database fixed! Now run: node seedDatabase.js');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

fixDatabase();
