// src/services/retailerService.js

import { mockProducts, mockInitialSales } from './mockData';
import { addStock } from './stockService';
import { getOffers } from './investmentService';

const PRODUCTS_KEY = 'darvin_products';
const SALES_KEY = 'darvin_sales';
const PARTICIPATIONS_KEY = 'darvin_participations';
const LOSSES_KEY = 'darvin_losses';

export const seedLocalStorage = () => {
    if (!localStorage.getItem(PRODUCTS_KEY)) {
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(mockProducts));
    }
    if (!localStorage.getItem(SALES_KEY)) {
        localStorage.setItem(SALES_KEY, JSON.stringify(mockInitialSales));
    }
};

export const getProducts = () => {
    return Promise.resolve(JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || []);
};

export const addSale = (cartItems, total, customerId, paymentMethod) => {
  return new Promise((resolve) => {
    const allSales = JSON.parse(localStorage.getItem(SALES_KEY)) || [];
    const currentUser = JSON.parse(localStorage.getItem('darvin_user'));
    
    const newSale = {
      id: Date.now(),
      retailerName: currentUser ? currentUser.name : 'Varejista Desconhecido',
      retailerId: currentUser ? (currentUser.name.includes('Padaria') ? 1 : currentUser.name.includes('Mercado') ? 2 : 3) : 0,
      date: new Date().toISOString(),
      items: cartItems.map(item => ({...item})),
      total,
      customerId,
      paymentMethod,
    };

    const updatedSales = [newSale, ...allSales];
    localStorage.setItem(SALES_KEY, JSON.stringify(updatedSales));
    
    cartItems.forEach(item => {
        addStock(item.id, -item.quantity); 
    });

    resolve(newSale);
  });
};

// FUNÇÃO RESTAURADA
export const getDailySummary = () => {
  return new Promise((resolve) => {
    const allSales = JSON.parse(localStorage.getItem(SALES_KEY)) || [];
    const today = new Date("2025-08-17T00:00:00.000Z");
    const todayStr = today.toISOString().split('T')[0];
    const todaySales = allSales.filter(sale => sale.date.startsWith(todayStr));

    const summary = {
      totalRevenue: 0,
      totalSalesCount: todaySales.length,
      topProducts: {},
    };

    todaySales.forEach(sale => {
      summary.totalRevenue += sale.total;
      sale.items.forEach(item => {
        if (!summary.topProducts[item.name]) summary.topProducts[item.name] = 0;
        summary.topProducts[item.name] += item.quantity;
      });
    });

    summary.averageTicket = summary.totalSalesCount > 0 ? summary.totalRevenue / summary.totalSalesCount : 0;
    summary.topProducts = Object.entries(summary.topProducts)
      .map(([name, quantity]) => ({ name, quantity }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);
    resolve(summary);
  });
};

// FUNÇÃO RESTAURADA
export const getSalesHistory = (filters) => {
    return new Promise((resolve) => {
        let sales = JSON.parse(localStorage.getItem(SALES_KEY)) || [];
        if (filters?.startDate) sales = sales.filter(sale => new Date(sale.date) >= new Date(filters.startDate));
        if (filters?.endDate) {
            const endDate = new Date(filters.endDate);
            endDate.setDate(endDate.getDate() + 1);
            sales = sales.filter(sale => new Date(sale.date) < endDate);
        }
        sales.sort((a, b) => new Date(b.date) - new Date(a.date));
        resolve(sales);
    });
};

export const joinOffer = (offerId) => {
    return new Promise((resolve) => {
        const participations = JSON.parse(localStorage.getItem(PARTICIPATIONS_KEY)) || [];
        if (!participations.includes(offerId)) {
            participations.push(offerId);
            localStorage.setItem(PARTICIPATIONS_KEY, JSON.stringify(participations));
        }
        resolve(participations);
    });
};

// FUNÇÃO RESTAURADA
export const getProgramsData = () => {
    return new Promise(async (resolve) => {
        const allOffers = await getOffers();
        const allSales = JSON.parse(localStorage.getItem(SALES_KEY)) || [];
        const participations = JSON.parse(localStorage.getItem(PARTICIPATIONS_KEY)) || [];

        const retailerData = {
            channel: 'Padaria',
            salesLast30Days: allSales.filter(s => new Date(s.date) > new Date("2025-07-18T00:00:00.000Z")).length
        };

        const participatingOffers = [];
        const availableOffers = [];

        allOffers.forEach(offer => {
            if (participations.includes(offer.id)) {
                let currentProgress = 0;
                if (offer.type === 'Tática') {
                    allSales.forEach(sale => sale.items.forEach(item => {
                        if (item.name === offer.product) currentProgress += item.quantity;
                    }));
                }
                const isCompleted = offer.goal ? currentProgress >= offer.goal : false;
                participatingOffers.push({
                    ...offer,
                    currentProgress,
                    status: isCompleted ? 'Concluído' : 'Em Andamento',
                    progressPercentage: offer.goal ? Math.min((currentProgress / offer.goal) * 100, 100) : 0
                });
            } else {
                let meetsRequirements = true;
                if (offer.requirements?.channel && !offer.requirements.channel.includes(retailerData.channel)) meetsRequirements = false;
                if (offer.requirements?.minSalesLast30Days > retailerData.salesLast30Days) meetsRequirements = false;
                if (meetsRequirements) availableOffers.push(offer);
            }
        });
        resolve({ availableOffers, participatingOffers });
    });
};

// FUNÇÃO RESTAURADA
export const generateRetailerInsights = () => {
    return new Promise((resolve) => {
        const sales = JSON.parse(localStorage.getItem(SALES_KEY)) || [];
        const products = JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || [];
        const losses = JSON.parse(localStorage.getItem(LOSSES_KEY)) || [];
        let insights = [];

        if (sales.length < 5) {
            resolve({ insights: [], insightCounts: {} });
            return;
        }

        // Exemplo: Alerta de Estoque
        const last7Days = new Date("2025-08-18T00:00:00.000Z");
        last7Days.setDate(last7Days.getDate() - 7);
        const recentSalesItems = sales.filter(s => new Date(s.date) > last7Days).flatMap(s => s.items);
        const topSeller = recentSalesItems.reduce((acc, item) => {
            acc[item.name] = (acc[item.name] || 0) + item.quantity;
            return acc;
        }, {});
        const topSellerName = Object.keys(topSeller).reduce((a, b) => topSeller[a] > topSeller[b] ? a : b, null);
        if (topSellerName) {
            insights.push({
                id: 3, type: 'stock', category: 'Alertas', title: 'Alerta de Estoque',
                text: `'${topSellerName}' é seu produto mais vendido na última semana. Verifique os níveis de estoque!`,
                critical: true
            });
        }
        
        // Exemplo: Produto com Maior Perda
        if (losses.length > 0) {
            const lossesByProduct = losses.reduce((acc, loss) => {
                acc[loss.productName] = (acc[loss.productName] || 0) + parseInt(loss.quantity, 10);
                return acc;
            }, {});
            const topLossProduct = Object.keys(lossesByProduct).reduce((a, b) => lossesByProduct[a] > lossesByProduct[b] ? a : b);
            if(lossesByProduct[topLossProduct] > 5) {
                insights.push({
                    id: 11, type: 'loss_leader', category: 'Alertas', title: 'Atenção às Perdas',
                    text: `O produto '${topLossProduct}' representa a maior parte de suas perdas. Considere ajustar a compra.`,
                    critical: true
                });
            }
        }
        
        const insightCounts = insights.reduce((acc, insight) => {
            if (insight.category === 'Alertas') acc.alerts = (acc.alerts || 0) + 1;
            else if (insight.category === 'Oportunidades de Venda') acc.opportunities = (acc.opportunities || 0) + 1;
            else if (insight.category === 'Tendências') acc.trends = (acc.trends || 0) + 1;
            return acc;
        }, { alerts: 0, opportunities: 0, trends: 0 });

        resolve({ insights, insightCounts });
    });
};