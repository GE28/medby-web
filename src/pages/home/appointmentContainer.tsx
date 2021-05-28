import React, { FC, useMemo } from 'react';

import { FiPlus, FiList } from 'react-icons/fi';

import { Appointment, AppointmentWrapper } from './appointment';

import { AppointmentContainer as StyledContainer } from './styles';
import Button from '../../components/button';

interface AppointmentContainer {
  children?: Appointment[];
}

const AppointmentContainer: FC<AppointmentContainer> = ({ children }) => {
  const appointments = useMemo(
    () =>
      children?.map((appointment) => (
        <AppointmentWrapper key={appointment.id} {...appointment} />
      )),
    [children],
  );

  return (
    <StyledContainer>
      <h1 id="label">
        {children?.length
          ? 'Consultas marcadas'
          : 'Você não possui consultas marcadas'}
      </h1>
      <Button id="appoint-button" className="action-button">
        Marcar uma {!!children?.length && 'nova'} consulta
      </Button>
      <ol>{appointments}</ol>
      {children?.length && (
        <div className="load-more">
          <Button className="action-button">
            <FiPlus />
            <span>Mostrar mais</span>
          </Button>
          <Button className="action-button">
            <FiList />
            <span>Exibir todas</span>
          </Button>
        </div>
      )}
    </StyledContainer>
  );
};

export default AppointmentContainer;
