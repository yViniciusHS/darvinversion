// src/pages/IndustryInvestmentsPage.js

import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Button, Table, Spinner } from 'react-bootstrap';
import { PlusCircle } from 'react-bootstrap-icons';

import * as investmentService from '../services/investmentService';
// A importação do 'useAuth' não é mais necessária aqui, pois não usamos o 'user'.
// import { useAuth } from '../hooks/useAuth'; 

import CreateProgramModal from '../features/industry/CreateProgramModal';
import RetailerRanking from '../features/industry/RetailerRanking';
import PartnershipProposalPanel from '../features/industry/PartnershipProposalPanel';

const IndustryInvestmentsPage = () => {
    // const { user } = useAuth(); // <-- REMOVEMOS ESTA LINHA
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedRetailer, setSelectedRetailer] = useState(null);

    // O nome da indústria é fixo para esta simulação
    const industryName = "Global Foods"; 

    useEffect(() => {
        investmentService.getPrograms().then(data => {
            setPrograms(data);
            setLoading(false);
        });
    }, []);

    const handleProgramCreate = (programData) => {
        investmentService.createProgram(programData).then(newProgram => {
            setPrograms([...programs, newProgram]);
        });
    };

    return (
        <div>
            <h2 className="mb-4">Central de Investimentos e Parcerias</h2>
            <Tabs defaultActiveKey="ranking" className="mb-3" justify>
                <Tab eventKey="ranking" title="Ranking de Oportunidades">
                    <div className="p-3">
                        <p className="text-muted">Varejistas ranqueados pela performance com seus produtos. Clique em um varejista para simular uma proposta.</p>
                        <RetailerRanking onRetailerSelect={setSelectedRetailer} industryName={industryName} />
                    </div>
                </Tab>
                <Tab eventKey="programs" title="Programas de Incentivo">
                     <div className="p-3">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <p className="text-muted mb-0">Crie e monitore campanhas de incentivo para grupos de varejistas.</p>
                            <Button onClick={() => setShowModal(true)}><PlusCircle className="me-2" /> Criar Programa</Button>
                        </div>
                         {loading ? <Spinner /> : (
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr><th>Nome</th><th>Tipo</th><th>Produto Alvo</th><th>Meta</th><th>Bônus</th><th>Status</th></tr>
                                </thead>
                                <tbody>
                                    {programs.map(p => (
                                        <tr key={p.id}>
                                            <td>{p.name}</td>
                                            <td>{p.type}</td>
                                            <td>{p.product}</td>
                                            <td>{p.goal} Un.</td>
                                            <td>{p.bonus}</td>
                                            <td><span className="badge bg-success">{p.status}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                         )}
                    </div>
                </Tab>
            </Tabs>

            <CreateProgramModal show={showModal} handleClose={() => setShowModal(false)} onProgramCreate={handleProgramCreate} />
            <PartnershipProposalPanel show={!!selectedRetailer} handleClose={() => setSelectedRetailer(null)} retailer={selectedRetailer} />
        </div>
    );
};

export default IndustryInvestmentsPage;