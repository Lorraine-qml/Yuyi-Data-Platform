import { useEffect, useState, useRef } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { SchoolOverview } from './components/SchoolOverview';
import { MetricCards } from './components/MetricCards';
import { BuildingTable } from './components/BuildingTable';
import { LandInfo } from './components/LandInfo';
import { EnrollmentAnalysis } from './components/EnrollmentAnalysis';
import { ChartsSection } from './components/ChartsSection';
import { MaintenanceSection } from './components/MaintenanceSection';
import { GISSection } from './components/GISSection';
import { IssuesSection } from './components/IssuesSection';

const sections = [
  'overview',
  'metrics',
  'buildings',
  'land',
  'enrollment',
  'charts',
  'maintenance',
  'gis',
  'issues',
];

function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-100px 0px -60% 0px',
      threshold: 0,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleClose = () => {
    if (window.confirm('确定要关闭报告预览吗？')) {
      window.close();
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #001F3C, #0A2A4A)' }}>
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
      
      <Header onClose={handleClose} />
      <Sidebar activeSection={activeSection} />
      
      <main 
        className="ml-64 pt-20 pb-8 px-8"
        style={{ minHeight: '100vh' }}
      >
        <div className="w-full space-y-6">
          <section id="overview">
            <SchoolOverview />
          </section>
          
          <section id="metrics">
            <div className="glass-card p-6 animate-fade-in-up">
              <h2 className="section-title">核心指标汇总</h2>
              <MetricCards />
            </div>
          </section>
          
          <section id="buildings">
            <BuildingTable />
          </section>
          
          <section id="land">
            <LandInfo />
          </section>
          
          <section id="enrollment">
            <EnrollmentAnalysis />
          </section>
          
          <section id="charts">
            <ChartsSection />
          </section>
          
          <section id="maintenance">
            <MaintenanceSection />
          </section>
          
          <section id="gis">
            <GISSection />
          </section>
          
          <section id="issues">
            <IssuesSection />
          </section>
          
          <footer className="text-center py-6 text-xs" style={{ color: '#8C9AA6' }}>
            <p>浦东新区教育管理系统 · 一校一档报告</p>
            <p className="mt-1">报告编号：PDSJY-20260401-001 · 生成时间：2026年04月01日</p>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
