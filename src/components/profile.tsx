import React, { FC, useCallback, useContext, useState, useRef } from 'react';

import { Link } from 'react-router-dom';

import { FiUser, FiLogOut } from 'react-icons/fi';

import { userContext } from '../global/UserContext';

import { ProfileWrapper } from './styles';

import AvatarContainer from './avatarContainer';

const Profile: FC = () => {
  const [menuDisplay, setMenuDisplay] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const { user, logout } = useContext(userContext);
  const { avatar } = user.data;

  const name = user.data.name.split(' ', 1);

  const greetUser = useCallback(() => {
    const now = new Date();
    const time = now.getHours() * 100 + now.getMinutes();

    if (time < 1159) return `Bom dia, ${name}!`;
    if (time > 1759) return `Boa noite, ${name}!`;

    return `Boa tarde, ${name}!`;
  }, [name]);

  const setMenuVisibility = useCallback((state: boolean) => {
    if (timer?.current) clearTimeout(timer.current);

    const showAfter = 500;
    const hideAfter = 200;

    timer.current = setTimeout(
      () => setMenuDisplay(state),
      state ? showAfter : hideAfter,
    );
  }, []);

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
        <Link
          to="/account"
          onMouseOver={() => setMenuVisibility(true)}
          onMouseOut={() => setMenuVisibility(false)}
        >
          <FiUser />
          <span>Minha conta</span>
        </Link>
      </div>

      {menuDisplay ? (
        <div
          className="menu"
          onMouseOver={() => setMenuVisibility(true)}
          onFocus={() => setMenuVisibility(true)}
          onMouseOut={() => setMenuVisibility(false)}
          onBlur={() => setMenuVisibility(false)}
        >
          <span>Não é você?</span>
          <button type="button" onClick={logout}>
            <FiLogOut /> Sair
          </button>
        </div>
      ) : null}
    </ProfileWrapper>
  );
};

export default Profile;
