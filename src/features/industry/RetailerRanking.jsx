// src/features/industry/RetailerRanking.js
import React, { useState, useEffect } from 'react';
import { Table, Spinner, Badge } from 'react-bootstrap';
import { getRetailerRanking } from '../../services/investmentService';

const RetailerRanking = ({ onRetailerSelect, industryName }) => {
    const [ranking, setRanking] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getRetailerRanking(industryName).then(data => {
            setRanking(data);
            setLoading(false);
        });
    }, [industryName]);

    if (loading) return <Spinner />;

    return (
        <Table hover responsive>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Varejista</th>
                    <th>Canal</th>
                    <th>Receita (Seus Produtos)</th>
                    <th>Volume (Seus Produtos)</th>
                    <th>Crescimento (Simulado)</th>
                </tr>
            </thead>
            <tbody>
                {ranking.map((r, index) => (
                    <tr key={r.id} onClick={() => onRetailerSelect(r)} style={{ cursor: 'pointer' }}>
                        <td>{index + 1}</td>
                        <td>{r.name}</td>
                        <td><Badge bg="secondary">{r.channel}</Badge></td>
                        <td>R$ {r.revenue.toFixed(2)}</td>
                        <td>{r.volume} Un.</td>
                        <td>{r.growthScore}%</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default RetailerRanking;