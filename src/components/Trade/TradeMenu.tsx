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
  inputPlaceholder: string;
  onOpen?: () => void;
  editSelection: (
    tokenId: number,
    selection: "to" | "from",
    edit: 1 | -1,
  ) => void;
}

const TradeMenu = ({
  isLoading,
  tokenAmounts,
  title,
  inputPlaceholder,
  onOpen,
  editSelection,
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
          <TradeNFTCards
            tokenAmounts={tokenAmounts}
            editSelection={(tokenId: number, edit: 1 | -1) =>
              editSelection(
                tokenId,
                typeof onOpen === "function" ? "to" : "from",
                edit,
              )
            }
          />
        )}
      </Stack>
    </Box>
  );
};

export default TradeMenu;
