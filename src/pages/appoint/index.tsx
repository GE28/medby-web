/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-duplicates */
import React, { FC } from 'react';

import GitHubLink from '../../components/githubLink';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Profile from '../../components/profile';

import { Container, MainContent } from '../styles';

const AppointPage: FC = () => {
  return (
    <Container>
      <MainContent>
        <Header logged>
          <Profile />
        </Header>
      </MainContent>

      <Footer>
        <GitHubLink />
      </Footer>
    </Container>
  );
};

export default AppointPage;
