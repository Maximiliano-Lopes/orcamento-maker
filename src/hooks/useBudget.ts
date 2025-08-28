import { useState, useCallback } from 'react';
import { BudgetData, CompanyData, ClientData, Item } from '../types/budget';
import { formatCNPJ, formatPhone, formatCEP } from '../utils/formatters';

const initialCompanyData: CompanyData = {
  name: 'Refrigeração Lopes',
  cnpj: formatCNPJ('14664715000153'),
  address: 'Av. Bento Gonçalves, 5970 - Partenon',
  city: 'Porto Alegre',
  state: 'RS',
  zipCode: formatCEP('90650001'),
  phone: formatPhone('51998349409'),
  email: 'matusamarcelo@gmail.com'
};

const initialClientData: ClientData = {
  name: '',
  cpfCnpj: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  phone: '',
  email: ''
};

export const useBudget = () => {
  const [companyData, setCompanyData] = useState<CompanyData>(initialCompanyData);
  const [clientData, setClientData] = useState<ClientData>(initialClientData);
  const [items, setItems] = useState<Item[]>([]);

  const addItem = useCallback(() => {
    const newItem: Item = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      unitPrice: 0,
      total: 0
    };
    setItems(prev => [...prev, newItem]);
  }, []);

  const updateItem = useCallback((id: string, field: keyof Item, value: string | number) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'quantity' || field === 'unitPrice') {
          updatedItem.total = updatedItem.quantity * updatedItem.unitPrice;
        }
        return updatedItem;
      }
      return item;
    }));
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const calculateTotal = useCallback(() => {
    return items.reduce((sum, item) => sum + item.total, 0);
  }, [items]);

  const getBudgetData = useCallback((): BudgetData => {
    const today = new Date();
    const dateString = today.toLocaleDateString('pt-BR');
    const budgetNumber = `ORC-${today.getFullYear()}${(today.getMonth() + 1).toString().padStart(2, '0')}${today.getDate().toString().padStart(2, '0')}-${Date.now().toString().slice(-4)}`;

    return {
      company: companyData,
      client: clientData,
      items,
      total: calculateTotal(),
      date: dateString,
      budgetNumber
    };
  }, [companyData, clientData, items, calculateTotal]);

  return {
    companyData,
    setCompanyData,
    clientData,
    setClientData,
    items,
    addItem,
    updateItem,
    removeItem,
    calculateTotal,
    getBudgetData
  };
};
