import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Flex,
  IconButton,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import Moralis from "moralis/types";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { WENTOKEN } from "../../constants/constants";
import { PendingTrades } from "../../pages/trade/[id]";

interface TradeTableProps {
  isFetching: boolean;
  trades: Moralis.Object<PendingTrades>[];
  isOthers?: boolean;
  isExecuted?: boolean;
  setTrades: Dispatch<SetStateAction<Moralis.Object<PendingTrades>[]>>;
}

export const convertToString = (tokenAmounts: number[]) => {
  return tokenAmounts
    .map((tokenAmount, index) =>
      tokenAmount === 0 ? "" : tokenAmount + " " + WENTOKEN[index],
    )
    .filter(Boolean)
    .join(", ");
};

const TradeTable = ({
  isFetching,
  trades,
  setTrades,
  isOthers,
  isExecuted,
}: TradeTableProps) => {
  const router = useRouter();
  const toast = useToast();
  const [deleting, setDeleting] = useState(false);

  return (
    <>
      <Table variant={"striped"}>
        <Thead>
          <Tr>
            <Th fontSize={"sm"}>From</Th>
            <Th fontSize={"sm"}>To</Th>
            <Th fontSize={"sm"}>From Tokens</Th>
            <Th fontSize={"sm"}>To Tokens</Th>
            <Th fontSize={"sm"}>
              {isOthers || isExecuted ? "Executed" : "Submitted"}
            </Th>
          </Tr>
        </Thead>
        {!isFetching && (
          <Tbody>
            {trades.map(
              (trade) =>
                (!trade.attributes.executed || isExecuted || isOthers) && (
                  <Tr
                    key={trade.id}
                    transition={"opacity 0.1s ease"}
                    _hover={{
                      cursor: "pointer",
                      opacity: 0.6,
                    }}
                    onClick={() =>
                      !deleting && router.push("/trade/" + trade.id)
                    }
                  >
                    <Td>{trade.attributes.from.substring(0, 30) + "..."}</Td>
                    <Td>{trade.attributes.to.substring(0, 30) + "..."}</Td>
                    <Td>
                      {convertToString(trade.attributes.fromTokenAmounts)}
                    </Td>
                    <Td>{convertToString(trade.attributes.toTokenAmounts)}</Td>
                    <Td>
                      {(
                        isOthers || isExecuted
                          ? trade.attributes.executed
                          : trade.attributes.confirmed
                      ) ? (
                        <CheckIcon />
                      ) : (
                        <CloseIcon
                          onClick={() =>
                            toast({
                              status: "success",
                              title: "Successfully submitted your trade offer",
                              description:
                                "Please wait until the other party has accepted your request",
                              isClosable: true,
                            })
                          }
                        />
                      )}
                    </Td>
                    <Td>
                      <IconButton
                        aria-label="delete trade"
                        icon={<FaTrash />}
                        variant={"ghost"}
                        onMouseEnter={() => setDeleting(true)}
                        onMouseLeave={() => setDeleting(false)}
                        onClick={() => {
                          trade.destroy();
                          setTrades((prev) =>
                            prev.filter((item) => item.id !== trade.id),
                          );
                        }}
                      >
                        Delete
                      </IconButton>
                    </Td>
                  </Tr>
                ),
            )}
          </Tbody>
        )}
      </Table>
      {isFetching && (
        <Flex justifyContent={"center"}>
          <Spinner />
        </Flex>
      )}
    </>
  );
};

export default TradeTable;
