// src/features/retailer/DailySummaryModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Button, Row, Col, ListGroup, Spinner } from 'react-bootstrap';
import { getDailySummary } from '../../services/retailerService';
import { CashCoin, Cart4, Receipt } from 'react-bootstrap-icons';
import KPICard from '../industry/KPICard';

const DailySummaryModal = ({ show, handleClose }) => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (show) {
      setLoading(true);
      getDailySummary().then(data => {
        setSummary(data);
        setLoading(false);
      });
    }
  }, [show]);

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Resumo de Vendas do Dia</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? <div className="text-center p-5"><Spinner/></div> : (
            summary && <>
                <Row className="g-4 mb-4">
                    <Col><KPICard title="Receita Total" value={summary.totalRevenue} icon={<CashCoin />} format={v => `R$ ${v.toFixed(2)}`} /></Col>
                    <Col><KPICard title="Total de Vendas" value={summary.totalSalesCount} icon={<Cart4 />} format={v => `${v} vendas`} /></Col>
                    <Col><KPICard title="Ticket Médio" value={summary.averageTicket} icon={<Receipt />} format={v => `R$ ${v.toFixed(2)}`} /></Col>
                </Row>
                <h5>Produtos Mais Vendidos Hoje</h5>
                <ListGroup variant="flush">
                    {summary.topProducts.map((p, i) => <ListGroup.Item key={i}>{p.name} ({p.quantity} un.)</ListGroup.Item>)}
                </ListGroup>
            </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Fechar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DailySummaryModal;