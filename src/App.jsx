import React, { useState } from 'react';
import { CompanyForm } from './components/CompanyForm';
import { ClientForm } from './components/ClientForm';
import { ItemsForm } from './components/ItemsForm';
import { useBudget } from './hooks/useBudget';
import { generatePDF } from './utils/pdfGenerator';
import './App.css';

function App() {
  const {
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
  } = useBudget();

  const [currentStep, setCurrentStep] = useState(0);
  const steps = ['Seus Dados', 'Dados do Cliente', 'Itens'];

  const handleGeneratePDF = () => {
    const budgetData = getBudgetData();
    
    // Validações básicas
    if (!budgetData.company.name || !budgetData.client.name) {
      alert('Por favor, preencha pelo menos o nome da empresa e do cliente.');
      return;
    }
    
    if (budgetData.items.length === 0) {
      alert('Por favor, adicione pelo menos um item ao orçamento.');
      return;
    }
    
    generatePDF(budgetData);
  };

  const handleSave = () => {
    const budgetData = getBudgetData();
    const dataStr = JSON.stringify(budgetData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `orcamento_${budgetData.client.name.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Gerador de Orçamento</h1>
        <div className="steps-indicator">
          {steps.map((step, index) => (
            <div
              key={step}
              className={`step ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
              onClick={() => setCurrentStep(index)}
            >
              <span className="step-number">{index + 1}</span>
              <span className="step-name">{step}</span>
            </div>
          ))}
        </div>
      </header>

      <main className="app-main">
        <div className="form-container">
          {currentStep === 0 && (
            <CompanyForm
              data={companyData}
              onChange={setCompanyData}
            />
          )}
          
          {currentStep === 1 && (
            <ClientForm
              data={clientData}
              onChange={setClientData}
            />
          )}
          
          {currentStep === 2 && (
            <ItemsForm
              items={items}
              onAddItem={addItem}
              onUpdateItem={updateItem}
              onRemoveItem={removeItem}
              total={calculateTotal()}
            />
          )}
        </div>
      </main>

      <footer className="app-footer">
        <div className="footer-actions">
          <div className="navigation-buttons">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="btn btn-secondary"
            >
              ← Anterior
            </button>
            
            {currentStep < steps.length - 1 ? (
              <button
                onClick={nextStep}
                className="btn btn-primary"
              >
                Próximo →
              </button>
            ) : (
              <div className="final-actions">
                <button
                  onClick={handleSave}
                  className="btn btn-secondary"
                >
                  Salvar
                </button>
                <button
                  onClick={handleGeneratePDF}
                  className="btn btn-success"
                >
                  Gerar PDF
                </button>
              </div>
            )}
          </div>
          
          <div className="total-display">
            <span>Total: </span>
            <strong>
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(calculateTotal())}
            </strong>
          </div>
        </div>
        
        <div className="footer-info">
          <p>© 2025 Gerador de Orçamento - {new Date().toLocaleDateString('pt-BR')}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
