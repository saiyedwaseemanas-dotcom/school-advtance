import React, { useState } from 'react';
import { StudentRecord, AttendanceStatus } from '../types';
import { TEACHER_PROFILE } from '../data/mockData';

interface AttendanceViewProps {
  students: StudentRecord[];
  onUpdateStatus: (studentId: number, status: AttendanceStatus) => void;
  onMarkAllPresent: () => void;
  onNotifyAbsentees: () => void;
  onSaveRegister: () => void;
  onTriggerParentChat: (studentName: string, phone: string) => void;
  onGeofencePunch: () => void;
  onExport: () => void;
}

export const AttendanceView: React.FC<AttendanceViewProps> = ({
  students,
  onUpdateStatus,
  onMarkAllPresent,
  onNotifyAbsentees,
  onSaveRegister,
  onTriggerParentChat,
  onGeofencePunch,
  onExport,
}) => {
  const [activeTab, setActiveTab] = useState<'student' | 'teacher'>('student');
  const [sessionType, setSessionType] = useState<'full' | 'period'>('full');
  const [selectedClass, setSelectedClass] = useState('Class 10 - A');
  const [sessionDate, setSessionDate] = useState('24 Oct, 2024');

  // Compute live counts
  const totalCount = students.length;
  const presentCount = students.filter((s) => s.statusToday === 'P').length;
  const absentCount = students.filter((s) => s.statusToday === 'A').length;
  const leaveCount = students.filter((s) => s.statusToday === 'L').length;
  const halfDayCount = students.filter((s) => s.statusToday === 'HD').length;

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto pb-28 pt-2">
      {/* Interactive View Switcher Pill */}
      <div className="px-4 pt-2 pb-2">
        <div className="bg-[#f2f3ff] p-1 rounded-full flex gap-1 shadow-sm border border-[#eaedff]">
          <button
            className={`flex-1 py-2 px-3 rounded-full text-[13px] font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'student'
                ? 'bg-white text-[#004ac6] shadow-sm'
                : 'text-[#434655] hover:text-[#131b2e]'
            }`}
            onClick={() => setActiveTab('student')}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">school</span>
            <span>Student Roll</span>
          </button>
          <button
            className={`flex-1 py-2 px-3 rounded-full text-[13px] font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'teacher'
                ? 'bg-white text-[#004ac6] shadow-sm'
                : 'text-[#434655] hover:text-[#131b2e]'
            }`}
            onClick={() => setActiveTab('teacher')}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">badge</span>
            <span>Faculty Check-in</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: STUDENT ATTENDANCE */}
      {activeTab === 'student' && (
        <div className="flex flex-col space-y-3.5">
          {/* Academic Filters Bento */}
          <div className="px-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-[#eaedff] space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {/* Class & Section Selector */}
                <div className="bg-[#f2f3ff] rounded-lg p-2.5 px-3 flex flex-col justify-center">
                  <span className="text-[10px] text-[#434655] uppercase font-bold tracking-wider">
                    Grade &amp; Division
                  </span>
                  <div className="flex items-center justify-between mt-0.5">
                    <select
                      value={selectedClass}
                      onChange={(e) => setSelectedClass(e.target.value)}
                      className="bg-transparent font-bold text-[14px] text-[#131b2e] outline-none cursor-pointer w-full"
                    >
                      <option value="Class 10 - A">Class 10 - A</option>
                      <option value="Class 10 - B">Class 10 - B</option>
                      <option value="Class 9 - A">Class 9 - A</option>
                    </select>
                  </div>
                </div>

                {/* Date Picker Chip */}
                <div className="bg-[#f2f3ff] rounded-lg p-2.5 px-3 flex flex-col justify-center">
                  <span className="text-[10px] text-[#434655] uppercase font-bold tracking-wider">
                    Session Date
                  </span>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-[13px] font-semibold text-[#131b2e] truncate">{sessionDate}</span>
                    <span className="material-symbols-outlined text-[18px] text-[#004ac6]">calendar_today</span>
                  </div>
                </div>
              </div>

              {/* Mode Toggle & Period Info */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1 bg-[#eaedff] p-0.5 rounded-lg">
                  <button
                    className={`py-1 px-3 rounded-md text-[12px] font-semibold transition-all cursor-pointer ${
                      sessionType === 'full'
                        ? 'bg-white text-[#004ac6] shadow-xs'
                        : 'text-[#434655] hover:text-[#131b2e]'
                    }`}
                    onClick={() => setSessionType('full')}
                    type="button"
                  >
                    Full Day
                  </button>
                  <button
                    className={`py-1 px-3 rounded-md text-[12px] font-semibold transition-all cursor-pointer ${
                      sessionType === 'period'
                        ? 'bg-white text-[#004ac6] shadow-xs'
                        : 'text-[#434655] hover:text-[#131b2e]'
                    }`}
                    onClick={() => setSessionType('period')}
                    type="button"
                  >
                    Period 3
                  </button>
                </div>
                <span className="text-[12px] text-[#434655] flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#2563eb] inline-block animate-pulse"></span>
                  Roll Count: {totalCount}
                </span>
              </div>
            </div>
          </div>

          {/* Live Metrics Counter Strip */}
          <div className="px-4 overflow-x-auto no-scrollbar">
            <div className="flex gap-2 min-w-full">
              <div className="flex-1 min-w-[65px] bg-white rounded-xl p-2.5 flex flex-col items-center justify-center shadow-sm border border-[#eaedff]">
                <span className="text-[10px] text-[#434655] font-semibold uppercase">Total</span>
                <span className="text-[18px] text-[#131b2e] font-bold font-mono">{totalCount}</span>
              </div>
              <div className="flex-1 min-w-[65px] bg-white rounded-xl p-2.5 flex flex-col items-center justify-center shadow-sm border border-[#eaedff]">
                <span className="text-[10px] text-[#004ac6] font-semibold uppercase">Present</span>
                <span className="text-[18px] text-[#004ac6] font-bold font-mono">{presentCount}</span>
              </div>
              <div className="flex-1 min-w-[65px] bg-white rounded-xl p-2.5 flex flex-col items-center justify-center shadow-sm border border-[#eaedff]">
                <span className="text-[10px] text-[#ba1a1a] font-semibold uppercase">Absent</span>
                <span className="text-[18px] text-[#ba1a1a] font-bold font-mono">{absentCount}</span>
              </div>
              <div className="flex-1 min-w-[65px] bg-white rounded-xl p-2.5 flex flex-col items-center justify-center shadow-sm border border-[#eaedff]">
                <span className="text-[10px] text-[#4338d9] font-semibold uppercase">Leave</span>
                <span className="text-[18px] text-[#4338d9] font-bold font-mono">{leaveCount}</span>
              </div>
              <div className="flex-1 min-w-[65px] bg-white rounded-xl p-2.5 flex flex-col items-center justify-center shadow-sm border border-[#eaedff]">
                <span className="text-[10px] text-[#515f74] font-semibold uppercase">Half Day</span>
                <span className="text-[18px] text-[#515f74] font-bold font-mono">{halfDayCount}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions Horizon */}
          <div className="px-4">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
              <button
                className="min-h-[44px] shrink-0 bg-[#2563eb] hover:bg-[#004ac6] text-white text-[13px] font-semibold px-4 rounded-xl flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
                onClick={onMarkAllPresent}
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">done_all</span>
                <span>Mark All Present</span>
              </button>
              <button
                className="min-h-[44px] shrink-0 bg-white text-[#131b2e] hover:bg-[#f2f3ff] text-[13px] font-semibold px-4 rounded-xl flex items-center gap-1.5 shadow-sm border border-[#eaedff] active:scale-95 transition-all cursor-pointer"
                onClick={onNotifyAbsentees}
                type="button"
              >
                <span className="material-symbols-outlined text-[18px] text-[#2563eb]">chat</span>
                <span>Notify Absentees</span>
              </button>
              <button
                className="min-h-[44px] shrink-0 bg-white text-[#434655] hover:bg-[#f2f3ff] text-[13px] px-3 rounded-xl flex items-center gap-1 shadow-sm border border-[#eaedff] active:scale-95 transition-all cursor-pointer"
                onClick={onExport}
                type="button"
                title="Export Attendance Register"
              >
                <span className="material-symbols-outlined text-[18px]">file_download</span>
              </button>
            </div>
          </div>

          {/* Register Header with Sorting / Filter Indicators */}
          <div className="px-4 flex items-center justify-between text-[#434655] pt-1">
            <span className="text-[11px] uppercase tracking-wider font-bold">
              Class Roster ({students.length})
            </span>
            <div className="flex items-center gap-1 text-[12px]">
              <span>Sort by Roll</span>
              <span className="material-symbols-outlined text-[16px]">swap_vert</span>
            </div>
          </div>

          {/* Student Register List */}
          <div className="px-4 space-y-2.5">
            {students.map((student, index) => {
              const formattedIndex = (index + 1).toString().padStart(2, '0');

              return (
                <div
                  key={student.id}
                  className="bg-white rounded-xl p-3.5 shadow-sm border border-[#eaedff] flex flex-col gap-3"
                  data-student-id={student.id}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-8 h-8 rounded-lg bg-[#eaedff] flex items-center justify-center font-mono font-bold text-[#004ac6] text-[12px] shrink-0">
                        {formattedIndex}
                      </span>
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-[#eaedff] shrink-0 border border-[#eaedff]">
                        <img
                          className="w-full h-full object-cover"
                          alt={student.name}
                          src={student.avatar}
                        />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-[14px] text-[#131b2e] truncate">
                          {student.name}
                        </span>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {student.isDefaulter ? (
                            <span className="px-1.5 py-0.2 bg-[#ffdad6] text-[#93000a] rounded-full text-[10px] font-bold flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a] animate-pulse"></span>
                              Defaulter: {student.attendancePct}%
                            </span>
                          ) : (
                            <>
                              <span className="text-[11px] text-[#434655]">Att: {student.attendancePct}%</span>
                              <span className="w-1 h-1 rounded-full bg-[#c3c6d7]"></span>
                              <span className="text-[11px] text-[#515f74] font-medium">{student.section}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* WhatsApp Parent Direct */}
                    <button
                      aria-label={`WhatsApp ${student.name}'s Guardian`}
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center text-[#2563eb] hover:bg-[#eaedff] rounded-lg transition-colors cursor-pointer"
                      onClick={() => onTriggerParentChat(student.name, student.guardianPhone)}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[20px]">sms</span>
                    </button>
                  </div>

                  {/* 4-State Attendance Buttons */}
                  <div className="grid grid-cols-4 gap-1.5 bg-[#f2f3ff] p-1 rounded-xl">
                    <button
                      className={`min-h-[44px] rounded-lg text-[13px] font-bold transition-all cursor-pointer ${
                        student.statusToday === 'P'
                          ? 'bg-[#d5e3fc] text-[#0d1c2e] shadow-xs'
                          : 'text-[#434655] hover:bg-[#eaedff]'
                      }`}
                      onClick={() => onUpdateStatus(student.id, 'P')}
                      type="button"
                    >
                      P
                    </button>
                    <button
                      className={`min-h-[44px] rounded-lg text-[13px] font-bold transition-all cursor-pointer ${
                        student.statusToday === 'A'
                          ? 'bg-[#ffdad6] text-[#93000a] shadow-xs'
                          : 'text-[#434655] hover:bg-[#eaedff]'
                      }`}
                      onClick={() => onUpdateStatus(student.id, 'A')}
                      type="button"
                    >
                      A
                    </button>
                    <button
                      className={`min-h-[44px] rounded-lg text-[13px] font-bold transition-all cursor-pointer ${
                        student.statusToday === 'L'
                          ? 'bg-[#e2dfff] text-[#3323cc] shadow-xs'
                          : 'text-[#434655] hover:bg-[#eaedff]'
                      }`}
                      onClick={() => onUpdateStatus(student.id, 'L')}
                      type="button"
                    >
                      L
                    </button>
                    <button
                      className={`min-h-[44px] rounded-lg text-[13px] font-bold transition-all cursor-pointer ${
                        student.statusToday === 'HD'
                          ? 'bg-[#dbe1ff] text-[#00174b] shadow-xs'
                          : 'text-[#434655] hover:bg-[#eaedff]'
                      }`}
                      onClick={() => onUpdateStatus(student.id, 'HD')}
                      type="button"
                    >
                      HD
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 2: TEACHER ATTENDANCE & BIO CHECK-IN */}
      {activeTab === 'teacher' && (
        <div className="flex flex-col space-y-3.5 animate-in fade-in">
          {/* Faculty Profile Summary Card */}
          <div className="px-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-[#eaedff] space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-[#eaedff] shrink-0 border border-[#eaedff]">
                  <img
                    className="w-full h-full object-cover"
                    alt={TEACHER_PROFILE.name}
                    src={TEACHER_PROFILE.avatar}
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-[15px] text-[#131b2e] leading-snug">
                    {TEACHER_PROFILE.name}
                  </span>
                  <span className="text-[12px] text-[#434655]">
                    {TEACHER_PROFILE.designation} • ID #{TEACHER_PROFILE.id}
                  </span>
                </div>
              </div>

              {/* Punch Timers Bento */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-[#f2f3ff] rounded-xl p-3 flex flex-col">
                  <span className="text-[10px] text-[#434655] uppercase font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-[#004ac6]">login</span> Check-In
                  </span>
                  <span className="text-[16px] text-[#131b2e] font-bold font-mono mt-1">
                    {TEACHER_PROFILE.checkIn}
                  </span>
                  <span className="text-[11px] text-[#15803d] font-medium">Gate 2 Biometric • On Time</span>
                </div>

                <div className="bg-[#f2f3ff] rounded-xl p-3 flex flex-col">
                  <span className="text-[10px] text-[#434655] uppercase font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-[#4338d9]">logout</span> Check-Out
                  </span>
                  <span className="text-[16px] text-[#131b2e] font-bold font-mono mt-1">
                    {TEACHER_PROFILE.checkOut}
                  </span>
                  <span className="text-[11px] text-[#434655]">Scheduled Regular</span>
                </div>
              </div>

              <button
                className="w-full min-h-[44px] bg-[#004ac6] hover:bg-[#2563eb] text-white text-[13px] rounded-xl font-semibold flex items-center justify-center gap-2 active:scale-98 transition-all cursor-pointer shadow-sm"
                onClick={onGeofencePunch}
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">fingerprint</span>
                <span>Register Self Geofence Punch</span>
              </button>
            </div>
          </div>

          {/* Teacher Leave Balance Ledger */}
          <div className="px-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-[#eaedff] space-y-2.5">
              <span className="text-[11px] text-[#434655] uppercase tracking-wider font-bold">
                Allocated Leave Entitlement
              </span>
              <div className="grid grid-cols-3 gap-2 pt-1">
                <div className="bg-[#f2f3ff] rounded-lg p-2 text-center flex flex-col">
                  <span className="text-[11px] text-[#434655] font-semibold">Casual (CL)</span>
                  <span className="text-[18px] text-[#131b2e] font-bold font-mono">
                    0{TEACHER_PROFILE.leaveBalance.casual.used}
                    <span className="text-xs font-normal text-[#434655]">
                      /0{TEACHER_PROFILE.leaveBalance.casual.total}
                    </span>
                  </span>
                </div>

                <div className="bg-[#f2f3ff] rounded-lg p-2 text-center flex flex-col">
                  <span className="text-[11px] text-[#434655] font-semibold">Sick (SL)</span>
                  <span className="text-[18px] text-[#131b2e] font-bold font-mono">
                    0{TEACHER_PROFILE.leaveBalance.sick.used}
                    <span className="text-xs font-normal text-[#434655]">
                      /{TEACHER_PROFILE.leaveBalance.sick.total}
                    </span>
                  </span>
                </div>

                <div className="bg-[#f2f3ff] rounded-lg p-2 text-center flex flex-col">
                  <span className="text-[11px] text-[#434655] font-semibold">Earned (EL)</span>
                  <span className="text-[18px] text-[#131b2e] font-bold font-mono">
                    {TEACHER_PROFILE.leaveBalance.earned.used}
                    <span className="text-xs font-normal text-[#434655]">
                      /{TEACHER_PROFILE.leaveBalance.earned.total}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Department Faculty Daily Duty Status List */}
          <div className="px-4 space-y-2">
            <span className="text-[11px] text-[#434655] uppercase tracking-wider font-bold px-1">
              Mathematics Dept Staff Today
            </span>
            <div className="bg-white rounded-xl p-3 shadow-sm border border-[#eaedff] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-[#eaedff] flex items-center justify-center font-bold text-[#004ac6] text-[13px]">
                  RK
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-[14px] text-[#131b2e]">Rajesh Kulkarni</span>
                  <span className="text-[11px] text-[#434655]">In: 07:48 AM • Room 102</span>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-[#d5e3fc] text-[#0d1c2e] rounded-full text-[11px] font-bold">
                Present
              </span>
            </div>

            <div className="bg-white rounded-xl p-3 shadow-sm border border-[#eaedff] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-[#e2dfff] flex items-center justify-center font-bold text-[#4338d9] text-[13px]">
                  PM
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-[14px] text-[#131b2e]">Pooja Malhotra</span>
                  <span className="text-[11px] text-[#434655]">Casual Leave (CL) • Approved</span>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-[#e2dfff] text-[#3323cc] rounded-full text-[11px] font-bold">
                On Leave
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Batch Action Footer (When in student mode) */}
      {activeTab === 'student' && (
        <div className="fixed bottom-16 left-0 right-0 p-3 z-30 pointer-events-none">
          <div className="max-w-md mx-auto pointer-events-auto">
            <button
              className="w-full min-h-[48px] bg-[#2563eb] hover:bg-[#004ac6] text-white rounded-xl shadow-lg flex items-center justify-between px-4 text-[14px] font-semibold active:scale-98 transition-transform cursor-pointer"
              onClick={onSaveRegister}
              type="button"
              id="btn-save-sync-attendance"
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">cloud_sync</span>
                <span>Save &amp; Sync Register</span>
              </span>
              <span className="bg-white/20 px-2.5 py-0.5 rounded-full text-xs font-bold font-mono">
                {presentCount}/{totalCount} Present
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
