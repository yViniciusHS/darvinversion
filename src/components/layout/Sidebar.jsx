// src/components/layout/Sidebar.jsx

import React from 'react';
import { Nav, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
// Ícone PuzzleFill adicionado para a nova seção "Conecta"
import { 
    BarChart, BagCheckFill, BoxArrowRight, CashStack, 
    BoxSeam, JournalText, LightningCharge, Trash, PuzzleFill 
} from 'react-bootstrap-icons';
import { logout } from '../../services/authService';

const Sidebar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <h3 className="text-primary mb-4">DARVIN</h3>
      <p className="text-muted small">Bem-vindo(a),<br/><strong>{user?.name}</strong></p>
      <hr />
      <Nav className="flex-column">
        {user?.role === 'industry' && (
          <>
            <Nav.Link as={NavLink} to="/industry/dashboard">
              <BarChart className="me-2" /> Dashboard
            </Nav.Link>
            <Nav.Link as={NavLink} to="/industry/investments">
              <CashStack className="me-2" /> Investimentos
            </Nav.Link>
          </>
        )}
        {user?.role === 'retailer' && (
          <>
            <Nav.Link as={NavLink} to="/retailer/dashboard">
              <BagCheckFill className="me-2" /> Ponto de Venda
            </Nav.Link>
            <Nav.Link as={NavLink} to="/retailer/quick-entry">
              <LightningCharge className="me-2" /> Lançamento Rápido
            </Nav.Link>
            <Nav.Link as={NavLink} to="/retailer/stock">
              <BoxSeam className="me-2" /> Estoque
            </Nav.Link>
            <Nav.Link as={NavLink} to="/retailer/history">
              <JournalText className="me-2" /> Histórico
            </Nav.Link>
            <Nav.Link as={NavLink} to="/retailer/losses">
              <Trash className="me-2" /> Controle de Perdas
            </Nav.Link>
            {/* LINKS ANTIGOS REMOVIDOS E SUBSTITUÍDOS PELO NOVO LINK UNIFICADO */}
            <Nav.Link as={NavLink} to="/retailer/connect">
              <PuzzleFill className="me-2" /> DARVIN Conecta
            </Nav.Link>
          </>
        )}
      </Nav>
      <div className="mt-auto" style={{ position: 'absolute', bottom: '2rem' }}>
        <Button variant="outline-danger" onClick={handleLogout}>
          <BoxArrowRight className="me-2" /> Sair
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;