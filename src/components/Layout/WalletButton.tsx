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
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
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
  const {
    authenticate,
    isAuthenticated,
    user,
    logout,
    authError,
    enableWeb3,
    isWeb3Enabled,
  } = useMoralis();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: logoutIsOpen,
    onClose: logoutOnClose,
    onOpen: logoutOnOpen,
  } = useDisclosure();
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    if (user && !isWeb3Enabled) {
      enableWeb3();
    }
  }, [enableWeb3, isWeb3Enabled, user]);

  let modal = null;

  if (!isAuthenticated || !user) {
    modal = (
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
                    if (!authError && isAuthenticated) {
                      toast({
                        status: "success",
                        isClosable: true,
                        title: "Successfully logged in",
                        description: "Welcome!",
                      });
                      onClose();
                    }
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
    );
  } else {
    modal = (
      <Modal isOpen={logoutIsOpen} onClose={logoutOnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Your Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={4}>
              Address: {user.get("ethAddress").substring(0, 30) + "..."}
            </Text>
            <HStack mb={4}></HStack>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={async () => {
                await logout();
                window.localStorage.removeItem("connectorId");

                toast({
                  status: "success",
                  isClosable: true,
                  title: "Successfully logged out",
                });
                logoutOnClose();
                router.push("/");
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
    );
  }

  return (
    <>
      <IoWalletOutline
        size={25}
        onClickCapture={!isAuthenticated || !user ? onOpen : logoutOnOpen}
        cursor={"pointer"}
      />
      {modal}
    </>
  );
};

export default WalletButton;
