/* eslint-disable import/no-duplicates */
import React, { FC, ImgHTMLAttributes } from 'react';

import { AvatarContainer as StyledContainer } from './styles';

import blankAvatar from '../assets/blank-profile.png';

interface AvatarContainer extends ImgHTMLAttributes<HTMLImageElement> {
  imageSrc: string | null;
  size?: number;
}

const AvatarContainer: FC<AvatarContainer> = ({
  imageSrc,
  size = 64,
  ...rest
}) => {
  return (
    <StyledContainer size={size}>
      <img src={imageSrc || blankAvatar} alt="" {...rest} />
    </StyledContainer>
  );
};

export default AvatarContainer;
