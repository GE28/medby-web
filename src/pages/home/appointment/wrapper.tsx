import React, { FC, useContext } from 'react';

import { FiClock, FiCalendar, FiMapPin } from 'react-icons/fi';

import Appointment from '../../../types/Appointment';

import { appointmentContext } from '..';
import { AppointmentWrapper as StyledAppointmentWrapper } from '../styles';

import AvatarContainer from '../../../components/avatarContainer';
import Button from '../../../components/button';

const CancelModal: FC<Appointment> = (props) => {
  const {
    id,
    unit = 'Unit Name Identifier',
    day = 'dd/mm/yyyy',
    time = '05h30m',
    doctorSpec = 'Dermatologist',
    doctorAvatar,
    doctorName = 'Not a John Doe',
  } = props;

  const { select } = useContext(appointmentContext);

  return id ? (
    <StyledAppointmentWrapper>
      <div className="doctor-info">
        <AvatarContainer
          imageSrc={doctorAvatar}
          size={50}
          alt={`Foto de ${doctorName}`}
        />

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
      <Button className="more-info-button" onClick={() => select(props)}>
        Mais informações
      </Button>
    </StyledAppointmentWrapper>
  ) : null;
};

export default CancelModal;
