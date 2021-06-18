import React, { FC, ButtonHTMLAttributes } from 'react';

import Loader from '../assets/loader';

import { DefaultButton } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button: FC<ButtonProps> = ({ children, loading = false, ...rest }) => {
  return (
    <DefaultButton type="button" {...rest}>
      {loading ? <Loader size="24px" /> : children}
    </DefaultButton>
  );
};

export default Button;
