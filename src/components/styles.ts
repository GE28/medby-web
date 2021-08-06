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

  border-bottom: ${(props) => (props.logged ? '3px solid #5b8c30' : '0')};
  background-color: ${(props) => (props.logged ? '#fcfff9' : '#5b8c30')};

  ${(props) =>
    props.logged &&
    css`
      span {
        color: #5b8c30;
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
  color: #fcfff9;
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
    border: 3px solid #5b8c30;
    position: relative;
    border-radius: 50%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: inherit;
    height: inherit;
    object-fit: cover;
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
      color: #5b8c30;
      ${iconLinkCSS}
    }

    h4 {
      margin-bottom: 4px;
    }
  }

  .menu {
    background-color: #f9fff5;
    position: absolute;
    z-index: 999;
    bottom: -48px;
    left: 0;

    display: flex;
    justify-content: center;

    border-radius: 8px;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
    padding: 12px;

    span {
      margin-right: 8px;
    }

    button {
      color: #54428e;
      background-color: transparent;
      ${iconLinkCSS}
    }
  }

  .menu span {
    color: #000;
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
    border-bottom: 8px solid #f9fff5;

    filter: drop-shadow(0 -1px 0 rgba(0, 0, 0, 0.1));
  }

  @media (max-width: 630px) {
    flex-direction: column;

    > div a svg,
    > div h4 {
      display: none;
      visibility: hidden;
    }

    > .avatar-container img {
      border-color: #23212c;
    }

    > div span {
      color: #23212c;
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
    background-color: #fcfff9;
    border-radius: 6px;
    border: 1px solid #a6a6a6;
    padding: 0 36px 0 8px;
    gap: 12px;
  }

  div:focus-within {
    border: 1px solid #5b8c30;
    box-shadow: 0 0 0 3px #5b8c3020;
    transition: 0.05s;
  }

  div:hover {
    box-shadow: 0 0 0 3px #5b8c3020;
  }

  span {
    font-size: 14px;
  }

  div svg {
    flex-shrink: 0;
    color: #a6a6a6;
  }

  input {
    font-size: 16px;
    flex-grow: 1;
    outline: 0;
    line-height: 36px;
    color: #23212c;
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
        border: 1px solid #dd614a;
        box-shadow: 0 0 0 3px #dd614a20;
      }

      div svg {
        color: #dd614a;
      }

      span {
        color: #dd614a;
      }
    `};

  ${({ error, isTouched }) =>
    !error &&
    isTouched &&
    css`
      div {
        border: 1px solid #5b8c30;
      }

      div svg {
        color: #5b8c30;
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
        background-color: #a6a6a6;
      }

      div svg {
        color: #fcfff9;
      }

      input {
        color: #fcfff9;
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
    border: 1px solid #a6a6a6;
    border-radius: 6px;

    background-color: #fcfff9;
    font-size: 16px;

    &:hover {
      box-shadow: 0 0 0 3px #5b8c3020;
    }
  }

  div.select-input {
    display: flex;
    align-items: center;

    padding: 0 8px;

    &:active {
      border: 1px solid #5b8c30;
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
    border: 1px solid #5b8c30;
    box-shadow: 0 0 0 3px #5b8c3020;

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
      background-color: #5ad45a;
    }
  }

  svg {
    margin-right: 12px;
  }

  color: #23212c;
`;

export const DefaultButton = styled.button`
  display: flex;
  border-radius: 6px;
  line-height: 42px;

  color: #fcfff9;
  font-size: 18px;
  font-weight: 700;

  background-color: #5b8c30;
  align-items: center;
  justify-content: center;

  margin-top: 25px;

  &:hover {
    background-color: #3b5b1f;
  }

  :disabled {
    cursor: not-allowed;
    background-color: #a6a6a6;
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
    color: #54428e;
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
  color: #5b8c30;
  font-size: 21px;
  font-family: 'Montserrat', sans-serif;
  gap: 12px;

  img {
    order: 1;
    fill: #5b8c30;
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

  background-color: #fcfff9;
  border-radius: 8px;

  border: 1px solid #f3a104;

  div {
    position: relative;
    top: 0;
    bottom: 0;
    padding: 0 4px;
    display: flex;
    background-color: #f2e926;
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
      color: #6b6b6b;
    }
  }

  &[type='error'] {
    border-color: #de0f20;

    div {
      background-color: #dd614a;
    }
  }

  &[type='success'] {
    border-color: #5b8c30;

    div {
      background-color: #5ad45a;
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
  background-color: #f9fff5;
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
    background-color: #54428ebf;
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
        border: 2px solid #f9fff5;
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
        color: #f9fff5;
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
        color: #f9fff5;
        margin: 0;
      }
    }

    margin-top: -6px;
  }

  > div:nth-of-type(n + 2):nth-of-type(even) {
    background-color: #f9fff5;
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
      color: #54428e;
    }

    div {
      span {
        display: block;
        text-align: end;
        font-weight: 600;

        :nth-of-type(1) {
          color: #23212c;
        }

        :nth-of-type(2) {
          margin-top: 3px;
          font-family: 'Source Sans Pro', sans-serif;
          color: #a6a6a6;
        }
      }
    }
  }

  > span {
    display: block;
    text-align: center;
    font-weight: 700;
    color: #54428e;
    font-family: 'Rubik', sans-serif;
    font-weight: 600;

    margin-bottom: 18px;
  }

  .action-button {
    margin: 0 auto;
    margin-top: 24px;
    padding: 0 18px;
    line-height: 32px;
    filter: drop-shadow(0px 4px 0px rgba(0, 0, 0, 0.2));

    &:hover {
      background-color: #fb895e;
    }

    &:active {
      background-color: #bf3936;
      filter: none;
    }

    svg {
      width: 18px;
      height: 18px;
      margin-right: 10px;
      animation: none;
    }

    &.cancel {
      background-color: #dd614a;

      &:hover {
        background-color: #fb895e;
      }

      &:active {
        background-color: #bf3936;
      }
    }

    &.appoint {
      background-color: #5ad45a;

      &:hover {
        background-color: #5ad45a;
      }

      &:active {
        background-color: #5b8c30;
      }
    }
  }

  h5 {
    color: rgba(0, 0, 0, 0.2);

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

  background-color: rgba(0, 0, 0, 0.7);
`;
