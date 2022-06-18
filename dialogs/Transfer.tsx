import React, { useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { IBCCurrency } from '@keplr-wallet/types';
import { useStore } from 'api/cosmosStores';
import { Bech32Address } from '@keplr-wallet/cosmos';
import { WalletStatus } from '@keplr-wallet/stores';
import { useFakeFeeConfig } from '../lib/hooks';
import { useBasicAmountConfig } from '../lib/hooks/basic-amount-config';
import { useAccountConnection } from '../lib/hooks/account/useAccountConnection';
import { ConnectAccountButton } from '../components/ConnectAccountButton';
import { BaseModal, PrimaryBtn } from 'components/common';
import { Box, Text, TextInput } from 'grommet';
import TxnAmountRangeInput from 'components/Transactions/TxnAmountRangeInput';
import { truncateAfterDecimals } from 'lib/number-utils';
import { BaseTab } from 'components/Transactions/TxnTabs';
import { displayToast, TToastType } from 'components/common/toasts';
import { ETxnSteps } from 'lib/types';
import { TxnConfirm } from 'components/Transactions';
import TokenLogo from 'components/TokenLogo';
import { useConvexityData } from 'api/convexity';

interface TransferDialogProps {
  currency: IBCCurrency;
  counterpartyCurrency: IBCCurrency;
  counterpartyChainId: string;
  sourceChannelId: string;
  destChannelId: string;
  onClose: () => void;
  isMobileView: boolean;
}

export const TransferDialog = observer(
  ({
    currency,
    counterpartyCurrency,
    counterpartyChainId,
    sourceChannelId,
    destChannelId,
    onClose,
    isMobileView,
  }: TransferDialogProps) => {
    const [isWithdraw, setIsWithdraw] = useState<boolean>(false);
    const [step, setStep] = useState<ETxnSteps>(ETxnSteps.Input);
    const { chainStore, accountStore, queriesStore } = useStore();
    const account = accountStore.getAccount(chainStore.current.chainId);
    const counterpartyAccount = accountStore.getAccount(counterpartyChainId);
    const bal = queriesStore
      .get(chainStore.current.chainId)
      .queryBalances.getQueryBech32Address(account.bech32Address)
      .getBalanceFromCurrency(currency);

    const counterpartyBal = queriesStore
      .get(counterpartyChainId)
      .queryBalances.getQueryBech32Address(counterpartyAccount.bech32Address)
      .getBalanceFromCurrency(counterpartyCurrency);

    useEffect(() => {
      if (account.bech32Address && counterpartyAccount.walletStatus === WalletStatus.NotInit) {
        counterpartyAccount.init();
      }
    }, [account.bech32Address, counterpartyAccount, counterpartyAccount.walletStatus]);

    const amountConfig = useBasicAmountConfig(
      chainStore,
      chainStore.current.chainId,
      pickOne(account.bech32Address, counterpartyAccount.bech32Address, isWithdraw),
      pickOne(currency, counterpartyCurrency, isWithdraw),
      pickOne(
        queriesStore.get(chainStore.current.chainId).queryBalances,
        queriesStore.get(counterpartyChainId).queryBalances,
        isWithdraw
      )
    );
    const feeConfig = useFakeFeeConfig(
      chainStore,
      pickOne(chainStore.current.chainId, counterpartyChainId, isWithdraw),
      pickOne(account.msgOpts.ibcTransfer.gas, counterpartyAccount.msgOpts.ibcTransfer.gas, isWithdraw)
    );

    useEffect(() => {
      amountConfig.setFeeConfig(feeConfig);
    }, [amountConfig, feeConfig]);

    const { isAccountConnected, connectAccount } = useAccountConnection();

    const { ConvexityPriceData } = useConvexityData();

    const price = useMemo(() => {
      if (ConvexityPriceData && currency.coinDenom) {
        const priceData = ConvexityPriceData.find((item) => item.denom == currency.coinDenom);
        return Number(amountConfig.amount) * Number(priceData?.amount);
      } else {
        return 0;
      }
    }, [ConvexityPriceData, amountConfig.amount, currency.coinDenom]);

    const max = pickOne(
      parseFloat(bal.hideDenom(true).trim(true).maxDecimals(currency.coinDecimals).toString().replaceAll(',', '')),
      parseFloat(
        counterpartyBal
          .hideDenom(true)
          .trim(true)
          .maxDecimals(counterpartyCurrency.coinDecimals)
          .sub(feeConfig.fee)
          .toString()
          .replaceAll(',', '')
      ),
      isWithdraw
    );

    if (step === ETxnSteps.Pending) {
      return (
        <BaseModal symbol={currency.coinDenom} onClose={onClose}>
          <Box className="modal-width">
            <TxnConfirm wallet="Keplr" />
          </Box>
        </BaseModal>
      );
    }

    return (
      <BaseModal symbol={currency.coinDenom} onClose={onClose}>
        <Box className="modal-width">
          <BaseTab
            choiceA={chainStore.current.currencies[0].coinDenom}
            choiceB={currency.coinDenom}
            defaultSelected={!isWithdraw}
            handler={() => setIsWithdraw(!isWithdraw)}
            margin={{ top: 'medium' }}
          />
          <Box pad={{ horizontal: 'medium' }}>
            <Box margin={{ top: 'xxsmall', bottom: 'medium' }}>
              <Box direction="row" align="center" style={{ letterSpacing: '0.1em' }}>
                <Text color="clrTextAndDataListHeader" size="xsmall" className="upper-case">
                  Balance:{' '}
                  <span style={{ marginLeft: '3px', color: 'inherit' }}>
                    {pickOne(
                      bal.upperCase(true).trim(true).maxDecimals(currency.coinDecimals).toString(),
                      counterpartyBal
                        .upperCase(true)
                        .trim(true)
                        .maxDecimals(counterpartyCurrency.coinDecimals)
                        .toString(),
                      isWithdraw
                    )}
                  </span>
                </Text>
              </Box>
              <Box
                direction="row"
                margin={{ top: 'xsmall', bottom: 'small' }}
                align="end"
                focusIndicator={true}
                justify="between"
              >
                <Box>
                  <Box direction="row" justify="start" align="center" pad={{ top: 'xsmall' }}>
                    <TextInput
                      type="number"
                      style={{
                        borderStyle: 'none',
                        width: `${amountConfig.amount.length}ch`,
                        fontSize: '20px',
                        minWidth: '45px',
                        padding: 0,
                        fontWeight: 'normal',
                        maxWidth: '200px',
                      }}
                      onChange={(e) => {
                        e.preventDefault();
                        const decimals = isWithdraw ? currency.coinDecimals : counterpartyCurrency.coinDecimals;
                        amountConfig.setAmount(
                          Math.max(Math.min(truncateAfterDecimals(e.currentTarget.value, decimals), max), 0).toString()
                        );
                      }}
                      value={amountConfig.amount}
                      placeholder="0.00"
                      min="0"
                    />
                    <Text color="clrTextAndDataListHeader" className="letter-spacing" alignSelf="center" size="medium">
                      {currency.coinDenom}
                    </Text>
                  </Box>
                  <Box>
                    <Text color="clrMidGreyOnNavy" style={{ letterSpacing: '0.1em' }} size="xsmall">
                      ~${price.toFixed(2)}
                    </Text>
                  </Box>
                </Box>
                <Box
                  onClick={() => {
                    amountConfig.setIsMax(true);
                  }}
                >
                  <Text color="clrMidGreyOnNavy" size="xsmall" className="letter-spacing">
                    MAX
                  </Text>
                </Box>
              </Box>
              <TxnAmountRangeInput
                min={0}
                max={100}
                value={max > 0 ? Math.round(Math.max(Math.min((Number(amountConfig.amount) * 100) / max, 100), 0)) : 0}
                setValue={(value: any) => amountConfig.setAmount(((max * parseFloat(value)) / 100).toString())}
                scales={[0, 1, 2, 3, 4]}
                maxAmount={max.toString()}
              />
            </Box>
          </Box>
          <Box
            border={{ size: '1px', color: 'clrBorderGrey', side: 'top' }}
            pad={{ top: 'medium', horizontal: 'medium' }}
          >
            <Text color="clrTextAndDataListHeader" size="xsmall" className="letter-spacing">
              From
            </Text>
            <Box pad={{ vertical: 'small' }} width="100%" direction="row" justify="between" align="center">
              <Box direction="row" justify="start" align="center">
                <TokenLogo
                  width="36px"
                  height="36px"
                  symbol={pickOne(chainStore.current.currencies[0].coinDenom, currency.coinDenom, isWithdraw)}
                />
                <Text color="clrTextAndDataListHeader" margin={{ left: 'small' }} size="small">
                  {pickOne(
                    Bech32Address.shortenAddress(account.bech32Address, 30),
                    Bech32Address.shortenAddress(counterpartyAccount.bech32Address, 30),
                    isWithdraw
                  )}
                </Text>
              </Box>
            </Box>
            <Text color="clrTextAndDataListHeader" className="letter-spacing" margin={{ top: 'small' }} size="xsmall">
              To
            </Text>
            <Box margin={{ vertical: 'small' }} direction="row" justify="start" align="center">
              <TokenLogo
                width="36px"
                height="36px"
                symbol={pickOne(currency.coinDenom, chainStore.current.currencies[0].coinDenom, isWithdraw)}
              />
              <Text color="clrTextAndDataListHeader" margin={{ left: 'small' }} size="small">
                {pickOne(
                  Bech32Address.shortenAddress(counterpartyAccount.bech32Address, 30),
                  Bech32Address.shortenAddress(account.bech32Address, 30),
                  isWithdraw
                )}
              </Text>
            </Box>
          </Box>
          <Box margin={{ top: 'medium' }} pad={{ horizontal: 'medium' }}>
            {!isAccountConnected ? (
              <ConnectAccountButton
                onClick={(e) => {
                  e.preventDefault();
                  connectAccount();
                }}
              />
            ) : (
              <PrimaryBtn
                fullWidth
                pad={{ vertical: 'small' }}
                textSize="medium"
                round="large"
                text="Transfer"
                disabled={
                  !account.isReadyToSendMsgs ||
                  !counterpartyAccount.isReadyToSendMsgs ||
                  amountConfig.getError() != null
                }
                onClick={async (e) => {
                  e.preventDefault();

                  setStep(ETxnSteps.Pending);

                  try {
                    if (isWithdraw) {
                      if (account.isReadyToSendMsgs && counterpartyAccount.bech32Address) {
                        await account.cosmos.sendIBCTransferMsg(
                          {
                            portId: 'transfer',
                            channelId: sourceChannelId,
                            counterpartyChainId,
                          },
                          amountConfig.amount,
                          amountConfig.currency,
                          counterpartyAccount.bech32Address,
                          '',
                          undefined,
                          undefined,
                          {
                            onBroadcasted: (txHash: Uint8Array) => {
                              displayToast('Transferring', TToastType.TX_BROADCASTING);
                            },
                            onFulfill: (tx) => {
                              if (!tx.code) {
                                displayToast('Transfer Successful', TToastType.TX_SUCCESSFUL, {
                                  customLink: chainStore
                                    .getChain(chainStore.current.chainId)
                                    .raw.explorerUrlToTx.replace('{txHash}', tx.hash.toUpperCase()),
                                });
                              }
                            },
                          }
                        );
                      }
                    } else {
                      // Depositing atom from test node to umee network
                      if (counterpartyAccount.isReadyToSendMsgs && account.bech32Address) {
                        await counterpartyAccount.cosmos.sendIBCTransferMsg(
                          {
                            portId: 'transfer',
                            channelId: destChannelId,
                            counterpartyChainId: chainStore.current.chainId,
                          },
                          amountConfig.amount,
                          amountConfig.currency,
                          account.bech32Address,
                          '',
                          undefined,
                          undefined,
                          {
                            onBroadcasted: (txHash: Uint8Array) => {
                              displayToast('Transferring', TToastType.TX_BROADCASTING);
                            },
                            onFulfill: (tx) => {
                              if (!tx.code) {
                                displayToast('Transfer Successful', TToastType.TX_SUCCESSFUL, {
                                  customLink: chainStore
                                    .getChain(counterpartyChainId)
                                    .raw.explorerUrlToTx.replace('{txHash}', tx.hash.toUpperCase()),
                                });
                              }
                            },
                          }
                        );
                      }
                    }
                  } catch (e) {
                    console.log(e);
                  }
                  onClose();
                }}
              />
            )}
          </Box>
        </Box>
      </BaseModal>
    );
  }
);

function pickOne<V1, V2>(v1: V1, v2: V2, first: boolean): V1 | V2 {
  return first ? v1 : v2;
}
