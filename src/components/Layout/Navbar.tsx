import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Flex,
  HStack,
  IconButton,
  Stack,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { MouseEventHandler } from "react";
import { useMoralis } from "react-moralis";
import theme from "../../theme/theme";
import CustomLink from "./CustomLink";
import Logo from "./Logo";
import WalletButton from "./WalletButton";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, isAuthenticated } = useMoralis();
  const toast = useToast();

  const portfolioOnClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (!user || !isAuthenticated) {
      e.preventDefault();
      toast({
        isClosable: true,
        status: "info",
        title: "Not authorized",
        description: "Please login to see your portfolio!",
      });
    }
  };

  return (
    <>
      <Box
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={theme.shadows.light}
        as={"header"}
      >
        <Container
          display="flex"
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
          mx={"auto"}
          maxW={"8xl"}
        >
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Logo />
          </HStack>
          <HStack alignItems={"center"} spacing={8}>
            <HStack
              as={"nav"}
              spacing={10}
              display={{ base: "none", md: "flex" }}
            >
              <CustomLink href={"/trade"} fontWeight={"semibold"}>
                Trade
              </CustomLink>
              <CustomLink href={"/explore"} fontWeight={"semibold"}>
                Explore
              </CustomLink>
              <CustomLink
                fontWeight={"semibold"}
                href={"/portfolio/" + user?.get("ethAddress")}
                onClickCapture={portfolioOnClick}
              >
                Portfolio
              </CustomLink>
            </HStack>
            <WalletButton />
          </HStack>
        </Container>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={8}>
              <CustomLink href={"/trade"} fontWeight={"semibold"}>
                Trade
              </CustomLink>
              <CustomLink href={"/explore"} fontWeight={"semibold"}>
                Explore
              </CustomLink>
              <CustomLink
                fontWeight={"semibold"}
                href={"/portfolio/" + user?.getUsername()}
                onClickCapture={portfolioOnClick}
              >
                Portfolio
              </CustomLink>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Navbar;
