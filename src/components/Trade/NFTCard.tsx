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
import { TOKENS } from "../../constants/constants";
import { NFTCard } from "../Explore/NFTCard";

interface NFTCardProps extends NFTCard, FlexProps {}

const NFTCard = ({
  collectionId,
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
        boxShadow={"lg"}
        position="relative"
      >
        <Image
          src={imageUrl}
          alt={`${name} image`}
          roundedTop="lg"
          width={"60%"}
          mx="auto"
        />
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
                {TOKENS[collectionId]}
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

export default NFTCard;
