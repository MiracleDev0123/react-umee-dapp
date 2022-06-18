/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from "ethers";
import { Contract, ContractTransaction } from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface IUniswapExchangeInterface extends ethers.utils.Interface {
  functions: {};

  events: {
    "AddLiquidity(address,uint256,uint256)": EventFragment;
    "EthPurchase(address,uint256,uint256)": EventFragment;
    "RemoveLiquidity(address,uint256,uint256)": EventFragment;
    "TokenPurchase(address,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AddLiquidity"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "EthPurchase"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RemoveLiquidity"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TokenPurchase"): EventFragment;
}

export class IUniswapExchange extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: IUniswapExchangeInterface;

  functions: {};

  callStatic: {};

  filters: {
    AddLiquidity(
      provider: string | null,
      eth_amount: BigNumberish | null,
      token_amount: BigNumberish | null
    ): EventFilter;

    EthPurchase(
      buyer: string | null,
      tokens_sold: BigNumberish | null,
      eth_bought: BigNumberish | null
    ): EventFilter;

    RemoveLiquidity(
      provider: string | null,
      eth_amount: BigNumberish | null,
      token_amount: BigNumberish | null
    ): EventFilter;

    TokenPurchase(
      buyer: string | null,
      eth_sold: BigNumberish | null,
      tokens_bought: BigNumberish | null
    ): EventFilter;
  };

  estimateGas: {};

  populateTransaction: {};
}