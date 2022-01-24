import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Flex,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Moralis from "moralis/types";
import { useRouter } from "next/router";
import { PendingTrades } from "../../pages/trade/[id]";
import { convertToString } from "./TradeTable";

interface TradeTableProps {
  isFetching: boolean;
  trades: Moralis.Object<PendingTrades>[];
}

const TradeExecutedTable = ({ isFetching, trades }: TradeTableProps) => {
  const router = useRouter();

  return (
    <Table variant={"striped"} mb={10}>
      <Thead>
        <Tr>
          <Th fontSize={"sm"}>From</Th>
          <Th fontSize={"sm"}>To</Th>
          <Th fontSize={"sm"}>From Tokens</Th>
          <Th fontSize={"sm"}>To Tokens</Th>
          <Th fontSize={"sm"}>Executed</Th>
        </Tr>
      </Thead>
      {isFetching ? (
        <Flex justifyContent={"center"}>
          <Spinner />
        </Flex>
      ) : (
        <Tbody>
          {trades.map((trade) => (
            <Tr
              key={trade.id}
              transition={"opacity 0.1s ease"}
              _hover={{
                cursor: "pointer",
                opacity: 0.6,
              }}
              onClick={() => router.push("/trade/" + trade.id)}
            >
              <Td>{trade.attributes.from.substring(0, 30) + "..."}</Td>
              <Td>{trade.attributes.to.substring(0, 30) + "..."}</Td>
              <Td>{convertToString(trade.attributes.fromTokenAmounts)}</Td>
              <Td>{convertToString(trade.attributes.toTokenAmounts)}</Td>
              <Td>
                {trade.attributes.executed ? <CheckIcon /> : <CloseIcon />}
              </Td>
            </Tr>
          ))}
        </Tbody>
      )}
    </Table>
  );
};

export default TradeExecutedTable;
