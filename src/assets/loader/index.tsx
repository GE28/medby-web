import React, { FC } from 'react';

import { IconBaseProps } from 'react-icons';
import { FiLoader } from 'react-icons/fi';

import SVGLoaderContainer from './styles';

const LoaderSVG: FC<IconBaseProps> = ({ size = '24px', ...props }) => {
  return (
    <SVGLoaderContainer>
      <FiLoader size={size} {...props} />
    </SVGLoaderContainer>
  );
};

export default LoaderSVG;
