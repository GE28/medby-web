import React, {
  FC,
  useMemo,
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react';

import { useHistory } from 'react-router-dom';

import { FiAlertCircle, FiXCircle } from 'react-icons/fi';

import Appointment from '../../../types/Appointment';

import { appointmentContext } from '..';
import { userContext } from '../../../global/UserContext';
import { toastContext } from '../../../global/ToastContext';

import axios from '../../../services/axios';
import { AppointmentPreviewResponse } from '../../../services/axios/responses';

import Button from '../../../components/button';
import AppointmentModal from '../../../components/appointmentModal';

interface AppointmentContainer {
  children?: Appointment[];
}

const ViewModal: FC<AppointmentContainer> = () => {
  const { user } = useContext(userContext);
  const { addToast } = useContext(toastContext);

  const { go } = useHistory();

  const [waitingConfirmation, setWaitingConfirmation] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (waitingConfirmation)
      timer.current = setTimeout(() => setWaitingConfirmation(false), 1500);

    return () => {
      if (timer?.current) {
        clearTimeout(timer.current);
      }
    };
  }, [waitingConfirmation]);

  const { select, selected } = useContext(appointmentContext);
  const eraseSelected = useCallback(() => select({} as Appointment), [select]);

  const cancel = useCallback(() => {
    async function cancelAppointment() {
      try {
        await axios.put<AppointmentPreviewResponse>(
          `appointments/${selected?.id}`,
          {
            cancel: true,
          },
          {
            headers: { Authorization: `Bearer ${user.token}` },
          },
        );

        localStorage.removeItem('@medby/appointments');
        go(0);

        addToast({
          title: 'Consulta desmarcada com sucesso',
          message: `O atendimento foi cancelado!`,
          type: 'success',
        });
      } catch (err) {
        if (err.response.status === 409) {
          addToast({
            title: 'Consulta desmarcada após horário limite',
            message: `Entre em contato com a clínica`,
            type: 'error',
          });
        }
      }
    }

    cancelAppointment();
  }, [addToast, user.token, selected?.id, go]);

  const actionButton = useMemo(
    () => (
      <>
        {waitingConfirmation && (
          <span className="confirm-alert">
            Clique novamente para cancelar a consulta
          </span>
        )}
        <Button
          className={`action-button ${
            waitingConfirmation ? 'alert' : 'cancel'
          }`}
          onClick={() => {
            if (waitingConfirmation) {
              cancel();
              eraseSelected();
            } else {
              setWaitingConfirmation(true);
            }
          }}
        >
          {waitingConfirmation ? <FiAlertCircle /> : <FiXCircle />}
          Cancelar consulta
        </Button>
      </>
    ),
    [cancel, eraseSelected, waitingConfirmation],
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
