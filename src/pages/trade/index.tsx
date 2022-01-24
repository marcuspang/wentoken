import { Text, Tooltip } from "@chakra-ui/react";
import { NextPage } from "next";
import { useEffect } from "react";
import { useMoralis, useMoralisQuery } from "react-moralis";
import Layout from "../../components/Layout/Layout";
import TradeTable from "../../components/Trade/TradeTable";
import { PendingTrades } from "./[id]";

const TradeMainPage: NextPage = () => {
  const { user, isWeb3EnableLoading, isInitializing } = useMoralis();
  const {
    data: fromData,
    isFetching: fromIsFetching,
    fetch: fromFetch,
  } = useMoralisQuery<PendingTrades>("PendingTrades", (query) =>
    query.equalTo("from", user?.get("ethAddress").toLowerCase()),
  );
  const {
    data: toData,
    isFetching: toIsFetching,
    fetch: toFetch,
  } = useMoralisQuery<PendingTrades>("PendingTrades", (query) =>
    query.equalTo("to", user?.get("ethAddress").toLowerCase()),
  );

  useEffect(() => {
    fromFetch();
    toFetch();
  }, [isWeb3EnableLoading, isInitializing]);

  console.log(fromData, toData);

  return (
    <Layout>
      <Tooltip
        label="Existing trade offers that are awaiting confirmation by the other party"
        rounded={"md"}
        p={2}
      >
        <Text
          as="h1"
          fontSize={"3xl"}
          fontWeight={800}
          mb={4}
          mt={6}
          width={"fit-content"}
        >
          Pending Trade Requests
        </Text>
      </Tooltip>
      <TradeTable isFetching={fromIsFetching} trades={fromData} />
      <Tooltip
        label="Existing trade offers that are awaiting for your confirmation"
        rounded={"md"}
        p={2}
      >
        <Text
          as="h1"
          fontSize={"3xl"}
          fontWeight={800}
          mb={4}
          mt={6}
          width={"fit-content"}
        >
          Pending Trade Offers From Others
        </Text>
      </Tooltip>
      <TradeTable isFetching={toIsFetching} trades={toData} isOthers />
      <Tooltip
        label="Existing trade offers that are awaiting for your confirmation"
        rounded={"md"}
        p={2}
      >
        <Text
          as="h1"
          fontSize={"3xl"}
          fontWeight={800}
          mb={4}
          mt={6}
          width={"fit-content"}
        >
          Executed Trades
        </Text>
      </Tooltip>
    </Layout>
  );
};

export default TradeMainPage;
