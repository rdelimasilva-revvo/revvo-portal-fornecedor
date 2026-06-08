import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Loader } from 'lucide-react';

export const XMLUpload: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([
    { name: 'nota_fiscal_001.xml', status: 'success', processed: true },
    { name: 'nota_fiscal_002.xml', status: 'processing', processed: false },
    { name: 'nota_fiscal_003.xml', status: 'error', processed: false },
  ]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file upload logic here
  };

  return (
    <div className="space-y-6" style={{ padding: '56px 40px 40px 40px' }}>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload de XML Fiscal</h2>
        <p className="text-gray-600">Faça upload dos arquivos XML das notas fiscais para processamento automático</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-6">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
              dragActive 
                ? 'border-blue-500 bg-white' 
                : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Arraste os arquivos XML aqui
            </h3>
            <p className="text-gray-500 mb-4">
              ou clique para selecionar arquivos
            </p>
            <button className="sap-button">
              Selecionar Arquivos
            </button>
            <p className="text-xs text-gray-400 mt-3">
              Formatos aceitos: XML • Tamanho máximo: 10MB por arquivo
            </p>
          </div>

          <div className="bg-white border border-gray-100 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Busca Automática SEFAZ</h4>
            <p className="text-sm text-gray-700 mb-4">
              Configure a busca automática de XMLs diretamente na SEFAZ
            </p>
            <div className="flex space-x-3">
              <input
                type="text"
                placeholder="CNPJ do fornecedor"
                className="flex-1 sap-input"
              />
              <button className="sap-button">
                Buscar
              </button>
            </div>
          </div>
        </div>

        <div className="sap-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Arquivos Processados</h3>
          <div className="space-y-3">
            {uploadedFiles.map((file, index) => {
              const getStatusIcon = () => {
                switch (file.status) {
                  case 'success':
                    return <CheckCircle className="w-5 h-5 text-green-600" />;
                  case 'processing':
                    return <Loader className="w-5 h-5 text-blue-600 animate-spin" />;
                  case 'error':
                    return <AlertCircle className="w-5 h-5 text-red-600" />;
                  default:
                    return <FileText className="w-5 h-5 text-gray-400" />;
                }
              };

              const getStatusText = () => {
                switch (file.status) {
                  case 'success':
                    return 'Processado com sucesso';
                  case 'processing':
                    return 'Processando...';
                  case 'error':
                    return 'Erro no processamento';
                  default:
                    return 'Aguardando';
                }
              };

              return (
                <div key={index} className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon()}
                    <div>
                      <p className="text-sm font-medium text-gray-900">{file.name}</p>
                      <p className="text-xs text-gray-500">{getStatusText()}</p>
                    </div>
                  </div>
                  {file.processed && (
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Ver Detalhes
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-6 p-4 bg-white border border-gray-100 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Resumo do Processamento</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-700">XMLs processados:</span>
                <span className="font-medium ml-2">156</span>
              </div>
              <div>
                <span className="text-gray-700">Duplicatas geradas:</span>
                <span className="font-medium ml-2">143</span>
              </div>
              <div>
                <span className="text-gray-700">Valor total:</span>
                <span className="font-medium ml-2">R$ 2.8M</span>
              </div>
              <div>
                <span className="text-gray-700">Taxa de sucesso:</span>
                <span className="font-medium ml-2">94.8%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};