// src/services/investmentService.js
import { mockInitialSales, mockRetailers } from './mockData';

const OFFERS_KEY = 'darvin_offers';

// Inicializa o Local Storage com exemplos de ofertas
const seedOffers = () => {
    if (!localStorage.getItem(OFFERS_KEY)) {
        const mockOffers = [
            { id: 1, type: 'Tática', industryName: 'Global Foods', title: 'Verão Premiado', product: 'Snack de Grão de Bico', goal: 100, bonus: 'R$ 500,00', status: 'Ativo', redeemed: false, requirements: null },
            { id: 2, type: 'Estratégica', industryName: 'Delícias de Minas', title: 'Parceria de Dados: Salgados', category: 'Salgados', bonus: 'Desconto de 15% na categoria', status: 'Ativo', redeemed: false, requirements: { channel: ['Padaria'] } },
            { id: 3, type: 'Estratégica', industryName: 'Cafés Brasil', title: 'Entendendo o Consumo de Café', category: 'Bebidas', bonus: 'Acesso a relatórios de mercado', status: 'Ativo', redeemed: false, requirements: { minSalesLast30Days: 50 } },
            { id: 4, type: 'Tática', industryName: 'Laticínios da Serra', title: 'Manhãs mais Saborosas', product: 'Iogurte Grego', goal: 120, bonus: 'R$ 200,00 em produtos', status: 'Concluído', redeemed: true, requirements: { channel: ['Padaria', 'Supermercado Pequeno'] } }
        ];
        localStorage.setItem(OFFERS_KEY, JSON.stringify(mockOffers));
    }
};

seedOffers();

// Retorna todas as ofertas públicas disponíveis
export const getOffers = () => {
    return Promise.resolve(JSON.parse(localStorage.getItem(OFFERS_KEY)) || []);
};

// Cria uma nova oferta (usado pela Indústria)
export const createOffer = (offerData) => {
    return getOffers().then(offers => {
        const newOffer = { ...offerData, id: Date.now(), redeemed: false, status: 'Ativo' };
        const updatedOffers = [...offers, newOffer];
        localStorage.setItem(OFFERS_KEY, JSON.stringify(updatedOffers));
        return newOffer;
    });
};

// FUNÇÃO RESTAURADA E CORRIGIDA
export const redeemPrize = (offerId) => {
    return getOffers().then(offers => {
        const updatedOffers = offers.map(o => {
            if (o.id === offerId) {
                // Marca como resgatado e atualiza o status
                return { ...o, redeemed: true, status: 'Concluído' };
            }
            return o;
        });
        localStorage.setItem(OFFERS_KEY, JSON.stringify(updatedOffers));
        return updatedOffers;
    });
};

// A função de Ranking de Varejistas continua relevante para a busca ativa da indústria
export const getRetailerRanking = (industryName) => {
    return new Promise((resolve) => {
        const salesByRetailer = {};

        mockInitialSales.forEach(sale => {
            const retailerId = sale.retailerId;
            if (!salesByRetailer[retailerId]) {
                salesByRetailer[retailerId] = { revenue: 0, volume: 0, salesCount: 0 };
            }
            salesByRetailer[retailerId].salesCount += 1;
            sale.items.forEach(item => {
                if (item.industry === industryName) {
                    salesByRetailer[retailerId].revenue += item.price * item.quantity;
                    salesByRetailer[retailerId].volume += item.quantity;
                }
            });
        });

        const rankedRetailers = mockRetailers.map(retailer => {
            const performance = salesByRetailer[retailer.id] || { revenue: 0, volume: 0 };
            const growthScore = (performance.salesCount || 0) * 10;
            const score = performance.revenue + (performance.volume * 5) + growthScore;

            return { ...retailer, ...performance, growthScore, score };
        }).sort((a, b) => b.score - a.score);

        resolve(rankedRetailers);
    });
};