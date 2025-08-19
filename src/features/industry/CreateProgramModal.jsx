// src/features/industry/CreateProgramModal.js
import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { mockProducts } from '../../services/mockData';

const CreateProgramModal = ({ show, handleClose, onProgramCreate }) => {
    const [program, setProgram] = useState({});

    const handleSubmit = () => {
        onProgramCreate(program);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Criar Novo Programa de Incentivo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col md={8}>
                            <Form.Group className="mb-3">
                                <Form.Label>Nome da Campanha</Form.Label>
                                <Form.Control type="text" onChange={e => setProgram({...program, name: e.target.value})} placeholder="Ex: Campanha de Verão" />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                             <Form.Group className="mb-3">
                                <Form.Label>Tipo de Programa</Form.Label>
                                <Form.Select onChange={e => setProgram({...program, type: e.target.value})}>
                                    <option>Selecione...</option>
                                    <option>Bônus por Volume</option>
                                    <option>Competição de Vendas</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Produto Alvo</Form.Label>
                                <Form.Select onChange={e => setProgram({...program, product: e.target.value})}>
                                     <option>Selecione...</option>
                                    {mockProducts.filter(p => p.industry === 'Global Foods').map(p => <option key={p.id}>{p.name}</option>)}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                         <Col md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>Meta (Unidades)</Form.Label>
                                <Form.Control type="number" onChange={e => setProgram({...program, goal: e.target.value})} placeholder="Ex: 100" />
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>Bônus/Prêmio</Form.Label>
                                <Form.Control type="text" onChange={e => setProgram({...program, bonus: e.target.value})} placeholder="Ex: R$ 500,00" />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                <Button variant="primary" onClick={handleSubmit}>Salvar Programa</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateProgramModal;