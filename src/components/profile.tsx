/* eslint-disable import/no-duplicates */
import React, { FC, useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';

import { FiUser } from 'react-icons/fi';

import { userContext } from '../global/UserContext';

import { ProfileWrapper } from './styles';

import AvatarContainer from './avatarContainer';

const Profile: FC = () => {
  const { user } = useContext(userContext);
  const { avatar } = user.data;

  const name = user.data.name.split(' ', 1);

  const greetUser = useCallback(() => {
    const now = new Date();
    const time = now.getHours() * 100 + now.getMinutes();

    if (time < 1159) return `Bom dia, ${name}!`;
    if (time > 1759) return `Boa noite, ${name}!`;

    return `Boa tarde, Rodrigo!`;
  }, [name]);

  return (
    <ProfileWrapper>
      <div className="avatar-container">
        <AvatarContainer
          imageSrc={avatar}
          title='Você pode alterar sua foto em "Minha conta"'
        />
      </div>
      <div>
        <h4>{greetUser()}</h4>
        <Link to="/account">
          <FiUser />
          <span>Minha conta</span>
        </Link>
      </div>
    </ProfileWrapper>
  );
};

export default Profile;
