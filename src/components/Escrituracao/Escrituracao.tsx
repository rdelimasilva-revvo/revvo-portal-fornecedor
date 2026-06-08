import React, { useState } from 'react';
import { FileText, CheckCircle, XCircle, Clock, AlertTriangle, Upload, Download, Eye, RefreshCw, Database } from 'lucide-react';

interface EscrituratedDocument {
  id: string;
  duplicataNumber: string;
  invoiceNumber: string;
  supplier: string;
  amount: number;
  xmlStatus: 'pending' | 'processing' | 'validated' | 'error' | 'escriturated';
  sefazStatus: 'not_sent' | 'sent' | 'confirmed' | 'rejected';
  escrituracaoDate?: string;
  validationErrors?: string[];
  protocolNumber?: string;
}

const mockDocuments: EscrituratedDocument[] = [
  {
    id: '1',
    duplicataNumber: 'DUP-001/2024',
    invoiceNumber: 'NF-001234',
    supplier: 'Fornecedor ABC Ltda',
    amount: 15750.00,
    xmlStatus: 'escriturated',
    sefazStatus: 'confirmed',
    escrituracaoDate: '2024-12-15',
    protocolNumber: 'PROT-2024-001234'
  },
  {
    id: '2',
    duplicataNumber: 'DUP-002/2024',
    invoiceNumber: 'NF-001235',
    supplier: 'Indústria XYZ S.A.',
    amount: 85000.00,
    xmlStatus: 'processing',
    sefazStatus: 'sent'
  },
  {
    id: '3',
    duplicataNumber: 'DUP-003/2024',
    invoiceNumber: 'NF-001236',
    supplier: 'Comércio DEF Ltda',
    amount: 5200.00,
    xmlStatus: 'error',
    sefazStatus: 'rejected',
    validationErrors: ['CNPJ do emitente inválido', 'Valor da nota divergente']
  },
];

const xmlStatusConfig = {
  pending: { icon: Clock, color: 'text-yellow-600 bg-yellow-50', label: 'Aguardando XML' },
  processing: { icon: RefreshCw, color: 'text-blue-600 bg-blue-50', label: 'Processando' },
  validated: { icon: CheckCircle, color: 'text-green-600 bg-green-50', label: 'Validado' },
  error: { icon: XCircle, color: 'text-red-600 bg-red-50', label: 'Erro' },
  escriturated: { icon: Database, color: 'text-purple-600 bg-purple-50', label: 'Escriturado' },
};

const sefazStatusConfig = {
  not_sent: { color: 'bg-gray-100 text-gray-700', label: 'Não Enviado' },
  sent: { color: 'bg-blue-100 text-blue-700', label: 'Enviado SEFAZ' },
  confirmed: { color: 'bg-green-100 text-green-700', label: 'Confirmado' },
  rejected: { color: 'bg-red-100 text-red-700', label: 'Rejeitado' },
};

export const Escrituracao: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [showValidationModal, setShowValidationModal] = useState<string | null>(null);

  const filteredDocuments = selectedFilter === 'all' 
    ? mockDocuments 
    : mockDocuments.filter(doc => doc.xmlStatus === selectedFilter);

  const handleReprocessXML = (documentId: string) => {
    console.log(`Reprocessing XML for document ${documentId}`);
  };

  const handleSendToSefaz = (documentId: string) => {
    console.log(`Sending document ${documentId} to SEFAZ`);
  };

  return (
    <div className="space-y-4" style={{ padding: '56px 40px 40px 40px' }}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Escrituração de Duplicatas</h2>
          <p className="text-gray-600">Processamento técnico, validação e conformidade regulatória</p>
        </div>
        <div className="flex space-x-3">
          <button className="sap-button-secondary">
            <Download className="w-4 h-4 mr-2 inline" />
            Relatório Compliance
          </button>
          <button className="sap-button" style={{ height: '26px' }}>
            <Upload className="w-4 h-4 mr-2 inline" />
            Processar Lote
          </button>
        </div>
      </div>

      {/* Métricas de Compliance */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="sap-metric-tile">
          <div className="flex items-center justify-between">
            <div>
              <p className="sap-metric-label mb-1">Total Documentos</p>
              <p className="sap-metric-value text-2xl font-semibold">{mockDocuments.length.toLocaleString('pt-BR')}</p>
            </div>
            <FileText className="w-6 h-6 text-gray-400" />
          </div>
        </div>

        <div className="sap-metric-tile">
          <div className="flex items-center justify-between">
            <div>
              <p className="sap-metric-label mb-1">Processando</p>
              <p className="sap-metric-value text-2xl font-semibold">
                {mockDocuments.filter(d => d.xmlStatus === 'processing').length.toLocaleString('pt-BR')}
              </p>
            </div>
            <RefreshCw className="w-6 h-6 text-gray-400" />
          </div>
        </div>

        <div className="sap-metric-tile">
          <div className="flex items-center justify-between">
            <div>
              <p className="sap-metric-label mb-1">Escriturados</p>
              <p className="sap-metric-value text-2xl font-semibold">
                {mockDocuments.filter(d => d.xmlStatus === 'escriturated').length.toLocaleString('pt-BR')}
              </p>
            </div>
            <Database className="w-6 h-6 text-gray-400" />
          </div>
        </div>

        <div className="sap-metric-tile">
          <div className="flex items-center justify-between">
            <div>
              <p className="sap-metric-label mb-1">Com Erro</p>
              <p className="sap-metric-value text-2xl font-semibold">
                {mockDocuments.filter(d => d.xmlStatus === 'error').length.toLocaleString('pt-BR')}
              </p>
            </div>
            <XCircle className="w-6 h-6 text-gray-400" />
          </div>
        </div>

        <div className="sap-metric-tile">
          <div className="flex items-center justify-between">
            <div>
              <p className="sap-metric-label mb-1">Taxa Sucesso</p>
              <p className="sap-metric-value text-2xl font-semibold">
                {Math.round((mockDocuments.filter(d => d.xmlStatus === 'escriturated').length / mockDocuments.length) * 100).toLocaleString('pt-BR')}%
              </p>
            </div>
            <CheckCircle className="w-6 h-6 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex space-x-2">
        {[
          { key: 'all', label: 'Todos' },
          { key: 'processing', label: 'Processando' },
          { key: 'validated', label: 'Validados' },
          { key: 'error', label: 'Com Erro' },
          { key: 'escriturated', label: 'Escriturados' }
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

      {/* Tabela de Documentos */}
      <div className="sap-table">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Documento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fornecedor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status XML
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status SEFAZ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Protocolo
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map((document) => {
                const xmlStatusInfo = xmlStatusConfig[document.xmlStatus];
                const sefazStatusInfo = sefazStatusConfig[document.sefazStatus];
                const StatusIcon = xmlStatusInfo.icon;
                
                return (
                  <tr key={document.id}>
                    <td className="px-6 py-1 whitespace-nowrap">
                      <div className="flex items-center">
                        <StatusIcon className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {document.duplicataNumber}
                          </div>
                          <div className="text-xs text-gray-500">
                            NF: {document.invoiceNumber}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{document.supplier}</div>
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {document.amount.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${xmlStatusInfo.color}`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {xmlStatusInfo.label}
                      </span>
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${sefazStatusInfo.color}`}>
                        {sefazStatusInfo.label}
                      </span>
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {document.protocolNumber || '-'}
                      </div>
                      {document.escrituracaoDate && (
                        <div className="text-xs text-gray-500">
                          {new Date(document.escrituracaoDate).toLocaleDateString('pt-BR')}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="w-4 h-4" />
                        </button>
                        {document.xmlStatus === 'error' && (
                          <button 
                            onClick={() => setShowValidationModal(document.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <AlertTriangle className="w-4 h-4" />
                          </button>
                        )}
                        {document.xmlStatus === 'validated' && document.sefazStatus === 'not_sent' && (
                          <button 
                            onClick={() => handleSendToSefaz(document.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            <Upload className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Área de Erros de Validação */}
      {mockDocuments.filter(d => d.xmlStatus === 'error').length > 0 && (
        <div className="sap-card" style={{ borderColor: '#f0f0f0' }}>
          <h3 className="text-lg font-semibold text-red-900 mb-4">
            Documentos com Erro de Validação
          </h3>
          <div className="space-y-4">
            {mockDocuments
              .filter(d => d.xmlStatus === 'error')
              .map(document => (
                <div key={document.id} className="sap-card">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <p className="font-medium text-gray-900">{document.duplicataNumber}</p>
                        <span className="text-sm text-red-700 bg-red-100 px-2 py-1 rounded">
                          Erro de Validação
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Fornecedor:</strong> {document.supplier}
                      </p>
                      {document.validationErrors && (
                        <div className="mt-2">
                          <p className="text-sm font-medium text-red-800 mb-1">Erros encontrados:</p>
                          <ul className="text-sm text-red-700 list-disc list-inside">
                            {document.validationErrors.map((error, index) => (
                              <li key={index}>{error}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button 
                        onClick={() => handleReprocessXML(document.id)}
                        className="sap-button"
                        style={{ height: '26px' }}
                      >
                        Reprocessar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Painel de Conformidade */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="sap-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Status de Conformidade</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 sap-card">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                <span className="text-sm font-medium text-green-900">Validação XML</span>
              </div>
              <span className="text-sm text-green-700">100% Conforme</span>
            </div>
            <div className="flex items-center justify-between p-3 sap-card">
              <div className="flex items-center">
                <Database className="w-5 h-5 text-blue-600 mr-3" />
                <span className="text-sm font-medium text-blue-900">Escrituração SEFAZ</span>
              </div>
              <span className="text-sm text-blue-700">Em Processamento</span>
            </div>
            <div className="flex items-center justify-between p-3 sap-card">
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-purple-600 mr-3" />
                <span className="text-sm font-medium text-purple-900">Auditoria</span>
              </div>
              <span className="text-sm text-purple-700">Aprovada</span>
            </div>
          </div>
        </div>

        <div className="sap-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Últimas Atividades</h3>
          <div className="space-y-3">
            {[
              { action: 'XML validado com sucesso', document: 'DUP-001/2024', time: '10 min' },
              { action: 'Enviado para SEFAZ', document: 'DUP-002/2024', time: '25 min' },
              { action: 'Erro de validação corrigido', document: 'DUP-003/2024', time: '1h' },
              { action: 'Protocolo recebido da SEFAZ', document: 'DUP-004/2024', time: '2h' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.document}</p>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};