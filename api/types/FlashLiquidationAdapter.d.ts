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
import {
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface FlashLiquidationAdapterInterface extends ethers.utils.Interface {
  functions: {
    "ADDRESSES_PROVIDER()": FunctionFragment;
    "FLASHLOAN_PREMIUM_TOTAL()": FunctionFragment;
    "LENDING_POOL()": FunctionFragment;
    "MAX_SLIPPAGE_PERCENT()": FunctionFragment;
    "ORACLE()": FunctionFragment;
    "UNISWAP_ROUTER()": FunctionFragment;
    "USD_ADDRESS()": FunctionFragment;
    "WETH_ADDRESS()": FunctionFragment;
    "executeOperation(address[],uint256[],uint256[],address,bytes)": FunctionFragment;
    "getAmountsIn(uint256,address,address)": FunctionFragment;
    "getAmountsOut(uint256,address,address)": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "rescueTokens(address)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "ADDRESSES_PROVIDER",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "FLASHLOAN_PREMIUM_TOTAL",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "LENDING_POOL",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "MAX_SLIPPAGE_PERCENT",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "ORACLE", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "UNISWAP_ROUTER",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "USD_ADDRESS",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "WETH_ADDRESS",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "executeOperation",
    values: [string[], BigNumberish[], BigNumberish[], string, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getAmountsIn",
    values: [BigNumberish, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "getAmountsOut",
    values: [BigNumberish, string, string]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "rescueTokens",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;

  decodeFunctionResult(
    functionFragment: "ADDRESSES_PROVIDER",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "FLASHLOAN_PREMIUM_TOTAL",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "LENDING_POOL",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "MAX_SLIPPAGE_PERCENT",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "ORACLE", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "UNISWAP_ROUTER",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "USD_ADDRESS",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "WETH_ADDRESS",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "executeOperation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAmountsIn",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAmountsOut",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "rescueTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
    "Swapped(address,address,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Swapped"): EventFragment;
}

export class FlashLiquidationAdapter extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: FlashLiquidationAdapterInterface;

  functions: {
    ADDRESSES_PROVIDER(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    "ADDRESSES_PROVIDER()"(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    FLASHLOAN_PREMIUM_TOTAL(overrides?: CallOverrides): Promise<{
      0: BigNumber;
    }>;

    "FLASHLOAN_PREMIUM_TOTAL()"(overrides?: CallOverrides): Promise<{
      0: BigNumber;
    }>;

    LENDING_POOL(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    "LENDING_POOL()"(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    MAX_SLIPPAGE_PERCENT(overrides?: CallOverrides): Promise<{
      0: BigNumber;
    }>;

    "MAX_SLIPPAGE_PERCENT()"(overrides?: CallOverrides): Promise<{
      0: BigNumber;
    }>;

    ORACLE(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    "ORACLE()"(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    UNISWAP_ROUTER(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    "UNISWAP_ROUTER()"(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    USD_ADDRESS(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    "USD_ADDRESS()"(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    WETH_ADDRESS(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    "WETH_ADDRESS()"(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    executeOperation(
      assets: string[],
      amounts: BigNumberish[],
      premiums: BigNumberish[],
      initiator: string,
      params: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "executeOperation(address[],uint256[],uint256[],address,bytes)"(
      assets: string[],
      amounts: BigNumberish[],
      premiums: BigNumberish[],
      initiator: string,
      params: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    getAmountsIn(
      amountOut: BigNumberish,
      reserveIn: string,
      reserveOut: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
      1: BigNumber;
      2: BigNumber;
      3: BigNumber;
      4: string[];
    }>;

    "getAmountsIn(uint256,address,address)"(
      amountOut: BigNumberish,
      reserveIn: string,
      reserveOut: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
      1: BigNumber;
      2: BigNumber;
      3: BigNumber;
      4: string[];
    }>;

    getAmountsOut(
      amountIn: BigNumberish,
      reserveIn: string,
      reserveOut: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
      1: BigNumber;
      2: BigNumber;
      3: BigNumber;
      4: string[];
    }>;

    "getAmountsOut(uint256,address,address)"(
      amountIn: BigNumberish,
      reserveIn: string,
      reserveOut: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
      1: BigNumber;
      2: BigNumber;
      3: BigNumber;
      4: string[];
    }>;

    owner(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    "owner()"(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    renounceOwnership(overrides?: Overrides): Promise<ContractTransaction>;

    "renounceOwnership()"(overrides?: Overrides): Promise<ContractTransaction>;

    rescueTokens(
      token: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "rescueTokens(address)"(
      token: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  ADDRESSES_PROVIDER(overrides?: CallOverrides): Promise<string>;

  "ADDRESSES_PROVIDER()"(overrides?: CallOverrides): Promise<string>;

  FLASHLOAN_PREMIUM_TOTAL(overrides?: CallOverrides): Promise<BigNumber>;

  "FLASHLOAN_PREMIUM_TOTAL()"(overrides?: CallOverrides): Promise<BigNumber>;

  LENDING_POOL(overrides?: CallOverrides): Promise<string>;

  "LENDING_POOL()"(overrides?: CallOverrides): Promise<string>;

  MAX_SLIPPAGE_PERCENT(overrides?: CallOverrides): Promise<BigNumber>;

  "MAX_SLIPPAGE_PERCENT()"(overrides?: CallOverrides): Promise<BigNumber>;

  ORACLE(overrides?: CallOverrides): Promise<string>;

  "ORACLE()"(overrides?: CallOverrides): Promise<string>;

  UNISWAP_ROUTER(overrides?: CallOverrides): Promise<string>;

  "UNISWAP_ROUTER()"(overrides?: CallOverrides): Promise<string>;

  USD_ADDRESS(overrides?: CallOverrides): Promise<string>;

  "USD_ADDRESS()"(overrides?: CallOverrides): Promise<string>;

  WETH_ADDRESS(overrides?: CallOverrides): Promise<string>;

  "WETH_ADDRESS()"(overrides?: CallOverrides): Promise<string>;

  executeOperation(
    assets: string[],
    amounts: BigNumberish[],
    premiums: BigNumberish[],
    initiator: string,
    params: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "executeOperation(address[],uint256[],uint256[],address,bytes)"(
    assets: string[],
    amounts: BigNumberish[],
    premiums: BigNumberish[],
    initiator: string,
    params: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  getAmountsIn(
    amountOut: BigNumberish,
    reserveIn: string,
    reserveOut: string,
    overrides?: CallOverrides
  ): Promise<{
    0: BigNumber;
    1: BigNumber;
    2: BigNumber;
    3: BigNumber;
    4: string[];
  }>;

  "getAmountsIn(uint256,address,address)"(
    amountOut: BigNumberish,
    reserveIn: string,
    reserveOut: string,
    overrides?: CallOverrides
  ): Promise<{
    0: BigNumber;
    1: BigNumber;
    2: BigNumber;
    3: BigNumber;
    4: string[];
  }>;

  getAmountsOut(
    amountIn: BigNumberish,
    reserveIn: string,
    reserveOut: string,
    overrides?: CallOverrides
  ): Promise<{
    0: BigNumber;
    1: BigNumber;
    2: BigNumber;
    3: BigNumber;
    4: string[];
  }>;

  "getAmountsOut(uint256,address,address)"(
    amountIn: BigNumberish,
    reserveIn: string,
    reserveOut: string,
    overrides?: CallOverrides
  ): Promise<{
    0: BigNumber;
    1: BigNumber;
    2: BigNumber;
    3: BigNumber;
    4: string[];
  }>;

  owner(overrides?: CallOverrides): Promise<string>;

  "owner()"(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(overrides?: Overrides): Promise<ContractTransaction>;

  "renounceOwnership()"(overrides?: Overrides): Promise<ContractTransaction>;

  rescueTokens(
    token: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "rescueTokens(address)"(
    token: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "transferOwnership(address)"(
    newOwner: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    ADDRESSES_PROVIDER(overrides?: CallOverrides): Promise<string>;

    "ADDRESSES_PROVIDER()"(overrides?: CallOverrides): Promise<string>;

    FLASHLOAN_PREMIUM_TOTAL(overrides?: CallOverrides): Promise<BigNumber>;

    "FLASHLOAN_PREMIUM_TOTAL()"(overrides?: CallOverrides): Promise<BigNumber>;

    LENDING_POOL(overrides?: CallOverrides): Promise<string>;

    "LENDING_POOL()"(overrides?: CallOverrides): Promise<string>;

    MAX_SLIPPAGE_PERCENT(overrides?: CallOverrides): Promise<BigNumber>;

    "MAX_SLIPPAGE_PERCENT()"(overrides?: CallOverrides): Promise<BigNumber>;

    ORACLE(overrides?: CallOverrides): Promise<string>;

    "ORACLE()"(overrides?: CallOverrides): Promise<string>;

    UNISWAP_ROUTER(overrides?: CallOverrides): Promise<string>;

    "UNISWAP_ROUTER()"(overrides?: CallOverrides): Promise<string>;

    USD_ADDRESS(overrides?: CallOverrides): Promise<string>;

    "USD_ADDRESS()"(overrides?: CallOverrides): Promise<string>;

    WETH_ADDRESS(overrides?: CallOverrides): Promise<string>;

    "WETH_ADDRESS()"(overrides?: CallOverrides): Promise<string>;

    executeOperation(
      assets: string[],
      amounts: BigNumberish[],
      premiums: BigNumberish[],
      initiator: string,
      params: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "executeOperation(address[],uint256[],uint256[],address,bytes)"(
      assets: string[],
      amounts: BigNumberish[],
      premiums: BigNumberish[],
      initiator: string,
      params: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    getAmountsIn(
      amountOut: BigNumberish,
      reserveIn: string,
      reserveOut: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
      1: BigNumber;
      2: BigNumber;
      3: BigNumber;
      4: string[];
    }>;

    "getAmountsIn(uint256,address,address)"(
      amountOut: BigNumberish,
      reserveIn: string,
      reserveOut: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
      1: BigNumber;
      2: BigNumber;
      3: BigNumber;
      4: string[];
    }>;

    getAmountsOut(
      amountIn: BigNumberish,
      reserveIn: string,
      reserveOut: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
      1: BigNumber;
      2: BigNumber;
      3: BigNumber;
      4: string[];
    }>;

    "getAmountsOut(uint256,address,address)"(
      amountIn: BigNumberish,
      reserveIn: string,
      reserveOut: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
      1: BigNumber;
      2: BigNumber;
      3: BigNumber;
      4: string[];
    }>;

    owner(overrides?: CallOverrides): Promise<string>;

    "owner()"(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    "renounceOwnership()"(overrides?: CallOverrides): Promise<void>;

    rescueTokens(token: string, overrides?: CallOverrides): Promise<void>;

    "rescueTokens(address)"(
      token: string,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    OwnershipTransferred(
      previousOwner: string | null,
      newOwner: string | null
    ): EventFilter;

    Swapped(
      fromAsset: null,
      toAsset: null,
      fromAmount: null,
      receivedAmount: null
    ): EventFilter;
  };

  estimateGas: {
    ADDRESSES_PROVIDER(overrides?: CallOverrides): Promise<BigNumber>;

    "ADDRESSES_PROVIDER()"(overrides?: CallOverrides): Promise<BigNumber>;

    FLASHLOAN_PREMIUM_TOTAL(overrides?: CallOverrides): Promise<BigNumber>;

    "FLASHLOAN_PREMIUM_TOTAL()"(overrides?: CallOverrides): Promise<BigNumber>;

    LENDING_POOL(overrides?: CallOverrides): Promise<BigNumber>;

    "LENDING_POOL()"(overrides?: CallOverrides): Promise<BigNumber>;

    MAX_SLIPPAGE_PERCENT(overrides?: CallOverrides): Promise<BigNumber>;

    "MAX_SLIPPAGE_PERCENT()"(overrides?: CallOverrides): Promise<BigNumber>;

    ORACLE(overrides?: CallOverrides): Promise<BigNumber>;

    "ORACLE()"(overrides?: CallOverrides): Promise<BigNumber>;

    UNISWAP_ROUTER(overrides?: CallOverrides): Promise<BigNumber>;

    "UNISWAP_ROUTER()"(overrides?: CallOverrides): Promise<BigNumber>;

    USD_ADDRESS(overrides?: CallOverrides): Promise<BigNumber>;

    "USD_ADDRESS()"(overrides?: CallOverrides): Promise<BigNumber>;

    WETH_ADDRESS(overrides?: CallOverrides): Promise<BigNumber>;

    "WETH_ADDRESS()"(overrides?: CallOverrides): Promise<BigNumber>;

    executeOperation(
      assets: string[],
      amounts: BigNumberish[],
      premiums: BigNumberish[],
      initiator: string,
      params: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "executeOperation(address[],uint256[],uint256[],address,bytes)"(
      assets: string[],
      amounts: BigNumberish[],
      premiums: BigNumberish[],
      initiator: string,
      params: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;

    getAmountsIn(
      amountOut: BigNumberish,
      reserveIn: string,
      reserveOut: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getAmountsIn(uint256,address,address)"(
      amountOut: BigNumberish,
      reserveIn: string,
      reserveOut: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAmountsOut(
      amountIn: BigNumberish,
      reserveIn: string,
      reserveOut: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getAmountsOut(uint256,address,address)"(
      amountIn: BigNumberish,
      reserveIn: string,
      reserveOut: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    "owner()"(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(overrides?: Overrides): Promise<BigNumber>;

    "renounceOwnership()"(overrides?: Overrides): Promise<BigNumber>;

    rescueTokens(token: string, overrides?: Overrides): Promise<BigNumber>;

    "rescueTokens(address)"(
      token: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    ADDRESSES_PROVIDER(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "ADDRESSES_PROVIDER()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    FLASHLOAN_PREMIUM_TOTAL(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "FLASHLOAN_PREMIUM_TOTAL()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    LENDING_POOL(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "LENDING_POOL()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    MAX_SLIPPAGE_PERCENT(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "MAX_SLIPPAGE_PERCENT()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    ORACLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "ORACLE()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    UNISWAP_ROUTER(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "UNISWAP_ROUTER()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    USD_ADDRESS(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "USD_ADDRESS()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    WETH_ADDRESS(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "WETH_ADDRESS()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    executeOperation(
      assets: string[],
      amounts: BigNumberish[],
      premiums: BigNumberish[],
      initiator: string,
      params: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "executeOperation(address[],uint256[],uint256[],address,bytes)"(
      assets: string[],
      amounts: BigNumberish[],
      premiums: BigNumberish[],
      initiator: string,
      params: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    getAmountsIn(
      amountOut: BigNumberish,
      reserveIn: string,
      reserveOut: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getAmountsIn(uint256,address,address)"(
      amountOut: BigNumberish,
      reserveIn: string,
      reserveOut: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAmountsOut(
      amountIn: BigNumberish,
      reserveIn: string,
      reserveOut: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getAmountsOut(uint256,address,address)"(
      amountIn: BigNumberish,
      reserveIn: string,
      reserveOut: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "owner()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(overrides?: Overrides): Promise<PopulatedTransaction>;

    "renounceOwnership()"(overrides?: Overrides): Promise<PopulatedTransaction>;

    rescueTokens(
      token: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "rescueTokens(address)"(
      token: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}
