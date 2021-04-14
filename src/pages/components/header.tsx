import React, { HTMLAttributes } from 'react';

import { DefaultHeader } from './styles';

type HTMLProps = HTMLAttributes<HTMLElement>;

const Header: React.FC<HTMLProps> = ({ children, ...props }) => (
  <DefaultHeader id="header" {...props}>
    {children}
  </DefaultHeader>
);

export default Header;
