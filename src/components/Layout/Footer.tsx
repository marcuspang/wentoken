// import {
//     Box,
//     Container,
//     Stack,
//     Text,
//     useColorModeValue,
//   } from "@chakra-ui/react";

//   export default function Footer() {
//     return (
//       <Box
//       mt={12}
//         bg={useColorModeValue("gray.100", "gray.900")}
//       >
//         <Container
//           as={Stack}
//           maxW={"8xl"}
//           py={4}
//           direction={{ base: "column", md: "row" }}
//           spacing={4}
//           justify={{ base: "center", md: "space-between" }}
//           align={{ base: "center", md: "center" }}
//         >
//           <Text>© 2022 wenToken. All rights reserved</Text>
//         </Container>
//       </Box>
//     );
//   }

import { ReactNode } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  SimpleGrid,
  Text,
  Link,
  VisuallyHidden,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaGithub,
  FaHome,
} from "react-icons/fa";

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

const onFinish = (event: any) => {
  const id = event.target.id;
  if (id !== "5") {
    window.open("https://github.com/marcuspang/wentoken");
  }
};

const SocialButton = ({
  children,
  label,
  href,
  id,
}: {
  children: ReactNode;
  label: string;
  href: string;
  id: string;
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
      onClick={onFinish}
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
    >
      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ md: "space-between" }}
          align={{ md: "center" }}
        >
          <Text>© 2022 wenToken. All rights reserved</Text>
          <Stack direction={"row"} spacing={6}>
            <SocialButton
              label={"Twitter"}
              href={"https://github.com/marcuspang/wentoken"}
              id={"1"}
            >
              <FaTwitter />
            </SocialButton>
            <SocialButton
              label={"YouTube"}
              href={"https://github.com/marcuspang/wentoken"}
              id={"2"}
            >
              <FaYoutube />
            </SocialButton>
            <SocialButton
              label={"Instagram"}
              href={"https://github.com/marcuspang/wentoken"}
              id={"3"}
            >
              <FaInstagram />
            </SocialButton>
            <SocialButton
              label={"Github"}
              href={"https://github.com/marcuspang/wentoken"}
              id={"4"}
            >
              <FaGithub />
            </SocialButton>
            {/* <SocialButton
                target="_blank"
                onClick={() => {
                window.open(
                    "https://github.com/marcuspang/wentoken",
                );
                }}
            >
                <FaGithub />  
            </SocialButton> */}

            <SocialButton label={"Home"} href={"/"} id={"5"}>
              <FaHome />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
