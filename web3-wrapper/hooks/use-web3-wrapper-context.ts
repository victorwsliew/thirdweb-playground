import { Dispatch, SetStateAction, useContext } from 'react';
import { Web3WrapperContext } from "../providers/Web3WrapperProvider";
import { Web3WrapperContextT, Web3ConfigT } from "../types";

export const useWeb3Wrapper = (): [
  Web3ConfigT,
  Dispatch<SetStateAction<Web3ConfigT>>
] => {
  const ctx = useContext<Web3WrapperContextT>(Web3WrapperContext);
  return [ctx.web3Config, ctx.setWeb3Config];
};
