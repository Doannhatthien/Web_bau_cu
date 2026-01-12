const mongoose = require('mongoose');

const electionSchema = new mongoose.Schema({
    state: {
        type: Number,
        enum: [0, 1, 2, 3], // 0: Setup, 1: Registration, 2: Voting, 3: Ended
        default: 0
    },
    stateName: {
        type: String,
        enum: ['Setup', 'Registration', 'Voting', 'Ended'],
        default: 'Setup'
    },
    startTime: {
        type: Date
    },
    endTime: {
        type: Date
    },
    totalVotes: {
        type: Number,
        default: 0
    },
    totalCandidates: {
        type: Number,
        default: 0
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Election', electionSchema);
