import React, { FC, useCallback, useContext, useEffect, useState } from 'react';

import { FiXCircle, FiX } from 'react-icons/fi';

import Button from '../../../components/button';

import blankAvatar from '../../../assets/blank-profile.png';

import { clearAxios } from '../../../services/axios';
import { ViaCep } from '../../../services/axios/responses';

import { appointmentContext } from './Context';
import { Appointment } from './wrapper';
import { AppointmentModal as StyledModal, ModalContainer } from '../styles';

const AppointmentModal: FC<Appointment> = (props) => {
  const { cep: appointmentCep } = props;
  const [cepData, setCepData] = useState({} as ViaCep);

  useEffect(() => {
    const ceps = localStorage.getItem('@medby/ceps') || '{}';
    const parsedCeps = JSON.parse(ceps) as { [key: string]: ViaCep };

    if (!parsedCeps[appointmentCep]) {
      const getData = async () => {
        const cepResponse = await clearAxios.get<ViaCep>(
          `https://viacep.com.br/ws/${appointmentCep}/json`,
        );

        parsedCeps[appointmentCep] = cepResponse.data;
        localStorage.setItem(`@medby/ceps`, JSON.stringify(parsedCeps));
      };
      getData();
    }

    setCepData(parsedCeps[appointmentCep]);
  }, [appointmentCep]);

  const currency = useCallback((value = '') => {
    const [moneyValue, cents] = value.split('.');

    return `R$ ${moneyValue},${cents}`;
  }, []);

  const { select } = useContext(appointmentContext);

  const {
    id,
    complements,
    day,
    time,
    price,
    doctorSpec,
    doctorDocument,
    doctorAvatar,
    doctorName,
  } = props;

  return (
    <ModalContainer>
      {cepData?.cep ? (
        <StyledModal>
          <button
            type="button"
            className="close-button"
            onClick={() => select({} as Appointment)}
          >
            <FiX />
          </button>
          <span>Você será atendido (a) por:</span>
          <div className="doctor-info">
            <div className="doctor-container">
              <div className="avatar-container">
                <img src={doctorAvatar || blankAvatar} alt="Doutor" />
              </div>
              <div className="doctor-data">
                <span>{doctorName}</span>
                <div className="spec-data">
                  <span>{doctorSpec}</span>
                  <span>{doctorDocument}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="unit-info">
            <span>Local de atendimento:</span>
            <div>
              <span>
                {`${cepData.logradouro}, ${complements} - ${cepData.bairro} ` +
                  `(${cepData.localidade}-${cepData.uf})`}
              </span>
              <span>{`(CEP: ${cepData.cep})`}</span>
            </div>
          </div>
          <div className="time-info">
            <span>Hora marcada:</span>
            <div>
              <span>{`${time} (${day})`}</span>
              <span>Horário de Brasília</span>
            </div>
          </div>
          <div className="specialty-info">
            <span>Valor da consulta:</span>
            <div>
              <span>{currency(price)}</span>
              <span>(Pagamento na unidade)</span>
            </div>
          </div>

          <Button className="cancel-button">
            <FiXCircle />
            Cancelar consulta
          </Button>
          <h5>{`ID: ${id}`}</h5>
        </StyledModal>
      ) : null}
    </ModalContainer>
  );
};

export default AppointmentModal;
