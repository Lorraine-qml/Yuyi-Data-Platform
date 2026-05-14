import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { MetricCard } from '../MetricCard';
import { AMapComponent } from '../AMapComponent';
import { MapPin, AlertTriangle, Lightbulb, FileText } from 'lucide-react';
import { toast } from 'sonner';

const townRanking = [
  { name: '张江', gap: 680 },
  { name: '金桥', gap: 420 },
  { name: '康桥', gap: 320 },
  { name: '川沙', gap: 280 },
  { name: '周浦', gap: 150 },
];

const warningList = [
  { id: 1, school: '张江中心小学', pressure: '严重', students: 2840, capacity: 1620 },
  { id: 2, school: '金桥实验中学', pressure: '中等', students: 1860, capacity: 1200 },
  { id: 3, area: '川沙新城地块', issue: '周边3km无学校', affected: 2400 },
];

const suggestions = [
  { town: '张江', action: '新建', type: '36班小学', land: '规划用地A', priority: '高' },
  { town: '金桥', action: '改扩建', type: '24班初中', land: '现有校区', priority: '高' },
  { town: '康桥', action: '新建', type: '30班九年一贯', land: '规划用地B', priority: '中' },
];

export function EnrollmentModule() {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);
      const option: echarts.EChartsOption = {
        backgroundColor: 'transparent',
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '10%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: townRanking.map(t => t.name),
          axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
          axisLabel: { color: 'rgba(255, 255, 255, 0.7)', fontSize: 11 },
        },
        yAxis: {
          type: 'value',
          name: '缺口人数',
          nameTextStyle: { color: 'rgba(255, 255, 255, 0.5)', fontSize: 10 },
          axisLine: { show: false },
          axisLabel: { color: 'rgba(255, 255, 255, 0.7)', fontSize: 10 },
          splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } },
        },
        series: [{
          data: townRanking.map(t => ({
            value: t.gap,
            itemStyle: {
              color: t.gap > 500 ? '#EF4444' : t.gap > 200 ? '#F97316' : '#F59E0B',
            },
          })),
          type: 'bar',
          barWidth: '50%',
          label: {
            show: true,
            position: 'top',
            color: '#fff',
            fontSize: 10,
          },
        }],
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0, 31, 60, 0.9)',
          borderColor: 'rgba(0, 212, 255, 0.3)',
          textStyle: { color: '#fff', fontSize: 12 },
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
    toast.info('正在生成布点规划图...');
    setTimeout(() => {
      toast.success('布点规划图已生成');
    }, 2000);
  };

  return (
    <div className="flex h-full w-full">
      <div className="flex-1 h-full">
        <AMapComponent module="enrollment" />
      </div>

      <div 
        className="w-[400px] p-3 overflow-y-auto animate-slide-in-right flex-shrink-0"
        style={{ 
          background: 'rgba(0, 31, 60, 0.5)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div className="grid grid-cols-2 gap-2 mb-3">
          <MetricCard label="总需求学位" value="125,680" />
          <MetricCard label="总供给学位" value="118,420" />
          <MetricCard 
            label="总缺口" 
            value="7,260" 
            trend={{ value: '12.3%', isUp: true, label: '较上年' }}
            status="danger"
          />
          <MetricCard label="缺口最大学段" value="小学" />
        </div>

        <div className="glass-card p-3 mb-3">
          <h3 className="section-title flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4" style={{ color: '#00D4FF' }} />
            街镇缺口排行
          </h3>
          <div ref={chartRef} style={{ height: '140px' }} />
        </div>

        <div className="glass-card p-3 mb-3">
          <h3 className="section-title flex items-center gap-2 text-sm">
            <AlertTriangle className="w-4 h-4" style={{ color: '#F59E0B' }} />
            预警清单
          </h3>
          <div className="space-y-2">
            {warningList.map((item) => (
              <div 
                key={item.id} 
                className="p-2 rounded-lg text-xs"
                style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.2)' }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-white">{item.school || item.area}</span>
                  {item.pressure && (
                    <span className="status-danger text-xs">{item.pressure}</span>
                  )}
                </div>
                <div style={{ color: '#8C9AA6' }}>
                  {item.students ? (
                    <>学生 {item.students.toLocaleString()} / 容量 {item.capacity?.toLocaleString()}</>
                  ) : (
                    <>{item.issue} · 影响 {item.affected}户</>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-3 mb-3">
          <h3 className="section-title flex items-center gap-2 text-sm">
            <Lightbulb className="w-4 h-4" style={{ color: '#00D4FF' }} />
            布点建议
          </h3>
          <div className="space-y-2">
            {suggestions.map((item, index) => (
              <div key={index} className="p-2 rounded-lg text-xs" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-white">{item.town}</span>
                  <span className={`status-${item.priority === '高' ? 'danger' : 'warning'} text-xs`}>
                    {item.priority}优先级
                  </span>
                </div>
                <div className="mt-1" style={{ color: '#8C9AA6' }}>
                  {item.action}{item.type} · {item.land}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={handleGeneratePlan}
          className="btn-primary w-full flex items-center justify-center gap-2 text-xs"
        >
          <FileText className="w-3.5 h-3.5" />
          生成布点规划图
        </button>
      </div>
    </div>
  );
}
