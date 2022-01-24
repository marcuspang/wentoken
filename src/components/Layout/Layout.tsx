import { Box, Container } from "@chakra-ui/react";
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
      <Container maxW={"8xl"} mx={"auto"}>
        {children}
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
