import React, { useState } from 'react';
import {
  Zap,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  TrendingUp,
  Eye,
  Download,
  FileText,
  Building,
  Calendar,
  Percent,
} from 'lucide-react';

type AntecipacaoStatus = 'em_analise' | 'aprovada' | 'liquidada' | 'recusada';

interface AntecipacaoDuplicata {
  id: string;
  number: string;
  invoiceNumber: string;
  dueDate: string;
  amount: number;
}

interface Antecipacao {
  id: string;
  number: string;
  status: AntecipacaoStatus;
  institution: string;
  requestDate: string;
  settlementDate: string;
  termDays: number;
  monthlyRate: number;
  grossAmount: number;
  netAmount: number;
  duplicatas: AntecipacaoDuplicata[];
}

const mockAntecipacoes: Antecipacao[] = [
  {
    id: 'a1',
    number: 'ANT-2024-0001',
    status: 'liquidada',
    institution: 'Banco Itaú',
    requestDate: '2024-12-02',
    settlementDate: '2024-12-03',
    termDays: 22,
    monthlyRate: 1.89,
    grossAmount: 15750.0,
    netAmount: 15531.84,
    duplicatas: [
      {
        id: '1',
        number: 'DUP-001/2024',
        invoiceNumber: 'NF-001234',
        dueDate: '2024-12-25',
        amount: 15750.0,
      },
    ],
  },
  {
    id: 'a2',
    number: 'ANT-2024-0002',
    status: 'aprovada',
    institution: 'Banco Bradesco',
    requestDate: '2024-12-15',
    settlementDate: '2024-12-16',
    termDays: 18,
    monthlyRate: 2.15,
    grossAmount: 34400.0,
    netAmount: 33958.97,
    duplicatas: [
      {
        id: '4',
        number: 'DUP-004/2024',
        invoiceNumber: 'NF-001237',
        dueDate: '2024-12-29',
        amount: 22100.0,
      },
      {
        id: '8',
        number: 'DUP-008/2024',
        invoiceNumber: 'NF-001241',
        dueDate: '2025-01-08',
        amount: 12300.0,
      },
    ],
  },
  {
    id: 'a3',
    number: 'ANT-2024-0003',
    status: 'em_analise',
    institution: 'Banco Santander',
    requestDate: '2024-12-20',
    settlementDate: '2024-12-23',
    termDays: 27,
    monthlyRate: 1.95,
    grossAmount: 21600.0,
    netAmount: 21221.18,
    duplicatas: [
      {
        id: '12',
        number: 'DUP-012/2024',
        invoiceNumber: 'NF-001245',
        dueDate: '2025-01-18',
        amount: 21600.0,
      },
    ],
  },
  {
    id: 'a4',
    number: 'ANT-2024-0004',
    status: 'liquidada',
    institution: 'Banco do Brasil',
    requestDate: '2024-11-28',
    settlementDate: '2024-11-29',
    termDays: 30,
    monthlyRate: 1.79,
    grossAmount: 48750.0,
    netAmount: 47877.99,
    duplicatas: [
      {
        id: 'p1',
        number: 'DUP-091/2024',
        invoiceNumber: 'NF-001210',
        dueDate: '2024-12-29',
        amount: 28750.0,
      },
      {
        id: 'p2',
        number: 'DUP-092/2024',
        invoiceNumber: 'NF-001211',
        dueDate: '2024-12-29',
        amount: 20000.0,
      },
    ],
  },
  {
    id: 'a5',
    number: 'ANT-2024-0005',
    status: 'recusada',
    institution: 'Banco Inter',
    requestDate: '2024-12-18',
    settlementDate: '2024-12-19',
    termDays: 23,
    monthlyRate: 2.45,
    grossAmount: 9800.0,
    netAmount: 9627.78,
    duplicatas: [
      {
        id: '6',
        number: 'DUP-006/2024',
        invoiceNumber: 'NF-001239',
        dueDate: '2025-01-02',
        amount: 9800.0,
      },
    ],
  },
];

const statusConfig: Record<
  AntecipacaoStatus,
  { icon: typeof CheckCircle; color: string; label: string }
> = {
  em_analise: { icon: Clock, color: 'text-blue-600 bg-blue-50', label: 'Em Análise' },
  aprovada: { icon: CheckCircle, color: 'text-emerald-600 bg-emerald-50', label: 'Aprovada' },
  liquidada: { icon: DollarSign, color: 'text-green-700 bg-green-50', label: 'Liquidada' },
  recusada: { icon: XCircle, color: 'text-red-600 bg-red-50', label: 'Recusada' },
};

const formatBRL = (value: number) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const formatDate = (iso: string) => new Date(iso).toLocaleDateString('pt-BR');

export const SupplierAntecipacoes: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [showDetailsModal, setShowDetailsModal] = useState<string | null>(null);

  const filtered =
    selectedFilter === 'all'
      ? mockAntecipacoes
      : mockAntecipacoes.filter((a) => a.status === selectedFilter);

  const totalLiberado = mockAntecipacoes
    .filter((a) => a.status === 'liquidada' || a.status === 'aprovada')
    .reduce((sum, a) => sum + a.netAmount, 0);

  const emAnalise = mockAntecipacoes.filter((a) => a.status === 'em_analise').length;

  const taxasLiquidadas = mockAntecipacoes.filter((a) => a.status === 'liquidada');
  const taxaMedia =
    taxasLiquidadas.length > 0
      ? taxasLiquidadas.reduce((sum, a) => sum + a.monthlyRate, 0) / taxasLiquidadas.length
      : 0;

  const selected =
    showDetailsModal != null ? mockAntecipacoes.find((a) => a.id === showDetailsModal) : null;

  return (
    <div className="space-y-6" style={{ padding: '56px 40px 40px 40px' }}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Antecipações</h2>
          <p className="text-gray-600">
            Operações de crédito realizadas com base nas suas duplicatas
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="sap-button-secondary" style={{ height: '26px' }}>
            <Download className="w-4 h-4 mr-2 inline" />
            Exportar
          </button>
          <button className="sap-button" style={{ height: '26px' }}>
            <Zap className="w-4 h-4 mr-2 inline" />
            Nova Antecipação
          </button>
        </div>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="sap-metric-tile">
          <div className="flex items-center justify-between">
            <div>
              <p className="sap-metric-label mb-1">Total de Operações</p>
              <p className="sap-metric-value">{mockAntecipacoes.length}</p>
            </div>
            <Zap className="w-6 h-6 text-gray-400" />
          </div>
        </div>
        <div className="sap-metric-tile">
          <div className="flex items-center justify-between">
            <div>
              <p className="sap-metric-label mb-1">Em Análise</p>
              <p className="sap-metric-value text-blue-600">{emAnalise}</p>
            </div>
            <Clock className="w-6 h-6 text-blue-400" />
          </div>
        </div>
        <div className="sap-metric-tile">
          <div className="flex items-center justify-between">
            <div>
              <p className="sap-metric-label mb-1">Valor Liberado</p>
              <p className="sap-metric-value text-green-700">{formatBRL(totalLiberado)}</p>
            </div>
            <DollarSign className="w-6 h-6 text-green-400" />
          </div>
        </div>
        <div className="sap-metric-tile">
          <div className="flex items-center justify-between">
            <div>
              <p className="sap-metric-label mb-1">Taxa Média (a.m.)</p>
              <p className="sap-metric-value text-gray-900">{taxaMedia.toFixed(2)}%</p>
            </div>
            <TrendingUp className="w-6 h-6 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex space-x-2">
        {[
          { key: 'all', label: 'Todas' },
          { key: 'em_analise', label: 'Em Análise' },
          { key: 'aprovada', label: 'Aprovadas' },
          { key: 'liquidada', label: 'Liquidadas' },
          { key: 'recusada', label: 'Recusadas' },
        ].map((filter) => (
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
                  Operação
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Instituição
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duplicatas
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor Bruto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor Líquido
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Taxa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prazo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((op) => {
                const statusInfo = statusConfig[op.status];
                const StatusIcon = statusInfo.icon;
                return (
                  <tr key={op.id}>
                    <td className="px-6 py-1 whitespace-nowrap">
                      <div className="flex items-center">
                        <Zap className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{op.number}</div>
                          <div className="text-xs text-gray-500">
                            {formatDate(op.requestDate)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{op.institution}</div>
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {op.duplicatas.length}{' '}
                        {op.duplicatas.length === 1 ? 'duplicata' : 'duplicatas'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {op.duplicatas
                          .slice(0, 2)
                          .map((d) => d.number)
                          .join(', ')}
                        {op.duplicatas.length > 2 ? `, +${op.duplicatas.length - 2}` : ''}
                      </div>
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatBRL(op.grossAmount)}</div>
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap">
                      <div className="text-sm font-medium text-green-700">
                        {formatBRL(op.netAmount)}
                      </div>
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{op.monthlyRate.toFixed(2)}% a.m.</div>
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{op.termDays} dias</div>
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}
                      >
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setShowDetailsModal(op.id);
                        }}
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

      {/* Modal de detalhes */}
      {showDetailsModal && selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{selected.number}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Operação de crédito · Antecipação de duplicatas
                </p>
              </div>
              <button
                onClick={() => setShowDetailsModal(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <Building className="w-4 h-4 mr-1" /> Instituição
                  </div>
                  <div className="text-lg font-semibold text-gray-900">{selected.institution}</div>
                </div>
                <div>
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <Calendar className="w-4 h-4 mr-1" /> Solicitada em
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    {formatDate(selected.requestDate)}
                  </div>
                </div>
                <div>
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <Calendar className="w-4 h-4 mr-1" /> Liquidação
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    {formatDate(selected.settlementDate)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-6">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Valor Bruto</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {formatBRL(selected.grossAmount)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Valor Líquido</div>
                  <div className="text-lg font-semibold text-green-700">
                    {formatBRL(selected.netAmount)}
                  </div>
                </div>
                <div>
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <Percent className="w-4 h-4 mr-1" /> Taxa
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    {selected.monthlyRate.toFixed(2)}% a.m.
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Prazo Médio</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {selected.termDays} dias
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-semibold text-gray-900">
                    Duplicatas vinculadas ({selected.duplicatas.length})
                  </h4>
                  <span className="text-sm text-gray-500">
                    Total: {formatBRL(selected.grossAmount)}
                  </span>
                </div>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Duplicata
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          NF
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Vencimento
                        </th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                          Valor
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {selected.duplicatas.map((d) => (
                        <tr key={d.id} className="border-t border-gray-200">
                          <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                            <div className="flex items-center">
                              <FileText className="w-4 h-4 text-gray-400 mr-2" />
                              {d.number}
                            </div>
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">
                            {d.invoiceNumber}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">
                            {formatDate(d.dueDate)}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                            {formatBRL(d.amount)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setShowDetailsModal(null)}
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-medium"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
