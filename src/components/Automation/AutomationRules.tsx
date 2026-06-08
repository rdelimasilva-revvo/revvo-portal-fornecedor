import React, { useState } from 'react';
import { Settings, Plus, Play, Pause, Edit, Trash2 } from 'lucide-react';

interface AutomationRule {
  id: string;
  name: string;
  type: 'escrituracao' | 'manifestacao';
  action: 'accept' | 'refuse' | 'review';
  conditions: {
    amount?: { min?: number; max?: number };
    supplier?: string[];
    daysToExpiry?: number;
  };
  isActive: boolean;
  processedToday: number;
}

const mockRules: AutomationRule[] = [
  {
    id: '1',
    name: 'Auto-aceite valores baixos',
    type: 'manifestacao',
    action: 'accept',
    conditions: { amount: { max: 10000 } },
    isActive: true,
    processedToday: 156
  },
  {
    id: '2',
    name: 'Análise manual valores altos',
    type: 'manifestacao',
    action: 'review',
    conditions: { amount: { min: 50000 } },
    isActive: true,
    processedToday: 8
  },
  {
    id: '3',
    name: 'Recusa automática por vencimento',
    type: 'manifestacao',
    action: 'refuse',
    conditions: { daysToExpiry: 0 },
    isActive: true,
    processedToday: 23
  },
];

export const AutomationRules: React.FC = () => {
  const [rules, setRules] = useState<AutomationRule[]>(mockRules);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const toggleRuleStatus = (ruleId: string) => {
    setRules(rules.map(rule => 
      rule.id === ruleId ? { ...rule, isActive: !rule.isActive } : rule
    ));
  };

  const getActionLabel = (action: string) => {
    switch (action) {
      case 'accept': return 'Aceitar';
      case 'refuse': return 'Recusar';
      case 'review': return 'Análise Manual';
      default: return action;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'accept': return 'bg-green-100 text-green-700';
      case 'refuse': return 'bg-red-100 text-red-700';
      case 'review': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6" style={{ padding: '56px 40px 40px 40px' }}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Regras de Automação</h2>
          <p className="text-gray-600">Configure regras para processamento automático de duplicatas</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="sap-button"
          style={{ height: '26px' }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Nova Regra
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="sap-metric-tile">
          <div className="flex items-center justify-between">
            <div>
              <p className="sap-metric-label mb-1">Regras Ativas</p>
              <p className="sap-metric-value">{rules.filter(r => r.isActive).length}</p>
              <p className="sap-subtitle">de {rules.length} totais</p>
            </div>
            <Settings className="w-8 h-8 text-gray-400" />
          </div>
        </div>

        <div className="sap-metric-tile">
          <div className="flex items-center justify-between">
            <div>
              <p className="sap-metric-label mb-1">Processadas Hoje</p>
              <p className="sap-metric-value">
                {rules.reduce((sum, rule) => sum + rule.processedToday, 0)}
              </p>
              <p className="sap-subtitle">Duplicatas automatizadas</p>
            </div>
            <Play className="w-8 h-8 text-gray-400" />
          </div>
        </div>

        <div className="sap-metric-tile">
          <div className="flex items-center justify-between">
            <div>
              <p className="sap-metric-label mb-1">Taxa de Automação</p>
              <p className="sap-metric-value">94.8%</p>
              <p className="sap-subtitle">Eficiência do sistema</p>
            </div>
            <Settings className="w-8 h-8 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="sap-table">
        <div className="border-b border-gray-200 mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Regras Configuradas</h3>
        </div>

        <div className="overflow-hidden">
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Regra
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ação
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Condições
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Processadas Hoje
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
              {rules.map((rule) => (
                <tr key={rule.id}>
                  <td className="px-6 py-1 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{rule.name}</div>
                  </td>
                  <td className="px-6 py-1 whitespace-nowrap">
                    <span className="capitalize text-sm text-gray-900">{rule.type}</span>
                  </td>
                  <td className="px-6 py-1 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getActionColor(rule.action)}`}>
                      {getActionLabel(rule.action)}
                    </span>
                  </td>
                  <td className="px-6 py-1 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {rule.conditions.amount?.max && `≤ R$ ${rule.conditions.amount.max.toLocaleString()}`}
                      {rule.conditions.amount?.min && `≥ R$ ${rule.conditions.amount.min.toLocaleString()}`}
                      {rule.conditions.daysToExpiry !== undefined && `Vencimento: ${rule.conditions.daysToExpiry} dias`}
                    </div>
                  </td>
                  <td className="px-6 py-1 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{rule.processedToday}</div>
                  </td>
                  <td className="px-6 py-1 whitespace-nowrap">
                    <button
                      onClick={() => toggleRuleStatus(rule.id)}
                      className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                        rule.isActive 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {rule.isActive ? (
                        <>
                          <Play className="w-3 h-3 mr-1" />
                          Ativa
                        </>
                      ) : (
                        <>
                          <Pause className="w-3 h-3 mr-1" />
                          Pausada
                        </>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-1 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 p-1">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900 p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="sap-card w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Nova Regra de Automação</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome da Regra</label>
                <input
                  type="text"
                  className="sap-input w-full"
                  placeholder="Ex: Auto-aceite fornecedores premium"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
                <select className="sap-select w-full">
                  <option value="manifestacao">Manifestação</option>
                  <option value="escrituracao">Escrituração</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ação</label>
                <select className="sap-select w-full">
                  <option value="accept">Aceitar</option>
                  <option value="refuse">Recusar</option>
                  <option value="review">Análise Manual</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="sap-button-secondary"
                style={{ height: '26px' }}
              >
                Cancelar
              </button>
              <button className="sap-button" style={{ height: '26px' }}>
                Criar Regra
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};