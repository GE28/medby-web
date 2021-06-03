import React, { FC, useState, useCallback, createContext } from 'react';

import { Appointment } from './wrapper';

interface AppointmentContext {
  selected?: Appointment;
  select(appointment: Appointment): void;
}

export const appointmentContext = createContext({} as AppointmentContext);

const { Provider } = appointmentContext;

export const AppointmentProvider: FC = ({ children }) => {
  const [selected, setSelected] = useState({} as Appointment);

  const select = useCallback((appointment: Appointment) => {
    setSelected(appointment);
  }, []);

  return <Provider value={{ selected, select }}>{children}</Provider>;
};
