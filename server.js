const express = require('express');
const cors = require('cors');
const connectDB = require('./database/config');
const Candidate = require('./database/models/Candidate');
const User = require('./database/models/User');
const Vote = require('./database/models/Vote');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Kết nối Database
connectDB();

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'API Server Bầu Cử - Đang hoạt động' });
});

// ========== CANDIDATE ROUTES ==========
// Lấy tất cả ứng viên
app.get('/api/candidates', async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ position: 1 });
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Thêm ứng viên mới
app.post('/api/candidates', async (req, res) => {
  try {
    const candidate = new Candidate(req.body);
    await candidate.save();
    res.status(201).json(candidate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Lấy thông tin 1 ứng viên
app.get('/api/candidates/:id', async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) return res.status(404).json({ error: 'Không tìm thấy ứng viên' });
    res.json(candidate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========== USER ROUTES ==========
// Lấy tất cả người dùng
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Thêm người dùng mới
app.post('/api/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Lấy thông tin user theo studentId
app.get('/api/users/student/:studentId', async (req, res) => {
  try {
    const user = await User.findOne({ studentId: req.params.studentId });
    if (!user) return res.status(404).json({ error: 'Không tìm thấy sinh viên' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========== VOTE ROUTES ==========
// Bỏ phiếu
app.post('/api/vote', async (req, res) => {
  try {
    const { userId, candidateId, transactionHash, blockNumber } = req.body;

    // Kiểm tra user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'Không tìm thấy người dùng' });
    
    // Kiểm tra đã bỏ phiếu chưa
    if (user.hasVoted) return res.status(400).json({ error: 'Đã bỏ phiếu rồi' });

    // Kiểm tra candidate
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) return res.status(404).json({ error: 'Không tìm thấy ứng viên' });

    // Tạo vote
    const vote = new Vote({
      voter: userId,
      candidate: candidateId,
      transactionHash,
      blockNumber
    });
    await vote.save();

    // Cập nhật vote count
    candidate.votes += 1;
    await candidate.save();

    // Đánh dấu đã vote
    user.hasVoted = true;
    await user.save();

    res.json({ success: true, vote });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Lấy tất cả phiếu bầu
app.get('/api/votes', async (req, res) => {
  try {
    const votes = await Vote.find()
      .populate('voter', 'name studentId')
      .populate('candidate', 'name position');
    res.json(votes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Lấy kết quả bầu cử
app.get('/api/results', async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ votes: -1 });
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✓ Server đang chạy tại http://localhost:${PORT}`);
});
