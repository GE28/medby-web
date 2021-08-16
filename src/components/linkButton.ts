import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { DefaultButton } from './styles';

export default styled(Link)`
  ${DefaultButton.withComponent('a')} {
  }

  color: var(--color-white);
  text-align: center;
  border-radius: 6px;
`;
