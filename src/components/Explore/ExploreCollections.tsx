import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import {
  createTokenListingOptions,
  wenTokenAddress,
} from "../../util/createTokenOptions";
import CustomSpinner from "../Layout/CustomSpinner";
import ExploreCollection from "./ExploreCollection";

export interface Listing {
  seller: string;
  price: number;
  tokenCount: number;
  tokenId: number;
}

const ExploreCollections = () => {
  const { isWeb3EnableLoading, isInitializing, isAuthenticating } =
    useMoralis();
  const { fetch, isLoading } = useWeb3ExecuteFunction();
  const { fetch: listingIndexFetch } = useWeb3ExecuteFunction();
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    listingIndexFetch({
      params: createTokenListingOptions("getListingIndex", {}),
      onSuccess: (res) => {
        for (let i = 0; i < (res as number); i++) {
          fetch({
            params: createTokenListingOptions("getListing", {
              contractAddress: wenTokenAddress,
              listingId: i,
            }),
            onSuccess: (res) => {
              setListings((prev) => {
                if (
                  (res as Listing).seller ===
                  "0x0000000000000000000000000000000000000000"
                ) {
                  return prev;
                }
                return [...prev, { ...(res as Listing) }];
              });
            },
            onError: (err) => console.log("error", i, err),
          });
        }
      },
    });

    return () => {
      setListings([]);
    };
  }, [isWeb3EnableLoading, isInitializing, isAuthenticating]);

  return (
    <Box px={3}>
      {isLoading ? (
        <CustomSpinner mt={10} />
      ) : (
        <ExploreCollection collectionName="wentoken" listings={listings} />
      )}
    </Box>
  );
};

export default ExploreCollections;
