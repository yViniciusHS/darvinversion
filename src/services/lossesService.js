// src/services/lossesService.js
const LOSSES_KEY = 'darvin_losses';

// Salva um novo registro de perda
export const addLoss = (lossData) => {
    return new Promise((resolve) => {
        const allLosses = JSON.parse(localStorage.getItem(LOSSES_KEY)) || [];
        const newLoss = {
            ...lossData,
            id: Date.now(),
            date: new Date().toISOString()
        };
        const updatedLosses = [newLoss, ...allLosses];
        localStorage.setItem(LOSSES_KEY, JSON.stringify(updatedLosses));
        resolve(newLoss);
    });
};

// Retorna o histórico de perdas
export const getLossHistory = () => {
    return Promise.resolve(JSON.parse(localStorage.getItem(LOSSES_KEY)) || []);
};