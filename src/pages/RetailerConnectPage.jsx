// src/pages/RetailerConnectPage.jsx
import React from 'react';
import { Card, Button, Row, Col, Badge } from 'react-bootstrap';
import { Bullseye } from 'react-bootstrap-icons';

// Simulação de "anúncios" de indústrias procurando dados
const mockDataOpportunities = [
    { id: 1, industryName: 'Global Foods', title: 'Busca de Dados de Vendas de Snacks', description: 'Procuramos parceiros para compartilhar dados de vendas totais da categoria "Snacks" para o próximo trimestre.', reward: 'R$ 1.200,00/trimestre' },
    { id: 2, industryName: 'Cafés Brasil', title: 'Análise de Bebidas Quentes', description: 'Interessados em dados consolidados de vendas de todas as bebidas quentes para análise de mercado regional.', reward: 'Bônus de 10% em produtos' },
];

const RetailerConnectPage = () => {
    return (
        <div>
            <h2 className="mb-2">DARVIN Conecta</h2>
            <p className="text-muted mb-4">Um espaço para negociar parcerias de dados diretamente com as indústrias.</p>
            
            <h4 className="mb-3">Oportunidades de Parceria</h4>
            <Row xs={1} md={2} className="g-4">
                {mockDataOpportunities.map(opp => (
                    <Col key={opp.id}>
                        <Card className="h-100">
                            <Card.Header as="h5">{opp.industryName}</Card.Header>
                            <Card.Body>
                                <Card.Title>{opp.title}</Card.Title>
                                <Card.Text>{opp.description}</Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <small className="text-muted">Recompensa Oferecida</small>
                                        <p className="fw-bold text-success fs-5 mb-0">{opp.reward}</p>
                                    </div>
                                    <Button variant="primary" onClick={() => alert(`Sua proposta para "${opp.title}" foi enviada!`)}>
                                        <Bullseye className="me-2"/> Tenho Interesse
                                    </Button>
                                </div>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default RetailerConnectPage;