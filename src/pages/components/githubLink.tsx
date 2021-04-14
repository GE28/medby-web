import React from 'react';

import { GithubContainer } from './styles';

import githubLogo from '../../assets/github.svg';

const GitHubLink: React.FC = () => (
  <GithubContainer href="https://github.com/GE28">
    <span>GE28</span>
    <img alt="GitHub Logo" src={githubLogo} />
  </GithubContainer>
);

export default GitHubLink;
