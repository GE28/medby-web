import React, { FC, ButtonHTMLAttributes } from 'react';

import { FiLoader } from 'react-icons/fi';

import { DefaultButton } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button: FC<ButtonProps> = ({ children, loading = false, ...rest }) => {
  return (
    <DefaultButton type="button" {...rest}>
      {loading ? <FiLoader size="24px" /> : children}
    </DefaultButton>
  );
};

export default Button;
