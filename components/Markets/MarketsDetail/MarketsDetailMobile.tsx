import React, { useState } from 'react'
import BottomSheet from 'components/common/BottomSheet/BottomSheet'
import { Box } from 'grommet'
import { TokenItem } from 'components/DataList'
import { MarketsDetail } from '.'
import BottomMenu from 'components/common/BottomMenu/BottomMenu'
import MenuOpen from 'components/common/MenuOpen'
import { ETxnType } from 'lib/types'
import TransactionModal from 'components/TransactionsMobile/Transactions'
import BottomMenus from 'components/common/BottomMenu/BottomMenus'

const MarketsDetailMobile = ({
  address: tokenAddress,
  onClose,
  open,
  symbol,
}: {
  address: string
  onClose: () => void
  open?: boolean
  symbol: string
}) => {
  const [openSheet, setOpenSheet] = useState<boolean>(false)
  const [selectedTxn, setSelectTxn] = useState<ETxnType>()

  return (
    <>
      <BottomSheet
        onDismiss={onClose}
        open={!!open}
        header={
          <Box direction="row" justify="between">
            <TokenItem name={symbol} textSize="24px" fontFamily="Moret" />
            <MenuOpen onClick={() => setOpenSheet(true)} />
          </Box>
        }
      >
        {tokenAddress && <MarketsDetail address={tokenAddress} />}
        <BottomMenus 
          open={openSheet}
          setOpenSheet={setOpenSheet}
          symbol={symbol}
          setSelectedMenu={setSelectTxn}
          items={[ETxnType.transfer, ETxnType.deposit, ETxnType.withdraw, ETxnType.borrow, ETxnType.repay]}
        />
        <TransactionModal
          tokenAddress={tokenAddress}
          symbol={symbol}
          txnType={selectedTxn}
          onClose={() => {
            setSelectTxn(undefined)
          }}
        />
      </BottomSheet>
    </>
  )
}

export default MarketsDetailMobile
