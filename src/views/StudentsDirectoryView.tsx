import React, { useState } from 'react';
import { StudentRecord } from '../types';

interface StudentsDirectoryViewProps {
  students: StudentRecord[];
  onOpenReportCard: (student: StudentRecord) => void;
  onTriggerParentChat: (name: string, phone: string) => void;
}

export const StudentsDirectoryView: React.FC<StudentsDirectoryViewProps> = ({
  students,
  onOpenReportCard,
  onTriggerParentChat,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSection, setFilterSection] = useState('ALL');

  const filtered = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSection = filterSection === 'ALL' || s.section.includes(filterSection);
    return matchesSearch && matchesSection;
  });

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto pb-28 pt-2 px-4 space-y-4">
      {/* Header */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-[#eaedff] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#2563eb] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">school</span>
            </div>
            <div>
              <h2 className="font-bold text-[16px] text-[#131b2e]">Students Directory</h2>
              <span className="text-[12px] text-[#434655]">Enrolled Cohorts • Academic 2024-25</span>
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#eaedff] text-[#004ac6] text-[11px] font-bold">
            {filtered.length} Students
          </span>
        </div>

        {/* Search & Filters */}
        <div className="flex gap-2">
          <div className="flex-1 relative flex items-center">
            <span className="material-symbols-outlined text-[#434655] text-[18px] absolute left-3 pointer-events-none">
              search
            </span>
            <input
              type="text"
              placeholder="Search student or roll number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-3 rounded-lg bg-[#f2f3ff] text-[13px] text-[#131b2e] outline-none focus:ring-2 focus:ring-[#004ac6]"
            />
          </div>
          <select
            value={filterSection}
            onChange={(e) => setFilterSection(e.target.value)}
            className="h-10 px-3 rounded-lg bg-[#f2f3ff] text-[12px] font-semibold text-[#131b2e] outline-none cursor-pointer"
          >
            <option value="ALL">All Sections</option>
            <option value="10A">Sec 10A</option>
            <option value="10B">Sec 10B</option>
          </select>
        </div>
      </div>

      {/* Student Cards List */}
      <div className="space-y-2.5">
        {filtered.map((s) => (
          <div
            key={s.id}
            className="bg-white rounded-xl p-3.5 shadow-sm border border-[#eaedff] flex items-center justify-between gap-3 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={s.avatar}
                alt={s.name}
                className="w-11 h-11 rounded-full object-cover border border-[#eaedff] shrink-0"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-semibold text-[14px] text-[#131b2e] truncate">{s.name}</span>
                  <span className="text-[10px] font-mono bg-[#eaedff] text-[#004ac6] px-1.5 py-0.5 rounded font-bold">
                    {s.rollNo}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5 text-[11px] text-[#434655]">
                  <span>{s.section}</span>
                  <span>•</span>
                  <span>Score: {s.score50}/50</span>
                  <span>•</span>
                  <span className={s.isDefaulter ? 'text-[#ba1a1a] font-bold' : 'text-[#15803d]'}>
                    Att: {s.attendancePct}%
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                className="p-2 text-[#2563eb] hover:bg-[#f2f3ff] rounded-lg transition-colors cursor-pointer"
                onClick={() => onTriggerParentChat(s.name, s.guardianPhone)}
                title="WhatsApp Guardian"
              >
                <span className="material-symbols-outlined text-[20px]">sms</span>
              </button>
              <button
                className="p-2 text-[#004ac6] hover:bg-[#f2f3ff] rounded-lg transition-colors cursor-pointer"
                onClick={() => onOpenReportCard(s)}
                title="Report Card"
              >
                <span className="material-symbols-outlined text-[20px]">feed</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
