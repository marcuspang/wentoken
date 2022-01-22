import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { MoralisProvider } from "react-moralis";
import theme from "../theme/theme";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider
      appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID!}
      serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_URL!}
    >
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </MoralisProvider>
  );
}
