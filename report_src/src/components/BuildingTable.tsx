import { useState } from 'react';
import { ArrowUpDown } from 'lucide-react';

interface Building {
  name: string;
  floors: number;
  structure: string;
  area: number;
  year: number;
  safetyLevel: 'A' | 'B' | 'C';
  usage: string;
}

const buildings: Building[] = [
  { name: '1号教学楼', floors: 5, structure: '框架', area: 4500, year: 2012, safetyLevel: 'A', usage: '教学' },
  { name: '2号教学楼', floors: 4, structure: '框架', area: 3800, year: 2012, safetyLevel: 'A', usage: '教学' },
  { name: '3号综合楼', floors: 6, structure: '框架', area: 5200, year: 2008, safetyLevel: 'C', usage: '行政' },
  { name: '食堂', floors: 2, structure: '框架', area: 1800, year: 2018, safetyLevel: 'B', usage: '生活' },
  { name: '体育馆', floors: 2, structure: '钢结构', area: 3600, year: 2018, safetyLevel: 'A', usage: '运动' },
  { name: '教职工宿舍', floors: 6, structure: '框架', area: 3500, year: 2012, safetyLevel: 'B', usage: '生活' },
];

type SortKey = keyof Building;
type SortOrder = 'asc' | 'desc';

export function BuildingTable() {
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const sortedBuildings = [...buildings].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    }
    
    const aStr = String(aVal);
    const bStr = String(bVal);
    return sortOrder === 'asc' 
      ? aStr.localeCompare(bStr, 'zh-CN')
      : bStr.localeCompare(aStr, 'zh-CN');
  });

  const getSafetyBadge = (level: 'A' | 'B' | 'C') => {
    const styles = {
      A: { bg: 'rgba(16, 185, 129, 0.2)', color: '#10B981', text: 'A级' },
      B: { bg: 'rgba(245, 158, 11, 0.2)', color: '#F59E0B', text: 'B级' },
      C: { bg: 'rgba(239, 68, 68, 0.2)', color: '#EF4444', text: 'C级' },
    };
    const style = styles[level];
    return (
      <span 
        className="px-2 py-0.5 rounded text-xs font-medium"
        style={{ background: style.bg, color: style.color }}
      >
        {style.text}
      </span>
    );
  };

  const SortableHeader = ({ label, sortKey: key }: { label: string; sortKey: SortKey }) => (
    <th 
      className="cursor-pointer select-none hover:bg-white/5 transition-colors"
      onClick={() => handleSort(key)}
    >
      <div className="flex items-center gap-1">
        {label}
        <ArrowUpDown className="w-3 h-3 opacity-50" />
      </div>
    </th>
  );

  return (
    <div className="glass-card p-6 animate-fade-in-up stagger-2">
      <h2 className="section-title">建筑明细</h2>
      <div className="overflow-x-auto rounded-lg border border-white/10">
        <table className="data-table">
          <thead>
            <tr>
              <SortableHeader label="建筑名称" sortKey="name" />
              <SortableHeader label="层数" sortKey="floors" />
              <SortableHeader label="结构" sortKey="structure" />
              <SortableHeader label="建筑面积" sortKey="area" />
              <SortableHeader label="建成年份" sortKey="year" />
              <SortableHeader label="安全等级" sortKey="safetyLevel" />
              <SortableHeader label="用途" sortKey="usage" />
            </tr>
          </thead>
          <tbody>
            {sortedBuildings.map((building) => (
              <tr key={building.name}>
                <td className="font-medium">{building.name}</td>
                <td>{building.floors}层</td>
                <td>{building.structure}</td>
                <td>{building.area.toLocaleString()} m²</td>
                <td>{building.year}</td>
                <td>{getSafetyBadge(building.safetyLevel)}</td>
                <td>{building.usage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
