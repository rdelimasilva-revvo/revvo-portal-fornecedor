import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color: 'blue' | 'green' | 'yellow' | 'red';
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color
}) => {
  const getTrendColor = () => {
    if (!trend) return '';
    return trend.isPositive ? 'sap-metric-trend positive' : 'sap-metric-trend negative';
  };

  return (
    <div className="sap-metric-tile">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="sap-metric-label mb-1">{title}</div>
          <div className="sap-metric-value">{value}</div>
          {subtitle && (
            <div className="sap-subtitle mt-1">{subtitle}</div>
          )}
        </div>
        <div className="ml-4">
          <Icon className="w-6 h-6 text-gray-400" />
        </div>
      </div>
      
      {trend && (
        <div className={getTrendColor()}>
          <span>{trend.isPositive ? '+' : ''}{trend.value}%</span>
          <span className="ml-1 opacity-70">vs. mês anterior</span>
        </div>
      )}
    </div>
  );
};