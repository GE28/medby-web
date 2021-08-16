import styled from 'styled-components/macro';
import { MainContent as StyledMainContent } from '../styles';

import { InputContainer } from '../../components/styles';

export const MainContent = styled(StyledMainContent)``;

export const Form = styled.form`
  width: 80%;
  padding-bottom: 36px;

  > div:nth-of-type(-n + 3) {
    width: calc(50% - 9px);
    display: inline-flex;

    :nth-of-type(1) {
      margin-right: 18px;
    }
  }

  button {
    width: calc(50% - 9px);
    margin: 0 auto;
    margin-top: 24px;
  }

  h1 {
    padding-top: 0;
  }

  @media (max-width: 576px) {
    max-width: calc(100% - 84px);

    > div:nth-of-type(-n + 3) {
      display: flex;

      width: 100%;
      margin-bottom: 15px;

      :nth-of-type(3) {
        position: relative;
        bottom: -15px;
      }
    }

    button {
      position: relative;
      bottom: -15px;
      width: 100%;
    }
  }
`;

export const PasswordForm = styled(Form)`
  > div:nth-of-type(1) {
    margin-bottom: 15px;
  }

  > div:nth-of-type(2) span {
    margin-bottom: -15px;
  }

  h1,
  h3 {
    text-align: center;
  }

  h1 {
    padding-top: 12px;
  }

  h3 {
    margin-bottom: 24px;
    color: var(--color-border);
  }
`;

export const AvatarFakeForm = styled.div`
  position: relative;

  display: inline-block;
  width: 80%;

  margin-top: 58px;
  padding-bottom: 36px;

  img {
    border: 0;
    border-radius: 8px;
  }

  .user-container {
    display: flex;
  }

  ${InputContainer} {
    min-width: calc(50% - 9px);
  }

  .avatar-container {
    display: inline-flex;
    align-items: center;
    flex-direction: column;
    gap: 8px;
  }

  .avatar-label {
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    color: var(--color-complementary);
    font-weight: 700;

    svg {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    &:hover {
      filter: brightness(70%);
    }
  }

  input[name='avatar'] {
    display: none;
  }

  div:nth-of-type(2) {
    margin-top: 18px;
  }

  @media (max-width: 576px) {
    max-width: calc(100% - 84px);
    padding-bottom: 15px;

    ${InputContainer} {
      width: 100%;
    }

    .user-container {
      flex-direction: column;
    }

    button {
      width: 100%;
    }
  }

  .go-back-button {
    position: absolute;
    top: 0;
    right: 0;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;

    background-color: transparent;

    font-family: 'Rubik', sans-serif;
    color: var(--color-complementary);

    svg {
      stroke-width: 4px;
    }

    @media (max-width: 576px) {
      position: static;
      margin-bottom: 36px;
    }
  }
`;
