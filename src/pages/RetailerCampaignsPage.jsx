// src/pages/RetailerCampaignsPage.jsx
import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { getProgramsData, joinOffer } from '../services/retailerService'; // Funções atualizadas
import ProgramCard from '../features/retailer/ProgramCard'; // Usando o ProgramCard existente
import { redeemPrize } from '../services/investmentService';
import PrizeRedemptionModal from '../features/retailer/PrizeRedemptionModal';


const RetailerCampaignsPage = () => {
    const [data, setData] = useState({ availableOffers: [], participatingOffers: [] });
    const [loading, setLoading] = useState(true);
    const [showRedeemModal, setShowRedeemModal] = useState(false);
    const [selectedProgram, setSelectedProgram] = useState(null);


    const fetchData = () => {
        setLoading(true);
        getProgramsData().then(data => {
            setData(data);
            setLoading(false);
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleJoin = (program) => {
        joinOffer(program.id).then(() => {
            alert(`Você agora está participando da campanha "${program.name}"!`);
            fetchData();
        });
    };
    
    const handleRedeem = (program) => {
        setSelectedProgram(program);
        setShowRedeemModal(true);
    };

    const handleConfirmRedeem = () => {
        redeemPrize(selectedProgram.id).then(() => {
            setShowRedeemModal(false);
            fetchData();
        });
    };

    if (loading) return <div className="text-center p-5"><Spinner /></div>;

    return (
        <div>
            <h2 className="mb-2">DARVIN Campanhas</h2>
            <p className="text-muted mb-4">Participe de desafios propostos pelas indústrias e ganhe prêmios por sua performance.</p>
            <Tabs defaultActiveKey="available" id="campaign-tabs" className="nav-pills-custom">
                <Tab eventKey="available" title={`Disponíveis (${data.availableOffers.length})`}>
                    <div className="p-3">
                        {data.availableOffers.length > 0 ? (
                            <Row xs={1} md={2} lg={3} className="g-4">
                                {data.availableOffers.map(p => <Col key={p.id}><ProgramCard program={p} type="available" onJoinClick={handleJoin} /></Col>)}
                            </Row>
                        ) : <Alert variant="info">Não há novas campanhas disponíveis para você no momento.</Alert>}
                    </div>
                </Tab>
                <Tab eventKey="participating" title={`Minhas Campanhas (${data.participatingOffers.length})`}>
                     <div className="p-3">
                        {data.participatingOffers.length > 0 ? (
                            <Row xs={1} md={2} lg={3} className="g-4">
                                {data.participatingOffers.map(p => <Col key={p.id}><ProgramCard program={p} type="participating" onRedeemClick={handleRedeem} /></Col>)}
                            </Row>
                        ): <Alert variant="info">Você ainda não está participando de nenhuma campanha.</Alert>}
                     </div>
                </Tab>
            </Tabs>

            <PrizeRedemptionModal show={showRedeemModal} handleClose={() => setShowRedeemModal(false)} program={selectedProgram} onConfirm={handleConfirmRedeem} />
        </div>
    );
};

export default RetailerCampaignsPage;