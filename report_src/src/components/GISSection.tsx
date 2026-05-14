import { MapPin, Navigation, Building2, TrendingUp } from 'lucide-react';

export function GISSection() {
  return (
    <div className="glass-card p-6 animate-fade-in-up stagger-7">
      <h2 className="section-title flex items-center gap-2">
        <MapPin className="w-5 h-5" style={{ color: '#00D4FF' }} />
        GIS空间布局
      </h2>
      
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-3">
          <div 
            className="relative rounded-lg overflow-hidden"
            style={{ 
              height: '360px',
              background: 'linear-gradient(135deg, #0A2A4A 0%, #001F3C 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div className="absolute inset-0 opacity-20">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0, 212, 255, 0.3)" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
            
            <svg className="absolute inset-0" width="100%" height="100%">
              <line x1="0" y1="60%" x2="100%" y2="55%" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="8" />
              <line x1="30%" y1="0" x2="35%" y2="100%" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="6" />
              <line x1="0" y1="30%" x2="60%" y2="35%" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="4" />
              <line x1="70%" y1="0" x2="65%" y2="50%" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="4" />
            </svg>
            
            <div 
              className="absolute"
              style={{ left: '35%', top: '55%', transform: 'translate(-50%, -50%)' }}
            >
              <div 
                className="relative"
                style={{
                  width: '80px',
                  height: '60px',
                  background: 'rgba(0, 212, 255, 0.3)',
                  border: '2px solid #00D4FF',
                  borderRadius: '4px',
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-medium text-white">学校</span>
                </div>
                <div 
                  className="absolute -inset-2 rounded-lg animate-ping"
                  style={{ 
                    background: 'rgba(0, 212, 255, 0.2)',
                    animationDuration: '2s',
                  }}
                />
              </div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                <MapPin className="w-6 h-6" style={{ color: '#EF4444' }} />
              </div>
            </div>
            
            <div className="absolute" style={{ left: '55%', top: '35%' }}>
              <div 
                className="w-12 h-10 rounded flex items-center justify-center text-xs"
                style={{ background: 'rgba(255, 255, 255, 0.1)', color: 'rgba(255, 255, 255, 0.6)' }}
              >
                住宅
              </div>
            </div>
            <div className="absolute" style={{ left: '20%', top: '25%' }}>
              <div 
                className="w-12 h-10 rounded flex items-center justify-center text-xs"
                style={{ background: 'rgba(255, 255, 255, 0.1)', color: 'rgba(255, 255, 255, 0.6)' }}
              >
                商业
              </div>
            </div>
            <div className="absolute" style={{ left: '70%', top: '70%' }}>
              <div 
                className="w-12 h-10 rounded flex items-center justify-center text-xs"
                style={{ background: 'rgba(255, 255, 255, 0.1)', color: 'rgba(255, 255, 255, 0.6)' }}
              >
                公园
              </div>
            </div>
            
            <div 
              className="absolute bottom-2 left-2 p-2 rounded text-xs"
              style={{ background: 'rgba(0, 31, 60, 0.8)' }}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded" style={{ background: 'rgba(0, 212, 255, 0.5)', border: '1px solid #00D4FF' }} />
                <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>学校范围</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-4 h-1" style={{ background: 'rgba(255, 255, 255, 0.3)' }} />
                <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>主干道</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3 h-3" style={{ color: '#EF4444' }} />
                <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>学校位置</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-white/5">
            <div className="flex items-center gap-2 mb-2">
              <Navigation className="w-4 h-4" style={{ color: '#00D4FF' }} />
              <span className="text-sm font-medium text-white">区位分析</span>
            </div>
            <p className="text-xs pl-6" style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6' }}>
              位于张江科学城核心区，交通便利，周边配套设施完善
            </p>
          </div>
          
          <div className="p-3 rounded-lg bg-white/5">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-4 h-4" style={{ color: '#00D4FF' }} />
              <span className="text-sm font-medium text-white">周边情况</span>
            </div>
            <p className="text-xs pl-6" style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6' }}>
              周边新建住宅密集，人口导入速度快
            </p>
          </div>
          
          <div className="p-3 rounded-lg bg-white/5">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4" style={{ color: '#00D4FF' }} />
              <span className="text-sm font-medium text-white">趋势预测</span>
            </div>
            <p className="text-xs pl-6" style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6' }}>
              未来学位需求可能持续增加，需提前规划
            </p>
          </div>
          
          <div 
            className="p-3 rounded-lg mt-4"
            style={{ background: 'rgba(0, 212, 255, 0.05)', border: '1px solid rgba(0, 212, 255, 0.2)' }}
          >
            <div className="text-xs mb-1" style={{ color: '#8C9AA6' }}>经纬度坐标</div>
            <div className="text-sm font-mono" style={{ color: '#00D4FF' }}>
              31.2034°N, 121.6016°E
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
