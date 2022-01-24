import {
  Box,
  Button,
  Flex,
  Input,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import Layout from "../../components/Layout/Layout";
import LogoIcon from "../../components/Layout/LogoIcon";
import NFTCards from "../../components/Trade/NFTCards";
import { TOKENS } from "../../constants/constants";
import createTokenOptions from "../../util/createTokenOptions";

interface TokenAmount {
  _hex: string;
  _isBigNumber: boolean;
}

const TradePage = () => {
  const router = useRouter();
  const { to } = router.query;

  const { user } = useMoralis();
  const { data, fetch, isFetching } = useWeb3ExecuteFunction();

  const fromInputRef = useRef<HTMLInputElement>(null);
  const toInputRef = useRef<HTMLInputElement>(null);

  const [tokens, setTokens] = useState<number[]>([]);
  const [selectedTokens, setSelectedTokens] = useState<number[]>([]);

  useEffect(() => {
    if (user) {
      let accounts = Array(Object.keys(TOKENS).length / 2).fill(
        user.get("ethAddress"),
      );
      let ids = Object.values(TOKENS).splice(
        Object.keys(TOKENS).length / 2,
        Object.keys(TOKENS).length,
      );
      if (to) {
        accounts = accounts.concat(
          Array(Object.keys(TOKENS).length / 2).fill(to),
        );
        ids = ids.concat(ids);
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
  }, [user, to]);

  useEffect(() => {
    if (data) {
      setTokens(
        (data as TokenAmount[]).map((token) =>
          ethers.BigNumber.from(token).toNumber(),
        ),
      );
    }
  }, [data]);

  return (
    <Layout>
      <Flex justifyContent="space-between" alignItems="stretch" p={3}>
        <Box flex="4">
          <Stack>
            <Text as="h1" fontWeight={800} fontSize={"3xl"}>
              Select Your NFTs
            </Text>
            <Input ref={fromInputRef} placeholder="Enter to search your NFTs" />
            {isFetching ? (
              <Flex justifyContent={"center"} pt={4}>
                <Spinner />
              </Flex>
            ) : (
              <NFTCards
                tokenAmounts={tokens.slice(0, Object.keys(TOKENS).length / 2)}
              />
            )}
          </Stack>
        </Box>
        <Box flex="1.5">
          <Flex
            h="100vh"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <LogoIcon w={20} h={20} />
            <Button variant={"dark-shadow"} mb={4}>
              Next
            </Button>
            <Button variant={"dark-shadow"} onClick={() => router.back()}>
              Back
            </Button>
          </Flex>
        </Box>
        <Box flex="4">
          <Stack>
            <Text as="h2" fontWeight={800} fontSize={"3xl"}>
              Select Their NFTs
            </Text>
            <Input ref={toInputRef} placeholder="Enter to search their NFTs" />
            {isFetching ? (
              <Flex justifyContent={"center"} pt={4}>
                <Spinner />
              </Flex>
            ) : (
              <NFTCards
                tokenAmounts={tokens.slice(
                  Object.keys(TOKENS).length / 2,
                  Object.keys(TOKENS).length,
                )}
                name={toInputRef?.current?.value}
              />
            )}
          </Stack>
        </Box>
      </Flex>
    </Layout>
  );
};

export default TradePage;
