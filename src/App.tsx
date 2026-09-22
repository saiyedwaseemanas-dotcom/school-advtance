import { useState } from 'react';
import { ViewMode, UserRole, StudentRecord, SyllabusChapter, AttendanceStatus } from './types';
import { INITIAL_STUDENTS, INITIAL_SYLLABUS, TOPPER_DATA } from './data/mockData';
import { Header } from './components/Header';
import { NavigationDrawer } from './components/NavigationDrawer';
import { BottomNav } from './components/BottomNav';
import { Toast } from './components/Toast';
import { MarksView } from './views/MarksView';
import { AttendanceView } from './views/AttendanceView';
import { SyllabusView } from './views/SyllabusView';
import { DashboardView } from './views/DashboardView';
import { SheetsSyncView } from './views/SheetsSyncView';
import { StudentsDirectoryView } from './views/StudentsDirectoryView';
import { FacultyView } from './views/FacultyView';
import { ReportCardModal } from './views/ReportCardModal';
import { NotificationsModal } from './views/NotificationsModal';
import { ApkBuildModal } from './components/ApkBuildModal';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('marks-exams');
  const [currentRole, setCurrentRole] = useState<UserRole>('Teacher');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isReportCardOpen, setIsReportCardOpen] = useState(false);
  const [isApkModalOpen, setIsApkModalOpen] = useState(false);
  const [selectedReportStudent, setSelectedReportStudent] = useState<StudentRecord | null>(null);

  // Core interactive state
  const [students, setStudents] = useState<StudentRecord[]>(INITIAL_STUDENTS);
  const [chapters, setChapters] = useState<SyllabusChapter[]>(INITIAL_SYLLABUS);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastIcon, setToastIcon] = useState<string>('check_circle');

  const triggerToast = (msg: string, icon = 'check_circle') => {
    setToastMessage(msg);
    setToastIcon(icon);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Score update handler
  const handleUpdateScore = (studentId: number, newScore: number) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, score50: newScore } : s))
    );
  };

  // Attendance update handler
  const handleUpdateAttendance = (studentId: number, status: AttendanceStatus) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, statusToday: status } : s))
    );
  };

  // Mark all present handler
  const handleMarkAllPresent = () => {
    setStudents((prev) => prev.map((s) => ({ ...s, statusToday: 'P' })));
    triggerToast('All 40 Students marked Present for today!');
  };

  // WhatsApp Alert trigger
  const handleNotifyAbsentees = () => {
    const absentNames = students.filter((s) => s.statusToday === 'A').map((s) => s.name);
    triggerToast(`WhatsApp absentee notifications sent for: ${absentNames.join(', ')}`, 'chat');
  };

  // Parent WhatsApp direct
  const handleTriggerParentChat = (name: string, phone: string) => {
    triggerToast(`Opening WhatsApp chat for ${name} (${phone})`, 'sms');
  };

  // Syllabus chapter update handler
  const handleUpdateChapter = (updated: SyllabusChapter) => {
    setChapters((prev) => prev.map((ch) => (ch.id === updated.id ? updated : ch)));
    triggerToast(`Chapter "${updated.title}" status updated to ${updated.status}!`);
  };

  // Sync to sheets handler
  const handleSyncSheets = () => {
    triggerToast('142 Records synced to Google Sheets (DPS_Academic_2024.xlsx)', 'cloud_sync');
  };

  // Geofence Punch simulation
  const handleGeofencePunch = () => {
    triggerToast('Geofence Verified: Biometric Punch Logged at 08:02 AM', 'fingerprint');
  };

  // Report Card Modal Handlers
  const handleOpenReportCard = (student?: StudentRecord) => {
    setSelectedReportStudent(student || null);
    setIsReportCardOpen(true);
  };

  const handlePrintReport = () => {
    setIsReportCardOpen(false);
    triggerToast('Transmitting document to campus printer...', 'print');
    if (typeof window !== 'undefined' && window.print) {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col antialiased selection:bg-[#dbe1ff] selection:text-[#00174b]">
      {/* Fixed Top Header */}
      <Header
        currentView={currentView}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        unreadCount={3}
      />

      {/* Navigation Drawer */}
      <NavigationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        currentView={currentView}
        onSelectView={(v) => setCurrentView(v)}
        currentRole={currentRole}
        onSelectRole={(r) => {
          setCurrentRole(r);
          triggerToast(`Switched workspace mode to ${r}`);
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative w-full pt-16 pb-20 bg-[#faf8ff]">
        {currentView === 'marks-exams' && (
          <MarksView
            students={students}
            onUpdateScore={handleUpdateScore}
            onSaveMarks={() => triggerToast('Marksheet saved and synced to database.')}
            onImport={() => triggerToast('Reading records from Google Sheets...', 'sync')}
            onExport={() => triggerToast('Generating official PDF & Excel export...', 'file_download')}
            onOpenReportCard={handleOpenReportCard}
          />
        )}

        {currentView === 'take-attendance' && (
          <AttendanceView
            students={students}
            onUpdateStatus={handleUpdateAttendance}
            onMarkAllPresent={handleMarkAllPresent}
            onNotifyAbsentees={handleNotifyAbsentees}
            onSaveRegister={() => triggerToast('Attendance register successfully saved & synced!')}
            onTriggerParentChat={handleTriggerParentChat}
            onGeofencePunch={handleGeofencePunch}
            onExport={() => triggerToast('Exporting attendance register to CSV & Sheets...', 'file_download')}
          />
        )}

        {currentView === 'syllabus' && (
          <SyllabusView
            chapters={chapters}
            onUpdateChapter={handleUpdateChapter}
            onSyncSheets={handleSyncSheets}
          />
        )}

        {currentView === 'dashboard' && (
          <DashboardView
            onNavigate={(v) => setCurrentView(v)}
            currentRole={currentRole}
            onSelectRole={(r) => setCurrentRole(r)}
            onSyncSheets={handleSyncSheets}
            onNotifyParent={handleTriggerParentChat}
            onRescheduleClass={(c) => triggerToast(`Reschedule request logged for ${c}`, 'event_repeat')}
            onViewReport={() => handleOpenReportCard(students[0])}
          />
        )}

        {currentView === 'google-sheets-sync' && (
          <SheetsSyncView
            onTriggerSync={handleSyncSheets}
            onExport={(fmt) => triggerToast(`Exporting data file in ${fmt}...`, 'download')}
          />
        )}

        {currentView === 'students' && (
          <StudentsDirectoryView
            students={students}
            onOpenReportCard={handleOpenReportCard}
            onTriggerParentChat={handleTriggerParentChat}
          />
        )}

        {currentView === 'teachers' && <FacultyView />}

        {currentView === 'reports' && (
          <div className="flex flex-col w-full max-w-lg mx-auto pb-28 pt-2 px-4 space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-[#eaedff] space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#2563eb] text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">analytics</span>
                </div>
                <div>
                  <h2 className="font-bold text-[16px] text-[#131b2e]">Institutional Reports</h2>
                  <span className="text-[12px] text-[#434655]">CBSE Examination Board Summaries</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  className="w-full p-3 rounded-lg bg-[#f2f3ff] hover:bg-[#eaedff] flex items-center justify-between text-[13px] font-semibold text-[#131b2e] cursor-pointer"
                  onClick={() => handleOpenReportCard(students[0])}
                  type="button"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#004ac6] text-[20px]">feed</span>
                    <span>Student Report Card Generator</span>
                  </div>
                  <span className="material-symbols-outlined text-[18px] text-[#434655]">arrow_forward</span>
                </button>

                <button
                  className="w-full p-3 rounded-lg bg-[#f2f3ff] hover:bg-[#eaedff] flex items-center justify-between text-[13px] font-semibold text-[#131b2e] cursor-pointer"
                  onClick={() => triggerToast('Generating Semester Attendance Compilation PDF...', 'picture_as_pdf')}
                  type="button"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#004ac6] text-[20px]">how_to_reg</span>
                    <span>Semester Attendance Compilation</span>
                  </div>
                  <span className="material-symbols-outlined text-[18px] text-[#434655]">arrow_forward</span>
                </button>

                <button
                  className="w-full p-3 rounded-lg bg-[#f2f3ff] hover:bg-[#eaedff] flex items-center justify-between text-[13px] font-semibold text-[#131b2e] cursor-pointer"
                  onClick={() => triggerToast('Exporting Syllabus Progression Audit...', 'assessment')}
                  type="button"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#004ac6] text-[20px]">menu_book</span>
                    <span>Syllabus Pacing &amp; Audit Log</span>
                  </div>
                  <span className="material-symbols-outlined text-[18px] text-[#434655]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {currentView === 'settings' && (
          <div className="flex flex-col w-full max-w-lg mx-auto pb-28 pt-2 px-4 space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-[#eaedff] space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#2563eb] text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">settings</span>
                </div>
                <div>
                  <h2 className="font-bold text-[16px] text-[#131b2e]">Settings &amp; Portal Config</h2>
                  <span className="text-[12px] text-[#434655]">EduTrack Pro Workspace Preferences</span>
                </div>
              </div>

              <div className="space-y-2 pt-2 text-[13px]">
                <div className="p-3 rounded-lg bg-[#f2f3ff] flex items-center justify-between">
                  <span>Current Academic Year</span>
                  <span className="font-bold font-mono text-[#004ac6]">2024-2025</span>
                </div>
                <div className="p-3 rounded-lg bg-[#f2f3ff] flex items-center justify-between">
                  <span>Grading Rubric</span>
                  <span className="font-bold text-[#131b2e]">CBSE Standard (A+ to Fail)</span>
                </div>
                <div className="p-3 rounded-lg bg-[#f2f3ff] flex items-center justify-between">
                  <span>Defaulter Threshold</span>
                  <span className="font-bold text-[#ba1a1a]">Below 75%</span>
                </div>
                <div className="p-3 rounded-lg bg-[#f2f3ff] flex items-center justify-between">
                  <span>Connected Drive Account</span>
                  <span className="font-semibold text-[#515f74]">admin@delhischool.edu.in</span>
                </div>
              </div>
            </div>

            {/* Android APK Build via GitHub Actions Card */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-[#eaedff] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-[#15803d] text-white flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">android</span>
                  </div>
                  <div>
                    <h2 className="font-bold text-[16px] text-[#131b2e]">Android APK (GitHub CI)</h2>
                    <span className="text-[12px] text-[#434655]">Capacitor &amp; GitHub Actions Ready</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#dcfce7] text-[#15803d] text-[11px] font-bold">
                  Configured
                </span>
              </div>

              <p className="text-[12px] text-[#515f74] leading-relaxed">
                Automatic compilation of <code className="font-mono text-[#004ac6]">.apk</code> packages on GitHub is configured in <code className="font-mono text-[#004ac6]">.github/workflows/build-apk.yml</code>.
              </p>

              <div className="bg-[#f2f3ff] p-3 rounded-lg space-y-1.5 text-[12px] font-mono text-[#434655]">
                <div className="flex justify-between">
                  <span>Target:</span>
                  <span className="font-bold text-[#131b2e]">Android 14+ (ARM/x86)</span>
                </div>
                <div className="flex justify-between">
                  <span>Package ID:</span>
                  <span className="font-bold text-[#004ac6]">com.edutrack.app</span>
                </div>
                <div className="flex justify-between">
                  <span>Artifact:</span>
                  <span className="font-bold text-[#15803d]">app-debug.apk</span>
                </div>
              </div>

              <div className="pt-1 flex gap-2">
                <button
                  className="flex-1 py-2.5 px-3 rounded-xl bg-[#004ac6] hover:bg-[#2563eb] text-white text-[12px] font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  onClick={() => setIsApkModalOpen(true)}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">help</span>
                  <span>How to Build APK on GitHub</span>
                </button>
                <button
                  className="py-2.5 px-3 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-[#004ac6] text-[12px] font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                  onClick={() => {
                    navigator.clipboard?.writeText(`.github/workflows/build-apk.yml`);
                    triggerToast('Copied workflow path to clipboard!', 'content_copy');
                  }}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">content_copy</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Fixed Bottom Navigation */}
      <BottomNav
        currentView={currentView}
        onSelectView={(v) => setCurrentView(v)}
      />

      {/* Report Card Modal */}
      <ReportCardModal
        isOpen={isReportCardOpen}
        onClose={() => setIsReportCardOpen(false)}
        student={selectedReportStudent || students[0]}
        onPrint={handlePrintReport}
      />

      {/* Android APK Guide Modal */}
      <ApkBuildModal
        isOpen={isApkModalOpen}
        onClose={() => setIsApkModalOpen(false)}
        onCopySuccess={() => triggerToast('Workflow path copied to clipboard!', 'content_copy')}
      />

      {/* Notifications Drawer Modal */}
      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onNavigate={(v) => setCurrentView(v as ViewMode)}
      />

      {/* Toast Notification */}
      <Toast message={toastMessage} icon={toastIcon} />
    </div>
  );
}
