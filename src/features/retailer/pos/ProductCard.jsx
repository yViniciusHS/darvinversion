// src/features/retailer/pos/ProductCard.jsx
import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { PlusLg } from 'react-bootstrap-icons';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <Card className="h-100 product-card-new">
      <Card.Img variant="top" src={product.image} />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="flex-grow-1">{product.name}</Card.Title>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Badge bg="light" text="dark" className="fs-6">R$ {product.price.toFixed(2)}</Badge>
          <small className="text-muted">{product.industry}</small>
        </div>
        <Button variant="primary" onClick={() => onAddToCart(product)}>
          <PlusLg /> Adicionar
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;