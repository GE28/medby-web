/* eslint-disable import/no-duplicates */
import React, { FC, useCallback } from 'react';

import { FiUser } from 'react-icons/fi';

import blankAvatar from '../assets/blank-profile.png';

import { ProfileWrapper } from './styles';

interface ProfileWrapper {
  name: string;
  avatarLink?: string;
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
      <img src={avatarLink || blankAvatar} alt="" />
      <div>
        <h4>{message()}</h4>
        <a href="/">
          <FiUser />
          <span>Minha conta</span>
        </a>
      </div>
    </ProfileWrapper>
  );
};

export default Profile;
