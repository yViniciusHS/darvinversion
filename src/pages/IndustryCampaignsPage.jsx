// src/pages/IndustryCampaignsPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Button, Table, Spinner, Badge } from 'react-bootstrap';
import { PlusCircle } from 'react-bootstrap-icons';

import * as investmentService from '../services/investmentService';
import { useAuth } from '../hooks/useAuth'; 

import CreateProgramModal from '../features/industry/CreateProgramModal';

const IndustryCampaignsPage = () => {
    const { user } = useAuth();
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    
    const industryName = user?.name.includes('Global Foods') ? "Global Foods" : "Outra Indústria";

    const fetchCampaigns = useCallback(() => {
        setLoading(true);
        investmentService.getOffers().then(data => {
            setCampaigns(data.filter(c => c.industryName === industryName));
            setLoading(false);
        });
    }, [industryName]);

    useEffect(() => {
        fetchCampaigns();
    }, [fetchCampaigns]);

    const handleCampaignCreate = (campaignData) => {
        investmentService.createOffer({ ...campaignData, industryName }).then(() => {
            fetchCampaigns(); // Recarrega os dados para incluir a nova campanha
        });
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>DARVIN Campanhas</h2>
                <Button onClick={() => setShowModal(true)}>
                    <PlusCircle className="me-2" /> Criar Campanha
                </Button>
            </div>
            <p className="text-muted">Crie e monitore campanhas de incentivo de vendas para os varejistas.</p>
            
            {loading ? <div className="text-center p-5"><Spinner/></div> : (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr><th>Título</th><th>Tipo</th><th>Objetivo</th><th>Bônus</th><th>Status</th></tr>
                    </thead>
                    <tbody>
                        {campaigns.map(c => (
                            <tr key={c.id}>
                                <td>{c.title}</td>
                                <td><Badge bg={c.type === 'Tática' ? 'primary' : 'success'}>{c.type}</Badge></td>
                                <td>{c.type === 'Tática' ? `${c.goal} un. de ${c.product}` : `Dados de '${c.category}'`}</td>
                                <td>{c.bonus}</td>
                                <td><Badge bg={c.status === 'Ativo' ? 'success' : 'secondary'}>{c.status}</Badge></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            <CreateProgramModal 
                show={showModal} 
                handleClose={() => setShowModal(false)} 
                onProgramCreate={handleCampaignCreate} 
                industryName={industryName} 
            />
        </div>
    );
};

export default IndustryCampaignsPage;