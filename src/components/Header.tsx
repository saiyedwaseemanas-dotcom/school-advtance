import React from 'react';
import { ViewMode } from '../types';

interface HeaderProps {
  currentView: ViewMode;
  onOpenDrawer: () => void;
  onOpenNotifications: () => void;
  unreadCount?: number;
}

const VIEW_TITLES: Record<ViewMode, string> = {
  'dashboard': 'Dashboard',
  'take-attendance': 'Take Attendance',
  'syllabus': 'Syllabus',
  'marks-exams': 'Marks & Exams',
  'google-sheets-sync': 'Sheets Sync',
  'students': 'Students Directory',
  'teachers': 'Faculty & Staff',
  'reports': 'Institutional Reports',
  'settings': 'Settings',
};

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onOpenDrawer,
  onOpenNotifications,
  unreadCount = 2,
}) => {
  return (
    <header className="fixed top-0 w-full z-40 bg-[#ffffff]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-[env(safe-area-inset-top,0px)]">
      <div className="h-16 px-4 flex items-center justify-between gap-1">
        <div className="flex items-center gap-2">
          <button
            aria-label="Open Menu"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-[#434655] hover:bg-[#eaedff] transition-colors cursor-pointer"
            onClick={onOpenDrawer}
            type="button"
            id="btn-open-menu"
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>

          <div className="flex items-center gap-2.5">
            {/* Logo Mark */}
            <div className="w-8 h-8 rounded-lg bg-[#2563eb] flex items-center justify-center text-white shadow-sm shrink-0">
              <span className="material-symbols-outlined text-[20px]">school</span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-[16px] font-bold text-[#131b2e] leading-none tracking-tight">EduTrack</span>
                <span className="px-1.5 py-0.5 rounded-full bg-[#d5e3fc] text-[#3a485b] text-[10px] uppercase font-bold tracking-wider">
                  2024-25
                </span>
              </div>
              <span className="text-[11px] text-[#434655] leading-tight font-medium">
                {VIEW_TITLES[currentView] || 'Marks & Exams'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            aria-label="Notifications"
            className="min-h-[44px] min-w-[44px] relative flex items-center justify-center rounded-lg text-[#434655] hover:bg-[#eaedff] transition-colors cursor-pointer"
            onClick={onOpenNotifications}
            type="button"
            id="btn-notifications"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#004ac6] ring-2 ring-white animate-pulse" />
            )}
          </button>

          <div className="min-h-[44px] min-w-[44px] flex items-center justify-center pl-1">
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover shadow-[0_1px_3px_rgba(0,0,0,0.08)] ring-1 ring-[#c3c6d7]/40"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJdzqHa9G1qSXX2cgoc7Fic4a0DTx8ce8lfjw__c8EVvKa2QkoXllqZ4Yin2gxVaIUUvhc6Nw9aIC2RWkv2StF2MQYHe49dAfDi1eON9V2efR8OxStUpgkbCoAOJq6or-MJJutBs_O1K_Bc-RzJc0jUTo3lzvrODStv6zlGLktsRC3QUD2o4c83mM0rH96tKemWLIlFgXVd0-_YVVWsYZkZFoU_mcD_8ypxEjnxfnicDsywEUtj42tfw"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
