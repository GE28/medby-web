/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-duplicates */
import React, {
  FC,
  createContext,
  useEffect,
  useState,
  useCallback,
  useContext,
} from 'react';

import axios from '../../services/axios';
import { sendToastIfNoResponse } from '../../services/axios/errorHandlers';

import { toastContext } from '../../global/ToastContext';

import { AvailableTimeResponse as AvailableTime } from '../../services/axios/responses';

import GitHubLink from '../../components/githubLink';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Profile from '../../components/profile';

import { Container } from '../styles';
import { MainContent, Wrapper } from './styles';

import ATContainer from './availableTimes/container';
import ATModal from './availableTimes/modal';
import AppointForm from './form';

type obj = Record<string, unknown>;

interface AvailableTimesContext {
  aTCount: number;
  availableTimes: AvailableTime[] | null;
  page: number;
  setAvailableTimes(value: React.SetStateAction<AvailableTime[] | null>): void;
  selectedId: string;
  select(id: string): void;
  search(otherPage?: number, headers?: obj, query?: obj): void;
}

export const aTContext = createContext({} as AvailableTimesContext);
const { Provider } = aTContext;

const AppointPage: FC = () => {
  const { addToast } = useContext(toastContext);

  const [selectedId, select] = useState('' as string);
  const [availableTimes, setAvailableTimes] = useState(
    null as AvailableTime[] | null,
  );

  const [page, setPage] = useState(1);
  const [aTCount, setATCount] = useState(0);

  const [searchData, setSearchData] = useState(
    {} as { headers: obj; query: obj },
  );
  const [willSearch, setWillSearch] = useState(false);

  const search = useCallback(
    (otherPage: number, headers?: obj, query?: obj) => {
      setPage(otherPage || 1);

      if (headers && query) {
        setSearchData({ headers, query });
      }

      setWillSearch(true);
    },
    [],
  );

  useEffect(() => {
    const { headers, query } = searchData;
    if (!(willSearch && headers && query)) {
      return;
    }

    async function getATs() {
      try {
        const response = await axios.get('appointments/available', {
          headers,
          params: {
            ...query,
            page,
          },
        });

        setWillSearch(false);
        setATCount(response.data.metadata.count);
        setAvailableTimes(response.data.data);
      } catch (err) {
        const offlineATtoast = {
          title: 'Falha ao carregar horários',
          message: 'O servidor está offline',
          type: 'error' as const,
        };

        sendToastIfNoResponse(err, addToast, offlineATtoast);
      }
    }

    getATs();
  }, [page, search, searchData, willSearch]);

  return (
    <Container>
      <MainContent>
        <Header logged>
          <Profile />
        </Header>

        <Provider
          value={{
            aTCount,
            page,
            search,
            selectedId,
            select,
            availableTimes,
            setAvailableTimes,
          }}
        >
          <ATModal />
          <Wrapper>
            <AppointForm />
            <ATContainer />
          </Wrapper>
        </Provider>
      </MainContent>

      <Footer>
        <GitHubLink />
      </Footer>
    </Container>
  );
};

export default AppointPage;
