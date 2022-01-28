import { Flex, FlexProps, Spinner } from "@chakra-ui/react";

const CustomSpinner = (props: FlexProps) => {
  return (
    <Flex justifyContent={"center"} {...props}>
      <Spinner />
    </Flex>
  );
};

export default CustomSpinner;
