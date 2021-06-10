import React, { FC, useContext } from 'react';

import { userContext } from '../../global/UserContext';

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
  const { user } = useContext(userContext);

  return (
    <Container>
      <MainContent>
        <Header logged>
          <Profile
            avatarLink={user.data.avatar}
            name={user.data.name.split(' ')[0]}
          />
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
