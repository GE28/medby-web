import React, { FC, useContext } from 'react';

import { FiCalendar, FiClock } from 'react-icons/fi';

import { aTContext } from '..';
import { AvailableTime } from '../../../services/axios/responses';

import { ATWrapper as StyledATwrapper } from '../styles';

export interface RefTime {
  id: string;
  label: string;
}

export interface TimesContainer {
  date: AvailableTime['date'];
  unit_id: AvailableTime['unit_id'];
  times: RefTime[];
}

const ATWrapper: FC<TimesContainer> = (props) => {
  const { select } = useContext(aTContext);

  const {
    date = '2009-09-18T19:00:08Z',
    unit_id = '1a1717aa-a171-1717-aaa1-1aaa1717aa1a',
    times = [
      {
        label: '08h30m',
        id: '1a1717aa-a171-1717-aaa1-1aaa1717aa1a',
      },
    ],
  } = props;

  const pickapableTimes = [
    times.map((t) => (
      <button type="button" key={t.id} onClick={() => select(t.id)}>
        <FiClock /> {t.label}
      </button>
    )),
  ];

  return (
    <StyledATwrapper>
      <header className="where-when" key={date + unit_id}>
        <span>UNIDADE SANTA CRUZ</span>
        <div className="appointment-date">
          <FiCalendar /> {date}
        </div>
      </header>
      <div className="pickapable-times">{pickapableTimes}</div>
    </StyledATwrapper>
  );
};

export default ATWrapper;
