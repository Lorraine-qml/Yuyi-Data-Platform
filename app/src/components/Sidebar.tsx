import { useEffect, useState } from 'react';

interface SidebarProps {
  activeSection: string;
}

const menuItems = [
  { id: 'overview', label: '学校概况' },
  { id: 'metrics', label: '核心指标汇总' },
  { id: 'buildings', label: '建筑明细' },
  { id: 'land', label: '土地与产权信息' },
  { id: 'enrollment', label: '学位供需分析' },
  { id: 'charts', label: '数据分析图表' },
  { id: 'maintenance', label: '校舍健康与维修' },
  { id: 'gis', label: 'GIS空间布局' },
  { id: 'issues', label: '问题与建议' },
];

export function Sidebar({ activeSection }: SidebarProps) {
  const [currentSection, setCurrentSection] = useState(activeSection);

  useEffect(() => {
    setCurrentSection(activeSection);
  }, [activeSection]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 88;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <aside 
      className="fixed left-0 top-16 bottom-0 w-64 overflow-y-auto animate-slide-in-left"
      style={{
        background: 'rgba(10, 26, 47, 0.8)',
        borderRight: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <nav className="py-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={`sidebar-item w-full text-left transition-all duration-300 ${
              currentSection === item.id ? 'active' : ''
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
