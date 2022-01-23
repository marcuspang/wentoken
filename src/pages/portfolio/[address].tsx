import {
  Box,
  Button,
  Stack,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import Layout from "../../components/Layout/Layout";
import { ETH_PRICE, MINT_PRICE, TOKEN_IDS } from "../../constants/constants";
import createTokenOptions from "../../util/createTokenOptions";

interface TokenAmount {
  _hex: string;
  _isBigNumber: boolean;
}

const PortfolioPage: NextPage = () => {
  const router = useRouter();
  const { address } = router.query;
  const [tokenAmounts, setTokenAmounts] = useState<number[]>([]);
  const { isAuthenticated, isWeb3Enabled, user } = useMoralis();
  const { data, fetch: tokenFetch, isFetching } = useWeb3ExecuteFunction();

  useEffect(() => {
    if (!isAuthenticated || !isWeb3Enabled || !user) {
      router.push("/");
    }

    tokenFetch({
      params: createTokenOptions("balanceOfBatch", {
        accounts: Array(TOKEN_IDS.length).fill(address),
        ids: TOKEN_IDS,
      }),
      onSuccess: (res) =>
        setTokenAmounts(
          (res as TokenAmount[]).map((token) =>
            ethers.BigNumber.from(token._hex).toNumber(),
          ),
        ),
    });
  }, []);

  console.log(data);

  console.log(tokenAmounts);

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
        <Stack>
          <Stat size="md">
            <StatLabel fontSize="lg">NFT Net Worth</StatLabel>
            <StatNumber fontSize={"4xl"} fontWeight={800}>
              $
              {tokenAmounts.reduce((a, b) => a + b, 0) * MINT_PRICE * ETH_PRICE}
            </StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              3.16%
            </StatHelpText>
          </Stat>
          <StatGroup pt={4}>
            <Stat size="md">
              <StatLabel fontSize="lg">No. of collections</StatLabel>
              <StatNumber fontSize={"4xl"} fontWeight={800}>
                {tokenAmounts.length}
              </StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />1
              </StatHelpText>
            </Stat>
          </StatGroup>
        </Stack>
      </Box>
      {tokenAmounts?.map((token, index) => (
        <Text key={index}>{token}</Text>
      ))}
    </Layout>
  );
};

export default PortfolioPage;
