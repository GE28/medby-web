import React, { FC } from 'react';

import Header from '../components/header';
import LogoContainer from '../components/logoContainer';
import GitHubLink from '../components/githubLink';
import Footer from '../components/footer';

import { Container, MainContent } from './styles';

import RegisterForm from './form';

const RegisterPage: FC = () => (
  <Container>
    <Header>
      <LogoContainer />
    </Header>

    <MainContent>
      <h1>Faça seu cadastro</h1>
      <RegisterForm />
    </MainContent>

    <Footer>
      <GitHubLink />
    </Footer>
  </Container>
);

export default RegisterPage;
