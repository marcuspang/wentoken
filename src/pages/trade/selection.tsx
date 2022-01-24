import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEventHandler, useCallback, useEffect, useState } from "react";
import {
  useMoralis,
  useNewMoralisObject,
  useWeb3ExecuteFunction,
} from "react-moralis";
import CustomLink from "../../components/Layout/CustomLink";
import Layout from "../../components/Layout/Layout";
import LogoIcon from "../../components/Layout/LogoIcon";
import TradeMenu from "../../components/Trade/TradeMenu";
import { TOKEN_IDS, TOKEN_LENGTH } from "../../constants/constants";
import createTokenOptions from "../../util/createTokenOptions";

const TradeSelectionPage: NextPage = () => {
  const router = useRouter();

  const { user, isWeb3EnableLoading } = useMoralis();
  const { isSaving, save, error, object } =
    useNewMoralisObject("PendingTrades");

  const { data, fetch, isFetching } = useWeb3ExecuteFunction();

  const [tokens, setTokens] = useState<number[]>([]);
  const [selectedFromTokens, setSelectedFromTokens] = useState<number[]>(
    new Array(TOKEN_LENGTH).fill(0) as number[],
  );
  const [selectedToTokens, setSelectedToTokens] = useState<number[]>(
    new Array(TOKEN_LENGTH).fill(0) as number[],
  );
  const [toAddressInputError, setToAddressInputError] = useState(false);
  const [toAddress, setToAddress] = useState(router.query.to);

  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    if (user) {
      let accounts = Array(TOKEN_LENGTH).fill(user.get("ethAddress"));
      let ids = TOKEN_IDS;
      if (toAddress) {
        accounts = accounts.concat(Array(TOKEN_LENGTH).fill(toAddress));
        ids = ids.concat(ids);
      } else if (tokens.length) {
        // if there are tokens already and no toAddress or to then dont fetch again
        return;
      }
      fetch({
        params: createTokenOptions("balanceOfBatch", {
          // [from * 4, to * 4]
          accounts,
          // [0, 1, 2, 3, 0, 1, 2, 3]
          ids,
        }),
      });
    }
  }, [isWeb3EnableLoading, toAddress]);

  useEffect(() => {
    if (data) {
      const tokenAmounts = (data as ethers.BigNumber[]).map((token) =>
        ethers.BigNumber.from(token).toNumber(),
      );
      setTokens(tokenAmounts);
    }
  }, [data]);

  const addressOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.value && ethers.utils.isAddress(e.target.value)) {
      setToAddress(e.target.value);
      setToAddressInputError(false);
    } else {
      setToAddress("");
      setToAddressInputError(true);
    }
  };

  const editSelection = useCallback(
    (tokenId: number, selection: "to" | "from", edit: 1 | -1) => {
      if (selection === "from") {
        setSelectedFromTokens((prev) => {
          const temp = prev;
          if (edit === 1) {
            temp[tokenId]++;
          } else {
            temp[tokenId]--;
          }
          return temp;
        });
      } else {
        setSelectedToTokens((prev) => {
          const temp = prev;
          if (edit === 1) {
            temp[tokenId]++;
          } else {
            temp[tokenId]--;
          }
          return temp;
        });
      }
      console.log(selectedFromTokens, selectedToTokens);
    },
    [],
  );

  return (
    <Layout>
      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent pb={5}>
          <ModalHeader>Enter address</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isInvalid={toAddressInputError}>
              <FormLabel htmlFor="toAddress">Address</FormLabel>
              <Box mb={4}>
                <Input
                  id="toAddress"
                  defaultValue={toAddress}
                  onChange={addressOnChange}
                  placeholder="Enter someone's address to start trading!"
                />
                {toAddressInputError && (
                  <FormErrorMessage>
                    Please input a valid address
                  </FormErrorMessage>
                )}
              </Box>
              <CustomLink href="/explore">
                Not sure? Click here to look for existing offers
              </CustomLink>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Flex justifyContent="space-between" alignItems="stretch" p={3}>
        <TradeMenu
          inputPlaceholder="Enter to search your NFTs"
          isLoading={isFetching}
          title="Select Your NFTs"
          tokenAmounts={tokens.slice(0, TOKEN_LENGTH)}
          editSelection={editSelection}
        />
        <Box flex="1.5">
          <Flex
            h="100vh"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <LogoIcon w={20} h={20} />
            <Button
              variant={"dark-shadow"}
              mb={4}
              isDisabled={isSaving}
              onClick={async () => {
                const result = await save({
                  to: (toAddress as string).toLowerCase(),
                  toTokenIds: TOKEN_IDS,
                  toTokenAmounts: selectedToTokens,
                  from: user?.get("ethAddress").toLowerCase(),
                  fromTokenIds: TOKEN_IDS,
                  fromTokenAmounts: selectedFromTokens,
                  confirmed: false,
                  executed: false,
                });
                // TODO add error handling
                router.push("/trade/" + result.id);
              }}
            >
              Next
            </Button>
            <Button variant={"dark-shadow"} onClick={() => router.back()}>
              Back
            </Button>
          </Flex>
        </Box>
        <TradeMenu
          inputPlaceholder="Enter to their your NFTs"
          isLoading={isFetching}
          title="Select Their NFTs"
          onOpen={onOpen}
          tokenAmounts={tokens.slice(TOKEN_LENGTH, TOKEN_LENGTH * 2)}
          editSelection={editSelection}
        />
      </Flex>
    </Layout>
  );
};

export default TradeSelectionPage;
