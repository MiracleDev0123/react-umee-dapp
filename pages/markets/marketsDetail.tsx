import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Box, ResponsiveContext } from 'grommet';
import { BigNumber } from 'ethers';
import { InfoWindow, InfoWindowBody } from 'components/InfoWindow';
import { useData } from 'api/data';
import { bigNumberToString, bigNumberToUSDString, bigNumberToNumber } from 'lib/number-utils';
import PageLoading from 'components/common/Loading/PageLoading';
import { useUserBalances } from 'api/data/allowanceData';
import { InfoPanelItem } from 'components';
import Modal from 'components/common/Modal';
import { MarketDetailsBox } from './MarketDetailsBox';
import { TTokenConfig } from 'lib/types';
import { useUsageAsCollateral } from 'lib/hooks/useUsageAsCollateral';
import InfoCustomMeter from 'components/InfoBar/InfoCustomMeter';
import { InfoPanelItemStyles } from 'components/InfoBar/InfoPanelItem';
import { getMaxBorrows } from 'lib/health-utils';
import TokenLogo from 'components/TokenLogo';
import { PrimaryBtn } from 'components/common';
import { useWeb3 } from 'api/web3';

const defaultDecimals = { ATOM: 6, DAI: 18, USDC: 6, USDT: 6, WETH: 18 };

const MarketsDetail = ({
  address: tokenAddress,
  onClose,
  chainType,
}: {
  address: string;
  onClose: (show: boolean) => void;
  chainType: string;
}) => {
  const size = useContext(ResponsiveContext);
  const web3 = useWeb3();
  const { ReserveData, ReserveConfigurationData, UserReserveData, UserAccountData, priceData } = useData();
  const [loading, setLoading] = useState<boolean>(true);
  const [decimals, setDecimals] = useState<BigNumber>(BigNumber.from(18));
  const [marketsDetail, setMarketDetail] = useState<any>();
  const [token, setToken] = useState<{
    symbol: string;
    address: string;
    usdPrice: number;
    availableLiquidity: BigNumber;
    totalStableDebt: BigNumber;
    totalVariableDebt: BigNumber;
    liquidityRate: BigNumber;
    variableBorrowRate: BigNumber;
    stableBorrowRate: BigNumber;
    averageStableBorrowRate: BigNumber;
    liquidityIndex: BigNumber;
    variableBorrowIndex: BigNumber;
    lastUpdateTimestamp: number;
  }>();
  const [tokenConfig, setTokenConfig] = useState<TTokenConfig>();
  const [userReserve, setUserReserve] = useState<{
    symbol: string;
    address: string;
    decimals: BigNumber;
    currentUTokenBalance: BigNumber;
    currentStableDebt: BigNumber;
    currentVariableDebt: BigNumber;
    principalStableDebt: BigNumber;
    scaledVariableDebt: BigNumber;
    stableBorrowRate: BigNumber;
    liquidityRate: BigNumber;
    stableRateLastUpdated: number;
    usageAsCollateralEnabled: boolean;
  }>();
  const [tokenAddresses, setTokenAddresses] = useState<string[]>([]);
  const walletBalances = useUserBalances(tokenAddresses);
  const [availableBorrowAmount, setAvailableBorrowAmount] = useState<BigNumber>(BigNumber.from(0));

  const canUseAsCollateral = useUsageAsCollateral({ address: tokenAddress });

  useEffect(() => {
    if (ReserveData && ReserveConfigurationData && tokenAddress && ReserveData.length > 1) {
      setLoading(false);
    }
  }, [ReserveData, ReserveConfigurationData, tokenAddress]);

  useEffect(() => {
    if (tokenAddress && ReserveData && ReserveConfigurationData && UserReserveData) {
      const address = tokenAddress as string;
      const t = ReserveData.find((r) => r.address.toLowerCase() === address.toLowerCase());

      const reserveConfig = ReserveConfigurationData.find((r) => r.address === tokenAddress);
      setTokenConfig(reserveConfig);
      setUserReserve(UserReserveData.find((r) => r.address === tokenAddress));
      setToken(t);

      const addresses = [];
      if (tokenAddress) {
        addresses.push(tokenAddress);
      }
      setTokenAddresses(addresses);

      let decimals;
      if (web3.account) {
        decimals = reserveConfig?.decimals || BigNumber.from(18);
      } else {
        const symbol = t?.symbol;
        decimals = BigNumber.from(defaultDecimals[symbol as keyof typeof defaultDecimals]);
      }
      setDecimals(decimals);

      if (UserAccountData && token && priceData && token.symbol && t) {
        // Maximum a user can Borrow to keep health in good standing
        const MaxAvailable = getMaxBorrows(
          UserAccountData,
          priceData[token.symbol].eth,
          token.symbol,
          decimals.toString()
        );

        if (t.availableLiquidity.lt(MaxAvailable)) {
          setAvailableBorrowAmount(t.availableLiquidity);
        } else {
          setAvailableBorrowAmount(MaxAvailable);
        }
      }
    }
  }, [ReserveConfigurationData, ReserveData, UserAccountData, tokenAddress, token, priceData, decimals, UserReserveData, web3.account]);

  useEffect(() => {
    if(token && userReserve) {
      const totalBorrowed = token.totalStableDebt.add(token.totalVariableDebt) || BigNumber.from(0);
      const totalBorrowedUsd = bigNumberToUSDString(totalBorrowed, decimals, token.usdPrice);
      const totalLiquidity = token.availableLiquidity.add(totalBorrowed || 0) || BigNumber.from(0);
      const totalLiquidityUsd = bigNumberToUSDString(totalLiquidity || 0, decimals, token.usdPrice);
      let borrowedPortion;
      let availablePortion;
      if (!totalLiquidity.isZero()) {
        const numberBorrowed = bigNumberToNumber(totalBorrowed, decimals);
        const numberLiquid = bigNumberToNumber(totalLiquidity, decimals);
        const numberAvailable = bigNumberToNumber(token.availableLiquidity || 0, decimals);
        borrowedPortion = numberBorrowed / numberLiquid;
        availablePortion = numberAvailable / numberLiquid;
      } else {
        borrowedPortion = 0;
        availablePortion = 0;
      }
      const availableLiquidity = token.availableLiquidity || BigNumber.from(0);
      const availableLiquidityUsd = bigNumberToUSDString(availableLiquidity, decimals, token.usdPrice);

      const returnValue = {
        totalBorrowed: totalBorrowed,
        totalLiquidity: totalLiquidity,
        borrowedPortion: borrowedPortion,
        availablePortion: availablePortion,
        totalBorrowedUsd: totalBorrowedUsd,
        availableLiquidity: availableLiquidity,
        availableLiquidityUsd: availableLiquidityUsd,
        totalLiquidityUsd: totalLiquidityUsd,
        liquidationThreshold: tokenConfig?.liquidationThreshold,
        ltv: tokenConfig?.ltv,
        liquidationBonus: tokenConfig?.liquidationBonus,
        symbol: token.symbol,
        canUseAsCollateral: canUseAsCollateral,
        balance: walletBalances[0],
        decimals: decimals,
        liquidityRate: token.liquidityRate,
        variableBorrowRate: token.variableBorrowRate,
        currentVariableDebt: userReserve.currentVariableDebt,
        currentStableDebt: userReserve.currentStableDebt,
        currentUTokenBalance: userReserve.currentUTokenBalance,
        availableBorrowAmount: availableBorrowAmount,
        tokenAddress: tokenAddress
      };

      setMarketDetail(returnValue);
    }
  }, [tokenConfig, token, userReserve, decimals, availableBorrowAmount, canUseAsCollateral, walletBalances, tokenAddress]);

  if (loading) {
    return <PageLoading />;
  }
  return (
    <>
      {marketsDetail &&  (
        <Modal onClose={onClose}>
          <Box width={'100%'} direction="row" fill="horizontal" alignContent="center" alignSelf="center" align="center">
            <Box width={'100%'} direction="column">
              <InfoWindow flex round="5px">
                <InfoWindowBody
                  border={{ size: '1px', color: 'clrSideNavBorder' }}
                  round="5px"
                  pad={size === 'small' ? 'small' : 'xsmall'}
                  background="clrBackground"
                >
                  <Box round="5px" direction={size === 'small' ? 'column' : 'row'} align="center" justify="center">
                    <Box width={{ min: size !== 'small' ? '190px' : '' }}>
                      <InfoPanelItem
                        title="TOTAL BORROWED"
                        titleBg="clrBoxGradient"
                        titleDirection="row"
                        textSize="xsmall"
                        data={[
                          { value: '$', textSize: 'medium' },
                          {
                            value: Number(marketsDetail.totalBorrowedUsd).toLocaleString(),
                            textSize: 'medium',
                          },
                        ]}
                        align={size === 'small' ? 'center' : 'end'}
                      />
                    </Box>
                    <Box style={{ position: 'relative' }}>
                      <InfoCustomMeter value={marketsDetail.borrowedPortion} />
                      <Box
                        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                      >
                        <TokenLogo width="74" height="74" symbol={marketsDetail.symbol} />
                      </Box>
                    </Box>
                    <Box width={{ min: size !== 'small' ? '190px' : '' }}>
                      <InfoPanelItem
                        title="AVAILABLE LIQUIDITY"
                        titleBg="clrTextAndDataListHeader"
                        titleDirection="row-reverse"
                        textSize="xsmall"
                        data={[
                          { value: '$', textSize: 'medium' },
                          {
                            value: Number(marketsDetail.availableLiquidityUsd).toLocaleString(),
                            textSize: 'medium',
                          },
                        ]}
                        align={size === 'small' ? 'center' : 'start'}
                      />
                    </Box>
                  </Box>
                  <Box margin={{ top: size == 'small' ? 'medium' : '' }} direction={'row'} wrap flex justify="around">
                    <Box width={size === 'small' ? '50%' : 'auto'}>
                      <InfoPanelItem
                        align="center"
                        textSize="xsmall"
                        title="MAXIMUM LTV"
                        data={
                          marketsDetail.ltv
                            ? [
                              {
                                value: marketsDetail.ltv && bigNumberToString(marketsDetail.ltv, 2),
                                textSize: 'small',
                              },
                              { value: '%', textSize: 'small' },
                            ]
                            : [{ value: '—', textSize: 'small' }]
                        }
                      />
                    </Box>
                    <Box width={size === 'small' ? '50%' : 'auto'}>
                      <InfoPanelItem
                        align="center"
                        textSize="xsmall"
                        title="LIQUIDATION THRESHOLD"
                        data={
                          marketsDetail.liquidationThreshold
                            ? [
                              {
                                value:
                                    marketsDetail.liquidationThreshold &&
                                    bigNumberToString(marketsDetail.liquidationThreshold, 2),
                                textSize: 'small',
                              },
                              { value: '%', textSize: 'small' },
                            ]
                            : [{ value: '—', textSize: 'small' }]
                        }
                      />
                    </Box>
                    <Box width={size === 'small' ? '50%' : 'auto'}>
                      <InfoPanelItem
                        align="center"
                        textSize="xsmall"
                        title="LIQUIDATION PENALTY"
                        data={
                          marketsDetail.liquidationBonus
                            ? [
                              {
                                value:
                                    marketsDetail.liquidationBonus &&
                                    (parseFloat(bigNumberToString(marketsDetail.liquidationBonus, 2)) - 100).toFixed(2),
                                textSize: 'small',
                              },
                              { value: '%', textSize: 'small' },
                            ]
                            : [{ value: '—', textSize: 'small' }]
                        }
                      />
                    </Box>
                    <Box width={size === 'small' ? '50%' : 'auto'}>
                      <InfoPanelItem
                        align="center"
                        textSize="xsmall"
                        title="COLLATERAL"
                        data={[{ value: canUseAsCollateral ? 'Yes' : 'No', textSize: 'small' }]}
                      />
                    </Box>
                  </Box>
                </InfoWindowBody>
              </InfoWindow>
              <InfoWindow>
                <InfoWindowBody background="transparent">
                  <Box margin={{ top: 'small' }} direction={size === 'small' ? 'column' : 'row'} gap="small" flex>
                    <MarketDetailsBox
                      background="clrBackground"
                      borderColor="clrDetailBoxBorderTop1"
                      title="SUPPLY INFORMATION"
                      textSize="xsmall"
                    >
                      <InfoPanelItem
                        title="Supply Position"
                        textSize="small"
                        justify="between"
                        style={InfoPanelItemStyles.Horizontal}
                        data={
                          web3.account
                            ? [
                              {
                                value: bigNumberToString(marketsDetail.currentUTokenBalance, decimals),
                                textSize: 'small',
                              },
                              { value: marketsDetail.symbol == 'WETH' ? 'ETH' : marketsDetail.symbol, textSize: 'small' },
                            ]
                            : [{ value: '—', textSize: 'small' }]
                        }
                      />
                      <InfoPanelItem
                        title="Wallet Balance"
                        textSize="small"
                        justify="between"
                        style={InfoPanelItemStyles.Horizontal}
                        data={
                          web3.account
                            ? [
                              {
                                value: bigNumberToString(walletBalances[0], decimals),
                                textSize: 'small',
                              },
                              { value: marketsDetail.symbol == 'WETH' ? 'ETH' : marketsDetail.symbol, textSize: 'small' },
                            ]
                            : [{ value: '—', textSize: 'small' }]
                        }
                      />
                      <InfoPanelItem
                        title="Supply APY"
                        textSize="small"
                        justify="between"
                        style={InfoPanelItemStyles.Horizontal}
                        data={[
                          {
                            value: bigNumberToString(marketsDetail.liquidityRate, BigNumber.from(25)),
                            textSize: 'small',
                          },
                          { value: '%', textSize: 'small' },
                        ]}
                      />
                      {web3.account && (
                        <Box margin={{ top: 'medium' }} direction="row" justify="center">
                          <Link
                            to={{
                              pathname: '/supply',
                              state: { tokenAddress: tokenAddress },
                            }}
                            style={{ width: '100%' }}
                          >
                            <PrimaryBtn
                              fullWidth
                              text="Supply"
                              pad={{ vertical: 'xsmall' }}
                              textSize="medium"
                              round="medium"
                            />
                          </Link>
                        </Box>
                      )}
                    </MarketDetailsBox>
                    <MarketDetailsBox
                      background="clrBackground"
                      borderColor="clrDetailBoxBorderTop3"
                      title="BORROW INFORMATION"
                      textSize="xsmall"
                    >
                      <InfoPanelItem
                        title="Borrow Position"
                        textSize="small"
                        justify="between"
                        style={InfoPanelItemStyles.Horizontal}
                        data={
                          web3.account
                            ? [
                              {
                                value:
                                    marketsDetail &&
                                    bigNumberToString(
                                      marketsDetail.currentVariableDebt.add(marketsDetail.currentStableDebt),
                                      decimals
                                    ),
                                textSize: 'small',
                              },
                              { value: marketsDetail.symbol == 'WETH' ? 'ETH' : marketsDetail.symbol, textSize: 'small' },
                            ]
                            : [{ value: '—', textSize: 'small' }]
                        }
                      />
                      <InfoPanelItem
                        title="Available"
                        textSize="small"
                        justify="between"
                        style={InfoPanelItemStyles.Horizontal}
                        data={
                          web3.account
                            ? [
                              {
                                value: bigNumberToString(marketsDetail.availableBorrowAmount, decimals),
                                textSize: 'small',
                              },
                              { value: marketsDetail.symbol == 'WETH' ? 'ETH' : marketsDetail.symbol, textSize: 'small' },
                            ]
                            : [{ value: '—', textSize: 'small' }]
                        }
                      />
                      <InfoPanelItem
                        title="Borrow APY"
                        textSize="small"
                        justify="between"
                        style={InfoPanelItemStyles.Horizontal}
                        data={[
                          {
                            value: bigNumberToString(marketsDetail.variableBorrowRate, BigNumber.from(25)),
                            textSize: 'small',
                          },
                          { value: '%', textSize: 'small' },
                        ]}
                      />
                      {web3.account && (
                        <Box margin={{ top: 'medium' }} direction="row" justify="center">
                          <Link
                            to={{
                              pathname: '/borrow',
                              state: { tokenAddress: tokenAddress },
                            }}
                            style={{ width: '100%' }}
                          >
                            <PrimaryBtn
                              fullWidth
                              text="Borrow"
                              pad={{ vertical: 'xsmall' }}
                              textSize="medium"
                              round="medium"
                            />
                          </Link>
                        </Box>
                      )}
                    </MarketDetailsBox>
                  </Box>
                </InfoWindowBody>
              </InfoWindow>
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default MarketsDetail;
