import WenToken from "../artifacts/contracts/WenToken.sol/WenToken.json";
import WenTokenListing from "../artifacts/contracts/WenTokenListing.sol/WenTokenListing.json";

export const wenTokenAbi = WenToken.abi;
export const wenTokenAddress = process.env.WENTOKEN_ADDRESS;

export const wenTokenListingAbi = WenTokenListing.abi;
export const wenTokenListingAddress = process.env.WENTOKENLISTING_ADDRESS;

export const createTokenOptions = (
  functionName: string,
  params: Record<string, unknown>,
  msgValue?: string | number,
) => ({
  abi: wenTokenAbi,
  contractAddress: wenTokenAddress,
  functionName,
  params,
  msgValue,
});

export const createTokenListingOptions = (
  functionName: string,
  params: Record<string, unknown>,
  msgValue?: string | number,
) => ({
  abi: wenTokenListingAbi,
  contractAddress: wenTokenListingAddress,
  functionName,
  params,
  msgValue,
});
