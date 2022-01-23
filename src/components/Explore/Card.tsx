import {
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Stack,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import theme from "../../theme/theme";

const data = {
  isTradeable: true,
  imageURL:
    "https://storage.googleapis.com/prod.static-assets.parallelnft.com/card-art/Marcolian_Orb_Se-1.gif",
  collection: "Parallel Alpha",
  name: "Marcolian Parallel Collectible Card Back",
  value: "0.3 ETH",
  pnl: "3.1%",
};

function Card() {
  return (
    <Flex
      p={30}
      w="full"
      alignItems="center"
      justifyContent="center"
      border-radius="20 20 0 0"
    >
      <Box
        bg={useColorModeValue("white", "gray.800")}
        maxW="sm"
        borderWidth="0px"
        rounded="lg"
        shadow="lg"
        position="relative"
      >
        <Image
          src={data.imageURL}
          alt={`Picture of ${data.name}`}
          roundedTop="lg"
        />

        <Box p="4">
          <Box d="flex" alignItems="baseline" mb={2}>
            {data.isTradeable && (
              <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="green">
                Tradeable
              </Badge>
            )}
          </Box>
          <HStack justifyContent="space-between" spacing={1} mb={4}>
            <Stack width={"70%"} spacing={0}>
              <Text fontSize="sm" fontWeight="normal" isTruncated>
                {data.collection}
              </Text>
              <Text fontSize="md" fontWeight="semibold" lineHeight={1.1}>
                {data.name}
              </Text>
            </Stack>
            <Stat
              display={"flex"}
              width={"30%"}
              textAlign={"right"}
              justifyContent={"flex-end"}
            >
              <StatNumber fontSize={"md"}>{data.value}</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                {data.pnl}
              </StatHelpText>
            </Stat>
          </HStack>
          <Flex justifyContent="space-evenly">
            <Button minW="30%" maxW="50%" variant={"shadow"}>
              BUY
            </Button>
            <Button minW="30%" maxW="50%" variant={"dark-shadow"}>
              TRADE
            </Button>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}

export default Card;
