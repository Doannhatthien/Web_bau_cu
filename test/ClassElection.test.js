const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ClassElection Contract", function () {
  let election;
  let admin;
  let voter1;
  let voter2;
  let voter3;

  beforeEach(async function () {
    // Get signers
    [admin, voter1, voter2, voter3] = await ethers.getSigners();

    // Deploy contract
    const ClassElection = await ethers.getContractFactory("ClassElection");
    election = await ClassElection.deploy();
    await election.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the deployer as admin", async function () {
      expect(await election.admin()).to.equal(admin.address);
    });

    it("Should initialize in Setup state", async function () {
      expect(await election.state()).to.equal(0); // Setup state
    });

    it("Should have default positions", async function () {
      const positionsCount = await election.getPositionsCount();
      expect(positionsCount).to.be.at.least(5);
    });
  });

  describe("Voter Registration", function () {
    it("Admin should register voter", async function () {
      await election.registerVoter(voter1.address);
      const voterInfo = await election.voters(voter1.address);
      expect(voterInfo.isRegistered).to.be.true;
    });

    it("Should register multiple voters", async function () {
      await election.registerVoters([voter1.address, voter2.address, voter3.address]);
      
      const voter1Info = await election.voters(voter1.address);
      const voter2Info = await election.voters(voter2.address);
      
      expect(voter1Info.isRegistered).to.be.true;
      expect(voter2Info.isRegistered).to.be.true;
    });

    it("Non-admin cannot register voter", async function () {
      await expect(
        election.connect(voter1).registerVoter(voter2.address)
      ).to.be.revertedWith("Chi admin moi co quyen thuc hien");
    });
  });

  describe("Candidate Registration", function () {
    beforeEach(async function () {
      await election.registerVoter(voter1.address);
      await election.startRegistration();
    });

    it("Registered voter can register as candidate", async function () {
      await election.connect(voter1).registerCandidate("Nguyen Van A", "Lop truong");
      
      const candidatesCount = await election.candidatesCount();
      expect(candidatesCount).to.equal(1);
    });

    it("Admin can add candidate manually", async function () {
      await election.addCandidate("Tran Thi B", "Lop pho");
      
      const candidatesCount = await election.candidatesCount();
      expect(candidatesCount).to.equal(1);
    });

    it("Non-registered voter cannot register as candidate", async function () {
      await expect(
        election.connect(voter2).registerCandidate("Test", "Bi thu")
      ).to.be.revertedWith("Ban chua duoc dang ky lam cu tri");
    });
  });

  describe("Voting Process", function () {
    beforeEach(async function () {
      // Register voters
      await election.registerVoters([voter1.address, voter2.address, voter3.address]);
      
      // Start registration
      await election.startRegistration();
      
      // Add candidates
      await election.addCandidate("Nguyen Van A", "Lop truong");
      await election.addCandidate("Tran Thi B", "Lop pho");
      
      // Start voting
      await election.startVoting();
    });

    it("Registered voter can vote", async function () {
      await election.connect(voter1).vote(1);
      
      const voterInfo = await election.voters(voter1.address);
      expect(voterInfo.hasVoted).to.be.true;
      
      const candidate = await election.candidates(1);
      expect(candidate.voteCount).to.equal(1);
    });

    it("Voter cannot vote twice", async function () {
      await election.connect(voter1).vote(1);
      
      await expect(
        election.connect(voter1).vote(2)
      ).to.be.revertedWith("Ban da binh chon roi");
    });

    it("Cannot vote for non-existent candidate", async function () {
      await expect(
        election.connect(voter1).vote(999)
      ).to.be.revertedWith("Ung vien khong ton tai");
    });

    it("Should count total votes correctly", async function () {
      await election.connect(voter1).vote(1);
      await election.connect(voter2).vote(1);
      await election.connect(voter3).vote(2);
      
      const totalVotes = await election.getTotalVotes();
      expect(totalVotes).to.equal(3);
    });
  });

  describe("Election State Management", function () {
    it("Admin can start registration", async function () {
      await election.startRegistration();
      expect(await election.state()).to.equal(1); // Registration state
    });

    it("Admin can start voting after registration", async function () {
      await election.startRegistration();
      await election.addCandidate("Test", "Lop truong");
      await election.startVoting();
      
      expect(await election.state()).to.equal(2); // Voting state
    });

    it("Cannot start voting without candidates", async function () {
      await election.startRegistration();
      
      await expect(
        election.startVoting()
      ).to.be.revertedWith("Phai co it nhat 1 ung vien");
    });

    it("Admin can end election", async function () {
      await election.registerVoter(voter1.address);
      await election.startRegistration();
      await election.addCandidate("Test", "Lop truong");
      await election.startVoting();
      await election.endElection();
      
      expect(await election.state()).to.equal(3); // Ended state
    });
  });

  describe("Results", function () {
    beforeEach(async function () {
      await election.registerVoters([voter1.address, voter2.address, voter3.address]);
      await election.startRegistration();
      await election.addCandidate("Nguyen Van A", "Lop truong");
      await election.addCandidate("Tran Thi B", "Lop pho");
      await election.startVoting();
      await election.connect(voter1).vote(1);
      await election.connect(voter2).vote(1);
      await election.connect(voter3).vote(2);
      await election.endElection();
    });

    it("Should get election results", async function () {
      const results = await election.getResults();
      
      expect(results.length).to.equal(2);
      expect(results[0].voteCount).to.equal(2);
      expect(results[1].voteCount).to.equal(1);
    });
  });

  describe("Reset Election", function () {
    it("Admin can reset election after it ends", async function () {
      await election.registerVoter(voter1.address);
      await election.startRegistration();
      await election.addCandidate("Test", "Lop truong");
      await election.startVoting();
      await election.connect(voter1).vote(1);
      await election.endElection();
      
      await election.resetElection();
      
      expect(await election.state()).to.equal(0); // Back to Setup
      expect(await election.candidatesCount()).to.equal(0);
    });

    it("Cannot reset election before it ends", async function () {
      await election.startRegistration();
      
      await expect(
        election.resetElection()
      ).to.be.revertedWith("Khong dung trang thai bau cu");
    });
  });
});
