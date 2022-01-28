import {
  Button,
  Flex,
  FormLabel,
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import theme from "../../theme/theme";

interface SellConfirmationProps {
  maxAmount: number;
  tokenId: number;
  onChange: (valueAsString: string, valueAsNumber: number) => void;
}

const SellConfirmation = ({
  maxAmount,
  tokenId,
  onChange,
}: SellConfirmationProps) => {
  const [amount, setAmount] = useState(1);
  return (
    <Stack
      ml={8}
      my={4}
      boxShadow={theme.shadows.light}
      p={6}
      gap={4}
      flex={1}
      rounded={"xl"}
    >
      <Text as="h1" fontSize={"3xl"} fontWeight={800}>
        Trade Information
      </Text>
      <Flex justifyContent="space-between" flexDir={"column"} gap={2}>
        <Stack>
          <FormLabel htmlFor="from" fontWeight={600} fontSize={"lg"} mb={0}>
            From
          </FormLabel>
          <Input variant={"filled"} bg={"gray.300"} id="from" disabled />
        </Stack>
        <Stack>
          <FormLabel fontWeight={600} fontSize={"lg"} mb={0}>
            Amount
          </FormLabel>
          <NumberInput
            defaultValue={maxAmount}
            min={1}
            max={maxAmount}
            onChange={onChange}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Stack>
      </Flex>
      <Stack>
        <Text fontWeight={600} fontSize={"lg"}>
          Transaction Fees:
        </Text>
        <Text>Gas Fees: 0.001 ETH</Text>
      </Stack>
      <HStack justifyContent={"space-around"}>
        <Button variant="shadow">Edit Trade</Button>
        <Button variant={"dark-shadow"}>Submit Listing</Button>
      </HStack>
    </Stack>
  );
};

export default SellConfirmation;
