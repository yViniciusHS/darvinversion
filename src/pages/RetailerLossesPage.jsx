// src/pages/RetailerLossesPage.js
import React, { useState, useEffect, useCallback } from 'react';
import { Card, Form, Button, Row, Col, Table, Spinner } from 'react-bootstrap';
import { getProducts } from '../services/retailerService';
import { addLoss, getLossHistory } from '../services/lossesService';

const RetailerLossesPage = () => {
    const [products, setProducts] = useState([]);
    const [losses, setLosses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newLoss, setNewLoss] = useState({ productId: '', quantity: 1, reason: 'Vencimento' });

    const fetchData = useCallback(() => {
        setLoading(true);
        Promise.all([ getProducts(), getLossHistory() ]).then(([productsData, lossesData]) => {
            setProducts(productsData);
            setLosses(lossesData);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleInputChange = (e) => {
        setNewLoss({ ...newLoss, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const product = products.find(p => p.id.toString() === newLoss.productId);
        if (product) {
            addLoss({ ...newLoss, productName: product.name }).then(fetchData);
        }
    };

    return (
        <div>
            <h2 className="mb-4">Controle de Perdas</h2>
            <Card className="mb-4">
                <Card.Header>Registrar Nova Perda</Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Row className="g-3 align-items-end">
                            <Col md={5}><Form.Group><Form.Label>Produto</Form.Label><Form.Select name="productId" value={newLoss.productId} onChange={handleInputChange} required><option>Selecione...</option>{products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</Form.Select></Form.Group></Col>
                            <Col md={2}><Form.Group><Form.Label>Quantidade</Form.Label><Form.Control type="number" name="quantity" value={newLoss.quantity} onChange={handleInputChange} min="1" required /></Form.Group></Col>
                            <Col md={3}><Form.Group><Form.Label>Motivo</Form.Label><Form.Select name="reason" value={newLoss.reason} onChange={handleInputChange}><option>Vencimento</option><option>Avaria</option><option>Perda</option></Form.Select></Form.Group></Col>
                            <Col md={2}><Button type="submit" className="w-100">Registrar</Button></Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>

            <h4>Histórico de Perdas</h4>
            {loading ? <Spinner /> : (
                <Table striped bordered hover responsive>
                    <thead><tr><th>Data</th><th>Produto</th><th>Qtd.</th><th>Motivo</th></tr></thead>
                    <tbody>
                        {losses.map(loss => (
                            <tr key={loss.id}>
                                <td>{new Date(loss.date).toLocaleDateString()}</td>
                                <td>{loss.productName}</td>
                                <td>{loss.quantity}</td>
                                <td>{loss.reason}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default RetailerLossesPage;