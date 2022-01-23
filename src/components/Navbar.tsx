import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Stack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import CustomLink from "./CustomLink";
import Logo from "./Logo";
import { IoWalletOutline } from "react-icons/io5";
import WalletButton from "./WalletButton";

const links = ["Trade", "Explore", "Portfolio"];

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"md"}
        px={4}
        as={"header"}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
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
              {links.map((link) => (
                <CustomLink key={link} href={"/"}>
                  {link}
                </CustomLink>
              ))}
            </HStack>
            <WalletButton />
          </HStack>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={8}>
              {links.map((link) => (
                <CustomLink key={link} href={"/"}>
                  {link}
                </CustomLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Navbar;
