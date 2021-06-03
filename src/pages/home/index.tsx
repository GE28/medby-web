/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-duplicates */
import React, { FC, useContext, useEffect, useState } from 'react';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import ms from 'ms';

import { userContext } from '../../global/UserContext';
import { toastContext } from '../../global/ToastContext';

import axios from '../../services/axios';
import { AppointmentData } from '../../services/axios/responses';
import { avatarsPath } from '../../services/axios/paths';

import { Appointment } from './appointment/wrapper';
import { AppointmentProvider } from './appointment/Context';

import AppointmentList from './appointment/container';
import GitHubLink from '../../components/githubLink';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Profile from '../../components/profile';

import { Container, MainContent } from '../styles';

const HomePage: FC = () => {
  const { user, logout } = useContext(userContext);
  const { addToast } = useContext(toastContext);

  const [appointments, setAppointments] = useState(() => {
    const data = localStorage.getItem('@medby/appointments');
    if (!data) return [] as Appointment[];

    const { appointmentsData, stored_at } = JSON.parse(data) as {
      appointmentsData: Appointment[];
      stored_at: number;
    };

    if (Date.now() > stored_at + ms('10m')) {
      localStorage.removeItem('@medby/appointments');
      return [] as Appointment[];
    }

    return appointmentsData;
  });

  useEffect(() => {
    async function getAppointments() {
      if (appointments.length > 0) return;

      try {
        const response = await axios.get<AppointmentData>('appointments', {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        const appointmentsData = response.data.map((serverAppointment) => {
          const {
            id,
            time,
            final_price,
            doctor: {
              avatar,
              document,
              name: doctorName,
              specialty: { display_name: doctorSpec },
              unit: { name: unit, cep, complements },
            },
          } = serverAppointment;

          return {
            id,
            cep,
            complements,
            day: format(new Date(time), 'P', { locale: ptBR }),
            price: final_price,
            time: format(new Date(time), "HH'h'mm'm'"),
            unit: `${unit}`,
            doctorSpec,
            doctorDocument: document,
            doctorAvatar: avatarsPath + avatar,
            doctorName: `${doctorName}`,
          } as Appointment;
        });

        localStorage.setItem(
          '@medby/appointments',
          JSON.stringify({ appointmentsData, stored_at: Date.now() }),
        );

        setAppointments(appointmentsData);
      } catch (err) {
        if (!err.response) {
          addToast({
            title: 'Falha ao carregar consultas',
            message: 'O servidor está offline',
            type: 'error',
          });
          return;
        }

        switch (err.response.status) {
          case 401:
            logout();
            return;
          case 403:
            logout();
            return;
          default:
            addToast({
              title: 'Falha ao carregar consultas',
              message: err.response.message,
              type: 'error',
            });
        }
      }
    }

    getAppointments();
  }, [appointments]);

  return (
    <Container>
      <MainContent>
        <Header logged>
          <Profile
            avatarLink={user.data.avatar}
            name={user.data.name.split(' ')[0]}
          />
        </Header>

        <AppointmentProvider>
          <AppointmentList>{appointments}</AppointmentList>
        </AppointmentProvider>
      </MainContent>

      <Footer>
        <GitHubLink />
      </Footer>
    </Container>
  );
};

export default HomePage;
