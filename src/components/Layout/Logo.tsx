import { HStack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import LogoIcon from "./LogoIcon";

const Logo = () => {
  const router = useRouter();
  return (
    <HStack onClick={() => router.push("/")}>
      <LogoIcon width={12} height={12} _hover={{ cursor: "pointer" }} />
      <Text
        fontWeight={800}
        fontSize={"lg"}
        ml={"0px !important"}
        cursor={"pointer"}
      >
        wenToken
      </Text>
    </HStack>
  );
};

export default Logo;
