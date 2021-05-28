import React, { FC } from 'react';

import { FiClock, FiCalendar, FiMapPin } from 'react-icons/fi';

import { AppointmentWrapper as StyledAppointmentWrapper } from './styles';

import blankAvatar from '../../assets/blank-profile.png';

import Button from '../../components/button';

export interface Appointment {
  id: string;
  unit: string;
  day: string;
  time: string;
  doctorSpec: string;
  doctorAvatar?: string;
  doctorName: string;
}

export const AppointmentWrapper: FC<Appointment> = ({
  unit = 'Unidade mais próxima',
  day = '99/99/9999',
  time = '99h99m',
  doctorSpec = 'Médico',
  doctorAvatar,
  doctorName = 'Fulano de tal',
}) => {
  return (
    <StyledAppointmentWrapper>
      <div className="doctor-info">
        <div className="avatar-container">
          <img src={doctorAvatar || blankAvatar} alt="" />
        </div>
        <div>
          <span>{doctorName}</span>
          <span>{doctorSpec}</span>
        </div>
      </div>
      <div className="appointment-info">
        <span className="time">
          <FiClock />
          {time}
        </span>
        <span className="day">
          <FiCalendar />
          {day}
        </span>
        <span className="unit">
          <FiMapPin />
          {unit}
        </span>
      </div>
      <Button className="more-info-button">Mais informações</Button>
    </StyledAppointmentWrapper>
  );
};
