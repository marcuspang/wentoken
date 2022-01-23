import { Button, Text } from "@chakra-ui/react";
import { ethers } from "ethers";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import Layout from "../../components/Layout/Layout";
import { TOKEN_IDS } from "../../constants/constants";
import createTokenOptions from "../../util/createTokenOptions";

const PortfolioPage: NextPage = () => {
  const router = useRouter();
  const { isAuthenticated, isWeb3Enabled, user } = useMoralis();
  const { address } = router.query;
  const {
    data: tokens,
    fetch: tokenFetch,
    isFetching,
  } = useWeb3ExecuteFunction();

  useEffect(() => {
    if (!isAuthenticated || !isWeb3Enabled || !user) {
      router.push("/");
    }
  }, [isAuthenticated, isWeb3Enabled, router, user]);

  return (
    <Layout>
      <Text>{address}</Text>
      <Button
        onClick={async () =>
          await tokenFetch({
            params: createTokenOptions("balanceOfBatch", {
              accounts: Array(TOKEN_IDS.length).fill(address),
              ids: TOKEN_IDS,
            }),
            onSuccess: (res: any) => console.log("result", res),
          })
        }
        disabled={isFetching}
      >
        Fetch data
      </Button>
      {(tokens as { _hex: string; _isBigNumber: boolean }[])?.map(
        (token, index) => (
          <Text key={index}>
            {ethers.BigNumber.from(token._hex).toString()}
          </Text>
        ),
      )}
    </Layout>
  );
};

export default PortfolioPage;
