// src/features/industry/charts/CustomLegend.js
import React from 'react';

const CustomLegend = ({ payload, data }) => {
  return (
    <ul className="list-unstyled ms-3">
      {data.map((entry, index) => (
        <li key={`item-${index}`} className="d-flex align-items-center mb-2">
          <span style={{ width: 12, height: 12, backgroundColor: payload[index].color, display: 'inline-block', marginRight: '10px' }}></span>
          <span style={{ flexGrow: 1 }}>{entry.name}</span>
          <span className="fw-bold">{entry.percent.toFixed(1)}%</span>
        </li>
      ))}
    </ul>
  );
};

export default CustomLegend;