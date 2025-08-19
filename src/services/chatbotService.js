// src/services/chatbotService.js
import { mockProducts } from './mockData';

// Simula o processamento de uma mensagem de texto para registrar uma venda
export const processSaleFromText = (text) => {
    const productsFound = [];
    const lowerText = text.toLowerCase();

    mockProducts.forEach(product => {
        const productName = product.name.toLowerCase().split(' ')[0]; // Pega a primeira palavra do nome
        if (lowerText.includes(productName)) {
            // Tenta encontrar um número antes do nome do produto
            const regex = new RegExp(`(\\d+)\\s*${productName}`);
            const match = lowerText.match(regex);
            
            if (match && match[1]) {
                productsFound.push({
                    ...product,
                    quantity: parseInt(match[1], 10),
                });
            }
        }
    });

    // Simulação de Desambiguação (exemplo simples)
    if (lowerText.includes('refri')) {
        return { 
            status: 'disambiguation',
            message: "Para 'refri', qual produto você vendeu?",
            options: mockProducts.filter(p => p.name.toLowerCase().includes('refrigerante'))
        };
    }

    if (productsFound.length > 0) {
        return { status: 'success', items: productsFound };
    }

    return { status: 'error', message: "Não consegui entender o pedido. Tente algo como 'vendi 5 pão de queijo e 2 café'." };
};