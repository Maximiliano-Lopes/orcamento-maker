import React from 'react';
import { ClientData } from '../types/budget';
import { formatCNPJ, formatCPF, formatPhone, formatCEP } from '../utils/formatters';

interface ClientFormProps {
  data: ClientData;
  onChange: (data: ClientData) => void;
}

export const ClientForm: React.FC<ClientFormProps> = ({ data, onChange }) => {
  const handleInputChange = (field: keyof ClientData, value: string) => {
    let formattedValue = value;
    
    // Apply formatting based on field type
    switch (field) {
      case 'cpfCnpj':
        // Auto-detect CPF or CNPJ based on length
        const cleaned = value.replace(/\D/g, '');
        if (cleaned.length <= 11) {
          formattedValue = formatCPF(value);
        } else {
          formattedValue = formatCNPJ(value);
        }
        break;
      case 'phone':
        formattedValue = formatPhone(value);
        break;
      case 'zipCode':
        formattedValue = formatCEP(value);
        break;
    }
    
    onChange({ ...data, [field]: formattedValue });
  };

  return (
    <div className="form-section">
      <h3>Dados do Cliente</h3>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="client-name">Nome do Cliente *</label>
          <input
            id="client-name"
            type="text"
            value={data.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Digite o nome do cliente"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="client-cpfcnpj">CPF/CNPJ *</label>
          <input
            id="client-cpfcnpj"
            type="text"
            value={data.cpfCnpj}
            onChange={(e) => handleInputChange('cpfCnpj', e.target.value)}
            placeholder="000.000.000-00 ou 00.000.000/0000-00"
            required
          />
        </div>
        
        <div className="form-group full-width">
          <label htmlFor="client-address">Endereço *</label>
          <input
            id="client-address"
            type="text"
            value={data.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            placeholder="Rua, número, bairro"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="client-city">Cidade *</label>
          <input
            id="client-city"
            type="text"
            value={data.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            placeholder="Digite a cidade"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="client-state">Estado *</label>
          <input
            id="client-state"
            type="text"
            value={data.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
            placeholder="SP"
            maxLength={2}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="client-zipcode">CEP *</label>
          <input
            id="client-zipcode"
            type="text"
            value={data.zipCode}
            onChange={(e) => handleInputChange('zipCode', e.target.value)}
            placeholder="00000-000"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="client-phone">Telefone</label>
          <input
            id="client-phone"
            type="tel"
            value={data.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="(11) 99999-9999"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="client-email">Email</label>
          <input
            id="client-email"
            type="email"
            value={data.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="cliente@email.com"
          />
        </div>
      </div>
    </div>
  );
};
