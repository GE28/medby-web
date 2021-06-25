import React, { FC, ComponentType, InputHTMLAttributes, useMemo } from 'react';

import { IconBaseProps } from 'react-icons';

import { InputContainer as StyledInputContainer } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ComponentType<IconBaseProps>;
  inputId: string;
  label?: string;
  error?: string | false;
  isTouched?: boolean;
  helpText?: string;
}

const InputContainer: FC<InputProps> = ({
  icon: Icon,
  inputId,
  label,
  error,
  isTouched,
  helpText,
  ...rest
}) => {
  const htmlLabel = useMemo(
    () => label && <label htmlFor={inputId}>{label}</label>,
    [inputId, label],
  );

  const helpers = useMemo(
    () =>
      error && isTouched ? (
        <span>{`* ${error}`}</span>
      ) : (
        helpText && <span>{helpText}</span>
      ),
    [helpText, error, isTouched],
  );

  return (
    <StyledInputContainer
      isDisabled={!!rest.disabled}
      isTouched={isTouched}
      error={!!error}
    >
      {htmlLabel}
      <div>
        {Icon && <Icon size="18px" />}
        <input id={inputId} key={inputId} {...rest} />
      </div>
      {helpers}
    </StyledInputContainer>
  );
};

export default InputContainer;
