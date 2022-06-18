import React from 'react'
import Modal from 'components/common/Modal'
import { MarketsDetail } from '.'

const MarketsDetailDesktop = ({ address: tokenAddress, onClose }: { address: string; onClose: () => void }) => {
  return (
    <>
      <Modal onClose={onClose}>
        <MarketsDetail address={tokenAddress} />
      </Modal>
    </>
  )
}

export default MarketsDetailDesktop
