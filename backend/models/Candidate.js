const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    candidateId: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: [true, 'Please provide candidate name'],
        trim: true
    },
    position: {
        type: String,
        required: [true, 'Please provide position'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please provide description'],
        trim: true
    },
    imageUrl: {
        type: String,
        default: ''
    },
    voteCount: {
        type: Number,
        default: 0
    },
    blockchainId: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Candidate', candidateSchema);
