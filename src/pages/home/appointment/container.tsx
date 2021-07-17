import React, { FC, useMemo, useContext, useState } from 'react';

import { FiList } from 'react-icons/fi';

import { appointmentContext } from '..';
import AppointmentWrapper, { Appointment } from './wrapper';

import AppointmentModal from './modal';

import LoaderSVG from '../../../assets/loader';
import { AppointmentsContainer as StyledContainer } from '../styles';

import Button from '../../../components/button';

interface AppointmentContainer {
  children?: Appointment[];
}

const AppointmentsContainer: FC<AppointmentContainer> = ({ children }) => {
  const { selected, loadMore } = useContext(appointmentContext);
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
          Carregando <LoaderSVG />
        </h1>
      );

    if (children.length === 0)
      return <h1 id="label">Você não possui consultas marcadas</h1>;

    return <h1 id="label">Consultas marcadas</h1>;
  }, [children]);

  const appointmentModal = useMemo(() => {
    return selected?.id && <AppointmentModal {...selected} />;
  }, [selected]);

  return (
    <>
      {appointmentModal}

      <StyledContainer>
        {appointmentLabel}

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

export default AppointmentsContainer;
