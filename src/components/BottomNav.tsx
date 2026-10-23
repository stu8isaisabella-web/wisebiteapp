import React from 'react';
import { ScreenTab } from '../types';

interface BottomNavProps {
  currentTab: ScreenTab;
  onTabChange: (tab: ScreenTab) => void;
  rescueCount?: number;
}

interface NavItem {
  id: ScreenTab;
  label: string;
  icon: string;
  badge?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onTabChange,
  rescueCount = 4,
}) => {
  const navItems: NavItem[] = [
    { id: 'home-overview', label: 'Home', icon: 'dashboard' },
    { id: 'kitchen-inventory', label: 'Kitchen', icon: 'kitchen' },
    { id: 'meal-planner', label: 'Meal Plan', icon: 'menu_book' },
    { id: 'food-rescue', label: 'Rescue', icon: 'volunteer_activism', badge: rescueCount },
    { id: 'impact-metrics', label: 'Impact', icon: 'eco' },
  ];

  return (
    <nav
      aria-label="Bottom Navigation"
      className="fixed bottom-3 inset-x-0 z-50 px-4 flex justify-center pointer-events-none pb-safe"
    >
      <div className="pointer-events-auto w-full max-w-md bg-white/95 backdrop-blur-xl rounded-full shadow-[0_12px_32px_-4px_rgba(35,40,30,0.14),0_4px_12px_-2px_rgba(35,40,30,0.06)] px-2 py-1.5 flex items-center justify-between border border-[#c6c7bd]/30">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
              className={`relative flex flex-col items-center justify-center gap-0.5 min-w-[58px] sm:min-w-[62px] h-12 rounded-full transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#d8e8c9] text-[#2f3923] font-semibold shadow-sm'
                  : 'text-[#454840] hover:text-[#181d14] hover:bg-[#ebf0e0]/50'
              }`}
            >
              {item.badge && item.badge > 0 && (
                <span className="absolute -top-1 right-2 px-1.5 py-0.2 rounded-full bg-[#f4dfc5] text-[#241a09] text-[10px] font-bold ring-1 ring-white">
                  {item.badge}
                </span>
              )}
              <span className="material-symbols-outlined text-[22px]">
                {item.icon}
              </span>
              <span className="font-inter text-[11px] leading-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
