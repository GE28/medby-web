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
    color: var(--color-danger);
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
    background-color: var(--color-text);
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
    border: 1px solid var(--color-border);

    background-color: var(--color-fake-white);
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
      border: 1px solid var(--color-border);
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

export const AvailableTimesContainer = styled.div`
  text-align: center;

  div:nth-of-type(2n) {
    border-color: var(--color-text);

    > div button {
      background-color: var(--color-complementary);

      &:hover {
        background-color: var(--color-text);
      }
    }
  }

  .page-selectors {
    display: flex;
    gap: 4px;

    * {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 32px;
      line-height: 32px;
      height: 32px;
    }

    button {
      border-radius: 6px;
      border: 1px solid var(--color-complementary);
      color: var(--color-complementary);

      text-align: center;

      svg {
        display: inline-block;
        width: 64%;
        height: 64%;
      }

      &:hover {
        color: white;
        background-color: var(--color-complementary);
      }

      &:active {
        transform: scale(0.85, 0.85);
        border-color: var(--color-text);
      }
    }

    button.current {
      color: white;
      background-color: var(--color-complementary);
    }
  }
`;

export const ATWrapper = styled.div`
  padding: 8px;
  border: 1px solid var(--color-main);
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
    color: var(--color-text);

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
      background-color: var(--color-calendar-top);

      color: var(--color-fake-white);
      font-weight: 700;

      &:hover {
        background-color: var(--color-main-darker);
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
      min-width: unset;
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
