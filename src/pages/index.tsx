import { Box, Button, Text } from "@chakra-ui/react";
import { useMoralis } from "react-moralis";

export default function Home() {
  const { authenticate, isAuthenticated, user, logout } = useMoralis();

  if (!isAuthenticated) {
    return <Button onClick={() => authenticate()}>Authenticate</Button>;
  }

  return (
    <Box>
      <Text as="h1" fontSize={"lg"}>
        Welcome {user!.get("username")}
      </Text>
      <Button onClick={logout}>Logout</Button>
    </Box>
  );
}
