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
import { TOKENS } from "../../constants/constants";
import theme from "../../theme/theme";
import { NFTCard } from "../Portfolio/PortfolioNFTCard";

interface NFTCardProps extends NFTCard, FlexProps {}

const SellNFTCard = ({
  tokenId,
  pnl,
  value,
  imageUrl,
  isTradeable,
  name,
  ...props
}: NFTCardProps) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      border-radius="20 20 0 0"
      {...props}
    >
      <Box
        bg={useColorModeValue("white", "gray.800")}
        w={"full"}
        borderWidth="0px"
        rounded="lg"
        boxShadow={theme.shadows.light}
        position="relative"
      >
        <Image
          src={imageUrl}
          alt={`${name} image`}
          roundedTop="lg"
          width={"60%"}
          mx="auto"
        />

        <Box p="4">
          <Box d="flex" alignItems="flex-start" mb={2}>
            {
              isTradeable ? (
                <Badge
                  rounded="full"
                  px="2"
                  fontSize="0.8em"
                  colorScheme="green"
                >
                  Tradeable
                </Badge>
              ) : (
                <Box h="19.2px"></Box>
              )
              //   <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="white" color="white">
              //   Untradeable
              // </Badge>
            }
          </Box>
          <HStack
            justifyContent="space-between"
            alignItems={"flex-start"}
            spacing={1}
            mb={4}
          >
            <Stack width={"67%"} spacing={0}>
              <Text fontSize="sm" fontWeight="normal" isTruncated>
                {TOKENS[tokenId]}
              </Text>
              <Text fontSize="md" fontWeight="semibold" lineHeight={1.1}>
                {name}
              </Text>
            </Stack>
            <Stat
              display={"flex"}
              width={"33%"}
              textAlign={"right"}
              justifyContent={"flex-end"}
            >
              <StatNumber fontSize={"md"}>{value}</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                {pnl}
              </StatHelpText>
            </Stat>
          </HStack>
        </Box>
      </Box>
    </Flex>
  );
};

export default SellNFTCard;
