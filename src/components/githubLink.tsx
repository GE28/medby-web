import React, { FC } from 'react';

import { GithubContainer } from './styles';

import githubLogo from '../assets/github.svg';

const GitHubLink: FC = () => (
  <GithubContainer
    href="https://github.com/GE28"
    title="Clique para acessar o perfil do criador no GitHub :)"
  >
    <span>GE28</span>
    <img alt="GitHub Logo" src={githubLogo} />
  </GithubContainer>
);

export default GitHubLink;
