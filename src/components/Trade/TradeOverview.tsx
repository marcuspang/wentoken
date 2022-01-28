import { Button, Flex, Text, Tooltip } from "@chakra-ui/react";
import Moralis from "moralis/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { PendingTrades } from "../../pages/trade/[id]";
import TradeTable from "./TradeTable";

const TradeOverview = () => {
  const router = useRouter();
  const { user, isAuthenticating, isInitializing, isWeb3EnableLoading } =
    useMoralis();
  const { isFetching: fromIsFetching, fetch: fromFetch } =
    useMoralisQuery<PendingTrades>("PendingTrades", (query) =>
      query.equalTo("from", user?.get("ethAddress").toLowerCase()),
    );
  const { isFetching: toIsFetching, fetch: toFetch } =
    useMoralisQuery<PendingTrades>("PendingTrades", (query) =>
      query.equalTo("to", user?.get("ethAddress").toLowerCase()),
    );

  const [fromTrades, setFromTrades] = useState<Moralis.Object<PendingTrades>[]>(
    [],
  );
  const [toTrades, setToTrades] = useState<Moralis.Object<PendingTrades>[]>([]);

  useEffect(() => {
    fromFetch({
      onSuccess: (res) => {
        setFromTrades(res);
      },
    });
    toFetch({
      onSuccess: (res) => {
        setToTrades(res);
      },
    });
    return () => {
      setFromTrades([]);
      setToTrades([]);
    };
  }, [
    isAuthenticating,
    isWeb3EnableLoading,
    isInitializing,
    fromFetch,
    toFetch,
  ]);

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
      <TradeTable
        isFetching={fromIsFetching}
        trades={fromTrades}
        setTrades={setFromTrades}
      />
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
      <TradeTable
        isFetching={toIsFetching}
        trades={toTrades}
        setTrades={setToTrades}
        isOthers
      />
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
        setTrades={setFromTrades}
        trades={fromTrades
          .filter((trade) => trade.attributes.executed)
          .concat(toTrades.filter((trade) => trade.attributes.executed))}
      />
    </>
  );
};

export default TradeOverview;
