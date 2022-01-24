import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Flex,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useMoralis, useMoralisQuery } from "react-moralis";
import Layout from "../../components/Layout/Layout";
import { TOKENS } from "../../constants/constants";
import { PendingTrades } from "./[id]";

const convertToString = (tokenAmounts: number[]) => {
  return tokenAmounts
    .map((tokenAmount, index) =>
      tokenAmount === 0 ? "" : tokenAmount + " " + TOKENS[index],
    )
    .filter(Boolean)
    .join(", ");
};

const TradeMainPage: NextPage = () => {
  const { user } = useMoralis();
  const { data, error, isFetching } = useMoralisQuery<PendingTrades>(
    "PendingTrades",
    (query) => query.equalTo("from", user?.get("ethAddress")),
  );
  const router = useRouter();
  console.log(data);
  return (
    <Layout>
      <Text as="h1" fontSize={"3xl"} fontWeight={800} mb={4} mt={4}>
        Pending Trades
      </Text>
      <Table variant={"striped"}>
        <Thead>
          <Tr>
            <Th fontSize={"sm"}>To</Th>
            <Th fontSize={"sm"}>From</Th>
            <Th fontSize={"sm"}>From Tokens</Th>
            <Th fontSize={"sm"}>To Tokens</Th>
            <Th fontSize={"sm"}>Submitted</Th>
          </Tr>
        </Thead>
        {isFetching ? (
          <Flex justifyContent={"center"}>
            <Spinner />
          </Flex>
        ) : (
          <Tbody>
            {data.map((item) => (
              <Tr
                key={item.id}
                transition={"opacity 0.1s ease"}
                _hover={{
                  cursor: "pointer",
                  opacity: 0.6,
                }}
                onClick={() => router.push("/trade/" + item.id)}
              >
                <Td>{item.attributes.to.substring(0, 30) + "..."}</Td>
                <Td>{item.attributes.from.substring(0, 30) + "..."}</Td>
                <Td>{convertToString(item.attributes.fromTokenAmounts)}</Td>
                <Td>{convertToString(item.attributes.toTokenAmounts)}</Td>
                <Td>
                  {item.attributes.confirmed ? <CheckIcon /> : <CloseIcon />}
                </Td>
              </Tr>
            ))}
          </Tbody>
        )}
      </Table>
    </Layout>
  );
};

export default TradeMainPage;
