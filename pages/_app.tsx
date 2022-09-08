import type { AppProps } from "next/app";
import Web3WrapperProvider from "../web3-wrapper/providers/Web3WrapperProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3WrapperProvider>
      <Component {...pageProps} />
    </Web3WrapperProvider>
  );
}

export default MyApp;
