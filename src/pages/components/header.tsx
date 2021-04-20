import React, { FC } from 'react';

import { DefaultHeader } from './styles';

const Header: FC = ({ children }) => (
  <DefaultHeader id="header">{children}</DefaultHeader>
);

export default Header;
