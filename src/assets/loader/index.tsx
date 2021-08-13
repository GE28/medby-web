import React, { FC } from 'react';

import { IconBaseProps } from 'react-icons';
import { FiLoader } from 'react-icons/fi';

import SVGLoaderContainer from './styles';

const LoaderSVG: FC<IconBaseProps> = ({ size = '24px', ...rest }) => {
  return (
    <SVGLoaderContainer>
      <FiLoader size={size} {...rest} />
    </SVGLoaderContainer>
  );
};

export default LoaderSVG;
