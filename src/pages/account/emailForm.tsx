/* eslint-disable import/no-duplicates */
import React, { FC, useContext, useState } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { FiAtSign, FiFileText, FiLoader } from 'react-icons/fi';

import { sendToastIfNoResponse } from '../../services/axios/errorHandlers';

import { toastContext } from '../../global/ToastContext';
import { userContext } from '../../global/UserContext';

import { Form } from './styles';

import InputContainer from '../../components/inputContainer';
import Button from '../../components/button';

interface FormValues {
  email: string;
}

const formattedCPF = (cpf: string) => {
  const groups = cpf.match(/.{1,3}/g);

  groups?.splice(1, 0, '.');
  groups?.splice(3, 0, '.');
  groups?.splice(5, 0, '-');

  return groups?.join('');
};

const EmailForm: FC = () => {
  const { user, updateEmail } = useContext(userContext);
  const { addToast } = useContext(toastContext);

  const [loading, setLoading] = useState(false);

  const formik = useFormik<FormValues>({
    initialValues: {
      email: user.data.email,
    },
    onSubmit: async (values) => {
      setLoading(true);

      const { email } = values;

      try {
        await updateEmail(email);

        addToast({
          title: 'Senha atualizada com sucesso!',
          type: 'success',
        });

        setLoading(false);
      } catch (err) {
        setLoading(false);

        const offlineUpdateToast = {
          title: 'Falha ao atualizar e-mail',
          message: 'O servidor está offline',
          type: 'error' as const,
        };
        sendToastIfNoResponse(err, addToast, offlineUpdateToast);
      }
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email('Endereço de e-mail inválido')
        .required('É necessário preencher este campo'),
    }),
  });

  return (
    <Form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
      <InputContainer
        label="CPF"
        inputId="cpf"
        defaultValue={formattedCPF(user.data.cpf)}
        icon={FiFileText}
        autoComplete="cpf"
        disabled
      />

      <InputContainer
        label="E-mail"
        inputId="email"
        type="email"
        icon={FiAtSign}
        isTouched={formik.touched.email}
        error={formik.errors.email}
        autoComplete="email"
        {...formik.getFieldProps('email')}
      />

      <Button type="submit" disabled={!(formik.isValid && formik.dirty)}>
        {loading ? <FiLoader size="24px" /> : 'ALTERAR E-MAIL'}
      </Button>
    </Form>
  );
};

export default EmailForm;
