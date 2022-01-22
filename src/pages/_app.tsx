import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme/theme';
import { MoralisProvider } from 'react-moralis';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider
      appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID}
      serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_URL}
    >
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </MoralisProvider>
  );
}
