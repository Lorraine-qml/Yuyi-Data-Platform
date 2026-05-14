import { MapPin, Users, Calculator, AlertCircle } from 'lucide-react';

interface DataRowProps {
  label: string;
  value: string | number;
  unit?: string;
  highlight?: 'positive' | 'negative' | 'neutral';
}

function DataRow({ label, value, unit, highlight = 'neutral' }: DataRowProps) {
  const highlightColors = {
    positive: '#10B981',
    negative: '#EF4444',
    neutral: 'rgba(255, 255, 255, 0.85)',
  };

  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm" style={{ color: '#8C9AA6' }}>
        {label}
      </span>
      <span className="text-sm font-medium" style={{ color: highlightColors[highlight] }}>
        {value}{unit && <span className="text-xs ml-1" style={{ color: '#8C9AA6' }}>{unit}</span>}
      </span>
    </div>
  );
}

export function EnrollmentAnalysis() {
  return (
    <div className="glass-card p-6 animate-fade-in-up stagger-4">
      <h2 className="section-title flex items-center gap-2">
        <Users className="w-5 h-5" style={{ color: '#00D4FF' }} />
        学位供需与人口分析
      </h2>
      
      <div className="space-y-4">
        <div className="p-4 rounded-lg bg-white/5">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4" style={{ color: '#00D4FF' }} />
            <span className="text-sm font-medium text-white">服务学区范围</span>
          </div>
          <p className="text-sm pl-6" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            张江镇科苑路以东、高科中路以北区域
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-white/5">
            <div className="flex items-center gap-2 mb-3">
              <Calculator className="w-4 h-4" style={{ color: '#00D4FF' }} />
              <span className="text-sm font-medium text-white">小学学位分析</span>
            </div>
            <div className="pl-6 space-y-2">
              <DataRow label="学区适龄儿童数（6-11岁）" value="1,280" unit="人（2026年预测）" />
              <DataRow label="小学学位供给" value="36班 × 45 = 1,620" unit="个" />
              <DataRow label="小学学位缺口" value="-340" unit="（富余）" highlight="positive" />
            </div>
          </div>

          <div className="p-4 rounded-lg bg-white/5">
            <div className="flex items-center gap-2 mb-3">
              <Calculator className="w-4 h-4" style={{ color: '#00D4FF' }} />
              <span className="text-sm font-medium text-white">初中学位分析</span>
            </div>
            <div className="pl-6 space-y-2">
              <DataRow label="12-14岁人口" value="约620" unit="人" />
              <DataRow label="初中学位供给" value="24班 × 50 = 1,200" unit="个" />
              <DataRow label="初中学位缺口" value="-580" unit="（富余）" highlight="positive" />
            </div>
          </div>
        </div>

        <div className="p-3 rounded-lg flex items-start gap-2"
          style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)' }}
        >
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#F59E0B' }} />
          <div>
            <span className="text-sm font-medium" style={{ color: '#F59E0B' }}>整体评估：</span>
            <span className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
              学位相对宽裕，但生均面积偏低，需关注教室拥挤问题。
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
