const Election = require('../models/Election');
const { getContract, web3 } = require('../config/blockchain');

const STATE_NAMES = ['Setup', 'Registration', 'Voting', 'Ended'];

exports.getElectionState = async (req, res, next) => {
    try {
        const state = Number(await getContract().methods.getCurrentState().call());
        
        let election = await Election.findOne();
        if (!election) {
            election = await Election.create({ state, stateName: STATE_NAMES[state] });
        } else {
            election.state = state;
            election.stateName = STATE_NAMES[state];
            await election.save();
        }

        res.json({ success: true, data: { state, stateName: STATE_NAMES[state] } });
    } catch (error) {
        next(error);
    }
};

exports.setElectionState = async (req, res, next) => {
    try {
        const { state } = req.body;

        if (state === undefined || state < 0 || state > 3) {
            return res.status(400).json({ success: false, message: 'Invalid state (0-3)' });
        }

        const contract = getContract();
        const tx = contract.methods.setState(state);
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

        let election = await Election.findOne();
        if (!election) {
            election = await Election.create({ state, stateName: STATE_NAMES[state] });
        } else {
            election.state = state;
            election.stateName = STATE_NAMES[state];
            election.updatedAt = new Date();
            if (state === 2) election.startTime = new Date();
            if (state === 3) election.endTime = new Date();
            await election.save();
        }

        res.json({ success: true, data: election, transactionHash: receipt.transactionHash });
    } catch (error) {
        next(error);
    }
};

exports.getElectionInfo = async (req, res, next) => {
    try {
        const contract = getContract();
        const [state, candidateCount] = await Promise.all([
            contract.methods.getCurrentState().call(),
            contract.methods.getCandidateCount().call()
        ]);
        const stateNumber = Number(state);
        
        let election = await Election.findOne();
        const data = {
            state: stateNumber,
            stateName: STATE_NAMES[stateNumber],
            totalCandidates: Number(candidateCount)
        };

        if (!election) {
            election = await Election.create(data);
        } else {
            Object.assign(election, data);
            await election.save();
        }

        res.json({ success: true, data: election });
    } catch (error) {
        next(error);
    }
};
