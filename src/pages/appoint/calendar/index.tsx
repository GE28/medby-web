/* eslint-disable no-restricted-syntax */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-duplicates */
import React, { FC, useMemo, useState, HTMLAttributes, useEffect } from 'react';

import {
  addDays,
  addMonths,
  differenceInCalendarMonths,
  format,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  setDate as setDayOfMonth,
  setDay,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Calendar as StyledCalendar } from './styles';

interface CalendarComponent {
  firstSelectedDate: Date;
  secondSelectedDate: Date;
  minSelectableDate: Date;
  maxSelectableDate: Date;
}

interface Day {
  label: number;
  available?: true;
  selected?: true;
  otherMonth?: true;
  dateRef: Date;
}

type CalendarObject = Day[][];
type DivHTMLProps = HTMLAttributes<HTMLDivElement>;

const locale = ptBR;

const Calendar: FC<CalendarComponent> = ({
  firstSelectedDate,
  secondSelectedDate,
  minSelectableDate,
  maxSelectableDate,
}) => {
  const [currentDate, setCurrentDate] = useState(firstSelectedDate);

  const firstIsInNextMonth = useMemo(
    () => differenceInCalendarMonths(firstSelectedDate, currentDate),
    [firstSelectedDate, currentDate],
  );

  const secondIsInPreviousMonth = useMemo(
    () => differenceInCalendarMonths(secondSelectedDate, currentDate),
    [secondSelectedDate, currentDate],
  );

  useEffect(() => {
    if (firstIsInNextMonth > 0)
      setCurrentDate((old) => addMonths(old, firstIsInNextMonth));

    if (secondIsInPreviousMonth < 0)
      setCurrentDate((old) => addMonths(old, secondIsInPreviousMonth));
  }, [firstIsInNextMonth, secondIsInPreviousMonth, currentDate]);

  const calendarMatriz = useMemo(() => {
    const [sunday, saturday, firstWeek, calendarWeeks] = [0, 6, 0, 5];

    const relativeMonthDate = (day: number, monthsToAdd = 0) => {
      const currentMonthDay = addMonths(currentDate, monthsToAdd);
      currentMonthDay.setDate(day);

      return currentMonthDay;
    };

    const fillMonthFirstWeek = (
      calendar: CalendarObject,
      weekdayOfFirstDayOfMonth: number,
      labelOfLastDayOfPreviousMonth: number,
    ) => {
      for (let i = sunday; i <= saturday; i += 1) {
        const daysFromFirst = i - weekdayOfFirstDayOfMonth;
        const label = daysFromFirst + 1;

        const day = {
          label,
          dateRef: relativeMonthDate(label),
        } as Day;

        if (daysFromFirst < 0) {
          day.label += labelOfLastDayOfPreviousMonth;
          day.dateRef = relativeMonthDate(day.label, -1);
          day.otherMonth = true;
        }

        calendar[firstWeek].push(day);
      }
    };

    const fillMonthRemainingWeeks = (
      calendar: CalendarObject,
      weekdayOfFirstDayOfMonth: number,
      labelOfLastDayOfMonth: number,
    ) => {
      for (let i = firstWeek + 1; i <= calendarWeeks; i += 1) {
        calendar[i] = [];

        for (let j = sunday; j <= saturday; j += 1) {
          // week0 weekday6 -> day1; week1 weekday0 -> day2
          const label =
            parseInt(`${i}${j}`, saturday + 1) - weekdayOfFirstDayOfMonth + 1;

          const day = {
            label,
            dateRef: relativeMonthDate(label),
          } as Day;

          if (day.label > labelOfLastDayOfMonth) {
            day.label -= labelOfLastDayOfMonth;
            day.dateRef = relativeMonthDate(day.label, 1);
            day.otherMonth = true;
          }

          calendar[i][j] = day;
        }
      }
    };

    const fillCalendar = (dateInMonth: Date, calendar: CalendarObject) => {
      const nextMonth = addMonths(dateInMonth, 1);
      const labelOfLastDayOfPreviousMonth = setDayOfMonth(
        dateInMonth,
        0,
      ).getDate();
      const weekdayOfFirstDayOfMonth = setDayOfMonth(dateInMonth, 1).getDay();
      const labelOfLastDayOfMonth = setDayOfMonth(nextMonth, 0).getDate();

      fillMonthFirstWeek(
        calendar,
        weekdayOfFirstDayOfMonth,
        labelOfLastDayOfPreviousMonth,
      );

      fillMonthRemainingWeeks(
        calendar,
        weekdayOfFirstDayOfMonth,
        labelOfLastDayOfMonth,
      );
    };

    const newCalendar: CalendarObject = [[]];
    fillCalendar(currentDate, newCalendar);

    return newCalendar;
  }, [currentDate]);

  const printedCalendarDays = useMemo(() => {
    const rotatedCalendarMatriz = calendarMatriz[0].map((_week, weekNumber) =>
      calendarMatriz.map(
        (_day, weekDay) => calendarMatriz[weekDay][weekNumber],
      ),
    );

    const weekdayLabel = (weekday: number) =>
      format(setDay(new Date(), weekday), 'E', {
        locale,
      }).substring(0, 3);

    const isFromOtherMonth = (day: Day) => {
      return day.otherMonth;
    };

    const isToday = (day: Day) =>
      isSameMonth(currentDate, day.dateRef) &&
      isSameDay(new Date(), day.dateRef);

    const isSelectable = (day: Day) => {
      const dateRefTime = day.dateRef.getTime();

      return (
        dateRefTime >= minSelectableDate.getTime() &&
        dateRefTime < maxSelectableDate.getTime()
      );
    };

    const isFirstSelected = (day: Day) =>
      isSameMonth(firstSelectedDate, day.dateRef) &&
      isSameDay(firstSelectedDate, day.dateRef);

    const isSecondSelected = (day: Day) =>
      isSameMonth(secondSelectedDate, day.dateRef) &&
      isSameDay(secondSelectedDate, day.dateRef);

    const isSelected = (day: Day) =>
      isFirstSelected(day) || isSecondSelected(day);

    const isBetweenSelecteds = (day: Day) =>
      isSelectable(day) &&
      isAfter(day.dateRef, firstSelectedDate) &&
      isBefore(day.dateRef, addDays(secondSelectedDate, -1));

    const printCalendarDay = (day: Day, weekday: number) => {
      const dayHTMLProps: DivHTMLProps = {
        className: 'day ',
      };

      if (isFromOtherMonth(day)) dayHTMLProps.className += 'other-month-day ';
      if (isToday(day)) dayHTMLProps.className += 'today ';
      if (isSelectable(day)) dayHTMLProps.className += 'available ';
      if (isSelected(day)) dayHTMLProps.className += 'selected ';
      if (isBetweenSelecteds(day))
        dayHTMLProps.className += 'between-selecteds ';

      return (
        <div key={`${day}${weekday}`} {...dayHTMLProps}>
          {day.label}
        </div>
      );
    };

    const printedCalendar = rotatedCalendarMatriz.map((week, weekNumber) => {
      return (
        <div key={weekNumber} className="days-column">
          <span className="day-label">{weekdayLabel(weekNumber)}</span>
          {week.map((day, weekday) => printCalendarDay(day, weekday))}
        </div>
      );
    });

    return printedCalendar;
  }, [
    calendarMatriz,
    currentDate,
    firstSelectedDate,
    secondSelectedDate,
    maxSelectableDate,
    minSelectableDate,
  ]);

  return (
    <StyledCalendar>
      <div className="wrapper">
        <div className="month-selector">
          <button
            type="button"
            onClick={() => setCurrentDate((oldDate) => addMonths(oldDate, -1))}
            disabled={isSameMonth(firstSelectedDate, currentDate)}
          >
            <FiChevronLeft />
          </button>
          <span className="month-year">
            {format(currentDate, 'MMMM, RRRR', { locale })}
          </span>
          <button
            type="button"
            onClick={() => setCurrentDate((oldDate) => addMonths(oldDate, 1))}
            disabled={isSameMonth(secondSelectedDate, currentDate)}
          >
            <FiChevronRight />
          </button>
        </div>

        <div className="days-container">{printedCalendarDays}</div>
      </div>
    </StyledCalendar>
  );
};

export default Calendar;
