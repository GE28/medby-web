/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-duplicates */
import React, {
  FC,
  useMemo,
  useCallback,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';

import { useHistory } from 'react-router-dom';

import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import Appointment from '../../../types/Appointment';

import { aTContext } from '..';
import { userContext } from '../../../global/UserContext';
import { toastContext } from '../../../global/ToastContext';

import axios from '../../../services/axios';
import { AppointmentPreviewResponse } from '../../../services/axios/responses';
import { avatarsPath } from '../../../services/axios/paths';

import Button from '../../../components/button';
import AppointmentModal from '../../../components/appointmentModal';

const ATModal: FC = () => {
  const { user } = useContext(userContext);
  const { addToast } = useContext(toastContext);
  const { select, selectedId } = useContext(aTContext);

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

  const [appointmentPreview, setAppointmentPreview] = useState(
    {} as Appointment,
  );

  const eraseSelected = useCallback(() => {
    setAppointmentPreview({} as Appointment);
    select('');
  }, [select]);

  useEffect(() => {
    async function getPreviewAppointment() {
      if (!selectedId || appointmentPreview.id) return;

      const response = await axios.get<AppointmentPreviewResponse>(
        `appointments/available/${selectedId}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        },
      );

      const {
        aT_id,
        aT_date,
        final_price,
        doctor: {
          avatar = '',
          document,
          name: doctorName,
          specialty: { display_name: doctorSpec },
          unit: { name: unit, cep, complements },
        },
      } = response.data;

      setAppointmentPreview({
        id: aT_id,
        day: format(new Date(aT_date), 'P', { locale: ptBR }),
        time: format(new Date(aT_date), "HH'h'mm'm'"),
        unit: `${unit}`,
        complements,
        cep,
        price: final_price,
        doctorDocument: document,
        doctorName: `${doctorName}`,
        doctorSpec,
        doctorAvatar: avatar && avatarsPath + avatar,
      } as Appointment);
    }

    getPreviewAppointment();
  }, [appointmentPreview, user.token, selectedId]);

  const appoint = useCallback(() => {
    async function bookAppointment() {
      if (!appoint) {
        return;
      }

      try {
        await axios.post<AppointmentPreviewResponse>(
          `appointments`,
          {
            available_time_id: appointmentPreview.id,
          },
          {
            headers: { Authorization: `Bearer ${user.token}` },
          },
        );

        localStorage.removeItem('@medby/appointments');
        go(0);

        addToast({
          title: 'Consulta marcada com sucesso',
          message: `Seu atendimento será 
                  ${appointmentPreview.day} ${appointmentPreview.time}
                  (horário de Brasília)`,
          type: 'success',
        });
      } catch (err) {
        if (err.response.status === 409) {
          addToast({
            title: 'Horário indisponível',
            message: `Alguém já marcou uma consulta para este horário`,
            type: 'error',
          });
        }
      }
    }

    bookAppointment();
  }, [appointmentPreview, addToast, user.token, go]);

  const actionButton = useMemo(
    () => (
      <>
        {waitingConfirmation && (
          <span className="confirm-alert">
            Clique novamente para marcar a consulta
          </span>
        )}
        <Button
          className={`action-button  ${
            waitingConfirmation ? 'alert' : 'appoint'
          }`}
          onClick={() => {
            if (waitingConfirmation) {
              appoint();
              eraseSelected();
            } else {
              setWaitingConfirmation(true);
            }
          }}
        >
          {waitingConfirmation ? <FiAlertCircle /> : <FiCheckCircle />}
          Confirmar consulta
        </Button>
      </>
    ),
    [appoint, eraseSelected, waitingConfirmation],
  );

  const appointmentModal = useMemo(() => {
    return (
      appointmentPreview.id && (
        <AppointmentModal
          {...appointmentPreview}
          eraseSelected={eraseSelected}
          actionButton={actionButton}
        />
      )
    );
  }, [appointmentPreview, actionButton, eraseSelected]);

  return <>{appointmentModal}</>;
};

export default ATModal;
