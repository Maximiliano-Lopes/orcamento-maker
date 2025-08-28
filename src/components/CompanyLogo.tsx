import React from 'react';
import logoRefrigeracao from '../assets/logo_refrigeração.png';

export const CompanyLogo: React.FC = () => {
  return (
    <div className="company-logo">
      <img 
        src={logoRefrigeracao} 
        alt="Refrigeração Lopes" 
        className="logo-image"
        onError={(e) => {
          // Fallback em caso de erro
          e.currentTarget.style.display = 'none';
          const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
          if (nextElement) {
            nextElement.style.display = 'flex';
          }
        }}
      />
      <div className="logo-placeholder" style={{ display: 'none' }}>
        <span>Refrigeração<br/>Lopes</span>
      </div>
    </div>
  );
};
