import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

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
      <Footer />
    </>
  );
};

export default Layout;
