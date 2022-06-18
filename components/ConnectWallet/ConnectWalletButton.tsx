import * as React from 'react';
import { Box, ResponsiveContext, Text, Image } from 'grommet';
import { useStore } from '../../api/cosmosStores';
import { useAccountConnection } from '../../lib/hooks/account/useAccountConnection';
import './ConnectWallet.css';
import GradientBox from 'components/common/GradientBox/GradientBox';
import { observer } from 'mobx-react-lite';
import { PrimaryBtn } from 'components/common';
import SignOutIcon from '../../public/images/sidebar/sign-out.png';
import { Chain } from 'lib/hooks/chain/context';
import { useWeb3 } from 'api/web3';
import { connect } from 'api/web3/providers';

const ConnectWalletButton = ({ chain }: { chain: Chain }) => {
  const { isAccountConnected, disconnectAccount, connectAccount } = useAccountConnection();
  const { accountStore, chainStore } = useStore();
  const umeeAccount = accountStore.getAccount(chainStore.current.chainId);
  const size = React.useContext(ResponsiveContext);
  const { account } = useWeb3();

  return (
    <>
      {chain === Chain.cosmos ? (
        umeeAccount.bech32Address ? (
          <GradientBox
            pad={size === 'small' ? 'medium' : 'small'}
            onClick={() => (isAccountConnected ? disconnectAccount() : null)}
          >
            {size === 'small' || size === 'medium' ? (
              <Box direction="row" justify="between" align="center">
                <Text
                  alignSelf="center"
                  size={size === 'small' || size === 'medium' ? 'small' : 'xsmall'}
                  color={'clrWhite'}
                >
                  {umeeAccount.name}
                </Text>
                <Box>
                  <Image width={'30px'} src={SignOutIcon} alt="sign out" />
                </Box>
              </Box>
            ) : (
              <Text
                alignSelf="center"
                size={size === 'small' || size === 'medium' ? 'small' : 'xsmall'}
                color={'clrWhite'}
              >
                {umeeAccount.name}
              </Text>
            )}
          </GradientBox>
        ) : (
          <PrimaryBtn
            textSize={size === 'small' || size === 'medium' ? 'small' : 'xsmall'}
            text="Connect"
            round="xlarge"
            onClick={() => connectAccount()}
          />
        )
      ) : (
        !account && (
          <PrimaryBtn
            textSize={size === 'small' || size === 'medium' ? 'small' : 'xsmall'}
            text="Connect"
            round="xlarge"
            onClick={() => connect()}
          />
        )
      )}
    </>
  );
};

export default observer(ConnectWalletButton);
