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
} from 'react';

import { FiCheckCircle } from 'react-icons/fi';

import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import Appointment from '../../../types/Appointment';

import { aTContext } from '..';
import ATWrapper, { RefTime, TimesContainer } from './wrapper';

import axios from '../../../services/axios';
import { AppointmentPreviewResponse } from '../../../services/axios/responses';
import { avatarsPath } from '../../../services/axios/paths';

import Button from '../../../components/button';
import AppointmentModal from '../../../components/appointmentModal';

import { AvailableTimesContainer as StyledContainer } from '../styles';
import { userContext } from '../../../global/UserContext';

const locale = ptBR;

const formatLocalTime = (dateISO: string) =>
  format(parseISO(dateISO), "kk'h'mm'm'", { locale });

const formatLocalDateISO = (dateISO: string) => {
  const date = parseISO(dateISO);
  return format(date, 'P', { locale });
};

const sortTimesByLabel = (left: RefTime, right: RefTime) => {
  if (left.label > right.label) return 1;
  if (left.label < right.label) return -1;
  return 0;
};

const ATContainer: FC = () => {
  const { user } = useContext(userContext);

  const { select, selectedId, availableTimes } = useContext(aTContext);

  const availableTimesData = useMemo<TimesContainer[]>(() => {
    const availableDays = availableTimes.map((aT) => ({
      ...aT,
      date: formatLocalDateISO(aT.date),
      time: formatLocalTime(aT.date),
    }));

    return availableDays.map(({ date, unit_id }, _i, beingMapped) => {
      const currentTimeContainer: TimesContainer = {
        date,
        unit_id,
        times: [],
      };

      beingMapped.forEach((otherAD, otherADIndex) => {
        if (otherAD.date && date === otherAD.date)
          if (unit_id === otherAD.unit_id) {
            const label = otherAD.time;

            currentTimeContainer.times.push({
              id: otherAD._id,
              label,
            });

            delete availableDays[otherADIndex];
          }
      });

      currentTimeContainer.times.sort(sortTimesByLabel);
      return currentTimeContainer;
    });
  }, [availableTimes]);

  const printedAvailableDaysAndTimes = useMemo(
    () => [
      availableTimesData.map((aTData) => (
        <ATWrapper key={aTData.date + aTData.unit_id} {...aTData} />
      )),
    ],
    [availableTimesData],
  );

  const actionButton = useMemo(
    () => (
      <Button className="action-button appoint">
        <FiCheckCircle />
        Confirmar consulta
      </Button>
    ),
    [],
  );

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

  return (
    <>
      {appointmentModal}
      <StyledContainer>{printedAvailableDaysAndTimes}</StyledContainer>
    </>
  );
};

export default ATContainer;
