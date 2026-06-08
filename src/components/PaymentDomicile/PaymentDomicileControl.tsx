import React, { useState } from 'react';
import { Building, ArrowRight, AlertTriangle, Eye, Download, Filter, Calendar, CreditCard } from 'lucide-react';

interface NegotiatedDuplicate {
  id: string;
  duplicataNumber: string;
  invoiceNumber: string;
  supplier: string;
  supplierCnpj: string;
  amount: number;
  dueDate: string;
  negotiationDate: string;
  originalCreditor: {
    name: string;
    cnpj: string;
    bankDetails: {
      bank: string;
      agency: string;
      account: string;
    };
  };
  newCreditor: {
    name: string;
    cnpj: string;
    bankDetails: {
      bank: string;
      agency: string;
      account: string;
    };
  };
  status: 'active' | 'paid' | 'overdue';
  paymentStatus: 'pending' | 'processed' | 'confirmed';
}

const mockNegotiatedDuplicates: NegotiatedDuplicate[] = [
  {
    id: '1',
    duplicataNumber: 'DUP-003/2024',
    invoiceNumber: 'NF-001236',
    supplier: 'Fornecedor ABC Ltda',
    supplierCnpj: '12.345.678/0001-90',
    amount: 32500.00,
    dueDate: '2024-12-28',
    negotiationDate: '2024-12-14',
    originalCreditor: {
      name: 'Fornecedor ABC Ltda',
      cnpj: '12.345.678/0001-90',
      bankDetails: {
        bank: 'Banco do Brasil',
        agency: '1234-5',
        account: '12345-6'
      }
    },
    newCreditor: {
      name: 'Factoring XYZ S.A.',
      cnpj: '98.765.432/0001-10',
      bankDetails: {
        bank: 'Itaú Unibanco',
        agency: '9876-5',
        account: '98765-4'
      }
    },
    status: 'active',
    paymentStatus: 'pending'
  },
  {
    id: '2',
    duplicataNumber: 'DUP-007/2024',
    invoiceNumber: 'NF-001240',
    supplier: 'Indústria DEF S.A.',
    supplierCnpj: '98.765.432/0001-11',
    amount: 18750.00,
    dueDate: '2024-12-30',
    negotiationDate: '2024-12-13',
    originalCreditor: {
      name: 'Indústria DEF S.A.',
      cnpj: '98.765.432/0001-11',
      bankDetails: {
        bank: 'Santander',
        agency: '5678-9',
        account: '56789-0'
      }
    },
    newCreditor: {
      name: 'Banco de Fomento LTDA',
      cnpj: '11.222.333/0001-44',
      bankDetails: {
        bank: 'Bradesco',
        agency: '1111-2',
        account: '11111-3'
      }
    },
    status: 'active',
    paymentStatus: 'processed'
  },
  {
    id: '3',
    duplicataNumber: 'DUP-012/2024',
    invoiceNumber: 'NF-001245',
    supplier: 'Comércio GHI Ltda',
    supplierCnpj: '55.666.777/0001-88',
    amount: 12300.00,
    dueDate: '2024-12-20',
    negotiationDate: '2024-12-10',
    originalCreditor: {
      name: 'Comércio GHI Ltda',
      cnpj: '55.666.777/0001-88',
      bankDetails: {
        bank: 'Caixa Econômica',
        agency: '9999-8',
        account: '99999-7'
      }
    },
    newCreditor: {
      name: 'Fundo de Investimento ABC',
      cnpj: '77.888.999/0001-00',
      bankDetails: {
        bank: 'Banco Inter',
        agency: '0001-0',
        account: '00001-1'
      }
    },
    status: 'paid',
    paymentStatus: 'confirmed'
  }
];

const statusConfig = {
  active: { color: 'bg-green-100 text-green-700', label: 'Ativa' },
  paid: { color: 'bg-gray-100 text-gray-700', label: 'Paga' },
  overdue: { color: 'bg-red-100 text-red-700', label: 'Vencida' },
};

const paymentStatusConfig = {
  pending: { color: 'bg-yellow-100 text-yellow-700', label: 'Pendente' },
  processed: { color: 'bg-blue-100 text-blue-700', label: 'Processado' },
  confirmed: { color: 'bg-green-100 text-green-700', label: 'Confirmado' },
};

export const PaymentDomicileControl: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedDuplicate, setSelectedDuplicate] = useState<string | null>(null);

  const filteredDuplicates = selectedFilter === 'all' 
    ? mockNegotiatedDuplicates 
    : mockNegotiatedDuplicates.filter(item => item.status === selectedFilter);

  const totalAmount = mockNegotiatedDuplicates.reduce((sum, item) => sum + item.amount, 0);
  const activeCount = mockNegotiatedDuplicates.filter(item => item.status === 'active').length;
  const paidCount = mockNegotiatedDuplicates.filter(item => item.status === 'paid').length;

  return (
    <div className="space-y-6" style={{ padding: '56px 40px 40px 40px' }}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Controle de Domicílio Bancário</h2>
          <p className="text-gray-600">Duplicatas negociadas com alteração de domicílio de pagamento</p>
        </div>
        <div className="flex space-x-3">
          <button className="sap-button-secondary" style={{ height: '26px' }}>
            <Filter className="w-4 h-4 mr-2 inline" />
            Filtros
          </button>
          <button className="sap-button-secondary" style={{ height: '26px' }}>
            <Download className="w-4 h-4 mr-2 inline" />
            Exportar
          </button>
        </div>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="sap-metric-tile">
          <div className="flex items-center justify-between">
            <div>
              <p className="sap-metric-label mb-1">Total Negociadas</p>
              <p className="sap-metric-value">{mockNegotiatedDuplicates.length}</p>
              <p className="sap-subtitle">
                {totalAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
            </div>
            <Building className="w-8 h-8 text-gray-400" />
          </div>
        </div>

        <div className="sap-metric-tile">
          <div className="flex items-center justify-between">
            <div>
              <p className="sap-metric-label mb-1">Ativas</p>
              <p className="sap-metric-value">{activeCount}</p>
              <p className="sap-subtitle">A pagar</p>
            </div>
            <CreditCard className="w-8 h-8 text-gray-400" />
          </div>
        </div>

        <div className="sap-metric-tile">
          <div className="flex items-center justify-between">
            <div>
              <p className="sap-metric-label mb-1">Pagas</p>
              <p className="sap-metric-value">{paidCount}</p>
              <p className="sap-subtitle">Finalizadas</p>
            </div>
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
        </div>

        <div className="sap-metric-tile">
          <div className="flex items-center justify-between">
            <div>
              <p className="sap-metric-label mb-1">Credores Únicos</p>
              <p className="sap-metric-value">
                {new Set(mockNegotiatedDuplicates.map(d => d.newCreditor.cnpj)).size}
              </p>
              <p className="sap-subtitle">Novos credores</p>
            </div>
            <ArrowRight className="w-8 h-8 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex space-x-2">
        {[
          { key: 'all', label: 'Todas' },
          { key: 'active', label: 'Ativas' },
          { key: 'paid', label: 'Pagas' },
          { key: 'overdue', label: 'Vencidas' }
        ].map(filter => (
          <button
            key={filter.key}
            onClick={() => setSelectedFilter(filter.key)}
            className={`px-4 rounded-lg text-sm transition-colors ${
              selectedFilter === filter.key
                ? 'bg-white text-blue-700 font-semibold'
                : 'text-blue-600 hover:bg-gray-50 font-medium'
            }`}
            style={{ height: '26px' }}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Tabela */}
      <div className="sap-table">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duplicata
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fornecedor Original
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vencimento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pagamento
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredDuplicates.map((duplicate) => {
                const statusInfo = statusConfig[duplicate.status];
                const paymentInfo = paymentStatusConfig[duplicate.paymentStatus];
                
                return (
                  <tr key={duplicate.id}>
                    <td className="px-6 py-1 whitespace-nowrap">
                      <div className="flex items-center">
                        <Building className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {duplicate.duplicataNumber}
                          </div>
                          <div className="text-xs text-gray-500">
                            NF: {duplicate.invoiceNumber}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{duplicate.supplier}</div>
                      <div className="text-xs text-gray-500">{duplicate.supplierCnpj}</div>
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {duplicate.amount.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(duplicate.dueDate).toLocaleDateString('pt-BR')}
                      </div>
                      <div className="text-xs text-gray-500">
                        Negociada em {new Date(duplicate.negotiationDate).toLocaleDateString('pt-BR')}
                      </div>
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusInfo.color}`}>
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${paymentInfo.color}`}>
                        {paymentInfo.label}
                      </span>
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => setSelectedDuplicate(duplicate.id)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detalhamento das Alterações de Domicílio */}
      <div className="sap-card">
        <div className="border-b border-gray-200 pb-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Alterações de Domicílio Bancário</h3>
          <p className="text-sm text-gray-600">Comparativo entre credores originais e novos credores</p>
        </div>

        <div className="space-y-6">
          {filteredDuplicates.map((duplicate) => (
            <div key={duplicate.id} className="sap-card">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-semibold text-gray-900">{duplicate.duplicataNumber}</h4>
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700">
                      {duplicate.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{duplicate.supplier}</p>
                </div>
                <span className="inline-flex px-2 py-1 text-xs font-medium rounded bg-blue-50 text-blue-700">
                  Negociada em {new Date(duplicate.negotiationDate).toLocaleDateString('pt-BR')}
                </span>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
                {/* Credor Original */}
                <div className="bg-gray-50 border border-gray-200 rounded p-4">
                  <h5 className="font-medium text-gray-900 mb-3 flex items-center">
                    <Building className="w-4 h-4 mr-2 text-gray-500" />
                    Credor Original
                  </h5>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Empresa</p>
                      <p className="font-semibold text-gray-900">{duplicate.originalCreditor.name}</p>
                      <p className="text-sm text-gray-500">CNPJ: {duplicate.originalCreditor.cnpj}</p>
                    </div>
                    <div className="border-t border-gray-200 pt-2">
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Dados Bancários</p>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{duplicate.originalCreditor.bankDetails.bank}</p>
                        <div className="flex space-x-4 text-sm text-gray-500">
                          <span>Ag: {duplicate.originalCreditor.bankDetails.agency}</span>
                          <span>CC: {duplicate.originalCreditor.bankDetails.account}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Novo Credor */}
                <div className="bg-blue-50 border border-blue-200 rounded p-4">
                  <h5 className="font-medium text-blue-900 mb-3 flex items-center">
                    <CreditCard className="w-4 h-4 mr-2 text-blue-600" />
                    Novo Credor
                  </h5>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-blue-600 font-medium uppercase tracking-wide">Empresa</p>
                      <p className="font-semibold text-blue-900">{duplicate.newCreditor.name}</p>
                      <p className="text-sm text-gray-500">CNPJ: {duplicate.newCreditor.cnpj}</p>
                    </div>
                    <div className="border-t border-blue-200 pt-2">
                      <p className="text-xs text-blue-600 font-medium uppercase tracking-wide mb-1">Dados Bancários</p>
                      <div>
                        <p className="text-sm font-semibold text-blue-900">{duplicate.newCreditor.bankDetails.bank}</p>
                        <div className="flex space-x-4 text-sm text-gray-500">
                          <span>Ag: {duplicate.newCreditor.bankDetails.agency}</span>
                          <span>CC: {duplicate.newCreditor.bankDetails.account}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Status da Duplicata */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Status:</span>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusConfig[duplicate.status].color}`}>
                        {statusConfig[duplicate.status].label}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Pagamento:</span>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${paymentStatusConfig[duplicate.paymentStatus].color}`}>
                        {paymentStatusConfig[duplicate.paymentStatus].label}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Vencimento:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {new Date(duplicate.dueDate).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                  <button 
                    className="sap-button flex items-center"
                    style={{ height: '26px' }}
                    onClick={() => console.log(`Aprovando alteração de domicílio para ${duplicate.duplicataNumber}`)}
                  >
                    
                    Aprovar Alteração
                  </button>
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alerta de Atenção */}
      <div className="sap-card" style={{ borderColor: '#fbbf24', backgroundColor: '#fefce8' }}>
        <div className="flex items-start">
          <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">Atenção - Alteração de Domicílio</h3>
            <p className="text-yellow-800 mb-2">
              As duplicatas listadas acima foram negociadas pelos fornecedores e tiveram alteração no domicílio bancário.
            </p>
            <ul className="text-yellow-800 text-sm list-disc list-inside space-y-1">
              <li>Verifique sempre os novos dados bancários antes do pagamento</li>
              <li>Confirme a legitimidade da negociação com o fornecedor original</li>
              <li>Mantenha registro de todas as alterações para auditoria</li>
              <li>Atualize seus sistemas de pagamento com os novos dados</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};