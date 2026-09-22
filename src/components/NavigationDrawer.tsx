import React from 'react';
import { ViewMode, UserRole } from '../types';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  currentView,
  onSelectView,
  currentRole,
  onSelectRole,
}) => {
  const navItems: { label: string; view: ViewMode; icon: string }[] = [
    { label: 'Dashboard', view: 'dashboard', icon: 'dashboard' },
    { label: 'Students Directory', view: 'students', icon: 'school' },
    { label: 'Faculty & Staff', view: 'teachers', icon: 'badge' },
    { label: 'Take Attendance', view: 'take-attendance', icon: 'fact_check' },
    { label: 'Syllabus Tracker', view: 'syllabus', icon: 'menu_book' },
    { label: 'Marks & Exams', view: 'marks-exams', icon: 'grade' },
    { label: 'Institutional Reports', view: 'reports', icon: 'analytics' },
    { label: 'Google Sheets Sync', view: 'google-sheets-sync', icon: 'sync_alt' },
    { label: 'Settings', view: 'settings', icon: 'settings' },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        id="drawer-backdrop"
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-[#283044]/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Slide-out Sidebar Drawer */}
      <aside
        id="nav-drawer"
        className={`fixed top-0 bottom-0 left-0 z-50 w-[290px] bg-white shadow-[0_20px_25px_-5px_rgba(15,23,42,0.12)] transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="pt-[env(safe-area-inset-top,16px)] px-4 pb-4 flex items-center justify-between border-b border-[#eaedff]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#2563eb] flex items-center justify-center text-white shadow-sm shrink-0">
              <span className="material-symbols-outlined text-[20px]">school</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[16px] text-[#131b2e] leading-tight">EduTrack Pro</span>
              <span className="text-[11px] text-[#004ac6] font-semibold">Workspace Portal</span>
            </div>
          </div>
          <button
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-[#434655] hover:bg-[#eaedff] cursor-pointer"
            onClick={onClose}
            type="button"
            aria-label="Close menu"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Role Selector Pill */}
        <div className="px-4 py-3">
          <div className="bg-[#f2f3ff] p-1 rounded-lg flex gap-1">
            {(['Teacher', 'Admin', 'Student'] as UserRole[]).map((role) => (
              <button
                key={role}
                className={`flex-1 py-1.5 px-2 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                  currentRole === role
                    ? 'bg-white text-[#004ac6] shadow-[0_1px_2px_rgba(0,0,0,0.06)]'
                    : 'text-[#434655] hover:text-[#131b2e]'
                }`}
                onClick={() => onSelectRole(role)}
                type="button"
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto px-2 py-1 space-y-1">
          {navItems.map((item) => {
            const isActive = currentView === item.view;
            return (
              <button
                key={item.view}
                className={`w-full min-h-[44px] px-3.5 flex items-center gap-3 rounded-lg text-[14px] font-medium transition-colors text-left cursor-pointer ${
                  isActive
                    ? 'bg-[#eaedff] text-[#004ac6] font-semibold'
                    : 'text-[#434655] hover:bg-[#f2f3ff] hover:text-[#131b2e]'
                }`}
                onClick={() => {
                  onSelectView(item.view);
                  onClose();
                }}
                type="button"
              >
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Footer Profile */}
        <div className="pb-[env(safe-area-inset-bottom,16px)] p-4 bg-[#f2f3ff] flex items-center gap-2.5">
          <img
            alt="Profile"
            className="w-9 h-9 rounded-full object-cover ring-1 ring-[#c3c6d7]/50"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJdzqHa9G1qSXX2cgoc7Fic4a0DTx8ce8lfjw__c8EVvKa2QkoXllqZ4Yin2gxVaIUUvhc6Nw9aIC2RWkv2StF2MQYHe49dAfDi1eON9V2efR8OxStUpgkbCoAOJq6or-MJJutBs_O1K_Bc-RzJc0jUTo3lzvrODStv6zlGLktsRC3QUD2o4c83mM0rH96tKemWLIlFgXVd0-_YVVWsYZkZFoU_mcD_8ypxEjnxfnicDsywEUtj42tfw"
          />
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-[13px] text-[#131b2e] truncate font-semibold">
              {currentRole === 'Admin' ? 'Principal Sharma' : 'Sarah Jenkins'}
            </span>
            <span className="text-[11px] text-[#434655] truncate">
              {currentRole === 'Admin' ? 'Executive Administration' : 'Mathematics Dept.'}
            </span>
          </div>
          <button
            aria-label="Log Out"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-[#434655] hover:text-[#ba1a1a] transition-colors cursor-pointer"
            type="button"
            onClick={() => {
              onClose();
            }}
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};
