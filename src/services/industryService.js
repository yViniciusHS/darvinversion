// src/services/industryService.js
import { mockInitialSales, mockRetailers } from './mockData';

export const getAggregatedSalesMetrics = (filters) => {
  return new Promise((resolve) => {
    let salesData = mockInitialSales;

    // Lógica de Filtros (sem alterações)
    if (filters.industry) {
      salesData = salesData.map(sale => ({
        ...sale,
        items: sale.items.filter(item => item.industry === filters.industry)
      })).filter(sale => sale.items.length > 0);
    }
    if (filters.retailerIds && filters.retailerIds.length > 0) {
      salesData = salesData.filter(sale => filters.retailerIds.includes(sale.retailerId));
    }
    if (filters.startDate) {
      salesData = salesData.filter(sale => new Date(sale.date) >= new Date(filters.startDate));
    }
    if (filters.endDate) {
      const endDate = new Date(filters.endDate);
      endDate.setDate(endDate.getDate() + 1);
      salesData = salesData.filter(sale => new Date(sale.date) < endDate);
    }

    // Calcular Métricas
    const metrics = {
      totalRevenue: 0,
      totalVolume: 0,
      revenueOverTime: {},
      salesByRetailer: {},
      salesByProductChannel: {}
    };

    salesData.forEach(sale => {
      const saleRetailer = mockRetailers.find(r => r.id === sale.retailerId);
      if (!saleRetailer) return;

      const saleDate = new Date(sale.date).toISOString().split('T')[0];
      if (!metrics.revenueOverTime[saleDate]) {
        metrics.revenueOverTime[saleDate] = 0;
      }
      
      sale.items.forEach(item => {
        const itemTotal = item.price * item.quantity;
        metrics.totalRevenue += itemTotal;
        metrics.totalVolume += item.quantity;
        metrics.revenueOverTime[saleDate] += itemTotal;
        
        const retailerName = saleRetailer.name;
        metrics.salesByRetailer[retailerName] = (metrics.salesByRetailer[retailerName] || 0) + itemTotal;

        const channel = saleRetailer.channel;
        if (!metrics.salesByProductChannel[item.name]) {
          metrics.salesByProductChannel[item.name] = {};
        }
        metrics.salesByProductChannel[item.name][channel] = (metrics.salesByProductChannel[item.name][channel] || 0) + item.quantity;
      });
    });

    metrics.avgPrice = metrics.totalVolume > 0 ? metrics.totalRevenue / metrics.totalVolume : 0;
    
    // Formatar dados para gráficos
    metrics.revenueOverTime = Object.entries(metrics.revenueOverTime)
      .map(([date, revenue]) => ({ date, revenue }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // --- LÓGICA ATUALIZADA AQUI ---
    
    // 1. Calcula o total de receita dos varejistas para o cálculo do percentual
    const totalRetailerRevenue = Object.values(metrics.salesByRetailer).reduce((sum, val) => sum + val, 0);

    // 2. Formata os dados para o gráfico de rosca, adicionando o percentual
    metrics.salesByRetailer = Object.entries(metrics.salesByRetailer)
        .map(([name, value]) => ({ 
            name, 
            value,
            percent: totalRetailerRevenue > 0 ? (value / totalRetailerRevenue) * 100 : 0 
        }))
        .sort((a, b) => b.value - a.value);
    
    // Formata dados para o gráfico de barras empilhadas
    metrics.salesByProductChannel = Object.entries(metrics.salesByProductChannel)
        .map(([productName, channels]) => ({ name: productName, ...channels }));
      
    resolve(metrics);
  });
};