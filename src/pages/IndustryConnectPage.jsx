// src/pages/IndustryConnectPage.jsx
import React from 'react';
import { Card, Button, Row, Col, Badge, Form } from 'react-bootstrap';
import { FunnelFill, Search } from 'react-bootstrap-icons';

// Simulação de varejistas anonimizados com seus ratings
const mockRatedRetailers = [
    { id: 102, rating: 'Diamante', icon: '💎', channel: 'Padaria', city: 'Guaxupé' },
    { id: 105, rating: 'Ouro', icon: '🥇', channel: 'Supermercado Pequeno', city: 'Muzambinho' },
    { id: 108, rating: 'Ouro', icon: '🥇', channel: 'Padaria', city: 'Guaxupé' },
    { id: 112, rating: 'Prata', icon: '🥈', channel: 'Conveniência', city: 'Guaxupé' },
];

const IndustryConnectPage = () => {
    return (
        <div>
            <h2 className="mb-2">DARVIN Conecta</h2>
            <p className="text-muted mb-4">Encontre e negocie contratos de dados com os varejistas de maior performance.</p>
            
            {/* Filtros */}
            <Card className="mb-4">
                <Card.Body as={Form}>
                    <Row className="g-3 align-items-end">
                        <Col md><Form.Group><Form.Label><FunnelFill className="me-2"/>Filtrar por</Form.Label><Form.Select><option>Rating (Todos)</option><option>Diamante</option><option>Ouro</option><option>Prata</option></Form.Select></Form.Group></Col>
                        <Col md><Form.Group><Form.Label>Canal</Form.Label><Form.Select><option>Todos</option><option>Padaria</option><option>Supermercado Pequeno</option></Form.Select></Form.Group></Col>
                        <Col md><Form.Group><Form.Label>Cidade</Form.Label><Form.Control type="text" placeholder="Ex: Guaxupé"/></Form.Group></Col>
                        <Col md="auto"><Button><Search className="me-2"/>Buscar</Button></Col>
                    </Row>
                </Card.Body>
            </Card>

            {/* Lista de Varejistas */}
            <Row xs={1} md={2} lg={3} className="g-4">
                {mockRatedRetailers.map(r => (
                    <Col key={r.id}>
                        <Card className="text-center h-100">
                            <Card.Body>
                                <span style={{ fontSize: '3rem' }}>{r.icon}</span>
                                <Card.Title as="h4" className="mt-2">{r.rating}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Varejista #{r.id}</Card.Subtitle>
                                <Badge bg="light" text="dark" className="me-1">{r.channel}</Badge>
                                <Badge bg="light" text="dark">{r.city}</Badge>
                            </Card.Body>
                            <Card.Footer>
                                <Button variant="success" className="w-100" onClick={() => alert(`Iniciar negociação com o Varejista #${r.id}`)}>
                                    Propor Contrato de Dados
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default IndustryConnectPage;