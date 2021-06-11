/* eslint-disable import/no-duplicates */
import React, { FC, useContext, useState } from 'react';

import { useFormik } from 'formik';

import * as Yup from 'yup';

import { FiAtSign, FiFileText, FiLoader } from 'react-icons/fi';

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

const RegisterForm: FC = () => {
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

        if (!err.response) {
          addToast({
            title: 'Falha no login',
            message: 'O servidor está offline',
            type: 'error',
          });
          return;
        }

        addToast({
          type: 'error',
          title: 'Falha ao realizar registro',
          message: 'Confira os dados inseridos e tente novamente',
        });
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
        disabled
      />

      <InputContainer
        label="E-mail"
        inputId="email"
        type="email"
        icon={FiAtSign}
        isTouched={formik.touched.email}
        error={formik.errors.email}
        {...formik.getFieldProps('email')}
      />

      <Button type="submit" disabled={!(formik.isValid && formik.dirty)}>
        {loading ? <FiLoader size="24px" /> : 'ALTERAR E-MAIL'}
      </Button>
    </Form>
  );
};

export default RegisterForm;
