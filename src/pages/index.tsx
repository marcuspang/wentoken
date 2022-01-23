import { Box, Button, Text } from "@chakra-ui/react";
import { useMoralis } from "react-moralis";
import Layout from "../components/Layout";

export default function Home() {
  const { authenticate, isAuthenticated, user, logout } = useMoralis();

  return (
    <Layout>
      {isAuthenticated && (
        <Text as="h1" fontSize={"lg"}>
          Welcome {user!.get("username")}
        </Text>
      )}
      {isAuthenticated ? (
        <Button onClick={logout}>Logout</Button>
      ) : (
        <Button onClick={() => authenticate()}>Authenticate</Button>
      )}
    </Layout>
  );
}
