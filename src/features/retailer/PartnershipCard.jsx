// src/features/retailer/PartnershipCard.jsx

import React from 'react';
import { Card, ListGroup, Button, Badge } from 'react-bootstrap';
import { Send } from 'react-bootstrap-icons';

const PartnershipCard = ({ partnership }) => {
    return (
        <Card className="h-100">
            <Card.Header as="h5">{partnership.industryName}</Card.Header>
            <Card.Body>
                <Card.Subtitle className="mb-3 text-muted">Sua performance com este parceiro:</Card.Subtitle>
                <ListGroup variant="flush">
                    <ListGroup.Item className="d-flex justify-content-between align-items-center px-0">
                        <strong>Faturamento Gerado:</strong>
                        <span className="text-success fw-bold fs-5">R$ {partnership.totalRevenue.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between align-items-center px-0">
                        <strong>Seus Produtos Mais Vendidos:</strong>
                        <span className="text-end">{partnership.topProducts.join(', ')}</span>
                    </ListGroup.Item>
                     <ListGroup.Item className="d-flex justify-content-between align-items-center px-0">
                        <strong>Desafios Ativos:</strong>
                        <Badge pill bg="primary" style={{fontSize: '0.9rem'}}>{partnership.activePrograms}</Badge>
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
            <Card.Footer>
                <Button variant="outline-primary" className="w-100">
                    <Send className="me-2"/> Enviar Relatório de Performance (Simulado)
                </Button>
            </Card.Footer>
        </Card>
    );
};

export default PartnershipCard;