/* eslint-disable react/no-array-index-key */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-duplicates */
import React, {
  FC,
  useMemo,
  useContext,
  ButtonHTMLAttributes,
  useCallback,
} from 'react';

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

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
  const { availableTimes, aTCount, search, page } = useContext(aTContext);

  const availableTimesData = useMemo(() => {
    const availableDays = availableTimes?.map((aT) => ({
      ...aT,
      date: formatLocalDateISO(aT.date),
      time: formatLocalTime(aT.date),
    }));

    return availableDays?.map(({ date, unit_id }, _i, beingMapped) => {
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

  const printedAvailableDaysAndTimes = useMemo(() => {
    return [
      availableTimesData?.map((aTData) => (
        <ATWrapper key={aTData.date + aTData.unit_id} {...aTData} />
      )),
    ];
  }, [availableTimesData]);

  type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

  const pageButton = useCallback(
    (length: number, index: number, ...rest: ButtonProps[]) => (
      <button
        onClick={() => search(index)}
        key={length}
        type="button"
        {...rest}
      >
        {index}
      </button>
    ),
    [search],
  );

  const pageSelectors = useMemo(() => {
    const a: JSX.Element[] = [];

    for (let i = 1; i < aTCount / 10 + 1; i += 1) {
      if (i === page) {
        a.push(
          pageButton(a.length, i, {
            className: 'selected',
            title: 'Página atual',
          }),
        );
      } else {
        a.push(pageButton(a.length, i, { title: `Página ${i}` }));
      }
    }

    return (
      <div className="page-selectors">
        {page > 1 && (
          <button
            className="previous-page"
            type="button"
            title="Página anterior"
          >
            <FiChevronLeft />
          </button>
        )}
        {a}
        {aTCount / 10 > page && (
          <button className="next-page" type="button" title="Próxima página">
            <FiChevronRight />
          </button>
        )}
      </div>
    );
  }, [aTCount, page, pageButton]);

  if (!availableTimes) {
    return null;
  }
  if (availableTimes?.length > 0) {
    return (
      <StyledContainer id="available-times-container">
        {printedAvailableDaysAndTimes}
        {pageSelectors}
      </StyledContainer>
    );
  }
  return (
    <StyledContainer id="available-times-container">
      Não há consultas disponíveis dentro dos critérios selecionados
    </StyledContainer>
  );
};

export default ATContainer;
