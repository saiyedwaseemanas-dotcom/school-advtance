import React from 'react';

interface ApkBuildModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCopySuccess: () => void;
}

export const ApkBuildModal: React.FC<ApkBuildModalProps> = ({
  isOpen,
  onClose,
  onCopySuccess,
}) => {
  if (!isOpen) return null;

  const handleCopyWorkflow = () => {
    navigator.clipboard?.writeText(`.github/workflows/build-apk.yml`);
    onCopySuccess();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#283044]/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-[#f2f3ff] flex items-center justify-between border-b border-[#eaedff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#15803d] text-[22px]">android</span>
            <span className="font-bold text-[15px] text-[#131b2e]">Build Android APK on GitHub</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#434655] hover:bg-[#eaedff] cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-3.5 text-[13px] text-[#434655]">
          <div className="bg-[#eaedff] p-3 rounded-xl border border-[#dbe1ff] flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#004ac6] text-[22px] shrink-0">
              check_circle
            </span>
            <span className="text-[#004ac6] font-semibold text-[12px]">
              Capacitor &amp; GitHub Actions workflow (<code className="font-mono">build-apk.yml</code>) are already configured and ready!
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#2563eb] text-white flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">
                1
              </span>
              <div>
                <strong className="text-[#131b2e] block">Push/Export Repository to GitHub</strong>
                <p className="text-[12px] text-[#515f74]">
                  Use AI Studio's <em>Export to GitHub</em> feature or push this repository to your GitHub account.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#2563eb] text-white flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">
                2
              </span>
              <div>
                <strong className="text-[#131b2e] block">Open the "Actions" Tab on GitHub</strong>
                <p className="text-[12px] text-[#515f74]">
                  In your repository on GitHub.com, navigate to the <strong>Actions</strong> tab. You will see the <strong>Build Android APK</strong> workflow.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#2563eb] text-white flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">
                3
              </span>
              <div>
                <strong className="text-[#131b2e] block">Run Workflow or Push a Commit</strong>
                <p className="text-[12px] text-[#515f74]">
                  Click <em>"Run workflow"</em> or push code. The GitHub Ubuntu runner will compile Vite, sync Capacitor, and run Gradle to build the debug APK.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#15803d] text-white flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">
                4
              </span>
              <div>
                <strong className="text-[#131b2e] block">Download Your APK Artifact</strong>
                <p className="text-[12px] text-[#515f74]">
                  Once the build turns green (takes ~2 minutes), click into the run and download the <strong>EduTrack-Debug-APK</strong> artifact.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#f2f3ff] p-3 rounded-xl border border-[#eaedff] space-y-1.5 font-mono text-[11px]">
            <div className="flex justify-between">
              <span className="text-[#434655]">App ID:</span>
              <span className="font-bold text-[#131b2e]">com.edutrack.app</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#434655]">Workflow:</span>
              <span className="font-bold text-[#004ac6]">.github/workflows/build-apk.yml</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#434655]">Output File:</span>
              <span className="font-bold text-[#15803d]">app-debug.apk</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#f2f3ff] border-t border-[#eaedff] flex justify-between items-center">
          <button
            onClick={handleCopyWorkflow}
            className="text-[12px] text-[#004ac6] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">content_copy</span>
            <span>Copy Workflow Path</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#004ac6] hover:bg-[#2563eb] text-white text-[12px] font-semibold cursor-pointer shadow-xs"
            type="button"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
