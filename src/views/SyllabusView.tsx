import React, { useState } from 'react';
import { SyllabusChapter } from '../types';

interface SyllabusViewProps {
  chapters: SyllabusChapter[];
  onUpdateChapter: (updatedChapter: SyllabusChapter) => void;
  onSyncSheets: () => void;
}

export const SyllabusView: React.FC<SyllabusViewProps> = ({
  chapters,
  onUpdateChapter,
  onSyncSheets,
}) => {
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [editingChapter, setEditingChapter] = useState<SyllabusChapter | null>(null);
  const [expandedAll, setExpandedAll] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Form state for edit modal
  const [formStatus, setFormStatus] = useState<'Not Started' | 'In Progress' | 'Completed'>('Not Started');
  const [formDate, setFormDate] = useState('');
  const [formNotes, setFormNotes] = useState('');
  const [formHw, setFormHw] = useState('');

  // Calculate stats
  const totalChapters = 12; // Standard syllabus for Term 1 & 2
  const completedChapters = chapters.filter((c) => c.status === 'Completed').length;
  const inProgressChapters = chapters.filter((c) => c.status === 'In Progress').length;
  const percentComplete = Math.round((completedChapters / totalChapters) * 100);

  const subjects = ['Mathematics', 'Science', 'English', 'Social Science', 'Hindi'];

  const openModal = (chapter: SyllabusChapter) => {
    setEditingChapter(chapter);
    setFormStatus(chapter.status);
    setFormDate(chapter.completionDate || '');
    setFormNotes(chapter.notes || '');
    setFormHw(chapter.homework || '');
  };

  const closeModal = () => {
    setEditingChapter(null);
  };

  const handleSaveChapter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingChapter) return;

    const updated: SyllabusChapter = {
      ...editingChapter,
      status: formStatus,
      completionDate: formDate,
      notes: formNotes,
      homework: formHw,
      periodsConducted:
        formStatus === 'Completed'
          ? editingChapter.periodsAllotted
          : formStatus === 'In Progress'
          ? Math.max(1, Math.floor(editingChapter.periodsAllotted / 2))
          : 0,
    };

    onUpdateChapter(updated);
    closeModal();
  };

  const handleSyncClick = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      onSyncSheets();
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto pb-28 pt-2">
      {/* Top Sub-Header & Selector Bar */}
      <section className="px-4 pt-2 pb-1 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 bg-[#f2f3ff] px-3 py-1.5 rounded-xl shadow-xs border border-[#eaedff]">
            <span className="material-symbols-outlined text-[18px] text-[#004ac6]">groups</span>
            <span className="text-[12px] text-[#434655] font-semibold">Grade &amp; Section:</span>
            <div className="relative inline-flex items-center">
              <select
                className="appearance-none bg-transparent text-[13px] text-[#004ac6] font-bold pr-5 focus:outline-none cursor-pointer"
                id="class-select"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="10-A">Class 10-A</option>
                <option value="10-B">Class 10-B</option>
                <option value="9-A">Class 9-A</option>
                <option value="11-Sci">Class 11-Sci</option>
              </select>
              <span className="material-symbols-outlined text-[16px] text-[#004ac6] pointer-events-none absolute right-0">
                expand_more
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-[#dae2fd]/60 px-2.5 py-1 rounded-full text-[#515f74]">
            <span className="material-symbols-outlined text-[14px]">event</span>
            <span className="text-[12px] font-medium">Term 1 (2024-25)</span>
          </div>
        </div>

        {/* Subject Filter Pills Horizontal Scroll */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          {subjects.map((subj) => {
            const isCurrent = selectedSubject === subj;
            return (
              <button
                key={subj}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-[13px] font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-[#004ac6] text-white shadow-sm'
                    : 'bg-[#f2f3ff] text-[#434655] hover:bg-[#eaedff] hover:text-[#131b2e]'
                }`}
                onClick={() => setSelectedSubject(subj)}
                type="button"
              >
                <span>{subj}</span>
                {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Tracking Overview Canvas */}
      <div className="px-4 flex flex-col gap-3.5 pt-2">
        {/* Overall Subject Progress Card */}
        <section className="bg-white rounded-xl p-4 shadow-sm border border-[#eaedff] relative overflow-hidden">
          {/* Decorative Color Gradient Strip */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#004ac6] via-[#5d55f3] to-[#d5e3fc]"></div>

          <div className="flex items-start justify-between gap-2 pt-1">
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-[18px] text-[#131b2e] font-bold">{selectedSubject}</span>
                <span className="px-2 py-0.5 rounded-md bg-[#e2e7ff] font-mono text-[#004ac6] font-semibold text-[11px]">
                  MTH-101
                </span>
              </div>
              <span className="text-[12px] text-[#434655] flex items-center gap-1 mt-0.5">
                <span className="material-symbols-outlined text-[14px] text-[#4338d9]">person</span>
                Sarah Jenkins • Class Teacher &amp; Mentor
              </span>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-col items-end">
              <div className="flex items-baseline gap-0.5">
                <span className="text-[26px] text-[#004ac6] font-bold leading-none font-mono">
                  {percentComplete}
                </span>
                <span className="text-[16px] text-[#004ac6] font-semibold">%</span>
              </div>
              <span className="text-[11px] text-[#434655] font-medium">
                {completedChapters} of {totalChapters} Ch.
              </span>
            </div>
          </div>

          {/* Linear Progress Bar with Markers */}
          <div className="mt-3.5 flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-[11px]">
              <span className="font-semibold text-[#131b2e]">
                Completed: {completedChapters} Chapters
              </span>
              <span className="text-[#ba1a1a] font-semibold flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[14px]">flag</span>
                Target: 80% (Mid-Term)
              </span>
            </div>

            {/* Composite Track */}
            <div className="relative w-full h-3 bg-[#e2e7ff] rounded-full overflow-hidden">
              <div
                className="absolute left-0 top-0 bottom-0 bg-[#004ac6] rounded-full transition-all duration-700"
                style={{ width: `${percentComplete}%` }}
              ></div>
              {/* Target 80% Marker */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-[#ba1a1a] rounded-full"
                style={{ left: '80%' }}
                title="80% Midterm target"
              ></div>
            </div>

            <div className="flex justify-between items-center text-[10px] text-[#515f74] px-0.5">
              <span>Term Kickoff (Jul 01)</span>
              <span className="text-[#ba1a1a] font-bold">Goal (Nov 15)</span>
              <span>Finals (Mar 10)</span>
            </div>
          </div>

          {/* Target Milestone Timeline Pill Card */}
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="bg-[#f2f3ff] p-2.5 rounded-lg flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#dbe1ff] flex items-center justify-center text-[#004ac6]">
                <span className="material-symbols-outlined text-[18px]">calendar_clock</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-[#434655]">Target Date</span>
                <span className="text-[13px] text-[#131b2e] font-semibold truncate">Nov 15, 2024</span>
              </div>
            </div>

            <div className="bg-[#f2f3ff] p-2.5 rounded-lg flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#d5e3fc] flex items-center justify-center text-[#3a485b]">
                <span className="material-symbols-outlined text-[18px]">timelapse</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-[#434655]">Time Left</span>
                <span className="text-[13px] text-[#131b2e] font-semibold truncate">21 Teaching Days</span>
              </div>
            </div>
          </div>

          {/* Alert Banner: Paced Deficit */}
          <div className="mt-3 p-3 bg-[#ffdad6]/60 rounded-xl flex items-start gap-2.5 border border-[#ffdad6]">
            <div className="p-1 rounded-md bg-[#ba1a1a] text-white flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[16px]">priority_high</span>
            </div>
            <div className="flex flex-col text-[#93000a]">
              <span className="text-[13px] font-bold leading-tight">Pacing Alert: Behind Schedule</span>
              <p className="text-[11px] text-[#93000a]/90 mt-0.5 leading-snug">
                Currently at <strong>{percentComplete}%</strong> completion. To meet the institutional mandate of <strong>80% before the Mid-Term Examination</strong> on Nov 15, pace must accelerate by ~2 periods/week.
              </p>
            </div>
          </div>
        </section>

        {/* Syllabus Chapter Matrix & Controls */}
        <section className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[15px] text-[#131b2e] font-bold">Curriculum Units</span>
              <span className="w-5 h-5 rounded-full bg-[#d5e3fc] text-[#0d1c2e] font-mono text-[11px] font-bold flex items-center justify-center">
                {chapters.length}
              </span>
            </div>
            <button
              className="text-[12px] px-2.5 py-1 rounded-lg bg-[#eaedff] text-[#004ac6] font-semibold flex items-center gap-1 cursor-pointer hover:bg-[#dbe1ff]"
              onClick={() => setExpandedAll(!expandedAll)}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">
                {expandedAll ? 'unfold_less' : 'unfold_more'}
              </span>
              <span>{expandedAll ? 'Compact' : 'Expand Details'}</span>
            </button>
          </div>

          {/* Chapter Items */}
          {chapters.map((ch) => {
            const formattedNum = ch.number.toString().padStart(2, '0');
            const isCompleted = ch.status === 'Completed';
            const isInProgress = ch.status === 'In Progress';

            return (
              <article
                key={ch.id}
                className={`rounded-xl p-3.5 shadow-sm transition-all cursor-pointer relative overflow-hidden border ${
                  isInProgress
                    ? 'bg-white border-amber-300 shadow-[0_4px_14px_rgba(245,158,11,0.12)]'
                    : 'bg-white border-[#eaedff] hover:shadow-md'
                }`}
                onClick={() => openModal(ch)}
              >
                {/* Amber strip for in-progress */}
                {isInProgress && (
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-amber-500"></div>
                )}

                <div className={`flex items-start justify-between gap-2 ${isInProgress ? 'pl-2' : ''}`}>
                  <div className="flex items-start gap-2.5 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-bold font-mono text-[12px] ${
                        isCompleted
                          ? 'bg-[#e2e7ff] text-[#004ac6]'
                          : isInProgress
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-[#f2f3ff] text-[#434655]'
                      }`}
                    >
                      {formattedNum}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-semibold text-[14px] text-[#131b2e] truncate">
                          {ch.title}
                        </h3>
                        {isInProgress && (
                          <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
                        )}
                      </div>
                      <span className={`text-[12px] ${isInProgress ? 'text-amber-800 font-medium' : 'text-[#434655]'}`}>
                        {isInProgress
                          ? `${ch.periodsConducted || 3} of ${ch.periodsAllotted} Periods conducted (60%)`
                          : isCompleted
                          ? `${ch.periodsAllotted} Periods • Done`
                          : `${ch.periodsAllotted} Periods scheduled`}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1 shrink-0 ${
                      isCompleted
                        ? 'bg-[#e2e7ff] text-[#004ac6]'
                        : isInProgress
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-[#f2f3ff] text-[#434655]'
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-[14px]"
                      style={isCompleted ? { fontVariationSettings: "'FILL' 1" } : undefined}
                    >
                      {isCompleted ? 'check_circle' : isInProgress ? 'pending' : 'radio_button_unchecked'}
                    </span>
                    <span>{ch.status === 'Completed' ? 'Completed' : ch.status === 'In Progress' ? 'In Progress' : 'Pending'}</span>
                  </span>
                </div>

                {/* Additional details block when expanded or in-progress */}
                {(isInProgress || expandedAll || ch.notes || ch.homework) && (
                  <div className={`mt-2 pt-2 rounded-lg flex flex-col gap-1 text-[12px] ${isInProgress ? 'pl-2' : ''}`}>
                    {isInProgress && (
                      <div className="w-full bg-[#eaedff] h-2 rounded-full overflow-hidden my-1">
                        <div className="bg-amber-500 h-full rounded-full" style={{ width: '60%' }}></div>
                      </div>
                    )}
                    <div className="bg-[#f2f3ff] p-2.5 rounded-lg space-y-1">
                      <div className="flex items-center justify-between text-[#434655]">
                        {ch.completionDate ? (
                          <span className="flex items-center gap-1 text-[11px] text-[#004ac6] font-semibold">
                            <span className="material-symbols-outlined text-[14px]">event_available</span>
                            Finished: {ch.completionDate}
                          </span>
                        ) : isInProgress ? (
                          <span className="font-semibold text-amber-900 flex items-center gap-1 text-[11px]">
                            <span className="material-symbols-outlined text-[14px] text-amber-600">arrow_forward</span>
                            Next up: {ch.nextTopic || 'Derivation & exercise proofs'}
                          </span>
                        ) : (
                          <span className="text-[11px]">Scheduled for Q3</span>
                        )}

                        {ch.homework && (
                          <span className="text-[11px] bg-[#d5e3fc] px-2 py-0.5 rounded text-[#0d1c2e] font-semibold">
                            {ch.homework}
                          </span>
                        )}
                      </div>
                      {ch.notes && (
                        <p className="text-[#434655] italic text-[11px] leading-snug">
                          &ldquo;{ch.notes}&rdquo;
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </section>

        {/* Teacher Insights / Quick Visual Prompt Card */}
        <section className="bg-white rounded-xl p-3.5 shadow-sm border border-[#eaedff] flex items-center gap-3 overflow-hidden">
          <img
            className="w-16 h-16 rounded-lg object-cover shrink-0 border border-[#eaedff]"
            alt="Classroom workspace"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGLTmZCZLJb-o2vb32QsghftwCHpPHtIUwnwDUpWBnloK0YEXtdaGKqPuyf1AMbb7skXeI7XDedmCsWf3etMthaQjDG8CXkhH9ScmbI--hOK9LGA8sfEarAI3WjXUqSSquNk9m85aXxOuyBZTzeQf5ADv7C7u4yAv1Cqz_4mR2M0Gjub7ggbBUDlY3EQ2Pqr64_OLEr3ixo1kmlyz-Fi4NtwJP1jEdjcIKWt-BpoO6GEfR_HihMQVJ3g"
          />
          <div className="flex flex-col min-w-0">
            <span className="font-bold text-[14px] text-[#131b2e] truncate">
              Mid-Term Syllabus Target
            </span>
            <p className="text-[11px] text-[#434655] line-clamp-2 mt-0.5 leading-snug">
              Target encompasses Chapters 1 through 8. Complete Coordinate Geometry &amp; Trigonometry basics by Nov 15.
            </p>
          </div>
        </section>
      </div>

      {/* Floating Sticky Action Button: Google Sheets Sync */}
      <div className="fixed bottom-20 left-0 right-0 px-4 flex justify-center z-30 pointer-events-none">
        <button
          className="pointer-events-auto bg-[#2563eb] hover:bg-[#004ac6] text-white text-[14px] font-semibold px-5 py-3 rounded-full shadow-[0_8px_20px_rgba(37,99,235,0.35)] flex items-center gap-2.5 transition-all transform active:scale-95 cursor-pointer"
          onClick={handleSyncClick}
          type="button"
          id="sync-sheets-btn"
        >
          <span
            className={`material-symbols-outlined text-[20px] ${isSyncing ? 'animate-spin' : ''}`}
          >
            sync
          </span>
          <span>{isSyncing ? 'Syncing to Sheets...' : 'Sync Syllabus to Sheets'}</span>
          <span className="px-1.5 py-0.5 rounded bg-white/20 text-[10px] font-mono uppercase font-bold tracking-wider">
            Live
          </span>
        </button>
      </div>

      {/* Interactive Modal / Bottom Sheet for Updating Chapter Status */}
      {editingChapter && (
        <div
          className="fixed inset-0 bg-[#283044]/50 backdrop-blur-sm z-50 flex items-end justify-center animate-in fade-in"
          onClick={closeModal}
        >
          <div
            className="bg-white w-full max-w-lg rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.12)] p-5 flex flex-col gap-4 animate-in slide-in-from-bottom"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag Handle & Top Controls */}
            <div className="flex flex-col items-center gap-2 -mt-1">
              <div className="w-12 h-1.5 rounded-full bg-[#dae2fd]"></div>
              <div className="w-full flex items-center justify-between pt-1">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-7 h-7 rounded-md bg-[#e2e7ff] text-[#004ac6] font-bold font-mono text-[12px] flex items-center justify-center shrink-0">
                    {editingChapter.number.toString().padStart(2, '0')}
                  </span>
                  <span className="font-bold text-[16px] text-[#131b2e] truncate">
                    {editingChapter.title}
                  </span>
                </div>
                <button
                  className="w-9 h-9 flex items-center justify-center rounded-full text-[#434655] hover:bg-[#f2f3ff] transition-colors cursor-pointer shrink-0"
                  onClick={closeModal}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>
            </div>

            {/* Edit Form Fields */}
            <form className="flex flex-col gap-3.5" onSubmit={handleSaveChapter}>
              {/* Status Dropdown Selector */}
              <div className="flex flex-col gap-1">
                <label className="text-[12px] text-[#434655] font-semibold" htmlFor="chapter-status">
                  Teaching Status
                </label>
                <select
                  className="w-full h-11 bg-[#f2f3ff] text-[#131b2e] text-[14px] font-semibold rounded-lg px-3 appearance-none focus:outline-none focus:ring-2 focus:ring-[#004ac6] cursor-pointer"
                  id="chapter-status"
                  value={formStatus}
                  onChange={(e) => setFormStatus(e.target.value as any)}
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              {/* Date of Completion Picker */}
              <div className="flex flex-col gap-1">
                <label className="text-[12px] text-[#434655] font-semibold" htmlFor="completion-date">
                  Completion / Target Date
                </label>
                <input
                  className="w-full h-11 bg-[#f2f3ff] text-[#131b2e] text-[13px] rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-[#004ac6]"
                  id="completion-date"
                  type="date"
                  value={formDate}
                  onChange={(e) => setFormDate(e.target.value)}
                />
              </div>

              {/* Teacher Notes Field */}
              <div className="flex flex-col gap-1">
                <label className="text-[12px] text-[#434655] font-semibold" htmlFor="teacher-notes">
                  Teacher Notes &amp; Observations
                </label>
                <textarea
                  className="w-full bg-[#f2f3ff] text-[#131b2e] text-[13px] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#004ac6] resize-none"
                  id="teacher-notes"
                  placeholder="e.g. Geometrical proofs clarified with worksheet 3..."
                  rows={2}
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                ></textarea>
              </div>

              {/* Homework / Assignment Field */}
              <div className="flex flex-col gap-1">
                <label className="text-[12px] text-[#434655] font-semibold" htmlFor="homework-field">
                  Assigned Homework or Task
                </label>
                <input
                  className="w-full h-11 bg-[#f2f3ff] text-[#131b2e] text-[13px] rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-[#004ac6]"
                  id="homework-field"
                  placeholder="e.g. NCERT Ex 7.2 Questions 1-5"
                  type="text"
                  value={formHw}
                  onChange={(e) => setFormHw(e.target.value)}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-1">
                <button
                  className="flex-1 h-11 rounded-xl bg-[#f2f3ff] text-[13px] text-[#434655] hover:bg-[#eaedff] transition-colors font-semibold cursor-pointer"
                  onClick={closeModal}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className="flex-1 h-11 rounded-xl bg-[#004ac6] hover:bg-[#2563eb] text-white text-[13px] transition-colors font-semibold shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                  type="submit"
                >
                  <span className="material-symbols-outlined text-[18px]">check</span>
                  <span>Update Tracker</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
