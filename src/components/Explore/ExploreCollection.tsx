import { Box, Flex } from "@chakra-ui/react";
import NFTCard from "../Explore/NFTCard";
import { fakecards } from "../../constants/constants"
import { useState } from "react";

interface ExploreCollectionProps {
}

const ExploreCollection = ({}: ExploreCollectionProps) => {
    const [checkedItems, setCheckedItems] = useState(false)

  return (
    <Box mt={6}>
      <Flex flexWrap={"wrap"} gap={4}>
        {fakecards.map((card, index) => (
          <NFTCard
            key={index}
            collectionId={card.collectionId}
            imageUrl={card.imageUrl}
            isTradeable={card.isTradeable}
            name={card.name}
            pnl={card.pnl}
            value={card.value}
            maxW={"calc(100% / 4 - 1rem)"}
            flex={"calc(100% / 4 - 1rem)"}
            pb={3}
          />
        ))}
      </Flex>
    </Box>
  );
};

export default ExploreCollection;
