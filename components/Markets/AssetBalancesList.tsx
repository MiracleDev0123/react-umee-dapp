import React, { useCallback, MouseEvent } from 'react';
import { AppCurrency, Currency, IBCCurrency } from '@keplr-wallet/types';
import { observer } from 'mobx-react-lite';
import { IBCAssetInfos } from '../../config';
import { TransferDialog } from '../../dialogs/Transfer';
import { useStore } from '../../api/cosmosStores';
import { SecondaryBtn } from 'components/common';
import { useAccountConnection } from 'lib/hooks/account/useAccountConnection';

export const AssetBalancesList = observer(function AssetBalancesList({
  chainId,
  coinMinimalDenom,
  handleClick,
  close
}: {
  chainId: string;
  coinMinimalDenom: string;
  handleClick: (e: MouseEvent) => void;
  close: () => void;
}) {
  const { chainStore, queriesStore, accountStore } = useStore();

  const account = accountStore.getAccount(chainStore.current.chainId);
  const queries = queriesStore.get(chainStore.current.chainId);

  const chainInfo = chainStore.getChain(chainId);
  const counterpartyAccount = accountStore.getAccount(chainId);
  const channelInfo = IBCAssetInfos.find(
    (channelInfo) => channelInfo.counterpartyChainId === chainId && channelInfo.coinMinimalDenom === coinMinimalDenom
  );

  const currency = chainStore.current.currencies.find(
    (cur) => cur.coinMinimalDenom === channelInfo?.coinMinimalDenom
  ) as Currency;

  const counterpartyCurrency = chainInfo.currencies.find(
    (cur) => cur.coinMinimalDenom === channelInfo?.counterpartyCoinMinimalDenom
  ) as Currency;

  if (!currency) {
    throw new Error(`Unknown currency ${channelInfo?.coinMinimalDenom} for ${chainStore.current.chainId}`);
  }

  if (!counterpartyCurrency) {
    throw new Error(
      `Unknown currency ${channelInfo?.counterpartyCoinMinimalDenom} for ${channelInfo?.counterpartyChainId}`
    );
  }

  const balance = queries.queryBalances.getQueryBech32Address(account.bech32Address).getBalanceFromCurrency(currency);

  const counterpartyBalance = queries.queryBalances
    .getQueryBech32Address(counterpartyAccount.bech32Address)
    .getBalanceFromCurrency({
      ...counterpartyCurrency,
      paths: [
        {
          portId: 'transfer',
          channelId: channelInfo?.sourceChannelId || '',
        },
      ],
      originChainId: chainInfo.chainId,
    });

  const [dialogState, setDialogState] = React.useState<
    | {
        open: true;
        currency: IBCCurrency;
        counterpartyCurrency: IBCCurrency;
        counterpartyChainId: string;
        sourceChannelId: string;
        destChannelId: string;
      }
    | {
        open: false;
      }
  >({ open: false });

  const handleClose = useCallback(() => setDialogState((v) => ({ ...v, open: false })), []);

  return (
    <React.Fragment>
      {dialogState.open ? (
        <TransferDialog
          onClose={() => {
            handleClose();
            close();
          }}
          currency={dialogState.currency}
          counterpartyCurrency={dialogState.counterpartyCurrency}
          counterpartyChainId={dialogState.counterpartyChainId}
          sourceChannelId={dialogState.sourceChannelId}
          destChannelId={dialogState.destChannelId}
          isMobileView={false}
        />
      ) : null}

      <AssetBalanceRow
        chainName={chainInfo.chainName}
        coinDenom={balance.currency.coinDenom}
        currency={balance.currency}
        balance={balance.hideDenom(true).trim(true).maxDecimals(6).toString()}
        onDeposit={(e) => {
          setDialogState({
            open: true,
            counterpartyChainId: chainInfo.chainId,
            currency: balance.currency as IBCCurrency,
            counterpartyCurrency: counterpartyBalance.currency as IBCCurrency,
            sourceChannelId: channelInfo?.sourceChannelId || '',
            destChannelId: channelInfo?.destChannelId || '',
          });
          handleClick(e);
        }}
        isMobileView={false}
      />
    </React.Fragment>
  );
});

interface AssetBalanceRowProps {
  chainName: string;
  coinDenom: string;
  currency: AppCurrency;
  balance: string;
  onDeposit: (e: MouseEvent) => void;
  onWithdraw?: () => void;
  showComingSoon?: boolean;
  isMobileView: boolean;
}

function AssetBalanceRow({ onDeposit }: AssetBalanceRowProps) {
  const { isAccountConnected, connectAccount } = useAccountConnection();

  const setIsConnected = () => {
    if (!isAccountConnected) {
      connectAccount();
    }
  };

  return (
    <>
      <SecondaryBtn
        isConnected={setIsConnected}
        onClick={(e) => onDeposit(e)}
        text="TRANSFER"
        round="large"
        pad={{ vertical: 'small', horizontal: 'small' }}
        textSize="xsmall"
      />
    </>
  );
}
