import React, { useState } from 'react';
import { FileText, CheckCircle, XCircle, Clock, AlertTriangle, Eye, Download } from 'lucide-react';

interface ReceivableDuplicate {
  id: string;
  number: string;
  customer: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  status: 'issued' | 'accepted' | 'refused' | 'pending_manifestation' | 'protested';
  manifestationStatus: 'not_sent' | 'sent' | 'accepted' | 'refused' | 'expired';
  manifestationDate?: string;
  refusalReason?: string;
  protestDate?: string;
}

const mockReceivables: ReceivableDuplicate[] = [
  {
    id: '1',
    number: 'DUP-REC-001/2024',
    customer: 'Cliente ABC Ltda',
    issueDate: '2024-12-10',
    dueDate: '2024-12-25',
    amount: 25750.00,
    status: 'accepted',
    manifestationStatus: 'accepted',
    manifestationDate: '2024-12-12'
  },
  {
    id: '2',
    number: 'DUP-REC-002/2024',
    customer: 'Empresa XYZ S.A.',
    issueDate: '2024-12-12',
    dueDate: '2024-12-30',
    amount: 45000.00,
    status: 'pending_manifestation',
    manifestationStatus: 'sent'
  },
  {
    id: '3',
    number: 'DUP-REC-003/2024',
    customer: 'Comércio DEF Ltda',
    issueDate: '2024-12-08',
    dueDate: '2024-12-20',
    amount: 15200.00,
    status: 'refused',
    manifestationStatus: 'refused',
    manifestationDate: '2024-12-14',
    refusalReason: 'Mercadoria não recebida conforme pedido'
  },
  {
    id: '4',
    number: 'DUP-REC-004/2024',
    customer: 'Indústria GHI Ltda',
    issueDate: '2024-12-05',
    dueDate: '2024-12-18',
    amount: 8500.00,
    status: 'protested',
    manifestationStatus: 'expired',
    protestDate: '2024-12-19'
  }
];

const statusConfig = {
  issued: { icon: FileText, color: 'text-blue-600 bg-blue-50', label: 'Emitida' },
  accepted: { icon: CheckCircle, color: 'text-green-600 bg-green-50', label: 'Aceita' },
  refused: { icon: XCircle, color: 'text-red-600 bg-red-50', label: 'Recusada' },
  pending_manifestation: { icon: Clock, color: 'text-yellow-600 bg-yellow-50', label: 'Aguardando Manifestação' },
  protested: { icon: AlertTriangle, color: 'text-orange-600 bg-orange-50', label: 'Protestada' },
};

const manifestationConfig = {
  not_sent: { color: 'bg-gray-100 text-gray-700', label: 'Não Enviada' },
  sent: { color: 'bg-blue-100 text-blue-700', label: 'Enviada' },
  accepted: { color: 'bg-green-100 text-green-700', label: 'Aceita' },
  refused: { color: 'bg-red-100 text-red-700', label: 'Recusada' },
  expired: { color: 'bg-orange-100 text-orange-700', label: 'Expirada' },
};

export const AccountsReceivable: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filteredReceivables = selectedFilter === 'all' 
    ? mockReceivables 
    : mockReceivables.filter(item => item.status === selectedFilter);

  const totalAmount = mockReceivables.reduce((sum, item) => sum + item.amount, 0);
  const acceptedAmount = mockReceivables
    .filter(item => item.status === 'accepted')
    .reduce((sum, item) => sum + item.amount, 0);
  const pendingAmount = mockReceivables
    .filter(item => item.status === 'pending_manifestation')
    .reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-6" style={{ padding: '56px 40px 40px 40px' }}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Contas a Receber</h2>
          <p className="text-gray-600">Duplicatas emitidas e controle de manifestações dos clientes</p>
        </div>
        <div className="flex space-x-3">
          <button className="sap-button-secondary" style={{ height: '26px' }}>
            <Download className="w-4 h-4 mr-2 inline" />
            Exportar
          </button>
          <button className="sap-button" style={{ height: '26px' }}>
            Nova Duplicata
          </button>
        </div>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="sap-metric-tile">
          <div className="flex items-center justify-between">
            <div>
              <p className="sap-metric-label mb-1">Total Emitido</p>
              <p className="sap-metric-value">
                {totalAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
              <p className="sap-subtitle">{mockReceivables.length} duplicatas</p>
            </div>
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
        </div>

        <div className="sap-metric-tile">
          <div className="flex items-center justify-between">
            <div>
              <p className="sap-metric-label mb-1">Aceitas</p>
              <p className="sap-metric-value">
                {acceptedAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
              <p className="sap-subtitle">
                {mockReceivables.filter(item => item.status === 'accepted').length} duplicatas
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-gray-400" />
          </div>
        </div>

        <div className="sap-metric-tile">
          <div className="flex items-center justify-between">
            <div>
              <p className="sap-metric-label mb-1">Pendentes</p>
              <p className="sap-metric-value">
                {pendingAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
              <p className="sap-subtitle">
                {mockReceivables.filter(item => item.status === 'pending_manifestation').length} duplicatas
              </p>
            </div>
            <Clock className="w-8 h-8 text-gray-400" />
          </div>
        </div>

        <div className="sap-metric-tile">
          <div className="flex items-center justify-between">
            <div>
              <p className="sap-metric-label mb-1">Recusadas</p>
              <p className="sap-metric-value">
                {mockReceivables.filter(item => item.status === 'refused').length}
              </p>
              <p className="sap-subtitle">Requer ação</p>
            </div>
            <XCircle className="w-8 h-8 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex space-x-2">
        {[
          { key: 'all', label: 'Todas' },
          { key: 'pending_manifestation', label: 'Pendentes' },
          { key: 'accepted', label: 'Aceitas' },
          { key: 'refused', label: 'Recusadas' },
          { key: 'protested', label: 'Protestadas' }
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
                  Cliente
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
                  Manifestação
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data Manifestação
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredReceivables.map((duplicate) => {
                const statusInfo = statusConfig[duplicate.status];
                const manifestationInfo = manifestationConfig[duplicate.manifestationStatus];
                const StatusIcon = statusInfo.icon;
                
                return (
                  <tr key={duplicate.id}>
                    <td className="px-6 py-1 whitespace-nowrap">
                      <div className="flex items-center">
                        <StatusIcon className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {duplicate.number}
                          </div>
                          <div className="text-xs text-gray-500">
                            Emitida em {new Date(duplicate.issueDate).toLocaleDateString('pt-BR')}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{duplicate.customer}</div>
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
                      {new Date(duplicate.dueDate) < new Date() && duplicate.status !== 'accepted' && (
                        <div className="text-xs text-red-600 font-medium">Vencida</div>
                      )}
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${manifestationInfo.color}`}>
                        {manifestationInfo.label}
                      </span>
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {duplicate.manifestationDate 
                          ? new Date(duplicate.manifestationDate).toLocaleDateString('pt-BR')
                          : '-'
                        }
                      </div>
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">
                        <Eye className="w-4 h-4" />
                      </button>
                      {duplicate.status === 'refused' && (
                        <button className="text-orange-600 hover:text-orange-900" style={{ height: '26px' }}>
                          Protestar
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detalhes de Recusa */}
      {filteredReceivables.some(item => item.refusalReason) && (
        <div className="sap-card" style={{ borderColor: '#ef4444', backgroundColor: '#fef2f2' }}>
          <h3 className="text-lg font-semibold text-red-900 mb-4">Duplicatas Recusadas - Motivos</h3>
          <div className="space-y-3">
            {filteredReceivables
              .filter(item => item.refusalReason)
              .map(item => (
                <div key={item.id} className="sap-card" style={{ borderColor: '#ef4444' }}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">{item.number} - {item.customer}</p>
                      <p className="text-sm text-red-700 mt-1">{item.refusalReason}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {item.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </p>
                      <p className="text-xs text-gray-500">
                        Recusada em {item.manifestationDate && new Date(item.manifestationDate).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};