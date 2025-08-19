import { mockProducts, mockInitialSales } from './mockData';

const PRODUCTS_DB_KEY = 'darvin_products_db';
const STOCK_ADJUSTMENTS_KEY = 'darvin_stock_adjustments';

// Inicializa o "banco de dados" de produtos no Local Storage se não existir
export const seedProducts = () => {
    if (!localStorage.getItem(PRODUCTS_DB_KEY)) {
        localStorage.setItem(PRODUCTS_DB_KEY, JSON.stringify(mockProducts));
    }
};

const getProductsFromDB = () => JSON.parse(localStorage.getItem(PRODUCTS_DB_KEY)) || [];

// NOVA FUNÇÃO: Atualiza os detalhes de um produto
export const updateProduct = (updatedProduct) => {
    return new Promise((resolve) => {
        let products = getProductsFromDB();
        products = products.map(p => p.id === updatedProduct.id ? updatedProduct : p);
        localStorage.setItem(PRODUCTS_DB_KEY, JSON.stringify(products));
        resolve({ success: true });
    });
};

// FUNÇÃO ATUALIZADA: getStockStatus agora faz cálculos financeiros
export const getStockStatus = () => {
    return new Promise((resolve) => {
        const products = getProductsFromDB();
        const sales = mockInitialSales;
        const adjustments = JSON.parse(localStorage.getItem(STOCK_ADJUSTMENTS_KEY)) || {};
        const totalDays = 90;

        const stockData = products.map(product => {
            const totalSold = sales.flatMap(s => s.items).filter(item => item.id === product.id).reduce((sum, item) => sum + item.quantity, 0);
            const adjustment = adjustments[product.id] || 0;
            const currentStock = Math.max(0, (product.stock + adjustment) - totalSold);
            
            // Novos Cálculos Financeiros
            const profitMargin = product.sellingPrice > 0 ? ((product.sellingPrice - product.costPrice) / product.sellingPrice) * 100 : 0;
            const stockTurnover = (totalSold / ((product.stock + currentStock) / 2)).toFixed(1); // Giro de Estoque

            const salesVelocity = totalSold / totalDays;
            const daysLeft = salesVelocity > 0 ? Math.floor(currentStock / salesVelocity) : Infinity;

            let status = 'OK';
            if (currentStock <= 0) status = 'Esgotado';
            else if (currentStock <= product.minStock) status = 'Crítico';
            else if (currentStock <= product.minStock * 1.5) status = 'Baixo';

            return {
                ...product,
                currentStock,
                profitMargin,
                stockTurnover,
                daysLeft,
                status,
            };
        });

        resolve(stockData);
    });
};


// Simula a entrada de novo estoque
export const addStock = (productId, amount) => {
    return new Promise((resolve) => {
        const adjustments = JSON.parse(localStorage.getItem(STOCK_ADJUSTMENTS_KEY)) || {};
        // Soma o novo valor ao ajuste existente
        adjustments[productId] = (adjustments[productId] || 0) + parseInt(amount, 10);
        localStorage.setItem(STOCK_ADJUSTMENTS_KEY, JSON.stringify(adjustments));
        resolve({ success: true });
    });
};