import { HStack, Text } from "@chakra-ui/react";
import LogoIcon from "./LogoIcon";

const Logo = () => {
  return (
    <HStack>
      <LogoIcon width={12} />
      <Text fontWeight={800} fontSize={"lg"} ml={"0px !important"}>
        wenToken
      </Text>
    </HStack>
  );
};

export default Logo;
