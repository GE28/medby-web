import styled, { keyframes } from 'styled-components/macro';

const fullRotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const SVGLoaderContainer = styled.div`
  display: inline-block;

  align-items: center;
  justify-content: center;

  svg {
    animation: ${fullRotateAnimation} 2s linear infinite;
  }
`;

export default SVGLoaderContainer;
