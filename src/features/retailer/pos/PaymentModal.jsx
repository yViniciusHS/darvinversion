// src/features/retailer/pos/PaymentModal.js
import React, { useState } from 'react';
import { Modal, Button, Row, Col, Form, InputGroup } from 'react-bootstrap';

const PaymentModal = ({ show, handleClose, total, onConfirmPayment }) => {
    const [paymentMethod, setPaymentMethod] = useState('Dinheiro');
    const [amountPaid, setAmountPaid] = useState(0);
    const change = (amountPaid > total) ? amountPaid - total : 0;

    const handleConfirm = () => {
        onConfirmPayment(paymentMethod);
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton><Modal.Title>Pagamento</Modal.Title></Modal.Header>
            <Modal.Body>
                <h3 className="text-center mb-3">Total a Pagar: <strong className="text-primary">R$ {total.toFixed(2)}</strong></h3>
                <Row className="g-2 mb-3">
                    {['Dinheiro', 'Crédito', 'Débito', 'Pix'].map(method => (
                        <Col key={method}>
                            <Button className="w-100" variant={paymentMethod === method ? 'primary' : 'outline-primary'} onClick={() => setPaymentMethod(method)}>
                                {method}
                            </Button>
                        </Col>
                    ))}
                </Row>
                {paymentMethod === 'Dinheiro' && (
                    <div className="p-3 bg-light rounded">
                        <Form.Group className="mb-3">
                            <Form.Label>Valor Recebido</Form.Label>
                            <InputGroup><InputGroup.Text>R$</InputGroup.Text><Form.Control type="number" value={amountPaid} onChange={e => setAmountPaid(parseFloat(e.target.value) || 0)} /></InputGroup>
                        </Form.Group>
                        <h4>Troco: <span className="text-success">R$ {change.toFixed(2)}</span></h4>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button className="w-100 py-2" variant="success" onClick={handleConfirm} disabled={paymentMethod === 'Dinheiro' && amountPaid < total}>
                    Confirmar Pagamento
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PaymentModal;