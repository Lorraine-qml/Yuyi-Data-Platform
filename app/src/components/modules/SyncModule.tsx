import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { MetricCard } from '../MetricCard';
import { AMapComponent } from '../AMapComponent';
import { Link2, AlertCircle, Send, FileText, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

const syncStats = {
  residential: 156,
  school: 142,
  sync: 98,
  lagging: 58,
};

const fiveSync = [
  { phase: '规划阶段', rate: 85 },
  { phase: '设计阶段', rate: 78 },
  { phase: '建设阶段', rate: 72 },
  { phase: '竣工阶段', rate: 65 },
  { phase: '交付阶段', rate: 58 },
];

const laggingList = [
  { id: 1, name: '川沙新城', developer: '万科地产', school: '川沙实验小学', lagMonths: 8 },
  { id: 2, name: '金桥国际社区', developer: '绿地集团', school: '金桥实验中学', lagMonths: 5 },
  { id: 3, name: '康桥半岛', developer: '保利发展', school: '康桥中心小学', lagMonths: 4 },
  { id: 4, name: '周浦花园二期', developer: '龙湖地产', school: '周浦中学', lagMonths: 3 },
];

const progressData = {
  months: ['2024-01', '2024-03', '2024-05', '2024-07', '2024-09', '2024-11'],
  residential: [20, 35, 50, 65, 80, 92],
  school: [15, 30, 42, 55, 68, 75],
};

export function SyncModule() {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);
      const option: echarts.EChartsOption = {
        backgroundColor: 'transparent',
        legend: {
          data: ['住宅进度', '学校进度'],
          textStyle: { color: 'rgba(255, 255, 255, 0.7)', fontSize: 9 },
          top: 0,
          itemWidth: 10,
          itemHeight: 10,
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '18%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: progressData.months,
          axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
          axisLabel: { color: 'rgba(255, 255, 255, 0.7)', fontSize: 8 },
        },
        yAxis: {
          type: 'value',
          name: '完成率%',
          nameTextStyle: { color: 'rgba(255, 255, 255, 0.5)', fontSize: 8 },
          axisLine: { show: false },
          axisLabel: { color: 'rgba(255, 255, 255, 0.7)', fontSize: 8 },
          splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } },
        },
        series: [
          {
            name: '住宅进度',
            data: progressData.residential,
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            lineStyle: { color: '#3B82F6', width: 2 },
            itemStyle: { color: '#3B82F6' },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(59, 130, 246, 0.3)' },
                { offset: 1, color: 'rgba(59, 130, 246, 0)' },
              ]),
            },
          },
          {
            name: '学校进度',
            data: progressData.school,
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            lineStyle: { color: '#00D4FF', width: 2 },
            itemStyle: { color: '#00D4FF' },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(0, 212, 255, 0.3)' },
                { offset: 1, color: 'rgba(0, 212, 255, 0)' },
              ]),
            },
          },
        ],
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0, 31, 60, 0.9)',
          borderColor: 'rgba(0, 212, 255, 0.3)',
          textStyle: { color: '#fff', fontSize: 10 },
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

  const handleSupervise = (project: typeof laggingList[0]) => {
    toast.info(`正在发送督办通知: ${project.name}`);
    setTimeout(() => {
      toast.success('督办通知已推送', {
        description: `开发商: ${project.developer}`,
      });
    }, 1500);
  };

  const handleGenerateReport = () => {
    toast.info('正在生成滞后报告...');
    setTimeout(() => {
      toast.success('滞后报告已生成');
    }, 2000);
  };

  return (
    <div className="flex h-full w-full">
      <div className="flex-1 h-full">
        <AMapComponent module="sync" />
      </div>

      <div 
        className="w-[400px] p-3 overflow-y-auto animate-slide-in-right flex-shrink-0"
        style={{ 
          background: 'rgba(0, 31, 60, 0.5)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div className="grid grid-cols-2 gap-2 mb-3">
          <MetricCard label="住宅项目数" value={syncStats.residential} suffix="个" />
          <MetricCard label="配套学校项目" value={syncStats.school} suffix="个" />
          <MetricCard label="同步项目" value={syncStats.sync} suffix={`${Math.round(syncStats.sync/syncStats.residential*100)}%`} status="normal" />
          <MetricCard label="滞后项目" value={syncStats.lagging} suffix={`${Math.round(syncStats.lagging/syncStats.residential*100)}%`} status="danger" />
        </div>

        <div className="glass-card p-3 mb-3">
          <h3 className="section-title flex items-center gap-2 text-sm">
            <Link2 className="w-4 h-4" style={{ color: '#00D4FF' }} />
            五同步评估
          </h3>
          <div className="space-y-2">
            {fiveSync.map((item) => (
              <div key={item.phase}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-white">{item.phase}</span>
                  <span className="text-xs" style={{ color: item.rate >= 80 ? '#10B981' : item.rate >= 60 ? '#F59E0B' : '#EF4444' }}>
                    {item.rate}%
                  </span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ 
                      width: `${item.rate}%`,
                      background: item.rate >= 80 ? '#10B981' : item.rate >= 60 ? '#F59E0B' : '#EF4444',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-3 mb-3">
          <h3 className="section-title flex items-center gap-2 text-sm">
            <AlertCircle className="w-4 h-4" style={{ color: '#EF4444' }} />
            滞后项目清单
          </h3>
          <div className="space-y-2 max-h-[150px] overflow-y-auto">
            {laggingList.map((item) => (
              <div 
                key={item.id} 
                className="p-2 rounded-lg text-xs"
                style={{ 
                  background: item.lagMonths > 6 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)', 
                  border: `1px solid ${item.lagMonths > 6 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(245, 158, 11, 0.2)'}` 
                }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-white">{item.name}</span>
                  <span className={`status-${item.lagMonths > 6 ? 'danger' : 'warning'} text-xs`}>
                    滞后{item.lagMonths}月
                  </span>
                </div>
                <div style={{ color: '#8C9AA6' }}>
                  {item.developer} · 配套: {item.school}
                </div>
                <div className="flex justify-end mt-1">
                  <button 
                    onClick={() => handleSupervise(item)}
                    className="btn-danger flex items-center gap-1 text-xs py-1 px-2"
                  >
                    <Send className="w-3 h-3" />
                    督办
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-3 mb-3">
          <h3 className="section-title flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4" style={{ color: '#00D4FF' }} />
            双线对比图
          </h3>
          <div ref={chartRef} style={{ height: '140px' }} />
        </div>

        <button 
          onClick={handleGenerateReport}
          className="btn-primary w-full flex items-center justify-center gap-2 text-xs"
        >
          <FileText className="w-3.5 h-3.5" />
          生成滞后报告
        </button>
      </div>
    </div>
  );
}
