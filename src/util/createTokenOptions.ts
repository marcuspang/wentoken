import WenToken from "../artifacts/contracts/WenToken.sol/WenToken.json";

const createTokenOptions = (
  functionName: string,
  params: Record<string, unknown>,
  msgValue?: string | number,
) => ({
  contractAddress: process.env.WENTOKEN_ADDRESS,
  abi: WenToken.abi,
  functionName,
  params,
  msgValue,
});

export default createTokenOptions;
