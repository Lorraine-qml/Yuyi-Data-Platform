import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  trend?: {
    value: string;
    isUp: boolean;
    label?: string;
  };
  status?: 'normal' | 'warning' | 'danger';
  suffix?: string;
}

export function MetricCard({ label, value, trend, status = 'normal', suffix }: MetricCardProps) {
  const statusColors = {
    normal: '#00D4FF',
    warning: '#F59E0B',
    danger: '#EF4444',
  };

  return (
    <div className="glass-card p-3 animate-fade-in-up">
      <div className="metric-label mb-1 whitespace-nowrap">{label}</div>
      <div className="flex items-baseline gap-1 flex-wrap">
        <span 
          className="text-xl font-bold whitespace-nowrap"
          style={{ 
            color: statusColors[status],
            fontFamily: '"DIN Alternate", "Roboto Mono", monospace'
          }}
        >
          {value}
        </span>
        {suffix && (
          <span className="text-xs whitespace-nowrap" style={{ color: '#8C9AA6' }}>{suffix}</span>
        )}
      </div>
      {trend && (
        <div className="flex items-center gap-1 mt-1 text-xs whitespace-nowrap">
          <span className={trend.isUp ? 'text-emerald-400' : 'text-rose-400'}>
            {trend.isUp ? <TrendingUp className="w-3 h-3 inline" /> : <TrendingDown className="w-3 h-3 inline" />}
            {trend.value}
          </span>
          {trend.label && (
            <span style={{ color: '#8C9AA6' }}>{trend.label}</span>
          )}
        </div>
      )}
    </div>
  );
}
