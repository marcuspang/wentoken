import { Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "../../../components/Layout/Layout";
import SellConfirmation from "../../../components/Sell/SellConfirmation";
import SellNFTCard from "../../../components/Sell/SellNFTCard";
import { imageUris, TOKENS } from "../../../constants/constants";

const SellPage: NextPage = () => {
  const router = useRouter();
  const { tokenId, amount } = router.query;

  const [currentAmount, setCurrentAmount] = useState(+amount);
  const [currentValue, setcurrentValue] = useState(0.01);

  const onChange = (valueAsString: string, valueAsNumber: number) => {
    setCurrentAmount(valueAsNumber);
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
        <SellNFTCard
          imageUrl={"https://cloudflare-ipfs.com/ipfs/" + imageUris[+tokenId]}
          isTradeable
          name={TOKENS[+tokenId] + " x" + +amount}
          pnl="0.01 ETH"
          value={currentValue + " ETH"}
          tokenId={+tokenId}
          flex={1}
          p={10}
        />
        <SellConfirmation
          maxAmount={+amount}
          tokenId={+tokenId}
          onChange={onChange}
        />
      </Flex>
    </Layout>
  );
};

export default SellPage;
