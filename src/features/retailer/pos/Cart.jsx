// src/features/retailer/pos/Cart.jsx

import React from 'react';
import { ListGroup, Button, Row, Col, Form } from 'react-bootstrap';
import { CheckLg, Trash, PersonPlusFill } from 'react-bootstrap-icons';

const Cart = ({ cartItems, onClearCart, onFinishSale, onUpdateQuantity, customers, selectedCustomer, onSelectCustomer, onAddNewCustomer }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-3 cart-summary-new">
      <h4>Caixa</h4>
      {/* SEÇÃO DO CLIENTE */}
      <div className="customer-section mb-3">
        <Form.Group>
          <Form.Label>Associar Cliente (Opcional)</Form.Label>
          <div className="d-flex">
            <Form.Select value={selectedCustomer} onChange={e => onSelectCustomer(e.target.value)}>
              <option value="3">Cliente Avulso</option>
              {customers.filter(c => c.id !== 3).map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </Form.Select>
            <Button variant="outline-secondary" className="ms-2" onClick={onAddNewCustomer}><PersonPlusFill /></Button>
          </div>
        </Form.Group>
      </div>
      <hr />

      {/* LÓGICA DE RENDERIZAÇÃO DOS ITENS RESTAURADA AQUI */}
      <ListGroup variant="flush" className="cart-items-list">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
              <div>
                {item.name} <br />
                <small className="text-muted">R$ {item.price.toFixed(2)}</small>
              </div>
              <div className="d-flex align-items-center">
                <Button variant="outline-secondary" size="sm" onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</Button>
                <span className="mx-2 fw-bold">{item.quantity}</span>
                <Button variant="outline-secondary" size="sm" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</Button>
                <strong className="ms-3" style={{width: '70px', textAlign: 'right'}}>
                    R$ {(item.price * item.quantity).toFixed(2)}
                </strong>
              </div>
            </ListGroup.Item>
          ))
        ) : (
          <p className="text-center text-muted mt-4">Seu carrinho está vazio.</p>
        )}
      </ListGroup>

      <div className="cart-footer mt-auto">
        <hr />
        <div className="d-flex justify-content-between align-items-center">
            <h5>Total:</h5>
            <h4 className="text-primary fw-bold">R$ {total.toFixed(2)}</h4>
        </div>
        <Row className="mt-3 gx-2">
          <Col>
            <Button 
              variant="success" 
              className="w-100 py-2" 
              disabled={cartItems.length === 0}
              onClick={onFinishSale}
            >
              <CheckLg size={20} className="me-2" /> Finalizar Venda
            </Button>
          </Col>
          <Col xs="auto">
            <Button 
              variant="outline-danger" 
              className="py-2"
              disabled={cartItems.length === 0}
              onClick={onClearCart}
            >
              <Trash />
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Cart;