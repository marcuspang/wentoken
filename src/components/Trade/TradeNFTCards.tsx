import { Flex } from "@chakra-ui/react";
import { wentokenImages, WENTOKEN } from "../../constants/constants";
import TradeNFTCard from "./TradeNFTCard";

interface NFTCardsProps {
  tokenAmounts: number[];
  name?: string;
  editSelection: (tokenId: number, edit: 1 | -1) => void;
}

// TODO better way to manage number of NFTs rendered
const TradeNFTCards = ({
  tokenAmounts,
  name,
  editSelection,
}: NFTCardsProps) => {
  // const [start, setStart] = useState(0);
  // const [end, setEnd] = useState(8);
  // const [count, setCount] = useState(0);

  return (
    <Flex flexWrap={"wrap"} gap={4} justifyContent={"space-around"}>
      {tokenAmounts.map((tokenAmount, tokenId) =>
        Array.from(Array(tokenAmount), (_, index) => index)
          .map((index) => {
            return (
              <TradeNFTCard
                key={index}
                tokenId={0}
                imageUrl={
                  "https://cloudflare-ipfs.com/ipfs/" + wentokenImages[tokenId]
                }
                isTradeable
                name={WENTOKEN[tokenId] + " #" + (+index + 1)}
                editCurrentSelection={(edit: 1 | -1) =>
                  editSelection(tokenId, edit)
                }
                pnl="0.01 ETH"
                value="0.01 ETH"
                w={"full"}
                maxW={"calc(100% / 3 - 1rem)"}
                flex={"calc(100% / 3 - 1rem)"}
                pb={3}
              />
            );
          })
          .slice(0, 10),
      )}
    </Flex>
  );
};

export default TradeNFTCards;
