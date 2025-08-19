// src/pages/RetailerConnectPage.jsx
import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, ProgressBar, ListGroup, Badge } from 'react-bootstrap';
import { getDataRating } from '../services/retailerService';

const RetailerConnectPage = () => {
    const [rating, setRating] = useState(null);

    // Simulação de propostas recebidas
    const mockProposals = [
        { id: 1, industryName: 'Global Foods', value: 1200, period: 'trimestral', status: 'Pendente' },
        { id: 2, industryName: 'Cafés Brasil', value: 2000, period: 'semestral', status: 'Ativo' },
    ];

    useEffect(() => {
        getDataRating().then(setRating);
    }, []);

    if (!rating) return null;

    return (
        <div>
            <h2 className="mb-2">DARVIN Conecta</h2>
            <p className="text-muted mb-4">Seu painel para monetizar a qualidade dos seus dados de venda.</p>
            
            <Row className="g-4">
                {/* Coluna do Rating */}
                <Col md={5}>
                    <Card className="h-100 text-center">
                        <Card.Body>
                            <Card.Subtitle className="text-muted">Seu Rating de Dados</Card.Subtitle>
                            <h1 style={{ fontSize: '4rem' }} className="my-3">{rating.icon} {rating.rating}</h1>
                            <ProgressBar now={rating.progress} label={`${Math.round(rating.progress)}%`} className="mb-3" />
                            <p>Progresso para o nível {rating.nextLevel}</p>
                            <Button variant="outline-primary">Como Melhorar meu Rating?</Button>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Coluna das Propostas */}
                <Col md={7}>
                    <Card className="h-100">
                        <Card.Header as="h5">Contratos e Propostas</Card.Header>
                        <ListGroup variant="flush">
                            {mockProposals.map(p => (
                                <ListGroup.Item key={p.id} className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <strong>{p.industryName}</strong><br/>
                                        <small className="text-muted">Proposta para concessão de dados</small>
                                    </div>
                                    <div className="text-end">
                                        <span className="text-success fw-bold fs-5">R$ {p.value.toFixed(2)}</span>
                                        <small className="d-block text-muted">/{p.period}</small>
                                    </div>
                                    <div>
                                        {p.status === 'Pendente' ? (
                                            <>
                                                <Button size="sm" variant="success" className="me-1">Aceitar</Button>
                                                <Button size="sm" variant="outline-danger">Recusar</Button>
                                            </>
                                        ) : (
                                            <Badge bg="primary">Contrato Ativo</Badge>
                                        )}
                                    </div>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default RetailerConnectPage;