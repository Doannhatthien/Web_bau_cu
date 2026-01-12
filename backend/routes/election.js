const express = require('express');
const {
    getElectionState,
    setElectionState,
    getElectionInfo
} = require('../controllers/electionController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/state', getElectionState);
router.put('/state', protect, authorize('admin'), setElectionState);
router.get('/info', getElectionInfo);

module.exports = router;
