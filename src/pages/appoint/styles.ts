import styled from 'styled-components';

import { Form as StyledForm, DefaultHeader } from '../../components/styles';

import { MainContent as StyledMainContent } from '../styles';

export const Form = styled(StyledForm)`
  min-width: 436px;
  width: 50%;

  button {
    margin-top: 0;
  }

  > span {
    text-align: center;
    color: #dd614a;
    font-size: 75%;
    font-weight: 600;
    font-family: 'Rubik', sans-serif;
  }

  #go-back-button {
    width: calc(100% * 2 / 3);
    height: unset;
    margin: 0;
    padding: 0 18px;
    line-height: 32px;

    font-family: 'Rubik', sans-serif;
    font-weight: 700;
    background-color: #23212c;
  }
`;

export const MainContent = styled(StyledMainContent)`
  ${DefaultHeader} {
    margin-bottom: 52px;
  }
`;

export const PeriodSelectorContainer = styled.div`
  > h4 {
    margin-bottom: 8px;
  }

  > .date-input-container-wrapper {
    display: flex;
    justify-content: space-evenly;

    padding: 12px;
    text-align: center;

    column-gap: 8px;

    border-radius: 6px;
    border: 1px solid #a6a6a6;

    background-color: #fcfff9;
  }

  .date-input-container {
    position: relative;
    width: 45%;
    font-weight: 700;

    display: flex !important;
    flex-grow: 1;
    align-items: center;
    column-gap: 8px;
    width: 100%;

    input {
      font-weight: 600;
      max-width: 100%;
      border-radius: 6px;
      border: 1px solid #a6a6a6;
      text-align: start;

      font-size: 16px;
      line-height: 36px;

      padding-left: 12px;
    }

    div {
      flex-grow: 1;
    }

    h4 {
      width: 36px;
    }

    input {
      width: 100%;
    }
  }

  .date-input-container svg {
    position: absolute;
    bottom: 11px;
    left: 12px;

    height: 18px;
    width: 18px;
  }
`;

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
    outline: 1px dotted #54428e;
  }
`;

export const Calendar = styled.div`
  user-select: none;

  font-family: 'Rubik', sans-serif;
  font-weight: 600;

  ${centered};
  flex-direction: column;
  background: linear-gradient(180deg, #a8d65c 2%, #87b75d 98%);

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
    background-color: #ffffff32;

    :nth-last-of-type(1) {
      margin-bottom: 0;
    }
  }

  .available {
    background-color: #ffffff96;
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
    color: #fcfff9;

    background-color: #54428e;
    box-shadow: 0px 3px 2px #0c57c9bf;

    &.other-month-day {
      background-color: transparent;
      border: 1px solid #54428e;
      color: #54428e;
    }
  }

  .between-selecteds {
    color: #fcfff9;
    background-color: #6a54b0;

    &.other-month-day {
      background-color: transparent;
      border: 1px solid #54428e;
      color: #54428e;
    }
  }
`;

export const AvailableTimesContainer = styled.div`
  div:nth-of-type(2n) {
    border-color: #23212c;

    > div button {
      background-color: #54428e;

      &:hover {
        background-color: #23212c;
      }
    }
  }
`;

export const ATWrapper = styled.div`
  padding: 8px;
  border: 1px solid #5b8c30;
  border-radius: 6px;
  font-weight: 600;

  svg {
    flex-shrink: 0;
    stroke-width: 2.3px;
    margin: 0;
    padding: 0;
    margin-right: 4px;
  }

  .where-when {
    text-align: center;
    white-space: nowrap;
    color: #23212c;

    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 8px;
  }

  .appointment-date {
    display: flex;
    place-items: center;
  }

  .pickapable-times {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(136px, 1fr));
    gap: 8px;

    button {
      appearance: none;

      display: flex;
      flex-grow: 1;
      align-items: center;
      justify-content: space-between;

      line-height: 165%;
      border-radius: 6px;
      padding: 6px;
      background-color: #a8d65c;

      color: #fcfff9;
      font-weight: 700;

      &:hover {
        background-color: #3b5b1f;
      }
    }
  }

  margin-bottom: 8px;
`;

export const Wrapper = styled.div`
  width: calc(100% - 100vw / 6);

  display: flex;
  justify-items: center;
  justify-content: center;
  gap: 36px;

  ${AvailableTimesContainer} {
    flex-basis: 100%;
  }

  @media (max-width: 680px) {
    ${Form} {
      width: 100%;
      max-width: 100%;

      .date-input-container-wrapper {
        flex-direction: column;
        gap: 0;
        row-gap: 8px;
      }
    }

    flex-direction: column;
  }
`;
