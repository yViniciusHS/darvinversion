// src/features/industry/charts/SalesByRetailerChart.js

import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import CustomLegend from './CustomLegend'; // Importa a nova legenda

// Nova paleta de cores
const COLORS = ['#0d6efd', '#198754', '#ffc107', '#fd7e14'];

const SalesByRetailerChart = ({ data }) => {
  return (
    <Row className="align-items-center">
        {/* Coluna para o Gráfico */}
        <Col md={7}>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie 
                  data={data} 
                  dataKey="value" 
                  nameKey="name" 
                  cx="50%" 
                  cy="50%" 
                  innerRadius={60} 
                  outerRadius={80} 
                  fill="#8884d8" 
                  paddingAngle={5}
                  // A propriedade 'label' foi removida para limpar o gráfico
                >
                  {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(value) => `R$ ${value.toFixed(2)}`} />
              </PieChart>
            </ResponsiveContainer>
        </Col>

        {/* Coluna para a Legenda Customizada */}
        <Col md={5}>
            <CustomLegend payload={data.map((d, i) => ({color: COLORS[i]}))} data={data} />
        </Col>
    </Row>
  );
};

export default SalesByRetailerChart;