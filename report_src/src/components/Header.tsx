import { Download, Share2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface HeaderProps {
  onClose?: () => void;
}

export function Header({ onClose }: HeaderProps) {
  const handleDownload = () => {
    toast.info('正在生成PDF报告...', {
      description: '请稍候，报告生成后将自动下载',
    });
    setTimeout(() => {
      toast.success('PDF报告已生成', {
        description: '张江高科实验学校一校一档报告.pdf',
      });
    }, 2000);
  };

  const handleShare = () => {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl).then(() => {
      toast.success('分享链接已复制', {
        description: '链接已复制到剪贴板',
      });
    });
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 z-50 flex items-center justify-between px-6"
      style={{
        background: 'rgba(0, 31, 60, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold text-white">
          张江高科实验学校一校一档报告
        </h1>
        <span 
          className="px-2 py-0.5 rounded text-xs"
          style={{
            background: 'rgba(0, 212, 255, 0.1)',
            border: '1px solid rgba(0, 212, 255, 0.3)',
            color: '#00D4FF',
          }}
        >
          PDSJY-20260401-001
        </span>
      </div>

      <div className="text-sm" style={{ color: '#8C9AA6' }}>
        2026年04月01日生成
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={handleDownload}
          className="flex items-center gap-2 text-white border-white/20 hover:bg-white/10 hover:border-cyan-400/50"
        >
          <Download className="w-4 h-4" />
          下载PDF
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleShare}
          className="flex items-center gap-2 text-white border-white/20 hover:bg-white/10 hover:border-cyan-400/50"
        >
          <Share2 className="w-4 h-4" />
          分享报告
        </Button>
        <button
          onClick={onClose}
          className="p-2 rounded-lg text-white/60 hover:text-red-400 hover:bg-red-400/10 transition-all duration-200"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
