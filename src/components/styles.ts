import styled, { css, keyframes } from 'styled-components';

interface InputContainer {
  error?: boolean;
  isTouched?: boolean;
}

interface Toast {
  type?: 'error' | 'success';
}

const fullRotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

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
    color: #23212c;
    background-color: transparent;
    border: 0;
  }

  input:-webkit-autofill {
    transition: background-color 5000s ease-in-out 0s;
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
  border-radius: 6px;
  height: 42px;
  text-align: center;
  background-color: #5b8c30;
  color: #fcfff9;
  font-size: 18px;
  font-weight: 700;
  margin-top: 25px;

  &:hover {
    background-color: #3b5b1f;
  }

  svg {
    animation: ${fullRotate} 2s linear infinite;
  }
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

  overflow: hidden;

  background-color: #fcfff9;
  border-radius: 8px;

  border: 1px solid #f3a104;

  div {
    height: auto;
    display: flex;
    padding: 4px;
    background-color: #f2e926;
    align-items: center;

    svg {
      opacity: 50%;
    }
  }

  dl {
    display: block;
    padding-left: 12px;
    padding: 8px 10px;
    align-self: center;
    word-break: break-all;

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

  &[type='error'] {
    border: 1px solid #de0f20;

    div {
      background-color: #dd614a;
    }
  }

  &[type='success'] {
    border: 1px solid #5b8c30;

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
`;
