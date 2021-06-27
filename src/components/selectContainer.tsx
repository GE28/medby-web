/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, {
  FC,
  InputHTMLAttributes,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { FiChevronDown } from 'react-icons/fi';

import setInputValueCallingOnChange from './extensions/setInputValueCallingOnChange';

import { SelectContainer as StyledSelectContainer } from './styles';

type inputValue = HTMLInputElement['value'];

interface SelectProps extends InputHTMLAttributes<HTMLInputElement> {
  options: { label: string; value: inputValue }[];
  defaultLabel?: string;
  label: string;
}

const SelectContainer: FC<SelectProps> = ({
  options,
  label,
  defaultLabel = '',
  value: defaultValue,
  name,
  ...rest
}) => {
  const inputForValueRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [inputForLabelValue, setInputForLabelValue] = useState('');

  const [menuDisplay, setMenuDisplay] = useState(false);
  useEffect(() => {
    const hideMenuAtOutsideClick = (event: MouseEvent) => {
      if (!menuRef?.current) return;

      if (!menuRef.current.contains(event.target as Node)) {
        setMenuDisplay(false);
      }
    };

    document.addEventListener('mousedown', hideMenuAtOutsideClick);

    return () => {
      document.removeEventListener('mousedown', hideMenuAtOutsideClick);
    };
  }, []);

  const setOption = (value: inputValue, labelValue: string) => {
    setInputForLabelValue(labelValue);
    setInputValueCallingOnChange(inputForValueRef, value);
    setMenuDisplay(false);
  };

  const optionsContent = useMemo(
    () =>
      options.map((option, i) => (
        <span
          role="menuitem"
          key={option.value}
          tabIndex={0 - i}
          onKeyDown={() => {
            setOption(option.value, option.label);
          }}
          onClick={() => {
            setOption(option.value, option.label);
          }}
        >
          {option.label}
        </span>
      )),
    [options],
  );

  return (
    <StyledSelectContainer>
      <h4>{label}</h4>
      <div
        role="button"
        className="select-input"
        onKeyDown={() => setMenuDisplay(true)}
        onClick={() => setMenuDisplay(true)}
      >
        <FiChevronDown />
        <input value={inputForLabelValue || defaultLabel} readOnly />
        <input
          ref={inputForValueRef}
          id={name}
          name={name}
          value={inputForValueRef?.current?.value || defaultValue}
          readOnly
          hidden
          {...rest}
        />
      </div>

      {menuDisplay ? (
        <div ref={menuRef} role="menu" className="select-menu">
          {optionsContent}
        </div>
      ) : null}
    </StyledSelectContainer>
  );
};

export default SelectContainer;
