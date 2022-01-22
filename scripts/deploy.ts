import { ethers } from "hardhat";

async function main() {
  const WenToken = await ethers.getContractFactory("WenToken");
  const wenToken = await WenToken.deploy();

  await wenToken.deployed();

  console.log("Wentoken deployed to:", wenToken.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
