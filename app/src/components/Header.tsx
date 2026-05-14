import { Download, Settings } from 'lucide-react';
import { toast } from 'sonner';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const handleExport = () => {
    toast.info('正在生成报告...', {
      description: '请稍候，报告生成后将自动下载',
    });
    setTimeout(() => {
      toast.success('报告已生成', {
        description: `${title}报告.pdf`,
      });
    }, 2000);
  };

  return (
    <header 
      className="h-14 flex items-center justify-between px-4 fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(0, 31, 60, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <div className="flex items-center gap-3">
        <div 
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #00D4FF, #0A4D8C)' }}
        >
          <span className="text-xs font-bold" style={{ color: '#001F3C' }}>智</span>
        </div>
        <div className="flex items-center gap-2">
          <h1 className="text-base font-semibold text-white whitespace-nowrap">智能分析管理大屏</h1>
          <span className="text-xs" style={{ color: '#8C9AA6' }}>{title}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button 
          onClick={handleExport}
          className="btn-secondary flex items-center gap-2 text-xs py-1.5 px-3"
        >
          <Download className="w-3.5 h-3.5" />
          导出报告
        </button>
        <button className="btn-secondary p-1.5">
          <Settings className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
}
