import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100%;
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    padding-top: 58px;
    padding-bottom: 36px;
    text-align: center;
  }
`;

export const Form = styled.form`
  width: 436px;
  display: flex;
  flex-direction: column;
  row-gap: 15px;

  @media (max-width: 576px) {
    max-width: calc(100% - 84px);
  }

  button {
    margin-top: 25px;
  }

  a {
    color: #54428e;
    font-size: 14px;
    font-weight: 600;
  }

  p {
    margin-top: -9px;
    text-align: center;
  }
`;
