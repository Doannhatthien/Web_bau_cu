const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  studentId: {
    type: String,
    required: true,
    unique: true
  },
  position: {
    type: String,
    required: true
  },
  description: String,
  imageUrl: String,
  votes: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Candidate', candidateSchema);
