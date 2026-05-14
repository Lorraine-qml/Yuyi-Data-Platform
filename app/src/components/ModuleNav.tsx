import { GraduationCap, Building2, Link2, TrendingUp } from 'lucide-react';

type ModuleType = 'enrollment' | 'health' | 'sync' | 'population';

interface ModuleNavProps {
  activeModule: ModuleType;
  onModuleChange: (module: ModuleType) => void;
}

const modules = [
  { id: 'enrollment' as ModuleType, label: '学位供需', icon: GraduationCap },
  { id: 'health' as ModuleType, label: '校舍健康', icon: Building2 },
  { id: 'sync' as ModuleType, label: '配套同步', icon: Link2 },
  { id: 'population' as ModuleType, label: '人口预测', icon: TrendingUp },
];

export function ModuleNav({ activeModule, onModuleChange }: ModuleNavProps) {
  return (
    <nav 
      className="fixed left-0 top-14 bottom-0 w-16 z-40 flex flex-col py-2 animate-slide-in-left"
      style={{
        background: 'rgba(10, 26, 47, 0.9)',
        borderRight: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      {modules.map((module) => {
        const Icon = module.icon;
        const isActive = activeModule === module.id;
        
        return (
          <button
            key={module.id}
            onClick={() => onModuleChange(module.id)}
            className={`nav-item ${isActive ? 'active' : ''}`}
          >
            <Icon className="w-5 h-5 mb-1" />
            <span className="text-[10px] whitespace-nowrap">{module.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export type { ModuleType };
