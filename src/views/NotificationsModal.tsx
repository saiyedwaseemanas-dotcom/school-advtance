import React from 'react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: string) => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  if (!isOpen) return null;

  const alerts = [
    {
      title: 'Class 10-B Attendance Alert',
      time: '12m ago',
      desc: 'Aarav Patel has accumulated 14 unexcused absences. Guardian notification recommended.',
      type: 'warning',
      action: 'take-attendance',
    },
    {
      title: 'Syllabus Pacing Threshold',
      time: '1h ago',
      desc: 'Physics Class 10-B is lagging at 62% against institutional target of 80% before Nov 15.',
      type: 'error',
      action: 'syllabus',
    },
    {
      title: 'UT-2 Marks Submission',
      time: '3h ago',
      desc: 'Science (10-A) marks finalized. Sheet ready for export to CBSE central portal.',
      type: 'info',
      action: 'marks-exams',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-[#283044]/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 bg-[#f2f3ff] flex items-center justify-between border-b border-[#eaedff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#004ac6] text-[20px]">notifications</span>
            <span className="font-bold text-[15px] text-[#131b2e]">Campus Alerts</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#434655] hover:bg-[#eaedff] cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="p-3 divide-y divide-[#eaedff] space-y-2 max-h-[60vh] overflow-y-auto">
          {alerts.map((a, i) => (
            <div
              key={i}
              className="pt-2 pb-1 hover:bg-[#faf8ff] p-2 rounded-lg cursor-pointer transition-colors"
              onClick={() => {
                onNavigate(a.action);
                onClose();
              }}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[13px] text-[#131b2e]">{a.title}</span>
                <span className="text-[10px] text-[#515f74]">{a.time}</span>
              </div>
              <p className="text-[12px] text-[#434655] mt-1 leading-snug">{a.desc}</p>
            </div>
          ))}
        </div>

        <div className="p-3 bg-[#f2f3ff] border-t border-[#eaedff] flex justify-end">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg bg-[#004ac6] text-white text-[12px] font-semibold cursor-pointer"
            type="button"
          >
            Mark All Read
          </button>
        </div>
      </div>
    </div>
  );
};
