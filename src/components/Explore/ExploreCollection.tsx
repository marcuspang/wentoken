import {
  Box,
  Button,
  Flex,
  HStack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  useMoralis,
  useNativeBalance,
  useWeb3ExecuteFunction,
} from "react-moralis";
import { wentokenImages, WENTOKEN } from "../../constants/constants";
import {
  createTokenListingOptions,
  wenTokenAddress,
} from "../../util/createTokenOptions";
import { Listing } from "./ExploreCollections";
import ExploreNFTCard from "./ExploreNFTCard";
import ExplorePurchaseModal from "./ExplorePurchaseModal";

interface ExploreCollectionProps {
  listings: Listing[];
  collectionName: string;
}

const ExploreCollection = ({
  listings,
  collectionName,
}: ExploreCollectionProps) => {
  const { fetch } = useWeb3ExecuteFunction();
  const { user } = useMoralis();
  const { data: amount } = useNativeBalance({ chain: "ropsten" });
  const { isOpen, onClose, onOpen } = useDisclosure();

  const router = useRouter();
  const toast = useToast();

  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(8);
  const [selectedListingIndex, setSelectedListingIndex] = useState(-1);
  const [selectedPurchaseAmount, setSelectedPurchaseAmount] = useState(1);

  // to prevent updates when this component is unmounted
  useEffect(() => {
    return () => {
      setStartIndex(0);
      setEndIndex(8);
      setSelectedListingIndex(-1);
      setSelectedPurchaseAmount(1);
    };
  }, []);

  const purchaseNFT = async () => {
    if (user) {
      if (
        amount.balance &&
        selectedListingIndex !== -1 &&
        ethers.BigNumber.from(amount.balance!).gte(
          ethers.BigNumber.from(listings[selectedListingIndex].price).mul(
            selectedPurchaseAmount,
          ),
        )
      ) {
        await fetch({
          params: createTokenListingOptions(
            "purchaseToken",
            {
              contractAddress: wenTokenAddress,
              listingId: selectedListingIndex,
              amount: selectedPurchaseAmount,
            },
            ethers.BigNumber.from(listings[selectedListingIndex].price)
              .mul(selectedPurchaseAmount)
              .toString(),
          ),
          onSuccess: () => {
            toast({
              status: "success",
              title: `Bought ${selectedPurchaseAmount} ${
                WENTOKEN[listings[selectedListingIndex].tokenId]
              } token!`,
              description:
                "Go to your portfolio page to see it once the transaction is finished",
              isClosable: true,
            });
            router.push("/portfolio/" + user.get("ethAddress"));
          },
        });
      } else {
        toast({
          isClosable: true,
          status: "error",
          title: "Not enough ETH",
          description: "Please add more ethereum to your account with faucets",
        });
      }
    } else {
      toast({
        status: "info",
        title: "Please login to purchase",
        isClosable: true,
      });
    }
  };

  return (
    <Box mt={6}>
      <ExplorePurchaseModal
        isOpen={isOpen}
        onClose={onClose}
        purchaseNFT={purchaseNFT}
        selectedPurchaseAmount={selectedPurchaseAmount}
        maxCount={
          listings[selectedListingIndex] &&
          listings[selectedListingIndex].tokenCount
        }
        selectedPurchaseAmountOnChange={(_, value) =>
          setSelectedPurchaseAmount(value)
        }
      />
      <Text as="h2" fontSize={"4xl"} fontWeight={600} mb={2}>
        {collectionName}
      </Text>
      <Flex flexWrap={"wrap"} gap={4} justifyContent={"space-around"}>
        {listings &&
          listings.slice(startIndex, endIndex).map((listing, index) => (
            <ExploreNFTCard
              key={index}
              tokenId={listing.tokenId}
              imageUrl={
                "https://cloudflare-ipfs.com/ipfs/" +
                wentokenImages[listing.tokenId]
              }
              isTradeable
              name={WENTOKEN[listing.tokenId] + " x" + listing.tokenCount}
              value={ethers.utils.formatUnits(listing.price) + " ETH"}
              onSubmit={() => {
                setSelectedListingIndex(index);
                onOpen();
              }}
              from={listing.seller}
              maxW={"calc(100% / 4 - 1rem)"}
              flex={"calc(100% / 4 - 1rem)"}
              pb={3}
            />
          ))}
      </Flex>
      <HStack py={3} justifyContent={"space-between"}>
        <Button
          variant={"normal"}
          isDisabled={startIndex === 0}
          onClick={() => {
            setStartIndex((prev) => prev - 8);
            setEndIndex((prev) => prev - 8);
          }}
        >
          Previous
        </Button>
        <Button
          variant={"normal"}
          isDisabled={listings.length - startIndex <= 8}
          onClick={() => {
            setStartIndex((prev) => prev + 8);
            setEndIndex((prev) => prev + 8);
          }}
        >
          Next
        </Button>
      </HStack>
    </Box>
  );
};

export default ExploreCollection;
