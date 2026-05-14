import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { MetricCard } from '../MetricCard';
import { AMapComponent } from '../AMapComponent';
import { Building2, Wrench, Calendar, AlertTriangle, FileSpreadsheet } from 'lucide-react';
import { toast } from 'sonner';

const healthStats = {
  total: 286,
  green: 86,
  blue: 114,
  yellow: 57,
  red: 29,
};

const priorityList = [
  { id: 1, name: '3号综合楼', school: '张江高科实验学校', ppi: 68, level: 'C级', cost: '380万', action: '结构加固' },
  { id: 2, name: '食堂', school: '金桥实验中学', ppi: 62, level: 'C级', cost: '120万', action: '消防改造' },
  { id: 3, name: '1号教学楼', school: '川沙第一小学', ppi: 58, level: 'B级', cost: '85万', action: '外墙修缮' },
  { id: 4, name: '体育馆', school: '周浦中学', ppi: 54, level: 'B级', cost: '200万', action: '屋顶防水' },
  { id: 5, name: '教职工宿舍', school: '康桥实验小学', ppi: 48, level: 'B级', cost: '60万', action: '电路改造' },
];

const annualPlan = {
  budget: 5000,
  allocated: 3850,
  projects: [
    { name: '3号综合楼结构加固', cost: 380, priority: '高' },
    { name: '金桥实验中学消防改造', cost: 120, priority: '高' },
    { name: '川沙第一小学外墙修缮', cost: 85, priority: '中' },
    { name: '周浦中学屋顶防水', cost: 200, priority: '中' },
  ],
};

export function HealthModule() {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);
      const option: echarts.EChartsOption = {
        backgroundColor: 'transparent',
        series: [{
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['50%', '50%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 6,
            borderColor: '#001F3C',
            borderWidth: 2,
          },
          label: {
            show: true,
            position: 'outside',
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: 10,
            formatter: '{b}: {c}栋',
          },
          labelLine: {
            lineStyle: { color: 'rgba(255, 255, 255, 0.3)' },
          },
          data: [
            { value: healthStats.green, name: '优良', itemStyle: { color: '#10B981' } },
            { value: healthStats.blue, name: '良好', itemStyle: { color: '#3B82F6' } },
            { value: healthStats.yellow, name: '关注', itemStyle: { color: '#F59E0B' } },
            { value: healthStats.red, name: '危险', itemStyle: { color: '#EF4444' } },
          ],
        }],
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(0, 31, 60, 0.9)',
          borderColor: 'rgba(0, 212, 255, 0.3)',
          textStyle: { color: '#fff', fontSize: 11 },
          formatter: '{b}: {c}栋 ({d}%)',
        },
      };
      chart.setOption(option);

      const handleResize = () => chart.resize();
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
        chart.dispose();
      };
    }
  }, []);

  const handleGeneratePlan = () => {
    toast.info('正在生成年度计划表...');
    setTimeout(() => {
      toast.success('年度计划表已生成');
    }, 2000);
  };

  const budgetPercent = (annualPlan.allocated / annualPlan.budget) * 100;

  return (
    <div className="flex h-full w-full">
      <div className="flex-1 h-full">
        <AMapComponent module="health" />
      </div>

      <div 
        className="w-[400px] p-3 overflow-y-auto animate-slide-in-right flex-shrink-0"
        style={{ 
          background: 'rgba(0, 31, 60, 0.5)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div className="grid grid-cols-2 gap-2 mb-3">
          <MetricCard label="校舍总数" value={healthStats.total} suffix="栋" />
          <MetricCard label="优良(绿)" value={healthStats.green} suffix={`${Math.round(healthStats.green/healthStats.total*100)}%`} status="normal" />
          <MetricCard label="关注(黄)" value={healthStats.yellow} suffix={`${Math.round(healthStats.yellow/healthStats.total*100)}%`} status="warning" />
          <MetricCard label="危险(红)" value={healthStats.red} suffix={`${Math.round(healthStats.red/healthStats.total*100)}%`} status="danger" />
        </div>

        <div className="glass-card p-3 mb-3">
          <h3 className="section-title flex items-center gap-2 text-sm">
            <Building2 className="w-4 h-4" style={{ color: '#00D4FF' }} />
            校舍健康度分布
          </h3>
          <div ref={chartRef} style={{ height: '140px' }} />
        </div>

        <div className="glass-card p-3 mb-3">
          <h3 className="section-title flex items-center gap-2 text-sm">
            <AlertTriangle className="w-4 h-4" style={{ color: '#EF4444' }} />
            维修优先级 Top 10
          </h3>
          <div className="space-y-2 max-h-[180px] overflow-y-auto">
            {priorityList.map((item) => (
              <div 
                key={item.id} 
                className="p-2 rounded-lg text-xs"
                style={{ 
                  background: item.ppi >= 60 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)', 
                  border: `1px solid ${item.ppi >= 60 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(245, 158, 11, 0.2)'}` 
                }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-white">{item.name}</span>
                  <span className="font-bold" style={{ color: item.ppi >= 60 ? '#EF4444' : '#F59E0B' }}>
                    PPI {item.ppi}
                  </span>
                </div>
                <div style={{ color: '#8C9AA6' }}>
                  {item.school} · {item.level}
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span style={{ color: '#00D4FF' }}>
                    <Wrench className="w-3 h-3 inline mr-1" />
                    {item.action}
                  </span>
                  <span className="text-white">{item.cost}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-3 mb-3">
          <h3 className="section-title flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4" style={{ color: '#00D4FF' }} />
            年度计划建议
          </h3>
          
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs" style={{ color: '#8C9AA6' }}>预算使用</span>
              <span className="text-xs text-white">{annualPlan.allocated.toLocaleString()}万 / {annualPlan.budget.toLocaleString()}万</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ 
                  width: `${budgetPercent}%`,
                  background: 'linear-gradient(90deg, #00D4FF, #0A4D8C)',
                }}
              />
            </div>
            <div className="text-right text-xs mt-1" style={{ color: '#00D4FF' }}>
              {budgetPercent.toFixed(1)}%
            </div>
          </div>

          <div className="space-y-1">
            {annualPlan.projects.map((project, index) => (
              <div key={index} className="flex items-center justify-between py-1 text-xs" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                <span className="text-white">{project.name}</span>
                <div className="flex items-center gap-2">
                  <span className={`status-${project.priority === '高' ? 'danger' : 'warning'} text-xs`}>
                    {project.priority}
                  </span>
                  <span style={{ color: '#00D4FF' }}>{project.cost}万</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={handleGeneratePlan}
          className="btn-primary w-full flex items-center justify-center gap-2 text-xs"
        >
          <FileSpreadsheet className="w-3.5 h-3.5" />
          生成年度计划表
        </button>
      </div>
    </div>
  );
}
