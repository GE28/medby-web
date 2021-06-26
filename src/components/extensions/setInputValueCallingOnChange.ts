/* eslint-disable @typescript-eslint/no-explicit-any */
import { RefObject } from 'react';

const getOwnValueDescriptorSetter = (
  element: any,
): ((v: any) => void) | false => {
  const descriptor = Object.getOwnPropertyDescriptor(element, 'value');
  if (!descriptor?.set) {
    return false;
  }

  return descriptor.set;
};

const getPrototypeValueDescriptorSetter = (element: any) => {
  const prototype = Object.getPrototypeOf(element);
  return getOwnValueDescriptorSetter(prototype);
};

const setInputValueCallingOnChange = (
  inputRef: RefObject<HTMLInputElement>,
  value: HTMLInputElement['value'],
): void => {
  if (!inputRef?.current) return;

  const inputValueSetter = getOwnValueDescriptorSetter(inputRef.current);
  if (!inputValueSetter) return;

  const inputPrototypeValueSetter = getPrototypeValueDescriptorSetter(
    inputRef.current,
  );
  if (!inputPrototypeValueSetter) return;

  if (inputValueSetter !== inputPrototypeValueSetter) {
    inputPrototypeValueSetter.call(inputRef.current, value);
  } else {
    inputValueSetter.call(inputRef.current, value);
  }

  inputRef.current.dispatchEvent(new Event('input', { bubbles: true }));
};

export default setInputValueCallingOnChange;
