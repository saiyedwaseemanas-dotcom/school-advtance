import React from 'react';
import { StudentRecord } from '../types';

interface ReportCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  student?: StudentRecord | null;
  onPrint: () => void;
}

export const ReportCardModal: React.FC<ReportCardModalProps> = ({
  isOpen,
  onClose,
  student,
  onPrint,
}) => {
  if (!isOpen) return null;

  const currentStudent = student || {
    id: 1,
    name: 'Ananya Iyer',
    rollNo: '10A01',
    section: 'Sec 10A',
    attendancePct: 98.4,
    score50: 49,
  };

  const calculatedPct = Math.round((currentStudent.score50 / 50) * 100);
  const grade =
    calculatedPct >= 90 ? 'A+' : calculatedPct >= 80 ? 'A' : calculatedPct >= 70 ? 'B' : calculatedPct >= 50 ? 'C' : 'Fail';

  return (
    <div
      className="fixed inset-0 z-50 bg-[#283044]/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 bg-[#f2f3ff] flex items-center justify-between border-b border-[#eaedff]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#2563eb] text-white flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[20px]">school</span>
            </div>
            <div>
              <span className="font-bold text-[16px] text-[#131b2e] block leading-tight">
                Academic Progress Report
              </span>
              <span className="text-[12px] text-[#434655]">Academic Session 2024-25 • Term 2</span>
            </div>
          </div>
          <button
            className="w-9 h-9 rounded-lg flex items-center justify-center text-[#434655] hover:bg-[#eaedff] cursor-pointer"
            onClick={onClose}
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Scrollable Document Canvas */}
        <div className="p-4 overflow-y-auto space-y-4 text-[13px] print:p-0">
          {/* Institutional Header Banner */}
          <div className="text-center pb-2 border-b border-[#eaedff]">
            <h3 className="font-bold text-[16px] text-[#004ac6] uppercase tracking-wide">
              Delhi Public Model Academy
            </h3>
            <p className="text-[11px] text-[#515f74]">Affiliated to Central Board of Secondary Education • School ID: 10482</p>
          </div>

          {/* Student Information Header */}
          <div className="p-3 rounded-xl bg-[#f2f3ff] grid grid-cols-2 gap-2 text-[#131b2e]">
            <div>
              <span className="font-semibold text-[#515f74]">Student: </span>
              <strong className="font-bold">{currentStudent.name}</strong>
            </div>
            <div>
              <span className="font-semibold text-[#515f74]">Roll No: </span>
              <span className="font-mono font-semibold">{currentStudent.rollNo}</span>
            </div>
            <div>
              <span className="font-semibold text-[#515f74]">Class: </span>
              <span>X - Section A</span>
            </div>
            <div>
              <span className="font-semibold text-[#515f74]">Attendance: </span>
              <span className="font-semibold text-[#004ac6]">{currentStudent.attendancePct}%</span>
            </div>
          </div>

          {/* Grade Summary Table */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] text-[#515f74] font-semibold px-1 uppercase tracking-wider">
              <span>Subject Evaluation</span>
              <span>Marks (Max 50)</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#f2f3ff] flex justify-between items-center text-[#131b2e]">
              <span className="font-medium">Science (Theory &amp; Practicals)</span>
              <span className="font-bold font-mono text-[#004ac6]">{currentStudent.score50} ({grade})</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#f2f3ff] flex justify-between items-center text-[#131b2e]">
              <span className="font-medium">Mathematics</span>
              <span className="font-bold font-mono text-[#004ac6]">47 (A+)</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#f2f3ff] flex justify-between items-center text-[#131b2e]">
              <span className="font-medium">English Literature</span>
              <span className="font-bold font-mono text-[#004ac6]">48 (A+)</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#f2f3ff] flex justify-between items-center text-[#131b2e]">
              <span className="font-medium">Social Science</span>
              <span className="font-bold font-mono text-[#004ac6]">45 (A)</span>
            </div>
          </div>

          {/* Remarks */}
          <div className="p-3 rounded-xl bg-[#f2f3ff] space-y-1">
            <span className="text-[11px] text-[#515f74] font-semibold block uppercase tracking-wider">
              Class Teacher's Remarks:
            </span>
            <p className="text-[#131b2e] italic leading-relaxed text-[12px]">
              &ldquo;Exceptional conceptual clarity in analytical sciences and algebra. Demonstrates consistent classroom leadership, inquisitive thinking, and peer mentorship throughout this academic term.&rdquo;
            </p>
          </div>

          {/* Signature Lines */}
          <div className="pt-4 grid grid-cols-2 gap-4 text-center">
            <div className="space-y-1">
              <div className="h-9 flex items-center justify-center text-[18px] text-[#004ac6] italic font-serif">
                S. Jenkins
              </div>
              <div className="h-0.5 w-full bg-[#c3c6d7]/60" />
              <span className="text-[11px] text-[#515f74] block font-medium">Class Teacher Signature</span>
            </div>
            <div className="space-y-1">
              <div className="h-9 flex items-center justify-center text-[18px] text-[#4338d9] italic font-serif">
                M. R. Sharma
              </div>
              <div className="h-0.5 w-full bg-[#c3c6d7]/60" />
              <span className="text-[11px] text-[#515f74] block font-medium">Principal Seal</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[#f2f3ff] flex items-center justify-end gap-2 border-t border-[#eaedff]">
          <button
            className="px-4 py-2 rounded-lg text-[#434655] hover:bg-[#eaedff] text-[13px] font-semibold cursor-pointer"
            onClick={onClose}
            type="button"
          >
            Close
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-[#004ac6] hover:bg-[#2563eb] text-white text-[13px] font-semibold flex items-center gap-1.5 shadow-sm cursor-pointer transition-all active:scale-95"
            onClick={onPrint}
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">print</span>
            <span>Print Official Card</span>
          </button>
        </div>
      </div>
    </div>
  );
};
