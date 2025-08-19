// src/features/retailer/pos/SaleCompleteModal.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { CheckCircleFill, Printer, Envelope } from 'react-bootstrap-icons';

const SaleCompleteModal = ({ show, handleClose, lastSale }) => {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Body className="text-center p-4">
                <CheckCircleFill color="green" size={60} className="mb-3" />
                <h2>Venda Concluída!</h2>
                <p className="lead">Total: <strong>R$ {lastSale?.total.toFixed(2)}</strong></p>
                <p>Método de Pagamento: {lastSale?.paymentMethod}</p>
                <hr />
                <div className="d-grid gap-2">
                    <Button variant="primary" onClick={handleClose}><Printer className="me-2"/> Imprimir Recibo (Simulado)</Button>
                    <Button variant="outline-secondary" onClick={handleClose}><Envelope className="me-2"/> Enviar por E-mail (Simulado)</Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default SaleCompleteModal;