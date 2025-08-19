// src/features/retailer/OfferCard.jsx
import React from 'react';
import { Card, Button, ListGroup, Badge } from 'react-bootstrap';
// CORREÇÃO: 'Handshake' foi trocado por 'PeopleFill'
import { Trophy, PeopleFill, StarFill } from 'react-bootstrap-icons';

const OfferCard = ({ offer, onApply }) => {
    const isTactic = offer.type === 'Tática';
    return (
        <Card className="h-100">
            <Card.Header>
                <Badge bg={isTactic ? 'primary' : 'success'}>{isTactic ? 'Campanha Tática' : 'Parceria Estratégica'}</Badge>
            </Card.Header>
            <Card.Body>
                <Card.Subtitle className="text-muted mb-2">{offer.industryName}</Card.Subtitle>
                <Card.Title>{offer.title}</Card.Title>
                <Card.Text>
                    {isTactic ? `Objetivo: Vender ${offer.goal} un. de ${offer.product}` : `Objetivo: Compartilhar dados da categoria '${offer.category}'`}
                </Card.Text>
                 {offer.requirements && (
                    <ListGroup variant="flush" className="my-3">
                        <ListGroup.Item className="px-0 pt-0 small"><strong>Requisitos:</strong></ListGroup.Item>
                        {offer.requirements.channel && <ListGroup.Item className="px-0 small text-muted">Canal: {offer.requirements.channel.join(' ou ')}</ListGroup.Item>}
                        {offer.requirements.minSalesLast30Days && <ListGroup.Item className="px-0 small text-muted">Mínimo de {offer.requirements.minSalesLast30Days} vendas/mês</ListGroup.Item>}
                    </ListGroup>
                )}
            </Card.Body>
            <Card.Footer className="text-center">
                <p className="text-muted small mb-1">Vantagens Oferecidas</p>
                {/* CORREÇÃO: Usando o ícone correto */}
                <p className="fw-bold text-success">{isTactic ? <Trophy className="me-2"/> : <PeopleFill className="me-2"/>}{offer.bonus}</p>
                <Button variant="primary" onClick={() => onApply(offer)}><StarFill className="me-2"/> Tenho Interesse</Button>
            </Card.Footer>
        </Card>
    );
};

export default OfferCard;