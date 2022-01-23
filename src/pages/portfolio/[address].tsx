import { Button, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useWeb3ExecuteFunction } from "react-moralis";
import Layout from "../../components/Layout/Layout";
import { TOKEN_IDS } from "../../constants/constants";
import createTokenOptions from "../../util/createTokenOptions";

const PortfolioPage: NextPage = () => {
  const router = useRouter();
  const { address } = router.query;
  const { data, fetch, isFetching } = useWeb3ExecuteFunction();

  return (
    <Layout>
      <Text>{address}</Text>
      <Button
        onClick={() =>
          fetch({
            params: createTokenOptions("balanceOfBatch", {
              accounts: Array(TOKEN_IDS.length).fill(address),
              ids: TOKEN_IDS,
            }),
          })
        }
        disabled={isFetching}
      >
        Fetch data
      </Button>
    </Layout>
  );
};

export default PortfolioPage;
