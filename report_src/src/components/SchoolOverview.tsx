import { MapPin, Ruler, Building2, Phone, User, Hash } from 'lucide-react';

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
      <div className="mt-0.5" style={{ color: '#00D4FF' }}>
        {icon}
      </div>
      <div>
        <div className="text-xs mb-1" style={{ color: '#8C9AA6' }}>
          {label}
        </div>
        <div className="text-sm text-white">
          {value}
        </div>
      </div>
    </div>
  );
}

export function SchoolOverview() {
  const infoItems = [
    {
      icon: <Building2 className="w-4 h-4" />,
      label: '学校名称',
      value: '张江高科实验学校（九年一贯制公办）',
    },
    {
      icon: <Hash className="w-4 h-4" />,
      label: '学校编码',
      value: 'SCH3101150001',
    },
    {
      icon: <MapPin className="w-4 h-4" />,
      label: '地址',
      value: '上海市浦东新区张江镇学林路699号',
    },
    {
      icon: <Ruler className="w-4 h-4" />,
      label: '占地面积',
      value: '42,300 m²',
    },
    {
      icon: <Building2 className="w-4 h-4" />,
      label: '建筑面积',
      value: '28,560 m²',
    },
    {
      icon: <Building2 className="w-4 h-4" />,
      label: '建筑数量',
      value: '6栋（教学楼3栋、综合楼1栋、食堂1栋、宿舍楼1栋）',
    },
    {
      icon: <User className="w-4 h-4" />,
      label: '校长',
      value: '王志明',
    },
    {
      icon: <Phone className="w-4 h-4" />,
      label: '联系电话',
      value: '021-50804699',
    },
  ];

  return (
    <div className="glass-card p-6 animate-fade-in-up stagger-1">
      <h2 className="section-title">学校概况</h2>
      <div className="grid grid-cols-4 gap-2">
        {infoItems.map((item) => (
          <InfoItem key={item.label} {...item} />
        ))}
      </div>
    </div>
  );
}
