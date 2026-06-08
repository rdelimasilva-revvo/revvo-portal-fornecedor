import React from 'react';
import { CheckCircle, XCircle, Clock, DollarSign, FileText } from 'lucide-react';

interface PendingDiscount {
  id: string;
  invoiceNumber: string;
  originalAmount: number;
  discountAmount: number;
  reason: string;
  date: string;
}

const mockDiscounts: PendingDiscount[] = [
  {
    id: '1',
    invoiceNumber: 'NF-001234',
    originalAmount: 15750.00,
    discountAmount: 1500.00,
    reason: 'Mercadoria avariada - 10% do lote',
    date: '2024-12-15'
  },
  {
    id: '2',
    invoiceNumber: 'NF-001235',
    originalAmount: 8200.00,
    discountAmount: 410.00,
    reason: 'Atraso na entrega - acordo comercial',
    date: '2024-12-14'
  },
];

export const SupplierPortal: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Portal do Fornecedor</h2>
        <p className="text-gray-600">Aprovação de abatimentos e acompanhamento de duplicatas</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-800 mb-1">Aguardando Aprovação</p>
              <p className="text-2xl font-bold text-yellow-900">{mockDiscounts.length}</p>
              <p className="text-sm text-yellow-700">Abatimentos pendentes</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-800 mb-1">Aprovados Este Mês</p>
              <p className="text-2xl font-bold text-green-900">23</p>
              <p className="text-sm text-green-700">R$ 45.200,00</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-800 mb-1">Duplicatas Ativas</p>
              <p className="text-2xl font-bold text-blue-900">156</p>
              <p className="text-sm text-blue-700">Em carteira</p>
            </div>
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Abatimentos Pendentes de Aprovação</h3>
          <p className="text-sm text-gray-600 mt-1">Revise e aprove os abatimentos solicitados</p>
        </div>

        <div className="divide-y divide-gray-200">
          {mockDiscounts.map((discount) => (
            <div key={discount.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <FileText className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">{discount.invoiceNumber}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(discount.date).toLocaleDateString('pt-BR')}
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
                      <p className="text-sm text-gray-500">Abatimento</p>
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

                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Motivo do abatimento:</span> {discount.reason}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-2 ml-6">
                  <button className="flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    <XCircle className="w-4 h-4 mr-1" />
                    Rejeitar
                  </button>
                  <button className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Aprovar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Histórico de Transações</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="text-left">
              <tr className="border-b border-gray-200">
                <th className="pb-3 text-sm font-medium text-gray-500">Data</th>
                <th className="pb-3 text-sm font-medium text-gray-500">Nota Fiscal</th>
                <th className="pb-3 text-sm font-medium text-gray-500">Tipo</th>
                <th className="pb-3 text-sm font-medium text-gray-500">Valor</th>
                <th className="pb-3 text-sm font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { date: '15/12/2024', invoice: 'NF-001230', type: 'Abatimento aprovado', amount: -850, status: 'Concluído' },
                { date: '14/12/2024', invoice: 'NF-001229', type: 'Duplicata aceita', amount: 12400, status: 'Ativa' },
                { date: '13/12/2024', invoice: 'NF-001228', type: 'Abatimento rejeitado', amount: 0, status: 'Rejeitado' },
              ].map((transaction, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-3 text-sm text-gray-900">{transaction.date}</td>
                  <td className="py-3 text-sm text-gray-900">{transaction.invoice}</td>
                  <td className="py-3 text-sm text-gray-600">{transaction.type}</td>
                  <td className={`py-3 text-sm font-medium ${
                    transaction.amount > 0 ? 'text-green-600' : transaction.amount < 0 ? 'text-red-600' : 'text-gray-900'
                  }`}>
                    {transaction.amount !== 0 && (transaction.amount > 0 ? '+' : '')}
                    {transaction.amount !== 0 ? transaction.amount.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }) : '-'}
                  </td>
                  <td className="py-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      transaction.status === 'Concluído' ? 'bg-green-100 text-green-700' :
                      transaction.status === 'Ativa' ? 'bg-blue-100 text-blue-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {transaction.status}
                    </span>
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