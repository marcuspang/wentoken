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
  useToast,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import Moralis from "moralis/types";
import { useRouter } from "next/router";
import { TOKENS } from "../../constants/constants";
import { PendingTrades } from "../../pages/trade/[id]";

interface TradeTableProps {
  isFetching: boolean;
  trades: Moralis.Object<PendingTrades>[];
  isOthers?: boolean;
  isExecuted?: boolean;
}

export const convertToString = (tokenAmounts: number[]) => {
  return tokenAmounts
    .map((tokenAmount, index) =>
      tokenAmount === 0 ? "" : tokenAmount + " " + TOKENS[index],
    )
    .filter(Boolean)
    .join(", ");
};

function DeleteBtn() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Confirmation</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm delete?</ModalHeader>
          <ModalCloseButton />

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Delete
            </Button>
            <Button variant="ghost" onClick={onClose} ml={2}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

const TradeTable = ({
  isFetching,
  trades,
  isOthers,
  isExecuted,
}: TradeTableProps) => {
  const router = useRouter();
  const toast = useToast();
  const deletebtn = null;
  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log(isOthers, isExecuted, trades);
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
                        <CheckIcon
                          onClick={() => router.push("/trade/" + trade.id)}
                        />
                      ) : (
                        <Flex>
                          <CloseIcon
                            onClick={() =>
                              toast({
                                status: "success",
                                title:
                                  "Successfully submitted your trade offer",
                                description:
                                  "Please wait until the other party has accepted your request",
                                isClosable: true,
                              })
                            }
                          />
                          <Button variant={"dark-shadow"} onClick={onOpen}>
                            Delete
                          </Button>
                          <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                              <ModalHeader>Confirm delete?</ModalHeader>
                              <ModalCloseButton />

                              <ModalFooter>
                                <Button
                                  colorScheme="blue"
                                  mr={3}
                                  onClick={onClose}
                                >
                                  Delete
                                </Button>
                                <Button
                                  variant="ghost"
                                  onClick={onClose}
                                  ml={2}
                                >
                                  Cancel
                                </Button>
                              </ModalFooter>
                            </ModalContent>
                          </Modal>
                        </Flex>
                      )}
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
