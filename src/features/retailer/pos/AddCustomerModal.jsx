// src/features/retailer/pos/AddCustomerModal.jsx
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddCustomerModal = ({ show, handleClose, onCustomerAdd }) => {
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = () => {
        onCustomerAdd({ name, cpf, email });
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton><Modal.Title>Novo Cliente</Modal.Title></Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3"><Form.Label>Nome Completo</Form.Label><Form.Control type="text" value={name} onChange={e => setName(e.target.value)} /></Form.Group>
                <Form.Group className="mb-3"><Form.Label>CPF</Form.Label><Form.Control type="text" value={cpf} onChange={e => setCpf(e.target.value)} /></Form.Group>
                <Form.Group><Form.Label>Email</Form.Label><Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} /></Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                <Button variant="primary" onClick={handleSubmit}>Salvar Cliente</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddCustomerModal;