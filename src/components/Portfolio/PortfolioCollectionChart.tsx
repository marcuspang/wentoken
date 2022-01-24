import { Box, Button, Flex, HStack, Spacer, Text } from "@chakra-ui/react";
import { useState } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { ChevronDownIcon  } from "@chakra-ui/icons";
import PortfolioComposedChart from '../Portfolio/PortfolioComposedChart'
import PortfolioLineChart from '../Portfolio/PortfolioLineChart'
import PortfolioScatterChart from '../Portfolio/PortfolioScatterChart'

interface PortfolioCollectionChartProps {
}

const PortfolioCollectionChart = ({}: PortfolioCollectionChartProps) => {
  return (
    <Box mt={6}>
      <Flex>
      <Text as="h2" fontSize={"4xl"} fontWeight={600} mb={2} py={3}>
        {/* {TOKENS[tokenId]} */} Collection name placeholder
      </Text>
      <Spacer/>
      <HStack py={3} justifyContent={"space-between"}>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            7 Days
          </MenuButton>
          <MenuList>
            <MenuItem>7 Days</MenuItem>
            <MenuItem>30 Days</MenuItem>
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Sort By
          </MenuButton>
          <MenuList>
            <MenuItem>PnL</MenuItem>
            <MenuItem>Unique Holders</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
      </Flex>
      <Flex  gap={4} justifyContent={"space-around"}>
        <PortfolioComposedChart/>
        <PortfolioScatterChart/>
        <PortfolioLineChart/>
            {/* <NFTCards
              key={index}
              collectionId={tokenId}
              // imageUrl={
              //   "https://cloudflare-ipfs.com/ipfs/" + imageUris[tokenId]
              // }
              isTradeable
              name={TOKENS[tokenId] + " #" + (+index + 1)}
              pnl="0.01 ETH"
              value="0.01 ETH"
              maxW={"calc(100% / 4 - 1rem)"}
              flex={"calc(100% / 4 - 1rem)"}
              pb={3}
            /> */}
          {/* ))} */}
      </Flex>
    </Box>
  );
};

export default PortfolioCollectionChart;
