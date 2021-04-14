import React, { InputHTMLAttributes } from 'react';

import { IconBaseProps } from 'react-icons';

import { InputContainer } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ComponentType<IconBaseProps>;
  name: string;
}

const Field: React.FC<InputProps> = ({
  name,
  children: labelText,
  icon: Icon,
  ...props
}) => {
  const inputDefaultProps = {
    id: `${name}_field`,
    type: 'text',
    autoComplete: 'off',
    ...props,
    required: true,
  };

  const IconInputContainer = () =>
    Icon ? (
      <div>
        <Icon size="18px" />
        <input {...inputDefaultProps} />
      </div>
    ) : (
      <div>
        <input {...inputDefaultProps} />
      </div>
    );

  return (
    <InputContainer>
      {labelText ? (
        <>
          <label htmlFor={inputDefaultProps.id}>{labelText}</label>
          <IconInputContainer />
        </>
      ) : (
        <IconInputContainer />
      )}
    </InputContainer>
  );
};

export default Field;
