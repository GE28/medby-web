import React, { FC, ButtonHTMLAttributes } from 'react';

import { DefaultButton } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ children, ...rest }) => (
  <DefaultButton type="button" {...rest}>
    {children}
  </DefaultButton>
);

export default Button;
