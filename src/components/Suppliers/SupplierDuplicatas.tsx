import React, { useState } from 'react';
import { FileText, Upload, CheckCircle, XCircle, Clock, AlertTriangle, Eye, Download, DollarSign } from 'lucide-react';

interface SupplierDuplicata {
  id: string;
  number: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  status: 'escriturada' | 'nao_escriturada' | 'processing' | 'aguardando_dfe';
  xmlStatus: 'missing' | 'uploaded' | 'processed' | 'error';
  source: 'manual' | 'erp_import';
  hasXml: boolean;
  negotiationStatus: 'not_negotiated' | 'negotiated' | 'payment_address_changed';
  originalCreditor?: {
    name: string;
    cnpj: string;
    bankDetails: {
      bank: string;
      agency: string;
      account: string;
    };
  };
  newCreditor?: {
    name: string;
    cnpj: string;
    bankDetails: {
      bank: string;
      agency: string;
      account: string;
    };
  };
  negotiationDate?: string;
}

const mockDuplicatas: SupplierDuplicata[] = [
  {
    id: '1',
    number: 'DUP-001/2024',
    invoiceNumber: 'NF-001234',
    issueDate: '2024-12-10',
    dueDate: '2024-12-25',
    amount: 15750.00,
    status: 'escriturada',
    xmlStatus: 'processed',
    source: 'manual',
    hasXml: true,
    negotiationStatus: 'not_negotiated'
  },
  {
    id: '2',
    number: 'DUP-002/2024',
    invoiceNumber: 'NF-001235',
    issueDate: '2024-12-12',
    dueDate: '2024-12-30',
    amount: 8200.00,
    status: 'aguardando_dfe',
    xmlStatus: 'missing',
    source: 'erp_import',
    hasXml: false,
    negotiationStatus: 'not_negotiated'
  },
  {
    id: '3',
    number: 'DUP-003/2024',
    invoiceNumber: 'NF-001236',
    issueDate: '2024-12-14',
    dueDate: '2024-12-28',
    amount: 32500.00,
    status: 'processing',
    xmlStatus: 'uploaded',
    source: 'manual',
    hasXml: true,
    negotiationStatus: 'payment_address_changed',
    originalCreditor: {
      name: 'Fornecedor Original Ltda',
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
    negotiationDate: '2024-12-14'
  },
  {
    id: '4',
    number: 'DUP-004/2024',
    invoiceNumber: 'NF-001237',
    issueDate: '2024-12-15',
    dueDate: '2024-12-29',
    amount: 22100.00,
    status: 'escriturada',
    xmlStatus: 'processed',
    source: 'erp_import',
    hasXml: true,
    negotiationStatus: 'not_negotiated'
  },
  {
    id: '5',
    number: 'DUP-005/2024',
    invoiceNumber: 'NF-001238',
    issueDate: '2024-12-16',
    dueDate: '2024-12-31',
    amount: 18750.00,
    status: 'nao_escriturada',
    xmlStatus: 'uploaded',
    source: 'manual',
    hasXml: true,
    negotiationStatus: 'not_negotiated'
  },
  {
    id: '6',
    number: 'DUP-006/2024',
    invoiceNumber: 'NF-001239',
    issueDate: '2024-12-17',
    dueDate: '2025-01-02',
    amount: 9800.00,
    status: 'aguardando_dfe',
    xmlStatus: 'missing',
    source: 'erp_import',
    hasXml: false,
    negotiationStatus: 'not_negotiated'
  },
  {
    id: '7',
    number: 'DUP-007/2024',
    invoiceNumber: 'NF-001240',
    issueDate: '2024-12-18',
    dueDate: '2025-01-05',
    amount: 45200.00,
    status: 'processing',
    xmlStatus: 'uploaded',
    source: 'manual',
    hasXml: true,
    negotiationStatus: 'not_negotiated'
  },
  {
    id: '8',
    number: 'DUP-008/2024',
    invoiceNumber: 'NF-001241',
    issueDate: '2024-12-19',
    dueDate: '2025-01-08',
    amount: 12300.00,
    status: 'escriturada',
    xmlStatus: 'processed',
    source: 'erp_import',
    hasXml: true,
    negotiationStatus: 'not_negotiated'
  },
  {
    id: '9',
    number: 'DUP-009/2024',
    invoiceNumber: 'NF-001242',
    issueDate: '2024-12-20',
    dueDate: '2025-01-10',
    amount: 28900.00,
    status: 'nao_escriturada',
    xmlStatus: 'error',
    source: 'manual',
    hasXml: true,
    negotiationStatus: 'not_negotiated'
  },
  {
    id: '10',
    number: 'DUP-010/2024',
    invoiceNumber: 'NF-001243',
    issueDate: '2024-12-21',
    dueDate: '2025-01-12',
    amount: 16750.00,
    status: 'aguardando_dfe',
    xmlStatus: 'missing',
    source: 'erp_import',
    hasXml: false,
    negotiationStatus: 'not_negotiated'
  },
  {
    id: '11',
    number: 'DUP-011/2024',
    invoiceNumber: 'NF-001244',
    issueDate: '2024-12-22',
    dueDate: '2025-01-15',
    amount: 35400.00,
    status: 'processing',
    xmlStatus: 'uploaded',
    source: 'manual',
    hasXml: true,
    negotiationStatus: 'not_negotiated'
  },
  {
    id: '12',
    number: 'DUP-012/2024',
    invoiceNumber: 'NF-001245',
    issueDate: '2024-12-23',
    dueDate: '2025-01-18',
    amount: 21600.00,
    status: 'escriturada',
    xmlStatus: 'processed',
    source: 'erp_import',
    hasXml: true,
    negotiationStatus: 'not_negotiated'
  },
  {
    id: '13',
    number: 'DUP-013/2024',
    invoiceNumber: 'NF-001246',
    issueDate: '2024-12-24',
    dueDate: '2025-01-20',
    amount: 14200.00,
    status: 'nao_escriturada',
    xmlStatus: 'uploaded',
    source: 'manual',
    hasXml: true,
    negotiationStatus: 'not_negotiated'
  },
  {
    id: '14',
    number: 'DUP-014/2024',
    invoiceNumber: 'NF-001247',
    issueDate: '2024-12-25',
    dueDate: '2025-01-22',
    amount: 38700.00,
    status: 'aguardando_dfe',
    xmlStatus: 'missing',
    source: 'erp_import',
    hasXml: false,
    negotiationStatus: 'not_negotiated'
  }
];

const statusConfig = {
  escriturada: { icon: CheckCircle, color: 'text-green-600 bg-green-50', label: 'Escriturada' },
  nao_escriturada: { icon: XCircle, color: 'text-red-600 bg-red-50', label: 'Não Escriturada' },
  processing: { icon: Clock, color: 'text-blue-600 bg-blue-50', label: 'Processando' },
  aguardando_dfe: { icon: Upload, color: 'text-yellow-600 bg-yellow-50', label: 'Aguardando DF-e' },
};

const negotiationConfig = {
  not_negotiated: { color: 'bg-gray-100 text-gray-700', label: 'Não Negociada' },
  negotiated: { color: 'bg-blue-100 text-blue-700', label: 'Negociada' },
  payment_address_changed: { color: 'bg-orange-100 text-orange-700', label: 'Domicílio Alterado' },
};

const xmlStatusConfig = {
  missing: { color: 'bg-red-100 text-red-700', label: 'XML Pendente' },
  uploaded: { color: 'bg-blue-100 text-blue-700', label: 'Enviado' },
  processed: { color: 'bg-green-100 text-green-700', label: 'Processado' },
  error: { color: 'bg-red-100 text-red-700', label: 'Erro' },
};

export const SupplierDuplicatas: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [showUploadModal, setShowUploadModal] = useState<string | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState<string | null>(null);
  const [showNegotiationModal, setShowNegotiationModal] = useState<string | null>(null);
  const [negotiationForm, setNegotiationForm] = useState({
    favorecidoNome: '',
    favorecidoCnpj: '',
    banco: '',
    agencia: '',
    conta: '',
    chavePix: '',
    tipoChave: ''
  });

  const bancos = [
    { code: '001', name: 'Banco do Brasil' },
    { code: '033', name: 'Banco Santander' },
    { code: '104', name: 'Caixa Econômica Federal' },
    { code: '237', name: 'Banco Bradesco' },
    { code: '341', name: 'Banco Itaú' },
    { code: '041', name: 'Banrisul' },
    { code: '070', name: 'BRB - Banco de Brasília' },
    { code: '077', name: 'Banco Inter' },
    { code: '212', name: 'Banco Original' },
    { code: '260', name: 'Nu Pagamentos (Nubank)' },
    { code: '336', name: 'Banco C6' },
    { code: '290', name: 'PagBank' },
    { code: '380', name: 'PicPay' },
    { code: '655', name: 'Banco Votorantim' },
    { code: '756', name: 'Sicoob' },
    { code: '748', name: 'Sicredi' }
  ];

  const filteredDuplicatas = selectedFilter === 'all' 
    ? mockDuplicatas 
    : mockDuplicatas.filter(item => item.status === selectedFilter);

  const handleFileUpload = (duplicataId: string, files: FileList | null) => {
    if (files && files.length > 0) {
      // Lógica para upload do XML
      console.log(`Uploading XML for duplicata ${duplicataId}:`, files[0]);
      setShowUploadModal(null);
    }
  };

  const openDetailsModal = (duplicataId: string) => {
    setShowDetailsModal(duplicataId);
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(null);
  };

  const openNegotiationModal = (duplicataId: string) => {
    setShowNegotiationModal(duplicataId);
    setNegotiationForm({
      favorecidoNome: '',
      favorecidoCnpj: '',
      banco: '',
      agencia: '',
      conta: '',
      chavePix: '',
      tipoChave: ''
    });
  };

  const closeNegotiationModal = () => {
    setShowNegotiationModal(null);
    setNegotiationForm({
      favorecidoNome: '',
      favorecidoCnpj: '',
      banco: '',
      agencia: '',
      conta: '',
      chavePix: '',
      tipoChave: ''
    });
  };

  const handleNegotiationSubmit = () => {
    console.log('Comunicando negociação:', negotiationForm);
    closeNegotiationModal();
  };

  const selectedDuplicataForDetails = showDetailsModal 
    ? mockDuplicatas.find(d => d.id === showDetailsModal)
    : null;

  return (
    <div className="space-y-6" style={{ padding: '56px 40px 40px 40px' }}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Minhas Duplicatas</h2>
          <p className="text-gray-600">Gerencie suas duplicatas e faça upload dos XMLs das notas fiscais</p>
        </div>
        <div className="flex space-x-3">
          <button className="sap-button-secondary" style={{ height: '26px' }}>
            <Download className="w-4 h-4 mr-2 inline" />
            Exportar
          </button>
        </div>
      </div>

      {/* Métricas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="sap-metric-tile">
          <div className="flex items-center justify-between">
            <div>
              <p className="sap-metric-label mb-1">Total</p>
              <p className="sap-metric-value">{mockDuplicatas.length}</p>
            </div>
            <FileText className="w-6 h-6 text-gray-400" />
          </div>
        </div>
        <div className="sap-metric-tile">
          <div className="flex items-center justify-between">
            <div>
              <p className="sap-metric-label mb-1">Aguardando DF-e</p>
              <p className="sap-metric-value text-yellow-600">
                {mockDuplicatas.filter(d => d.status === 'aguardando_dfe').length}
              </p>
            </div>
            <Upload className="w-6 h-6 text-yellow-400" />
          </div>
        </div>
        <div className="sap-metric-tile">
          <div className="flex items-center justify-between">
            <div>
              <p className="sap-metric-label mb-1">Escrituradas</p>
              <p className="sap-metric-value text-green-600">
                {mockDuplicatas.filter(d => d.status === 'escriturada').length}
              </p>
            </div>
            <CheckCircle className="w-6 h-6 text-green-400" />
          </div>
        </div>
        <div className="sap-metric-tile">
          <div className="flex items-center justify-between">
            <div>
              <p className="sap-metric-label mb-1">Valor Total</p>
              <p className="sap-metric-value text-blue-600">
                {mockDuplicatas.reduce((sum, d) => sum + d.amount, 0).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </p>
            </div>
            <DollarSign className="w-6 h-6 text-blue-400" />
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex space-x-2">
        {[
          { key: 'all', label: 'Todas' },
          { key: 'aguardando_dfe', label: 'Aguardando DF-e' },
          { key: 'processing', label: 'Processando' },
          { key: 'escriturada', label: 'Escrituradas' },
          { key: 'nao_escriturada', label: 'Não Escrituradas' }
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

      {/* Tabela de Duplicatas */}
      <div className="sap-table">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duplicata / NF
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
                  XML
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Negociação
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Origem
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredDuplicatas.map((duplicata) => {
                const statusInfo = statusConfig[duplicata.status];
                const xmlInfo = xmlStatusConfig[duplicata.xmlStatus];
                const negotiationInfo = negotiationConfig[duplicata.negotiationStatus];
                const StatusIcon = statusInfo.icon;
                
                return (
                  <tr key={duplicata.id}>
                    <td className="px-6 py-1 whitespace-nowrap">
                      <div className="flex items-center">
                        <StatusIcon className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {duplicata.number}
                          </div>
                          <div className="text-xs text-gray-500">
                            NF: {duplicata.invoiceNumber}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {duplicata.amount.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(duplicata.dueDate).toLocaleDateString('pt-BR')}
                      </div>
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${xmlInfo.color}`}>
                        {xmlInfo.label}
                      </span>
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${negotiationInfo.color}`}>
                        {negotiationInfo.label}
                      </span>
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        duplicata.source === 'manual' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-purple-100 text-purple-700'
                      }`}>
                        {duplicata.source === 'manual' ? 'Manual' : 'ERP'}
                      </span>
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-between">
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            openDetailsModal(duplicata.id);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {duplicata.xmlStatus === 'missing' && (
                          <button 
                            onClick={() => setShowUploadModal(duplicata.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            <Upload className="w-4 h-4" />
                          </button>
                        )}
                        {duplicata.xmlStatus !== 'missing' && <div></div>}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alerta para XMLs Pendentes */}
      {mockDuplicatas.filter(d => d.status === 'aguardando_dfe').length > 0 && (
        <div className="sap-card" style={{ borderColor: '#fbbf24', backgroundColor: '#fefce8' }}>
          <div className="flex items-start">
            <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">DF-e Pendentes</h3>
              <p className="text-yellow-800 mb-4">
                Você possui {mockDuplicatas.filter(d => d.status === 'aguardando_dfe').length} duplicatas aguardando upload do DF-e. 
                Faça o upload para que possam ser escrituradas.
              </p>
              <div className="space-y-2">
                {mockDuplicatas
                  .filter(d => d.status === 'aguardando_dfe')
                  .map(duplicata => (
                    <div key={duplicata.id} className="flex items-center justify-between sap-card">
                      <div>
                        <p className="font-medium text-gray-900">{duplicata.number}</p>
                        <p className="text-sm text-gray-600">NF: {duplicata.invoiceNumber}</p>
                      </div>
                      <button 
                        onClick={() => setShowUploadModal(duplicata.id)}
                        className="sap-button text-sm"
                        style={{ height: '26px', backgroundColor: '#d97706' }}
                      >
                        Upload DF-e
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Duplicatas com Alteração de Domicílio */}
      {mockDuplicatas.filter(d => d.negotiationStatus === 'payment_address_changed').length > 0 && (
        <div className="sap-card" style={{ borderColor: '#3b82f6', backgroundColor: '#eff6ff' }}>
          <div className="flex items-start">
            <AlertTriangle className="w-6 h-6 text-blue-600 mr-3 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Duplicatas com Domicílio Alterado</h3>
              <p className="text-blue-800 mb-4">
                As seguintes duplicatas tiveram seu domicílio bancário alterado devido à negociação:
              </p>
              <div className="space-y-2">
                {mockDuplicatas
                  .filter(d => d.negotiationStatus === 'payment_address_changed')
                  .map(duplicata => (
                    <div key={duplicata.id} className="sap-card">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{duplicata.number}</p>
                          <p className="text-sm text-gray-600">NF: {duplicata.invoiceNumber}</p>
                          {duplicata.negotiationDate && (
                            <p className="text-xs text-gray-500">
                              Negociado em: {new Date(duplicata.negotiationDate).toLocaleDateString('pt-BR')}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            {duplicata.amount.toLocaleString('pt-BR', {
                              style: 'currency',
                              currency: 'BRL'
                            })}
                          </p>
                          {duplicata.newCreditor && (
                            <p className="text-xs text-blue-600">
                              Novo credor: {duplicata.newCreditor.name}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Detalhes da Duplicata */}
      {showDetailsModal && selectedDuplicataForDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                Detalhes da Duplicata
              </h3>
              <button 
                onClick={closeDetailsModal} 
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              {/* Primeira linha */}
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Fatura</div>
                  <div className="text-lg font-semibold text-gray-900">74294</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Nº Parcela</div>
                  <div className="text-lg font-semibold text-gray-900">002</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Domicílio Bancário</div>
                  <div className="text-lg font-semibold text-gray-900">Emitente</div>
                </div>
              </div>
              
              {/* Segunda linha */}
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Faturamento</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {new Date(selectedDuplicataForDetails.issueDate).toLocaleDateString('pt-BR')}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Valor</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {selectedDuplicataForDetails.amount.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Vencimento</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {new Date(selectedDuplicataForDetails.dueDate).toLocaleDateString('pt-BR')}
                  </div>
                </div>
              </div>
              
              {/* Terceira linha */}
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Situação</div>
                  <div className="text-lg font-semibold text-gray-900">A vencer</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Duplicata</div>
                  <div className="text-lg font-semibold text-gray-900">Não emitida</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Status</div>
                  <div className="text-lg font-semibold text-gray-900">Não negociada</div>
                </div>
              </div>
              
              {/* Dados de Pagamento */}
              <div className="mb-6">
                <div className="text-lg font-semibold text-gray-900 mb-3">Dados de Pagamento</div>
                <div className="text-sm text-gray-600 mb-4">
                  Dados de pagamento não disponíveis
                </div>
                
                <div className="mb-2">
                  <div className="text-sm text-gray-500 mb-1">Chave NF</div>
                  <div className="text-sm font-mono text-gray-900 bg-gray-50 p-2 rounded">
                    44444444444444444444444444444444444444444444
                  </div>
                </div>
              </div>
              
              {/* Botões */}
              <div className="flex space-x-3">
                <button
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-medium"
                >
                  Escriturar Duplicata
                </button>
                <button
                  onClick={() => {
                    closeDetailsModal();
                    openNegotiationModal(selectedDuplicataForDetails.id);
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-medium"
                >
                  Comunicar Negociação
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Comunicar Negociação */}
      {showNegotiationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                Comunicar Negociação
              </h3>
              <button 
                onClick={closeNegotiationModal} 
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {/* Novo favorecido */}
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Novo favorecido</h4>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome do favorecido
                    </label>
                    <input
                      type="text"
                      value={negotiationForm.favorecidoNome}
                      onChange={(e) => setNegotiationForm({...negotiationForm, favorecidoNome: e.target.value})}
                      placeholder="Digite o nome do favorecido"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CNPJ
                    </label>
                    <input
                      type="text"
                      value={negotiationForm.favorecidoCnpj}
                      onChange={(e) => setNegotiationForm({...negotiationForm, favorecidoCnpj: e.target.value})}
                      placeholder="Digite o CNPJ"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Novo domicílio de pagamento */}
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Novo domicílio de pagamento</h4>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Banco
                    </label>
                    <select
                      value={negotiationForm.banco}
                      onChange={(e) => setNegotiationForm({...negotiationForm, banco: e.target.value})}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Selecionar banco</option>
                      {bancos.map((banco) => (
                        <option key={banco.code} value={banco.code}>
                          {banco.code} - {banco.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Agência
                    </label>
                    <input
                      type="text"
                      value={negotiationForm.agencia}
                      onChange={(e) => setNegotiationForm({...negotiationForm, agencia: e.target.value})}
                      placeholder="Digite o número da agência"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Conta
                    </label>
                    <input
                      type="text"
                      value={negotiationForm.conta}
                      onChange={(e) => setNegotiationForm({...negotiationForm, conta: e.target.value})}
                      placeholder="Digite o número da conta"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
                {/* Dados para PIX */}
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Dados para PIX</h4>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Chave PIX
                    </label>
                    <input
                      type="text"
                      value={negotiationForm.chavePix}
                      onChange={(e) => setNegotiationForm({...negotiationForm, chavePix: e.target.value})}
                      placeholder="Digite a chave PIX"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo da chave
                    </label>
                    <select
                      value={negotiationForm.tipoChave}
                      onChange={(e) => setNegotiationForm({...negotiationForm, tipoChave: e.target.value})}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Selecione o tipo da chave</option>
                      <option value="cpf">CPF</option>
                      <option value="cnpj">CNPJ</option>
                      <option value="email">E-mail</option>
                      <option value="telefone">Telefone</option>
                      <option value="aleatoria">Chave Aleatória</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Botões */}
              <div className="flex justify-end space-x-3">
                <button
                  onClick={closeNegotiationModal}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleNegotiationSubmit}
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-medium"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};