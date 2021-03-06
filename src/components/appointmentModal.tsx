import React, {
  FC,
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { FiX } from 'react-icons/fi';

import blankAvatar from '../assets/blank-profile.png';

import { DefaultModal, ModalContainer } from './styles';

import { clearAxios } from '../services/axios';
import { ViaCep } from '../services/axios/responses';

import Appointment from '../types/Appointment';

interface Modal extends Appointment {
  eraseSelected: MouseEventHandler<HTMLButtonElement>;
  actionButton: JSX.Element;
}

const AppointmentModal: FC<Modal> = (props) => {
  const { cep: currentCep } = props;
  const [cepsData, setCepsData] = useState({} as ViaCep);

  useEffect(() => {
    const ceps = localStorage.getItem('@medby/ceps') || '{}';
    const storedCeps = JSON.parse(ceps) as { [key: string]: ViaCep };

    if (!storedCeps[currentCep]) {
      const getCurrentCepData = async () => {
        const cepResponse = await clearAxios.get<ViaCep>(
          `https://viacep.com.br/ws/${currentCep}/json`,
        );

        storedCeps[currentCep] = cepResponse.data;
        localStorage.setItem(`@medby/ceps`, JSON.stringify(storedCeps));

        setCepsData(storedCeps[currentCep]);
      };

      getCurrentCepData();
    } else {
      setCepsData(storedCeps[currentCep]);
    }
  }, [currentCep]);

  const currency = useCallback((value = '') => {
    const [moneyValue, cents] = value.split('.');

    return `R$ ${moneyValue},${cents}`;
  }, []);

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

  const { eraseSelected, actionButton } = props;

  return (
    <DefaultModal>
      <ModalContainer>
        <button type="button" className="close-button" onClick={eraseSelected}>
          <FiX />
        </button>

        <span>Você será atendido (a) por:</span>
        <div className="doctor-info">
          <div className="doctor-container">
            <div className="avatar-container">
              <img
                src={doctorAvatar || blankAvatar}
                title={`Foto de ${doctorName}`}
                alt={doctorName}
              />
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
              {`${cepsData.logradouro}, ${complements} - ${cepsData.bairro} ` +
                `(${cepsData.localidade}-${cepsData.uf})`}
            </span>
            <span>{`(CEP: ${cepsData.cep})`}</span>
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

        {actionButton}
        <h5>{`ID: ${id}`}</h5>
      </ModalContainer>
    </DefaultModal>
  );
};

export default AppointmentModal;
