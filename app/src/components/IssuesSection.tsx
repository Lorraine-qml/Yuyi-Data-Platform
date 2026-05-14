import { AlertTriangle, CheckCircle2, AlertCircle } from 'lucide-react';

interface ProblemItemProps {
  text: string;
}

function ProblemItem({ text }: ProblemItemProps) {
  return (
    <div className="problem-card flex items-start gap-3">
      <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#EF4444' }} />
      <span className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
        {text}
      </span>
    </div>
  );
}

interface SuggestionItemProps {
  text: string;
}

function SuggestionItem({ text }: SuggestionItemProps) {
  return (
    <div className="suggestion-card flex items-start gap-3">
      <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#10B981' }} />
      <span className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
        {text}
      </span>
    </div>
  );
}

export function IssuesSection() {
  const problems = [
    '3号综合楼安全等级C级，需尽快加固',
    '生均建筑面积不达标，部分班级拥挤',
    '未来人口增长可能带来学位压力',
  ];

  const suggestions = [
    '立即启动3号综合楼结构加固工程，2026年内完成',
    '结合学校周边住宅开发，预留扩建用地，适时启动教学楼扩建',
    '加强生均面积监控，优化功能室布局',
  ];

  return (
    <div className="glass-card p-6 animate-fade-in-up stagger-8">
      <h2 className="section-title flex items-center gap-2">
        <AlertCircle className="w-5 h-5" style={{ color: '#00D4FF' }} />
        问题与建议
      </h2>
      
      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full" style={{ background: '#EF4444' }} />
            <span className="text-sm font-medium" style={{ color: '#EF4444' }}>
              存在问题
            </span>
          </div>
          <div className="space-y-3">
            {problems.map((problem, index) => (
              <ProblemItem key={index} text={problem} />
            ))}
          </div>
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full" style={{ background: '#10B981' }} />
            <span className="text-sm font-medium" style={{ color: '#10B981' }}>
              改进建议
            </span>
          </div>
          <div className="space-y-3">
            {suggestions.map((suggestion, index) => (
              <SuggestionItem key={index} text={suggestion} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
