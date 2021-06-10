/* eslint-disable import/no-duplicates */
import React, { FC, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { FiUser } from 'react-icons/fi';

import { ProfileWrapper } from './styles';

import AvatarContainer from './avatarContainer';

interface ProfileWrapper {
  name: string;
  avatarLink: string | null;
}

const Profile: FC<ProfileWrapper> = ({ name = '', avatarLink }) => {
  const message = useCallback(() => {
    const now = new Date();
    const time = now.getHours() * 100 + now.getMinutes();

    if (time < 1159) return `Bom dia, ${name}!`;
    if (time > 1759) return `Boa noite, ${name}!`;

    return `Boa tarde, Rodrigo!`;
  }, [name]);

  return (
    <ProfileWrapper>
      <div className="avatar-container">
        <AvatarContainer imageSrc={avatarLink} />
      </div>
      <div>
        <h4>{message()}</h4>
        <Link to="/account">
          <FiUser />
          <span>Minha conta</span>
        </Link>
      </div>
    </ProfileWrapper>
  );
};

export default Profile;
