/* eslint-disable import/no-duplicates */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useContext, useEffect, useState } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { addDays, format, parse } from 'date-fns';

import ms from 'ms';

import { addSeconds } from 'date-fns/esm';
import axios from '../../services/axios';
import {
  sendToastIfNoResponse,
  logoutIfErrorStatus,
} from '../../services/axios/errorHandlers';

import {
  SpecsDataResponse,
  UnitsDataResponse,
  AvailableTimesDataResponse,
} from '../../services/axios/responses';

import { userContext } from '../../global/UserContext';
import { toastContext } from '../../global/ToastContext';

import { aTContext } from '.';

import Button from '../../components/button';
import SelectContainer from '../../components/selectContainer';

import Calendar from './calendar';

import { Form, PeriodSelectorContainer } from './styles';

interface FormValues {
  spec: string;
  unit: string;
  minDate: string;
  maxDate: string;
}

interface SelectOption {
  label: string;
  value: string;
}

interface StoredOptionsConfig {
  options: SelectOption[];
  stored_at: number;
}

const datePattern = 'yyyy-MM-dd';
const formatLocalDate = (date: Date) => format(date, datePattern);
const parseLocalDate = (formattedDate: string) =>
  parse(formattedDate, datePattern, new Date());

const parseLocalDateToLastMinute = (formattedDate: string) => {
  let date = parse(formattedDate, datePattern, new Date());
  date = addDays(date, 1);
  return addSeconds(date, -1);
};

const isValidFormattedDate = (formattedDate: string) =>
  !Number.isNaN(parseLocalDate(formattedDate).getTime());

const getDateWithNoTimePart = (date: Date) => {
  const formattedDate = formatLocalDate(date);
  return parseLocalDate(formattedDate);
};

const getNextDayWithNoTimePart = (date: Date) => {
  const nextDayDate = addDays(date, 1);
  return getDateWithNoTimePart(nextDayDate);
};

const AppointForm: FC = () => {
  const renderTimeDate = new Date();

  const { user, logout } = useContext(userContext);
  const { addToast } = useContext(toastContext);

  const { setAvailableTimes } = useContext(aTContext);

  const [maxAllowedDate, setMaxAllowedDate] = useState(() => {
    const maxAllowedDays = localStorage.getItem('@medby/max-allowed-days');
    const daysToAdd = Number(maxAllowedDays) || 0;

    return addDays(renderTimeDate, daysToAdd);
  });

  useEffect(() => {
    async function getMaxAllowedDate() {
      const isSameTime = (first: Date, second: Date) => {
        return first.getTime() === second.getTime();
      };

      if (!isSameTime(maxAllowedDate, renderTimeDate)) return;

      try {
        const response = await axios.get<
          Omit<AvailableTimesDataResponse, 'data'>
        >('appointments/available', {
          headers: { Authorization: `Bearer ${user.token}` },
          params: { config_only: 1 },
        });

        const { maxAllowedDaysInFuture } = response.data.config;
        localStorage.setItem(
          '@medby/max-allowed-days',
          maxAllowedDaysInFuture.toString(),
        );

        const allowedDate = addDays(renderTimeDate, maxAllowedDaysInFuture);
        setMaxAllowedDate(allowedDate);
      } catch (err) {
        const offlineConfigToast = {
          title: 'Falha ao carregar especialidades',
          message: 'O servidor está offline',
          type: 'error' as const,
        };

        sendToastIfNoResponse(err, addToast, offlineConfigToast);
      }
    }

    getMaxAllowedDate();
  }, []);

  const [specOptions, setSpecOptions] = useState(() => {
    const data = localStorage.getItem('@medby/spec-option-list');
    if (!data) return [] as SelectOption[];

    const { options, stored_at } = JSON.parse(data) as StoredOptionsConfig;

    if (Date.now() > stored_at + ms('1d')) {
      localStorage.removeItem('@medby/spec-option-list');
      return [] as SelectOption[];
    }

    return options;
  });

  useEffect(() => {
    async function getSpecList() {
      try {
        if (specOptions.length > 0) return;

        const response = await axios.get<SpecsDataResponse>('specialties', {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        const options = response.data.map((specialty) => {
          const { id, display_name } = specialty;
          return { label: display_name, value: id };
        });

        localStorage.setItem(
          '@medby/spec-option-list',
          JSON.stringify({ options, stored_at: Date.now() }),
        );

        setSpecOptions(options);
      } catch (err) {
        const offlineSpecToast = {
          title: 'Falha ao carregar especialidades',
          message: 'O servidor está offline',
          type: 'error' as const,
        };

        logoutIfErrorStatus(err, logout);
        sendToastIfNoResponse(err, addToast, offlineSpecToast);
      }
    }

    getSpecList();
  }, []);

  const [unitOptions, setUnitOptions] = useState(() => {
    const data = localStorage.getItem('@medby/unit-option-list');
    if (!data) return [] as SelectOption[];

    const { options, stored_at } = JSON.parse(data) as StoredOptionsConfig;

    if (Date.now() > stored_at + ms('1d')) {
      localStorage.removeItem('@medby/unit-option-list');
      return [] as SelectOption[];
    }

    return options;
  });

  useEffect(() => {
    async function getUnitList() {
      try {
        if (unitOptions.length > 0) return;

        const response = await axios.get<UnitsDataResponse>('units', {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        const options = response.data.map((unit) => {
          const { id, name } = unit;

          return { label: name, value: id } as SelectOption;
        });

        localStorage.setItem(
          '@medby/unit-option-list',
          JSON.stringify({ options, stored_at: Date.now() }),
        );

        setUnitOptions(options);
      } catch (err) {
        const offlineUnitToast = {
          title: 'Falha ao carregar unidades',
          message: 'O servidor está offline',
          type: 'error' as const,
        };

        sendToastIfNoResponse(err, addToast, offlineUnitToast);
      }
    }

    getUnitList();
  }, []);
  unitOptions.unshift({ label: '(Todas)', value: '' });
  }, []);

  const formik = useFormik<FormValues>({
    initialValues: {
      spec: '',
      unit: '',
      minDate: formatLocalDate(renderTimeDate),
      maxDate: formatLocalDate(maxAllowedDate),
    },
    onSubmit: async (values) => {
      const {
        spec,
        unit,
        minDate: formattedMinDate,
        maxDate: formattedMaxDate,
      } = values;

      const min_date = parseLocalDate(formattedMinDate);
      const max_date = parseLocalDateToLastMinute(formattedMaxDate);

      try {
        const response = await axios.get<AvailableTimesDataResponse>(
          'appointments/available',
          {
            headers: { Authorization: `Bearer ${user.token}` },
            params: {
              ...(spec && { spec_id: spec }),
              ...(unit && { unit_id: unit }),
              min_date,
              max_date,
            },
          },
        );

        setAvailableTimes(response.data.data);
      } catch (err) {
        const offlineATtoast = {
          title: 'Falha ao carregar horários',
          message: 'O servidor está offline',
          type: 'error' as const,
        };

        sendToastIfNoResponse(err, addToast, offlineATtoast);
      }
    },
    validationSchema: Yup.object().shape({
      spec: Yup.string()
        .uuid('Especialidade formatada incorretamente')
        .required(
          'Selecione uma especialidade para conferir os horários disponíveis',
        ),
      unit: Yup.string().uuid('Unidade formatada incorretamente').optional(),
      minDate: Yup.string()
        .test(
          'validFormattedDate',
          'Data formatada incorretamente',
          (date) => !!date && isValidFormattedDate(date),
        )
        .required('É necessário preencher este campo'),
      maxDate: Yup.string()
        .test(
          'validFormattedDate',
          'Data formatada incorretamente',
          (date) => !!date && isValidFormattedDate(date),
        )
        .required('É necessário preencher este campo'),
    }),
  });

  const error = Object.values(formik.errors).find((e) => e && e.length > 0);

  return (
    <Form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
      <Button id="go-back-button" type="button">
        Voltar
      </Button>

      <SelectContainer
        options={specOptions}
        label="Especialidade para atendimento: "
        defaultLabel={
          specOptions.length > 0
            ? '(Selecione uma especialidade)'
            : 'Carregando…'
        }
        {...formik.getFieldProps('spec')}
      />

      <SelectContainer
        options={unitOptions}
        label="Unidade para atendimento: "
        defaultLabel={unitOptions.length > 0 ? '(Todas)' : 'Carregando…'}
        {...formik.getFieldProps('unit')}
      />

      <PeriodSelectorContainer>
        <h4>Pesquisar por horários disponíveis </h4>
        <div className="wrapper">
          <div className="date-input-container">
            <h4>De: </h4>
            <div className="day">
              <input
                type="date"
                min={formatLocalDate(renderTimeDate)}
                max={formik.values.maxDate}
                {...formik.getFieldProps('minDate')}
              />
            </div>
          </div>
          <div className="date-input-container">
            <h4>Até: </h4>
            <div className="day">
              <input
                type="date"
                min={formik.values.minDate}
                max={formatLocalDate(maxAllowedDate)}
                {...formik.getFieldProps('maxDate')}
              />
            </div>
          </div>
        </div>
      </PeriodSelectorContainer>

      <Calendar
        firstSelectedDate={parseLocalDate(formik.values.minDate)}
        secondSelectedDate={parseLocalDateToLastMinute(formik.values.maxDate)}
        minSelectableDate={getDateWithNoTimePart(renderTimeDate)}
        maxSelectableDate={getNextDayWithNoTimePart(maxAllowedDate)}
      />

      <Button type="submit">Pesquisar</Button>
      {error && <span>{error}</span>}
    </Form>
  );
};

export default AppointForm;
