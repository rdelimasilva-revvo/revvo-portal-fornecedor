import React, { useState } from 'react';
import { FileText, TrendingUp, TrendingDown, BarChart3, PieChart, Users, Building, Calendar, Filter } from 'lucide-react';

interface ConsolidatedMetrics {
  totalDuplicatas: number;
  totalAmount: number;
  receivables: {
    count: number;
    amount: number;
    acceptanceRate: number;
  };
  payables: {
    count: number;
    amount: number;
    automationRate: number;
  };
  monthlyGrowth: number;
  activeSuppliers: number;
  activeCustomers: number;
}

interface PerformanceData {
  period: string;
  issued: number;
  received: number;
  automated: number;
}

const mockMetrics: ConsolidatedMetrics = {
  totalDuplicatas: 1247,
  totalAmount: 15800000,
  receivables: {
    count: 687,
    amount: 8900000,
    acceptanceRate: 94.2
  },
  payables: {
    count: 560,
    amount: 6900000,
    automationRate: 87.5
  },
  monthlyGrowth: 12.5,
  activeSuppliers: 156,
  activeCustomers: 89
};

const mockPerformance: PerformanceData[] = [
  { period: 'Jan', issued: 450, received: 380, automated: 320 },
  { period: 'Fev', issued: 520, received: 420, automated: 380 },
  { period: 'Mar', issued: 580, received: 480, automated: 420 },
  { period: 'Abr', issued: 620, received: 510, automated: 450 },
  { period: 'Mai', issued: 680, received: 560, automated: 490 },
  { period: 'Jun', issued: 720, received: 590, automated: 520 },
];

export const DuplicataList: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('6m');
  const [selectedView, setSelectedView] = useState('overview');

  return (
    <div className="space-y-6" style={{ padding: '56px 40px 40px 40px' }}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Gestão Estratégica de Duplicatas</h2>
          <p className="text-gray-600">Visão consolidada e análise de performance do sistema</p>
        </div>
        <div className="flex space-x-2">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="sap-select"
            style={{ height: '26px' }}
          >
            <option value="1m">Último mês</option>
            <option value="3m">Últimos 3 meses</option>
            <option value="6m">Últimos 6 meses</option>
            <option value="1y">Último ano</option>
          </select>
          <button className="sap-button-secondary">
            <Filter className="w-4 h-4 mr-2 inline" />
            Filtros Avançados
          </button>
        </div>
      </div>

      {/* Métricas Executivas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="sap-metric-tile">
          <div className="flex items-center justify-between">
            <div>
              <p className="sap-metric-label mb-1">Volume Total</p>
              <p className="sap-metric-value">{mockMetrics.totalDuplicatas}</p>
              <p className="sap-subtitle">
                {mockMetrics.totalAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
            </div>
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <div className="sap-metric-trend positive">
            +{mockMetrics.monthlyGrowth}% vs. mês anterior
          </div>
        </div>

        <div className="sap-metric-tile">
          <div className="flex items-center justify-between">
            <div>
              <p className="sap-metric-label mb-1">Contas a Receber</p>
              <p className="sap-metric-value">{mockMetrics.receivables.count}</p>
              <p className="sap-subtitle">
                {mockMetrics.receivables.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-gray-400" />
          </div>
          <div className="sap-metric-trend positive">
            {mockMetrics.receivables.acceptanceRate}% taxa de aceite
          </div>
        </div>

        <div className="sap-metric-tile">
          <div className="flex items-center justify-between">
            <div>
              <p className="sap-metric-label mb-1">Contas a Pagar</p>
              <p className="sap-metric-value">{mockMetrics.payables.count}</p>
              <p className="sap-subtitle">
                {mockMetrics.payables.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
            </div>
            <BarChart3 className="w-8 h-8 text-gray-400" />
          </div>
          <div className="sap-metric-trend positive">
            {mockMetrics.payables.automationRate}% automação
          </div>
        </div>

        <div className="sap-metric-tile">
          <div className="flex items-center justify-between">
            <div>
              <p className="sap-metric-label mb-1">Parceiros Ativos</p>
              <p className="sap-metric-value">{mockMetrics.activeSuppliers + mockMetrics.activeCustomers}</p>
              <p className="sap-subtitle">
                {mockMetrics.activeSuppliers} fornecedores • {mockMetrics.activeCustomers} clientes
              </p>
            </div>
            <Users className="w-8 h-8 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Navegação de Visões */}
      <div className="flex space-x-2">
        {[
          { key: 'overview', label: 'Visão Geral', icon: BarChart3 },
          { key: 'performance', label: 'Performance', icon: TrendingUp },
          { key: 'compliance', label: 'Compliance', icon: FileText },
          { key: 'automation', label: 'Automação', icon: Building }
        ].map(view => {
          const Icon = view.icon;
          return (
            <button
              key={view.key}
              onClick={() => setSelectedView(view.key)}
              className={`px-4 rounded-lg text-sm transition-colors flex items-center ${
                selectedView === view.key
                  ? 'bg-white text-blue-700 font-semibold'
                  : 'text-blue-600 hover:bg-gray-50 font-medium'
              }`}
              style={{ height: '26px' }}
            >
              <Icon className="w-4 h-4 mr-2" />
              {view.label}
            </button>
          );
        })}
      </div>

      {/* Conteúdo Dinâmico por Visão */}
      {selectedView === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="sap-card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribuição por Tipo</h3>
            <div className="flex items-center justify-between">
              {/* Gráfico à esquerda */}
              <div className="relative w-40 h-40">
                <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#f3f4f6"
                    strokeWidth="12"
                  />
                  {/* Contas a Receber - 55.1% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="12"
                    strokeDasharray={`${((mockMetrics.receivables.count / mockMetrics.totalDuplicatas) * 251.2).toFixed(1)} 251.2`}
                    strokeDashoffset="0"
                    strokeLinecap="round"
                  />
                  {/* Contas a Pagar - 44.9% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="12"
                    strokeDasharray={`${((mockMetrics.payables.count / mockMetrics.totalDuplicatas) * 251.2).toFixed(1)} 251.2`}
                    strokeDashoffset={`-${((mockMetrics.receivables.count / mockMetrics.totalDuplicatas) * 251.2).toFixed(1)}`}
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              
              {/* Legenda à direita */}
              <div className="flex-1 ml-8 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-end flex-1">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-sm font-medium text-gray-700">Contas a Receber</span>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-sm font-bold text-gray-900">{mockMetrics.receivables.count.toLocaleString('pt-BR')}</p>
                    <p className="text-xs text-gray-500">
                      {((mockMetrics.receivables.count / mockMetrics.totalDuplicatas) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-end flex-1">
                    <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                    <span className="text-sm font-medium text-gray-700">Contas a Pagar</span>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-sm font-bold text-gray-900">{mockMetrics.payables.count.toLocaleString('pt-BR')}</p>
                    <p className="text-xs text-gray-500">
                      {((mockMetrics.payables.count / mockMetrics.totalDuplicatas) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="sap-card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Indicadores de Eficiência</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-lg">
                <span className="text-sm font-medium text-gray-900">Taxa de Aceite (Receber)</span>
                <span className="text-sm font-bold text-gray-700">{mockMetrics.receivables.acceptanceRate}%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-lg">
                <span className="text-sm font-medium text-gray-900">Automação (Pagar)</span>
                <span className="text-sm font-bold text-gray-700">{mockMetrics.payables.automationRate}%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-lg">
                <span className="text-sm font-medium text-gray-900">Crescimento Mensal</span>
                <span className="text-sm font-bold text-gray-700">+{mockMetrics.monthlyGrowth}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedView === 'performance' && (
        <div className="sap-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Evolução Mensal</h3>
          <div className="sap-table">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Período</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Emitidas</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Recebidas</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Automatizadas</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Taxa Automação</th>
                </tr>
              </thead>
              <tbody>
                {mockPerformance.map((data, index) => (
                  <tr key={index}>
                    <td className="px-4 py-1 text-sm font-medium text-gray-900">{data.period}</td>
                    <td className="px-4 py-1 text-sm text-gray-900">{data.issued}</td>
                    <td className="px-4 py-1 text-sm text-gray-900">{data.received}</td>
                    <td className="px-4 py-1 text-sm text-gray-900">{data.automated}</td>
                    <td className="px-4 py-1 text-sm text-gray-900">
                      {((data.automated / data.received) * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedView === 'compliance' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="sap-card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Status de Conformidade</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-lg">
                <span className="text-sm font-medium text-gray-900">Escrituração SEFAZ</span>
                <span className="text-sm font-bold text-gray-700">98.5%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-lg">
                <span className="text-sm font-medium text-gray-900">Validação XML</span>
                <span className="text-sm font-bold text-gray-700">99.2%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-lg">
                <span className="text-sm font-medium text-gray-900">Manifestações no Prazo</span>
                <span className="text-sm font-bold text-gray-700">96.8%</span>
              </div>
            </div>
          </div>

          <div className="sap-card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Auditoria e Controles</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-700">Última auditoria</span>
                <span className="text-sm font-medium text-gray-900">15/12/2024</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-700">Não conformidades</span>
                <span className="text-sm font-medium text-red-600">3 pendentes</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-700">Próxima revisão</span>
                <span className="text-sm font-medium text-gray-900">15/01/2025</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedView === 'automation' && (
        <div className="sap-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Eficiência da Automação</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white border border-gray-100 rounded-lg">
              <p className="text-2xl font-bold text-gray-900">87.5%</p>
              <p className="text-sm text-gray-700">Taxa de Automação Geral</p>
            </div>
            <div className="text-center p-4 bg-white border border-gray-100 rounded-lg">
              <p className="text-2xl font-bold text-gray-900">2.4h</p>
              <p className="text-sm text-gray-700">Tempo Médio de Processamento</p>
            </div>
            <div className="text-center p-4 bg-white border border-gray-100 rounded-lg">
              <p className="text-2xl font-bold text-gray-900">156</p>
              <p className="text-sm text-gray-700">Regras Ativas</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};