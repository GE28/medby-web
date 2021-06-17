import React, { FC } from 'react';
import { FiLoader } from 'react-icons/fi';

import SVGLoaderContainer from './styles';

const LoaderSVG: FC = () => {
  return (
    <SVGLoaderContainer>
      <FiLoader />
    </SVGLoaderContainer>
  );
};

export default LoaderSVG;
