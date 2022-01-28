import { CheckIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Flex,
  FlexProps,
  HStack,
  Image,
  Stack,
  Stat,
  StatArrow,
  StatHelpText,
  StatNumber,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { WENTOKEN } from "../../constants/constants";
import theme from "../../theme/theme";
import { NFTCard } from "../Portfolio/PortfolioNFTCard";

interface NFTCardProps extends NFTCard, FlexProps {
  editCurrentSelection: (edit: 1 | -1) => void;
}

const TradeNFTCard = ({
  tokenId: collectionId,
  pnl,
  value,
  imageUrl,
  isTradeable,
  name,
  editCurrentSelection,
  ...rest
}: NFTCardProps) => {
  const [edit, setEdit] = useState<1 | -1>(1);
  const [selected, setSelected] = useState(false);
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      border-radius="20 20 0 0"
      onClickCapture={() => {
        editCurrentSelection(edit);
        setEdit((prev) => -prev as 1 | -1);
      }}
      {...rest}
    >
      <Box
        bg={useColorModeValue("white", "gray.800")}
        w={"full"}
        borderWidth="0px"
        rounded="lg"
        boxShadow={theme.shadows.light}
        transition={"opacity 0.1s ease-in"}
        _hover={{
          cursor: "pointer",
          opacity: 0.6,
        }}
        opacity={selected ? 0.6 : 1}
        onClickCapture={() => setSelected((prev) => !prev)}
        position="relative"
      >
        <Box>
          <Image
            src={imageUrl}
            alt={`${name} image`}
            roundedTop="lg"
            width={"60%"}
            mx="auto"
          />
          {selected && (
            <CheckIcon
              position={"absolute"}
              top={"2px"}
              right={"2px"}
              width={6}
              height={6}
              p={1}
              rounded={"md"}
              color={"green.400"}
              bg={"black"}
            />
          )}
        </Box>
        <Box p="3">
          <Flex mb={2}>
            {isTradeable && (
              <Badge rounded="full" px="2" fontSize="xs" colorScheme="green">
                Tradeable
              </Badge>
            )}
          </Flex>
          <HStack
            justifyContent="space-between"
            alignItems={"flex-start"}
            spacing={1}
          >
            <Stack width={"50%"} spacing={0}>
              <Text fontSize="xs" fontWeight="normal" isTruncated>
                {WENTOKEN[collectionId]}
              </Text>
              <Text fontSize="sm" fontWeight="semibold" lineHeight={1.1}>
                {name}
              </Text>
            </Stack>
            <Stat
              display={"flex"}
              width={"30%"}
              textAlign={"right"}
              justifyContent={"flex-end"}
            >
              <StatNumber fontSize={"xs"}>{value}</StatNumber>
              <StatHelpText mb={0}>
                <StatArrow type="increase" />
                <Text fontSize={"xs"} display={"inline-block"}>
                  {pnl}
                </Text>
              </StatHelpText>
            </Stat>
          </HStack>
        </Box>
      </Box>
    </Flex>
  );
};

export default TradeNFTCard;
