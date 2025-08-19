// src/features/retailer/SalesHistoryTable.js

import React from 'react';
import { Table, Accordion, Badge, Button } from 'react-bootstrap';
import { ChevronDown } from 'react-bootstrap-icons';

const SalesHistoryTable = ({ sales }) => {
    // Função para formatar a data e hora de forma amigável
    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString('pt-BR') + ' às ' + date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    };

    // Usamos o Accordion para controlar as seções expansíveis. 
    // `alwaysOpen` permite que várias vendas sejam expandidas ao mesmo tempo.
    return (
        <Accordion alwaysOpen>
            <Table striped bordered hover responsive>
                <thead className="table-light">
                    <tr>
                        <th>ID da Venda</th>
                        <th>Data e Hora</th>
                        <th>Nº de Itens</th>
                        <th>Valor Total</th>
                        <th className="text-center">Detalhes</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map((sale, index) => (
                        // Usamos React.Fragment para agrupar as duas linhas de cada venda
                        <React.Fragment key={sale.id}>
                            <tr>
                                <td>{sale.id}</td>
                                <td>{formatDate(sale.date)}</td>
                                <td>{sale.items.length}</td>
                                <td><strong className="text-success">R$ {sale.total.toFixed(2)}</strong></td>
                                <td className="text-center">
                                    {/* Este é o botão que aciona a expansão */}
                                    <Accordion.Button as={Button} variant="outline-secondary" size="sm" eventKey={index.toString()}>
                                        <ChevronDown className="me-1" /> Ver Itens
                                    </Accordion.Button>
                                </td>
                            </tr>
                            {/* Esta linha contém o conteúdo que será expandido/recolhido */}
                            <tr>
                                <td colSpan="5" className="p-0 border-0">
                                    <Accordion.Collapse eventKey={index.toString()}>
                                        <div className="p-3 bg-light">
                                            <h6>Itens da Venda #{sale.id}</h6>
                                            <ul>
                                                {sale.items.map((item, itemIndex) => (
                                                    <li key={`${sale.id}-${itemIndex}`}>
                                                        {item.quantity}x {item.name} - <Badge pill bg="dark" text="light">Subtotal: R$ {(item.price * item.quantity).toFixed(2)}</Badge>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </Accordion.Collapse>
                                </td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </Table>
        </Accordion>
    );
};

export default SalesHistoryTable;