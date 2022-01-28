import { Flex } from "@chakra-ui/react";
import { wentokenImages, WENTOKEN } from "../../constants/constants";
import TradeConfirmationNFTCard from "./TradeConfirmationNFTCard";

interface TradeConfirmationNFTCardsProps {
  tokenAmounts: number[];
}

const TradeConfirmationNFTCards = ({
  tokenAmounts,
}: TradeConfirmationNFTCardsProps) => {
  return (
    <Flex flexWrap={"wrap"} gap={4} justifyContent={"space-around"} mb={5}>
      {tokenAmounts.map((tokenAmount, tokenId) =>
        Array.from(Array(tokenAmount), (_, index) => index).map((index) => (
          <TradeConfirmationNFTCard
            key={index}
            tokenId={tokenId}
            imageUrl={
              "https://cloudflare-ipfs.com/ipfs/" + wentokenImages[tokenId]
            }
            isTradeable
            //   isTradeable={Math.random() >= 0.5}
            name={WENTOKEN[tokenId] + " #" + (+index + 1)}
            pnl="0.01 ETH"
            value="0.01 ETH"
            maxW={"calc(100% / 3 - 1rem)"}
            flex={"calc(100% / 3 - 1rem)"}
            pb={3}
          />
        )),
      )}
    </Flex>
  );
};

export default TradeConfirmationNFTCards;
