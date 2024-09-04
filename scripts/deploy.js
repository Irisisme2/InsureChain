async function main() {
    const [deployer] = await ethers.getSigners();
    
    console.log("Deploying contracts with the account:", deployer.address);
  
    // Deploy PolicyContract
    const PolicyContract = await ethers.getContractFactory("PolicyContract");
    const policyContract = await PolicyContract.deploy();
    console.log("PolicyContract deployed to:", policyContract.address);
  
    // Deploy PremiumCollection with the address of PolicyContract
    const PremiumCollection = await ethers.getContractFactory("PremiumCollection");
    const premiumCollection = await PremiumCollection.deploy("0xYourTokenAddressHere"); // Replace with actual token address
    console.log("PremiumCollection deployed to:", premiumCollection.address);
  
    // Deploy ClaimsContract with the address of PolicyContract
    const ClaimsContract = await ethers.getContractFactory("ClaimsContract");
    const claimsContract = await ClaimsContract.deploy(policyContract.address);
    console.log("ClaimsContract deployed to:", claimsContract.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  