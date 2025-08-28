import React from 'react';
import { Item } from '../types/budget';
import { formatCurrency } from '../utils/formatters';

interface ItemsFormProps {
  items: Item[];
  onAddItem: () => void;
  onUpdateItem: (id: string, field: keyof Item, value: string | number) => void;
  onRemoveItem: (id: string) => void;
  total: number;
}

export const ItemsForm: React.FC<ItemsFormProps> = ({
  items,
  onAddItem,
  onUpdateItem,
  onRemoveItem,
  total
}) => {
  const handleQuantityChange = (id: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    onUpdateItem(id, 'quantity', numValue);
  };

  const handlePriceChange = (id: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    onUpdateItem(id, 'unitPrice', numValue);
  };

  return (
    <div className="form-section">
      <h3>Itens do Orçamento</h3>
      
      <div className="items-container">
        {items.length === 0 ? (
          <p className="no-items">Nenhum item adicionado. Clique em "Adicionar Item" para começar.</p>
        ) : (
          <div className="items-table">
            <div className="items-header desktop-only">
              <div className="item-description">Descrição</div>
              <div className="item-quantity">Quantidade</div>
              <div className="item-price">Valor Unitário</div>
              <div className="item-total">Total</div>
              <div className="item-actions">Ações</div>
            </div>
            
            {items.map((item) => (
              <div key={item.id} className="item-row">
                <div className="item-description">
                  <label className="mobile-label">Descrição:</label>
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => onUpdateItem(item.id, 'description', e.target.value)}
                    placeholder="Descrição do item"
                  />
                </div>
                
                <div className="item-quantity">
                  <label className="mobile-label">Quantidade:</label>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                    min="0"
                    step="0.01"
                  />
                </div>
                
                <div className="item-price">
                  <label className="mobile-label">Valor Unitário:</label>
                  <input
                    type="number"
                    value={item.unitPrice}
                    onChange={(e) => handlePriceChange(item.id, e.target.value)}
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                  />
                </div>
                
                <div className="item-total">
                  <label className="mobile-label">Total:</label>
                  <span className="total-value">{formatCurrency(item.total)}</span>
                </div>
                
                <div className="item-actions">
                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.id)}
                    className="btn-remove"
                    title="Remover item"
                  >
                    🗑️ Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="items-actions">
          <button type="button" onClick={onAddItem} className="btn-add-item">
            + Adicionar Item
          </button>
        </div>
        
        <div className="total-section">
          <div className="total-display">
            <strong>Total Geral: {formatCurrency(total)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
