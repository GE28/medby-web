/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-duplicates */
import React, {
  FC,
  createContext,
  useState,
  useCallback,
  useEffect,
} from 'react';

import { AvailableTime } from './availableTimes/wrapper';

import GitHubLink from '../../components/githubLink';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Profile from '../../components/profile';

import { Container } from '../styles';
import { MainContent } from './styles';

import AppointForm from './form';

interface AvailableTimesContext {
  availableTimes?: AvailableTime[];
  select(at: AvailableTime): void;
  setAvailableTimes(aTList: AvailableTime[]): void;
}

export const aTContext = createContext({} as AvailableTimesContext);
const { Provider } = aTContext;

const AppointPage: FC = () => {
  const [selected, setSelected] = useState({} as AvailableTime);
  const [availableTimes, setTimes] = useState([] as AvailableTime[]);

  const select = useCallback((aT: AvailableTime) => {
    setSelected(aT);
  }, []);

  const setAvailableTimes = useCallback((aT: AvailableTime[]) => {
    setTimes(aT);
  }, []);

  return (
    <Container>
      <MainContent>
        <Header logged>
          <Profile />
        </Header>

        <Provider value={{ select, setAvailableTimes }}>
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
