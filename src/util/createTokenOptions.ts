import WenToken from "../artifacts/contracts/WenToken.sol/WenToken.json";

const createTokenOptions = (
  functionName: string,
  params: Record<string, unknown>,
  msgValue?: string | number,
) => ({
  abi: WenToken.abi,
  contractAddress: process.env.WENTOKEN_ADDRESS,
  functionName,
  params,
  msgValue,
});

export default createTokenOptions;
