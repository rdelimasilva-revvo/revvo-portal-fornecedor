import React from 'react';
import { Search, Bell, User, Settings, LogOut, Menu } from 'lucide-react';

interface HeaderProps {
  user: {
    name: string;
    company: string;
  };
}

export const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header className="sap-shell-header">
      <div className="flex items-center justify-between w-full">
        {/* Left side - Logo and Navigation */}
        <div className="flex items-center space-x-4">
          <button className="lg:hidden text-white hover:bg-white/10 p-1 rounded">
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-3">
            <img 
              src="https://vpnusoaiqtuqihkstgzt.supabase.co/storage/v1/object/public/erp//sap-logo.png" 
              alt="SAP" 
              className="h-6"
            />
            <div className="hidden md:block">
              <div className="text-gray-900 text-sm font-medium">Gestor Escritural - Portal Fornecedor</div>
              
            </div>
          </div>
        </div>

        {/* Center - Search */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search everything"
              className="w-full bg-gray-50 border border-gray-300 rounded text-gray-900 placeholder-gray-500 pl-10 pr-4 text-sm focus:outline-none focus:bg-white focus:border-blue-500"
              style={{ height: '26px' }}
            />
          </div>
        </div>

        {/* Right side - User actions */}
        <div className="flex items-center space-x-2">
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>

          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 text-white text-xs rounded-full flex items-center justify-center text-[10px]">
              3
            </span>
          </button>

          <div className="relative ml-4">
            <button className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
              <User className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};