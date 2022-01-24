import { Box, Flex, Spinner, Text, useToast } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMoralis, useMoralisQuery } from "react-moralis";
import Layout from "../../../components/Layout/Layout";
import TradeConfirmationMenu from "../../../components/Trade/TradeConfirmationMenu";
import TradeConfirmationNFTCards from "../../../components/Trade/TradeConfirmationNFTCards";
import { TOKEN_IDS } from "../../../constants/constants";

export interface PendingTrades {
  to: string;
  toTokenIds: typeof TOKEN_IDS;
  toTokenAmounts: number[];
  from: string;
  fromTokenIds: typeof TOKEN_IDS;
  fromTokenAmounts: number[];
  confirmed: boolean;
}

const TradeSubmissionPage: NextPage = () => {
  const router = useRouter();
  const [submit, setSubmit] = useState(false);
  const toast = useToast();
  const { Moralis, isWeb3EnableLoading, user } = useMoralis();
  const { data, isFetching, fetch } = useMoralisQuery<PendingTrades>(
    "PendingTrades",
    (query) => query.equalTo("objectId", router.query.id),
    [],
  );

  useEffect(() => {
    fetch();
  }, [isWeb3EnableLoading]);

  useEffect(() => {
    if (data && data.length) {
      if (!user) {
        toast({
          status: "error",
          title: "You are not logged in",
        });
      }
      if (user!.get("ethAddress") !== data[0].attributes.from) {
        toast({
          status: "error",
          title: "You are not authorized to submit this trade",
        });
      }
    }
  }, [data]);

  useEffect(() => {
    if (data && data.length && submit) {
      const Trade = Moralis.Object.extend("PendingTrades");
      const trade = new Trade();
      for (const property in data[0].attributes) {
        trade.set(
          property,
          data[0].attributes[property as keyof PendingTrades],
        );
      }
      trade.set("objectId", router.query.id);
      trade.set("confirmed", true);
      trade.save();
      setSubmit(false);
    }
  }, [submit]);

  return (
    <Layout>
      <Flex pt={4}>
        <Box flex={"60%"}>
          <Text as="h1" fontSize={"3xl"} fontWeight={800} mb={4}>
            You have selected:
          </Text>
          {isFetching ? (
            <Flex justifyContent={"center"}>
              <Spinner />
            </Flex>
          ) : !data.length ? (
            <Text>Nothing found</Text>
          ) : (
            <TradeConfirmationNFTCards
              tokenAmounts={data[0].attributes.fromTokenAmounts}
            />
          )}
          <Text as="h2" fontSize={"3xl"} fontWeight={800} mb={4}>
            For the following:
          </Text>
          {isFetching ? (
            <Flex justifyContent={"center"}>
              <Spinner />
            </Flex>
          ) : !data.length ? (
            <Text>Nothing found</Text>
          ) : (
            <TradeConfirmationNFTCards
              tokenAmounts={data[0].attributes.toTokenAmounts}
            />
          )}
        </Box>
        <Box flex={"40%"}>
          <TradeConfirmationMenu
            isEmpty={!data || !data.length}
            isFetching={isFetching}
            onClick={() => setSubmit(true)}
            submit={submit}
            {...(data && data[0] && data[0].attributes)}
          />
        </Box>
      </Flex>
    </Layout>
  );
};
// TODO calculate gas fees with provider.getGasPrice()
export default TradeSubmissionPage;
