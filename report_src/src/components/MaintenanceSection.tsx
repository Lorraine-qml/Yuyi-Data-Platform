import { AlertTriangle, Wrench, DollarSign, Calendar } from 'lucide-react';

interface MaintenanceItemProps {
  title: string;
  building: string;
  year: number;
  level: string;
  suggestion: string;
  cost: string;
  priority: 'high' | 'medium' | 'low';
}

function MaintenanceItem({ title, building, year, level, suggestion, cost, priority }: MaintenanceItemProps) {
  const priorityConfig = {
    high: { color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)', border: 'rgba(239, 68, 68, 0.3)', text: '高' },
    medium: { color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)', border: 'rgba(245, 158, 11, 0.3)', text: '中' },
    low: { color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)', border: 'rgba(16, 185, 129, 0.3)', text: '低' },
  };

  const config = priorityConfig[priority];

  return (
    <div 
      className="p-4 rounded-lg"
      style={{ background: config.bg, border: `1px solid ${config.border}` }}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <Wrench className="w-4 h-4" style={{ color: config.color }} />
          <span className="text-sm font-medium text-white">{title}</span>
        </div>
        <span 
          className="px-2 py-0.5 rounded text-xs font-medium"
          style={{ background: config.color + '30', color: config.color }}
        >
          优先级{config.text}
        </span>
      </div>
      <div className="pl-6 space-y-1">
        <div className="text-xs" style={{ color: '#8C9AA6' }}>
          {building}（{year}年建成，{level}）
        </div>
        <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
          建议：{suggestion}
        </div>
        <div className="flex items-center gap-1 text-sm" style={{ color: '#00D4FF' }}>
          <DollarSign className="w-3 h-3" />
          估算费用：{cost}
        </div>
      </div>
    </div>
  );
}

export function MaintenanceSection() {
  const maintenanceItems = [
    {
      title: '结构加固工程',
      building: '3号综合楼',
      year: 2008,
      level: 'C级',
      suggestion: '进行结构加固',
      cost: '380万元',
      priority: 'high' as const,
    },
    {
      title: '消防设施改造',
      building: '食堂及宿舍',
      year: 2018,
      level: 'B级',
      suggestion: '增设消防设施',
      cost: '80万元',
      priority: 'medium' as const,
    },
  ];

  return (
    <div className="glass-card p-6 animate-fade-in-up stagger-6">
      <h2 className="section-title flex items-center gap-2">
        <AlertTriangle className="w-5 h-5" style={{ color: '#00D4FF' }} />
        校舍健康与维修建议
      </h2>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        {maintenanceItems.map((item) => (
          <MaintenanceItem key={item.title} {...item} />
        ))}
      </div>

      <div 
        className="p-4 rounded-lg"
        style={{ background: 'rgba(0, 212, 255, 0.05)', border: '1px solid rgba(0, 212, 255, 0.2)' }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="w-4 h-4" style={{ color: '#00D4FF' }} />
          <span className="text-sm font-medium text-white">年度维修计划</span>
        </div>
        <div className="pl-6 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: '#8C9AA6' }}>总预算</span>
            <span className="text-sm font-medium" style={{ color: '#00D4FF' }}>500万元</span>
          </div>
          <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
            优先安排3号综合楼加固，其次为食堂消防改造
          </div>
        </div>
      </div>
    </div>
  );
}
