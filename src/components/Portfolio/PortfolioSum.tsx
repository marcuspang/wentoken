import {
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";
import { ETH_PRICE, MINT_PRICE } from "../../constants/constants";

interface PortfolioSumProps {
  sum: number | undefined;
}

const PortfolioSum = ({ sum }: PortfolioSumProps) => {
  return (
    <Stat size="md">
      <StatLabel fontSize="lg">NFT Net Worth</StatLabel>
      <StatNumber fontSize={"5xl"} fontWeight={800}>
        ${(sum && sum * MINT_PRICE * ETH_PRICE) || 0}
      </StatNumber>
      <StatHelpText>
        <StatArrow type="increase" fontSize={"md"} />
        <Text fontSize={"md"} display={"inline-block"}>
          3.16%
        </Text>
      </StatHelpText>
    </Stat>
  );
};

export default PortfolioSum;
