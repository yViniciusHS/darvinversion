import React from 'react';
import { Navbar, Container, Button, Nav } from 'react-bootstrap';
import { useAuth } from '../../hooks/useAuth';
import { logout } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    window.location.reload(); // Força a atualização do estado de autenticação
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand href="#">Plataforma DARVIN</Navbar.Brand>
        <Nav className="ms-auto">
          {user && (
            <>
              <Navbar.Text className="me-3">
                Logado como: <strong>{user.name}</strong> ({user.role})
              </Navbar.Text>
              <Button variant="outline-light" onClick={handleLogout}>Sair</Button>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;