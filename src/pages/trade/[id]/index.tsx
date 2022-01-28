import { Box, Flex, Spinner, Text, useToast } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  useMoralis,
  useMoralisQuery,
  useWeb3ExecuteFunction,
} from "react-moralis";
import Layout from "../../../components/Layout/Layout";
import TradeConfirmationMenu from "../../../components/Trade/TradeConfirmationMenu";
import TradeConfirmationNFTCards from "../../../components/Trade/TradeConfirmationNFTCards";
import { WENTOKEN_IDS } from "../../../constants/constants";
import { createWentokenOptions } from "../../../util/createTokenOptions";

export interface PendingTrades {
  to: string;
  toTokenIds: typeof WENTOKEN_IDS;
  toTokenAmounts: number[];
  from: string;
  fromTokenIds: typeof WENTOKEN_IDS;
  fromTokenAmounts: number[];
  confirmed: boolean;
  executed: boolean;
}

const TradeSubmissionPage: NextPage = () => {
  const router = useRouter();
  const toast = useToast();
  const { Moralis, isWeb3EnableLoading, user, isInitializing } = useMoralis();
  const { data, isFetching, fetch } = useMoralisQuery<PendingTrades>(
    "PendingTrades",
    (query) => query.equalTo("objectId", router.query.id),
    [],
  );
  const {
    fetch: executeFetch,
    isFetching: executeIsFetching,
    error: executeError,
  } = useWeb3ExecuteFunction();
  const {
    fetch: approvalFetch,
    isFetching: approvalIsFetching,
    error: approvalError,
  } = useWeb3ExecuteFunction();

  const [isExecuting, setIsExecuting] = useState(false); // if current user is to
  const [isAuthorized, setIsAuthorized] = useState(true); // if current user is to or from

  useEffect(() => {
    fetch();
  }, [isWeb3EnableLoading, isInitializing]);

  useEffect(() => {
    if (data && data.length) {
      if (!user) {
        toast({
          status: "error",
          isClosable: true,
          title: "You are not logged in",
        });
      }

      if (
        user!.get("ethAddress").toLowerCase() !== data[0].attributes.from &&
        user!.get("ethAddress").toLowerCase() !== data[0].attributes.to
      ) {
        setIsAuthorized(false);
        toast({
          status: "error",
          isClosable: true,
          title: "You are not authorized to submit this trade",
        });
      } else {
        setIsAuthorized(true);
      }
      setIsExecuting(
        user?.get("ethAddress").toLowerCase() === data[0].attributes.to,
      );
    }
  }, [data]);

  const updatePendingTrade = async (status: "confirmed" | "executed") => {
    const Trade = Moralis.Object.extend("PendingTrades");
    const trade = new Trade();
    for (const property in data[0].attributes) {
      trade.set(property, data[0].attributes[property as keyof PendingTrades]);
    }
    trade.set("objectId", router.query.id);
    trade.set(status, true);
    await trade.save();
  };

  const submitTrade = async () => {
    if (data && data.length) {
      if (!isExecuting) {
        await approvalFetch({
          params: createWentokenOptions("setApprovalForAll", {
            operator: data[0].attributes.to,
            approved: "true",
          }),
        });
        if (!approvalError) {
          updatePendingTrade("confirmed");
          toast({
            status: "success",
            title: "Successfully submitted your trade offer",
            description:
              "Please wait until the other party has accepted your request",
            isClosable: true,
          });
          router.push("/trade");
        }
      } else {
        await executeFetch({
          params: createWentokenOptions("executeTradeBatch", {
            from: data[0].attributes.from,
            fromIds: data[0].attributes.fromTokenIds,
            fromAmounts: data[0].attributes.fromTokenAmounts,
            to: data[0].attributes.to,
            toIds: data[0].attributes.toTokenIds,
            toAmounts: data[0].attributes.toTokenAmounts,
            data: "0x00",
          }),
        });

        if (!executeError) {
          updatePendingTrade("executed");
          toast({
            status: "success",
            title: "Successfully executed trade offer",
            isClosable: true,
          });
          router.push("/trade");
        }
      }
    }
  };

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
            isExecuting={isExecuting}
            onClick={submitTrade}
            isDisabled={!isAuthorized}
            {...(data && data[0] && data[0].attributes)}
          />
        </Box>
      </Flex>
    </Layout>
  );
};
// TODO calculate gas fees with provider.getGasPrice()
export default TradeSubmissionPage;
