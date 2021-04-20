import React, { FC } from 'react';

import { Footer } from './styles';

const GitHubLink: FC = ({ children }) => (
  <Footer id="footer">{children}</Footer>
);

/* const GitHubLink: FC<HTMLProps> = React.memo((props) => (
  <Footer id="footer" {...rest}>
    {props.children}
  </Footer>
)); */

export default GitHubLink;
