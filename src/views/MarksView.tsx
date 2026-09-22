import React, { useState } from 'react';
import { StudentRecord } from '../types';
import { SUBJECT_COMPARISONS } from '../data/mockData';

interface MarksViewProps {
  students: StudentRecord[];
  onUpdateScore: (studentId: number, newScore: number) => void;
  onSaveMarks: () => void;
  onImport: () => void;
  onExport: () => void;
  onOpenReportCard: (student?: StudentRecord) => void;
}

export const MarksView: React.FC<MarksViewProps> = ({
  students,
  onUpdateScore,
  onSaveMarks,
  onImport,
  onExport,
  onOpenReportCard,
}) => {
  const [activeExam, setActiveExam] = useState<'UT1' | 'UT2' | 'Mid' | 'Final'>('UT2');
  const [analyticsMode, setAnalyticsMode] = useState<'subjects' | 'trend'>('subjects');
  const [selectedSubject, setSelectedSubject] = useState('Science');
  const [selectedClass, setSelectedClass] = useState('10-A');

  // Compute live class average & pass rate based on students state
  const totalStudents = students.length;
  const totalScore = students.reduce((acc, curr) => acc + curr.score50, 0);
  const classAvg = totalStudents > 0 ? (totalScore / totalStudents).toFixed(1) : '39.4';
  const classAvgPercent = totalStudents > 0 ? ((totalScore / (totalStudents * 50)) * 100).toFixed(1) : '78.8';

  const passingStudents = students.filter((s) => s.score50 >= 18).length;
  const passRate = totalStudents > 0 ? Math.round((passingStudents / totalStudents) * 100) : 95;
  const remediationNeeded = totalStudents - passingStudents;

  // Find topper
  const topper = students.reduce((prev, current) => (prev.score50 > current.score50 ? prev : current), students[0]);

  const getGradeInfo = (score: number) => {
    const pct = Math.round((score / 50) * 100);
    if (pct >= 90) return { grade: 'A+', style: 'bg-[#e2dfff] text-[#0f0069]' };
    if (pct >= 80) return { grade: 'A', style: 'bg-[#dbe1ff] text-[#00174b]' };
    if (pct >= 70) return { grade: 'B', style: 'bg-[#d5e3fc] text-[#57657a]' };
    if (pct >= 50) return { grade: 'C', style: 'bg-[#e2e7ff] text-[#434655]' };
    return { grade: 'Fail', style: 'bg-[#ffdad6] text-[#93000a]' };
  };

  return (
    <div className="flex flex-col w-full px-4 pt-3 pb-24 space-y-4 max-w-lg mx-auto">
      {/* Context Banner & Exam Filter Navigation */}
      <section className="bg-white p-4 rounded-xl shadow-sm space-y-3 border border-[#eaedff]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#004ac6] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              assignment
            </span>
            <span className="font-bold text-[16px] text-[#131b2e]">Evaluation Portal</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#d5e3fc] text-[#3a485b]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#004ac6] animate-pulse"></span>
            <span className="text-[12px] font-semibold">Active Grading</span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="overflow-x-auto -mx-4 px-4 no-scrollbar py-0.5">
          <div className="flex items-center gap-2 min-w-max">
            <button
              className={`px-3.5 py-2 rounded-lg text-[13px] font-medium transition-colors cursor-pointer ${
                activeExam === 'UT1'
                  ? 'bg-[#2563eb] text-white shadow-sm font-semibold'
                  : 'bg-[#f2f3ff] text-[#434655] hover:bg-[#eaedff]'
              }`}
              onClick={() => setActiveExam('UT1')}
              type="button"
            >
              Unit Test 1
            </button>
            <button
              className={`px-3.5 py-2 rounded-lg text-[13px] transition-colors flex items-center gap-1 cursor-pointer ${
                activeExam === 'UT2'
                  ? 'bg-[#2563eb] text-white shadow-sm font-semibold'
                  : 'bg-[#f2f3ff] text-[#434655] hover:bg-[#eaedff]'
              }`}
              onClick={() => setActiveExam('UT2')}
              type="button"
            >
              <span>Unit Test 2</span>
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
            </button>
            <button
              className={`px-3.5 py-2 rounded-lg text-[13px] font-medium transition-colors cursor-pointer ${
                activeExam === 'Mid'
                  ? 'bg-[#2563eb] text-white shadow-sm font-semibold'
                  : 'bg-[#f2f3ff] text-[#434655] hover:bg-[#eaedff]'
              }`}
              onClick={() => setActiveExam('Mid')}
              type="button"
            >
              Mid-Term
            </button>
            <button
              className={`px-3.5 py-2 rounded-lg text-[13px] font-medium transition-colors cursor-pointer ${
                activeExam === 'Final'
                  ? 'bg-[#2563eb] text-white shadow-sm font-semibold'
                  : 'bg-[#f2f3ff] text-[#434655] hover:bg-[#eaedff]'
              }`}
              onClick={() => setActiveExam('Final')}
              type="button"
            >
              Final Exam
            </button>
          </div>
        </div>

        {/* Exam Configuration Pill Strip */}
        <div className="p-2.5 rounded-lg bg-[#f2f3ff] flex flex-wrap items-center justify-between gap-2 text-[#434655] text-[12px]">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-[#131b2e]">Class:</span>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="bg-transparent font-semibold text-[#004ac6] cursor-pointer outline-none"
            >
              <option value="10-A">10-A</option>
              <option value="10-B">10-B</option>
              <option value="9-A">9-A</option>
            </select>
          </div>
          <span className="text-[#c3c6d7]">•</span>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-[#131b2e]">Subject:</span>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="bg-transparent font-semibold text-[#004ac6] cursor-pointer outline-none"
            >
              <option value="Science">Science</option>
              <option value="Mathematics">Mathematics</option>
              <option value="English">English</option>
              <option value="Social Studies">Social Studies</option>
            </select>
          </div>
          <span className="text-[#c3c6d7]">•</span>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-[#131b2e]">Max:</span> 50
          </div>
          <span className="text-[#c3c6d7]">•</span>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-[#131b2e]">Passing:</span> 18 pts
          </div>
        </div>
      </section>

      {/* Visual Highlights / Student of the Test Mosaic */}
      {topper && (
        <div className="grid grid-cols-1">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#004ac6] to-[#4338d9] p-4 text-white shadow-sm flex items-center justify-between">
            <div className="space-y-1 z-10 max-w-[62%]">
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-[10px] tracking-wider uppercase font-bold">
                <span className="material-symbols-outlined text-[13px]">military_tech</span> Class Topper
              </div>
              <p className="text-[16px] leading-tight line-clamp-1 font-bold">{topper.name}</p>
              <p className="text-[13px] text-white/90">
                Score: <strong className="font-bold">{topper.score50} / 50</strong> ({Math.round((topper.score50 / 50) * 100)}%) • Rank 1
              </p>
            </div>
            <div className="relative z-10 w-16 h-16 rounded-full overflow-hidden shadow-md bg-white border-2 border-white/40">
              <img
                className="w-full h-full object-cover"
                alt={topper.name}
                src={topper.avatar}
              />
            </div>
            {/* Abstract decorative SVG glow */}
            <svg
              className="absolute right-0 top-0 w-36 h-36 -mr-6 -mt-6 opacity-20 pointer-events-none"
              fill="currentColor"
              viewBox="0 0 100 100"
            >
              <circle cx="50" cy="50" r="45"></circle>
            </svg>
          </div>
        </div>
      )}

      {/* Summary Insights Bento Grid */}
      <section className="grid grid-cols-2 gap-3">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-[#eaedff] flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-[#434655] font-semibold">Class Avg</span>
            <div className="p-1.5 rounded-lg bg-[#f2f3ff] text-[#004ac6] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">query_stats</span>
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-[22px] font-bold text-[#131b2e]">{classAvg}</span>
              <span className="text-[12px] text-[#434655]">/ 50</span>
            </div>
            <div className="mt-1 flex items-center gap-1 text-[11px] text-[#004ac6] font-semibold">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              <span>{classAvgPercent}% benchmark</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-[#eaedff] flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-[#434655] font-semibold">Pass Rate</span>
            <div className="p-1.5 rounded-lg bg-[#d5e3fc] text-[#3a485b] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">verified</span>
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-[22px] font-bold text-[#131b2e]">{passRate}%</span>
              <span className="text-[12px] text-[#434655]">
                ({passingStudents}/{totalStudents})
              </span>
            </div>
            <div className="mt-1 flex items-center gap-1 text-[11px] text-[#434655]">
              <span className={`w-1.5 h-1.5 rounded-full ${remediationNeeded > 0 ? 'bg-[#ba1a1a]' : 'bg-[#15803d]'}`}></span>
              <span>
                {remediationNeeded > 0 ? `${remediationNeeded} remediation needed` : 'All passing'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Operations Toolbar */}
      <div className="flex items-center justify-between gap-2">
        <button
          className="flex-1 min-h-[44px] px-3 rounded-lg bg-[#004ac6] hover:bg-[#2563eb] text-white text-[13px] font-semibold flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98] transition-all cursor-pointer"
          onClick={onSaveMarks}
          type="button"
          id="btn-save-marks"
        >
          <span className="material-symbols-outlined text-[18px]">save</span>
          <span>Save Marks</span>
        </button>
        <button
          className="min-h-[44px] px-3.5 rounded-lg bg-white text-[#434655] hover:bg-[#f2f3ff] text-[13px] font-semibold flex items-center justify-center gap-1 shadow-sm border border-[#eaedff] active:scale-[0.98] transition-all cursor-pointer"
          onClick={onImport}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">upload_file</span>
          <span>Import</span>
        </button>
        <button
          className="min-h-[44px] px-3.5 rounded-lg bg-white text-[#434655] hover:bg-[#f2f3ff] text-[13px] font-semibold flex items-center justify-center gap-1 shadow-sm border border-[#eaedff] active:scale-[0.98] transition-all cursor-pointer"
          onClick={onExport}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">download</span>
          <span>Export</span>
        </button>
      </div>

      {/* Interactive Marksheet Records (Mobile Stacked Card Format) */}
      <section className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-[15px] text-[#131b2e]">Grade Register</span>
            <span className="px-2 py-0.5 rounded-full bg-[#e2e7ff] text-[#434655] text-[11px] font-semibold">
              {students.length} of 40
            </span>
          </div>
          <span className="text-[12px] text-[#434655] font-medium">Max: 50 Marks</span>
        </div>

        {/* Marksheet List */}
        <div className="space-y-2.5" id="marks-roster">
          {students.map((student, idx) => {
            const { grade, style } = getGradeInfo(student.score50);
            const percentage = Math.round((student.score50 / 50) * 100);
            const isPassing = student.score50 >= 18;

            return (
              <article
                key={student.id}
                className="p-4 rounded-xl bg-white shadow-sm border border-[#eaedff] space-y-3 relative overflow-hidden"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#eaedff] shrink-0 border border-[#eaedff]">
                      <img
                        className="w-full h-full object-cover"
                        alt={student.name}
                        src={student.avatar}
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-[15px] text-[#131b2e] truncate">{student.name}</span>
                        <span className="px-1.5 py-0.5 rounded bg-[#e2dfff] text-[#0f0069] text-[10px] font-bold">
                          #{student.rank || idx + 1}
                        </span>
                      </div>
                      <p className="text-[12px] text-[#434655]">Roll No: {student.rollNo}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                        isPassing
                          ? 'bg-[#d5e3fc] text-[#0d1c2e]'
                          : 'bg-[#ffdad6] text-[#93000a]'
                      }`}
                    >
                      {isPassing ? 'Passed' : 'Needs Help'}
                    </span>
                    <button
                      title="View Report Card"
                      className="p-1 text-[#004ac6] hover:bg-[#f2f3ff] rounded-md transition-colors"
                      onClick={() => onOpenReportCard(student)}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1 items-end">
                  <div>
                    <label className="block text-[11px] font-medium text-[#434655] mb-1">
                      Score (/50)
                    </label>
                    <input
                      className="w-full h-11 px-2.5 rounded-lg bg-[#f2f3ff] text-[#131b2e] text-[16px] font-bold outline-none focus:bg-[#eaedff] focus:ring-2 focus:ring-[#004ac6] transition-colors text-center"
                      max={50}
                      min={0}
                      type="number"
                      value={student.score50}
                      onChange={(e) => {
                        const val = Math.min(50, Math.max(0, parseFloat(e.target.value) || 0));
                        onUpdateScore(student.id, val);
                      }}
                    />
                  </div>

                  <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-[#f2f3ff] h-11">
                    <span className="text-[10px] text-[#434655] uppercase font-semibold">Percent</span>
                    <span className={`text-[14px] font-bold leading-tight ${isPassing ? 'text-[#131b2e]' : 'text-[#ba1a1a]'}`}>
                      {percentage}%
                    </span>
                  </div>

                  <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-[#f2f3ff] h-11">
                    <span className="text-[10px] text-[#434655] uppercase font-semibold">Grade</span>
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold leading-none ${style}`}>
                      {grade}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Student Progress & Comparative Analytics Section */}
      <section className="p-4 rounded-xl bg-white shadow-sm border border-[#eaedff] space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-bold text-[15px] text-[#131b2e] block">Analytics &amp; Progression</span>
            <span className="text-[12px] text-[#434655]">Benchmark comparative trends</span>
          </div>
          <div className="p-2 rounded-lg bg-[#f2f3ff] text-[#004ac6]">
            <span className="material-symbols-outlined text-[20px]">bar_chart</span>
          </div>
        </div>

        {/* Segmented View Selector */}
        <div className="p-1 rounded-lg bg-[#f2f3ff] flex items-center gap-1 text-[12px]">
          <button
            className={`flex-1 py-1.5 rounded transition-all cursor-pointer ${
              analyticsMode === 'subjects'
                ? 'bg-white text-[#004ac6] font-bold shadow-xs'
                : 'text-[#434655] hover:text-[#131b2e]'
            }`}
            onClick={() => setAnalyticsMode('subjects')}
            type="button"
          >
            Subject Comparison
          </button>
          <button
            className={`flex-1 py-1.5 rounded transition-all cursor-pointer ${
              analyticsMode === 'trend'
                ? 'bg-white text-[#004ac6] font-bold shadow-xs'
                : 'text-[#434655] hover:text-[#131b2e]'
            }`}
            onClick={() => setAnalyticsMode('trend')}
            type="button"
          >
            UT1 → Midterm Trend
          </button>
        </div>

        {/* View 1: Subject Averages Bar Display */}
        {analyticsMode === 'subjects' && (
          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between text-[#434655] text-[11px] font-semibold px-1">
              <span>Curriculum Subject</span>
              <span>Class Average (/50)</span>
            </div>

            <div className="space-y-2.5">
              {SUBJECT_COMPARISONS.map((subj) => {
                const widthPct = Math.round((subj.avgScore / 50) * 100);
                return (
                  <div key={subj.name} className="space-y-1">
                    <div className="flex items-center justify-between text-[12px]">
                      <span className={`font-semibold flex items-center gap-1.5 ${subj.active ? 'text-[#004ac6]' : 'text-[#131b2e]'}`}>
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: subj.color }}
                        />
                        {subj.name}
                      </span>
                      <span className="font-bold text-[#131b2e] font-mono">{subj.avgScore.toFixed(1)} pts</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-[#eaedff] overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${widthPct}%`,
                          backgroundColor: subj.color,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* View 2: Trendline Progression View */}
        {analyticsMode === 'trend' && (
          <div className="space-y-3 pt-1">
            <div className="p-2.5 rounded-lg bg-[#f2f3ff] flex items-center justify-between">
              <div>
                <span className="font-semibold text-[13px] text-[#131b2e] block">Cohort Flightpath</span>
                <span className="text-[11px] text-[#434655]">+6.2% expected trajectory</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#d5e3fc] text-[#0d1c2e] text-[11px] font-semibold">
                Positive
              </span>
            </div>

            <div className="relative w-full h-36 flex items-end justify-between px-6 pb-2 pt-6 bg-[#f2f3ff] rounded-xl overflow-hidden">
              {/* Step 1: UT1 */}
              <div className="flex flex-col items-center gap-1.5 z-10">
                <span className="text-[11px] font-bold text-[#131b2e] font-mono">36.8</span>
                <div className="w-8 h-16 rounded-t-lg bg-[#d2d9f4] flex items-center justify-center" />
                <span className="text-[11px] text-[#434655] font-medium">UT-1</span>
              </div>

              {/* Line SVG connector */}
              <div className="absolute inset-x-8 top-8 bottom-10 pointer-events-none">
                <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 240 60">
                  <path
                    d="M 20 40 L 120 20 L 220 5"
                    stroke="#004ac6"
                    strokeDasharray="4 4"
                    strokeLinecap="round"
                    strokeWidth="3"
                  />
                </svg>
              </div>

              {/* Step 2: UT2 */}
              <div className="flex flex-col items-center gap-1.5 z-10">
                <span className="text-[11px] font-bold text-[#004ac6] font-mono">{classAvg}</span>
                <div className="w-8 h-20 rounded-t-lg bg-[#004ac6] flex items-center justify-center shadow-sm" />
                <span className="text-[11px] font-bold text-[#004ac6]">UT-2</span>
              </div>

              {/* Step 3: Projected Midterm */}
              <div className="flex flex-col items-center gap-1.5 z-10">
                <span className="text-[11px] font-bold text-[#4338d9] font-mono">42.8*</span>
                <div className="w-8 h-24 rounded-t-lg bg-[#5d55f3] flex items-center justify-center" />
                <span className="text-[11px] text-[#434655] font-medium">Midterm</span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Report Card Preview CTA Card */}
      <section className="p-4 rounded-xl bg-white shadow-sm border border-[#eaedff] space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#d5e3fc] flex items-center justify-center text-[#0d1c2e] shrink-0">
            <span className="material-symbols-outlined text-[22px]">feed</span>
          </div>
          <div className="min-w-0 flex-1">
            <span className="font-semibold text-[14px] text-[#131b2e] block">Printable Report Card</span>
            <span className="text-[12px] text-[#434655]">Official institutional layout with teacher remarks</span>
          </div>
        </div>

        <button
          className="w-full min-h-[44px] px-4 rounded-lg bg-[#eaedff] text-[#004ac6] text-[13px] font-semibold flex items-center justify-center gap-2 hover:bg-[#dae2fd] transition-colors cursor-pointer"
          onClick={() => onOpenReportCard(topper)}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">preview</span>
          <span>View Sample Printable Report Card</span>
        </button>
      </section>
    </div>
  );
};
