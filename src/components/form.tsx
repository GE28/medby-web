import styled from 'styled-components';

const Form = styled.form`
  width: 436px;
  display: flex;
  flex-direction: column;
  row-gap: 15px;

  @media (max-width: 576px) {
    max-width: calc(100% - 84px);
  }

  button {
    margin-top: 24px;
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

export default Form;
