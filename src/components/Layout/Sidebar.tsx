import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Briefcase,
  ChevronDown,
  ChevronRight,
  DollarSign,
  Building,
  Zap
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: any;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  { id: 'fornecedor-dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'fornecedor-duplicatas', label: 'Minhas Duplicatas', icon: FileText },
  { id: 'fornecedor-abatimentos', label: 'Acordos Comerciais', icon: DollarSign },
  { id: 'fornecedor-antecipacoes', label: 'Antecipações', icon: Zap },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const Icon = item.icon;
    const isActive = activeSection === item.id;
    const isExpanded = expandedItems.includes(item.id);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.id}>
        <button
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.id);
            } else {
              onSectionChange(item.id);
            }
          }}
          className={`sap-nav-item w-full ${
            level > 0 ? 'ml-4 text-sm' : ''
          } ${
            isActive && !hasChildren ? 'active' : ''
          }`}
        >
          <div className="flex items-center space-x-3 flex-1">
            <Icon className="sap-icon" />
            <span>{item.label}</span>
          </div>
          {hasChildren && (
            <div>
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </div>
          )}
        </button>
        
        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.children!.map(child => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className="sap-shell-sidebar">
      <nav className="p-4 space-y-1">
        {menuItems.map(item => renderMenuItem(item))}
      </nav>
    </aside>
  );
};