export interface CompanyData {
  name: string;
  cnpj: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
}

export interface ClientData {
  name: string;
  cpfCnpj: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
}

export interface Item {
  id: string;
  description: string;
  detailedDescription?: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface BudgetData {
  company: CompanyData;
  client: ClientData;
  items: Item[];
  total: number;
  date: string;
  budgetNumber: string;
}
