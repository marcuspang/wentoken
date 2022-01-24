import { Button, Flex, IconButton, Text, Tooltip } from "@chakra-ui/react";
import Moralis from "moralis/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoRefresh } from "react-icons/io5";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { PendingTrades } from "../../pages/trade/[id]";
import TradeTable from "./TradeTable";

const TradeOverview = () => {
  const router = useRouter();
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

  useEffect(() => {
    fromFetch();
    toFetch();
  }, [user, isAuthenticating, isWeb3EnableLoading, isInitializing]);

  return (
    <>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
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
        <Button
          variant={"dark-shadow"}
          onClick={() => router.push("/trade/selection")}
        >
          Select Screen
        </Button>
      </Flex>
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
        trades={fromData
          .filter((trade) => trade.attributes.executed)
          .concat(toData.filter((trade) => trade.attributes.executed))}
      />
    </>
  );
};

export default TradeOverview;
