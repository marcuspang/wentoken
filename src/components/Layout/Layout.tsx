import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <Box maxW={"8xl"} mx={"auto"}>
        {children}
      </Box>
    </>
  );
};

export default Layout;
