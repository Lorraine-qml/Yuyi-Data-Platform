import { useState } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { Header } from './components/Header';
import { ModuleNav, type ModuleType } from './components/ModuleNav';
import { EnrollmentModule } from './components/modules/EnrollmentModule';
import { HealthModule } from './components/modules/HealthModule';
import { SyncModule } from './components/modules/SyncModule';
import { PopulationModule } from './components/modules/PopulationModule';

const moduleTitles: Record<ModuleType, string> = {
  enrollment: '学位供需分析',
  health: '校舍健康评估',
  sync: '配套同步监管',
  population: '人口趋势预测',
};

function App() {
  const [activeModule, setActiveModule] = useState<ModuleType>('enrollment');

  const renderModule = () => {
    switch (activeModule) {
      case 'enrollment':
        return <EnrollmentModule />;
      case 'health':
        return <HealthModule />;
      case 'sync':
        return <SyncModule />;
      case 'population':
        return <PopulationModule />;
      default:
        return <EnrollmentModule />;
    }
  };

  return (
    <div 
      className="min-h-screen"
      style={{ background: 'linear-gradient(135deg, #001F3C, #0A2A4A)' }}
    >
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(0, 31, 60, 0.95)',
            border: '1px solid rgba(0, 212, 255, 0.3)',
            color: '#fff',
          },
        }}
      />
      
      <Header title={moduleTitles[activeModule]} />
      <ModuleNav 
        activeModule={activeModule} 
        onModuleChange={setActiveModule} 
      />
      
      <main 
        className="ml-16 pt-14"
        style={{ height: 'calc(100vh - 56px)' }}
      >
        {renderModule()}
      </main>
    </div>
  );
}

export default App;
