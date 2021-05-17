/* eslint-disable import/no-duplicates */
import React, { FC, useCallback } from 'react';

import { FiUser } from 'react-icons/fi';

import blankAvatar from '../assets/blank-profile.png';

import { ProfileWrapper } from './styles';

interface ProfileWrapper {
  avatarLink?: string;
}

const Profile: FC<ProfileWrapper> = ({ avatarLink }) => {
  const message = useCallback(() => {
    const now = new Date();
    const time = now.getHours() * 100 + now.getMinutes();

    if (time < 1159) return `Bom dia, Rodrigo!`;
    if (time > 1759) return `Boa noite, Rodrigo!`;

    return `Boa tarde, Rodrigo!`;
  }, []);

  return (
    <ProfileWrapper>
      {avatarLink ? (
        <img src={avatarLink} alt="" />
      ) : (
        <img src={blankAvatar} alt="" />
      )}
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
