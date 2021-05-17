import React, { FC } from 'react';

import Header from '../../components/header';
import GitHubLink from '../../components/githubLink';
import Footer from '../../components/footer';

import { Container, MainContent } from '../styles';

import LoginForm from './form';

const LoginPage: FC = () => (
  <Container>
    <MainContent>
      <Header />

      <h1>Área do cliente</h1>

      <LoginForm />
    </MainContent>

    <Footer>
      <GitHubLink />
    </Footer>
  </Container>
);

export default LoginPage;
