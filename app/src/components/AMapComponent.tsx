import { useRef, useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface MapMarker {
  id: string;
  name: string;
  lng: number;
  lat: number;
  type: 'school' | 'residential' | 'region';
  status?: 'danger' | 'warning' | 'normal' | 'sync' | 'lagging';
  data?: any;
}

interface AMapComponentProps {
  module: 'enrollment' | 'health' | 'sync' | 'population';
  selectedYear?: number;
  scenario?: 'low' | 'medium' | 'high';
}

export function AMapComponent({ module }: AMapComponentProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [popup, setPopup] = useState<{ show: boolean; data: any; position: { x: number; y: number } } | null>(null);

  const PUDONG_CENTER = [121.55, 31.22];

  const schoolData: MapMarker[] = [
    { id: 's1', name: '张江中心小学', lng: 121.60, lat: 31.21, type: 'school', status: 'danger', data: { ppi: 68, level: 'C级', students: 2840, capacity: 1620 } },
    { id: 's2', name: '金桥实验中学', lng: 121.62, lat: 31.23, type: 'school', status: 'normal', data: { ppi: 32, level: 'A级', students: 1860, capacity: 1200 } },
    { id: 's3', name: '川沙第一小学', lng: 121.64, lat: 31.20, type: 'school', status: 'warning', data: { ppi: 52, level: 'B级', students: 1560, capacity: 1350 } },
    { id: 's4', name: '周浦中学', lng: 121.58, lat: 31.18, type: 'school', status: 'normal', data: { ppi: 28, level: 'A级', students: 2100, capacity: 1800 } },
    { id: 's5', name: '康桥实验小学', lng: 121.56, lat: 31.20, type: 'school', status: 'danger', data: { ppi: 62, level: 'C级', students: 1680, capacity: 1200 } },
    { id: 's6', name: '惠南中心小学', lng: 121.66, lat: 31.16, type: 'school', status: 'normal', data: { ppi: 35, level: 'A级', students: 1920, capacity: 1800 } },
    { id: 's7', name: '临港实验中学', lng: 121.54, lat: 31.14, type: 'school', status: 'warning', data: { ppi: 48, level: 'B级', students: 1450, capacity: 1200 } },
  ];

  const residentialData: MapMarker[] = [
    { id: 'r1', name: '张江壹号院', lng: 121.59, lat: 31.22, type: 'residential', status: 'sync', data: { developer: '万科地产', lagMonths: 0, school: '张江中心小学' } },
    { id: 'r2', name: '金桥国际社区', lng: 121.61, lat: 31.24, type: 'residential', status: 'lagging', data: { developer: '绿地集团', lagMonths: 5, school: '金桥实验中学' } },
    { id: 'r3', name: '川沙新城', lng: 121.63, lat: 31.19, type: 'residential', status: 'danger', data: { developer: '保利发展', lagMonths: 8, school: '川沙第一小学' } },
    { id: 'r4', name: '周浦花园', lng: 121.57, lat: 31.17, type: 'residential', status: 'sync', data: { developer: '龙湖地产', lagMonths: 0, school: '周浦中学' } },
    { id: 'r5', name: '康桥半岛', lng: 121.55, lat: 31.19, type: 'residential', status: 'lagging', data: { developer: '中海地产', lagMonths: 4, school: '康桥实验小学' } },
  ];

  interface RegionPolygon extends MapMarker {
    polygon: [number, number][];
  }

  const regionData: RegionPolygon[] = [
    { 
      id: 't1', name: '张江', lng: 121.60, lat: 31.22, type: 'region', status: 'danger', 
      data: { gap: 680, demand: 8500, supply: 7820 },
      polygon: [[121.57, 31.24], [121.63, 31.24], [121.63, 31.20], [121.57, 31.20]]
    },
    { 
      id: 't2', name: '金桥', lng: 121.62, lat: 31.24, type: 'region', status: 'warning', 
      data: { gap: 420, demand: 7200, supply: 6780 },
      polygon: [[121.60, 31.26], [121.64, 31.26], [121.64, 31.22], [121.60, 31.22]]
    },
    { 
      id: 't3', name: '川沙', lng: 121.64, lat: 31.20, type: 'region', status: 'warning', 
      data: { gap: 280, demand: 6500, supply: 6220 },
      polygon: [[121.62, 31.22], [121.66, 31.22], [121.66, 31.18], [121.62, 31.18]]
    },
    { 
      id: 't4', name: '周浦', lng: 121.58, lat: 31.18, type: 'region', status: 'warning', 
      data: { gap: 150, demand: 5800, supply: 5650 },
      polygon: [[121.56, 31.20], [121.60, 31.20], [121.60, 31.16], [121.56, 31.16]]
    },
    { 
      id: 't5', name: '康桥', lng: 121.56, lat: 31.20, type: 'region', status: 'warning', 
      data: { gap: 320, demand: 6100, supply: 5780 },
      polygon: [[121.54, 31.22], [121.58, 31.22], [121.58, 31.18], [121.54, 31.18]]
    },
    { 
      id: 't6', name: '惠南', lng: 121.66, lat: 31.16, type: 'region', status: 'normal', 
      data: { gap: -80, demand: 5200, supply: 5280 },
      polygon: [[121.64, 31.18], [121.68, 31.18], [121.68, 31.14], [121.64, 31.14]]
    },
    { 
      id: 't7', name: '临港', lng: 121.54, lat: 31.14, type: 'region', status: 'normal', 
      data: { gap: -150, demand: 4800, supply: 4950 },
      polygon: [[121.52, 31.16], [121.56, 31.16], [121.56, 31.12], [121.52, 31.12]]
    },
  ];

  useEffect(() => {
    // Map loaded
  }, []);

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'danger': return '#EF4444';
      case 'warning': return '#F59E0B';
      case 'normal': return '#10B981';
      case 'sync': return '#10B981';
      case 'lagging': return '#F59E0B';
      default: return '#3B82F6';
    }
  };

  const getStatusText = (status?: string) => {
    switch (status) {
      case 'danger': return '危险';
      case 'warning': return '关注';
      case 'normal': return '优良';
      case 'sync': return '同步';
      case 'lagging': return '滞后';
      default: return '正常';
    }
  };

  const handleMarkerClick = (marker: MapMarker, e: React.MouseEvent) => {
    const rect = mapContainerRef.current?.getBoundingClientRect();
    if (rect) {
      setPopup({
        show: true,
        data: marker,
        position: {
          x: Math.min(e.clientX - rect.left + 15, rect.width - 280),
          y: Math.min(e.clientY - rect.top - 10, rect.height - 200),
        },
      });
    }
  };

  const closePopup = () => {
    setPopup(null);
  };

  const lngLatToScreen = (lng: number, lat: number): [number, number] => {
    const centerLng = PUDONG_CENTER[0];
    const centerLat = PUDONG_CENTER[1];
    const scaleX = 2800;
    const scaleY = 3500;
    
    const x = 50 + (lng - centerLng) * scaleX;
    const y = 50 + (centerLat - lat) * scaleY;
    
    return [Math.max(5, Math.min(95, x)), Math.max(5, Math.min(95, y))];
  };

  const getCurrentData = () => {
    switch (module) {
      case 'enrollment':
      case 'population':
        return regionData;
      case 'health':
        return schoolData;
      case 'sync':
        return residentialData;
      default:
        return regionData;
    }
  };

  const currentData = getCurrentData();

  return (
    <div ref={mapContainerRef} className="relative w-full h-full overflow-hidden bg-[#0a1628]">
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #0d1b2a 0%, #1b263b 50%, #0d1b2a 100%)',
          }}
        />
        
        <svg className="absolute inset-0 w-full h-full opacity-30">
          <defs>
            <pattern id="mapGrid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(0, 212, 255, 0.2)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mapGrid)" />
        </svg>

        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="0" y1="45" x2="100" y2="42" stroke="rgba(100, 149, 237, 0.4)" strokeWidth="1.5" />
          <line x1="35" y1="0" x2="38" y2="100" stroke="rgba(100, 149, 237, 0.4)" strokeWidth="1.2" />
          <line x1="60" y1="0" x2="58" y2="100" stroke="rgba(100, 149, 237, 0.3)" strokeWidth="0.8" />
          <line x1="0" y1="25" x2="50" y2="28" stroke="rgba(100, 149, 237, 0.2)" strokeWidth="0.6" />
          <line x1="70" y1="0" x2="68" y2="50" stroke="rgba(100, 149, 237, 0.2)" strokeWidth="0.6" />
          <line x1="0" y1="70" x2="45" y2="72" stroke="rgba(100, 149, 237, 0.2)" strokeWidth="0.6" />
          <line x1="80" y1="50" x2="78" y2="100" stroke="rgba(100, 149, 237, 0.2)" strokeWidth="0.6" />
        </svg>

        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d="M 18 100 Q 22 70 20 50 Q 18 30 22 0"
            fill="none"
            stroke="rgba(65, 105, 225, 0.5)"
            strokeWidth="3"
          />
        </svg>

        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d="M15,18 L85,15 L90,85 L10,88 Z"
            fill="none"
            stroke="rgba(0, 212, 255, 0.4)"
            strokeWidth="0.5"
            strokeDasharray="3,3"
          />
        </svg>
      </div>

      <div className="absolute inset-0">
        {(module === 'enrollment' || module === 'population') && (
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {regionData.map((region) => {
              const color = getStatusColor(region.status);
              const points = region.polygon.map(([lng, lat]) => {
                const [x, y] = lngLatToScreen(lng, lat);
                return `${x},${y}`;
              }).join(' ');
              
              return (
                <polygon
                  key={`polygon-${region.id}`}
                  points={points}
                  fill={color}
                  fillOpacity={0.35}
                  stroke={color}
                  strokeWidth={0.3}
                  className="cursor-pointer hover:fill-opacity-50 transition-all"
                  onClick={(e) => {
                    const svgRect = (e.target as SVGElement).ownerSVGElement?.getBoundingClientRect();
                    if (svgRect) {
                      const centerX = region.polygon.reduce((sum, [lng]) => sum + lngLatToScreen(lng, 0)[0], 0) / region.polygon.length;
                      const centerY = region.polygon.reduce((sum, [, lat]) => sum + lngLatToScreen(0, lat)[1], 0) / region.polygon.length;
                      setPopup({
                        show: true,
                        data: region,
                        position: {
                          x: Math.min(centerX * svgRect.width / 100 + 15, svgRect.width - 280),
                          y: Math.min(centerY * svgRect.height / 100 - 10, svgRect.height - 200),
                        },
                      });
                    }
                  }}
                />
              );
            })}
          </svg>
        )}
        
        {currentData.map((marker) => {
          const [x, y] = lngLatToScreen(marker.lng, marker.lat);
          const color = getStatusColor(marker.status);
          
          return (
            <div
              key={marker.id}
              className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%` }}
              onClick={(e) => handleMarkerClick(marker, e)}
            >
              {(module === 'enrollment' || module === 'population') ? (
                <>
                  <div 
                    className="absolute -inset-4 rounded-full"
                    style={{ 
                      background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
                    }}
                  />
                  <div 
                    className="relative w-5 h-5 rounded-full border-2 border-white shadow-lg flex items-center justify-center"
                    style={{ background: color }}
                  >
                    <span className="text-[9px] text-white font-bold">{marker.name.charAt(0)}</span>
                  </div>
                  <div 
                    className="absolute left-6 top-1/2 transform -translate-y-1/2 whitespace-nowrap text-xs font-medium text-white bg-black/70 px-2 py-0.5 rounded backdrop-blur-sm border border-white/20"
                  >
                    {marker.name}
                  </div>
                </>
              ) : (
                <>
                  <div 
                    className="absolute -inset-3 rounded-full animate-ping"
                    style={{ 
                      background: color,
                      opacity: 0.2,
                      animationDuration: '2s',
                    }}
                  />
                  
                  {module === 'sync' && marker.type === 'residential' ? (
                    <div 
                      className="relative w-5 h-5 rounded flex items-center justify-center border border-white/50"
                      style={{ background: color }}
                    >
                      <span className="text-[10px] text-white font-bold">住</span>
                    </div>
                  ) : (
                    <div 
                      className="relative w-4 h-4 rounded-full border-2 border-white shadow-lg"
                      style={{ background: color }}
                    />
                  )}
                  
                  <div 
                    className="absolute left-5 top-1/2 transform -translate-y-1/2 whitespace-nowrap text-xs font-medium text-white bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm"
                  >
                    {marker.name}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      <div className="map-legend">
        <div className="text-xs font-medium text-white mb-2">图例</div>
        {module === 'health' && (
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-xs text-white/80">危险 (PPI≥60)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="text-xs text-white/80">关注 (40-60)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-xs text-white/80">良好 (20-40)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-xs text-white/80">优良 (&lt;20)</span>
            </div>
          </div>
        )}
        {(module === 'enrollment' || module === 'population') && (
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-xs text-white/80">缺口&gt;500人</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500" />
              <span className="text-xs text-white/80">缺口200-500</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="text-xs text-white/80">缺口0-200</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-xs text-white/80">学位富余</span>
            </div>
          </div>
        )}
        {module === 'sync' && (
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-green-500 flex items-center justify-center">
                <span className="text-[8px] text-white">住</span>
              </div>
              <span className="text-xs text-white/80">同步</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-yellow-500 flex items-center justify-center">
                <span className="text-[8px] text-white">住</span>
              </div>
              <span className="text-xs text-white/80">滞后≤6月</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-red-500 flex items-center justify-center">
                <span className="text-[8px] text-white">住</span>
              </div>
              <span className="text-xs text-white/80">滞后&gt;6月</span>
            </div>
          </div>
        )}
      </div>

      <div 
        className="absolute top-4 left-4 px-3 py-2 rounded-lg z-10"
        style={{ 
          background: 'rgba(0, 31, 60, 0.95)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <div className="text-xs text-white/60">当前区域</div>
        <div className="text-sm font-medium text-white whitespace-nowrap">上海市 · 浦东新区</div>
      </div>

      {popup?.show && (
        <>
          <div className="absolute inset-0 z-20" onClick={closePopup} />
          <div 
            className="map-popup"
            style={{ 
              left: popup.position.x,
              top: popup.position.y,
            }}
          >
            <button 
              onClick={closePopup}
              className="absolute top-2 right-2 p-1 rounded hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4 text-white/60" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ background: getStatusColor(popup.data.status) }}
              />
              <h4 className="text-sm font-medium text-white">{popup.data.name}</h4>
            </div>
            
            {popup.data.type === 'school' && popup.data.data && (
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-white/60">PPI指数</span>
                  <span className="font-medium" style={{ color: getStatusColor(popup.data.status) }}>
                    {popup.data.data.ppi}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">安全等级</span>
                  <span className="text-white">{popup.data.data.level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">在校学生</span>
                  <span className="text-white">{popup.data.data.students}人</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">学位容量</span>
                  <span className="text-white">{popup.data.data.capacity}人</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">健康状态</span>
                  <span style={{ color: getStatusColor(popup.data.status) }}>{getStatusText(popup.data.status)}</span>
                </div>
              </div>
            )}

            {popup.data.type === 'residential' && popup.data.data && (
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-white/60">开发商</span>
                  <span className="text-white">{popup.data.data.developer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">配套学校</span>
                  <span className="text-white">{popup.data.data.school}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">同步状态</span>
                  <span style={{ color: getStatusColor(popup.data.status) }}>{getStatusText(popup.data.status)}</span>
                </div>
                {popup.data.data.lagMonths > 0 && (
                  <div className="flex justify-between">
                    <span className="text-white/60">滞后时间</span>
                    <span className="text-red-400">{popup.data.data.lagMonths}个月</span>
                  </div>
                )}
              </div>
            )}

            {popup.data.type === 'region' && popup.data.data && (
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-white/60">学位需求</span>
                  <span className="text-white">{popup.data.data.demand}人</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">学位供给</span>
                  <span className="text-white">{popup.data.data.supply}人</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">学位缺口</span>
                  <span className={popup.data.data.gap > 0 ? 'text-red-400' : 'text-green-400'}>
                    {popup.data.data.gap > 0 ? `+${popup.data.data.gap}` : popup.data.data.gap}人
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">缺口率</span>
                  <span className={popup.data.data.gap > 0 ? 'text-red-400' : 'text-green-400'}>
                    {((popup.data.data.gap / popup.data.data.demand) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
