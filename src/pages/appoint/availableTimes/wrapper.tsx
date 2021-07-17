import React, { FC, useContext } from 'react';

import { FiClock } from 'react-icons/fi';
import AvailableTime, { aTContext } from '..';

import { AvailableTimeWrapper as StyledAvailableTimeWrapper } from '../styles';

import AvatarContainer from '../../../components/avatarContainer';
import Button from '../../../components/button';

export interface AvailableTime {
  doctorAvatar: string;
  doctorName: string;
  id: string;
  time: string;
}

const AvailableTimeWrapper: FC<AvailableTime> = (props) => {
  const { select } = useContext(aTContext);

  const {
    time = '05h30m',
    doctorAvatar,
    doctorName = 'Not a John Doe',
  } = props;

  return (
    <StyledAvailableTimeWrapper>
      <div className="doctor-info">
        <AvatarContainer
          imageSrc={doctorAvatar}
          size={50}
          alt={`Foto de ${doctorName}`}
        />
        <span>{doctorName}</span>
      </div>
      <div className="appointment-info">
        <span className="time">
          <FiClock />
          {time}
        </span>
      </div>
      <Button className="more-info-button" onClick={() => select(props)}>
        Mais informações
      </Button>
    </StyledAvailableTimeWrapper>
  );
};

export default AvailableTimeWrapper;
