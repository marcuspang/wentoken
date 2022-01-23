import { Button, Text } from "@chakra-ui/react";
import { useMoralis } from "react-moralis";
import Card from "../components/Explore/Card";
import Layout from "../components/Layout/Layout";

const Home = () => {
  const { authenticate, isAuthenticated, isWeb3Enabled, user, logout } =
    useMoralis();
  return (
    <Layout>
      {isAuthenticated && isWeb3Enabled && (
        <Text as="h1" fontSize={"lg"}>
          Welcome {user!.get("ethAddress")}
        </Text>
      )}
      {isAuthenticated && isWeb3Enabled ? (
        <Button onClick={logout}>Logout</Button>
      ) : (
        <Button onClick={() => authenticate()}>Authenticate</Button>
      )}
      <Card />
    </Layout>
  );
};

export default Home;
