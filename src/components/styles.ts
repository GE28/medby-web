import styled, { css } from 'styled-components/macro';

interface CustomHeader {
  logged?: boolean;
}

interface InputContainer {
  error?: boolean;
  isDisabled: boolean;
  isTouched?: boolean;
}

interface AvatarContainer {
  size?: number;
}

interface Toast {
  type?: 'error' | 'success';
}

export const DefaultHeader = styled.header<CustomHeader>`
  user-select: none;

  display: flex;
  height: 120px;
  width: 100%;
  padding: 0 56px;
  align-items: center;
  justify-content: space-between;

  border-bottom: ${(props) =>
    props.logged ? '3px solid var(--color-main)' : '0'};
  background-color: ${(props) =>
    props.logged ? 'var(--color-fake-white)' : 'var(--color-main)'};

  ${(props) =>
    props.logged &&
    css`
      span {
        color: var(--color-main);
      }
    `};

  @media (max-width: 436px) {
    height: 90px;
    padding: 0 42px;
    ${(props) => (props.logged ? null : 'justify-content: center')};

    div > span {
      ${(props) => props.logged && 'display: none; visibility: hidden'};
    }
  }

  div > span {
    opacity: ${(props) => (props.logged ? '80%' : '1')};
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  height: 100%;
  gap: 16px;
  color: var(--color-fake-white);
  align-items: center;

  img {
    height: 65%;
  }

  span {
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    font-size: 40px;
  }
`;

export const AvatarContainer = styled.div<AvatarContainer>`
  user-select: none;

  position: relative;
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};

  img {
    border: 3px solid var(--color-main);
    position: relative;
    border-radius: 50%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: inherit;
    height: inherit;
    object-fit: cover;
    font-size: 60%;
  }
`;

const iconLinkCSS = `
  display: inline-flex;
  align-items: center;
  place-content: center;
  column-gap: 4px;
`;

export const ProfileWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  column-gap: 9px;

  font-weight: 600;

  > div {
    text-align: center;

    a {
      color: var(--color-main);
      ${iconLinkCSS}
    }

    h4 {
      margin-bottom: 4px;
    }
  }

  .menu {
    background-color: var(--color-bg);
    position: absolute;
    z-index: 999;
    bottom: -48px;
    left: 0;

    display: flex;
    justify-content: center;

    border-radius: 8px;
    box-shadow: 0 0 0 1px var(--color-black-10);
    padding: 12px;

    span {
      margin-right: 8px;
    }

    button {
      color: var(--color-complementary);
      background-color: transparent;
      ${iconLinkCSS}
    }
  }

  .menu span {
    color: var(--color-text);
    opacity: 1;
  }

  .menu::before {
    content: '';
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);

    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid var(--color-bg);

    filter: drop-shadow(0 -1px 0 var(--color-black-10));
  }

  @media (max-width: 630px) {
    flex-direction: column;

    > div a svg,
    > div h4 {
      display: none;
      visibility: hidden;
    }

    > .avatar-container img {
      border-color: var(--color-text);
    }

    > div span {
      color: var(--color-text);
    }
  }
`;

export const InputContainer = styled.div<InputContainer>`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-weight: 600;
  }

  div {
    display: flex;
    align-items: center;
    background-color: var(--color-fake-white);
    border-radius: 6px;
    border: 1px solid var(--color-border);
    padding: 0 36px 0 8px;
    gap: 12px;
  }

  div:focus-within {
    border: 1px solid var(--color-main);
    box-shadow: 0 0 0 3px var(--color-main-13);
    transition: 0.05s;
  }

  div:hover {
    box-shadow: 0 0 0 3px var(--color-main-13);
  }

  span {
    font-size: 14px;
  }

  div svg {
    flex-shrink: 0;
    color: var(--color-border);
  }

  input {
    font-size: 16px;
    flex-grow: 1;
    outline: 0;
    line-height: 36px;
    color: var(--color-text);
    background-color: transparent;
    border: 0;
  }

  // prevent browser default background when autofilled
  input:-webkit-autofill {
    transition: background-color 5000s ease-in-out 0s;
  }

  ${({ error, isTouched }) =>
    error &&
    isTouched &&
    css`
      div {
        border: 1px solid var(--color-danger);
        box-shadow: 0 0 0 3px var(--color-danger-13);
      }

      div svg {
        color: var(--color-danger);
      }

      span {
        color: var(--color-danger);
      }
    `};

  ${({ error, isTouched }) =>
    !error &&
    isTouched &&
    css`
      div {
        border: 1px solid var(--color-main);
      }

      div svg {
        color: var(--color-main);
      }

      span {
        display: none;
        visibility: hidden;
      }
    `};

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      div {
        cursor: not-allowed;
        background-color: var(--color-border);
      }

      div svg {
        color: var(--color-fake-white);
      }

      input {
        color: var(--color-fake-white);
      }
    `};
`;

export const SelectContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-weight: 600;
  }

  div {
    border: 1px solid var(--color-border);
    border-radius: 6px;

    background-color: var(--color-fake-white);
    font-size: 16px;

    &:hover {
      box-shadow: 0 0 0 3px var(--color-main-13);
    }
  }

  div.select-input {
    display: flex;
    align-items: center;

    padding: 0 8px;

    &:active {
      border: 1px solid var(--color-main);
      transition: 0.05s;
    }

    input {
      width: 100%;
      font-size: 16px;
      line-height: 36px;
      border: 0;
      outline: 0;
    }
  }

  div.select-menu {
    border-radius: 6px 0 0 6px;
    border: 1px solid var(--color-main);
    box-shadow: 0 0 0 3px var(--color-main-13);

    width: 100%;
    position: absolute;
    top: calc(100% + 8px);
    z-index: 999;

    overflow-y: auto;
    max-height: 480px;

    span {
      display: block;
      padding: 1em;
      font-size: 1em;
    }

    span:hover {
      background-color: var(--color-success);
    }
  }

  svg {
    margin-right: 12px;
  }

  color: var(--color-text);
`;

export const DefaultButton = styled.button`
  display: flex;
  border-radius: 6px;
  line-height: 42px;

  color: var(--color-fake-white);
  font-size: 18px;
  font-weight: 700;

  background-color: var(--color-main);
  align-items: center;
  justify-content: center;

  margin-top: 25px;

  &:hover {
    background-color: var(--color-main-darker);
  }

  :disabled {
    cursor: not-allowed;
    background-color: var(--color-border);
  }

  svg {
    margin: 9px 0;
  }
`;

export const Footer = styled.footer`
  user-select: none;
  margin-top: 36px;

  display: flex;
  flex-direction: row-reverse;
  align-items: flex-end;
  padding: 12px;
`;

export const Form = styled.form`
  width: 436px;
  display: flex;
  flex-direction: column;
  row-gap: 15px;

  @media (max-width: 576px) {
    max-width: calc(100% - 84px);
  }

  > button {
    margin-top: 24px;
  }

  a {
    color: var(--color-complementary);
    font-size: 14px;
    font-weight: 600;
  }

  p {
    margin-top: -8px;
    text-align: center;
  }
`;

export const GithubContainer = styled.a`
  display: flex;
  align-items: center;
  color: var(--color-main);
  font-size: 21px;
  font-family: 'Montserrat', sans-serif;
  gap: 12px;

  img {
    order: 1;
    fill: var(--color-main);
    width: 36px;
  }
`;

export const ToastWrapper = styled.div<Toast>`
  position: relative;
  display: flex;

  top: -1px;
  left: -1px;
  bottom: -1px;

  overflow: hidden;

  background-color: var(--color-fake-white);
  border-radius: 8px;

  border: 1px solid var(--color-warning-strong);

  div {
    position: relative;
    top: 0;
    bottom: 0;
    padding: 0 4px;
    display: flex;
    background-color: var(--color-warning);
    align-items: center;

    svg {
      width: 24px;
      height: 24px;
      opacity: 50%;
    }
  }

  button {
    position: absolute;
    margin: 1pt;
    top: 6px;
    right: 6px;

    background: transparent;
    border: 0;

    svg {
      width: 18px;
      height: 18px;
    }
  }

  dl {
    display: block;
    padding-left: 12px;
    padding: 6px 10px;
    word-break: normal;

    dt {
      font-weight: 700;
    }

    dd {
      margin-top: 0.05rem;
      font-size: 16px;
      color: dimgray;
    }
  }

  &[type='error'] {
    border-color: var(--color-danger-strong);

    div {
      background-color: var(--color-danger);
    }
  }

  &[type='success'] {
    border-color: var(--color-main);

    div {
      background-color: var(--color-success);
    }
  }
`;

export const ToastsContainer = styled.dl`
  display: flex;
  flex-direction: column;
  gap: 12px;

  position: fixed;
  width: 400px;
  bottom: 36px;
  right: 36px;

  @media (max-width: calc(400px + 36px * 2)) {
    max-width: calc(100% - 36px * 2);

    div {
      font-size: 0.9rem;

      dl {
        dd {
          margin-top: 0.1rem;
          font-size: 0.8rem;
        }
      }
    }
  }
`;

export const ModalContainer = styled.div`
  position: relative;
  display: block;
  background-color: var(--color-bg);
  text-align: center;
  width: 75%;
  padding: 24px 0;
  border-radius: 16px;

  width: 100%;

  margin: auto;

  .close-button {
    position: absolute;

    display: flex;
    align-items: center;
    justify-content: center;

    top: 12px;
    right: 12px;

    background: transparent;
  }

  .doctor-info {
    background-color: var(--color-complementary-75);
    padding: 18px 24px;

    .doctor-container {
      display: flex;
      align-items: center;
    }

    .avatar-container {
      position: relative;
      width: 72px;
      height: 72px;

      img {
        border: 2px solid var(--color-bg);
        position: absolute;
        border-radius: 50%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: inherit;
        height: inherit;
        object-fit: cover;
      }
    }

    .doctor-data {
      padding-left: 12px;

      span {
        text-align: start;
        display: block;
        font-size: 18px;
        font-weight: 700;
        opacity: 0.75;
      }

      > span {
        font-family: 'Rubik', sans-serif;
        color: var(--color-bg);
        margin-bottom: 3px;
        opacity: 1;
      }

      .spec-data {
        text-align: start;
      }

      .spec-data span {
        display: inline-block;
        margin-right: 24px;
      }

      .spec-data span :nth-child(even) {
        color: var(--color-bg);
        margin: 0;
      }
    }

    margin-top: -6px;
  }

  > div:nth-of-type(n + 2):nth-of-type(even) {
    background-color: var(--color-bg);
  }

  > div:nth-of-type(n + 2) {
    width: 100%;
    background-color: #0000000d;
    display: flex;
    justify-content: space-between;
    text-align: start;
    padding: 24px;

    span {
      font-weight: 700;
      color: var(--color-complementary);
    }

    div {
      span {
        display: block;
        text-align: end;
        font-weight: 600;

        :nth-of-type(1) {
          color: var(--color-text);
        }

        :nth-of-type(2) {
          margin-top: 3px;
          font-family: 'Source Sans Pro', sans-serif;
          color: var(--color-border);
        }
      }
    }
  }

  > span {
    display: block;
    text-align: center;
    font-weight: 700;
    color: var(--color-complementary);
    font-family: 'Rubik', sans-serif;
    font-weight: 600;

    margin-bottom: 18px;
  }

  .action-button {
    margin: 0 auto;
    margin-top: 24px;
    padding: 0 18px;
    line-height: 32px;
    filter: drop-shadow(0px 4px 0px var(--color-black-20));

    &:hover {
      background-color: var(--color-danger-lighter);
    }

    &:active {
      background-color: var(--color-danger-darker);
      filter: none;
    }

    svg {
      width: 18px;
      height: 18px;
      margin-right: 10px;
    }

    &.cancel {
      background-color: var(--color-danger);

      &:hover {
        background-color: var(--color-danger-lighter);
      }

      &:active {
        background-color: var(--color-danger-darker);
      }
    }

    &.appoint {
      background-color: var(--color-success);

      &:hover {
        background-color: var(--color-success);
      }

      &:active {
        background-color: var(--color-main);
      }
    }

    &.alert {
      background-color: var(--color-warning-strong);
    }
  }

  h5 {
    color: var(--color-black-20);

    margin-top: 8px;
  }

  @media (max-width: 540px) {
    .doctor-container {
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .doctor-data span {
        text-align: center;
      }

      .avatar-container {
        margin-bottom: 8px;
      }

      .doctor-data .spec-data {
        text-align: center;

        span {
          display: block;
          margin: 0;
        }

        span:nth-of-type(2) {
          margin-top: 8px;
        }
      }
    }

    > div:nth-of-type(n + 2) {
      flex-direction: column;
      align-items: center;

      div span {
        text-align: center;
      }

      > span {
        margin-bottom: 8px;
      }
    }
  }

  .confirm-alert {
    position: absolute;
    color: var(--color-warning-strong);
    font-size: 0.8em;

    left: 50%;
    transform: translateX(-50%);
    bottom: 14%;
  }
`;

export const DefaultModal = styled.div`
  position: fixed;
  z-index: 999;

  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  position: fixed;

  padding: 32px 32px;
  overflow-y: scroll;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--color-black-70));
`;
