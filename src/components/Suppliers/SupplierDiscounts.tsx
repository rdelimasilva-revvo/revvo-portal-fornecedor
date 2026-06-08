import React from 'react';
import { CheckCircle, XCircle, Clock, DollarSign, FileText } from 'lucide-react';

interface PendingDiscount {
  id: string;
  invoiceNumber: string;
  duplicataNumber: string;
  originalAmount: number;
  discountAmount: number;
  reason: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

const mockDiscounts: PendingDiscount[] = [
  {
    id: '1',
    invoiceNumber: 'NF-001234',
    duplicataNumber: 'DUP-001/2024',
    originalAmount: 15750.00,
    discountAmount: 1500.00,
    reason: 'Mercadoria avariada - 10% do lote conforme acordo comercial',
    date: '2024-12-15',
    status: 'pending'
  },
  {
    id: '2',
    invoiceNumber: 'NF-001235',
    duplicataNumber: 'DUP-002/2024',
    originalAmount: 8200.00,
    discountAmount: 410.00,
    reason: 'Atraso na entrega - desconto de 5% conforme contrato',
    date: '2024-12-14',
    status: 'pending'
  },
  {
    id: '3',
    invoiceNumber: 'NF-001230',
    duplicataNumber: 'DUP-003/2024',
    originalAmount: 12000.00,
    discountAmount: 600.00,
    reason: 'Produto fora da especificação - acordo comercial',
    date: '2024-12-10',
    status: 'approved'
  },
];

export const SupplierDiscounts: React.FC = () => {
  const handleDiscountAction = (discountId: string, action: 'approve' | 'reject') => {
    console.log(`${action} discount ${discountId}`);
    // Lógica para aprovar/rejeitar abatimento
  };

  const pendingDiscounts = mockDiscounts.filter(d => d.status === 'pending');
  const totalPendingAmount = pendingDiscounts.reduce((sum, d) => sum + d.discountAmount, 0);

  return (
    <div className="space-y-6" style={{ padding: '56px 40px 40px 40px' }}>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Acordos Comerciais</h2>
        <p className="text-gray-600">Revise e aprove os abatimentos solicitados em suas notas fiscais</p>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="sap-metric-tile">
          <div className="flex items-center justify-between">
            <div>
              <p className="sap-metric-label mb-1">Aguardando Aprovação</p>
              <p className="sap-metric-value">{pendingDiscounts.length}</p>
              <p className="sap-subtitle">
                {totalPendingAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
            </div>
            <Clock className="w-8 h-8 text-gray-400" />
          </div>
        </div>

        <div className="sap-metric-tile">
          <div className="flex items-center justify-between">
            <div>
              <p className="sap-metric-label mb-1">Aprovados Este Mês</p>
              <p className="sap-metric-value">
                {mockDiscounts.filter(d => d.status === 'approved').length}
              </p>
              <p className="sap-subtitle">
                {mockDiscounts
                  .filter(d => d.status === 'approved')
                  .reduce((sum, d) => sum + d.discountAmount, 0)
                  .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-gray-400" />
          </div>
        </div>

        <div className="sap-metric-tile">
          <div className="flex items-center justify-between">
            <div>
              <p className="sap-metric-label mb-1">Total Processado</p>
              <p className="sap-metric-value">{mockDiscounts.length}</p>
              <p className="sap-subtitle">Abatimentos</p>
            </div>
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Abatimentos Pendentes */}
      {pendingDiscounts.length > 0 && (
        <div className="sap-card">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Abatimentos Pendentes de Aprovação</h3>
            <p className="text-sm text-gray-600 mt-1">Revise os detalhes e aprove ou rejeite cada abatimento</p>
          </div>

          <div className="divide-y divide-gray-200">
            {pendingDiscounts.map((discount) => (
              <div key={discount.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">{discount.invoiceNumber}</p>
                        <p className="text-sm text-gray-500">
                          Duplicata: {discount.duplicataNumber} • {new Date(discount.date).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Valor Original</p>
                        <p className="font-medium text-gray-900">
                          {discount.originalAmount.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Abatimento Solicitado</p>
                        <p className="font-medium text-red-600">
                          -{discount.discountAmount.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Valor Final</p>
                        <p className="font-medium text-green-600">
                          {(discount.originalAmount - discount.discountAmount).toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Justificativa:</span> {discount.reason}
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-2 ml-6">
                    <button 
                      onClick={() => handleDiscountAction(discount.id, 'reject')}
                      className="flex items-center px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      style={{ height: '26px' }}
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Rejeitar
                    </button>
                    <button 
                      onClick={() => handleDiscountAction(discount.id, 'approve')}
                      className="flex items-center px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      style={{ height: '26px' }}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Aprovar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Histórico de Abatimentos */}
      <div className="sap-table">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Histórico de Abatimentos</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nota Fiscal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duplicata
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor Abatimento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Motivo
                </th>
              </tr>
            </thead>
            <tbody>
              {mockDiscounts.map((discount) => (
                <tr key={discount.id}>
                  <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-900">
                    {new Date(discount.date).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-900">
                    {discount.invoiceNumber}
                  </td>
                  <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-900">
                    {discount.duplicataNumber}
                  </td>
                  <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-red-600">
                    -{discount.discountAmount.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </td>
                  <td className="px-6 py-1 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      discount.status === 'approved' ? 'bg-green-100 text-green-700' :
                      discount.status === 'rejected' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {discount.status === 'approved' ? 'Aprovado' :
                       discount.status === 'rejected' ? 'Rejeitado' : 'Pendente'}
                    </span>
                  </td>
                  <td className="px-6 py-1 text-sm text-gray-600 max-w-xs truncate">
                    {discount.reason}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};