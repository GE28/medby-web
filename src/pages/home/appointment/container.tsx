import React, { FC, useMemo, useContext, useState } from 'react';

import { FiList } from 'react-icons/fi';

import { appointmentContext } from '..';
import { Appointment, AppointmentWrapper } from './wrapper';
import AppointmentModal from './modal';

import { AppointmentsContainer as StyledContainer } from '../styles';

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

  const { selected, loadMore } = useContext(appointmentContext);
  const [showButton, setShowButton] = useState(true);

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
        {children && children.length > 9 && showButton && (
          <div className="load-more">
            <Button
              className="action-button"
              onClick={() => {
                loadMore();
                setShowButton(false);
              }}
            >
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
