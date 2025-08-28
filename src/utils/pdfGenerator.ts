import jsPDF from 'jspdf';
import { BudgetData } from '../types/budget';
import logoRefrigeracao from '../assets/logo_refrigeração.png';

// Função auxiliar para converter imagem para base64
const getImageBase64 = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      } else {
        reject(new Error('Could not get canvas context'));
      }
    };
    img.onerror = reject;
    img.src = url;
  });
};

export const generatePDF = async (budgetData: BudgetData) => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.width;
  let yPosition = 40;

  try {
    // Converter logo para base64 e adicionar ao PDF centralizado
    const logoBase64 = await getImageBase64(logoRefrigeracao);
    
    // Calcular dimensões mantendo proporção (assumindo logo original ~200x100px)
    const maxWidth = 60;
    const maxHeight = 30;
    const aspectRatio = 2; // largura/altura aproximada do logo
    
    let logoWidth = maxWidth;
    let logoHeight = maxWidth / aspectRatio;
    
    if (logoHeight > maxHeight) {
      logoHeight = maxHeight;
      logoWidth = maxHeight * aspectRatio;
    }
    
    // Centralizar horizontalmente
    const logoX = (pageWidth - logoWidth) / 2;
    const logoY = 10;
    
    pdf.addImage(logoBase64, 'PNG', logoX, logoY, logoWidth, logoHeight);
  } catch (error) {
    console.warn('Erro ao adicionar logo ao PDF:', error);
    // Fallback: texto da empresa centralizado
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.text('REFRIGERAÇÃO LOPES', pageWidth / 2, 25, { align: 'center' });
  }
  
  // Title
  yPosition += 5;
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text('ORÇAMENTO', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 15;
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Número: ${budgetData.budgetNumber}`, 20, yPosition);
  pdf.text(`Data: ${budgetData.date}`, pageWidth - 60, yPosition);
  
  yPosition += 20;

  // Company Data (Enhanced)
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(102, 126, 234);
  pdf.text('DADOS DA EMPRESA', 20, yPosition);
  yPosition += 10;

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(0, 0, 0);
  pdf.text(`${budgetData.company.name}`, 20, yPosition);
  yPosition += 5;
  
  pdf.setFont('helvetica', 'normal');
  pdf.text(`CNPJ: ${budgetData.company.cnpj}`, 20, yPosition);
  yPosition += 5;
  pdf.text(`${budgetData.company.address}`, 20, yPosition);
  yPosition += 5;
  pdf.text(`${budgetData.company.city} - ${budgetData.company.state} - CEP: ${budgetData.company.zipCode}`, 20, yPosition);
  yPosition += 5;
  pdf.text(`Tel: ${budgetData.company.phone} - Email: ${budgetData.company.email}`, 20, yPosition);
  
  yPosition += 20;

  // Client Data
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(102, 126, 234);
  pdf.text('DADOS DO CLIENTE', 20, yPosition);
  yPosition += 10;

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(0, 0, 0);
  pdf.text(`${budgetData.client.name}`, 20, yPosition);
  yPosition += 5;
  
  pdf.setFont('helvetica', 'normal');
  pdf.text(`CPF/CNPJ: ${budgetData.client.cpfCnpj}`, 20, yPosition);
  yPosition += 5;
  pdf.text(`${budgetData.client.address}`, 20, yPosition);
  yPosition += 5;
  pdf.text(`${budgetData.client.city} - ${budgetData.client.state} - CEP: ${budgetData.client.zipCode}`, 20, yPosition);
  yPosition += 5;
  if (budgetData.client.phone) {
    pdf.text(`Tel: ${budgetData.client.phone}`, 20, yPosition);
    if (budgetData.client.email) {
      pdf.text(` - Email: ${budgetData.client.email}`, 60, yPosition);
    }
  } else if (budgetData.client.email) {
    pdf.text(`Email: ${budgetData.client.email}`, 20, yPosition);
  }
  
  yPosition += 20;

  // Items Header
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(102, 126, 234);
  pdf.text('ITENS DO ORÇAMENTO', 20, yPosition);
  yPosition += 10;

  // Table Header with background
  pdf.setFillColor(240, 240, 240);
  pdf.rect(20, yPosition - 5, pageWidth - 40, 12, 'F');
  
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(0, 0, 0);
  pdf.text('Descrição', 25, yPosition + 3);
  pdf.text('Qtd', 120, yPosition + 3);
  pdf.text('Valor Unit.', 140, yPosition + 3);
  pdf.text('Total', 170, yPosition + 3);
  
  yPosition += 15;

  // Items
  pdf.setFont('helvetica', 'normal');
  budgetData.items.forEach((item, index) => {
    if (yPosition > 250) {
      pdf.addPage();
      yPosition = 20;
    }
    
    // Alternate row background
    if (index % 2 === 0) {
      pdf.setFillColor(250, 250, 250);
      pdf.rect(20, yPosition - 3, pageWidth - 40, 10, 'F');
    }
    
    pdf.text(item.description, 25, yPosition + 2);
    pdf.text(item.quantity.toString(), 120, yPosition + 2);
    pdf.text(`R$ ${item.unitPrice.toFixed(2)}`, 140, yPosition + 2);
    pdf.text(`R$ ${item.total.toFixed(2)}`, 170, yPosition + 2);
    yPosition += 10;
  });

  // Total
  yPosition += 10;
  pdf.setDrawColor(102, 126, 234);
  pdf.setLineWidth(1);
  pdf.line(120, yPosition, pageWidth - 20, yPosition);
  yPosition += 8;
  
  pdf.setFillColor(102, 126, 234);
  pdf.rect(120, yPosition - 5, pageWidth - 140, 12, 'F');
  
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(255, 255, 255);
  pdf.text(`TOTAL GERAL: R$ ${budgetData.total.toFixed(2)}`, 125, yPosition + 3);

  // Footer
  yPosition += 25;
  pdf.setFontSize(8);
  pdf.setTextColor(100, 100, 100);
  pdf.setFont('helvetica', 'italic');
  pdf.text('Este orçamento tem validade de 30 dias a partir da data de emissão.', pageWidth / 2, yPosition, { align: 'center' });

  // Generate filename
  const clientName = budgetData.client.name.replace(/[^a-zA-Z0-9]/g, '_');
  const today = new Date();
  const dateString = `${today.getDate().toString().padStart(2, '0')}_${(today.getMonth() + 1).toString().padStart(2, '0')}_${today.getFullYear()}`;
  const filename = `${clientName}_${dateString}.pdf`;

  // Save PDF
  pdf.save(filename);
};
