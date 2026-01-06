const Candidate = require('../models/Candidate');
const { getContract, web3 } = require('../config/blockchain');

exports.getAllCandidates = async (req, res, next) => {
    try {
        const blockchainCandidates = await getContract().methods.getAllCandidates().call();

        const candidates = await Promise.all(blockchainCandidates.map(async (bc) => {
            const data = {
                candidateId: Number(bc.id),
                name: bc.name,
                position: bc.position,
                description: bc.description,
                imageUrl: bc.imageUrl,
                voteCount: Number(bc.voteCount),
                blockchainId: Number(bc.id)
            };

            let candidate = await Candidate.findOne({ candidateId: data.candidateId });
            if (!candidate) {
                candidate = await Candidate.create(data);
            } else {
                candidate.voteCount = data.voteCount;
                await candidate.save();
            }
            return candidate;
        }));

        res.json({ success: true, count: candidates.length, data: candidates });
    } catch (error) {
        next(error);
    }
};

exports.getCandidate = async (req, res, next) => {
    try {
        const bc = await getContract().methods.getCandidate(req.params.id).call();
        
        const data = {
            candidateId: Number(bc.id),
            name: bc.name,
            position: bc.position,
            description: bc.description,
            imageUrl: bc.imageUrl,
            voteCount: Number(bc.voteCount),
            blockchainId: Number(bc.id)
        };

        let candidate = await Candidate.findOne({ candidateId: data.candidateId });
        if (!candidate) {
            candidate = await Candidate.create(data);
        } else {
            candidate.voteCount = data.voteCount;
            await candidate.save();
        }

        res.json({ success: true, data: candidate });
    } catch (error) {
        next(error);
    }
};

exports.addCandidate = async (req, res, next) => {
    try {
        const { name, position, description, imageUrl = '' } = req.body;

        if (!name || !position || !description) {
            return res.status(400).json({ success: false, message: 'Name, position, description required' });
        }

        const contract = getContract();
        const tx = contract.methods.addCandidate(name, position, description, imageUrl);
        const [gas, gasPrice] = await Promise.all([
            tx.estimateGas({ from: process.env.ADMIN_ADDRESS }),
            web3.eth.getGasPrice()
        ]);

        const signedTx = await web3.eth.accounts.signTransaction({
            to: contract.options.address,
            data: tx.encodeABI(),
            gas,
            gasPrice
        }, process.env.ADMIN_PRIVATE_KEY);

        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        const candidateCount = await contract.methods.getCandidateCount().call();
        const candidateId = Number(candidateCount) - 1;

        const candidate = await Candidate.create({
            candidateId, name, position, description, imageUrl,
            voteCount: 0, blockchainId: candidateId
        });

        res.status(201).json({ success: true, data: candidate, transactionHash: receipt.transactionHash });
    } catch (error) {
        next(error);
    }
};

exports.getCandidateCount = async (req, res, next) => {
    try {
        const count = await getContract().methods.getCandidateCount().call();
        res.json({ success: true, count: Number(count) });
    } catch (error) {
        next(error);
    }
};
