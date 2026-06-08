import React from 'react';
import { FileText, Upload, CheckCircle, Clock, AlertTriangle, DollarSign } from 'lucide-react';

export const SupplierDashboard: React.FC = () => {
  return (
    <div className="space-y-4" style={{ padding: '56px 40px 40px 40px' }}>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Portal do Fornecedor - Dashboard</h2>
        <p className="text-gray-600">Visão geral das suas duplicatas e atividades</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="sap-metric-tile">
          <div className="flex items-center justify-between">
            <div>
              <p className="sap-metric-label mb-1">Duplicatas Ativas</p>
              <p className="sap-metric-value text-2xl font-semibold">47</p>
              <p className="sap-subtitle">Em carteira</p>
            </div>
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
        </div>

        <div className="sap-metric-tile">
          <div className="flex items-center justify-between">
            <div>
              <p className="sap-metric-label mb-1">Aguardando XML</p>
              <p className="sap-metric-value text-2xl font-semibold">8</p>
              <p className="sap-subtitle">Pendentes upload</p>
            </div>
            <Upload className="w-8 h-8 text-gray-400" />
          </div>
        </div>

        <div className="sap-metric-tile">
          <div className="flex items-center justify-between">
            <div>
              <p className="sap-metric-label mb-1">Abatimentos</p>
              <p className="sap-metric-value text-2xl font-semibold">3</p>
              <p className="sap-subtitle">Aguardando aprovação</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-gray-400" />
          </div>
        </div>

        <div className="sap-metric-tile">
          <div className="flex items-center justify-between">
            <div>
              <p className="sap-metric-label mb-1">Valor Total</p>
              <p className="sap-metric-value text-2xl font-semibold">R$ 285.000</p>
              <p className="sap-subtitle">Duplicatas ativas</p>
            </div>
            <DollarSign className="w-8 h-8 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="sap-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Atividades Recentes</h3>
          <div className="space-y-4">
            {[
              { action: 'XML enviado com sucesso', invoice: 'NF-001234', time: '2 horas' },
              { action: 'Abatimento aprovado', invoice: 'NF-001230', time: '1 dia' },
              { action: 'Duplicata escriturada', invoice: 'NF-001228', time: '2 dias' },
              { action: 'XML processado', invoice: 'NF-001225', time: '3 dias' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.invoice}</p>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="sap-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Próximas Ações</h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 sap-card">
              <Clock className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">8 XMLs pendentes</p>
                <p className="text-xs text-gray-600">Faça upload para escrituração</p>
              </div>
            </div>
            <div className="flex items-center p-3 sap-card">
              <AlertTriangle className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">3 abatimentos aguardando</p>
                <p className="text-xs text-gray-600">Revise e aprove os valores</p>
              </div>
            </div>
            <div className="flex items-center p-3 sap-card">
              <CheckCircle className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Sistema em dia</p>
                <p className="text-xs text-gray-600">Todas as duplicatas atualizadas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};