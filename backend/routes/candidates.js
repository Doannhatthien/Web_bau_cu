const express = require('express');
const {
    getAllCandidates,
    getCandidate,
    addCandidate,
    getCandidateCount
} = require('../controllers/candidateController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
    .get(getAllCandidates)
    .post(protect, authorize('admin'), addCandidate);

router.get('/count', getCandidateCount);
router.get('/:id', getCandidate);

module.exports = router;
