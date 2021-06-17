/* eslint-disable import/no-duplicates */
import React, { FC, useContext, useState } from 'react';

import { useFormik } from 'formik';

import * as Yup from 'yup';

import { FiLoader } from 'react-icons/fi';

import axios from '../../services/axios';
import { UserDataResponse } from '../../services/axios/responses';

import { toastContext } from '../../global/ToastContext';
import { userContext } from '../../global/UserContext';

import { PasswordForm } from './styles';

import InputContainer from '../../components/inputContainer';
import Button from '../../components/button';

interface FormValues {
  password: string;
  newPassword: string;
  confirmPassword: string;
}

const AccountForm: FC = () => {
  const { user } = useContext(userContext);
  const { addToast } = useContext(toastContext);

  const [loading, setLoading] = useState(false);

  const formik = useFormik<FormValues>({
    initialValues: {
      password: '',
      newPassword: '',
      confirmPassword: '',
    },
    onSubmit: async (values) => {
      setLoading(true);

      const { password: oldPassword, newPassword: password } = values;

      try {
        await axios.put<UserDataResponse>(
          'profile',
          { oldPassword, password },
          {
            headers: { Authorization: `Bearer ${user.token}` },
          },
        );

        addToast({
          title: 'Senha alterada com sucesso!',
          type: 'success',
        });
      } catch (err) {
        setLoading(false);

        if (!err.response) {
          addToast({
            title: 'Falha ao alterar a senha',
            message: 'O servidor está offline',
            type: 'error',
          });
          return;
        }

        if (err.response.data.fields?.oldPassword) {
          addToast({
            title: 'Senha incorreta',
            message: 'Verifique os dados inseridos e tente novamente!',
            type: 'error',
          });
          return;
        }

        addToast({
          title: 'Falha ao realizar registro',
          message: 'Confira os dados inseridos e tente novamente',
          type: 'error',
        });
      }

      setLoading(false);
    },
    validationSchema: Yup.object().shape({
      password: Yup.string()
        .min(1, 'Por favor informe a senha atual')
        .required('Por favor informe a senha atual'),
      newPassword: Yup.string()
        .min(8, 'Sua senha deve conter ao menos 8 caracteres')
        .matches(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
          'Sua senha deve conter ao menos 8 caracteres, uma letra maiúscula e um número',
        )
        .required('É necessário preencher este campo'),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref('newPassword'), null],
        'As senhas não coincidem',
      ),
    }),
  });

  return (
    <PasswordForm onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
      <h1>Alterar senha</h1>
      <h3>Para alterar a senha atual, é necesário informá-la</h3>

      <InputContainer
        label="Senha atual"
        inputId="old-password"
        type="password"
        isTouched={formik.touched.password}
        error={formik.errors.password}
        {...formik.getFieldProps('password')}
      />

      <InputContainer
        label="Nova senha"
        inputId="new-password"
        type="password"
        isTouched={formik.touched.newPassword}
        error={formik.errors.newPassword}
        helpText="A senha deve conter no mínimo 8 caracteres, uma letra maiúscula e um número"
        {...formik.getFieldProps('newPassword')}
      />

      <InputContainer
        label="Repita a nova senha"
        inputId="confirm-password"
        type="password"
        isTouched={formik.touched.confirmPassword}
        error={formik.errors.confirmPassword}
        {...formik.getFieldProps('confirmPassword')}
      />

      <Button type="submit" disabled={!(formik.isValid && formik.dirty)}>
        {loading ? <FiLoader size="24px" /> : 'ALTERAR SENHA'}
      </Button>
    </PasswordForm>
  );
};

export default AccountForm;
