import React, { useState } from 'react';

interface SheetsSyncViewProps {
  onTriggerSync: () => void;
  onExport: (format: string) => void;
}

export const SheetsSyncView: React.FC<SheetsSyncViewProps> = ({
  onTriggerSync,
  onExport,
}) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState('2 minutes ago');
  const [autoSync, setAutoSync] = useState(true);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSyncTime('Just now');
      onTriggerSync();
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto pb-28 pt-2 px-4 space-y-4">
      {/* Header Banner */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-[#eaedff] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#2563eb] text-white flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-[24px]">sync_alt</span>
          </div>
          <div>
            <h2 className="font-bold text-[16px] text-[#131b2e] leading-tight">Google Sheets Sync</h2>
            <p className="text-[12px] text-[#434655]">Real-time cloud database synchronization</p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-[#d5e3fc] text-[#0d1c2e] text-[11px] font-bold">
          Active
        </span>
      </div>

      {/* Connected Spreadsheet Details Card */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-[#eaedff] space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[12px] text-[#434655] font-semibold uppercase tracking-wider">
            Connected Document
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-[#004ac6] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#004ac6] animate-pulse"></span>
            Live Linked
          </span>
        </div>

        <div className="p-3 bg-[#f2f3ff] rounded-xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="material-symbols-outlined text-[#15803d] text-[28px] shrink-0">
              table_chart
            </span>
            <div className="min-w-0">
              <span className="text-[13px] font-bold text-[#131b2e] block truncate font-mono">
                DPS_Academic_2024.xlsx
              </span>
              <span className="text-[11px] text-[#434655]">Google Drive ID: 10482_CBSE_SHARED</span>
            </div>
          </div>
          <span className="text-[11px] text-[#515f74] font-medium shrink-0">{lastSyncTime}</span>
        </div>

        {/* Sync Status Grid */}
        <div className="grid grid-cols-3 gap-2 text-center pt-1">
          <div className="bg-[#f2f3ff] p-2.5 rounded-lg">
            <span className="block text-[16px] font-bold text-[#131b2e] font-mono">142</span>
            <span className="text-[10px] text-[#434655]">Student Rows</span>
          </div>
          <div className="bg-[#f2f3ff] p-2.5 rounded-lg">
            <span className="block text-[16px] font-bold text-[#004ac6] font-mono">9</span>
            <span className="text-[10px] text-[#434655]">Syllabus Units</span>
          </div>
          <div className="bg-[#f2f3ff] p-2.5 rounded-lg">
            <span className="block text-[16px] font-bold text-[#15803d] font-mono">100%</span>
            <span className="text-[10px] text-[#434655]">Integrity</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          className="w-full min-h-[46px] rounded-xl bg-[#004ac6] hover:bg-[#2563eb] text-white text-[13px] font-semibold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer active:scale-98"
          onClick={handleSync}
          disabled={isSyncing}
          type="button"
        >
          <span className={`material-symbols-outlined text-[18px] ${isSyncing ? 'animate-spin' : ''}`}>
            sync
          </span>
          <span>{isSyncing ? 'Synchronizing with Google Sheets...' : 'Trigger Immediate Sync'}</span>
        </button>
      </div>

      {/* Export Section */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-[#eaedff] space-y-3">
        <span className="text-[12px] text-[#434655] font-semibold uppercase tracking-wider block">
          Download &amp; Export Formats
        </span>
        <div className="grid grid-cols-3 gap-2">
          <button
            className="p-3 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer border border-[#eaedff]"
            onClick={() => onExport('Excel (XLSX)')}
            type="button"
          >
            <span className="material-symbols-outlined text-[#15803d] text-[24px]">description</span>
            <span className="text-[12px] font-semibold text-[#131b2e]">Excel (.xlsx)</span>
          </button>
          <button
            className="p-3 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer border border-[#eaedff]"
            onClick={() => onExport('CSV Data File')}
            type="button"
          >
            <span className="material-symbols-outlined text-[#004ac6] text-[24px]">csv</span>
            <span className="text-[12px] font-semibold text-[#131b2e]">CSV File</span>
          </button>
          <button
            className="p-3 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer border border-[#eaedff]"
            onClick={() => onExport('PDF Report')}
            type="button"
          >
            <span className="material-symbols-outlined text-[#ba1a1a] text-[24px]">picture_as_pdf</span>
            <span className="text-[12px] font-semibold text-[#131b2e]">PDF Report</span>
          </button>
        </div>
      </div>

      {/* Sync Preferences */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-[#eaedff] space-y-3">
        <span className="text-[12px] text-[#434655] font-semibold uppercase tracking-wider block">
          Sync Preferences
        </span>
        <div className="space-y-2">
          <label className="flex items-center justify-between p-2 rounded-lg bg-[#f2f3ff] cursor-pointer">
            <span className="text-[13px] text-[#131b2e] font-medium">Automatic periodic cloud push</span>
            <input
              type="checkbox"
              checked={autoSync}
              onChange={(e) => setAutoSync(e.target.checked)}
              className="w-4 h-4 text-[#004ac6] rounded focus:ring-0 cursor-pointer"
            />
          </label>
          <div className="flex items-center justify-between p-2 rounded-lg bg-[#f2f3ff] text-[13px]">
            <span className="text-[#131b2e] font-medium">Push on mark updates</span>
            <span className="text-[#15803d] font-semibold text-[11px]">Enabled</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded-lg bg-[#f2f3ff] text-[13px]">
            <span className="text-[#131b2e] font-medium">Two-way conflict resolution</span>
            <span className="text-[#434655] font-semibold text-[11px]">Server Wins</span>
          </div>
        </div>
      </div>
    </div>
  );
};
