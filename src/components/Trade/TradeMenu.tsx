import {
  Box,
  Button,
  Flex,
  Input,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRef } from "react";
import TradeNFTCards from "./TradeNFTCards";

interface TradeMenuProps {
  isLoading: boolean;
  tokenAmounts: number[];
  title: string;
  onOpen?: () => void;
  inputPlaceholder: string;
}

const TradeMenu = ({
  isLoading,
  tokenAmounts,
  title,
  inputPlaceholder,
  onOpen,
}: TradeMenuProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <Box flex="4">
      <Stack>
        {typeof onOpen === "function" ? (
          <Flex justifyContent={"space-between"}>
            <Text as="h1" fontWeight={800} fontSize={"3xl"}>
              {title}
            </Text>
            <Button onClick={onOpen} variant="dark-shadow">
              Edit Address
            </Button>
          </Flex>
        ) : (
          <Text as="h1" fontWeight={800} fontSize={"3xl"}>
            {title}
          </Text>
        )}
        <Input ref={inputRef} placeholder={inputPlaceholder} />
        {isLoading ? (
          <Flex justifyContent={"center"} pt={4}>
            <Spinner />
          </Flex>
        ) : !tokenAmounts.filter(Boolean).length ? (
          <Text textAlign={"center"} pt={4}>
            Nothing found :(
          </Text>
        ) : (
          <TradeNFTCards tokenAmounts={tokenAmounts} />
        )}
      </Stack>
    </Box>
  );
};

export default TradeMenu;
