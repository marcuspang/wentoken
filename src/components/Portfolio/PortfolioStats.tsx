import {
  Stack,
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Spinner,
} from "@chakra-ui/react";
import PortfolioSum from "./PortfolioSum";

interface PortfolioStatsProps {
  sum: number;
  tokens: number[];
  isLoading: boolean;
}

const PortfolioStats = ({ sum, tokens, isLoading }: PortfolioStatsProps) => {
  return (
    <Stack>
      <PortfolioSum sum={sum} />
      <StatGroup pt={4}>
        <Stat size="md">
          <StatLabel fontSize="lg">No. of collections</StatLabel>
          <StatNumber fontSize={"4xl"} fontWeight={800}>
            {isLoading ? <Spinner /> : tokens.length}
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
