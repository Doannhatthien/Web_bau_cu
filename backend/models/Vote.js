const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
    voter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    voterAddress: {
        type: String,
        required: true,
        lowercase: true
    },
    candidate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate',
        required: true
    },
    candidateId: {
        type: Number,
        required: true
    },
    transactionHash: {
        type: String,
        required: true
    },
    blockNumber: {
        type: Number
    },
    votedAt: {
        type: Date,
        default: Date.now
    }
});

// Index for quick queries
voteSchema.index({ voter: 1 });
voteSchema.index({ voterAddress: 1 });
voteSchema.index({ candidate: 1 });

module.exports = mongoose.model('Vote', voteSchema);
