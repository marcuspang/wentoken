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
  useToast,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { WENTOKEN } from "../../constants/constants";
import theme from "../../theme/theme";
import {
  createTokenListingOptions,
  createWentokenOptions,
  wenTokenAddress,
  wenTokenListingAddress,
} from "../../util/createTokenOptions";

interface SellConfirmationProps {
  maxAmount: number;
  amount: number;
  value: number;
  from: string;
  tokenId: number;
  onAmountChange: (valueAsString: string, valueAsNumber: number) => void;
  onValueChange: (valueAsString: string, valueAsNumber: number) => void;
}

const SellConfirmation = ({
  maxAmount,
  amount,
  value,
  from,
  tokenId,
  onAmountChange,
  onValueChange,
}: SellConfirmationProps) => {
  const { fetch } = useWeb3ExecuteFunction();
  const toast = useToast();
  const router = useRouter();
  const { user } = useMoralis();

  const submitHandler = () => {
    fetch({
      params: createTokenListingOptions("addListing", {
        contractAddress: wenTokenAddress,
        price: ethers.utils.parseEther(value.toString()),
        tokenId,
        tokenCount: amount,
      }),
      onSuccess: () => {
        toast({
          status: "success",
          title: "Successfully listed!",
          description: `Listed ${amount} ${WENTOKEN[tokenId]} for ${value} ETH each`,
          isClosable: true,
        });
        router.push("/portfolio/" + user?.get("ethAddress"));
      },
    });
  };

  const setApprovalHandler = () => {
    fetch({
      params: createWentokenOptions("setApprovalForAll", {
        operator: wenTokenListingAddress,
        approved: "true",
      }),
    });
  };

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
          <Input
            variant={"filled"}
            bg={"gray.300"}
            id="from"
            disabled
            value={from}
          />
        </Stack>
        <Stack>
          <FormLabel fontWeight={600} fontSize={"lg"} mb={0}>
            Amount
          </FormLabel>
          <NumberInput
            value={amount}
            min={1}
            max={maxAmount}
            onChange={onAmountChange}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Stack>
        <Stack>
          <FormLabel fontWeight={600} fontSize={"lg"} mb={0}>
            Value (in ETH)
          </FormLabel>
          <NumberInput
            value={value}
            step={0.0000000001}
            min={0}
            onChange={onValueChange}
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
        <Button variant={"dark-shadow"} onClick={setApprovalHandler}>
          Set Approval
        </Button>
        <Button variant={"dark-shadow"} onClick={submitHandler}>
          Submit Listing
        </Button>
      </HStack>
    </Stack>
  );
};

export default SellConfirmation;
