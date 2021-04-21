import React, { FC, InputHTMLAttributes } from 'react';

import { IconBaseProps } from 'react-icons';

import { InputContainer as StyledInputContainer } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ComponentType<IconBaseProps>;
  inputId?: string;
  label?: string;
  isError?: string | false;
  isTouched?: boolean;
  helpText?: string;
}

const InputContainer: FC<InputProps> = ({
  children,
  icon: Icon,
  inputId,
  label,
  isError,
  isTouched,
  helpText,
}) => (
  <>
    <StyledInputContainer isError={isError} isTouched={isTouched}>
      {inputId && <label htmlFor={inputId}>{label}</label>}
      <div>
        {Icon && <Icon size="18px" />}
        {children}
      </div>
      {isError && isTouched ? (
        <span>{`* ${isError}`}</span>
      ) : (
        helpText && <span>{helpText}</span>
      )}
    </StyledInputContainer>
  </>
);
export default InputContainer;
