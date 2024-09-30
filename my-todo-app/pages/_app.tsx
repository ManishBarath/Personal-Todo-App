import client from "@/src/lib/apolloClient";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { createTheme, MantineProvider} from '@mantine/core';

const theme = createTheme({  primaryColor: 'blue' })

export default function App({ Component, pageProps }: AppProps) {
  return (
   < ApolloProvider client={client}>


          <Component {...pageProps} />
    </ApolloProvider>
);
}
