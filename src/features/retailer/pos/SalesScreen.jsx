// src/features/retailer/pos/SalesScreen.js

import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import ProductCatalog from './ProductCatalog';
import Cart from './Cart';
import AddCustomerModal from './AddCustomerModal';
import PaymentModal from './PaymentModal';
import SaleCompleteModal from './SaleCompleteModal';

import * as retailerService from '../../../services/retailerService';
import * as customerService from '../../../services/customerService';

const SalesScreen = () => {
  // Estados dos dados
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('3');
  const [lastSale, setLastSale] = useState(null);

  // Estados de UI
  const [saleStatus, setSaleStatus] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSaleCompleteModal, setShowSaleCompleteModal] = useState(false);

  // --- Linhas de Diagnóstico ---
  console.log('%c[SalesScreen] Renderizou. Itens no carrinho:', 'color: orange', cartItems);

  const fetchCustomers = useCallback(() => {
    customerService.getCustomers().then(setCustomers);
  }, []);

  useEffect(() => {
    retailerService.getProducts().then(setProducts);
    fetchCustomers();
  }, [fetchCustomers]);

  // Função de manipulação do carrinho
  const handleAddToCart = (product) => {
    // --- Linhas de Diagnóstico ---
    console.log('%c[AÇÃO] handleAddToCart foi chamada com o produto:', 'color: green; font-weight: bold;', product);
    
    setSaleStatus(null);
    setCartItems((prevItems) => {
      // --- Linhas de Diagnóstico ---
      console.log('[handleAddToCart] Estado anterior do carrinho (prevItems):', prevItems);

      const itemExists = prevItems.find((item) => item.id === product.id);
      let newCartItems;

      if (itemExists) {
        newCartItems = prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        newCartItems = [...prevItems, { ...product, quantity: 1 }];
      }
      
      // --- Linhas de Diagnóstico ---
      console.log('[handleAddToCart] Novo estado do carrinho a ser definido:', newCartItems);
      return newCartItems;
    });
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handleClearCart = () => setCartItems([]);

  const handleOpenPaymentModal = () => {
      if(cartItems.length > 0) setShowPaymentModal(true);
  };
  
  const handleConfirmPayment = (paymentMethod) => {
      const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      retailerService.addSale(cartItems, total, selectedCustomer, paymentMethod).then((newSale) => {
          setSaleStatus('success');
          setLastSale(newSale);
          setCartItems([]);
          setShowPaymentModal(false);
          setShowSaleCompleteModal(true);
      }).catch(() => setSaleStatus('error'));
  };
  
  const handleCustomerAdd = (customerData) => {
      customerService.addCustomer(customerData).then(newCustomer => {
          fetchCustomers();
          setSelectedCustomer(newCustomer.id.toString());
      });
  };

  return (
    <div>
      {saleStatus === 'success' && <Alert variant="success">Venda finalizada com sucesso!</Alert>}
      {saleStatus === 'error' && <Alert variant="danger">Erro ao finalizar a venda.</Alert>}
      
      <Row>
        <Col md={8} lg={7}>
          <ProductCatalog 
            products={products} onAddToCart={handleAddToCart}
            searchTerm={searchTerm} onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory}
          />
        </Col>
        <Col md={4} lg={5}>
          <Cart 
            cartItems={cartItems} onClearCart={handleClearCart} onUpdateQuantity={handleUpdateQuantity}
            onFinishSale={handleOpenPaymentModal}
            customers={customers} selectedCustomer={selectedCustomer} onSelectCustomer={setSelectedCustomer}
            onAddNewCustomer={() => setShowAddCustomerModal(true)}
          />
        </Col>
      </Row>

      <AddCustomerModal show={showAddCustomerModal} handleClose={() => setShowAddCustomerModal(false)} onCustomerAdd={handleCustomerAdd} />
      <PaymentModal show={showPaymentModal} handleClose={() => setShowPaymentModal(false)} total={cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)} onConfirmPayment={handleConfirmPayment} />
      <SaleCompleteModal show={showSaleCompleteModal} handleClose={() => setShowSaleCompleteModal(false)} lastSale={lastSale} />
    </div>
  );
};

export default SalesScreen;