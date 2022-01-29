import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

interface ExplorePurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  maxCount: number;
  selectedPurchaseAmount: number;
  selectedPurchaseAmountOnChange: (
    valueAsString: string,
    valueAsNumber: number,
  ) => void;
  purchaseNFT: () => void;
}

const ExplorePurchaseModal = ({
  isOpen,
  onClose,
  maxCount,
  selectedPurchaseAmount,
  selectedPurchaseAmountOnChange,
  purchaseNFT,
}: ExplorePurchaseModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Purchase Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <NumberInput
              min={1}
              max={maxCount}
              value={selectedPurchaseAmount}
              onChange={selectedPurchaseAmountOnChange}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={purchaseNFT}>
            Purchase
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ExplorePurchaseModal;
