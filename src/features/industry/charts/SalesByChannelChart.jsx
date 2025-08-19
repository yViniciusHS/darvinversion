// src/features/industry/charts/SalesByChannelChart.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Paleta de cores mais profissional
const COLORS = {
    'Padaria': '#2c5eff',
    'Supermercado Pequeno': '#198754',
    'Conveniência': '#ffc107',
};

const SalesByChannelChart = ({ data }) => {
  // Pega dinamicamente os nomes dos canais a partir dos dados recebidos
  const channels = [...new Set(data.flatMap(d => Object.keys(d).filter(key => key !== 'name')))];

  return (
    <ResponsiveContainer width="100%" height={350}>
      {/* MUDANÇA PRINCIPAL: layout="vertical" e eixos invertidos */}
      <BarChart 
        data={data} 
        layout="vertical" 
        margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis 
            type="category" 
            dataKey="name" 
            width={100} 
            tick={{ fontSize: 12 }} 
            interval={0}
        />
        <Tooltip formatter={(value, name) => [`${value} Unidades`, name]} />
        <Legend />
        {channels.map(channel => (
            <Bar key={channel} dataKey={channel} stackId="a" fill={COLORS[channel] || '#ccc'} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SalesByChannelChart;