import React from 'react';

import { LogoContainer } from './styles';

import medbyLogo from '../../assets/logo.svg';

const Header: React.FC = () => (
  <LogoContainer>
    <img alt="Medby Logo" src={medbyLogo} />
    <span>MEDBY</span>
  </LogoContainer>
);

export default Header;
