// src/features/retailer/StockTable.jsx

import React from 'react';
import { Table, Badge, Button } from 'react-bootstrap';
import { PencilSquare, ArrowDownUp } from 'react-bootstrap-icons';

const statusMap = {
    'OK': { bg: 'success' },
    'Baixo': { bg: 'warning' },
    'Crítico': { bg: 'danger' },
    'Esgotado': { bg: 'dark' },
    'default': { bg: 'secondary' }
};

const SortableHeader = ({ children, onSort, sortKey, sortConfig }) => {
    const isSorted = sortConfig.key === sortKey;
    const directionIcon = isSorted ? (sortConfig.direction === 'ascending' ? ' ▲' : ' ▼') : '';
    return (
        <th onClick={() => onSort(sortKey)} style={{ cursor: 'pointer' }}>
            {children} {isSorted && <span className="sort-icon">{directionIcon}</span>}
        </th>
    );
};

const StockTable = ({ stockData, onEditClick, onSort, sortConfig }) => {
    return (
        <Table responsive hover>
            <thead>
                <tr>
                    <SortableHeader onSort={onSort} sortKey="name" sortConfig={sortConfig}>Produto</SortableHeader>
                    <th>Status</th>
                    <SortableHeader onSort={onSort} sortKey="currentStock" sortConfig={sortConfig}>Estoque Atual</SortableHeader>
                    <SortableHeader onSort={onSort} sortKey="profitMargin" sortConfig={sortConfig}>Margem Lucro</SortableHeader>
                    <SortableHeader onSort={onSort} sortKey="stockTurnover" sortConfig={sortConfig}>Giro</SortableHeader>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {stockData.map(p => {
                    const variant = (statusMap[p.status] || statusMap.default).bg;
                    return (
                        <tr key={p.id}>
                            <td>
                                <strong>{p.name}</strong><br/>
                                <small className="text-muted">Venda: R$ {p.sellingPrice.toFixed(2)} / Custo: R$ {p.costPrice.toFixed(2)}</small>
                            </td>
                            <td><Badge bg={variant}>{p.status}</Badge></td>
                            <td>{p.currentStock} un.</td>
                            <td><Badge bg="info" text="dark">{p.profitMargin.toFixed(1)}%</Badge></td>
                            <td>{p.stockTurnover}</td>
                            <td>
                                <Button variant="outline-secondary" size="sm" onClick={() => onEditClick(p)}>
                                    <PencilSquare className="me-1" /> Editar
                                </Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    );
};

export default StockTable;