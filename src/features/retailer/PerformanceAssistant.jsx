// src/features/retailer/PerformanceAssistant.js

import React from 'react';
import { Offcanvas, Spinner, Alert, Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { BellSlash } from 'react-bootstrap-icons';
import InsightCard from './InsightCard';

// Função auxiliar para agrupar os insights pela sua categoria
const groupInsightsByCategory = (insightsList) => {
    return insightsList.reduce((acc, insight) => {
        const category = insight.category || 'Geral';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(insight);
        return acc;
    }, {});
};

const PerformanceAssistant = ({ show, onHide, insights, onSilence }) => {
    // LÓGICA DE ORDENAÇÃO ADICIONADA AQUI
    // Garante que insights críticos (ex: Alertas) apareçam sempre no topo da lista.
    const sortedInsights = insights ? [...insights].sort((a, b) => b.critical - a.critical) : [];

    // Agrupa os insights já ordenados
    const groupedInsights = sortedInsights ? groupInsightsByCategory(sortedInsights) : {};

    return (
        <Offcanvas show={show} onHide={onHide} placement="end" style={{width: '500px'}}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Assistente de Performance</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {!insights ? (
                    <div className="text-center p-3"><Spinner animation="border" /></div>
                ) : insights.length > 0 ? (
                    // Mapeia os insights já ordenados e agrupados
                    Object.keys(groupedInsights).map(category => (
                        <div key={category} className="mb-4">
                            <h5>{category}</h5>
                            <hr className="mt-1" />
                            {groupedInsights[category].map(insight => (
                                <InsightCard key={insight.id} insight={insight} />
                            ))}
                        </div>
                    ))
                ) : (
                    <Alert variant="info">Nenhum insight para você no momento. Bom trabalho!</Alert>
                )}
            </Offcanvas.Body>
            
            <div className="p-3 border-top">
                <Dropdown as={ButtonGroup} style={{width: '100%'}}>
                    <Button variant="secondary" onClick={() => onSilence(15)}>
                        <BellSlash className="me-2"/> Silenciar por 15 min
                    </Button>
                    <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic" />
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => onSilence(60)}>Silenciar por 1 hora</Dropdown.Item>
                        <Dropdown.Item onClick={() => onSilence(24 * 60)}>Silenciar por 24 horas</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </Offcanvas>
    );
};

export default PerformanceAssistant;