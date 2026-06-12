import React from 'react';
import {
  LayoutDashboard,
  FileText,
  ChevronDown,
  ChevronRight,
  DollarSign,
  Zap,
  PanelLeftClose,
  PanelLeft
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

// Isótipo oficial da Revvo (pinwheel) recriado em SVG com as cores da marca.
const RevvoMark: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
    <g transform="translate(16 16)">
      {[
        { r: 0, c: '#21DDAE' },
        { r: 45, c: '#1FC9C0' },
        { r: 90, c: '#1AA7C9' },
        { r: 135, c: '#2C7BD6' },
        { r: 180, c: '#162D60' },
        { r: 225, c: '#2C7BD6' },
        { r: 270, c: '#1AA7C9' },
        { r: 315, c: '#1FC9C0' },
      ].map(({ r, c }) => (
        <rect
          key={r}
          x={-1.6}
          y={-13}
          width={3.2}
          height={7.5}
          rx={1.6}
          fill={c}
          transform={`rotate(${r})`}
        />
      ))}
    </g>
  </svg>
);

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);
  const [collapsed, setCollapsed] = React.useState(false);

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
          title={collapsed ? item.label : undefined}
          onClick={() => {
            if (hasChildren) {
              if (collapsed) setCollapsed(false);
              toggleExpanded(item.id);
            } else {
              onSectionChange(item.id);
            }
          }}
          className={`group relative flex items-center w-full rounded-lg transition-colors duration-150
            ${collapsed ? 'justify-center px-0 py-2.5' : 'justify-between px-3 py-2'}
            ${level > 0 && !collapsed ? 'pl-9 text-sm' : ''}
            ${
              isActive && !hasChildren
                ? 'bg-[#eef2fb] text-[#162D60] font-medium'
                : 'text-[#4b5563] hover:bg-gray-50 hover:text-[#162D60]'
            }`}
        >
          {/* Barra de destaque do item ativo */}
          {isActive && !hasChildren && (
            <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r bg-[#21DDAE]" />
          )}

          <div className={`flex items-center min-w-0 ${collapsed ? '' : 'space-x-3 flex-1'}`}>
            <Icon className="w-5 h-5 shrink-0" />
            {!collapsed && <span className="truncate">{item.label}</span>}
          </div>

          {hasChildren && !collapsed && (
            isExpanded ? <ChevronDown className="w-4 h-4 shrink-0" /> : <ChevronRight className="w-4 h-4 shrink-0" />
          )}
        </button>

        {hasChildren && isExpanded && !collapsed && (
          <div className="mt-1 space-y-1">
            {item.children!.map(child => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside
      className="sap-shell-sidebar flex flex-col bg-white border-r border-[#f0f0f0] transition-[width] duration-300 ease-in-out"
      style={{ width: collapsed ? '4rem' : '15rem' }}
    >
      {/* Cabeçalho da marca + botão recolher */}
      <div
        className={`flex items-center h-14 border-b border-[#f0f0f0]
          ${collapsed ? 'justify-center px-0' : 'justify-between px-4'}`}
      >
        {!collapsed && (
          <div className="flex items-center space-x-2 min-w-0">
            <RevvoMark className="w-7 h-7 shrink-0" />
            <span className="text-lg font-semibold tracking-tight text-[#162D60]">revvo</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(prev => !prev)}
          title={collapsed ? 'Expandir menu' : 'Recolher menu'}
          aria-label={collapsed ? 'Expandir menu' : 'Recolher menu'}
          className="p-1.5 rounded-md text-gray-400 hover:text-[#162D60] hover:bg-gray-100 transition-colors"
        >
          {collapsed ? <PanelLeft className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
        </button>
      </div>

      <nav className={`flex-1 space-y-1 ${collapsed ? 'px-2 py-3' : 'p-3'}`}>
        {menuItems.map(item => renderMenuItem(item))}
      </nav>
    </aside>
  );
};
