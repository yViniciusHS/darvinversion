// src/pages/RetailerStockPage.jsx

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ButtonGroup, Button, Spinner, Row, Col, Card } from 'react-bootstrap';
import { getStockStatus, updateProduct } from '../services/stockService';
import EditProductModal from '../features/retailer/EditProductModal';
import StockTable from '../features/retailer/StockTable';
import KPICard from '../features/industry/KPICard';
import { CashStack, PiggyBank, GraphUp } from 'react-bootstrap-icons';

const RetailerStockPage = () => {
    const [allStockData, setAllStockData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingProduct, setEditingProduct] = useState(null);
    const [activeFilter, setActiveFilter] = useState('Todos');
    const [sortConfig, setSortConfig] = useState({ key: 'profitMargin', direction: 'descending' });

    const fetchData = useCallback(() => {
        setLoading(true);
        getStockStatus().then(data => {
            setAllStockData(data);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleSaveProduct = (productData) => {
        updateProduct(productData).then(fetchData); // Recarrega os dados após salvar
    };

    const filteredAndSortedData = useMemo(() => {
        let filteredData = allStockData;
        if (activeFilter !== 'Todos') {
            filteredData = allStockData.filter(p => p.status === activeFilter);
        }
        return [...filteredData].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
            if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
            return 0;
        });
    }, [allStockData, activeFilter, sortConfig]);
    
    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const kpis = useMemo(() => {
        const costValue = allStockData.reduce((sum, p) => sum + p.currentStock * p.costPrice, 0);
        const sellingValue = allStockData.reduce((sum, p) => sum + p.currentStock * p.sellingPrice, 0);
        return { costValue, sellingValue, potentialProfit: sellingValue - costValue };
    }, [allStockData]);

    if (loading) return <div className="text-center p-5"><Spinner /></div>;

    return (
        <div>
            <h2 className="mb-4">Controle de Estoque e Financeiro</h2>
            <Row className="g-4 mb-4">
                <Col><KPICard title="Valor de Custo do Estoque" value={kpis.costValue} icon={<CashStack />} format={v => `R$ ${v.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`} /></Col>
                <Col><KPICard title="Valor de Venda do Estoque" value={kpis.sellingValue} icon={<PiggyBank />} format={v => `R$ ${v.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`} /></Col>
                <Col><KPICard title="Lucro Bruto Potencial" value={kpis.potentialProfit} icon={<GraphUp />} format={v => `R$ ${v.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`} /></Col>
            </Row>

            <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <span>Produtos em Estoque</span>
                    <ButtonGroup>
                        {['Todos', 'OK', 'Baixo', 'Crítico', 'Esgotado'].map(status => (
                            <Button key={status} size="sm" variant={activeFilter === status ? 'primary' : 'outline-secondary'} onClick={() => setActiveFilter(status)}>
                                {status}
                            </Button>
                        ))}
                    </ButtonGroup>
                </Card.Header>
                <Card.Body>
                    <StockTable 
                        stockData={filteredAndSortedData}
                        onEditClick={setEditingProduct}
                        onSort={handleSort}
                        sortConfig={sortConfig}
                    />
                </Card.Body>
            </Card>
            
            <EditProductModal 
                show={!!editingProduct}
                handleClose={() => setEditingProduct(null)}
                product={editingProduct}
                onSave={fetchData}
            />
        </div>
    );
};

export default RetailerStockPage;