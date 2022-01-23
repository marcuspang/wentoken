import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { MoralisProvider } from "react-moralis";
import theme from "../theme/theme";
import "@fontsource/poppins/800.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/400.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider
      appId={process.env.MORALIS_APP_ID!}
      serverUrl={process.env.MORALIS_SERVER_URL!}
    >
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </MoralisProvider>
  );
}
