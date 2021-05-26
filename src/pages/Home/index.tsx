
import React from 'react';
import { Container } from 'react-bootstrap';

import Header from '../../components/Header';
// import api from '../../services/api';
import { Content } from './styles';

const Home: React.FC = () => {


  return (
    <>
      <Header />
      <Container>
        <Content>
          <h1>Olá, Bem vindo(a)!</h1>
        </Content>
      </Container>
    </>
  );
}

export default Home;

