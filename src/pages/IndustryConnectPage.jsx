// src/pages/IndustryConnectPage.jsx
import React from 'react';
import { Card, Button, Row, Col, ListGroup, Badge } from 'react-bootstrap';
import { PlusCircle } from 'react-bootstrap-icons';

// Simulação de varejistas que "anunciaram" interesse em compartilhar dados
const mockRetailerOffers = [
    { id: 1, retailerName: 'Padaria Pão Quente', channel: 'Padaria', dataAvailable: 'Dados de Salgados e Bebidas (24 meses)' },
    { id: 2, retailerName: 'Mercado Central', channel: 'Supermercado Pequeno', dataAvailable: 'Dados de Laticínios e Snacks (18 meses)' },
];

const IndustryConnectPage = () => {
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>DARVIN Conecta</h2>
                <Button onClick={() => alert('Funcionalidade para criar um novo anúncio de busca por dados.')}>
                    <PlusCircle className="me-2" /> Anunciar Busca por Dados
                </Button>
            </div>
            <p className="text-muted">Encontre varejistas dispostos a estabelecer parcerias de dados e negocie diretamente.</p>
            
            <h4 className="mb-3">Varejistas Parceiros em Potencial</h4>
             <Row xs={1} md={2} className="g-4">
                {mockRetailerOffers.map(offer => (
                    <Col key={offer.id}>
                        <Card className="h-100">
                            <Card.Header>
                                <span className="h5">{offer.retailerName}</span>
                                <Badge bg="secondary" className="ms-2">{offer.channel}</Badge>
                            </Card.Header>
                            <Card.Body>
                                <Card.Subtitle className="mb-2 text-muted">Dados Disponíveis para Parceria:</Card.Subtitle>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>{offer.dataAvailable}</ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                            <Card.Footer>
                                <Button variant="success" className="w-100" onClick={() => alert(`Proposta enviada para ${offer.retailerName}!`)}>
                                    Enviar Proposta de Parceria
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