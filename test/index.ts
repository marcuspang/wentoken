import { expect } from "chai";
import { ethers } from "hardhat";

const initialSupply = [10, Math.pow(10, 2), Math.pow(10, 3), Math.pow(10, 4)];
const mintFee = 0.1;

describe("WenToken", () => {
  describe("Deployment", () => {
    it("should mint the right amount of tokens", async () => {
      const WenToken = await ethers.getContractFactory("WenToken");
      const wenToken = await WenToken.deploy();

      await wenToken.deployed();

      initialSupply.forEach(async (supply, index) => {
        expect(await wenToken.totalSupply(index), supply.toString());
      });
    });
  });
  describe("Purchasing NFT", () => {
    it("should allow users to purchase a type of NFT", async () => {
      const amount = 2;
      const tokenId = 0;
      const [owner, user] = await ethers.getSigners();
      const WenToken = await ethers.getContractFactory("WenToken");
      const wenToken = await WenToken.deploy();

      await wenToken.deployed();
      await wenToken.safeTransferFrom(
        owner.address,
        user.address,
        tokenId,
        amount,
        "0x00",
      );
      expect(
        await wenToken.balanceOf(user.address, tokenId),
        amount.toString(),
      );
    });
    it("should allow users to purchase multiple types of NFTs", async () => {
      const amounts = [2, 5, 10];
      const tokenIds = [1, 2, 3];
      const [owner, user] = await ethers.getSigners();
      const WenToken = await ethers.getContractFactory("WenToken");
      const wenToken = await WenToken.deploy();

      await wenToken.deployed();
      await wenToken.safeBatchTransferFrom(
        owner.address,
        user.address,
        tokenIds,
        amounts,
        "0x00",
      );
      expect(
        await wenToken.balanceOfBatch(
          Array(amounts.length).fill(user.address),
          tokenIds,
        ),
        amounts.toString(),
      );
    });
  });
  describe("Minting", () => {
    it("should allow users to mint a type of NFT", async () => {
      // const amount = 2;
      // const tokenId = 0;
      // const [_, user] = await ethers.getSigners();
      // const WenToken = await ethers.getContractFactory("WenToken");
      // const wenToken = await WenToken.deploy();
      // await wenToken.deployed();
      // await wenToken.payToMint(user.address, tokenId, amount, "0x00", {
      //   value: ethers.utils.parseEther(`${mintFee * amount}`),
      // });
      // expect(
      //   await wenToken.balanceOf(user.address, tokenId),
      //   amount.toString(),
      // );
    });
    it("should allow users to mint multiple types of NFTs", async () => {
      //   const amounts = [2, 5, 10];
      //   const tokenIds = [1, 2, 3];
      //   const [_, user] = await ethers.getSigners();
      //   const WenToken = await ethers.getContractFactory("WenToken");
      //   const wenToken = await WenToken.deploy();
      //   await wenToken.deployed();
      //   await wenToken.payToMintBatch(user.address, tokenIds, amounts, "0x00", {
      //     value: ethers.utils.parseEther(
      //       `${mintFee * amounts.reduce((a, b) => a + b, 0)}`,
      //     ),
      //   });
      //   expect(
      //     await wenToken.balanceOfBatch(
      //       Array(amounts.length).fill(user.address),
      //       tokenIds,
      //     ),
      //     amounts.toString(),
      //   );
      // });
    });
  });
  describe("Trading NFT for NFT", () => {
    it("should allow users to grant approval for others transfer tokens", async () => {
      const [_, from, to] = await ethers.getSigners();
      const WenToken = await ethers.getContractFactory("WenToken");
      const wenToken = await WenToken.deploy();

      await wenToken.connect(to).setApprovalForAll(from.address, true);
      expect(await wenToken.isApprovedForAll(from.address, to.address), "true");
    });
    it("should allow users to trade a single type of NFT for NFT", async () => {
      // const fromTokenId = 0;
      // const fromAmount = 3;
      // const toTokenId = 1;
      // const toAmount = 10;
      // const [_, from, to] = await ethers.getSigners();
      // const WenToken = await ethers.getContractFactory("WenToken");
      // const wenToken = await WenToken.deploy();
      // await wenToken.deployed();
      // await wenToken.payToMint(from.address, fromTokenId, fromAmount, "0x00", {
      //   value: ethers.utils.parseEther(`${mintFee * fromAmount}`),
      // });
      // await wenToken.payToMint(to.address, toTokenId, toAmount, "0x00", {
      //   value: ethers.utils.parseEther(`${mintFee * toAmount}`),
      // });
      // await wenToken.connect(to).setApprovalForAll(from.address, true);
      // await wenToken.connect(from).setApprovalForAll(to.address, true);
      // await wenToken
      //   .connect(from)
      //   .executeTrade(
      //     from.address,
      //     to.address,
      //     fromTokenId,
      //     fromAmount,
      //     toTokenId,
      //     toAmount,
      //     "0x00",
      //   );
      // expect(
      //   await wenToken.balanceOf(from.address, toTokenId),
      //   toAmount.toString(),
      // );
      // expect(
      //   await wenToken.balanceOf(to.address, fromTokenId),
      //   fromAmount.toString(),
      // );
    });
    it("should allow users to trade multiple types of NFT for NFT", async () => {
      // const fromTokenIds = [0, 1];
      // const fromAmounts = [2, 20];
      // const toTokenIds = [3, 4];
      // const toAmounts = [60, 100];
      // const [_, from, to] = await ethers.getSigners();
      // const WenToken = await ethers.getContractFactory("WenToken");
      // const wenToken = await WenToken.deploy();
      // await wenToken.deployed();
      // await wenToken.payToMintBatch(
      //   from.address,
      //   fromTokenIds,
      //   fromAmounts,
      //   "0x00",
      //   {
      //     value: ethers.utils.parseEther(
      //       `${mintFee * fromAmounts.reduce((a, b) => a + b, 0)}`,
      //     ),
      //   },
      // );
      // await wenToken.payToMintBatch(to.address, toTokenIds, toAmounts, "0x00", {
      //   value: ethers.utils.parseEther(
      //     `${mintFee * toAmounts.reduce((a, b) => a + b, 0)}`,
      //   ),
      // });
      // await wenToken.connect(to).setApprovalForAll(from.address, true);
      // await wenToken.connect(from).setApprovalForAll(to.address, true);
      // await wenToken
      //   .connect(from)
      //   .executeTradeBatch(
      //     from.address,
      //     to.address,
      //     fromTokenIds,
      //     fromAmounts,
      //     toTokenIds,
      //     toAmounts,
      //     "0x00",
      //   );
      // expect(
      //   await wenToken.balanceOf(from.address, toTokenIds),
      //   toAmounts.toString(),
      // );
      // expect(
      //   await wenToken.balanceOf(to.address, fromTokenIds),
      //   fromAmounts.toString(),
      // );
    });
  });
});
