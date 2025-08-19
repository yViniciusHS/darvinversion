// src/features/industry/PartnershipProposalPanel.js
import React from 'react';
import { Offcanvas, Button, Form, Stack } from 'react-bootstrap';
import KPICard from './KPICard';
import { Building, CashStack, ChatDots } from 'react-bootstrap-icons';

const PartnershipProposalPanel = ({ show, handleClose, retailer }) => {
    if (!retailer) return null;

    return (
        <Offcanvas show={show} onHide={handleClose} placement="end" style={{width: '500px'}}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Oportunidade de Parceria</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <h4>{retailer.name}</h4>
                <p className="text-muted">{retailer.channel}</p>
                <hr/>
                <h5>Performance com seus Produtos</h5>
                 <Stack gap={3} className="my-4">
                    <KPICard title="Receita Gerada" value={retailer.revenue} icon={<CashStack />} format={v => `R$ ${v.toFixed(2)}`} />
                    <KPICard title="Volume Total" value={retailer.volume} icon={<Building />} format={v => `${v} Unidades`} />
                </Stack>
                <hr/>
                <h5>Simular Proposta de Investimento</h5>
                <Form>
                     <Form.Group className="mb-3">
                        <Form.Label>Tipo de Investimento</Form.Label>
                        <Form.Select>
                            <option>Verba de Marketing Cooperado</option>
                            <option>Positivação de Material no PDV</option>
                            <option>Treinamento de Equipe</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Mensagem</Form.Label>
                        <Form.Control as="textarea" rows={4} placeholder={`Prezado(a) ${retailer.name}, gostaríamos de propor uma parceria...`} />
                    </Form.Group>
                    <Button variant="success"><ChatDots className="me-2" /> Enviar Proposta (Simulação)</Button>
                </Form>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default PartnershipProposalPanel;