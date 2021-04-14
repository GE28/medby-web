import React, { HTMLAttributes } from 'react';

import { Footer } from './styles';

type HTMLProps = HTMLAttributes<HTMLElement>;

const GitHubLink: React.FC<HTMLProps> = ({ children, ...props }) => (
  <Footer id="footer" {...props}>
    {children}
  </Footer>
);

export default GitHubLink;
