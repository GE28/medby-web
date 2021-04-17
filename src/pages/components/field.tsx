import React, { FC, InputHTMLAttributes } from 'react';

import { IconBaseProps } from 'react-icons';

import { InputContainer } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ComponentType<IconBaseProps>;
  name: string;
  label: string;
}

const Field: FC<InputProps> = ({ name, label, icon: Icon, ...rest }) => {
  const inputDefaultProps = {
    id: `${name}_input`,
    type: 'text',
    autoComplete: 'off',
    ...rest,
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
      {label ? (
        <>
          <label htmlFor={inputDefaultProps.id}>{label}</label>
          <IconInputContainer />
        </>
      ) : (
        <IconInputContainer />
      )}
    </InputContainer>
  );
};

export default Field;
