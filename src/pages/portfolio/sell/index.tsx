import { Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMoralis } from "react-moralis";
import CustomSpinner from "../../../components/Layout/CustomSpinner";
import Layout from "../../../components/Layout/Layout";
import SellConfirmation from "../../../components/Sell/SellConfirmation";
import SellNFTCard from "../../../components/Sell/SellNFTCard";
import { imageUris, TOKENS } from "../../../constants/constants";

const SellPage: NextPage = () => {
  const router = useRouter();
  const { user } = useMoralis();
  const tokenId = router.query.tokenId ? +router.query.tokenId : undefined;
  const amount = router.query.amount ? +router.query.amount : undefined;

  const [currentAmount, setCurrentAmount] = useState(amount);
  const [currentValue, setCurrentValue] = useState(0.01);

  const onAmountChange = (valueAsString: string, valueAsNumber: number) => {
    setCurrentAmount(valueAsNumber);
  };

  const onValueChange = (valueAsString: string, valueAsNumber: number) => {
    setCurrentValue(valueAsNumber);
  };

  return (
    <Layout>
      <Flex
        justifyContent="space-between"
        alignItems="stretch"
        p={3}
        maxW={"6xl"}
        mx={"auto"}
      >
        {!tokenId || !amount ? (
          <CustomSpinner flex={1} />
        ) : (
          <SellNFTCard
            collectionName="wentoken"
            imageUrl={"https://cloudflare-ipfs.com/ipfs/" + imageUris[tokenId]}
            isTradeable
            from={user?.get("ethAddress")}
            name={TOKENS[tokenId] + ` x${currentAmount || 0}`}
            pnl="0.01 ETH"
            value={currentValue + " ETH"}
            tokenId={tokenId}
            flex={1}
            p={10}
          />
        )}
        {!tokenId || !amount ? (
          <CustomSpinner flex={1} />
        ) : (
          <SellConfirmation
            from={user?.get("ethAddress")}
            maxAmount={amount}
            amount={currentAmount!}
            value={currentValue}
            onAmountChange={onAmountChange}
            onValueChange={onValueChange}
            tokenId={tokenId}
          />
        )}
      </Flex>
    </Layout>
  );
};

export default SellPage;
