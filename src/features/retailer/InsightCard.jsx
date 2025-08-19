// src/features/retailer/InsightCard.js

import React from 'react';
import { Card, Stack } from 'react-bootstrap';
import { CupHot, GraphUp, BoxSeam, Trophy, Lightbulb } from 'react-bootstrap-icons';

// Mapeia o tipo de insight para um ícone específico
const iconMap = {
    combo: <CupHot />,
    trend: <GraphUp />,
    stock: <BoxSeam />,
    program: <Trophy />,
    default: <Lightbulb />
};

// Mapeia a categoria do insight para uma classe de cor do Bootstrap
const colorMap = {
    'Alertas': 'text-danger',
    'Oportunidades de Venda': 'text-success',
    'Tendências': 'text-primary',
};

const InsightCard = ({ insight }) => {
    // Determina a classe de cor a ser usada. Se não encontrar, usa uma cor padrão.
    const iconColorClass = colorMap[insight.category] || 'text-secondary';

    return (
        <Card className="kpi-card mb-3">
            <Card.Body>
                <Stack direction="horizontal" gap={3}>
                    {/* A classe de cor é aplicada dinamicamente aqui */}
                    <div className={`icon ${iconColorClass}`}>
                        {iconMap[insight.type] || iconMap.default}
                    </div>
                    <div>
                        <Card.Title as="h5">{insight.title}</Card.Title>
                        <Card.Text>{insight.text}</Card.Text>
                    </div>
                </Stack>
            </Card.Body>
        </Card>
    );
};

export default InsightCard;