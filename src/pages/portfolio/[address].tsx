import { Box } from "@chakra-ui/react";
import { ethers } from "ethers";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import Layout from "../../components/Layout/Layout";
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

  useEffect(() => {
    if (!isAuthenticated || !isWeb3Enabled || !user) {
      router.push("/");
    }

    tokenFetch({
      params: createTokenOptions("balanceOfBatch", {
        accounts: Array(TOKENS.length).fill(address),
        ids: TOKENS.map((token) => token.id),
      }),
    });
  }, []);

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
  console.log(data);

  return (
    <Layout>
      <Box
        maxW={"6xl"}
        mx={"auto"}
        mt={6}
        pt={8}
        pb={6}
        px={10}
        boxShadow={"xl"}
        rounded={"xl"}
      >
        <PortfolioStats sum={sum} tokens={tokens} isLoading={isLoading} />
      </Box>
    </Layout>
  );
};

export default PortfolioPage;
