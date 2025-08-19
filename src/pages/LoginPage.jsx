// src/pages/LoginPage.js

import React from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { login } from '../services/authService';

const LoginPage = () => {
  // A função `useNavigate` não será mais usada aqui para o redirecionamento
  
  const handleLogin = (user, path) => {
    // Primeiro, salva o usuário no Local Storage
    login(user);
    // Em seguida, fazemos um redirecionamento completo da página
    // Isso força o React a recarregar e reconhecer o usuário logado
    window.location.href = path; // <-- MUDANÇA PRINCIPAL
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <Card style={{ width: '32rem' }}>
        <Card.Body className="text-center p-4">
          <Card.Title as="h2" className="mb-3">Bem-vindo à Plataforma DARVIN</Card.Title>
          <Card.Text>Selecione seu perfil para continuar.</Card.Text>
          <Row className="mt-4">
            <Col>
              <Button 
                variant="primary" 
                size="lg" 
                className="w-100"
                onClick={() => handleLogin({ role: 'retailer', name: 'Carlos (Padaria Pão Quente)' }, '/retailer/dashboard')}
              >
                Sou VAREJISTA
              </Button>
            </Col>
            <Col>
              <Button 
                variant="secondary" 
                size="lg"
                className="w-100"
                onClick={() => handleLogin({ role: 'industry', name: 'Mariana (Global Foods)' }, '/industry/dashboard')}
              >
                Sou INDÚSTRIA
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginPage;