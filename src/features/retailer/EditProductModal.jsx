// src/features/retailer/EditProductModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, InputGroup } from 'react-bootstrap';
import { updateProduct } from '../../services/stockService';

const EditProductModal = ({ show, handleClose, product, onSave }) => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        // Popula o formulário quando um produto é selecionado
        setFormData(product || {});
    }, [product]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: parseFloat(value) || 0 }));
    };

    const handleSave = () => {
        updateProduct(formData).then(() => {
            onSave(); // Avisa a página para recarregar os dados
            handleClose();
        });
    };

    if (!product) return null;

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton><Modal.Title>Editar Produto</Modal.Title></Modal.Header>
            <Modal.Body>
                <h4>{formData.name}</h4>
                <Row>
                    <Col><Form.Group><Form.Label>Preço de Custo</Form.Label><InputGroup><InputGroup.Text>R$</InputGroup.Text><Form.Control type="number" name="costPrice" value={formData.costPrice} onChange={handleInputChange} /></InputGroup></Form.Group></Col>
                    <Col><Form.Group><Form.Label>Preço de Venda</Form.Label><InputGroup><InputGroup.Text>R$</InputGroup.Text><Form.Control type="number" name="sellingPrice" value={formData.sellingPrice} onChange={handleInputChange} /></InputGroup></Form.Group></Col>
                </Row>
                 <Row className="mt-3">
                    <Col><Form.Group><Form.Label>Estoque Atual</Form.Label><Form.Control type="number" name="currentStock" value={formData.currentStock} onChange={handleInputChange} /></Form.Group></Col>
                    <Col><Form.Group><Form.Label>Estoque Mínimo</Form.Label><Form.Control type="number" name="minStock" value={formData.minStock} onChange={handleInputChange} /></Form.Group></Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                <Button variant="primary" onClick={handleSave}>Salvar Alterações</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditProductModal;