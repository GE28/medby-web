import styled, { css } from 'styled-components';

interface InputContainer {
  isError?: string | false;
  isTouched?: boolean;
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
    background-color: white;
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
    props.isError &&
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
    props.isError ||
    (props.isTouched &&
      css`
        div {
          border: 1px solid #5b8c30;
        }

        div svg {
          color: #5b8c30;
        }
      `)}
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
