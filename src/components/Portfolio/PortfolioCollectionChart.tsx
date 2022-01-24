import { Box, Button, Flex, HStack, Spacer, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import PortfolioComposedChart from "../Portfolio/PortfolioComposedChart";
import PortfolioLineChart from "../Portfolio/PortfolioLineChart";
import PortfolioScatterChart from "../Portfolio/PortfolioScatterChart";

const PortfolioCollectionChart = () => {
  return (
    <Box mt={6}>
      <Flex>
        <Spacer />
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
      <Flex
        gap={4}
        justifyContent={"space-around"}
        flexWrap={{ base: "wrap", lg: "nowrap" }}
      >
        <PortfolioComposedChart flex={"33%"} />
        <PortfolioScatterChart flex={"33%"} />
        <PortfolioLineChart flex={"33%"} />
      </Flex>
    </Box>
  );
};

export default PortfolioCollectionChart;
