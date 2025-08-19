import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

const PerformanceDashboard = ({ metrics }) => {
  if (!metrics) return <p>Carregando métricas...</p>;

  return (
    <>
      [cite_start]<h4>Dashboard de Performance de Vendas (BI) [cite: 19]</h4>
      <Row className="g-4 mt-2">
        <Col md={4}>
          <Card className="p-3 kpi-card">
            [cite_start]<h5>Receita Total [cite: 22]</h5>
            <h2>R$ {metrics.totalRevenue.toFixed(2).replace('.', ',')}</h2>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-3 kpi-card">
            [cite_start]<h5>Volume de Vendas [cite: 22]</h5>
            <h2>{metrics.totalVolume} Unidades</h2>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-3 kpi-card">
            [cite_start]<h5>Preço Médio [cite: 22]</h5>
            <h2>R$ {metrics.avgPrice.toFixed(2).replace('.', ',')}</h2>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PerformanceDashboard;