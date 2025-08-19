// src/features/industry/CreateProgramModal.js
import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { mockProducts } from '../../services/mockData';

// MELHORIA: O componente agora recebe 'industryName' como uma propriedade
const CreateProgramModal = ({ show, handleClose, onProgramCreate, industryName }) => {
    const [program, setProgram] = useState({ type: 'Tática' }); // Define um tipo padrão

    const handleSubmit = () => {
        onProgramCreate(program);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Criar Nova Oportunidade</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col md={8}>
                            <Form.Group className="mb-3">
                                <Form.Label>Título da Oportunidade</Form.Label>
                                <Form.Control type="text" onChange={e => setProgram({...program, title: e.target.value})} placeholder="Ex: Campanha de Verão" />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                             <Form.Group className="mb-3">
                                <Form.Label>Tipo</Form.Label>
                                <Form.Select value={program.type} onChange={e => setProgram({...program, type: e.target.value})}>
                                    <option value="Tática">Campanha Tática (por volume)</option>
                                    <option value="Estratégica">Parceria Estratégica (por dados)</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    
                    {/* Campos condicionais baseados no tipo de programa */}
                    {program.type === 'Tática' ? (
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Produto Alvo</Form.Label>
                                    <Form.Select onChange={e => setProgram({...program, product: e.target.value})}>
                                        <option>Selecione...</option>
                                        {/* CORREÇÃO: Filtra produtos dinamicamente pelo 'industryName' */}
                                        {mockProducts.filter(p => p.industry === industryName).map(p => <option key={p.id}>{p.name}</option>)}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Meta (Unidades)</Form.Label>
                                    <Form.Control type="number" onChange={e => setProgram({...program, goal: e.target.value})} placeholder="Ex: 100" />
                                </Form.Group>
                            </Col>
                        </Row>
                    ) : (
                         <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Categoria de Dados</Form.Label>
                                    <Form.Control type="text" onChange={e => setProgram({...program, category: e.target.value})} placeholder="Ex: Salgados" />
                                </Form.Group>
                            </Col>
                        </Row>
                    )}

                    <Row>
                        <Col md={6}>
                           <Form.Group className="mb-3">
                                <Form.Label>Bônus / Vantagem Oferecida</Form.Label>
                                <Form.Control type="text" onChange={e => setProgram({...program, bonus: e.target.value})} placeholder="Ex: R$ 500,00 ou Desconto de 15%" />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                <Button variant="primary" onClick={handleSubmit}>Publicar Oportunidade</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateProgramModal;