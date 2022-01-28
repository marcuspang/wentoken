import { Box, Button, Flex, HStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { wentokenImages, WENTOKEN } from "../../constants/constants";
import PortfolioNFTCard from "./PortfolioNFTCard";

interface PortfolioCollectionProps {
  tokens: number[];
}

const PortfolioCollection = ({ tokens }: PortfolioCollectionProps) => {
  const router = useRouter();
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(8);

  return (
    <Box mt={6}>
      <Flex flexWrap={"wrap"} gap={4} justifyContent={"space-around"}>
        {tokens.slice(startIndex, endIndex).map(
          (tokenAmount, tokenIndex) =>
            tokenAmount ? (
              <PortfolioNFTCard
                key={tokenIndex}
                tokenId={tokenIndex}
                imageUrl={
                  "https://cloudflare-ipfs.com/ipfs/" +
                  wentokenImages[tokenIndex]
                }
                isTradeable
                tokenAmount={tokenAmount}
                name={WENTOKEN[tokenIndex] + " x" + tokenAmount}
                pnl="0.01 ETH"
                value="0.01 ETH"
                maxW={"calc(100% / 4 - 1rem)"}
                flex={"calc(100% / 4 - 1rem)"}
                onClick={() => router.push("/trade/selection")}
                pb={3}
              />
            ) : null, // need this to prevent 00 from showing up
        )}
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
          isDisabled={tokens.length - startIndex <= 8}
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
