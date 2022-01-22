import { Box, Button, Text } from "@chakra-ui/react";
import { useMoralis } from "react-moralis";
import Layout from "../components/Layout";

export default function Home() {
  const { authenticate, isAuthenticated, user, logout } = useMoralis();

  if (!isAuthenticated) {
    return <Button onClick={() => authenticate()}>Authenticate</Button>;
  }

  return (
    <Layout>
      <Text as="h1" fontSize={"lg"}>
        Welcome {user!.get("username")}
      </Text>
      <Button onClick={logout}>Logout</Button>
    </Layout>
  );
}
