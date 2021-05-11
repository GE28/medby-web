import styled, { css } from 'styled-components';

// import { ToastData } from '../global/ToastContext';

interface InputContainer {
  error?: boolean;
  isTouched?: boolean;
}

interface Toast {
  id: string;
  title: string;
  message: string;
  type?: 'error' | 'success';
}

export const DefaultHeader = styled.header`
  display: flex;
  height: 120px;
  width: 100%;
  padding: 0 56px;
  align-items: center;
  background-color: #5b8c30;

  @media (max-width: 436px) {
    height: 90px;
    padding: 0 42px;
    justify-content: center;
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
    height: 36px;
    padding: 6px 36px 6px 8px;
    gap: 12px;
  }

  div:focus-within {
    border: 1px solid #5b8c30;
    box-shadow: 0 0 0 3px #5b8c3020;
    transition: 0.05s;
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
    color: #23212c;
    background-color: transparent;
    border: 0;
  }

  ${(props) =>
    props.error &&
    props.isTouched &&
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
    `}

  ${(props) =>
    !props.error &&
    props.isTouched &&
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
    `}
`;

export const DefaultButton = styled.button`
  border: 0;
  border-radius: 6px;
  height: 42px;
  text-align: center;
  background-color: #5b8c30;
  color: #fcfff9;
  font-size: 18px;
  font-weight: 700;
  margin-top: 25px;
`;

export const Footer = styled.footer`
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-end;
  padding: 12px;
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
  align-items: center;

  overflow: hidden;

  height: 60px;

  background-color: #fcfff9;
  border-radius: 8px;

  border: 1px solid #f3a104;

  div {
    height: 100%;
    display: flex;
    padding: 0 4px;
    background-color: #f2e926;
    align-items: center;

    svg {
      opacity: 50%;
    }
  }

  dl {
    display: block;
    padding-left: 12px;

    dt {
      font-weight: 700;
    }

    dd {
      font-size: 16px;
      color: #6b6b6b;
    }

    button {
      position: absolute;
      top: 8px;
      right: 8px;

      background: transparent;
      border: 0;
    }
  }

  ${(props) =>
    (props.type === 'error' &&
      css`
        border: 1px solid #de0f20;

        div {
          background-color: #dd614a;
        }
      `) ||
    (props.type === 'success' &&
      css`
        border: 1px solid #5b8c30;

        div {
          background-color: #5ad45a;
        }
      `)}
`;

// 091 140 048
// 090 212 090
// -001 +072 +042

// 243 161 004
// 242 233 038
// 001 072 042

export const ToastsContainer = styled.dl`
  display: flex;
  flex-direction: column;
  gap: 12px;

  position: fixed;
  width: 400px;
  bottom: 36px;
  right: 36px;
`;
