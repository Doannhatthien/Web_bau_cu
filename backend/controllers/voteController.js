const Vote = require('../models/Vote');
const User = require('../models/User');
const Candidate = require('../models/Candidate');
const { getContract, web3 } = require('../config/blockchain');

exports.castVote = async (req, res, next) => {
    try {
        const { candidateId, privateKey } = req.body;

        if (!candidateId || !privateKey) {
            return res.status(400).json({ success: false, message: 'candidateId and privateKey required' });
        }

        const user = await User.findById(req.user.id);
        if (user.hasVoted) {
            return res.status(400).json({ success: false, message: 'Already voted' });
        }

        const candidate = await Candidate.findOne({ candidateId: Number(candidateId) });
        if (!candidate) {
            return res.status(404).json({ success: false, message: 'Candidate not found' });
        }

        const contract = getContract();
        const tx = contract.methods.vote(candidateId);
        const [gas, gasPrice] = await Promise.all([
            tx.estimateGas({ from: user.walletAddress }),
            web3.eth.getGasPrice()
        ]);

        const signedTx = await web3.eth.accounts.signTransaction({
            to: contract.options.address,
            data: tx.encodeABI(),
            gas,
            gasPrice
        }, privateKey);

        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

        const vote = await Vote.create({
            voter: req.user.id,
            voterAddress: user.walletAddress,
            candidate: candidate._id,
            candidateId: Number(candidateId),
            transactionHash: receipt.transactionHash,
            blockNumber: receipt.blockNumber
        });

        user.hasVoted = true;
        user.votedAt = new Date();
        await user.save();

        candidate.voteCount += 1;
        await candidate.save();

        res.status(201).json({ success: true, data: vote, transactionHash: receipt.transactionHash });
    } catch (error) {
        if (error.message?.includes('Already voted')) {
            return res.status(400).json({ success: false, message: 'Already voted on blockchain' });
        }
        next(error);
    }
};

exports.getAllVotes = async (req, res, next) => {
    try {
        const votes = await Vote.find()
            .populate('voter', 'username email walletAddress')
            .populate('candidate', 'name position')
            .sort({ votedAt: -1 });

        res.json({ success: true, count: votes.length, data: votes });
    } catch (error) {
        next(error);
    }
};

exports.getMyVote = async (req, res, next) => {
    try {
        const vote = await Vote.findOne({ voter: req.user.id })
            .populate('candidate', 'name position imageUrl');

        if (!vote) {
            return res.status(404).json({ success: false, message: 'Not voted yet' });
        }

        res.json({ success: true, data: vote });
    } catch (error) {
        next(error);
    }
};

exports.hasVoted = async (req, res, next) => {
    try {
        const hasVoted = await getContract().methods.hasVoted(req.params.address).call();
        res.json({ success: true, hasVoted });
    } catch (error) {
        next(error);
    }
};

exports.getVoteStats = async (req, res, next) => {
    try {
        const [totalVotes, totalVoters, candidates] = await Promise.all([
            Vote.countDocuments(),
            User.countDocuments({ hasVoted: true }),
            Candidate.find().sort({ voteCount: -1 })
        ]);

        res.json({ success: true, data: { totalVotes, totalVoters, candidates } });
    } catch (error) {
        next(error);
    }
};
