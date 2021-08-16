import styled from 'styled-components';

const centered = `
  display: flex;
  align-items: center;
  justify-content: center;
`;

const roundedSquare = `
  ${centered};
    
  width: 27px;
  height: 27px;
  border-radius: 6px;

  position: relative;

  &:hover::before {
    position: absolute;
    top: 0;
    right: 0;

    content: '';
    width: 100%;
    height: 100%;

    border-radius: inherit;
    background-color: #54428e14;
  }

  &:active {
    outline: 1px dotted var(--color-complementary);
  }
`;

export const Calendar = styled.div`
  --color-unavailable-day: #ffffff32;
  --color-available-day: #ffffff96;
  --color-day-shadow: #0c57c9bf;
  --color-between-selected-days: #6a54b0;

  user-select: none;
  font-family: 'Rubik', sans-serif;
  font-weight: 600;

  ${centered};
  flex-direction: column;
  background: linear-gradient(
    180deg,
    var(--color-calendar-top) 2%,
    var(--color-calendar-bottom) 98%
  );

  text-align: center;

  border-radius: 6px;
  padding: 18px;
  width: 100%;

  .wrapper {
    text-align: center;
    width: 100%;
  }

  div.month-selector {
    ${centered};
    justify-content: space-between;

    margin-bottom: 12px;

    text-transform: capitalize;
    font-weight: 700;

    button {
      ${roundedSquare};
      background-color: #00000026;
    }
  }

  .days-column {
    display: inline-block;
    margin-right: 8px;

    text-align: center;
    text-transform: uppercase;
    font-weight: 700;

    :last-child {
      margin-bottom: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  .day-label {
    display: block;
    font-size: 10px;
    font-family: 'Source Sans Pro', sans-serif;

    margin-bottom: 6px;
  }

  .day {
    cursor: not-allowed;

    position: relative;

    ${roundedSquare};
    margin-bottom: 8px;

    font-size: 12px;
    background-color: var(--color-unavailable-day);

    :nth-last-of-type(1) {
      margin-bottom: 0;
    }
  }

  .available {
    background-color: var(--color-available-day);
  }

  .other-month-day {
    background-color: transparent;

    &:hover::before {
      background-color: transparent;
    }
  }

  .today {
    border-radius: 50%;
  }

  .selected {
    color: var(--color-fake-white);

    background-color: var(--color-complementary);
    box-shadow: 0px 3px 2px var(--color-day-shadow);

    &.other-month-day {
      background-color: transparent;
      border: 1px solid var(--color-complementary);
      color: var(--color-complementary);
    }
  }

  .between-selecteds {
    color: var(--color-fake-white);
    background-color: var(--color-between-selected-days);

    &.other-month-day {
      background-color: transparent;
      border: 1px solid var(--color-complementary);
      color: var(--color-complementary);
    }
  }
`;
