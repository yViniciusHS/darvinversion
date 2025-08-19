// src/components/layout/DashboardLayout.js

import React, { useState, useEffect, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import { Button, Badge, Toast, ToastContainer, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Lightbulb } from 'react-bootstrap-icons';
import Sidebar from './Sidebar';
import PerformanceAssistant from '../../features/retailer/PerformanceAssistant';
import { useAuth } from '../../hooks/useAuth';
import { generateRetailerInsights } from '../../services/retailerService';

const DashboardLayout = () => {
  const { user } = useAuth();
  const [showAssistant, setShowAssistant] = useState(false);
  const [insightData, setInsightData] = useState({ insights: [], insightCounts: {} });
  const [isSilenced, setIsSilenced] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [insightsSeen, setInsightsSeen] = useState(false);

  const fetchInsights = useCallback(() => {
    if (user?.role === 'retailer') {
      generateRetailerInsights().then(data => {
        setInsightData(data);
        setInsightsSeen(false); // Reseta o 'visto' sempre que novos insights são buscados
        const criticalInsight = data.insights.find(i => i.critical);
        if (criticalInsight && !isSilenced) {
          setToastMessage(criticalInsight.title);
          setShowToast(true);
        }
      });
    }
  }, [user, isSilenced]);

  useEffect(() => {
    fetchInsights();
  }, [fetchInsights]);

  const handleSilence = (minutes) => {
    setIsSilenced(true);
    setShowToast(false);
    setTimeout(() => {
      setIsSilenced(false);
    }, minutes * 60 * 1000);
  };

  const handleToastClick = () => {
    setShowAssistant(true);
    setShowToast(false);
  };
  
  const handleAssistantClose = () => {
      setShowAssistant(false);
      setInsightsSeen(true);
  };

  return (
    <div className="d-flex">
      <Sidebar user={user} />
      <main className="content-area w-100">

        {user?.role === 'retailer' && (
          <Button variant="light" className="assistant-toggle-btn" onClick={() => setShowAssistant(true)}>
            <Lightbulb size={20} />
            <span className="d-none d-md-inline ms-2">Insights</span>
            
            {!insightsSeen && insightData.insightCounts?.alerts > 0 && (
              <OverlayTrigger placement="bottom" overlay={<Tooltip>{insightData.insightCounts.alerts} Alertas Críticos</Tooltip>}>
                <Badge pill bg="danger" className="assistant-badge">{insightData.insightCounts.alerts}</Badge>
              </OverlayTrigger>
            )}
            {!insightsSeen && insightData.insightCounts?.opportunities > 0 && (
               <OverlayTrigger placement="bottom" overlay={<Tooltip>{insightData.insightCounts.opportunities} Oportunidades de Venda</Tooltip>}>
                <Badge pill bg="primary" className="assistant-badge">{insightData.insightCounts.opportunities}</Badge>
               </OverlayTrigger>
            )}
            {/* NOVO BADGE AMARELO PARA TENDÊNCIAS */}
            {!insightsSeen && insightData.insightCounts?.trends > 0 && (
               <OverlayTrigger placement="bottom" overlay={<Tooltip>{insightData.insightCounts.trends} Novas Tendências</Tooltip>}>
                <Badge pill bg="warning" text="dark" className="assistant-badge">{insightData.insightCounts.trends}</Badge>
               </OverlayTrigger>
            )}
          </Button>
        )}
        <Outlet />
      </main>

      <PerformanceAssistant 
        show={showAssistant} 
        onHide={handleAssistantClose}
        insights={insightData.insights}
        onSilence={handleSilence}
      />

      <ToastContainer position="bottom-end" className="p-3" style={{ zIndex: 1100 }}>
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={10000} autohide bg="warning">
          <div onClick={handleToastClick} style={{ cursor: 'pointer' }}>
            <Toast.Header closeButton={false}>
              <strong className="me-auto">⚠️ Alerta do Assistente</strong>
            </Toast.Header>
            <Toast.Body>
              {toastMessage}! Clique aqui para ver os detalhes.
            </Toast.Body>
          </div>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default DashboardLayout;