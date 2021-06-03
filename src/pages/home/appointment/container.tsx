import React, { FC, useMemo, useContext } from 'react';

import { FiList } from 'react-icons/fi';

import { appointmentContext } from './Context';
import { Appointment, AppointmentWrapper } from './wrapper';
import AppointmentModal from './modal';

import { AppointmentContainer as StyledContainer } from '../styles';

import Button from '../../../components/button';

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

  const { selected } = useContext(appointmentContext);

  return (
    <>
      {selected?.id && <AppointmentModal {...selected} />}
      <StyledContainer>
        <h1 id="label">
          {children?.length
            ? 'Consultas marcadas'
            : 'Você não possui consultas marcadas'}
        </h1>
        <Button id="appoint-button" className="action-button">
          Marcar uma nova consulta
        </Button>
        <ol>{appointments}</ol>
        {children && children.length > 10 && (
          <div className="load-more">
            <Button className="action-button">
              <FiList />
              <span>Exibir todas</span>
            </Button>
          </div>
        )}
      </StyledContainer>
    </>
  );
};

export default AppointmentContainer;
