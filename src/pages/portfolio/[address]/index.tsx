import { Box, Text } from "@chakra-ui/react";
import { ethers } from "ethers";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useApiContract, useMoralis } from "react-moralis";
import Layout from "../../../components/Layout/Layout";
import PortfolioCollection from "../../../components/Portfolio/PortfolioCollection";
import PortfolioCollectionChart from "../../../components/Portfolio/PortfolioCollectionChart";
import PortfolioStats from "../../../components/Portfolio/PortfolioStats";
import { WENTOKEN_IDS, WENTOKEN_LENGTH } from "../../../constants/constants";
import theme from "../../../theme/theme";
import {
  wenTokenAbi,
  wenTokenAddress,
  wenTokenListingAbi,
  wenTokenListingAddress,
} from "../../../util/createTokenOptions";

const PortfolioPage: NextPage = () => {
  const router = useRouter();
  const { user, isInitializing, isWeb3EnableLoading, isAuthenticating } =
    useMoralis();
  const { address } = router.query;
  const { isLoading, runContractFunction } = useApiContract({
    abi: wenTokenAbi,
    functionName: "balanceOfBatch",
    address: wenTokenAddress,
    chain: "ropsten",
    params: {
      // [address, address, address, address]
      accounts: Array(WENTOKEN_LENGTH).fill(address),
      // [0, 1, 2, 3]
      ids: WENTOKEN_IDS,
    },
  });
  const { runContractFunction: fetchBalances } = useApiContract({
    abi: wenTokenListingAbi,
    functionName: "balances",
    address: wenTokenListingAddress,
    chain: "ropsten",
    params: {
      "": user?.get("ethAddress"),
    },
  });

  const [tokens, setTokens] = useState<number[]>([]);
  const [sum, setSum] = useState(0);
  const [outstandingBalance, setOutstandingBalance] = useState(0);

  // fetch data
  useEffect(() => {
    if (address) {
      runContractFunction({
        onSuccess: (res) => {
          // once data is retrieved, update state for tokens and sum of tokens
          setTokens((res as unknown as string[]).map(Number));
          setSum((res as unknown as string[]).reduce((a, b) => +a + +b, 0));
        },
      });
    }
    if (user) {
      fetchBalances({
        onSuccess: (res) => {
          setOutstandingBalance(
            +ethers.utils.formatUnits(res as unknown as number),
          );
        },
      });
    }
    return () => {
      setTokens([]);
      setSum(0);
      setOutstandingBalance(0);
    };
  }, [
    isInitializing,
    isWeb3EnableLoading,
    isAuthenticating,
    address,
    user,
    runContractFunction,
    fetchBalances,
  ]);

  return (
    <Layout>
      <Box maxW={"6xl"} mx={"auto"} mt={4}>
        <Box
          boxShadow={theme.shadows.light}
          rounded={"xl"}
          px={10}
          pt={8}
          pb={6}
        >
          <PortfolioStats
            sum={sum}
            tokens={tokens}
            isLoading={isLoading}
            balance={outstandingBalance}
          />
        </Box>
        <Box>
          <Text as="h2" fontSize={"4xl"} fontWeight={600} mb={2} mt={10}>
            {"wentoken"}
          </Text>
          <PortfolioCollectionChart />
          <PortfolioCollection tokens={tokens} />
        </Box>
        <Box>
          <Text as="h2" fontSize={"4xl"} fontWeight={600} mb={2} mt={10}>
            {"wentoken reborn"}
          </Text>
          <PortfolioCollectionChart />
          <PortfolioCollection tokens={tokens} />
        </Box>
      </Box>
    </Layout>
  );
};

export default PortfolioPage;
