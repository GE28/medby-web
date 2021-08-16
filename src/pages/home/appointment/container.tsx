import React, { FC, useMemo, useContext, useState } from 'react';

import { FiList } from 'react-icons/fi';

import Appointment from '../../../types/Appointment';

import { appointmentContext } from '..';
import AppointmentWrapper from './wrapper';

import Loader from '../../../assets/loader';
import { AppointmentsContainer as StyledContainer } from '../styles';

import Button from '../../../components/button';
import LinkButton from '../../../components/linkButton';

interface AppointmentContainer {
  children?: Appointment[];
}

const AppointmentsContainer: FC<AppointmentContainer> = ({ children }) => {
  const { loadMore } = useContext(appointmentContext);

  const [showButton, setShowButton] = useState(true);

  const appointments = useMemo(
    () =>
      children?.map((appointment) => (
        <AppointmentWrapper key={appointment.id} {...appointment} />
      )),
    [children],
  );

  const appointmentLabel = useMemo(() => {
    if (!children?.length)
      return (
        <h1 id="label" className="loading">
          Carregando <Loader />
        </h1>
      );

    if (!children[0].id)
      return <h1 id="label">Você não possui consultas marcadas</h1>;

    return <h1 id="label">Consultas marcadas</h1>;
  }, [children]);

  return (
    <StyledContainer>
      {appointmentLabel}

      <LinkButton to="/appoint" id="appoint-button" className="action-button">
        Marcar uma nova consulta
      </LinkButton>

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
  );
};

export default AppointmentsContainer;
