import { Box, Flex, Checkbox } from "@chakra-ui/react";

const options = [
    {
        'name': 'Tradeable cards only',
        'defaultCheckValue': false
    },
    {
        'name': 'some other options like pnl',
        'defaultCheckValue': false
    }
]

// const checked = () => {
//     const handleCheck = (event) => {
//       if (event.key === 'Enter') {
//         console.log('do validate')
//       }
//     }
  
//     return <input type="text" onKeyDown={handleKeyDown} />
//   }

const ExploreFilter = () => {
    return (
        <Box>
            <Flex justifyContent={'flex-start'}>
                <Box minW='8vw' alignSelf={'center'} fontSize={'xs'} pl={'10px'}>Filter By:</Box>
                <Box alignSelf={'center'}>
                    <Flex flexWrap={"wrap"} gap={4}>
                        {options.map((option, index) => (
                            <Checkbox
                                colorScheme={'green'}
                                key={index}
                                defaultIsChecked={option.defaultCheckValue}
                                maxW={"calc(100% / 4 - 1rem)"}
                                flex={"calc(100% / 4 - 1rem)"}
                            >{option.name}</Checkbox>
                        ))}
                    </Flex>
                </Box>
            </Flex>
        </Box>

    );
};

export default ExploreFilter;
