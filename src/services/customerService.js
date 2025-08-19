// src/services/customerService.js
import { mockCustomers } from './mockData';

const CUSTOMERS_KEY = 'darvin_customers';

// Garante que o Local Storage tenha dados iniciais
export const seedCustomers = () => {
    if (!localStorage.getItem(CUSTOMERS_KEY)) {
        localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(mockCustomers));
    }
};

export const getCustomers = () => {
    return Promise.resolve(JSON.parse(localStorage.getItem(CUSTOMERS_KEY)) || []);
};

export const addCustomer = (customerData) => {
    return getCustomers().then(customers => {
        const newCustomer = {
            ...customerData,
            id: Date.now(),
        };
        const updatedCustomers = [...customers, newCustomer];
        localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(updatedCustomers));
        return newCustomer;
    });
};