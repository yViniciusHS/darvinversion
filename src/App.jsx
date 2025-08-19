// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute.jsx';
import DashboardLayout from './components/layout/DashboardLayout.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RetailerDashboardPage from './pages/RetailerDashboardPage.jsx';
import RetailerStockPage from './pages/RetailerStockPage.jsx';
import RetailerHistoryPage from './pages/RetailerHistoryPage.jsx';
import RetailerQuickEntryPage from './pages/RetailerQuickEntryPage.jsx';
import RetailerLossesPage from './pages/RetailerLossesPage.jsx';
import IndustryDashboardPage from './pages/IndustryDashboardPage.jsx';
import { useAuth } from './hooks/useAuth.js';

// Módulos principais
import RetailerCampaignsPage from './pages/RetailerCampaignsPage.jsx';
import IndustryCampaignsPage from './pages/IndustryCampaignsPage.jsx';

// NOVAS PÁGINAS 'CONECTA'
import RetailerConnectPage from './pages/RetailerConnectPage.jsx';
import IndustryConnectPage from './pages/IndustryConnectPage.jsx';


import './assets/styles/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<DefaultDashboardElement />} />
            {/* Rotas Varejista */}
            <Route path="/retailer/dashboard" element={<RetailerDashboardPage />} />
            <Route path="/retailer/quick-entry" element={<RetailerQuickEntryPage />} />
            <Route path="/retailer/stock" element={<RetailerStockPage />} />
            <Route path="/retailer/history" element={<RetailerHistoryPage />} />
            <Route path="/retailer/losses" element={<RetailerLossesPage />} />
            <Route path="/retailer/campaigns" element={<RetailerCampaignsPage />} />
            <Route path="/retailer/connect" element={<RetailerConnectPage />} />

            {/* Rotas Indústria */}
            <Route path="/industry/dashboard" element={<IndustryDashboardPage />} />
            <Route path="/industry/campaigns" element={<IndustryCampaignsPage />} />
            <Route path="/industry/connect" element={<IndustryConnectPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

const DefaultDashboardElement = () => {
    const { user } = useAuth();
    if (user?.role === 'retailer') return <Navigate to="/retailer/dashboard" replace />;
    if (user?.role === 'industry') return <Navigate to="/industry/dashboard" replace />;
    return <Navigate to="/login" replace />;
};

export default App;