import React, { FC } from 'react';

import GitHubLink from '../../components/githubLink';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Profile from '../../components/profile';

import { Container, MainContent } from '../styles';

const HomePage: FC = () => (
  <Container>
    <MainContent>
      <Header logged>
        <Profile />
      </Header>

      <h1>Bem-vindo</h1>
    </MainContent>

    <Footer>
      <GitHubLink />
    </Footer>
  </Container>
);

export default HomePage;
