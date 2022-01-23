import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { IoWalletOutline } from "react-icons/io5";
import { useMoralis } from "react-moralis";

export const connectors = [
  {
    title: "Metamask",
    // icon: Metamask,
    connectorId: "injected",
    priority: 1,
  },
  {
    title: "WalletConnect",
    // icon: WalletConnect,
    connectorId: "walletconnect",
    priority: 2,
  },
  {
    title: "Trust Wallet",
    // icon: TrustWallet,
    connectorId: "injected",
    priority: 3,
  },
];

const WalletButton = () => {
  const { authenticate, isAuthenticated, account, logout, authError } =
    useMoralis();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: logoutIsOpen,
    onClose: logoutOnClose,
    onOpen: logoutOnOpen,
  } = useDisclosure();

  if (!isAuthenticated || !account) {
    return (
      <>
        <IoWalletOutline size={25} onClick={onOpen} cursor={"pointer"} />;
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Sign In!</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text mb={4}>Choose a provider to sign in</Text>
              <HStack mb={4}>
                {connectors.map((connector, index) => (
                  <Button
                    key={index}
                    aria-label={connector.title}
                    onClick={async () => {
                      await authenticate({
                        provider: connector.connectorId as any,
                      });
                      window.localStorage.setItem(
                        "connectorId",
                        connector.connectorId,
                      );
                      onClose();
                    }}
                  >
                    {connector.title}
                  </Button>
                ))}
              </HStack>
              {authError && (
                <Text color={"red.400"} fontSize={"sm"}>
                  {authError.message}
                </Text>
              )}
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" onClick={onClose} ml={2}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }

  return (
    <>
      <Modal isOpen={logoutIsOpen} onClose={logoutOnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Your Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={4}>Address: {account.substring(10) + "..."}</Text>
            <HStack mb={4}></HStack>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={async () => {
                await logout();
                window.localStorage.removeItem("connectorId");
                logoutOnClose();
              }}
            >
              Logout
            </Button>
            <Button variant="ghost" onClick={logoutOnClose} ml={2}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <IoWalletOutline size={25} onClick={logoutOnOpen} />
    </>
  );
};

export default WalletButton;
