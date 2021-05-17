import React, { FC } from 'react';

import { DefaultHeader, LogoContainer } from './styles';

import medbyLogo from '../assets/logo.svg';
import medbyLLogo from '../assets/logo_logged.svg';

interface CustomContainer {
  logged?: true;
}

const Header: FC<CustomContainer> = ({ children, logged }) => (
  <DefaultHeader id="header" logged={logged}>
    <LogoContainer>
      {logged ? (
        <img alt="Medby Logo" src={medbyLLogo} />
      ) : (
        <img alt="Medby Logo" src={medbyLogo} />
      )}
      <span>MEDBY</span>
    </LogoContainer>
    {children}
  </DefaultHeader>
);

export default Header;
