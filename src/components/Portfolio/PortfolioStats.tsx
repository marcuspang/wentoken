import {
  Spinner,
  Stack,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { ETH_PRICE, MINT_PRICE } from "../../constants/constants";

interface PortfolioStatsProps {
  sum: number;
  tokens: number[];
  isLoading: boolean;
}

const PortfolioStats = ({ sum, tokens, isLoading }: PortfolioStatsProps) => {
  return (
    <Stack>
      <Stat size="md">
        <StatLabel fontSize="lg">NFT Net Worth</StatLabel>
        <StatNumber fontSize={"5xl"} fontWeight={800}>
          ${(sum && sum * MINT_PRICE * ETH_PRICE) || 0}
        </StatNumber>
        <StatHelpText>
          <StatArrow type="increase" fontSize={"md"} />
          3.16%
        </StatHelpText>
      </Stat>
      <StatGroup pt={4}>
        <Stat size="md">
          <StatLabel fontSize="lg">No. of collections</StatLabel>
          <StatNumber fontSize={"4xl"} fontWeight={800}>
            {isLoading ? <Spinner /> : tokens.filter(Boolean).length}
          </StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />1
          </StatHelpText>
        </Stat>
        <Stat size="md">
          <StatLabel fontSize="lg">No. of tokens</StatLabel>
          <StatNumber fontSize={"4xl"} fontWeight={800}>
            {isLoading ? <Spinner /> : sum}
          </StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            12
          </StatHelpText>
        </Stat>
        <Stat size="md">
          <StatLabel fontSize="lg">Top Collection</StatLabel>
          <StatNumber fontSize={"4xl"} fontWeight={800}>
            {isLoading ? <Spinner /> : Math.max(0, ...tokens)}
          </StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            12
          </StatHelpText>
        </Stat>
      </StatGroup>
    </Stack>
  );
};

export default PortfolioStats;
