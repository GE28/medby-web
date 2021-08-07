/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-duplicates */
import React, { FC, useMemo, useContext } from 'react';

import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { aTContext } from '..';
import ATWrapper, { RefTime, TimesContainer } from './wrapper';

import { AvailableTimesContainer as StyledContainer } from '../styles';

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
  const { availableTimes } = useContext(aTContext);

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

  return (
    <>
      {availableTimes.length > 0 && (
        <StyledContainer>{printedAvailableDaysAndTimes}</StyledContainer>
      )}
    </>
  );
};

export default ATContainer;
