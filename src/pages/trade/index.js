import { Box, VStack, Flex, Container, Button, Center } from '@chakra-ui/react';
import LogoIcon from '../../components/Layout/LogoIcon'
// import Card from '../../components/Trade/Card'

const TradePage = () => (
  <Container maxW='container.xl' p='0'>
    <Flex h='100vh' justifyContent='space-between' alignItems='stretch'>
        <Box h='100%' flex='4' bg='blue' p='15px 5px 5px 5px'>
            <Flex h='100%' justifyContent='flex-start' alignItems='center' flexDirection='column' gap='2%'>
                <Box alignSelf='flex-start'>SELECT YOUR NFTs</Box>
                <Box w='100%'>add search bar</Box>
                <Box flexGrow='1'>add scrollable section</Box>
            </Flex>
        </Box>
        <Box  flex='1.5' bg='red'>
            <Flex h='100vh' flexDirection='column' justifyContent='center' alignItems='center'>
                <Box alignSelf='center' bg='white'>
                    <LogoIcon/>
                </Box>
                <Box alignSelf='center'>
                    <Button>Next</Button>
                </Box>
                <Box alignSelf='center'>
                    <Button>Back</Button>
                </Box>
            </Flex>
        </Box>
        <Box h='100%' flex='4' bg='blue' p='15px 5px 5px 5px'>
            <Flex h='100%' justifyContent='flex-start' alignItems='center' flexDirection='column' gap='2%'>
                <Box alignSelf='flex-start'>SELECT THEIR NFTs</Box>
                <Box w='100%'>add search bar</Box>
                <Box flexGrow='1'>add scrollable section</Box>
            </Flex>
        </Box>
    </Flex>
    </Container>
);

export default TradePage