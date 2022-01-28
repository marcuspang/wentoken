import { Box, Flex, Checkbox, Text } from "@chakra-ui/react";

const options = [
  {
    name: "Tradeable cards only",
    defaultCheckValue: false,
  },
  {
    name: "wentoken",
    defaultCheckValue: false,
  },
  {
    name: "nowtoken",
    defaultCheckValue: false,
  },
];

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
    <Flex justifyContent={"flex-start"} alignItems={"center"}>
      <Text fontSize={"md"} mr={4}>
        Filter By:
      </Text>
      <Flex flexWrap={"wrap"} gap={4}>
        {options.map((option, index) => (
          <Checkbox
            colorScheme={"green"}
            key={index}
            defaultIsChecked={option.defaultCheckValue}
          >
            <Text fontSize={"md"}>{option.name}</Text>
          </Checkbox>
        ))}
      </Flex>
    </Flex>
  );
};

export default ExploreFilter;
