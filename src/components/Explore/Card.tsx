import {
    Flex,
    Circle,
    Box,
    Image,
    Badge,
    useColorModeValue,
    Icon,
    chakra,
    Tooltip,
    VStack,
    Stack,
    Button,
  } from '@chakra-ui/react';
 import {CheckIcon} from '@chakra-ui/icons'

  import { FiShoppingCart } from 'react-icons/fi';
  
  const data = {
    isTradeable: true,
    imageURL:
      'https://storage.googleapis.com/prod.static-assets.parallelnft.com/card-art/Marcolian_Orb_Se-1.gif',
    collection: 'Parallel Alpha',
    name: 'Marcolian Parallel Collectible Card Back',
    value: '0.3 ETH',
    pnl: '3.1%',
  };

  function Card() {
    return (
      <Flex p={30} w="full" alignItems="center" justifyContent="center" border-radius='20 20 0 0'>
        <Box
          bg={useColorModeValue('white', 'gray.800')}
          maxW="sm"
          borderWidth="0px"
          rounded="lg"
          shadow="lg"
          position="relative">
  
          <Image
            src={data.imageURL}
            alt={`Picture of ${data.name}`}
            roundedTop="lg"
          />
  
          <Box p="4">
            <Box d="flex" alignItems="baseline" mb='1px'>
              {data.isTradeable && (
                <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="green">
                  Tradeable
                </Badge>
              )}
            </Box>
            <Flex justifyContent='space-between'>
                <Box flexGrow='1'>
                    <Flex flexDirection='column'>
                        <Box fontsize="2sm" fontWeight="normal" isTruncated>
                            {data.collection}
                        </Box>
                        <Box fontsize="2md" fontWeight="semibold">
                            {data.name}
                        </Box>
                    </Flex>
                </Box>
                <Box flexGrow='1'>
                    <Flex flexDirection='column'>
                        <Box>{data.value}</Box>
                        <Box>{data.pnl}</Box>
                    </Flex>
                </Box>
            </Flex>
            <Flex justifyContent='space-evenly'>
                <Button minW='30%' maxW='50%' fontSize="2l" color={useColorModeValue('gray.800', 'white')}>BUY</Button>
                <Button minW='30%' maxW='50%' fontSize="2l" color={useColorModeValue('gray.800', 'white')}>TRADE</Button>
            </Flex>
          </Box>
        </Box>
      </Flex>
    );
  }
  
  export default Card;