import { Text, Tooltip } from "@chakra-ui/react";
import { NextPage } from "next";
import { useEffect } from "react";
import { useMoralis, useMoralisQuery } from "react-moralis";
import Layout from "../../components/Layout/Layout";
import TradeTable from "../../components/Trade/TradeTable";
import { PendingTrades } from "./[id]";

const TradeMainPage: NextPage = () => {
  const { user, isInitializing, isWeb3EnableLoading } = useMoralis();

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
  }, [isWeb3EnableLoading, isInitializing, user, fromFetch, toFetch]);

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
          mb={6}
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
          mb={6}
          mt={6}
          width={"fit-content"}
        >
          Pending Trade Offers From Others
        </Text>
      </Tooltip>
      <TradeTable isFetching={toIsFetching} trades={toData} isOthers />
      <Tooltip label="Trade offers executed" rounded={"md"} p={2}>
        <Text
          as="h1"
          fontSize={"3xl"}
          fontWeight={800}
          mb={6}
          mt={6}
          width={"fit-content"}
        >
          Executed Trades
        </Text>
      </Tooltip>
      <TradeTable
        isFetching={toIsFetching || fromIsFetching}
        isExecuted
        trades={toData
          .filter((trade) => trade.attributes.executed)
          .concat(fromData.filter((trade) => trade.attributes.executed))}
      />
    </Layout>
  );
};

export default TradeMainPage;
