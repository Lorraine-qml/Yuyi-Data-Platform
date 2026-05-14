import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { BarChart3, TrendingUp, PieChart } from 'lucide-react';

export function ChartsSection() {
  const safetyChartRef = useRef<HTMLDivElement>(null);
  const trendChartRef = useRef<HTMLDivElement>(null);
  const usageChartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (safetyChartRef.current) {
      const safetyChart = echarts.init(safetyChartRef.current);
      const safetyOption: echarts.EChartsOption = {
        backgroundColor: 'transparent',
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '15%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: ['A级', 'B级', 'C级'],
          axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
          axisLabel: { color: 'rgba(255, 255, 255, 0.7)' },
        },
        yAxis: {
          type: 'value',
          name: '建筑数量',
          nameTextStyle: { color: 'rgba(255, 255, 255, 0.7)' },
          axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
          axisLabel: { color: 'rgba(255, 255, 255, 0.7)' },
          splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } },
        },
        series: [{
          data: [
            { value: 3, itemStyle: { color: '#10B981' } },
            { value: 2, itemStyle: { color: '#F59E0B' } },
            { value: 1, itemStyle: { color: '#EF4444' } },
          ],
          type: 'bar',
          barWidth: '50%',
          label: {
            show: true,
            position: 'top',
            color: '#fff',
          },
        }],
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0, 31, 60, 0.9)',
          borderColor: 'rgba(0, 212, 255, 0.3)',
          textStyle: { color: '#fff' },
        },
      };
      safetyChart.setOption(safetyOption);

      const handleResize = () => safetyChart.resize();
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
        safetyChart.dispose();
      };
    }
  }, []);

  useEffect(() => {
    if (trendChartRef.current) {
      const trendChart = echarts.init(trendChartRef.current);
      const trendOption: echarts.EChartsOption = {
        backgroundColor: 'transparent',
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '15%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: ['2022', '2023', '2024', '2025', '2026'],
          axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
          axisLabel: { color: 'rgba(255, 255, 255, 0.7)' },
        },
        yAxis: {
          type: 'value',
          name: '学生人数',
          min: 2000,
          nameTextStyle: { color: 'rgba(255, 255, 255, 0.7)' },
          axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
          axisLabel: { color: 'rgba(255, 255, 255, 0.7)' },
          splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } },
        },
        series: [{
          data: [2450, 2580, 2680, 2760, 2840],
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 8,
          lineStyle: {
            color: '#00D4FF',
            width: 3,
          },
          itemStyle: {
            color: '#00D4FF',
            borderColor: '#fff',
            borderWidth: 2,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(0, 212, 255, 0.3)' },
              { offset: 1, color: 'rgba(0, 212, 255, 0)' },
            ]),
          },
        }],
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0, 31, 60, 0.9)',
          borderColor: 'rgba(0, 212, 255, 0.3)',
          textStyle: { color: '#fff' },
        },
      };
      trendChart.setOption(trendOption);

      const handleResize = () => trendChart.resize();
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
        trendChart.dispose();
      };
    }
  }, []);

  useEffect(() => {
    if (usageChartRef.current) {
      const usageChart = echarts.init(usageChartRef.current);
      const usageOption: echarts.EChartsOption = {
        backgroundColor: 'transparent',
        series: [{
          type: 'pie',
          radius: ['45%', '70%'],
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
            formatter: '{b}: {c}栋',
          },
          labelLine: {
            lineStyle: { color: 'rgba(255, 255, 255, 0.3)' },
          },
          data: [
            { value: 2, name: '教学', itemStyle: { color: '#3B82F6' } },
            { value: 1, name: '行政', itemStyle: { color: '#00D4FF' } },
            { value: 2, name: '生活', itemStyle: { color: '#F59E0B' } },
            { value: 1, name: '运动', itemStyle: { color: '#10B981' } },
          ],
        }],
        graphic: [{
          type: 'text',
          left: 'center',
          top: 'center',
          style: {
            text: '6栋',
            fill: '#fff',
            fontSize: 24,
            fontWeight: 'bold',
          },
        }, {
          type: 'text',
          left: 'center',
          top: '55%',
          style: {
            text: '总建筑数',
            fill: 'rgba(255, 255, 255, 0.6)',
            fontSize: 12,
          },
        }],
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(0, 31, 60, 0.9)',
          borderColor: 'rgba(0, 212, 255, 0.3)',
          textStyle: { color: '#fff' },
          formatter: '{b}: {c}栋 ({d}%)',
        },
      };
      usageChart.setOption(usageOption);

      const handleResize = () => usageChart.resize();
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
        usageChart.dispose();
      };
    }
  }, []);

  return (
    <div className="glass-card p-6 animate-fade-in-up stagger-5">
      <h2 className="section-title">数据分析图表</h2>
      <div className="grid grid-cols-3 gap-6">
        <div className="chart-container p-5">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4" style={{ color: '#00D4FF' }} />
            <span className="text-sm font-medium text-white">建筑安全等级分布</span>
          </div>
          <div ref={safetyChartRef} style={{ height: '240px' }} />
        </div>

        <div className="chart-container p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4" style={{ color: '#00D4FF' }} />
            <span className="text-sm font-medium text-white">近5年学生人数趋势</span>
          </div>
          <div ref={trendChartRef} style={{ height: '240px' }} />
        </div>

        <div className="chart-container p-5">
          <div className="flex items-center gap-2 mb-4">
            <PieChart className="w-4 h-4" style={{ color: '#00D4FF' }} />
            <span className="text-sm font-medium text-white">建筑用途占比</span>
          </div>
          <div ref={usageChartRef} style={{ height: '240px' }} />
        </div>
      </div>
    </div>
  );
}
