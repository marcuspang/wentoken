import {
  Badge,
  Box,
  Button,
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
import { useRouter } from "next/router";
import theme from "../../theme/theme";

export interface NFTCard {
  tokenId: number;
  isTradeable: boolean;
  imageUrl: string;
  name: string;
  value: string;
  pnl: string;
}

interface NFTCardProps extends NFTCard, FlexProps {
  onClick: () => void;
  tokenAmount: number;
}

const PortfolioNFTCard = ({
  tokenId,
  pnl,
  value,
  imageUrl,
  isTradeable,
  name,
  tokenAmount,
  onClick,
  ...props
}: NFTCardProps) => {
  const router = useRouter();
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
            {isTradeable ? (
              <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="green">
                Tradeable
              </Badge>
            ) : (
              <Badge
                rounded="full"
                px="2"
                fontSize="0.8em"
                colorScheme="white"
                color="white"
              >
                Untradeable
              </Badge>
            )}
          </Box>
          <HStack
            justifyContent="space-between"
            alignItems={"flex-start"}
            spacing={1}
            mb={4}
          >
            <Stack width={"67%"} spacing={0}>
              <Text fontSize="sm" fontWeight="normal" isTruncated>
                {"wentoken"}
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
          <Flex justifyContent="space-evenly">
            <Button
              minW="30%"
              maxW="50%"
              variant={"normal"}
              onClick={() =>
                router.push(
                  "/portfolio/sell/?tokenId=" +
                    tokenId +
                    "&amount=" +
                    tokenAmount,
                )
              }
            >
              Sell
            </Button>
            <Button
              minW="30%"
              maxW="50%"
              variant={"normal-dark"}
              onClick={onClick}
            >
              Trade
            </Button>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default PortfolioNFTCard;
