import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { MetricCard } from '../MetricCard';
import { AMapComponent } from '../AMapComponent';
import { TrendingUp, FileText, Lightbulb } from 'lucide-react';
import { toast } from 'sonner';

type Scenario = 'low' | 'medium' | 'high';

const scenarios = {
  low: { name: '低增长', factor: 0.8 },
  medium: { name: '中增长', factor: 1.0 },
  high: { name: '高增长', factor: 1.3 },
};

const populationTrend = {
  years: ['2026', '2027', '2028', '2029', '2030'],
  kindergarten: [42000, 41500, 40800, 40000, 39200],
  primary: [68500, 71200, 73800, 76500, 79200],
  middle: [42800, 44500, 46200, 47800, 49500],
  high: [31200, 32500, 33800, 35100, 36400],
};

const demandForecast = [
  { year: 2026, demand: 184500, existing: 178000, need: 6500, action: '新建2所小学' },
  { year: 2027, demand: 189700, existing: 181000, need: 8700, action: '改扩建3所初中' },
  { year: 2028, demand: 194600, existing: 185000, need: 9600, action: '新建1所九年一贯' },
  { year: 2029, demand: 199400, existing: 190000, need: 9400, action: '新建2所小学' },
  { year: 2030, demand: 204300, existing: 195000, need: 9300, action: '改扩建2所高中' },
];

const longTermPlan = [
  { year: 2026, new: 2, expand: 1, investment: 12000 },
  { year: 2027, new: 1, expand: 3, investment: 15000 },
  { year: 2028, new: 2, expand: 2, investment: 18000 },
  { year: 2029, new: 2, expand: 1, investment: 14000 },
  { year: 2030, new: 1, expand: 2, investment: 16000 },
];

export function PopulationModule() {
  const chartRef = useRef<HTMLDivElement>(null);
  const [scenario, setScenario] = useState<Scenario>('medium');
  const [selectedYear, setSelectedYear] = useState(2026);

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);
      const factor = scenarios[scenario].factor;
      
      const option: echarts.EChartsOption = {
        backgroundColor: 'transparent',
        legend: {
          data: ['幼儿园', '小学', '初中', '高中'],
          textStyle: { color: 'rgba(255, 255, 255, 0.7)', fontSize: 9 },
          top: 0,
          itemWidth: 8,
          itemHeight: 8,
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
          data: populationTrend.years,
          axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
          axisLabel: { color: 'rgba(255, 255, 255, 0.7)', fontSize: 9 },
        },
        yAxis: {
          type: 'value',
          name: '人口数',
          nameTextStyle: { color: 'rgba(255, 255, 255, 0.5)', fontSize: 8 },
          axisLine: { show: false },
          axisLabel: { 
            color: 'rgba(255, 255, 255, 0.7)', 
            fontSize: 8,
            formatter: (value: number) => `${(value / 1000).toFixed(0)}k`,
          },
          splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } },
        },
        series: [
          {
            name: '幼儿园',
            data: populationTrend.kindergarten.map(v => Math.round(v * factor)),
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 4,
            lineStyle: { color: '#F59E0B', width: 2 },
            itemStyle: { color: '#F59E0B' },
          },
          {
            name: '小学',
            data: populationTrend.primary.map(v => Math.round(v * factor)),
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 4,
            lineStyle: { color: '#EF4444', width: 2 },
            itemStyle: { color: '#EF4444' },
          },
          {
            name: '初中',
            data: populationTrend.middle.map(v => Math.round(v * factor)),
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 4,
            lineStyle: { color: '#3B82F6', width: 2 },
            itemStyle: { color: '#3B82F6' },
          },
          {
            name: '高中',
            data: populationTrend.high.map(v => Math.round(v * factor)),
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 4,
            lineStyle: { color: '#10B981', width: 2 },
            itemStyle: { color: '#10B981' },
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
  }, [scenario]);

  const handleGenerateReport = () => {
    toast.info('正在生成中长期规划报告...');
    setTimeout(() => {
      toast.success('中长期规划报告已生成');
    }, 2000);
  };

  const totalInvestment = longTermPlan.reduce((sum, p) => sum + p.investment, 0);

  return (
    <div className="flex h-full w-full">
      <div className="flex-1 h-full relative">
        <AMapComponent module="population" selectedYear={selectedYear} scenario={scenario} />
        
        <div 
          className="absolute bottom-4 left-48 right-4 p-2 rounded-lg"
          style={{ 
            background: 'rgba(0, 31, 60, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div className="flex items-center gap-3">
            <span className="text-xs text-white whitespace-nowrap">预测年份:</span>
            <input
              type="range"
              min="2026"
              max="2030"
              step="1"
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="flex-1 h-1.5 rounded-lg appearance-none cursor-pointer"
              style={{ 
                background: `linear-gradient(90deg, #00D4FF 0%, #00D4FF ${((selectedYear - 2026) / 4 * 100)}%, rgba(255,255,255,0.2) ${((selectedYear - 2026) / 4 * 100)}%)`,
                outline: 'none',
              }}
            />
            <span className="text-sm font-bold whitespace-nowrap" style={{ color: '#00D4FF', minWidth: '50px' }}>
              {selectedYear}年
            </span>
          </div>
        </div>
      </div>

      <div 
        className="w-[400px] p-3 overflow-y-auto animate-slide-in-right flex-shrink-0"
        style={{ 
          background: 'rgba(0, 31, 60, 0.5)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div className="glass-card p-3 mb-3">
          <h3 className="text-sm font-medium text-white mb-2">情景模拟</h3>
          <div className="flex gap-2">
            {(Object.keys(scenarios) as Scenario[]).map((key) => (
              <button
                key={key}
                onClick={() => setScenario(key)}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                  scenario === key 
                    ? 'text-white' 
                    : 'text-white/60 hover:text-white/80'
                }`}
                style={{
                  background: scenario === key ? 'rgba(0, 212, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${scenario === key ? 'rgba(0, 212, 255, 0.5)' : 'rgba(255, 255, 255, 0.1)'}`,
                }}
              >
                {scenarios[key].name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3">
          <MetricCard label="2026年学龄人口" value="184,500" />
          <MetricCard label="2030年预测人口" value={scenarios[scenario].factor === 1 ? '204,300' : scenarios[scenario].factor === 0.8 ? '188,200' : '228,500'} />
          <MetricCard label="5年新增需求" value="19,800" trend={{ value: '10.7%', isUp: true }} status="warning" />
          <MetricCard label="规划总投资" value={`${Math.round(totalInvestment * scenarios[scenario].factor).toLocaleString()}万`} />
        </div>

        <div className="glass-card p-3 mb-3">
          <h3 className="section-title flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4" style={{ color: '#00D4FF' }} />
            学龄人口趋势
          </h3>
          <div ref={chartRef} style={{ height: '150px' }} />
        </div>

        <div className="glass-card p-3 mb-3">
          <h3 className="section-title text-sm">学位需求预测</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr style={{ color: '#8C9AA6' }}>
                  <th className="text-left py-1">年份</th>
                  <th className="text-right py-1">需求</th>
                  <th className="text-right py-1">缺口</th>
                  <th className="text-left py-1 pl-2">措施</th>
                </tr>
              </thead>
              <tbody>
                {demandForecast.map((item) => (
                  <tr key={item.year} className="border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                    <td className="py-1 text-white">{item.year}</td>
                    <td className="text-right py-1 text-white">{(item.demand * scenarios[scenario].factor / 1000).toFixed(1)}k</td>
                    <td className="text-right py-1" style={{ color: '#EF4444' }}>
                      +{Math.round(item.need * scenarios[scenario].factor / 1000)}k
                    </td>
                    <td className="py-1 pl-2" style={{ color: '#8C9AA6' }}>{item.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass-card p-3 mb-3">
          <h3 className="section-title flex items-center gap-2 text-sm">
            <Lightbulb className="w-4 h-4" style={{ color: '#00D4FF' }} />
            中长期规划方案
          </h3>
          <div className="space-y-1">
            {longTermPlan.map((plan) => (
              <div key={plan.year} className="flex items-center justify-between py-1 text-xs" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                <span className="text-white">{plan.year}年</span>
                <div className="flex items-center gap-2">
                  <span style={{ color: '#8C9AA6' }}>
                    新建{plan.new}所 · 改扩建{plan.expand}所
                  </span>
                  <span style={{ color: '#00D4FF' }}>
                    {Math.round(plan.investment * scenarios[scenario].factor / 10000).toFixed(1)}亿
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={handleGenerateReport}
          className="btn-primary w-full flex items-center justify-center gap-2 text-xs"
        >
          <FileText className="w-3.5 h-3.5" />
          生成中长期规划报告
        </button>
      </div>
    </div>
  );
}
