import React, { useState } from 'react';
import { ViewMode, UserRole } from '../types';

interface DashboardViewProps {
  onNavigate: (view: ViewMode) => void;
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  onSyncSheets: () => void;
  onNotifyParent: (name: string, phone: string) => void;
  onRescheduleClass: (className: string) => void;
  onViewReport: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  currentRole,
  onSelectRole,
  onSyncSheets,
  onNotifyParent,
  onRescheduleClass,
  onViewReport,
}) => {
  const [activeCohort, setActiveCohort] = useState<'10a' | '10b' | '9a'>('10a');
  const [hoveredPoint, setHoveredPoint] = useState<{ day: string; val: number; x: number; y: number } | null>(null);

  // Trailing 7 days attendance data
  const trendData = [
    { day: 'Thu', val: 92.4, x: 25, y: 110 },
    { day: 'Fri', val: 93.1, x: 75, y: 100 },
    { day: 'Mon', val: 95.8, x: 125, y: 55 },
    { day: 'Tue', val: 94.6, x: 175, y: 75 },
    { day: 'Wed', val: 96.0, x: 225, y: 50 },
    { day: 'Thu', val: 93.8, x: 275, y: 90 },
    { day: 'Today', val: 94.2, x: 325, y: 82 },
  ];

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto pb-28 pt-2 px-4 space-y-4">
      {/* Role Switcher & Google Sheets Live Sync Bar */}
      <div className="w-full bg-white rounded-xl p-4 shadow-sm border border-[#eaedff] flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-[#dbe1ff] flex items-center justify-center text-[#004ac6] shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[24px]">shield_person</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-bold text-[15px] text-[#131b2e] truncate">
                  {currentRole === 'Admin' ? 'Principal Sharma' : 'Sarah Jenkins'}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#2563eb] text-white text-[10px] tracking-wide shrink-0 font-semibold">
                  {currentRole} Mode
                </span>
              </div>
              <span className="text-[12px] text-[#434655] truncate">Academic Session 2024-25 • Term 2</span>
            </div>
          </div>

          <div className="flex bg-[#f2f3ff] p-0.5 rounded-lg shrink-0 border border-[#eaedff]">
            <button
              className={`px-2.5 py-1 rounded text-[12px] font-semibold transition-all cursor-pointer ${
                currentRole === 'Admin'
                  ? 'bg-white text-[#004ac6] shadow-sm'
                  : 'text-[#434655] hover:text-[#131b2e]'
              }`}
              onClick={() => onSelectRole('Admin')}
              type="button"
            >
              Admin
            </button>
            <button
              className={`px-2.5 py-1 rounded text-[12px] font-semibold transition-all cursor-pointer ${
                currentRole === 'Teacher'
                  ? 'bg-white text-[#004ac6] shadow-sm'
                  : 'text-[#434655] hover:text-[#131b2e]'
              }`}
              onClick={() => onSelectRole('Teacher')}
              type="button"
            >
              Teacher
            </button>
          </div>
        </div>

        {/* Live Sync Alert Pill */}
        <div
          className="flex items-center justify-between bg-[#f2f3ff] px-3 py-2 rounded-lg gap-2 cursor-pointer hover:bg-[#eaedff] transition-colors"
          onClick={() => onNavigate('google-sheets-sync')}
        >
          <div className="flex items-center gap-2 min-w-0">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#004ac6] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#004ac6]"></span>
            </span>
            <span className="font-mono text-[#434655] text-[11px] truncate font-medium">
              DPS_Academic_2024.xlsx
            </span>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <span className="material-symbols-outlined text-[#004ac6] text-[15px]">cloud_done</span>
            <span className="text-[11px] text-[#004ac6] font-semibold">Synced 2m ago</span>
          </div>
        </div>
      </div>

      {/* 4 Key Metric Cards (2x2 Grid) */}
      <div className="grid grid-cols-2 gap-3 w-full">
        {/* Stat 1: Total Students */}
        <div
          className="bg-white rounded-xl p-4 shadow-sm border border-[#eaedff] flex flex-col justify-between space-y-2 cursor-pointer hover:border-[#b4c5ff] transition-all"
          onClick={() => onNavigate('students')}
        >
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-[#434655] font-semibold">Students</span>
            <div className="w-7 h-7 rounded-lg bg-[#f2f3ff] flex items-center justify-center text-[#004ac6]">
              <span className="material-symbols-outlined text-[18px]">groups</span>
            </div>
          </div>
          <div>
            <div className="text-[22px] text-[#131b2e] font-bold tracking-tight font-mono">142</div>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="material-symbols-outlined text-[#004ac6] text-[14px]">arrow_upward</span>
              <span className="text-[11px] text-[#004ac6] font-semibold">+12</span>
              <span className="text-[11px] text-[#434655]">this term</span>
            </div>
          </div>
        </div>

        {/* Stat 2: Teachers on Duty */}
        <div
          className="bg-white rounded-xl p-4 shadow-sm border border-[#eaedff] flex flex-col justify-between space-y-2 cursor-pointer hover:border-[#b4c5ff] transition-all"
          onClick={() => onNavigate('teachers')}
        >
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-[#434655] font-semibold">Faculty Active</span>
            <div className="w-7 h-7 rounded-lg bg-[#f2f3ff] flex items-center justify-center text-[#515f74]">
              <span className="material-symbols-outlined text-[18px]">badge</span>
            </div>
          </div>
          <div>
            <div className="text-[22px] text-[#131b2e] font-bold tracking-tight font-mono">
              18 <span className="text-[14px] text-[#434655] font-normal">/ 20</span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#515f74]"></span>
              <span className="text-[11px] text-[#434655]">2 on scheduled leave</span>
            </div>
          </div>
        </div>

        {/* Stat 3: Today's Attendance */}
        <div
          className="bg-white rounded-xl p-4 shadow-sm border border-[#eaedff] flex flex-col justify-between space-y-2 cursor-pointer hover:border-[#b4c5ff] transition-all"
          onClick={() => onNavigate('take-attendance')}
        >
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-[#434655] font-semibold">Today's Attn.</span>
            <div className="w-7 h-7 rounded-lg bg-[#f2f3ff] flex items-center justify-center text-[#2563eb]">
              <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
            </div>
          </div>
          <div>
            <div className="text-[22px] text-[#131b2e] font-bold tracking-tight font-mono">94.2%</div>
            <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#eaedff] text-[#004ac6] text-[10px] font-semibold mt-0.5">
              <span>Optimal ≥ 90%</span>
            </div>
          </div>
        </div>

        {/* Stat 4: Avg Syllabus Covered */}
        <div
          className="bg-white rounded-xl p-4 shadow-sm border border-[#eaedff] flex flex-col justify-between space-y-2 cursor-pointer hover:border-[#b4c5ff] transition-all"
          onClick={() => onNavigate('syllabus')}
        >
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-[#434655] font-semibold">Syllabus Avg</span>
            <div className="w-7 h-7 rounded-lg bg-[#ffdad6] flex items-center justify-center text-[#93000a]">
              <span className="material-symbols-outlined text-[18px]">warning</span>
            </div>
          </div>
          <div>
            <div className="text-[22px] text-[#131b2e] font-bold tracking-tight font-mono">64.8%</div>
            <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] text-[10px] font-semibold mt-0.5">
              <span>1 Behind Target</span>
            </div>
          </div>
        </div>
      </div>

      {/* Immediate Operations Toolbar */}
      <div className="w-full flex flex-col space-y-2">
        <div className="flex items-center justify-between px-0.5">
          <span className="text-[13px] text-[#131b2e] font-semibold">Immediate Operations</span>
          <span className="text-[11px] text-[#434655]">4 shortcuts</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            className="min-h-[44px] flex items-center gap-2 px-3 py-2.5 rounded-lg bg-[#2563eb] text-white shadow-sm hover:bg-[#004ac6] active:scale-[0.98] transition-all cursor-pointer"
            onClick={() => onNavigate('take-attendance')}
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">fact_check</span>
            <span className="text-[13px] font-semibold truncate">+ Mark Attn</span>
          </button>
          <button
            className="min-h-[44px] flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white text-[#131b2e] border border-[#eaedff] shadow-sm hover:bg-[#f2f3ff] active:scale-[0.98] transition-all cursor-pointer"
            onClick={() => onNavigate('marks-exams')}
            type="button"
          >
            <span className="material-symbols-outlined text-[#004ac6] text-[20px]">edit_square</span>
            <span className="text-[13px] font-semibold truncate">+ UT-2 Marks</span>
          </button>
          <button
            className="min-h-[44px] flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white text-[#131b2e] border border-[#eaedff] shadow-sm hover:bg-[#f2f3ff] active:scale-[0.98] transition-all cursor-pointer"
            onClick={onSyncSheets}
            type="button"
          >
            <span className="material-symbols-outlined text-[#5d55f3] text-[20px]">sync</span>
            <span className="text-[13px] font-semibold truncate">Sync to Sheets</span>
          </button>
          <button
            className="min-h-[44px] flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white text-[#131b2e] border border-[#eaedff] shadow-sm hover:bg-[#f2f3ff] active:scale-[0.98] transition-all cursor-pointer"
            onClick={onViewReport}
            type="button"
          >
            <span className="material-symbols-outlined text-[#515f74] text-[20px]">download</span>
            <span className="text-[13px] font-semibold truncate">Full Report</span>
          </button>
        </div>
      </div>

      {/* Weekly Attendance Trend Chart Card */}
      <div className="w-full bg-white rounded-xl p-4 shadow-sm border border-[#eaedff] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-bold text-[15px] text-[#131b2e]">Weekly Attendance Trend</span>
            <span className="text-[12px] text-[#434655]">Trailing 7 school days across all wings</span>
          </div>
          <div className="px-2 py-0.5 rounded-full bg-[#eaedff] text-[#004ac6] text-[11px] font-semibold">
            94.2% Avg
          </div>
        </div>

        {/* Responsive Custom SVG Line Chart */}
        <div className="relative w-full h-44 bg-[#faf8ff] rounded-xl p-2 flex flex-col justify-between overflow-hidden">
          {/* Y-axis Guides */}
          <div className="absolute inset-x-2 top-3 bottom-6 flex flex-col justify-between pointer-events-none text-[9px] text-[#737686]">
            <div className="border-b border-[#eaedff] flex justify-between">
              <span>100%</span>
            </div>
            <div className="border-b border-[#eaedff] flex justify-between">
              <span>96%</span>
            </div>
            <div className="border-b border-[#eaedff] flex justify-between">
              <span>92%</span>
            </div>
            <div className="border-b border-[#eaedff] flex justify-between">
              <span>88%</span>
            </div>
          </div>

          {/* SVG Vector Path */}
          <svg className="w-full h-32 mt-2" viewBox="0 0 350 140" fill="none">
            <defs>
              <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Filled area */}
            <path
              d="M 25 110 L 75 100 L 125 55 L 175 75 L 225 50 L 275 90 L 325 82 L 325 130 L 25 130 Z"
              fill="url(#trendGradient)"
            />

            {/* Stroke Line */}
            <path
              d="M 25 110 L 75 100 L 125 55 L 175 75 L 225 50 L 275 90 L 325 82"
              stroke="#2563eb"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data Points */}
            {trendData.map((pt) => (
              <circle
                key={pt.day}
                cx={pt.x}
                cy={pt.y}
                r="4.5"
                fill="#2563eb"
                stroke="#ffffff"
                strokeWidth="2"
                className="cursor-pointer hover:r-6 transition-all"
                onMouseEnter={() => setHoveredPoint(pt)}
                onMouseLeave={() => setHoveredPoint(null)}
              />
            ))}
          </svg>

          {/* Tooltip on hover */}
          {hoveredPoint && (
            <div
              className="absolute bg-[#131b2e] text-white text-[11px] px-2 py-1 rounded shadow-md pointer-events-none transform -translate-x-1/2 -translate-y-full"
              style={{ left: `${(hoveredPoint.x / 350) * 100}%`, top: '35%' }}
            >
              {hoveredPoint.day}: {hoveredPoint.val}%
            </div>
          )}

          {/* X Axis Labels */}
          <div className="flex justify-between px-3 text-[10px] text-[#434655] font-medium z-10">
            {trendData.map((d) => (
              <span key={d.day}>{d.day}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Class-wise Syllabus Progress Bar Chart */}
      <div className="w-full bg-white rounded-xl p-4 shadow-sm border border-[#eaedff] space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="font-bold text-[15px] text-[#131b2e]">Syllabus Completion</span>
            <span className="text-[12px] text-[#434655]">Benchmark threshold: 80% prior to Mid-Terms</span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] text-[10px] font-bold shrink-0 animate-pulse">
            10-B Deficit
          </span>
        </div>

        {/* Bar Visualizer */}
        <div className="relative w-full h-44 bg-[#faf8ff] rounded-xl p-3 flex flex-col justify-end">
          {/* Target 80% benchmark line */}
          <div className="absolute inset-x-3 top-[25%] border-b border-dashed border-[#ba1a1a] flex items-center justify-end">
            <span className="text-[10px] font-bold text-[#ba1a1a] bg-white px-1 -mt-3.5">Target: 80%</span>
          </div>

          <div className="flex items-end justify-around h-32 pt-4 px-2">
            {/* 10-A */}
            <div className="flex flex-col items-center gap-1.5 z-10 w-16">
              <span className="text-[11px] font-bold text-[#131b2e] font-mono">78%</span>
              <div className="w-9 bg-[#2563eb] rounded-t-lg transition-all" style={{ height: '78%' }}></div>
              <span className="text-[10px] text-[#434655] font-semibold text-center leading-tight">Class 10-A</span>
            </div>

            {/* 10-B */}
            <div className="flex flex-col items-center gap-1.5 z-10 w-16">
              <span className="text-[11px] font-bold text-[#ba1a1a] font-mono">62%</span>
              <div className="w-9 bg-[#ba1a1a] rounded-t-lg transition-all" style={{ height: '62%' }}></div>
              <span className="text-[10px] text-[#ba1a1a] font-bold text-center leading-tight">10-B (Alert)</span>
            </div>

            {/* 9-A */}
            <div className="flex flex-col items-center gap-1.5 z-10 w-16">
              <span className="text-[11px] font-bold text-[#131b2e] font-mono">85%</span>
              <div className="w-9 bg-[#4338d9] rounded-t-lg transition-all" style={{ height: '85%' }}></div>
              <span className="text-[10px] text-[#434655] font-semibold text-center leading-tight">Class 9-A</span>
            </div>
          </div>
        </div>

        {/* Alert Breakdown strip for Class 10-B */}
        <div className="w-full bg-[#ffdad6]/60 p-3 rounded-lg flex items-center gap-2.5 border border-[#ffdad6]">
          <span className="material-symbols-outlined text-[#ba1a1a] text-[20px] shrink-0">emergency</span>
          <div className="flex flex-col min-w-0">
            <span className="text-[12px] text-[#93000a] font-bold truncate">
              Class 10-B is lagging at 62% (Gap: 18%)
            </span>
            <span className="text-[11px] text-[#434655] truncate">
              Physics and Organic Chemistry require 4 remedial periods
            </span>
          </div>
        </div>
      </div>

      {/* Quick Class Selector Tabs */}
      <div className="w-full bg-white rounded-xl p-4 shadow-sm border border-[#eaedff] space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-bold text-[15px] text-[#131b2e]">Class Cohort Overview</span>
          <button
            className="text-[12px] text-[#004ac6] font-semibold cursor-pointer hover:underline"
            onClick={() => onNavigate('marks-exams')}
          >
            View Gradebook
          </button>
        </div>

        {/* Tab bar */}
        <div className="flex bg-[#f2f3ff] p-1 rounded-lg gap-1 border border-[#eaedff]">
          <button
            className={`flex-1 py-1.5 rounded text-[12px] font-semibold transition-all cursor-pointer text-center ${
              activeCohort === '10a'
                ? 'bg-white text-[#004ac6] shadow-sm'
                : 'text-[#434655] hover:text-[#131b2e]'
            }`}
            onClick={() => setActiveCohort('10a')}
            type="button"
          >
            Class 10-A
          </button>
          <button
            className={`flex-1 py-1.5 rounded text-[12px] font-semibold transition-all cursor-pointer text-center ${
              activeCohort === '10b'
                ? 'bg-white text-[#004ac6] shadow-sm'
                : 'text-[#434655] hover:text-[#131b2e]'
            }`}
            onClick={() => setActiveCohort('10b')}
            type="button"
          >
            Class 10-B
          </button>
          <button
            className={`flex-1 py-1.5 rounded text-[12px] font-semibold transition-all cursor-pointer text-center ${
              activeCohort === '9a'
                ? 'bg-white text-[#004ac6] shadow-sm'
                : 'text-[#434655] hover:text-[#131b2e]'
            }`}
            onClick={() => setActiveCohort('9a')}
            type="button"
          >
            Class 9-A
          </button>
        </div>

        {/* Tab Panels */}
        {activeCohort === '10a' && (
          <div className="flex flex-col space-y-2 pt-1 animate-in fade-in">
            <div className="flex items-center justify-between p-3 bg-[#f2f3ff] rounded-lg">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#dbe1ff] text-[#004ac6] flex items-center justify-center font-bold text-xs font-mono">
                  10A
                </div>
                <div>
                  <div className="text-[13px] text-[#131b2e] font-semibold">Section Alpha • 48 Students</div>
                  <div className="text-[11px] text-[#434655]">Class Teacher: Mrs. R. Kaul</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[12px] text-[#004ac6] font-bold font-mono">96.8% Attn</div>
                <div className="text-[10px] text-[#434655]">78% Syllabus</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-[#f2f3ff] p-2 rounded-lg">
                <span className="block text-[16px] font-bold text-[#131b2e] font-mono">46</span>
                <span className="text-[10px] text-[#434655]">Present Today</span>
              </div>
              <div className="bg-[#f2f3ff] p-2 rounded-lg">
                <span className="block text-[16px] font-bold text-[#131b2e] font-mono">2</span>
                <span className="text-[10px] text-[#434655]">Excused Leave</span>
              </div>
              <div className="bg-[#f2f3ff] p-2 rounded-lg">
                <span className="block text-[16px] font-bold text-[#004ac6] font-mono">84.2</span>
                <span className="text-[10px] text-[#434655]">Avg UT-1 Score</span>
              </div>
            </div>
          </div>
        )}

        {activeCohort === '10b' && (
          <div className="flex flex-col space-y-2 pt-1 animate-in fade-in">
            <div className="flex items-center justify-between p-3 bg-[#ffdad6]/30 rounded-lg border border-[#ffdad6]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#ffdad6] text-[#93000a] flex items-center justify-center font-bold text-xs font-mono">
                  10B
                </div>
                <div>
                  <div className="text-[13px] text-[#131b2e] font-semibold">Section Beta • 46 Students</div>
                  <div className="text-[11px] text-[#ba1a1a] font-medium">Attendance Deficit Watchlist</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[12px] text-[#ba1a1a] font-bold font-mono">88.4% Attn</div>
                <div className="text-[10px] text-[#ba1a1a]">62% Syllabus</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-[#f2f3ff] p-2 rounded-lg">
                <span className="block text-[16px] font-bold text-[#131b2e] font-mono">39</span>
                <span className="text-[10px] text-[#434655]">Present Today</span>
              </div>
              <div className="bg-[#f2f3ff] p-2 rounded-lg">
                <span className="block text-[16px] font-bold text-[#ba1a1a] font-mono">7</span>
                <span className="text-[10px] text-[#434655]">Unexcused Absent</span>
              </div>
              <div className="bg-[#f2f3ff] p-2 rounded-lg">
                <span className="block text-[16px] font-bold text-[#131b2e] font-mono">69.5</span>
                <span className="text-[10px] text-[#434655]">Avg UT-1 Score</span>
              </div>
            </div>
          </div>
        )}

        {activeCohort === '9a' && (
          <div className="flex flex-col space-y-2 pt-1 animate-in fade-in">
            <div className="flex items-center justify-between p-3 bg-[#f2f3ff] rounded-lg">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#d5e3fc] text-[#0d1c2e] flex items-center justify-center font-bold text-xs font-mono">
                  9A
                </div>
                <div>
                  <div className="text-[13px] text-[#131b2e] font-semibold">Junior Section • 48 Students</div>
                  <div className="text-[11px] text-[#434655]">Class Teacher: Mr. T. Roy</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[12px] text-[#004ac6] font-bold font-mono">97.4% Attn</div>
                <div className="text-[10px] text-[#434655]">85% Syllabus</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-[#f2f3ff] p-2 rounded-lg">
                <span className="block text-[16px] font-bold text-[#131b2e] font-mono">47</span>
                <span className="text-[10px] text-[#434655]">Present Today</span>
              </div>
              <div className="bg-[#f2f3ff] p-2 rounded-lg">
                <span className="block text-[16px] font-bold text-[#131b2e] font-mono">1</span>
                <span className="text-[10px] text-[#434655]">Medical Leave</span>
              </div>
              <div className="bg-[#f2f3ff] p-2 rounded-lg">
                <span className="block text-[16px] font-bold text-[#004ac6] font-mono">88.1</span>
                <span className="text-[10px] text-[#434655]">Avg UT-1 Score</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Critical Escalations Section */}
      <div className="w-full bg-white rounded-xl p-4 shadow-sm border border-[#eaedff] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a] animate-pulse"></span>
            <span className="font-bold text-[15px] text-[#131b2e]">Critical Escalations</span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] text-[10px] font-bold">
            Action Required
          </span>
        </div>

        {/* Student Defaulter Item */}
        <div className="bg-[#f2f3ff] p-3 rounded-lg flex flex-col space-y-2 border border-[#eaedff]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                className="w-10 h-10 rounded-full object-cover shrink-0 shadow-xs border border-[#eaedff]"
                alt="Aarav Patel"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOvzSGqoFd75BKMPqZe__ufZ0NZFcQKBpgKgoa-NUGurrFQf9lJMvOgzkbMNZePnkgJPqnFhD5fWsz7m3uEmJUyWP8-iLO8u3dZjS-C_g9LLIoA6AfY4FZj3RW9eRhmhTmrjG3_aK3LiIj66sjYLoPy42ILRfupUXEDfEv8g3tFVPAu7tocVFb2ie1MBzpDhYQmd5CpYkO9wFBGnARZpu_v2ff7YDxms_A2h4IJY4CH8albwppa46W5g"
              />
              <div className="flex flex-col min-w-0">
                <span className="text-[13px] text-[#131b2e] font-semibold truncate">Aarav Patel</span>
                <span className="text-[11px] text-[#434655] truncate">Roll #24 • Class 10-B</span>
              </div>
            </div>
            <div className="px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] text-[11px] font-bold shrink-0">
              68.0% Attn
            </div>
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-[#434655] truncate">14 unexcused absences this month</span>
            <button
              className="min-h-[36px] px-3 py-1 bg-white text-[#131b2e] hover:bg-[#eaedff] rounded-lg text-[11px] font-semibold shadow-xs flex items-center gap-1.5 transition-all cursor-pointer border border-[#eaedff]"
              onClick={() => onNotifyParent('Aarav Patel', '+91 98201 54321')}
              type="button"
            >
              <span className="material-symbols-outlined text-[#004ac6] text-[16px]">chat</span>
              <span>WhatsApp Parent</span>
            </button>
          </div>
        </div>

        {/* Pending Syllabus Urgent Chapter */}
        <div className="bg-[#f2f3ff] p-3 rounded-lg flex items-center justify-between gap-2 border border-[#eaedff]">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-[#e2e7ff] flex items-center justify-center text-[#434655] shrink-0">
              <span className="material-symbols-outlined text-[22px]">science</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[13px] text-[#131b2e] font-semibold truncate">Physics • Ch 6 Optics</span>
              <span className="text-[11px] text-[#434655] truncate">Class 10-B • 0/5 Lectures logged</span>
            </div>
          </div>
          <button
            className="min-h-[36px] px-3 py-1 bg-[#004ac6] text-white rounded-lg text-[11px] font-semibold shrink-0 shadow-xs hover:bg-[#2563eb] transition-all flex items-center gap-1 cursor-pointer"
            onClick={() => onRescheduleClass('Physics Class 10-B')}
            type="button"
          >
            <span className="material-symbols-outlined text-[15px]">event_repeat</span>
            <span>Reschedule</span>
          </button>
        </div>

        {/* Additional Academic Notice */}
        <div className="bg-[#f2f3ff] p-3 rounded-lg flex items-center justify-between gap-2 border border-[#eaedff]">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-[#e2e7ff] flex items-center justify-center text-[#434655] shrink-0">
              <span className="material-symbols-outlined text-[22px]">assignment_turned_in</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[13px] text-[#131b2e] font-semibold truncate">UT-2 Marks Submission</span>
              <span className="text-[11px] text-[#434655] truncate">English Core • 3 days till sheet freeze</span>
            </div>
          </div>
          <span className="text-[11px] text-[#434655] shrink-0 font-medium">Due Oct 24</span>
        </div>
      </div>
    </div>
  );
};
