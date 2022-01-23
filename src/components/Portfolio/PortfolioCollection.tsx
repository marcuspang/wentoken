import { Box, Flex, Text } from "@chakra-ui/react";
import { TOKENS } from "../../constants/constants";
import NFTCard from "../Explore/NFTCard";
import { imageUris } from "../../constants/constants";

interface PortfolioCollectionProps {
  tokenAmount: number;
  tokenId: number;
}

const PortfolioCollection = ({
  tokenAmount,
  tokenId,
}: PortfolioCollectionProps) => {
  return (
    <Box mt={6}>
      <Text as="h2" fontSize={"4xl"} fontWeight={600} mb={2}>
        {TOKENS[tokenId]}
      </Text>
      <Flex flexWrap={"wrap"} gap={4}>
        {Array.from(Array(tokenAmount), (_, index) => index).map((index) => (
          <NFTCard
            key={index}
            collectionId={0}
            imageUrl={"https://cloudflare-ipfs.com/ipfs/" + imageUris[tokenId]}
            isTradeable
            name="potato"
            pnl="1 ETH"
            value="1 ETH"
            flex={"calc(100% / 3 - 1rem)"}
            pb={3}
          />
        ))}
      </Flex>
    </Box>
  );
};

export default PortfolioCollection;
