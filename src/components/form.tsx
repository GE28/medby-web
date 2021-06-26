import React, { FC, FormHTMLAttributes } from 'react';
import { Form as StyledForm } from './styles';

type FormProps = FormHTMLAttributes<HTMLFormElement>;

const Form: FC<FormProps> = ({ children, ...rest }) => (
  <StyledForm {...rest}>{children}</StyledForm>
);

export default Form;
