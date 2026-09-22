import React from 'react';
import { ViewMode } from '../types';

interface BottomNavProps {
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentView, onSelectView }) => {
  const tabs: { label: string; view: ViewMode; icon: string }[] = [
    { label: 'Dashboard', view: 'dashboard', icon: 'grid_view' },
    { label: 'Attendance', view: 'take-attendance', icon: 'fact_check' },
    { label: 'Syllabus', view: 'syllabus', icon: 'menu_book' },
    { label: 'Marks', view: 'marks-exams', icon: 'grade' },
    { label: 'Sync', view: 'google-sheets-sync', icon: 'sync_alt' },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-40 pb-[env(safe-area-inset-bottom,0px)] bg-white/95 backdrop-blur-xl border-t border-[#eaedff] shadow-[0_-1px_8px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-1">
        {tabs.map((tab) => {
          const isActive = currentView === tab.view;
          return (
            <button
              key={tab.view}
              aria-current={isActive ? 'page' : undefined}
              className={`flex-1 min-h-[44px] flex flex-col items-center justify-center gap-0.5 transition-colors cursor-pointer ${
                isActive ? 'text-[#2563eb] font-semibold' : 'text-[#434655] hover:text-[#131b2e]'
              }`}
              onClick={() => onSelectView(tab.view)}
              type="button"
            >
              <span
                className="material-symbols-outlined text-[22px]"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {tab.icon}
              </span>
              <span className="text-[10px] tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
