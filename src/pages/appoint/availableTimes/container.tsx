import React, { FC, useMemo, useContext } from 'react';

import { aTContext } from '..';
import AvailableTimeWrapper, { AvailableTime } from './wrapper';

import { AvailableTimesContainer as StyledContainer } from '../styles';

interface AppointmentContainer {
  children?: AvailableTime[];
}

const AppointmentsContainer: FC<AppointmentContainer> = () => {
  const { availableTimes } = useContext(aTContext);

  const availableTimesList = useMemo(
    () =>
      availableTimes?.map((aT) => <AvailableTimeWrapper key={aT.id} {...aT} />),
    [availableTimes],
  );

  return (
    <>
      <StyledContainer>
        <ol>{availableTimesList}</ol>
      </StyledContainer>
    </>
  );
};

export default AppointmentsContainer;
