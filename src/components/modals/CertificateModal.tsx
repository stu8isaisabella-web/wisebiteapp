import React from 'react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
  onShare: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  onDownload,
  onShare,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl flex flex-col gap-4 border border-[#c6c7bd]/30 max-h-[90vh] overflow-y-auto text-center">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#ebf0e0] text-[#454840] hover:text-[#181d14] flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="w-16 h-16 rounded-full bg-[#d8e8c9] text-[#2f3923] flex items-center justify-center mx-auto shadow-sm">
          <span className="material-symbols-outlined text-[36px]">workspace_premium</span>
        </div>

        <div className="flex flex-col gap-1">
          <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-[#dae7c7] text-[#151e0b] text-[12px] font-bold mx-auto">
            <span>OFFICIAL CERTIFICATE</span>
          </div>
          <h3 className="font-outfit text-[22px] font-bold text-[#181d14] mt-1">
            Zero-Waste Verified Kitchen
          </h3>
          <p className="font-inter text-[13px] text-[#454840]">
            Awarded to <strong>The Rustic Olive Cafe &amp; Bistro</strong>
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#f1f6e6] text-left text-[12px] space-y-2 border border-[#c6c7bd]/30">
          <div className="flex justify-between">
            <span className="text-[#454840]">Registration No:</span>
            <span className="font-bold text-[#181d14]">#WB-2024-992</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#454840]">Audit Period:</span>
            <span className="font-bold text-[#181d14]">October 2024</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#454840]">Total Waste Prevented:</span>
            <span className="font-bold text-[#2f3923]">342 kg (100% Diversion)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#454840]">Meals Provided to Shelters:</span>
            <span className="font-bold text-[#2f3923]">684 Meals</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#454840]">Greenhouse Gas Avoided:</span>
            <span className="font-bold text-[#2f3923]">855 kg CO₂e</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <button
            onClick={() => {
              onDownload();
              onClose();
            }}
            className="w-full h-11 rounded-full bg-[#2f3923] text-white font-inter text-[13px] font-semibold flex items-center justify-center gap-2 hover:bg-[#455038] transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Download High-Res PDF Certificate</span>
          </button>
          <button
            onClick={() => {
              onShare();
              onClose();
            }}
            className="w-full h-11 rounded-full bg-[#ebf0e0] text-[#181d14] font-inter text-[13px] font-semibold flex items-center justify-center gap-2 hover:bg-[#e0e4d5] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">share</span>
            <span>Share Audit Badge</span>
          </button>
        </div>
      </div>
    </div>
  );
};
