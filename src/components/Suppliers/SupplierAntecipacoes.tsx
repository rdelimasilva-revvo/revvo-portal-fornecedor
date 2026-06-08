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
  {
    id: 'a6',
    number: 'ANT-2024-0006',
    status: 'liquidada',
    institution: 'Banco Safra',
    requestDate: '2024-11-12',
    settlementDate: '2024-11-13',
    termDays: 25,
    monthlyRate: 1.74,
    grossAmount: 56400.0,
    netAmount: 55581.36,
    duplicatas: [
      {
        id: 'p3',
        number: 'DUP-078/2024',
        invoiceNumber: 'NF-001195',
        dueDate: '2024-12-08',
        amount: 31200.0,
      },
      {
        id: 'p4',
        number: 'DUP-079/2024',
        invoiceNumber: 'NF-001196',
        dueDate: '2024-12-08',
        amount: 25200.0,
      },
    ],
  },
  {
    id: 'a7',
    number: 'ANT-2024-0007',
    status: 'liquidada',
    institution: 'Banco Itaú',
    requestDate: '2024-11-20',
    settlementDate: '2024-11-21',
    termDays: 28,
    monthlyRate: 1.82,
    grossAmount: 18400.0,
    netAmount: 18086.66,
    duplicatas: [
      {
        id: 'p5',
        number: 'DUP-083/2024',
        invoiceNumber: 'NF-001201',
        dueDate: '2024-12-19',
        amount: 18400.0,
      },
    ],
  },
  {
    id: 'a8',
    number: 'ANT-2024-0008',
    status: 'aprovada',
    institution: 'Banco Bradesco',
    requestDate: '2024-12-22',
    settlementDate: '2024-12-23',
    termDays: 21,
    monthlyRate: 2.05,
    grossAmount: 28900.0,
    netAmount: 28484.78,
    duplicatas: [
      {
        id: '9',
        number: 'DUP-009/2024',
        invoiceNumber: 'NF-001242',
        dueDate: '2025-01-10',
        amount: 28900.0,
      },
    ],
  },
  {
    id: 'a9',
    number: 'ANT-2024-0009',
    status: 'em_analise',
    institution: 'Banco Santander',
    requestDate: '2024-12-26',
    settlementDate: '2024-12-27',
    termDays: 19,
    monthlyRate: 1.99,
    grossAmount: 14200.0,
    netAmount: 14021.71,
    duplicatas: [
      {
        id: '13',
        number: 'DUP-013/2024',
        invoiceNumber: 'NF-001246',
        dueDate: '2025-01-20',
        amount: 14200.0,
      },
    ],
  },
  {
    id: 'a10',
    number: 'ANT-2024-0010',
    status: 'liquidada',
    institution: 'Banco do Brasil',
    requestDate: '2024-10-30',
    settlementDate: '2024-10-31',
    termDays: 35,
    monthlyRate: 1.65,
    grossAmount: 92500.0,
    netAmount: 90719.13,
    duplicatas: [
      {
        id: 'p6',
        number: 'DUP-061/2024',
        invoiceNumber: 'NF-001170',
        dueDate: '2024-12-04',
        amount: 42500.0,
      },
      {
        id: 'p7',
        number: 'DUP-062/2024',
        invoiceNumber: 'NF-001171',
        dueDate: '2024-12-04',
        amount: 30000.0,
      },
      {
        id: 'p8',
        number: 'DUP-063/2024',
        invoiceNumber: 'NF-001172',
        dueDate: '2024-12-04',
        amount: 20000.0,
      },
    ],
  },
  {
    id: 'a11',
    number: 'ANT-2024-0011',
    status: 'recusada',
    institution: 'Banco C6',
    requestDate: '2024-12-10',
    settlementDate: '2024-12-11',
    termDays: 30,
    monthlyRate: 2.85,
    grossAmount: 6500.0,
    netAmount: 6315.75,
    duplicatas: [
      {
        id: 'p9',
        number: 'DUP-085/2024',
        invoiceNumber: 'NF-001215',
        dueDate: '2025-01-09',
        amount: 6500.0,
      },
    ],
  },
  {
    id: 'a12',
    number: 'ANT-2024-0012',
    status: 'em_analise',
    institution: 'Banco Itaú',
    requestDate: '2024-12-27',
    settlementDate: '2024-12-30',
    termDays: 16,
    monthlyRate: 1.92,
    grossAmount: 45200.0,
    netAmount: 44762.06,
    duplicatas: [
      {
        id: '7',
        number: 'DUP-007/2024',
        invoiceNumber: 'NF-001240',
        dueDate: '2025-01-05',
        amount: 45200.0,
      },
    ],
  },
  {
    id: 'a13',
    number: 'ANT-2024-0013',
    status: 'liquidada',
    institution: 'Banco Sicoob',
    requestDate: '2024-11-05',
    settlementDate: '2024-11-06',
    termDays: 32,
    monthlyRate: 1.71,
    grossAmount: 22800.0,
    netAmount: 22386.33,
    duplicatas: [
      {
        id: 'p10',
        number: 'DUP-070/2024',
        invoiceNumber: 'NF-001182',
        dueDate: '2024-12-07',
        amount: 22800.0,
      },
    ],
  },
  {
    id: 'a14',
    number: 'ANT-2024-0014',
    status: 'aprovada',
    institution: 'Banco Inter',
    requestDate: '2024-12-23',
    settlementDate: '2024-12-26',
    termDays: 23,
    monthlyRate: 2.18,
    grossAmount: 38700.0,
    netAmount: 38059.16,
    duplicatas: [
      {
        id: '14',
        number: 'DUP-014/2024',
        invoiceNumber: 'NF-001247',
        dueDate: '2025-01-22',
        amount: 38700.0,
      },
    ],
  },
  {
    id: 'a15',
    number: 'ANT-2024-0015',
    status: 'liquidada',
    institution: 'Banco Bradesco',
    requestDate: '2024-09-18',
    settlementDate: '2024-09-19',
    termDays: 27,
    monthlyRate: 1.88,
    grossAmount: 31600.0,
    netAmount: 31064.81,
    duplicatas: [
      {
        id: 'p11',
        number: 'DUP-042/2024',
        invoiceNumber: 'NF-001148',
        dueDate: '2024-10-16',
        amount: 31600.0,
      },
    ],
  },
  {
    id: 'a16',
    number: 'ANT-2024-0016',
    status: 'liquidada',
    institution: 'Banco Santander',
    requestDate: '2024-10-08',
    settlementDate: '2024-10-09',
    termDays: 29,
    monthlyRate: 1.95,
    grossAmount: 11750.0,
    netAmount: 11528.86,
    duplicatas: [
      {
        id: 'p12',
        number: 'DUP-051/2024',
        invoiceNumber: 'NF-001158',
        dueDate: '2024-11-07',
        amount: 11750.0,
      },
    ],
  },
  {
    id: 'a17',
    number: 'ANT-2024-0017',
    status: 'em_analise',
    institution: 'Banco do Brasil',
    requestDate: '2024-12-28',
    settlementDate: '2024-12-30',
    termDays: 24,
    monthlyRate: 1.78,
    grossAmount: 35400.0,
    netAmount: 34899.49,
    duplicatas: [
      {
        id: '11',
        number: 'DUP-011/2024',
        invoiceNumber: 'NF-001244',
        dueDate: '2025-01-15',
        amount: 35400.0,
      },
    ],
  },
  {
    id: 'a18',
    number: 'ANT-2024-0018',
    status: 'liquidada',
    institution: 'Banco Sicredi',
    requestDate: '2024-11-25',
    settlementDate: '2024-11-26',
    termDays: 20,
    monthlyRate: 1.69,
    grossAmount: 16750.0,
    netAmount: 16561.34,
    duplicatas: [
      {
        id: 'p13',
        number: 'DUP-088/2024',
        invoiceNumber: 'NF-001207',
        dueDate: '2024-12-15',
        amount: 16750.0,
      },
    ],
  },
  {
    id: 'a19',
    number: 'ANT-2024-0019',
    status: 'recusada',
    institution: 'Banco Original',
    requestDate: '2024-12-05',
    settlementDate: '2024-12-06',
    termDays: 26,
    monthlyRate: 2.55,
    grossAmount: 8200.0,
    netAmount: 8019.36,
    duplicatas: [
      {
        id: '2',
        number: 'DUP-002/2024',
        invoiceNumber: 'NF-001235',
        dueDate: '2024-12-30',
        amount: 8200.0,
      },
    ],
  },
  {
    id: 'a20',
    number: 'ANT-2024-0020',
    status: 'aprovada',
    institution: 'Banco Itaú',
    requestDate: '2024-12-24',
    settlementDate: '2024-12-26',
    termDays: 17,
    monthlyRate: 1.85,
    grossAmount: 67300.0,
    netAmount: 66594.59,
    duplicatas: [
      {
        id: 'p14',
        number: 'DUP-095/2024',
        invoiceNumber: 'NF-001220',
        dueDate: '2025-01-10',
        amount: 27300.0,
      },
      {
        id: 'p15',
        number: 'DUP-096/2024',
        invoiceNumber: 'NF-001221',
        dueDate: '2025-01-12',
        amount: 40000.0,
      },
    ],
  },
  {
    id: 'a21',
    number: 'ANT-2024-0021',
    status: 'liquidada',
    institution: 'Banco Itaú',
    requestDate: '2024-08-22',
    settlementDate: '2024-08-23',
    termDays: 30,
    monthlyRate: 1.79,
    grossAmount: 24500.0,
    netAmount: 24061.78,
    duplicatas: [
      {
        id: 'p16',
        number: 'DUP-028/2024',
        invoiceNumber: 'NF-001132',
        dueDate: '2024-09-21',
        amount: 24500.0,
      },
    ],
  },
  {
    id: 'a22',
    number: 'ANT-2024-0022',
    status: 'em_analise',
    institution: 'Banco Bradesco',
    requestDate: '2024-12-29',
    settlementDate: '2024-12-30',
    termDays: 22,
    monthlyRate: 2.02,
    grossAmount: 19850.0,
    netAmount: 19555.41,
    duplicatas: [
      {
        id: '5',
        number: 'DUP-005/2024',
        invoiceNumber: 'NF-001238',
        dueDate: '2024-12-31',
        amount: 18750.0,
      },
      {
        id: 'p17',
        number: 'DUP-097/2024',
        invoiceNumber: 'NF-001222',
        dueDate: '2025-01-14',
        amount: 1100.0,
      },
    ],
  },
  {
    id: 'a23',
    number: 'ANT-2024-0023',
    status: 'liquidada',
    institution: 'Banco do Brasil',
    requestDate: '2024-07-15',
    settlementDate: '2024-07-16',
    termDays: 28,
    monthlyRate: 1.73,
    grossAmount: 41200.0,
    netAmount: 40542.33,
    duplicatas: [
      {
        id: 'p18',
        number: 'DUP-018/2024',
        invoiceNumber: 'NF-001120',
        dueDate: '2024-08-12',
        amount: 41200.0,
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
