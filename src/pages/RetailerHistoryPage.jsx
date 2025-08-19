// src/pages/RetailerHistoryPage.js

import React, { useState, useEffect, useCallback } from 'react';
import { Form, Button, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { getSalesHistory } from '../services/retailerService';
import SalesHistoryTable from '../features/retailer/SalesHistoryTable';

const RetailerHistoryPage = () => {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({});

    const fetchHistory = useCallback(() => {
        setLoading(true);
        getSalesHistory(filters).then(data => {
            setSales(data);
            setLoading(false);
        });
    }, [filters]);

    useEffect(() => {
        fetchHistory();
    }, [fetchHistory]);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };
    
    const handleFilterSubmit = (e) => {
        e.preventDefault();
        fetchHistory();
    };

    return (
        <div>
            <h2 className="mb-4">Histórico de Vendas</h2>
            <Card className="mb-4">
                <Card.Body>
                    <Form onSubmit={handleFilterSubmit}>
                        <Row className="align-items-end g-3">
                            <Col md>
                                <Form.Group>
                                    <Form.Label>De:</Form.Label>
                                    <Form.Control type="date" name="startDate" onChange={handleFilterChange} />
                                </Form.Group>
                            </Col>
                             <Col md>
                                <Form.Group>
                                    <Form.Label>Até:</Form.Label>
                                    <Form.Control type="date" name="endDate" onChange={handleFilterChange} />
                                </Form.Group>
                            </Col>
                            <Col md="auto">
                                <Button type="submit">Filtrar</Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
            
            {loading ? <div className="text-center p-5"><Spinner /></div> : 
             sales.length > 0 ? <SalesHistoryTable sales={sales} /> : 
             <Alert variant="info">Nenhuma venda encontrada para o período selecionado.</Alert>
            }
        </div>
    );
};

export default RetailerHistoryPage;