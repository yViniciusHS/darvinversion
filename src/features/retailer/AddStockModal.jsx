// src/features/retailer/AddStockModal.js

import React, { useState } from 'react'; // <-- SINTAXE CORRIGIDA AQUI
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';

const AddStockModal = ({ show, handleClose, product, onStockAdd }) => {
    // Usamos useState para controlar o valor do input
    const [amount, setAmount] = useState(1);

    const handleSubmit = () => {
        // Garante que o valor seja um número antes de enviar
        onStockAdd(product.id, parseInt(amount, 10) || 0);
        handleClose();
        setAmount(1); // Reseta o valor para a próxima vez
    };

    if (!product) return null;

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Adicionar Estoque</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>{product.name}</h5>
                <p>Estoque atual: <strong>{product.currentStock} unidades</strong></p>
                <Form.Group>
                    <Form.Label>Quantidade a adicionar:</Form.Label>
                    <InputGroup>
                        <Form.Control 
                            type="number" 
                            value={amount} 
                            onChange={e => setAmount(e.target.value)} 
                            min="1"
                        />
                         <InputGroup.Text>Unidades</InputGroup.Text>
                    </InputGroup>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                <Button variant="primary" onClick={handleSubmit}>Confirmar Entrada</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddStockModal;