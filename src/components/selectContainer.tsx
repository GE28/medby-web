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

interface SelectProps extends InputHTMLAttributes<HTMLInputElement> {
  options: { label: string; value: HTMLInputElement['value'] }[];
  label: string;
}

const SelectContainer: FC<SelectProps> = ({
  options,
  label,
  value: defaultValue,
  name,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

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

  const optionsContent = useMemo(
    () =>
      options.map((option, i) => (
        <span
          role="menuitem"
          key={option.value}
          tabIndex={0 - i}
          onKeyDown={() => {
            setInputValueCallingOnChange(inputRef, option.value);
          }}
          onClick={() => {
            setInputValueCallingOnChange(inputRef, option.value);
            setMenuDisplay(false);
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
        <input
          ref={inputRef}
          id={name}
          name={name}
          value={inputRef?.current?.value || defaultValue}
          readOnly
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
