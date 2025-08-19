// src/pages/RetailerDashboardPage.js

import React from 'react';
// import { Button } from 'react-bootstrap'; // Não mais necessário
// import { JournalText } from 'react-bootstrap-icons'; // Não mais necessário
import SalesScreen from '../features/retailer/pos/SalesScreen';
// O DailySummaryModal não é mais importado ou usado aqui

const RetailerDashboardPage = () => {
  // O estado do modal foi removido
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Ponto de Venda</h2>
        {/* O botão de resumo foi removido */}
      </div>
      
      <SalesScreen />
      
      {/* O modal foi removido */}
    </div>
  );
};

export default RetailerDashboardPage;