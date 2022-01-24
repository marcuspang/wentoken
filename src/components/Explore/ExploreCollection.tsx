import { Box, Button, Flex, HStack, Text, useToast } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import {
  useERC20Balances,
  useMoralis,
  useNativeBalance,
  useWeb3ExecuteFunction,
} from "react-moralis";
import { imageUris, MINT_PRICE, TOKENS } from "../../constants/constants";
import createTokenOptions from "../../util/createTokenOptions";
import ExploreNFTCard from "./ExploreNFTCard";

interface ExploreCollectionProps {
  tokenAmount: number;
  tokenId: number;
}

const ExploreCollection = ({
  tokenAmount,
  tokenId,
}: ExploreCollectionProps) => {
  const { data, fetch, isFetching, error } = useWeb3ExecuteFunction();
  const { user } = useMoralis();
  const { data: amount } = useNativeBalance({ chain: "ropsten" });

  const toast = useToast();

  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(8);

  const purchaseNFT = () => {
    if (user) {
      if (
        amount.balance &&
        +ethers.utils.formatEther(amount.balance) >= MINT_PRICE
      ) {
        fetch({
          params: createTokenOptions(
            "payToMint",
            {
              to: user.get("ethAddress"),
              id: tokenId,
              amount: 1,
              data: "0x00",
            },
            ethers.utils.parseEther("0.01").toString(),
          ),
        });
        if (!error) {
          toast({
            status: "success",
            title: "Bought 1 " + TOKENS[tokenId] + " token!",
            description:
              "Go to your portfolio page to see it once the transaction is finished",
            isClosable: true,
          });
        }
      } else {
        toast({
          isClosable: true,
          status: "error",
          title: "Not enough ETH",
          description: "Please add more ethereum to your account on faucets",
        });
      }
    } else {
      toast({
        status: "info",
        title: "Please login to purchase",
        isClosable: true,
      });
    }
  };

  return (
    <Box mt={6}>
      <Text as="h2" fontSize={"4xl"} fontWeight={600} mb={2}>
        {TOKENS[tokenId]}
      </Text>
      <Flex flexWrap={"wrap"} gap={4} justifyContent={"space-around"}>
        {Array.from(Array(tokenAmount), (_, index) => index)
          .slice(startIndex, endIndex)
          .map((index) => (
            <ExploreNFTCard
              key={index}
              collectionId={tokenId}
              imageUrl={
                "https://cloudflare-ipfs.com/ipfs/" + imageUris[tokenId]
              }
              isTradeable
              //   isTradeable={Math.random() >= 0.5}
              name={TOKENS[tokenId] + " #" + (+index + 1)}
              pnl="0.01 ETH"
              value="0.01 ETH"
              onEditSelection={purchaseNFT}
              maxW={"calc(100% / 4 - 1rem)"}
              flex={"calc(100% / 4 - 1rem)"}
              pb={3}
            />
          ))}
      </Flex>
      <HStack py={3} justifyContent={"space-between"}>
        <Button
          variant={"normal"}
          isDisabled={startIndex === 0}
          onClick={() => {
            setStartIndex((prev) => prev - 8);
            setEndIndex((prev) => prev - 8);
          }}
        >
          Previous
        </Button>
        <Button
          variant={"normal"}
          isDisabled={tokenAmount - startIndex <= 8}
          onClick={() => {
            setStartIndex((prev) => prev + 8);
            setEndIndex((prev) => prev + 8);
          }}
        >
          Next
        </Button>
      </HStack>
    </Box>
  );
};

export default ExploreCollection;
