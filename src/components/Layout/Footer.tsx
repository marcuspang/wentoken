import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
  Spacer,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import {
  FaGithub,
  FaHome,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

const SocialButton = ({
  children,
  label,
  href,
  id,
  target,
}: {
  children: ReactNode;
  label: string;
  href: string;
  id: string;
  target?: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      id={id}
      target={target}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
      as="footer"
      mt={10}
    >
      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Container
          display={"flex"}
          py={4}
          maxW={"8xl"}
          mx={"auto"}
          direction={{ base: "column", md: "row" }}
          justifyContent={{ md: "space-between" }}
          align={{ md: "center" }}
        >
          <Text>© 2022 wenToken. All rights reserved</Text>
          <Spacer />
          <Stack direction={"row"} spacing={6}>
            <SocialButton
              label={"Twitter"}
              href={"https://github.com/marcuspang/wentoken"}
              target="_blank"
              id={"1"}
            >
              <FaTwitter />
            </SocialButton>
            <SocialButton
              label={"YouTube"}
              href={"https://github.com/marcuspang/wentoken"}
              target="_blank"
              id={"2"}
            >
              <FaYoutube />
            </SocialButton>
            <SocialButton
              label={"Instagram"}
              href={"https://github.com/marcuspang/wentoken"}
              target="_blank"
              id={"3"}
            >
              <FaInstagram />
            </SocialButton>
            <SocialButton
              label={"Github"}
              href={"https://github.com/marcuspang/wentoken"}
              target="_blank"
              id={"4"}
            >
              <FaGithub />
            </SocialButton>

            <SocialButton label={"Home"} href={"/"} id={"5"}>
              <FaHome />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
