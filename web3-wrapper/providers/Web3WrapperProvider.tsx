import React, { createContext, useState } from 'react';
import { Web3WrapperContextT, Web3WrapperStateT } from "../types";
import { ReactNode } from "react";
import { ChainId } from '@thirdweb-dev/sdk';
import { ThirdwebProvider } from '@thirdweb-dev/react';

export type ChildrenT = {
  children: ReactNode;
};

export const Web3WrapperContext = createContext<Web3WrapperContextT>(
  undefined as any
);
Web3WrapperContext.displayName = "Web3WrapperContext";

type Props = ChildrenT;

const Web3WrapperProvider = (props: Props) => {
  const [web3Config, setWeb3Config] = useState<Web3WrapperStateT>({
    chainId: ChainId.Rinkeby,
    isGasless: false,
  });

  return (
    <Web3WrapperContext.Provider value={{ web3Config, setWeb3Config }}>
      <ThirdwebProvider
        desiredChainId={web3Config.chainId}
        sdkOptions={{
          ...(web3Config.isGasless &&
            process.env.NEXT_PUBLIC_OPENZEPPELIN_URL && {
              gasless: {
                openzeppelin: {
                  relayerUrl: process.env
                    .NEXT_PUBLIC_OPENZEPPELIN_URL as string,
                },
              },
            }),
        }}
      >
        {props.children}
      </ThirdwebProvider>
    </Web3WrapperContext.Provider>
  );
};

export default Web3WrapperProvider;
