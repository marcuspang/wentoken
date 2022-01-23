import { HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import LogoIcon from "./LogoIcon";

const Logo = () => {
  const router = useRouter();
  return (
    <HStack>
      <LogoIcon
        width={12}
        height={12}
        _hover={{ cursor: "pointer" }}
        onClick={() => router.push("/")}
      />
      <Text fontWeight={800} fontSize={"lg"} ml={"0px !important"}>
        wenToken
      </Text>
    </HStack>
  );
};

export default Logo;
