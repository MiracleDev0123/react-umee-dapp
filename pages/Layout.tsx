import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { Box, Text, Image, ResponsiveContext, BoxProps } from 'grommet'
import Image1 from '../public/images/bottom-bg1.png'
import Image2 from '../public/images/bottom-bg2.png'
import ImageWhite1 from '../public/images/bottom-bg-white-1.png'
import ImageWhite2 from '../public/images/bottom-bg-white-2.png'
import { Theme, useTheme } from 'lib/hooks/theme/context'
import { ToggleSwitch } from 'components'
import { Chain, useChain } from 'lib/hooks/chain/context'
import NavBarOpen from 'components/NavBar/NavBarOpen'
import Logo from '../public/images/Logo.svg'

export interface LayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

interface ContainerProps extends BoxProps {
  children: React.ReactNode;
  size: string;
  className?: string;
}

const Container = ({ children, size, className, ...props }: ContainerProps) => (
  <Box
    pad={{
      horizontal: size === 'small' ? 'large' : size === 'medium' || size === 'large' ? 'medium' : 'large',
    }}
    className={className}
    {...props}
  >
    {children}
  </Box>
)

const Background1 = ({ size, themeMode }: { size: string; themeMode: Theme }) => {
  return (
    <Box direction="row" justify="center" width="full" style={{ position: 'absolute', bottom: 0, left: 0 }}>
      <Box className="content" pad={{ horizontal: 'xsmall' }}>
        <Image src={themeMode === Theme.light ? Image1 : ImageWhite1} alt="background" width={'230px'} />
      </Box>
    </Box>
  )
}

const Background2 = ({ size, themeMode }: { size: string; themeMode: Theme }) => {
  return (
    <Box direction="row" justify="center" width="full" style={{ position: 'absolute', bottom: 0, right: 0 }}>
      <Box direction="row" justify="end" className="content" pad={{ horizontal: 'xsmall' }}>
        <Image src={themeMode === Theme.light ? Image2 : ImageWhite2} alt="background" width={'230px'} />
      </Box>
    </Box>
  )
}

const Layout: React.FC<LayoutProps> = ({ title, subtitle, children }) => {
  const location = useLocation()
  const size = useContext(ResponsiveContext)
  const { themeMode } = useTheme()
  const { chainMode, setChainMode } = useChain()

  return (
    <>
      <Box pad={{ bottom: '150px' }}>
        <Container
          pad={{
            vertical: size === 'small' ? 'large' : 'medium',
            horizontal: size === 'small' ? 'large' : size === 'medium' || size === 'large' ? 'medium' : 'large',
          }}
          direction="row"
          justify="between"
          align="center"
          border={
            size === 'small' || size === 'medium'
              ? { side: 'bottom', size: '1px', color: 'clrBorderGrey' }
              : undefined
          }
          size={size}
          className={size === 'small' || size === 'medium' ? 'fixed-nav' : ''}
          background={'clrBackground'}
        >
          {size === 'small' || size === 'medium' ? (
            <Box direction="row" align="center">
              <Image src={Logo} alt="umee logo" width={'32px'} />
              <Text
                margin={{ left: 'small', top: '-2px' }}
                style={{ fontFamily: 'Moret' }}
                color="clrTextAndDataListHeader"
                size="32px"
              >
                Umee
              </Text>
            </Box>
          ) : (
            <Text
              weight={'bold'}
              style={{ fontFamily: 'Moret' }}
              size={size === 'small' || size === 'medium' ? '36px' : 'xlarge'}
              color="clrTextAndDataListHeader"
            >
              {title}
            </Text>
          )}
          <Box>{(size === 'small' || size === 'medium') && <NavBarOpen />}</Box>
        </Container>
        <Container margin={{ top: size === 'small' ? 'large' : 'medium' }} size={size}>
          {size !== 'small' && size !== 'medium' && (
            <Box
              direction="row"
              justify={subtitle ? 'between' : 'end'}
              align="center"
              className={location.pathname == '/dashboard' ? '' : subtitle ? 'border-gradient-bottom' : ''}
              pad={{ bottom: 'medium' }}
            >
              {subtitle && (
                <Text color="clrTextAndDataListHeader" size={size === 'small' ? 'small' : 'medium'}>
                  {subtitle}
                </Text>
              )}
              <Box direction="row" justify="end">
                <ToggleSwitch
                  choiceB={Chain.ethereum}
                  choiceA={Chain.cosmos}
                  defaultSelected={chainMode}
                  handler={(chain) => setChainMode(chain)}
                />
              </Box>
            </Box>
          )}
          <Box pad={{ top: size === 'small' || size === 'medium' ? '84px' : '' }}>{children}</Box>
        </Container>
      </Box>
      {location.pathname === '/dashboard' ? (
        <Background2 themeMode={themeMode} size={size} />
      ) : (
        <Background1 themeMode={themeMode} size={size} />
      )}
    </>
  )
}

export default Layout
