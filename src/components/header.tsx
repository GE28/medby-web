import React, { FC } from 'react';

import { DefaultHeader, LogoContainer } from './styles';

import medbyLogo from '../assets/logo.svg';
import medbyLoggedLogo from '../assets/logo-logged.svg';

interface CustomHeader {
  logged?: true;
}

const Header: FC<CustomHeader> = ({ children, logged }) => (
  <DefaultHeader id="header" logged={logged}>
    <LogoContainer>
      {logged ? (
        <img alt="Medby Logo" src={medbyLoggedLogo} />
      ) : (
        <img alt="Medby Logo" src={medbyLogo} />
      )}
      <span>MEDBY</span>
    </LogoContainer>
    {children}
  </DefaultHeader>
);

export default Header;
