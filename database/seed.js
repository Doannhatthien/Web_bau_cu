const connectDB = require('./config');
const Candidate = require('./models/Candidate');
const User = require('./models/User');
const Vote = require('./models/Vote');

async function seedDatabase() {
  await connectDB();

  try {
    // Xóa dữ liệu cũ
    await Candidate.deleteMany({});
    await User.deleteMany({});
    await Vote.deleteMany({});
    console.log('✓ Đã xóa dữ liệu cũ');

    // Thêm ứng viên
    const candidates = await Candidate.insertMany([
      {
        name: 'Nguyễn Văn A',
        studentId: 'UV001',
        position: 'Lớp trưởng',
        description: 'Nhiệt tình, có kinh nghiệm tổ chức',
        votes: 0
      },
      {
        name: 'Trần Thị B',
        studentId: 'UV002',
        position: 'Lớp phó',
        description: 'Năng động, sáng tạo',
        votes: 0
      },
      {
        name: 'Lê Văn C',
        studentId: 'UV003',
        position: 'Bí thư',
        description: 'Trách nhiệm cao, tận tâm',
        votes: 0
      },
      {
        name: 'Phạm Thị D',
        studentId: 'UV004',
        position: 'Thủ quỹ',
        description: 'Cẩn thận, chu đáo',
        votes: 0
      }
    ]);
    console.log(`✓ Đã tạo ${candidates.length} ứng viên`);

    // Thêm sinh viên
    const users = await User.insertMany([
      { studentId: 'SV001', name: 'Nguyễn Văn An', email: 'an@student.com', class: '12A1', hasVoted: false },
      { studentId: 'SV002', name: 'Trần Thị Bình', email: 'binh@student.com', class: '12A1', hasVoted: false },
      { studentId: 'SV003', name: 'Lê Văn Cường', email: 'cuong@student.com', class: '12A1', hasVoted: false },
      { studentId: 'SV004', name: 'Phạm Thị Dung', email: 'dung@student.com', class: '12A2', hasVoted: false },
      { studentId: 'SV005', name: 'Hoàng Văn Em', email: 'em@student.com', class: '12A2', hasVoted: false }
    ]);
    console.log(`✓ Đã tạo ${users.length} sinh viên`);

    console.log('\n✅ Khởi tạo database thành công!');
    console.log('MongoDB Atlas: BauCuDB');
    console.log('Collections: candidates, users, votes');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi:', error.message);
    process.exit(1);
  }
}

seedDatabase();
