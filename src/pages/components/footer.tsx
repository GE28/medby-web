import React, { FC, HTMLAttributes } from 'react';

import { Footer } from './styles';

type HTMLProps = HTMLAttributes<HTMLElement>;

const GitHubLink: FC<HTMLProps> = ({ children, ...rest }) => (
  <Footer id="footer" {...rest}>
    {children}
  </Footer>
);

/* const GitHubLink: FC<HTMLProps> = React.memo((props) => (
  <Footer id="footer" {...rest}>
    {props.children}
  </Footer>
)); */

export default GitHubLink;
