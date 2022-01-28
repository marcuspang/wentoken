import {
  IconButton,
  Spinner,
  Stack,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  useToast,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { FaCheck } from "react-icons/fa";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { ETH_PRICE, MINT_PRICE } from "../../constants/constants";
import { createTokenListingOptions } from "../../util/createTokenOptions";

interface PortfolioStatsProps {
  sum: number;
  tokens: number[];
  isLoading: boolean;
  balance: number;
}

const PortfolioStats = ({
  sum,
  tokens,
  isLoading,
  balance,
}: PortfolioStatsProps) => {
  const { fetch } = useWeb3ExecuteFunction();
  const { user } = useMoralis();
  const totalSum = (sum && sum * MINT_PRICE * ETH_PRICE).toFixed(2) || 0;
  const toast = useToast();

  const retrieveBalance = () => {
    fetch({
      params: createTokenListingOptions("withdrawFunds", {
        amount: ethers.utils.parseEther(balance.toString()),
        to: user?.get("ethAddress"),
      }),
    });
  };

  return (
    <Stack>
      <StatGroup>
        <Stat size="md">
          <StatLabel fontSize="lg">NFT Net Worth</StatLabel>
          <StatNumber fontSize={"5xl"} fontWeight={800}>
            ${totalSum}
          </StatNumber>
          <StatHelpText>
            <StatArrow type="increase" fontSize={"md"} />
            {totalSum ? "3.16%" : 0}
          </StatHelpText>
        </Stat>
        <Stat size="md">
          <StatLabel fontSize="lg">
            Outstanding balance to claim
            {balance ? (
              <IconButton
                ml={3}
                aria-label="claim balance"
                variant={"ghost"}
                onClick={retrieveBalance}
                icon={<FaCheck />}
              />
            ) : undefined}
          </StatLabel>
          <StatNumber fontSize={"4xl"} fontWeight={800}>
            {balance} ETH
          </StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />1
          </StatHelpText>
        </Stat>
      </StatGroup>
      <StatGroup pt={4}>
        <Stat size="md">
          <StatLabel fontSize="lg">No. of collections</StatLabel>
          <StatNumber fontSize={"4xl"} fontWeight={800}>
            {isLoading ? <Spinner /> : tokens.filter(Boolean).length}
          </StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            {totalSum ? 1 : 0}
          </StatHelpText>
        </Stat>
        <Stat size="md">
          <StatLabel fontSize="lg">No. of tokens</StatLabel>
          <StatNumber fontSize={"4xl"} fontWeight={800}>
            {isLoading ? <Spinner /> : sum}
          </StatNumber>
          <StatHelpText>
            <StatArrow type="increase" /> {totalSum ? 1 : 0}
          </StatHelpText>
        </Stat>
        <Stat size="md">
          <StatLabel fontSize="lg">Top collection count</StatLabel>
          <StatNumber fontSize={"4xl"} fontWeight={800}>
            {isLoading ? <Spinner /> : Math.max(0, ...tokens)}
          </StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />1
          </StatHelpText>
        </Stat>
      </StatGroup>
    </Stack>
  );
};

export default PortfolioStats;
