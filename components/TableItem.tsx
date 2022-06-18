import React from 'react';
import { BigNumber } from 'ethers';
import { TextItem, PrimaryText } from './DataList';
import { bigNumberToString } from 'lib/number-utils';
import { TextProps } from 'grommet';
import { Chain, useChain } from 'lib/hooks/chain/context';

interface ITableItems {
  borrowingEnabled: boolean;
  variableAPR: BigNumber | string;
  aprDecimals: BigNumber;
  textSize?: TextProps['size'];
}

const TableItem = ({ borrowingEnabled, variableAPR, aprDecimals, textSize }: ITableItems) => {
  const { chainMode } = useChain();

  if (!borrowingEnabled) {
    return (
      <>
        <TextItem justify="start">
          <PrimaryText color="clrTextAndDataListHeader">-</PrimaryText>
        </TextItem>
      </>
    );
  } else {
    return (
      <>
        <TextItem justify="start">
          <PrimaryText color="clrTextAndDataListHeader" size={'small'}>
            {variableAPR && (chainMode == Chain.ethereum ? bigNumberToString(variableAPR, aprDecimals) : variableAPR)}%
          </PrimaryText>
        </TextItem>
      </>
    );
  }
};

export default TableItem;
