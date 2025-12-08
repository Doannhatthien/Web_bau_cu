async function main() {
  console.log("Deploying ClassElection contract...");

  // Get the contract factory
  const ClassElection = await ethers.getContractFactory("ClassElection");
  
  // Deploy the contract
  const election = await ClassElection.deploy();
  
  // Wait for deployment to finish
  await election.waitForDeployment();
  
  // Get the deployed contract address
  const address = await election.getAddress();
  
  console.log("✅ ClassElection deployed to:", address);
  console.log("\n📝 Cập nhật địa chỉ contract trong app.js:");
  console.log(`const CONTRACT_ADDRESS = '${address}';`);
  
  // Get the deployer (admin) address
  const [deployer] = await ethers.getSigners();
  console.log("\n👤 Admin address:", deployer.address);
  
  console.log("\n✨ Deploy thành công!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
