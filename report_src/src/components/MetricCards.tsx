import { TrendingUp, TrendingDown, Users, Building, Ruler, Shield } from 'lucide-react';

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend?: {
    value: string;
    isUp: boolean;
  };
  detail?: string;
  status: 'normal' | 'warning' | 'danger';
  statusText: string;
}

function MetricCard({ icon, label, value, trend, detail, status, statusText }: MetricCardProps) {
  const statusClasses = {
    normal: 'status-normal',
    warning: 'status-warning',
    danger: 'status-danger',
  };

  return (
    <div className="glass-card p-5 animate-fade-in-up">
      <div className="flex items-start justify-between mb-3">
        <div 
          className="p-2 rounded-lg"
          style={{ background: 'rgba(0, 212, 255, 0.1)' }}
        >
          {icon}
        </div>
        <span className={statusClasses[status]}>{statusText}</span>
      </div>
      <div className="mb-1">
        <span className="metric-value">{value}</span>
      </div>
      <div className="text-sm mb-2" style={{ color: '#8C9AA6' }}>
        {label}
      </div>
      {(trend || detail) && (
        <div className="flex items-center gap-2 text-xs">
          {trend && (
            <span className={`flex items-center gap-1 ${trend.isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
              {trend.isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {trend.value}
            </span>
          )}
          {detail && (
            <span style={{ color: '#8C9AA6' }}>{detail}</span>
          )}
        </div>
      )}
    </div>
  );
}

export function MetricCards() {
  const metrics = [
    {
      icon: <Users className="w-5 h-5" style={{ color: '#00D4FF' }} />,
      label: '在校学生总数',
      value: '2,840',
      trend: { value: '5.2%', isUp: true },
      detail: '较上年增长',
      status: 'normal' as const,
      statusText: '正常',
    },
    {
      icon: <Building className="w-5 h-5" style={{ color: '#00D4FF' }} />,
      label: '班级数量',
      value: '60班',
      detail: '小学36班 / 初中24班',
      status: 'normal' as const,
      statusText: '正常',
    },
    {
      icon: <Ruler className="w-5 h-5" style={{ color: '#00D4FF' }} />,
      label: '生均建筑面积',
      value: '10.05m²',
      detail: '标准11m²，不达标',
      status: 'warning' as const,
      statusText: '需关注',
    },
    {
      icon: <Shield className="w-5 h-5" style={{ color: '#00D4FF' }} />,
      label: '安全健康评分',
      value: 'PPI 42.6',
      detail: '黄色预警',
      status: 'warning' as const,
      statusText: '需关注',
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <div key={metric.label} className={`stagger-${index + 1}`}>
          <MetricCard {...metric} />
        </div>
      ))}
    </div>
  );
}
