/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-duplicates */
import React, {
  FC,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import ms from 'ms';

import { userContext } from '../../global/UserContext';
import { toastContext } from '../../global/ToastContext';

import axios from '../../services/axios';
import {
  sendToastIfNoResponse,
  logoutIfErrorStatus,
} from '../../services/axios/errorHandlers';

import { AppointmentsDataResponse } from '../../services/axios/responses';
import { avatarsPath } from '../../services/axios/paths';

import Appointment from '../../types/Appointment';

import AppointmentsContainer from './appointment/container';
import GitHubLink from '../../components/githubLink';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Profile from '../../components/profile';

import { Container, MainContent } from '../styles';

interface AppointmentContext {
  selected?: Appointment;
  select(appointment: Appointment): void;
  loadMore(): void;
}

interface StoredAppointments {
  appointmentsData: Appointment[];
  stored_at: number;
}

export const appointmentContext = createContext({} as AppointmentContext);
const { Provider } = appointmentContext;

const HomePage: FC = () => {
  const { user, logout } = useContext(userContext);
  const { addToast } = useContext(toastContext);

  const [appointments, setAppointments] = useState(() => {
    const data = localStorage.getItem('@medby/appointments');
    if (!data) return [] as Appointment[];

    const { appointmentsData, stored_at } = JSON.parse(
      data,
    ) as StoredAppointments;

    if (Date.now() > stored_at + ms('10m')) {
      localStorage.removeItem('@medby/appointments');
      return [] as Appointment[];
    }

    return appointmentsData;
  });

  const [selected, setSelected] = useState({} as Appointment);
  const [showRest, setShowRest] = useState(false);

  const select = useCallback((appointment: Appointment) => {
    setSelected(appointment);
  }, []);

  useEffect(() => {
    async function getAppointments() {
      if (appointments.length > 0 && !showRest) return;

      try {
        const response = await axios.get<AppointmentsDataResponse>(
          'appointments',
          {
            headers: { Authorization: `Bearer ${user.token}` },
            ...(showRest && { params: { showRest } }),
          },
        );

        const appointmentsData = response.data.map((serverAppointment) => {
          const {
            id,
            time,
            final_price,
            doctor: {
              avatar = '',
              document,
              name: doctorName,
              specialty: { display_name: doctorSpec },
              unit: { name: unit, cep, complements },
            },
          } = serverAppointment;

          return {
            id,
            day: format(new Date(time), 'P', { locale: ptBR }),
            time: format(new Date(time), "HH'h'mm'm'"),
            unit: `${unit}`,
            complements,
            cep,
            price: final_price,
            doctorDocument: document,
            doctorName: `${doctorName}`,
            doctorSpec,
            doctorAvatar: avatar && avatarsPath + avatar,
          } as Appointment;
        });

        localStorage.setItem(
          '@medby/appointments',
          JSON.stringify({ appointmentsData, stored_at: Date.now() }),
        );

        setShowRest(false);

        setAppointments(
          showRest
            ? (oldData) => [
                ...oldData,
                ...appointmentsData.filter(
                  (key, i) => appointmentsData[i]?.id !== oldData[i]?.id,
                ),
              ]
            : appointmentsData,
        );
      } catch (err) {
        const offlineAppointmentsToast = {
          title: 'Falha ao carregar consultas',
          message: 'O servidor está offline',
          type: 'error' as const,
        };

        logoutIfErrorStatus(err, logout);
        sendToastIfNoResponse(err, addToast, offlineAppointmentsToast);
      }
    }

    getAppointments();
  }, [appointments]);

  return (
    <Container>
      <MainContent>
        <Header logged>
          <Profile />
        </Header>

        <Provider
          value={{
            selected,
            select,
            loadMore: () => {
              setShowRest(true);
              setAppointments((old) => [...old]);
            },
          }}
        >
          <AppointmentsContainer>{appointments}</AppointmentsContainer>
        </Provider>
      </MainContent>

      <Footer>
        <GitHubLink />
      </Footer>
    </Container>
  );
};

export default HomePage;
