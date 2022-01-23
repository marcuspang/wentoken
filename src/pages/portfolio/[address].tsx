import { Box } from "@chakra-ui/react";
import { ethers } from "ethers";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import Layout from "../../components/Layout/Layout";
import PortfolioCollection from "../../components/Portfolio/PortfolioCollection";
import PortfolioStats from "../../components/Portfolio/PortfolioStats";
import { TOKENS } from "../../constants/constants";
import createTokenOptions from "../../util/createTokenOptions";

interface TokenAmount {
  _hex: string;
  _isBigNumber: boolean;
}

const PortfolioPage: NextPage = () => {
  const router = useRouter();
  const { address } = router.query;
  const { isAuthenticated, isWeb3Enabled, user } = useMoralis();
  const { data, fetch: tokenFetch, isLoading } = useWeb3ExecuteFunction();

  const [tokens, setTokens] = useState<number[]>([]);
  const [sum, setSum] = useState(0);

  // fetch data
  useEffect(() => {
    if (!isAuthenticated || !isWeb3Enabled || !user) {
      router.push("/");
    }

    tokenFetch({
      params: createTokenOptions("balanceOfBatch", {
        // [address, address, address, address]
        accounts: Array(Object.keys(TOKENS).length / 2).fill(address),
        // [0, 1, 2, 3]
        ids: Object.values(TOKENS).splice(
          Object.keys(TOKENS).length / 2,
          Object.keys(TOKENS).length,
        ),
      }),
    });
  }, []);

  // once data is retrieved, update localstate for tokens and sum of tokens
  useEffect(() => {
    if (data) {
      setTokens(
        (data as TokenAmount[]).map((token) =>
          ethers.BigNumber.from(token).toNumber(),
        ),
      );
      setSum(
        ethers.BigNumber.from(
          (data as TokenAmount[]).reduce(
            (a, b) => ethers.BigNumber.from(a._hex).add(b._hex),
            ethers.BigNumber.from(0),
          )._hex,
        ).toNumber(),
      );
    }
  }, [data]);

  return (
    <Layout>
      <Box maxW={"6xl"} mx={"auto"} mt={4}>
        <Box boxShadow={"xl"} rounded={"xl"} px={10} pt={8} pb={6}>
          <PortfolioStats sum={sum} tokens={tokens} isLoading={isLoading} />
        </Box>
        {/* {tokens.map((token, index) => <PortfolioCollection tokenAmount={token} tokenId={index} key={index} />)} */}
        <PortfolioCollection tokenAmount={tokens[0]} tokenId={0} />
      </Box>
    </Layout>
  );
};

export default PortfolioPage;
