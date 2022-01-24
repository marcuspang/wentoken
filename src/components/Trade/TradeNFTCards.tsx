import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import { imageUris, TOKENS } from "../../constants/constants";
import TradeNFTCard from "./TradeNFTCard";

interface NFTCardsProps {
  tokenAmounts: number[];
  name?: string;
}

const NFTCards = ({ tokenAmounts, name }: NFTCardsProps) => {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(8);
  const [count, setCount] = useState(0);

  return (
    <Flex flexWrap={"wrap"} gap={4} justifyContent={"space-around"}>
      {tokenAmounts.map((tokenAmount, tokenId) =>
        Array.from(Array(tokenAmount), (_, index) => index)
          .map((index) => {
            return (
              <TradeNFTCard
                key={index}
                collectionId={0}
                imageUrl={
                  "https://cloudflare-ipfs.com/ipfs/" + imageUris[tokenId]
                }
                isTradeable
                name={TOKENS[tokenId] + " #" + (+index + 1)}
                pnl="0.01 ETH"
                value="0.01 ETH"
                w={"full"}
                maxW={"calc(100% / 3 - 1rem)"}
                flex={"calc(100% / 3 - 1rem)"}
                pb={3}
              />
            );
          })
          .slice(0, 4),
      )}
    </Flex>
  );
};

export default NFTCards;
