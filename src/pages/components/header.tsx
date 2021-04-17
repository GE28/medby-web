import React, { FC, HTMLAttributes } from 'react';

import { DefaultHeader } from './styles';

type HTMLProps = HTMLAttributes<HTMLElement>;

const Header: FC<HTMLProps> = ({ children, ...rest }) => (
  <DefaultHeader id="header" {...rest}>
    {children}
  </DefaultHeader>
);

export default Header;
