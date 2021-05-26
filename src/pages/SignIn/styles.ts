import styled from 'styled-components';

export const Container = styled.div`
`;

export const Content = styled.div`
  height: 100vh; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }
  }
`;
