import WenToken from "../artifacts/contracts/WenToken.sol/WenToken.json";

export const wenTokenAbi = WenToken.abi;
export const wenTokenAddress = process.env.WENTOKEN_ADDRESS;

const createTokenOptions = (
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

export default createTokenOptions;
