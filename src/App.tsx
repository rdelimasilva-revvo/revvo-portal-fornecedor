import React, { useState } from 'react';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { Dashboard } from './components/Dashboard/Dashboard';
import { DuplicataList } from './components/Duplicatas/DuplicataList';
import { XMLUpload } from './components/Upload/XMLUpload';
import { SupplierDashboard } from './components/Suppliers/SupplierDashboard';
import { SupplierDuplicatas } from './components/Suppliers/SupplierDuplicatas';
import { SupplierDiscounts } from './components/Suppliers/SupplierDiscounts';
import { SupplierAntecipacoes } from './components/Suppliers/SupplierAntecipacoes';
import { AutomationRules } from './components/Automation/AutomationRules';
import { AccountsReceivable } from './components/AccountsReceivable/AccountsReceivable';
import { AccountsPayable } from './components/AccountsPayable/AccountsPayable';
import { Escrituracao } from './components/Escrituracao/Escrituracao';
import { PaymentDomicileControl } from './components/PaymentDomicile/PaymentDomicileControl';

function App() {
  const [activeSection, setActiveSection] = useState('fornecedor-dashboard');

  const mockUser = {
    name: 'João Silva',
    company: 'SAP Brasil'
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'duplicatas':
        return <DuplicataList />;
      case 'upload':
        return <XMLUpload />;
      case 'fornecedor-dashboard':
        return <SupplierDashboard />;
      case 'fornecedor-duplicatas':
        return <SupplierDuplicatas />;
      case 'fornecedor-abatimentos':
        return <SupplierDiscounts />;
      case 'fornecedor-antecipacoes':
        return <SupplierAntecipacoes />;
      case 'regras':
        return <AutomationRules />;
      case 'contas-pagar':
        return <AccountsPayable />;
      case 'contas-receber':
        return <AccountsReceivable />;
      case 'escrituracao':
        return <Escrituracao />;
      case 'domicilio-bancario':
        return <PaymentDomicileControl />;
      case 'relatorios':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Relatórios e Analytics</h2>
              <p className="text-gray-600">Análise detalhada das operações</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
              <p className="text-gray-500">Módulo de relatórios em desenvolvimento...</p>
            </div>
          </div>
        );
      case 'perfil':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Perfil da Empresa</h2>
              <p className="text-gray-600">Configurações e informações da empresa</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
              <p className="text-gray-500">Módulo de perfil em desenvolvimento...</p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--sap-content-background)' }}>
      <Header user={mockUser} />
      <div className="flex">
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        <main className="flex-1">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;