// src/pages/RetailerConnectPage.jsx
import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { getOffers } from '../services/investmentService'; // Usando o serviço atualizado
import OfferCard from '../features/retailer/OfferCard';

const RetailerConnectPage = () => {
    const [offers, setOffers] = useState([]);
    const [myPartnerships, setMyPartnerships] = useState([]); // Simulação
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getOffers().then(data => {
            setOffers(data);
            // Simulação de parcerias já ativas
            setMyPartnerships([
                { id: 99, industryName: 'Delícias de Minas', status: 'Ativo', dataShared: "Categoria 'Salgados'" }
            ]);
            setLoading(false);
        });
    }, []);
    
    const handleApply = (offer) => {
        alert(`Sua candidatura para "${offer.title}" foi enviada para ${offer.industryName}!`);
    };

    if (loading) return <Spinner />;

    return (
        <div>
            <h2 className="mb-2">DARVIN Conecta</h2>
            <p className="text-muted mb-4">O seu marketplace de oportunidades para crescer em parceria com as indústrias.</p>
            <Tabs defaultActiveKey="opportunities" className="nav-pills-custom">
                <Tab eventKey="opportunities" title={`Oportunidades (${offers.length})`}>
                    <div className="p-3">
                        <Row xs={1} md={2} lg={3} className="g-4">
                            {offers.map(offer => <Col key={offer.id}><OfferCard offer={offer} onApply={handleApply}/></Col>)}
                        </Row>
                    </div>
                </Tab>
                <Tab eventKey="partnerships" title={`Minhas Parcerias (${myPartnerships.length})`}>
                     <div className="p-3">
                        {/* Aqui entraria a lista de parcerias ativas */}
                        <Alert variant="info">Em breve: um painel para gerenciar seus contratos de parceria ativos e acompanhar seus resultados.</Alert>
                     </div>
                </Tab>
            </Tabs>
        </div>
    );
};

export default RetailerConnectPage;