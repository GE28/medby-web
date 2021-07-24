/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-duplicates */
import React, { FC, createContext, useState, useCallback } from 'react';

import { AvailableTime } from '../../services/axios/responses';

import GitHubLink from '../../components/githubLink';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Profile from '../../components/profile';

import { Container } from '../styles';
import { MainContent } from './styles';

import ATContainer from './availableTimes/container';
import AppointForm from './form';

interface AvailableTimesContext {
  availableTimes: AvailableTime[];
  setAvailableTimes(aTList: AvailableTime[]): void;
  select(id: string): void;
  selectedId: string;
}

export const aTContext = createContext({} as AvailableTimesContext);
const { Provider } = aTContext;

const AppointPage: FC = () => {
  const [selectedId, select] = useState('');
  const [availableTimes, setTimes] = useState([] as AvailableTime[]);

  const setAvailableTimes = useCallback((aT: AvailableTime[]) => {
    setTimes(aT);
  }, []);

  return (
    <Container>
      <MainContent>
        <Header logged>
          <Profile />
        </Header>

        <Provider
          value={{ selectedId, select, availableTimes, setAvailableTimes }}
        >
          <ATContainer />
          <AppointForm />
        </Provider>
      </MainContent>

      <Footer>
        <GitHubLink />
      </Footer>
    </Container>
  );
};

export default AppointPage;
