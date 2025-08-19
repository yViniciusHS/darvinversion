// src/pages/IndustryInsightsPage.jsx
import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Bullseye, Cart4, BarChartLine, GeoAlt } from 'react-bootstrap-icons';

const mockReports = [
    { id: 1, title: "Análise de Cesta de Compras", description: "Descubra quais produtos são comprados juntos com os seus.", icon: <Cart4/>, price: 250 },
    { id: 2, title: "Performance por Categoria", description: "Compare a performance dos seus SKUs contra a média da categoria.", icon: <BarChartLine/>, price: 400 },
    { id: 3, title: "Mapa Geográfico de Vendas", description: "Identifique 'white spaces' e áreas de alta/baixa performance por cidade.", icon: <GeoAlt/>, price: 650 },
];

const IndustryInsightsPage = () => {
    const handleOrder = (report) => {
        alert(`Relatório "${report.title}" encomendado! A DARVIN irá processar os dados e notificá-lo quando estiver pronto.`);
    };

    return (
        <div>
            <h2 className="mb-2">DARVIN Insights Market</h2>
            <p className="text-muted mb-4">Encomende relatórios de inteligência de mercado sob demanda, gerados a partir de dados agregados e anonimizados da nossa rede de varejistas.</p>
            
            <Row xs={1} md={2} lg={3} className="g-4">
                {mockReports.map(report => (
                    <Col key={report.id}>
                        <Card className="h-100 d-flex flex-column">
                            <Card.Body className="flex-grow-1">
                                <div className="text-center mb-3 fs-1 text-primary">{report.icon}</div>
                                <Card.Title className="text-center">{report.title}</Card.Title>
                                <Card.Text>{report.description}</Card.Text>
                            </Card.Body>
                            <Card.Footer className="text-center">
                                <p className="text-muted mb-1">Valor do Relatório</p>
                                <h4 className="mb-3">R$ {report.price.toFixed(2)}</h4>
                                <Button variant="primary" className="w-100" onClick={() => handleOrder(report)}>
                                    <Bullseye className="me-2" /> Encomendar Insight
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default IndustryInsightsPage;