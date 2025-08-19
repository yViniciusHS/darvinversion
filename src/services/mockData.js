// src/services/mockData.js

// Múltiplos Varejistas para análise de canal
export const mockRetailers = [
  { id: 1, name: 'Padaria Pão Quente', channel: 'Padaria', city: 'Guaxupé' },
  { id: 2, name: 'Mercado Central', channel: 'Supermercado Pequeno', city: 'Muzambinho' },
  { id: 3, name: 'Loja Conveniência 24h', channel: 'Conveniência', city: 'Guaxupé' },
];

// CORREÇÃO: Todos os produtos agora têm costPrice e sellingPrice.
// A propriedade 'price' foi removida para garantir consistência.
export const mockProducts = [
  // Delícias de Minas
  { id: 2, name: 'Pão de Queijo', costPrice: 1.50, sellingPrice: 3.50, category: 'Salgados', industry: 'Delícias de Minas', stock: 800, minStock: 50, image: 'https://i.imgur.com/83_placeholder.png' },
  { id: 4, name: 'Misto Quente', costPrice: 4.00, sellingPrice: 8.00, category: 'Salgados', industry: 'Delícias de Minas', stock: 400, minStock: 30, image: 'https://i.imgur.com/83_placeholder.png' },
  // Cafés Brasil
  { id: 1, name: 'Café Expresso', costPrice: 2.00, sellingPrice: 5.00, category: 'Bebidas', industry: 'Cafés Brasil', stock: 1000, minStock: 100, image: 'https://i.imgur.com/83_placeholder.png' },
  // Global Foods
  { id: 9, name: 'Snack de Grão de Bico', costPrice: 5.50, sellingPrice: 9.50, category: 'Snacks', industry: 'Global Foods', stock: 600, minStock: 40, image: 'https://i.imgur.com/83_placeholder.png' },
];

export const mockCustomers = [
    { id: 1, name: 'João da Silva', cpf: '111.222.333-44', email: 'joao.silva@email.com' },
    { id: 2, name: 'Maria Oliveira', cpf: '555.666.777-88', email: 'maria.o@email.com' },
    { id: 3, name: 'Cliente Avulso', cpf: '000.000.000-00', email: '' },
];


// Função para gerar dados de vendas realistas para os últimos 3 meses
const generateSalesData = () => {
  const sales = [];
  const today = new Date(); // Usa a data atual
  for (let i = 90; i >= 0; i--) { // 90 dias de dados
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const salesPerDay = Math.floor(Math.random() * 15) + 5;
    for (let j = 0; j < salesPerDay; j++) {
      const retailer = mockRetailers[Math.floor(Math.random() * mockRetailers.length)];
      const numItems = Math.floor(Math.random() * 4) + 1;
      const items = [];
      let total = 0;

      for (let k = 0; k < numItems; k++) {
        const product = mockProducts[Math.floor(Math.random() * mockProducts.length)];
        const quantity = Math.floor(Math.random() * 3) + 1;
        
        // CORREÇÃO: Usando a propriedade correta 'sellingPrice'
        items.push({ ...product, price: product.sellingPrice, quantity });
        total += product.sellingPrice * quantity;
      }
      
      sales.push({
        id: date.getTime() + j,
        retailerId: retailer.id,
        retailerName: retailer.name,
        date: date.toISOString(),
        items,
        total,
      });
    }
  }
  return sales;
};

export const mockInitialSales = generateSalesData();