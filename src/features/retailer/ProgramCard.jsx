// src/features/retailer/ProgramCard.js

import React from 'react';
import { Card, ProgressBar, Badge, Button, ListGroup } from 'react-bootstrap';
import { TrophyFill, Check2Circle, StarFill } from 'react-bootstrap-icons';

const ProgramCard = ({ program, type, onJoinClick, onRedeemClick }) => {
    // A propriedade 'type' dirá ao card como ele deve se comportar: 'available' ou 'participating'
    const isCompleted = type === 'participating' && (program.status === 'Concluído' || program.progressPercentage >= 100);
    
    return (
        <Card className={`program-card h-100 ${isCompleted ? 'border-success' : ''}`}>
            <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                        <Card.Subtitle className="text-muted mb-1">{program.industryName}</Card.Subtitle>
                        <Card.Title as="h5">{program.name}</Card.Title>
                    </div>
                    {/* O status só aparece para desafios em andamento */}
                    {type === 'participating' && <Badge bg={isCompleted ? 'success' : 'primary'}>{program.status}</Badge>}
                </div>
                <Card.Text><strong>Objetivo:</strong> Vender <strong>{program.goal} unidades</strong> de <em>{program.product}</em>.</Card.Text>
                
                <div className="mt-auto">
                    {/* Se o card for do tipo 'available', mostra os requisitos */}
                    {type === 'available' && program.requirements && (
                        <ListGroup variant="flush" className="mb-3">
                            <ListGroup.Item className="px-0 pt-0"><strong>Requisitos para participar:</strong></ListGroup.Item>
                            {program.requirements.channel && <ListGroup.Item className="px-0 small text-muted">Canal: {program.requirements.channel.join(' ou ')}</ListGroup.Item>}
                            {program.requirements.minSalesLast30Days && <ListGroup.Item className="px-0 small text-muted">Mínimo de {program.requirements.minSalesLast30Days} vendas/mês</ListGroup.Item>}
                        </ListGroup>
                    )}

                    {/* Se o card for do tipo 'participating', mostra o progresso */}
                    {type === 'participating' && (
                        <div className="mb-3">
                            <div className="d-flex justify-content-between small">
                                <span>Progresso</span>
                                <span>{program.currentProgress} / {program.goal}</span>
                            </div>
                            <ProgressBar now={program.progressPercentage} label={`${Math.round(program.progressPercentage)}%`} variant={isCompleted ? 'success' : 'primary'} className="program-progress-bar" />
                        </div>
                    )}

                    {/* A seção de recompensa e o botão de ação mudam conforme o tipo do card */}
                    <div className="p-3 bg-light rounded text-center">
                        <small className="text-muted">Recompensa</small>
                        <p className="program-reward text-success mb-2"><TrophyFill className="me-2" />{program.bonus}</p>
                        
                        {type === 'available' && (
                            <Button variant="primary" onClick={() => onJoinClick(program)}>
                                <StarFill className="me-2"/> Participar do Desafio
                            </Button>
                        )}
                        
                        {type === 'participating' && isCompleted && !program.redeemed && (
                            <Button variant="success" onClick={() => onRedeemClick(program)}>
                                <Check2Circle className="me-2"/> Resgatar Prêmio
                            </Button>
                        )}

                        {type === 'participating' && isCompleted && program.redeemed && (
                            <Button variant="outline-secondary" disabled>Prêmio Resgatado</Button>
                        )}
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ProgramCard;