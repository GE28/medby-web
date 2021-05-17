import React, { FC } from 'react';

import Header from '../../components/header';
import GitHubLink from '../../components/githubLink';
import Footer from '../../components/footer';

import { Container } from '../styles';
import { MainContent } from './styles';

import RegisterForm from './form';

const RegisterPage: FC = () => (
  <Container id="main-wrapper">
    <MainContent>
      <Header />

      <h1>Faça seu cadastro</h1>

      <RegisterForm />
    </MainContent>

    <Footer>
      <GitHubLink />
    </Footer>
  </Container>
);

export default RegisterPage;
