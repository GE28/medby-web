import React, { FC } from 'react';

import AvatarForm from './avatarForm';
import EmailForm from './emailForm';
import PasswordForm from './passwordForm';

import GitHubLink from '../../components/githubLink';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Profile from '../../components/profile';

import { Container } from '../styles';
import { MainContent } from './styles';

const AccountPage: FC = () => {
  return (
    <Container>
      <MainContent>
        <Header logged>
          <Profile />
        </Header>

        <AvatarForm />
        <EmailForm />
        <PasswordForm />
      </MainContent>

      <Footer>
        <GitHubLink />
      </Footer>
    </Container>
  );
};

export default AccountPage;
