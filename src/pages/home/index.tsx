/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-duplicates */
import React, { FC, useEffect, useContext, useState } from 'react';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import ms from 'ms';

import { userContext } from '../../global/UserContext';
import { toastContext } from '../../global/ToastContext';

import axios from '../../services/axios';
import { AppointmentData } from '../../services/axios/responses';
import { avatarsPath } from '../../services/axios/paths';

import { Appointment } from './appointment';

import AppointmentList from './appointmentContainer';
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
            doctor: {
              avatar,
              name: doctorName,
              specialty: { display_name: doctorSpec },
              unit: { name: unit },
            },
          } = serverAppointment;

          return {
            id,
            unit,
            day: format(new Date(time), "HH'h'mm'm'"),
            time: format(new Date(time), 'P', { locale: ptBR }),
            doctorSpec,
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
        switch (err.response.status) {
          case 401:
            logout();
            break;
          case 403:
            logout();
            break;
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

        <AppointmentList>{appointments}</AppointmentList>
      </MainContent>

      <Footer>
        <GitHubLink />
      </Footer>
    </Container>
  );
};

export default HomePage;
