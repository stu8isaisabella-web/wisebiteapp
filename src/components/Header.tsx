import React from 'react';
import { ScreenTab } from '../types';
import { ASSETS } from '../data/mockData';

interface HeaderProps {
  currentTab: ScreenTab;
  unreadAlertsCount: number;
  onOpenAlerts: () => void;
  onOpenProfile: () => void;
}

const TAB_TITLES: Record<ScreenTab, string> = {
  'home-overview': 'Home Overview',
  'kitchen-inventory': 'Kitchen Inventory',
  'meal-planner': 'Meal Planner',
  'food-rescue': 'Food Rescue',
  'impact-metrics': 'Impact Metrics',
};

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  unreadAlertsCount,
  onOpenAlerts,
  onOpenProfile,
}) => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#f7fbeb]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(47,57,35,0.05)] border-b border-[#c6c7bd]/30">
      <div className="max-w-md mx-auto h-16 px-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <img
            alt="WiseBite Brand Logo"
            className="h-8 w-auto object-contain flex-shrink-0"
            src={ASSETS.logo}
          />
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-outfit font-medium text-[16px] sm:text-[18px] text-[#181d14] truncate leading-tight">
                The Rustic Olive Cafe &amp; Bistro
              </span>
              <span className="hidden xs:inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#d8e8c9] text-[#131f0c] text-[11px] font-semibold flex-shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-[#455038]" />
                Active
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] leading-tight">
              <span className="text-[#454840] font-medium truncate">
                {TAB_TITLES[currentTab]}
              </span>
              <span className="text-[#454840]/40">•</span>
              <span className="text-[#55624b] font-medium truncate">
                SDG Impact Verified
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            aria-label="Expiring Inventory Alerts"
            onClick={onOpenAlerts}
            className="relative w-10 h-10 flex items-center justify-center rounded-full text-[#454840] hover:text-[#181d14] hover:bg-[#e5eada] transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {unreadAlertsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#584a36] text-white text-[10px] flex items-center justify-center font-bold ring-2 ring-[#f7fbeb]">
                {unreadAlertsCount}
              </span>
            )}
          </button>

          <button
            aria-label="View Profile"
            onClick={onOpenProfile}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#e5eada] transition-colors"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-[#455038]/20"
              src={ASSETS.profile}
            />
          </button>
        </div>
      </div>
    </header>
  );
};
