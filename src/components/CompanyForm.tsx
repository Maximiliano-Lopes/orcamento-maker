import React from 'react';
import { CompanyData } from '../types/budget';
import { formatCNPJ, formatPhone, formatCEP } from '../utils/formatters';

interface CompanyFormProps {
  data: CompanyData;
  onChange: (data: CompanyData) => void;
}

export const CompanyForm: React.FC<CompanyFormProps> = ({ data, onChange }) => {
  const handleInputChange = (field: keyof CompanyData, value: string) => {
    let formattedValue = value;
    
    // Apply formatting based on field type
    switch (field) {
      case 'cnpj':
        formattedValue = formatCNPJ(value);
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
      <h3>Seus Dados (Empresa)</h3>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="company-name">Nome da Empresa *</label>
          <input
            id="company-name"
            type="text"
            value={data.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Digite o nome da empresa"
            className={data.name ? 'pre-filled' : ''}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="company-cnpj">CNPJ *</label>
          <input
            id="company-cnpj"
            type="text"
            value={data.cnpj}
            onChange={(e) => handleInputChange('cnpj', e.target.value)}
            placeholder="00.000.000/0000-00"
            className={data.cnpj ? 'pre-filled' : ''}
            maxLength={18}
            required
          />
        </div>
        
        <div className="form-group full-width">
          <label htmlFor="company-address">Endereço *</label>
          <input
            id="company-address"
            type="text"
            value={data.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            placeholder="Rua, número, bairro"
            className={data.address ? 'pre-filled' : ''}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="company-city">Cidade *</label>
          <input
            id="company-city"
            type="text"
            value={data.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            placeholder="Digite a cidade"
            className={data.city ? 'pre-filled' : ''}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="company-state">Estado *</label>
          <input
            id="company-state"
            type="text"
            value={data.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
            placeholder="SP"
            className={data.state ? 'pre-filled' : ''}
            maxLength={2}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="company-zipcode">CEP *</label>
          <input
            id="company-zipcode"
            type="text"
            value={data.zipCode}
            onChange={(e) => handleInputChange('zipCode', e.target.value)}
            placeholder="00000-000"
            className={data.zipCode ? 'pre-filled' : ''}
            maxLength={9}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="company-phone">Telefone *</label>
          <input
            id="company-phone"
            type="tel"
            value={data.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="(11) 99999-9999"
            className={data.phone ? 'pre-filled' : ''}
            maxLength={15}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="company-email">Email *</label>
          <input
            id="company-email"
            type="email"
            value={data.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="empresa@email.com"
            className={data.email ? 'pre-filled' : ''}
            required
          />
        </div>
      </div>
    </div>
  );
};
