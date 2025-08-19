// src/features/retailer/PrizeRedemptionModal.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { CheckCircleFill } from 'react-bootstrap-icons';

const PrizeRedemptionModal = ({ show, handleClose, program, onConfirm }) => {
    if (!program) return null;

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Body className="text-center p-4">
                <CheckCircleFill color="green" size={50} className="mb-3" />
                <h3>Parabéns!</h3>
                <p className="lead">Você concluiu o desafio <strong>"{program.name}"</strong>.</p>
                <div className="p-3 bg-light rounded mb-3">
                    <p className="mb-1">Sua recompensa:</p>
                    <h4 className="text-success">{program.bonus}</h4>
                </div>
                <p>A indústria <strong>{program.industryName}</strong> será notificada. Entraremos em contato em breve para combinar a entrega do seu prêmio.</p>
                <Button variant="primary" onClick={onConfirm} className="w-100">
                    Entendido!
                </Button>
            </Modal.Body>
        </Modal>
    );
};

export default PrizeRedemptionModal;