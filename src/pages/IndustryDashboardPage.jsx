// src/pages/IndustryDashboardPage.js

import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';
import * as industryService from '../services/industryService';
import { mockRetailers } from '../services/mockData';

// Importa o novo filtro MultiSelect e remove o antigo DashboardFilter
import MultiSelectFilter from '../features/industry/MultiSelectFilter';
import KPICard from '../features/industry/KPICard';
import SalesByChannelChart from '../features/industry/charts/SalesByChannelChart';
import SalesByRetailerChart from '../features/industry/charts/SalesByRetailerChart';

import { CashCoin, BoxSeam, GraphUp } from 'react-bootstrap-icons';

const IndustryDashboardPage = () => {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState(null);
  // O estado dos filtros é inicializado com a estrutura correta
  const [filters, setFilters] = useState({
      startDate: '',
      endDate: '',
      retailerIds: [] // Começa como um array vazio
  });

  useEffect(() => {
    if (user) {
      const industryName = 'Global Foods'; 
      industryService.getAggregatedSalesMetrics({ ...filters, industry: industryName }).then(setMetrics);
    }
  }, [user, filters]);

  // Função genérica para atualizar qualquer um dos filtros
  const handleFilterChange = (filterName, value) => {
      setFilters(prev => ({...prev, [filterName]: value}));
  };

  return (
    <div>
      <h2 className="mb-4">Dashboard da Indústria</h2>
      
      {/* PAINEL DE FILTROS REDESENHADO */}
      <Card className="mb-4">
        <Card.Body>
            <Row className="g-3 align-items-end">
                <Col md><Form.Group><Form.Label>Data Início</Form.Label><Form.Control type="date" value={filters.startDate} onChange={e => handleFilterChange('startDate', e.target.value)} /></Form.Group></Col>
                <Col md><Form.Group><Form.Label>Data Fim</Form.Label><Form.Control type="date" value={filters.endDate} onChange={e => handleFilterChange('endDate', e.target.value)} /></Form.Group></Col>
                <Col md><Form.Group><Form.Label>Varejistas</Form.Label><MultiSelectFilter title="Selecionar" options={mockRetailers} selectedIds={filters.retailerIds} onChange={ids => handleFilterChange('retailerIds', ids)} /></Form.Group></Col>
            </Row>
        </Card.Body>
      </Card>
      
      {metrics ? (
        <>
            {/* Cards de KPI restaurados */}
            <Row className="g-4 mb-4">
                <Col><KPICard title="Receita Total" value={metrics.totalRevenue} icon={<CashCoin />} format={v => `R$ ${v.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`} /></Col>
                <Col><KPICard title="Volume de Vendas" value={metrics.totalVolume} icon={<BoxSeam />} format={v => `${v} Un.`} /></Col>
                <Col><KPICard title="Preço Médio" value={metrics.avgPrice} icon={<GraphUp />} format={v => `R$ ${v.toFixed(2)}`} /></Col>
            </Row>
            
            <Row className="g-4">
                <Col xl={7}><Card className="chart-card"><Card.Body><Card.Title>Vendas por Produto e Canal</Card.Title><SalesByChannelChart data={metrics.salesByProductChannel} /></Card.Body></Card></Col>
                <Col xl={5}><Card className="chart-card"><Card.Body><Card.Title>Mix de Vendas por Varejista</Card.Title><SalesByRetailerChart data={metrics.salesByRetailer} /></Card.Body></Card></Col>
            </Row>
        </>
      ) : <p>Carregando dados...</p>}
    </div>
  );
};

export default IndustryDashboardPage;