export interface User {
  id: string;
  email: string;
  name: string;
  company_id: string;
  role: 'admin' | 'operator' | 'supplier';
  created_at: string;
}

export interface Company {
  id: string;
  name: string;
  cnpj: string;
  type: 'sacador' | 'sacado' | 'both';
  is_anchor: boolean;
  created_at: string;
}

export interface Invoice {
  id: string;
  number: string;
  series: string;
  company_id: string;
  supplier_id?: string;
  issue_date: string;
  due_date: string;
  gross_amount: number;
  net_amount: number;
  discount_amount: number;
  xml_file?: string;
  status: 'pending' | 'approved' | 'rejected' | 'processing';
  created_at: string;
}

export interface Duplicate {
  id: string;
  invoice_id: string;
  number: string;
  issue_date: string;
  due_date: string;
  amount: number;
  status: 'pending' | 'accepted' | 'refused' | 'protested' | 'paid';
  manifestation_status: 'pending' | 'auto_accepted' | 'auto_refused' | 'manual_review';
  manifestation_reason?: string;
  negotiation_status?: 'not_negotiated' | 'negotiated' | 'payment_address_changed';
  original_creditor?: {
    name: string;
    cnpj: string;
    bank_details: {
      bank: string;
      agency: string;
      account: string;
    };
  };
  new_creditor?: {
    name: string;
    cnpj: string;
    bank_details: {
      bank: string;
      agency: string;
      account: string;
    };
  };
  negotiation_date?: string;
  created_at: string;
}

export interface AutomationRule {
  id: string;
  name: string;
  type: 'escrituracao' | 'manifestacao';
  action: 'accept' | 'refuse' | 'review';
  conditions: Record<string, any>;
  is_active: boolean;
  created_at: string;
}

export interface Discount {
  id: string;
  invoice_id: string;
  supplier_id: string;
  amount: number;
  reason: string;
  status: 'pending_approval' | 'approved' | 'rejected';
  created_at: string;
}