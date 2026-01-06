const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        unique: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [6, 'Password must be at least 6 characters'],
        select: false
    },
    fullName: {
        type: String,
        required: [true, 'Please provide full name']
    },
    studentId: {
        type: String,
        required: [true, 'Please provide student ID'],
        unique: true
    },
    walletAddress: {
        type: String,
        required: [true, 'Please provide a wallet address'],
        unique: true,
        lowercase: true
    },
    role: {
        type: String,
        enum: ['student', 'admin'],
        default: 'student'
    },
    hasVoted: {
        type: Boolean,
        default: false
    },
    votedAt: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
