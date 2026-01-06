const express = require('express');
const {
    castVote,
    getAllVotes,
    getMyVote,
    hasVoted,
    getVoteStats
} = require('../controllers/voteController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, castVote);
router.get('/', protect, authorize('admin'), getAllVotes);
router.get('/my-vote', protect, getMyVote);
router.get('/has-voted/:address', hasVoted);
router.get('/stats', getVoteStats);

module.exports = router;
