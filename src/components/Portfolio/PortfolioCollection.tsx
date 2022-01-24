import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { imageUris, TOKENS } from "../../constants/constants";
import NFTCard from "./PortfolioNFTCard";

interface PortfolioCollectionProps {
  tokenAmount: number;
  tokenId: number;
}

const PortfolioCollection = ({
  tokenAmount,
  tokenId,
}: PortfolioCollectionProps) => {
  const router = useRouter();
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(8);

  return (
    <Box mt={6}>
      <Flex flexWrap={"wrap"} gap={4} justifyContent={"space-around"}>
        {Array.from(Array(tokenAmount), (_, index) => index)
          .slice(startIndex, endIndex)
          .map((index) => (
            <NFTCard
              key={index}
              collectionId={tokenId}
              imageUrl={
                "https://cloudflare-ipfs.com/ipfs/" + imageUris[tokenId]
              }
              isTradeable
              name={TOKENS[tokenId] + " #" + (+index + 1)}
              pnl="0.01 ETH"
              value="0.01 ETH"
              maxW={"calc(100% / 4 - 1rem)"}
              flex={"calc(100% / 4 - 1rem)"}
              onClick={() => router.push("/trade/selection")}
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

export default PortfolioCollection;
