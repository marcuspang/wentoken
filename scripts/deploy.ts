import { ethers } from "hardhat";

async function main() {
  const WenToken = await ethers.getContractFactory("WenToken");
  const WenTokenListing = await ethers.getContractFactory("WenTokenListing");
  const wenToken = await WenToken.deploy();
  const wenTokenListing = await WenTokenListing.deploy();

  await wenToken.deployed();
  await wenTokenListing.deployed();

  console.log("WenToken deployed to:", wenToken.address);
  console.log("WenTokenListing deployed to:", wenTokenListing.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
