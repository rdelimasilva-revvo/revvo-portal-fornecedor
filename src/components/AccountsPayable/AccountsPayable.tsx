import React, { useState } from 'react';
import { FileText, CheckCircle, XCircle, Clock, AlertTriangle, Eye, MessageSquare } from 'lucide-react';

interface PayableDuplicate {
  id: string;
  number: string;
  invoiceNumber: string;
  supplier: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  status: 'received' | 'accepted' | 'refused' | 'pending_review' | 'disputed';
  manifestationStatus: 'pending' | 'accepted' | 'refused' | 'expired';
  manifestationDate?: string;
  refusalReason?: string;
  disputeReason?: string;
  autoProcessed: boolean;
}

const mockPayables: PayableDuplicate[] = [
  {
    id: '1',
    number: 'DUP-PAG-001/2024',
    invoiceNumber: 'NF-001234',
    supplier: 'Fornecedor ABC Ltda',
    issueDate: '2025-08-02',
    dueDate: '2025-08-25',
    amount: 15750.00,
    status: 'accepted',
    manifestationStatus: 'accepted',
    manifestationDate: '2025-08-03',
    autoProcessed: true
  },
  {
    id: '2',
    number: 'DUP-PAG-002/2024',
    invoiceNumber: 'NF-001235',
    supplier: 'Indústria XYZ S.A.',
    issueDate: '2025-08-01',
    dueDate: '2025-08-30',
    amount: 85000.00,
    status: 'pending_review',
    manifestationStatus: 'pending',
    autoProcessed: true
  },
  {
    id: '3',
    number: 'DUP-PAG-003/2024',
    invoiceNumber: 'NF-001236',
    supplier: 'Comércio DEF Ltda',
    issueDate: '2025-07-30',
    dueDate: '2025-08-20',
    amount: 5200.00,
    status: 'refused',
    manifestationStatus: 'refused',
    manifestationDate: '2025-08-02',
    refusalReason: 'Mercadoria não foi entregue conforme especificação',
    autoProcessed: true
  },
  {
    id: '4',
    number: 'DUP-PAG-004/2024',
    invoiceNumber: 'NF-001237',
    supplier: 'Distribuidora GHI Ltda',
    issueDate: '2025-07-28',
    dueDate: '2025-08-28',
    amount: 32500.00,
    status: 'disputed',
    manifestationStatus: 'pending',
    disputeReason: 'Valor divergente do acordado comercialmente',
    autoProcessed: true
  }
];

const statusConfig = {
  received: { icon: FileText, color: 'text-blue-600 bg-blue-50', label: 'Recebida' },
  accepted: { icon: CheckCircle, color: 'text-green-600 bg-green-50', label: 'Aceita' },
  refused: { icon: XCircle, color: 'text-red-600 bg-red-50', label: 'Recusada' },
  pending_review: { icon: Clock, color: 'text-yellow-600 bg-yellow-50', label: 'Pendente' },
  disputed: { icon: AlertTriangle, color: 'text-orange-600 bg-orange-50', label: 'Análise Manual' },
};

const manifestationConfig = {
  pending: { color: 'bg-yellow-100 text-yellow-700', label: 'Pendente' },
  accepted: { color: 'bg-green-100 text-green-700', label: 'Aceita' },
  refused: { color: 'bg-red-100 text-red-700', label: 'Recusada' },
  expired: { color: 'bg-gray-100 text-gray-700', label: 'Expirada' },
};

export const AccountsPayable: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [showManifestationModal, setShowManifestationModal] = useState<string | null>(null);
  const [manifestationStep, setManifestationStep] = useState<'details' | 'accept' | 'refuse'>('details');
  const [selectedDuplicate, setSelectedDuplicate] = useState<PayableDuplicate | null>(null);
  const [refusalReason, setRefusalReason] = useState<string>('');
  const [refusalDescription, setRefusalDescription] = useState<string>('');

  // Função para calcular dias desde o recebimento
  const calculateDaysSinceReceived = (issueDate: string): number => {
    const today = new Date();
    const received = new Date(issueDate);
    const diffTime = Math.abs(today.getTime() - received.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Função para determinar a cor do contador baseado na urgência
  const getDaysCounterColor = (days: number): string => {
    if (days >= 8) return 'text-red-600 bg-red-50 border-red-200'; // Crítico (8+ dias)
    if (days >= 5) return 'text-orange-600 bg-orange-50 border-orange-200'; // Atenção (5-7 dias)
    return 'text-blue-600 bg-blue-50 border-blue-200'; // Normal (0-7 dias)
  };

  const filteredPayables = selectedFilter === 'all' 
    ? mockPayables 
    : mockPayables.filter(item => item.status === selectedFilter);

  const totalAmount = mockPayables.reduce((sum, item) => sum + item.amount, 0);
  const pendingAmount = mockPayables
    .filter(item => item.status === 'pending_review')
    .reduce((sum, item) => sum + item.amount, 0);
  const acceptedAmount = mockPayables
    .filter(item => item.status === 'accepted')
    .reduce((sum, item) => sum + item.amount, 0);

  const handleManifestation = (duplicateId: string, action: 'accept' | 'refuse', reason?: string) => {
    // Lógica para processar manifestação
    console.log(`Manifestação ${action} para duplicata ${duplicateId}`, reason);
    closeModal();
  };

  const openManifestationModal = (duplicate: PayableDuplicate) => {
    setSelectedDuplicate(duplicate);
    setManifestationStep('details');
    setShowManifestationModal(duplicate.id);
  };

  const closeModal = () => {
    setShowManifestationModal(null);
    setManifestationStep('details');
    setSelectedDuplicate(null);
    setRefusalReason('');
    setRefusalDescription('');
  };

  const handleAccept = () => {
    setManifestationStep('accept');
  };

  const handleRefuse = () => {
    setManifestationStep('refuse');
  };

  const confirmAccept = () => {
    if (selectedDuplicate) {
      handleManifestation(selectedDuplicate.id, 'accept');
    }
  };

  const confirmRefuse = () => {
    if (selectedDuplicate && refusalReason) {
      handleManifestation(selectedDuplicate.id, 'refuse', `${refusalReason}: ${refusalDescription}`);
    }
  };

  return (
    <div className="space-y-6" style={{ padding: '56px 40px 40px 40px' }}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Contas a Pagar</h2>
          <p className="text-gray-600">Duplicatas recebidas de fornecedores e controle de manifestações</p>
        </div>
        <div className="flex space-x-3">
          <button className="sap-button-secondary" style={{ height: '26px' }}>
            Configurar Regras
          </button>
          <button className="sap-button" style={{ height: '26px' }}>
            Processar Lote
          </button>
        </div>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="sap-metric-tile">
          <div className="flex items-center justify-between">
            <div>
              <p className="sap-metric-label mb-1">Total Recebido</p>
              <p className="sap-metric-value">
                {totalAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
              <p className="sap-subtitle">{mockPayables.length} duplicatas</p>
            </div>
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
        </div>

        <div className="sap-metric-tile">
          <div className="flex items-center justify-between">
            <div>
              <p className="sap-metric-label mb-1">Análise Manual</p>
              <p className="sap-metric-value">
                {pendingAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
              <p className="sap-subtitle">
                {mockPayables.filter(item => item.status === 'pending_review').length} duplicatas
              </p>
            </div>
            <Clock className="w-8 h-8 text-gray-400" />
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
                {mockPayables.filter(item => item.status === 'accepted').length} duplicatas
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-gray-400" />
          </div>
        </div>

        <div className="sap-metric-tile">
          <div className="flex items-center justify-between">
            <div>
              <p className="sap-metric-label mb-1">Taxa Automação</p>
              <p className="sap-metric-value">
                {Math.round((mockPayables.filter(item => item.autoProcessed).length / mockPayables.length) * 100)}%
              </p>
              <p className="sap-subtitle">Processamento automático</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex space-x-2">
        {[
          { key: 'all', label: 'Todas' },
          { key: 'pending_review', label: 'Análise Manual' },
          { key: 'accepted', label: 'Aceitas' },
          { key: 'refused', label: 'Recusadas' },
          { key: 'disputed', label: 'Em Disputa' }
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
                  NF-e
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fornecedor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vencimento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Processamento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Manifestação
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPayables.map((duplicate) => {
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
                            Recebida em {new Date(duplicate.issueDate).toLocaleDateString('pt-BR')}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{duplicate.invoiceNumber}</div>
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{duplicate.supplier}</div>
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
                      {new Date(duplicate.dueDate) < new Date('2025-08-05') && duplicate.status === 'pending_review' && (
                        <div className="text-xs text-red-600 font-medium">Urgente</div>
                      )}
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        duplicate.autoProcessed 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {duplicate.autoProcessed ? 'Automático' : 'Manual'}
                      </span>
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${manifestationInfo.color}`}>
                          {manifestationInfo.label}
                        </span>
                        {duplicate.manifestationStatus === 'pending' && (
                          <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded border ${getDaysCounterColor(calculateDaysSinceReceived(duplicate.issueDate))}`}>
                            {calculateDaysSinceReceived(duplicate.issueDate)} dias
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        {duplicate.id === '4' && (
                          <button 
                            onClick={() => openManifestationModal(duplicate)}
                            className="text-green-600 hover:text-green-900"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </button>
                        )}
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Zona Cinzenta - Análise Manual */}
      {mockPayables.filter(item => item.status === 'pending_review').length > 0 && (
        <div className="sap-card" style={{ borderColor: '#fbbf24', backgroundColor: '#fefce8' }}>
          <h3 className="text-lg font-semibold text-yellow-900 mb-4">
            Zona Cinzenta - Requer Análise Manual
          </h3>
          <div className="space-y-4">
            {mockPayables
              .filter(item => item.status === 'pending_review')
              .map(item => (
                <div key={item.id} className="sap-card" style={{ borderColor: '#fbbf24' }}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <p className="font-medium text-gray-900">{item.number}</p>
                        <span className="text-sm text-yellow-700 bg-yellow-100 px-2 py-1 rounded">
                          Análise Manual
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        <strong>Fornecedor:</strong> {item.supplier}
                      </p>
                      <p className="text-sm text-gray-600 mb-1">
                        <strong>Valor:</strong> {item.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Vencimento:</strong> {new Date(item.dueDate).toLocaleDateString('pt-BR')}
                      </p>
                      {item.disputeReason && (
                        <div className="mt-2 p-2 bg-orange-50 border border-orange-200 rounded">
                          <p className="text-sm text-orange-800">
                            <strong>Motivo da Disputa:</strong> {item.disputeReason}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleManifestation(item.id, 'refuse')}
                        className="px-3 text-white rounded-lg hover:opacity-90 transition-colors text-sm"
                        style={{ height: '26px', backgroundColor: '#ef4545' }}
                      >
                        Recusar
                      </button>
                      <button
                        onClick={() => handleManifestation(item.id, 'accept')}
                        className="px-3 text-white rounded-lg hover:opacity-90 transition-colors text-sm"
                        style={{ height: '26px', backgroundColor: '#0f976a' }}
                      >
                        Aceitar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Modal de Manifestação */}
      {showManifestationModal && selectedDuplicate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          {manifestationStep === 'details' && (
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">
                  Duplicata: {selectedDuplicate.number.replace('DUP-PAG-', '')} - NF {selectedDuplicate.number.replace('DUP-PAG-', '24907')}
                </h3>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6">
                <div className="text-sm text-gray-600 mb-4">
                  Emissão: {new Date(selectedDuplicate.issueDate).toLocaleDateString('pt-BR')}
                </div>
                
                <div className="mb-6">
                  <div className="text-sm font-medium text-gray-700 mb-2">Fornecedor</div>
                  <div className="text-lg font-semibold text-gray-900 mb-1">{selectedDuplicate.supplier}</div>
                  <div className="text-sm text-gray-600">Última atualização: 01/01/2024</div>
                </div>
                
                <div className="grid grid-cols-3 gap-6 mb-6">
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Vencimento</div>
                    <div className="text-lg font-semibold text-gray-900 mb-1">
                      {new Date(selectedDuplicate.dueDate).toLocaleDateString('pt-BR')}
                    </div>
                    <div className="text-sm text-gray-600">Última atualização em 01/01/2024</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Dados para pagamento</div>
                    <div className="text-lg font-semibold text-gray-900 mb-1">117 - Corretora de Câmbio LTDA</div>
                    <div className="text-sm text-gray-600">Ag: 001 - CC: 12356-9</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Instrumento de pagamento</div>
                    <div className="text-lg font-semibold text-gray-900">Transferência Bancária</div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={handleAccept}
                    className="px-6 text-white rounded hover:opacity-90 transition-colors font-medium"
                    style={{ height: '26px', backgroundColor: '#0f976a' }}
                  >
                    Aceitar
                  </button>
                  <button
                    onClick={handleRefuse}
                    className="px-6 text-white rounded hover:opacity-90 transition-colors font-medium"
                    style={{ height: '26px', backgroundColor: '#ef4545' }}
                  >
                    Recusar
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {manifestationStep === 'accept' && (
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Aceitar</h3>
                <p className="text-gray-700 mb-6">Deseja realmente aceitar?</p>
                
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setManifestationStep('details')}
                    className="px-4 text-gray-600 hover:text-gray-800 transition-colors font-medium"
                    style={{ height: '26px' }}
                  >
                    Não
                  </button>
                  <button
                    onClick={confirmAccept}
                    className="px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-medium"
                    style={{ height: '26px' }}
                  >
                    Sim
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {manifestationStep === 'refuse' && (
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Motivo da Recusa</h3>
                
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Destinatário/Sacador</div>
                    <div className="text-gray-900">Nome Sacador 11.222333/0001-44</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Data de Apresentação da Duplicata</div>
                    <div className="text-gray-900">{new Date(selectedDuplicate.issueDate).toLocaleDateString('pt-BR')} às 17:45</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Valor</div>
                    <div className="text-gray-900">
                      {selectedDuplicate.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Vencimento</div>
                    <div className="text-gray-900">{new Date(selectedDuplicate.dueDate).toLocaleDateString('pt-BR')}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Número da Fatura</div>
                    <div className="text-gray-900">3124312512</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Número da ordem</div>
                    <div className="text-gray-900">442</div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Motivo da recusa</label>
                  <select
                    value={refusalReason}
                    onChange={(e) => setRefusalReason(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Selecione o motivo</option>
                    <option value="Divergência de valores">Divergência de valores</option>
                    <option value="Prazo incorreto">Prazo incorreto</option>
                    <option value="Outros motivos">Outros motivos</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
                  <textarea
                    value={refusalDescription}
                    onChange={(e) => setRefusalDescription(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 h-24 focus:outline-none focus:border-blue-500"
                    placeholder="Descreva o motivo da recusa..."
                  />
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setManifestationStep('details')}
                    className="px-4 text-gray-600 hover:text-gray-800 transition-colors font-medium"
                    style={{ height: '26px' }}
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={confirmRefuse}
                    disabled={!refusalReason}
                    className="px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
                    style={{ height: '26px' }}
                  >
                    Enviar Manifestação
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};