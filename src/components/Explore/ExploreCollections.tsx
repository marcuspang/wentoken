import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useApiContract } from "react-moralis";
import { TOKENS } from "../../constants/constants";
import { wenTokenAbi, wenTokenAddress } from "../../util/createTokenOptions";
import ExploreCollection from "./ExploreCollection";

const purchaseAddress = "0xE269cf4647c3BE31E4e99ADeD398aA164BdFa0aC";

const ExploreCollections = () => {
  const { data, isLoading, runContractFunction } = useApiContract({
    abi: wenTokenAbi,
    functionName: "balanceOfBatch",
    address: wenTokenAddress,
    chain: "ropsten",
    params: {
      // [address, address, address, address]
      accounts: Array(Object.keys(TOKENS).length / 2).fill(purchaseAddress),
      // [0, 1, 2, 3]
      ids: Object.values(TOKENS).splice(
        Object.keys(TOKENS).length / 2,
        Object.keys(TOKENS).length,
      ),
    },
  });
  const [checkedItems, setCheckedItems] = useState(false);
  const [tokens, setTokens] = useState<number[]>([]);

  useEffect(() => {
    runContractFunction();
  }, [runContractFunction]);

  useEffect(() => {
    if (data) {
      setTokens((data as unknown as string[]).map(Number));
    }
  }, [data]);

  return (
    <Box px={3}>
      {tokens.map(
        (token, index) =>
          token > 0 && (
            <ExploreCollection
              tokenAmount={token}
              tokenId={index}
              key={index}
            />
          ),
      )}
    </Box>
  );
};

export default ExploreCollections;
