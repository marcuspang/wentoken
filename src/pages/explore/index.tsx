import { Box, Flex, VStack } from "@chakra-ui/react";
import NFTCard from "../../components/Explore/NFTCard";

const ExplorePage = () => (
  <Box>
    <VStack spacing="0">
      <Box w="100%" h="40px" bg="yellow.200" align="center">
        Explore NFTs
      </Box>
      <Box w="100%" h="40px" bg="tomato" align="center">
        filter
      </Box>
      <Box flexGrow="1" h="full" bg="pink.100">
        <Flex w="100%">
          <NFTCard />
          <NFTCard />
          <NFTCard />
        </Flex>
      </Box>
    </VStack>
  </Box>
);

// function ExplorePage() {
//     return (
//       <div>explore page</div>
//     )
//     }

// use the following when can retrieve the NFT data

// function ExplorePage({nfts}) {
//   return (
//     <ul>
//       {nfts.map((nft) => (
//         <li>{nft.title}</li>
//         <li>{nft.img}</li>
//         <li>{nft.description}</li>
//       ))}
//     </ul>
//   )
//   }

// // This function gets called at build time
// export async function getStaticProps() {
//   // Call an external API endpoint to get posts
//   const res = await fetch('https://.../nfts') // fetch nfts from opensea
//   const posts = await res.json()

//   // By returning { props: { nfts } }, the ExplorePage component
//   // will receive `nfts` as a prop at build time
//   return {
//     props: {
//       nfts,
//     },
//   }
// }

export default ExplorePage;
