import { Button, Text } from "@chakra-ui/react";
import { useMoralis } from "react-moralis";
import Layout from "../components/Layout/Layout";

const Home = () => {
  const { authenticate, isAuthenticated, user, logout } = useMoralis();
  return (
    <Layout>
      {isAuthenticated && (
        <Text as="h1" fontSize={"lg"}>
          Welcome {user!.get("ethAddress")}
        </Text>
      )}
      {isAuthenticated ? (
        <Button onClick={logout}>Logout</Button>
      ) : (
        <Button onClick={() => authenticate()}>Authenticate</Button>
      )}
    </Layout>
  );
};

export default Home;
