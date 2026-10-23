import React from 'react';

interface AlertsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onActionItem?: (type: string) => void;
}

export const AlertsModal: React.FC<AlertsModalProps> = ({ isOpen, onClose, onActionItem }) => {
  if (!isOpen) return null;

  const alerts = [
    {
      id: 'a1',
      title: 'Time-Sensitive Produce Alert',
      severity: 'high',
      time: '36 hours left',
      message: '8.5kg Organic Hass Avocados and 12L Barista Oat Milk reaching peak ripeness in Pantry A and Dairy Chiller.',
      actionLabel: 'View in Kitchen',
      actionKey: 'kitchen',
    },
    {
      id: 'a2',
      title: 'Donation Scheduled',
      severity: 'info',
      time: 'Today 4:00 - 6:30 PM',
      message: 'St. Vincent Community Kitchen assigned 3 transit volunteers for 18 sourdough loaves.',
      actionLabel: 'View Dispatch',
      actionKey: 'rescue',
    },
    {
      id: 'a3',
      title: 'Zero-Waste Milestone Tier 1',
      severity: 'success',
      time: 'Week 4 Active',
      message: 'The Rustic Olive Cafe achieved 100% landfill diversion rate this sprint!',
      actionLabel: 'Check Audit Report',
      actionKey: 'impact',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl p-5 shadow-2xl flex flex-col gap-4 border border-[#c6c7bd]/30 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-[#ebf0e0] pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#f4dfc5] text-[#403421] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">notifications</span>
            </div>
            <h3 className="font-outfit text-[18px] font-semibold text-[#181d14]">
              Kitchen Notices &amp; Alerts
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#ebf0e0] text-[#454840] hover:text-[#181d14] flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="p-3.5 rounded-2xl bg-[#f1f6e6] flex flex-col gap-2 border border-[#c6c7bd]/20"
            >
              <div className="flex items-center justify-between">
                <span className="font-inter text-[13px] font-bold text-[#181d14]">
                  {alert.title}
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#e5eada] text-[#454840] font-medium">
                  {alert.time}
                </span>
              </div>
              <p className="font-inter text-[12px] text-[#454840] leading-relaxed">
                {alert.message}
              </p>
              <button
                onClick={() => {
                  onClose();
                  if (onActionItem) onActionItem(alert.actionKey);
                }}
                className="self-start text-[12px] font-semibold text-[#2f3923] hover:underline flex items-center gap-1 mt-0.5"
              >
                <span>{alert.actionLabel}</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full h-11 rounded-full bg-[#455038] text-white font-inter text-[14px] font-semibold hover:bg-[#2f3923] transition-colors mt-2"
        >
          Dismiss All Notices
        </button>
      </div>
    </div>
  );
};
