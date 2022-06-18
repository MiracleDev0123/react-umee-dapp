import React, { useEffect, useState } from 'react';
import { BaseModal } from 'components/common/BaseModal';
import BorrowToken from './BorrowToken';
import { useConvexityData } from 'api/convexity';

const DepositModal = ({
  address: tokenAddress,
  onClose,
  symbol,
}: {
  address: string;
  onClose: () => void;
  symbol: string;
}) => {
  const { ConvexityAccountData } = useConvexityData();
  const [myBorrowsUSDTotal, setMyBorrowsUSDTotal] = useState<number>(0);
  const [currentltv, setCurrentLtv] = useState<string>('0');
  const [maxLtv, setMaxLtv] = useState<string>('0');
  const [initialBorrowLimit, setInitialBorrowLimit] = useState<string>('0.00');

  useEffect(() => {
    if (!ConvexityAccountData) return;
    setMyBorrowsUSDTotal(Number(ConvexityAccountData.totalBorrowed));
  }, [ConvexityAccountData]);

  // useEffect(() => {
  //   if (UserAccountData?.ltv) {
  //     setMaxLtv(UserAccountData.currentLiquidationThreshold.toString());
  //   }
  // }, [UserAccountData]);

  useEffect(() => {
    if (!ConvexityAccountData) return;
    setInitialBorrowLimit(ConvexityAccountData.borrowLimit);
  }, [ConvexityAccountData]);

  useEffect(() => {
    if (myBorrowsUSDTotal && initialBorrowLimit) {
      setCurrentLtv(((myBorrowsUSDTotal / parseFloat(initialBorrowLimit)) * 100).toFixed(2));
    }
  }, [myBorrowsUSDTotal, initialBorrowLimit]);

  return (
    <BaseModal symbol={symbol} onClose={onClose}>
      <BorrowToken
        address={tokenAddress}
        myBorrowsTotal={myBorrowsUSDTotal}
        currentLtv={currentltv}
        initialBorrowLimit={initialBorrowLimit}
        onClose={onClose}
      />
    </BaseModal>
  );
};

export default DepositModal;
