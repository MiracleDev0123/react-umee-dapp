import React from 'react'
import MarketsDetailMobile from '../Markets/MarketsDetail/MarketsDetailMobile'
import { ETxnType } from 'lib/types'
import TransactionSheet from './TransactionSheet'

interface TransactionModalProps {
  txnType?: ETxnType
  onClose: () => void
  tokenAddress: string
  symbol: string
}

const TransactionModal = ({ txnType, onClose, tokenAddress, symbol }: TransactionModalProps) => {
  return (
    <>
      <MarketsDetailMobile
        address={tokenAddress}
        symbol={symbol}
        onClose={onClose}
        open={txnType === ETxnType.markets}
      />

      <TransactionSheet
        address={tokenAddress}
        symbol={symbol}
        onClose={onClose}
        open={([ETxnType.deposit, ETxnType.withdraw, ETxnType.borrow, ETxnType.repay] as any[]).includes(txnType)}
        txnType={txnType}
      />
    </>
  )
}

export default TransactionModal
