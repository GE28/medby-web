import React, { ButtonHTMLAttributes } from 'react';

import { DefaultButton } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <DefaultButton type="button" {...rest}>
    {children}
  </DefaultButton>
);

export default Button;
