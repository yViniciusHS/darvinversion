// src/pages/RetailerQuickEntryPage.js

import React, { useState } from 'react';
import { Form, Button, ListGroup, Card } from 'react-bootstrap';
// O ícone 'Bot' foi trocado por 'Robot'
import { Send, Robot, Person } from 'react-bootstrap-icons';
import { processSaleFromText } from '../services/chatbotService';
import { addSale } from '../services/retailerService';

const RetailerQuickEntryPage = () => {
    const [messages, setMessages] = useState([{ sender: 'bot', text: 'Olá! Digite sua venda em uma frase. Ex: "vendi 2 pão de queijo e 3 café expresso"' }]);
    const [inputValue, setInputValue] = useState('');

    const handleSendMessage = (text) => {
        if (!text.trim()) return; // Não envia mensagens vazias

        const userMessage = { sender: 'user', text };
        // Adiciona a mensagem do usuário e uma mensagem de "digitando..." do bot
        const newMessages = [...messages, userMessage, { sender: 'bot', text: '...', typing: true }];
        setMessages(newMessages);
        setInputValue('');

        // Simula um pequeno atraso na resposta do bot
        setTimeout(() => {
            const result = processSaleFromText(text);
            let botResponse;

            if (result.status === 'success') {
                const total = result.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                addSale(result.items, total, '3', 'Chatbot'); // Adiciona a venda
                botResponse = { 
                    sender: 'bot', 
                    text: `Venda registrada com sucesso! Total: R$ ${total.toFixed(2)}`
                };
            } else {
                botResponse = { sender: 'bot', text: result.message, options: result.options };
            }
            
            // Remove a mensagem "digitando..." e adiciona a resposta final do bot
            setMessages(prev => [...prev.slice(0, -1), botResponse]);
        }, 1000); // Atraso de 1 segundo
    };

    return (
        <div>
            <h2 className="mb-4">Lançamento Rápido (Chatbot)</h2>
            <Card>
                <Card.Body className="chat-window">
                    <ListGroup variant="flush">
                        {messages.map((msg, index) => (
                            <ListGroup.Item key={index} className={`d-flex border-0 ${msg.sender === 'bot' ? '' : 'justify-content-end'}`}>
                                {msg.sender === 'bot' ? <Robot size={24} className="me-2 text-primary flex-shrink-0" /> : null}
                                <div className={`message-bubble ${msg.sender === 'bot' ? 'bot-bubble' : 'user-bubble'}`}>
                                    {msg.typing ? <div className="typing-indicator"><span></span><span></span><span></span></div> : msg.text}
                                    {msg.options && (
                                        <div className="mt-2">
                                            {msg.options.map(opt => <Button key={opt.id} size="sm" className="me-1" onClick={() => handleSendMessage(`vendi 1 ${opt.name}`)}> {opt.name} </Button>)}
                                        </div>
                                    )}
                                </div>
                                {msg.sender === 'user' ? <Person size={24} className="ms-2 flex-shrink-0" /> : null}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card.Body>
                <Card.Footer>
                    <Form onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }}>
                        <div className="d-flex">
                            <Form.Control type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder="Digite sua venda aqui..." autoFocus />
                            <Button type="submit" className="ms-2"><Send/></Button>
                        </div>
                    </Form>
                </Card.Footer>
            </Card>
        </div>
    );
};

export default RetailerQuickEntryPage;