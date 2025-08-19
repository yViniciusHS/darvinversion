// src/features/retailer/pos/ProductCatalog.js

import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import ProductCard from './ProductCard';
import { CupHot, EggFried, Basket, Droplet, Cup, BoxSeam } from 'react-bootstrap-icons';

// Mapeia cada nome de categoria a um ícone
const categoryIconMap = {
    'Todos': <Basket />,
    'Bebidas': <CupHot />,
    'Salgados': <EggFried />,
    'Snacks': <Droplet />,
    'Laticínios': <Cup />
};

const ProductCatalog = ({ products, onAddToCart, searchTerm, onSearchChange, selectedCategory, onCategoryChange }) => {
  const categories = ['Todos', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product => {
    // A CORREÇÃO FOI FEITA NA LINHA ABAIXO
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Barra de Pesquisa */}
      <Row className="mb-3">
        <Col>
          <Form.Control
            type="text"
            placeholder="Pesquisar por nome do produto..."
            value={searchTerm}
            onChange={e => onSearchChange(e.target.value)}
            className="search-bar"
          />
        </Col>
      </Row>
      
      {/* NOVO DESIGN DE FILTROS DE CATEGORIA */}
      <div className="mb-4 category-filter-container">
        {categories.map(category => (
            <Button 
                key={category} 
                variant="light"
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => onCategoryChange(category)}
            >
                {categoryIconMap[category] || <BoxSeam />}
                <span className="ms-2">{category}</span>
            </Button>
        ))}
      </div>

      {/* Catálogo de Produtos */}
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Col key={product.id}>
                <ProductCard product={product} onAddToCart={onAddToCart} />
              </Col>
            ))
        ) : (
            <Col><p className="text-muted">Nenhum produto encontrado com os filtros aplicados.</p></Col>
        )}
      </Row>
    </div>
  );
};

export default ProductCatalog;