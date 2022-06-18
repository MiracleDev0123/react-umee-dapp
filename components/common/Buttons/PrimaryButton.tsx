import React, { useContext } from 'react'
import clsx from 'clsx'
import { Button, Box, Text, TextProps, BoxProps, ButtonProps, ResponsiveContext } from 'grommet'

export interface ButtonItemProps extends BoxProps {
  text?: string;
  textSize?: TextProps['size'];
  hoverIndicator?: ButtonProps['hoverIndicator'];
  href?: ButtonProps['href'];
  onClick?(e: React.MouseEvent): void;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const PrimaryBtn = ({
  text,
  direction,
  justify,
  align,
  pad,
  margin,
  round,
  onClick,
  href,
  textSize,
  hoverIndicator,
  fullWidth,
  disabled,
  className,
  children,
  ...props
}: ButtonItemProps) => {
  const size = useContext(ResponsiveContext)

  return (
    <Button
      style={{ width: fullWidth ? '100%' : 'auto' }}
      href={href}
      onClick={onClick}
      hoverIndicator={hoverIndicator || 'false'}
      disabled={disabled}
    >
      <Box
        background="clrBoxGradient"
        justify={justify || 'center'}
        align={align || 'center'}
        pad={pad || { vertical: size === 'small' ? 'medium' : 'small', horizontal: 'medium' }}
        margin={margin || '0'}
        round={round || '3px'}
        className={clsx('primary-btn', className)}
        direction="row"
        {...props}
      >
        {text && <Text size={textSize || 'xsmall'}>{text}</Text>}
        {children}
      </Box>
    </Button>
  )
}
