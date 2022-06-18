import React, { useState } from 'react'
import BottomSheet from 'components/common/BottomSheet/BottomSheet'
import { ETxnType } from 'lib/types'
import DepositModal from 'components/Deposits'
import TransactionHeader from './Header'
import TransactionModal from './Transactions'
import BottomMenus from 'components/common/BottomMenu/BottomMenus'
import BorrowModal from 'components/Borrows'

const TransactionSheet = ({
  address: tokenAddress,
  onClose,
  symbol,
  open,
  txnType,
}: {
  address: string
  onClose: () => void
  symbol: string
  open: boolean
  txnType?: ETxnType
}) => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false)
  const [selectedTxn, setSelectedTxn] = useState<ETxnType>()

  const getMenuItems = (txnType: ETxnType | undefined) => {
    let txnTypes: ETxnType[] = [ETxnType.transfer, ETxnType.markets]

    switch (txnType) {
      case ETxnType.deposit:
        txnTypes.unshift(ETxnType.withdraw)
        break
      case ETxnType.withdraw:
        txnTypes.unshift(ETxnType.deposit)
        break
      case ETxnType.borrow:
        txnTypes.unshift(ETxnType.repay)
        break
      case ETxnType.repay:
        txnTypes.unshift(ETxnType.borrow)
        break
    }

    return txnTypes
  }

  return (
    <BottomSheet
      open={open}
      onDismiss={onClose}
      header={<TransactionHeader symbol={symbol} txnType={txnType} openMenu={() => setIsOpenMenu(true)} />}
    >
      {tokenAddress && ([ETxnType.deposit, ETxnType.withdraw] as any[]).includes(txnType) && (
        <DepositModal address={tokenAddress} onClose={onClose} txnType={txnType} />
      )}
      {tokenAddress && ([ETxnType.borrow, ETxnType.repay] as any[]).includes(txnType) && (
        <BorrowModal address={tokenAddress} onClose={onClose} txnType={txnType} />
      )}
      <>
        <BottomMenus
          open={isOpenMenu}
          setOpenSheet={setIsOpenMenu}
          symbol={symbol}
          setSelectedMenu={setSelectedTxn}
          items={getMenuItems(txnType)}
        />
        <TransactionModal
          tokenAddress={tokenAddress}
          symbol={symbol}
          txnType={selectedTxn}
          onClose={() => {
            setSelectedTxn(undefined)
          }}
        />
      </>
    </BottomSheet>
  )
}

export default TransactionSheet
