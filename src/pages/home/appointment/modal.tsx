import React, { FC, useMemo, useCallback, useContext } from 'react';

import { FiXCircle } from 'react-icons/fi';

import Appointment from '../../../types/Appointment';

import { appointmentContext } from '..';

import Button from '../../../components/button';
import AppointmentModal from '../../../components/appointmentModal';

interface AppointmentContainer {
  children?: Appointment[];
}

const ViewModal: FC<AppointmentContainer> = () => {
  const { select, selected } = useContext(appointmentContext);
  const eraseSelected = useCallback(() => select({} as Appointment), [select]);

  const actionButton = useMemo(
    () => (
      <Button className="action-button cancel">
        <FiXCircle />
        Cancelar consulta
      </Button>
    ),
    [],
  );

  const appointmentModal = useMemo(() => {
    return (
      selected?.id && (
        <AppointmentModal
          {...selected}
          eraseSelected={eraseSelected}
          actionButton={actionButton}
        />
      )
    );
  }, [actionButton, eraseSelected, selected]);

  return <>{appointmentModal}</>;
};

export default ViewModal;
