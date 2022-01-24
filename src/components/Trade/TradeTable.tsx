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
import { TOKENS } from "../../constants/constants";
import { PendingTrades } from "../../pages/trade/[id]";

interface TradeTableProps {
  isFetching: boolean;
  trades: Moralis.Object<PendingTrades>[];
  isOthers?: boolean;
}

const convertToString = (tokenAmounts: number[]) => {
  return tokenAmounts
    .map((tokenAmount, index) =>
      tokenAmount === 0 ? "" : tokenAmount + " " + TOKENS[index],
    )
    .filter(Boolean)
    .join(", ");
};

const TradeTable = ({ isFetching, trades, isOthers }: TradeTableProps) => {
  const router = useRouter();
  return (
    <Table variant={"striped"} mb={10}>
      <Thead>
        <Tr>
          <Th fontSize={"sm"}>From</Th>
          <Th fontSize={"sm"}>To</Th>
          <Th fontSize={"sm"}>From Tokens</Th>
          <Th fontSize={"sm"}>To Tokens</Th>
          <Th fontSize={"sm"}>{isOthers ? "Executed" : "Submitted"}</Th>
        </Tr>
      </Thead>
      {isFetching ? (
        <Flex justifyContent={"center"}>
          <Spinner />
        </Flex>
      ) : (
        <Tbody>
          {trades.map(
            (trade) =>
              ((!isOthers && !trade.attributes.executed) || isOthers) && (
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
                    {(
                      isOthers
                        ? trade.attributes.executed
                        : trade.attributes.confirmed
                    ) ? (
                      <CheckIcon />
                    ) : (
                      <CloseIcon />
                    )}
                  </Td>
                </Tr>
              ),
          )}
        </Tbody>
      )}
    </Table>
  );
};

export default TradeTable;
