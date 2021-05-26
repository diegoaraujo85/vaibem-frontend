import { Button } from 'antd';
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

import logoImg from '../../assets/logo.png';
import { useAuth } from '../../hooks/auth';
import {
  ActivesIcon,
  EstablishmentsIcon,
} from './styles';

const Header: React.FC = () => {

  const { signOut, user } = useAuth();
  return (
    <Container>
      <Navbar
        fixed="top"
        expand="lg"
        variant="dark"
        bg="dark"
      // style={{ background: '#13f484' }}
      >
        <Navbar.Brand href="/">
          <img
            src={logoImg}
            height="30"
            className="d-inline-block align-top"
            alt="logo"
          />{' '}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/users">
              <ActivesIcon />
              Usuários
            </Nav.Link>

            <Nav.Link href="/establishments">
              <EstablishmentsIcon />
              Estabelecimentos
            </Nav.Link>

          </Nav>

          <Nav>
            {user.name}
            <Button onClick={signOut} style={{ marginLeft: '1rem' }}>
              Sair
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

export default Header;
