import React from 'react';
import { MetricCard } from './MetricCard';
import { FileText, CheckCircle, AlertTriangle, DollarSign, Clock, Users, Search, Filter, Upload, Settings, BarChart3 } from 'lucide-react';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6" style={{ padding: '56px 40px 40px 40px' }}>
      {/* Page Header */}
      <div className="sap-page-header">
        <h1 className="sap-page-title">Dashboard Executivo</h1>
        
        <p className="sap-page-subtitle">Visão geral das operações de duplicatas</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard
          title="Total de Duplicatas"
          value="1.247"
          subtitle="R$ 15.8M em carteira"
          icon={FileText}
          trend={{ value: 12.5, isPositive: true }}
          color="blue"
        />
        <MetricCard
          title="Contas a Receber"
          value="687"
          subtitle="R$ 8.9M • 94.2% aceite"
          icon={CheckCircle}
          trend={{ value: 8.3, isPositive: true }}
          color="green"
        />
        <MetricCard
          title="Contas a Pagar"
          value="560"
          subtitle="R$ 6.9M • 87.5% automação"
          icon={AlertTriangle}
          trend={{ value: -2.1, isPositive: false }}
          color="yellow"
        />
        <MetricCard
          title="Parceiros Ativos"
          value="245"
          subtitle="156 fornecedores • 89 clientes"
          icon={Users}
          trend={{ value: 15.2, isPositive: true }}
          color="blue"
        />
      </div>

      {/* Activity Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="sap-card">
          <h3 className="sap-title mb-4">Atividades Recentes</h3>
          <div className="space-y-3">
            {[
              { action: 'XML processado automaticamente', document: 'DUP-001/2024', time: '5 min', status: 'success' },
              { action: 'Duplicata aceita pelo cliente', document: 'DUP-002/2024', time: '15 min', status: 'success' },
              { action: 'Abatimento aprovado', document: 'DUP-003/2024', time: '1h', status: 'warning' },
              { action: 'Erro na validação XML', document: 'DUP-004/2024', time: '2h', status: 'error' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-3 ${
                    activity.status === 'success' ? 'bg-green-500' :
                    activity.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.document}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="sap-card">
          <h3 className="sap-title mb-4">Status do Sistema</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                <span className="text-sm font-medium text-green-900">Processamento Automático</span>
              </div>
              <span className="text-sm text-green-700">Operacional</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-lg">
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-blue-600 mr-3" />
                <span className="text-sm font-medium text-blue-900">Integração SEFAZ</span>
              </div>
              <span className="text-sm text-blue-700">Conectado</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-lg">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3" />
                <span className="text-sm font-medium text-yellow-900">Análise Manual</span>
              </div>
              <span className="text-sm text-yellow-700">8 pendentes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="sap-card">
        <h3 className="sap-title mb-4">Ações Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <button className="sap-button-secondary flex items-center justify-center" style={{ height: '2rem', padding: '0 1rem' }}>
            <FileText className="w-5 h-5 mr-2" />
            Nova Duplicata
          </button>
          <button className="sap-button-secondary flex items-center justify-center" style={{ height: '2rem', padding: '0 1rem' }}>
            <Upload className="w-5 h-5 mr-2" />
            Upload XML
          </button>
          <button className="sap-button-secondary flex items-center justify-center" style={{ height: '2rem', padding: '0 1rem' }}>
            <Settings className="w-5 h-5 mr-2" />
            Configurar Regras
          </button>
          <button className="sap-button-secondary flex items-center justify-center" style={{ height: '2rem', padding: '0 1rem' }}>
            <BarChart3 className="w-5 h-5 mr-2" />
            Ver Relatórios
          </button>
        </div>
      </div>
    </div>
  );
};