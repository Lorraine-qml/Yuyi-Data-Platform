import { FileText, CheckCircle } from 'lucide-react';

interface InfoRowProps {
  label: string;
  value: string;
  isTag?: boolean;
  tagType?: 'success' | 'warning' | 'danger';
}

function InfoRow({ label, value, isTag, tagType = 'success' }: InfoRowProps) {
  const tagStyles = {
    success: { bg: 'rgba(16, 185, 129, 0.2)', color: '#10B981' },
    warning: { bg: 'rgba(245, 158, 11, 0.2)', color: '#F59E0B' },
    danger: { bg: 'rgba(239, 68, 68, 0.2)', color: '#EF4444' },
  };

  return (
    <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
      <span className="text-sm" style={{ color: '#8C9AA6' }}>
        {label}
      </span>
      {isTag ? (
        <span 
          className="px-2 py-0.5 rounded text-xs font-medium flex items-center gap-1"
          style={{ background: tagStyles[tagType].bg, color: tagStyles[tagType].color }}
        >
          <CheckCircle className="w-3 h-3" />
          {value}
        </span>
      ) : (
        <span className="text-sm text-white font-medium">
          {value}
        </span>
      )}
    </div>
  );
}

export function LandInfo() {
  const landData = [
    { label: '土地证号', value: '沪房地浦字（2010）第001234号' },
    { label: '用地性质', value: '教育科研用地' },
    { label: '土地面积', value: '42,300 m²' },
    { label: '产权状态', value: '国有划拨，权证齐全', isTag: true, tagType: 'success' as const },
    { label: '土地规划许可', value: '沪规地（2010）第5678号' },
    { label: '工程规划许可', value: '沪规建（2011）第1234号' },
    { label: '施工许可证', value: '3101152011123456' },
    { label: '竣工备案', value: '沪浦备（2013）第089号' },
  ];

  return (
    <div className="glass-card p-6 animate-fade-in-up stagger-3">
      <h2 className="section-title flex items-center gap-2">
        <FileText className="w-5 h-5" style={{ color: '#00D4FF' }} />
        土地与产权信息
      </h2>
      <div className="grid grid-cols-2 gap-x-8">
        {landData.map((item) => (
          <InfoRow key={item.label} {...item} />
        ))}
      </div>
    </div>
  );
}
