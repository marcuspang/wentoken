import { Flex, IconButton, Text, Tooltip } from "@chakra-ui/react";
import Moralis from "moralis/types";
import { useEffect, useState } from "react";
import { IoRefresh } from "react-icons/io5";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { PendingTrades } from "../../pages/trade/[id]";
import TradeTable from "./TradeTable";

const TradeOverview = () => {
  const { user, isAuthenticating, isInitializing, isWeb3EnableLoading } =
    useMoralis();
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

  const [fromTokens, setFromTokens] = useState<Moralis.Object<PendingTrades>[]>(
    [],
  );
  const [toTokens, setToTokens] = useState<Moralis.Object<PendingTrades>[]>([]);

  useEffect(() => {
    fromFetch();
    toFetch();
  }, [user, isAuthenticating, isWeb3EnableLoading, isInitializing]);

  useEffect(() => {
    if (fromData && fromData.length) {
      setFromTokens(fromData);
    }
    if (toTokens && toTokens.length) {
      setToTokens(toData);
    }

    return () => {
      setFromTokens([]);
      setToTokens([]);
    };
  }, [toData, fromData]);
  return (
    <>
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
      <TradeTable isFetching={fromIsFetching} trades={fromTokens} />
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
      <TradeTable isFetching={toIsFetching} trades={toTokens} isOthers />
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
        trades={toTokens
          .filter((trade) => trade.attributes.executed)
          .concat(fromTokens.filter((trade) => trade.attributes.executed))}
      />
    </>
  );
};

export default TradeOverview;
