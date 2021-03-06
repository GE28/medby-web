import styled, { keyframes } from 'styled-components/macro';

const fullRotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const SVGLoaderContainer = styled.div`
  display: inline-flex;

  align-items: center;
  justify-content: center;

  svg {
    flex-grow: 1;
    animation: ${fullRotateAnimation} 1s linear infinite;
  }
`;

export default SVGLoaderContainer;
