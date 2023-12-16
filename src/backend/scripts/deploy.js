const { ethers } = require("hardhat");

async function main(){
 
  const [deployer]= await ethers.getSigners();
  console.log("Balance of deployer is :" + await deployer.getBalance())
  console.log(`address of deployer is ${  deployer.address}`)
  const NFT = await ethers.getContractFactory("NFT")
  const MarketPlace = await ethers.getContractFactory("MarketPlace")
  const nft =  await NFT.deploy()
  const marketplace = await MarketPlace.deploy(1)
  saveFrontendFiles(marketplace , "MarketPlace");
  saveFrontendFiles(nft , "NFT");
}
function saveFrontendFiles(contract, name) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../../frontend/contractsData";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + `/${name}-address.json`,
    JSON.stringify({ address: contract.address }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync(name);

  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}

// main()
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });