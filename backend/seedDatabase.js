const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

// Kết nối MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/election_db')
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// Dữ liệu mẫu
const sampleUsers = [
    {
        username: 'admin',
        password: 'admin123',
        fullName: 'Quản trị viên',
        studentId: 'ADMIN001',
        walletAddress: '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
        role: 'admin'
    },
    {
        username: 'student1',
        password: '123456',
        fullName: 'Nguyễn Văn A',
        studentId: 'SV001',
        walletAddress: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
        role: 'student'
    },
    {
        username: 'student2',
        password: '123456',
        fullName: 'Nguyễn Văn B',
        studentId: 'SV002',
        walletAddress: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
        role: 'student'
    }
];

// Seed database
async function seedDatabase() {
    try {
        // Xóa dữ liệu cũ
        await User.deleteMany({});
        console.log('🗑️  Cleared old data');

        // Thêm users mới
        await User.create(sampleUsers);
        console.log('✅ Sample users created successfully!');
        
        console.log('\n📋 Created accounts:');
        sampleUsers.forEach(user => {
            console.log(`   - ${user.username} (${user.role})`);
        });
        
        console.log('\n🎉 Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
