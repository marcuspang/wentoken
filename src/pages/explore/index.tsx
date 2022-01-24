import { HStack, Text } from "@chakra-ui/react";
import ExploreCollections from "../../components/Explore/ExploreCollections";
import ExploreFilter from "../../components/Explore/ExploreFilter";
import Layout from "../../components/Layout/Layout";

const ExplorePage = () => (
  <Layout>
    <HStack h="100%" w="100%" flexDirection="column">
      <Text as="h1" fontWeight={"bold"} fontSize="4xl" mt={10} mb={7}>
        Explore NFTs
      </Text>
      <ExploreFilter />
    </HStack>
    <ExploreCollections />
  </Layout>
);

export default ExplorePage;
