import { ChainId } from "@thirdweb-dev/sdk";
import { Dispatch, SetStateAction } from "react";

export type Web3ConfigT = Web3WrapperStateT;

export type Web3WrapperContextT = {
  web3Config: Web3ConfigT;
  setWeb3Config: Dispatch<SetStateAction<Web3ConfigT>>;
};

export type Web3WrapperStateT = {
  chainId: ChainId;
  isGasless: boolean | null;
};
