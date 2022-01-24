import { Box, Flex, VStack, Container } from "@chakra-ui/react";
import ExploreCollection from "../../components/Explore/ExploreCollection";
import ExploreFilter from "../../components/Explore/ExploreFilter";
import Layout from "../../components/Layout/Layout";

const ExplorePage = () => (
  <Layout>
    <Container maxW='container.xl' p='5px 0 0 0'>
  <Box>
    <Flex h='100%' w='100%' flexDirection='column' justifyContent='center' alignItems='center'>
      <Box alignSelf='center' fontWeight={'semibold'}>
        EXPLORE NFTs
      </Box>
      <Box alignSelf='center' w='100%'>
        <ExploreFilter />
      </Box>
      <Box alignSelf='center' w='100%'>
        <ExploreCollection />
      </Box>
    </Flex> 
  </Box>
  </Container>
</Layout>


);

export default ExplorePage;
