import React, { useState } from 'react';
import { ScreenTab, ShiftInfo } from '../../types';
import { ASSETS } from '../../data/mockData';

interface HomeOverviewScreenProps {
  shifts: ShiftInfo[];
  onNavigateTab: (tab: ScreenTab) => void;
  onOpenScanModal: () => void;
  onOpenSurplusModal: () => void;
  onShowToast: (msg: string) => void;
}

export const HomeOverviewScreen: React.FC<HomeOverviewScreenProps> = ({
  shifts,
  onNavigateTab,
  onOpenScanModal,
  onOpenSurplusModal,
  onShowToast,
}) => {
  const [showRecipePopover, setShowRecipePopover] = useState(false);
  const [isListedSurplus, setIsListedSurplus] = useState(false);

  const handleToggleSurplus = () => {
    if (!isListedSurplus) {
      setIsListedSurplus(true);
      onShowToast('Avocados & Oat Milk dispatched to Community Rescue feed!');
    } else {
      setIsListedSurplus(false);
      onShowToast('Surplus listing paused.');
    }
  };

  return (
    <div className="flex flex-col w-full px-4 py-2 space-y-4 max-w-md mx-auto">
      {/* Chef Greeting & Streak Header */}
      <div className="flex flex-col gap-1 pt-1">
        <div className="flex items-center justify-between">
          <span className="font-inter text-[12px] font-semibold text-[#55624b] uppercase tracking-wider">
            Tuesday, Oct 24
          </span>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4dfc5] text-[#241a09] shadow-xs">
            <span className="material-symbols-outlined text-[16px] text-[#403421]">
              local_fire_department
            </span>
            <span className="font-inter text-[11px] font-bold">18-Day Zero Waste Streak</span>
          </div>
        </div>

        <h1 className="font-outfit text-[26px] font-semibold text-[#181d14] tracking-tight mt-1">
          Good morning, Chef Sarah 👋
        </h1>
        <p className="font-inter text-[12px] text-[#454840]">
          Kitchen readiness is at 94%. Two high-value surplus items require quick attention before lunch prep.
        </p>
      </div>

      {/* Quick Operational Stats Row */}
      <div className="grid grid-cols-3 gap-2.5">
        {/* Stat 1: Expiring Items */}
        <div
          onClick={() => onNavigateTab('kitchen-inventory')}
          className="flex flex-col justify-between p-3 rounded-2xl bg-[#e5eada] shadow-xs cursor-pointer hover:bg-[#ebf0e0] transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="font-inter text-[11px] font-medium text-[#454840] truncate">
              Expiring 48h
            </span>
            <span className="w-2 h-2 rounded-full bg-[#D97706]" />
          </div>
          <div className="my-1.5">
            <span className="font-outfit text-[24px] font-semibold text-[#181d14] leading-none">
              5
            </span>
            <span className="font-inter text-[11px] text-[#454840] ml-0.5">items</span>
          </div>
          <span className="font-inter text-[10px] text-[#D97706] font-semibold leading-tight truncate">
            Needs triage
          </span>
        </div>

        {/* Stat 2: Rescued Weight */}
        <div
          onClick={() => onNavigateTab('impact-metrics')}
          className="flex flex-col justify-between p-3 rounded-2xl bg-[#f1f6e6] shadow-xs cursor-pointer hover:bg-[#ebf0e0] transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="font-inter text-[11px] font-medium text-[#55624b] truncate">
              Rescued
            </span>
            <span className="material-symbols-outlined text-[16px] text-[#455038]">eco</span>
          </div>
          <div className="my-1.5">
            <span className="font-outfit text-[24px] font-semibold text-[#455038] leading-none">
              38
            </span>
            <span className="font-inter text-[11px] text-[#55624b] ml-0.5">kg</span>
          </div>
          <span className="font-inter text-[10px] text-[#55624b] font-medium leading-tight truncate">
            +12% vs last wk
          </span>
        </div>

        {/* Stat 3: Grocery Budget */}
        <div
          onClick={() => onNavigateTab('meal-planner')}
          className="flex flex-col justify-between p-3 rounded-2xl bg-[#f4dfc5]/70 shadow-xs cursor-pointer hover:bg-[#f4dfc5] transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="font-inter text-[11px] font-medium text-[#403421] truncate">
              Budget
            </span>
            <span className="font-inter text-[10px] text-[#403421] font-bold">75%</span>
          </div>
          <div className="my-1">
            <div className="font-inter text-[14px] text-[#181d14] font-bold leading-tight truncate">
              $640
            </div>
            <div className="font-inter text-[10px] text-[#454840] leading-none truncate">
              of $850 cap
            </div>
          </div>
          <div className="w-full bg-white/80 h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#455038] h-full rounded-full" style={{ width: '75%' }} />
          </div>
        </div>
      </div>

      {/* Urgent Action Banner (Produce Alert) */}
      <div className="relative overflow-hidden rounded-3xl bg-white p-4 shadow-sm border border-[#c6c7bd]/30">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-[#f4dfc5] flex items-center justify-center flex-shrink-0 text-[#403421]">
            <span className="material-symbols-outlined text-[20px]">notification_important</span>
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="font-inter text-[11px] font-bold uppercase tracking-wider text-[#D97706]">
                Time-Sensitive Produce Alert
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D97706] animate-pulse" />
            </div>
            <h2 className="font-outfit text-[17px] font-semibold text-[#181d14] mt-0.5">
              8kg Organic Hass Avocados &amp; 12L Oat Milk
            </h2>
            <p className="font-inter text-[12px] text-[#454840] mt-1 leading-relaxed">
              Peak ripeness &amp; best-before in{' '}
              <strong className="text-[#181d14]">36 hours</strong>. Save an estimated $84 in inventory value now.
            </p>
          </div>
        </div>

        {/* Visual Item Preview Strip */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="flex items-center gap-2 p-2 rounded-xl bg-[#f1f6e6]">
            <img
              className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
              alt="Hass Avocados in Pantry A"
              src={ASSETS.avocadosPantry}
            />
            <div className="flex flex-col min-w-0">
              <span className="font-inter text-[11px] font-semibold text-[#181d14] truncate">
                8.2 kg in Pantry A
              </span>
              <span className="font-inter text-[10px] text-[#55624b] truncate">
                Optimal for Guac / Bowls
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-xl bg-[#f1f6e6]">
            <img
              className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
              alt="Barista Oat Milk Blend"
              src={ASSETS.oatMilkBarista}
            />
            <div className="flex flex-col min-w-0">
              <span className="font-inter text-[11px] font-semibold text-[#181d14] truncate">
                12L Barista Blend
              </span>
              <span className="font-inter text-[10px] text-[#55624b] truncate">
                Pudding or Drink Special
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => setShowRecipePopover(!showRecipePopover)}
            className="flex-1 h-12 px-4 rounded-full bg-[#455038] text-white font-inter text-[13px] font-semibold flex items-center justify-center gap-2 hover:bg-[#2f3923] transition-colors active:scale-[0.98] shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
            <span>Auto-Generate Daily Special</span>
          </button>

          <button
            onClick={handleToggleSurplus}
            className={`h-12 px-5 rounded-full font-inter text-[13px] font-semibold flex items-center justify-center gap-2 transition-colors active:scale-[0.98] cursor-pointer ${
              isListedSurplus
                ? 'bg-[#d8e8c9] text-[#131f0c]'
                : 'bg-[#f4dfc5] text-[#241a09] hover:bg-[#d7c4aa]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isListedSurplus ? 'check' : 'volunteer_activism'}
            </span>
            <span>{isListedSurplus ? 'Listed on Feed!' : 'List as Surplus'}</span>
          </button>
        </div>

        {/* Collapsible AI Suggestion Popover */}
        {showRecipePopover && (
          <div className="mt-3 p-3 rounded-2xl bg-[#ebf0e0] border border-[#c6c7bd]/30 transition-all animate-in fade-in">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-inter text-[11px] font-bold text-[#455038] flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">psychology</span> Chef&apos;s
                Copilot Suggestion:
              </span>
              <button
                onClick={() => setShowRecipePopover(false)}
                className="text-[#454840] hover:text-[#181d14] p-1"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
            <p className="font-inter text-[12px] text-[#181d14] leading-relaxed">
              Suggested Lunch Feature:{' '}
              <strong className="text-[#181d14]">
                Spiced Avocado &amp; Spelt Tartine with Oat-Chia Crema
              </strong>
              . Uses 7.5kg avocados + 4L oat milk, yielding 26 portions at 78% margin.
            </p>
            <div className="mt-2 pt-2 border-t border-[#c6c7bd]/30 flex justify-end">
              <button
                onClick={() => {
                  onNavigateTab('meal-planner');
                  onShowToast('Opening zero-waste menu feature in Meal Planner.');
                }}
                className="text-[12px] font-semibold text-[#2f3923] hover:underline flex items-center gap-1"
              >
                <span>View Full Recipe &amp; Schedule Batch</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Today's Service Forecast & Cost Tracking */}
      <div className="flex flex-col rounded-3xl bg-white p-4 shadow-sm border border-[#c6c7bd]/30">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#55624b]">restaurant</span>
            <h2 className="font-outfit text-[17px] font-semibold text-[#181d14]">
              Today&apos;s Service Forecast
            </h2>
          </div>
          <span className="font-inter text-[11px] px-2.5 py-0.5 rounded-full bg-[#d8e8c9] text-[#131f0c] font-semibold">
            168 Covers Est.
          </span>
        </div>

        {/* Cost Metric Banner */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-[#f1f6e6] mb-3">
          <div className="flex flex-col">
            <span className="font-inter text-[10px] text-[#454840] uppercase tracking-wider font-semibold">
              Projected Ingredient Cost
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-outfit text-[18px] font-bold text-[#181d14]">$142.50</span>
              <span className="font-inter text-[11px] text-[#55624b] font-medium">
                Wholesale supplier rate
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[#455038] font-inter text-[12px] font-bold bg-white px-2.5 py-1 rounded-full shadow-xs">
            <span className="material-symbols-outlined text-[16px]">trending_down</span>
            -8.4% waste
          </div>
        </div>

        {/* Shift List */}
        <div className="space-y-2">
          {/* Breakfast Service */}
          <div className="p-3 rounded-2xl bg-[#f1f6e6]/70 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#55624b] flex-shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-[18px]">wb_twilight</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-inter text-[13px] text-[#181d14] font-semibold">
                    Breakfast
                  </span>
                  <span className="font-inter text-[11px] text-[#55624b]">7:00 - 11:30 AM</span>
                </div>
                <span className="font-inter text-[11px] text-[#454840] truncate">
                  Sourdough loaves prepped • Ricotta batch verified
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[20px] text-[#455038]">
              check_circle
            </span>
          </div>

          {/* Lunch Service (Active Next) */}
          <div className="p-3.5 rounded-2xl bg-[#ebf0e0] flex flex-col gap-2 border border-[#d8e8c9]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-[#455038] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                  <span className="material-symbols-outlined text-[18px]">sunny</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-inter text-[13px] text-[#181d14] font-semibold">
                      Lunch Service
                    </span>
                    <span className="px-2 py-0.2 rounded-full bg-[#dae7c7] text-[#151e0b] text-[10px] font-bold uppercase">
                      Prepping
                    </span>
                  </div>
                  <span className="font-inter text-[11px] text-[#55624b]">
                    11:30 AM - 3:00 PM • 92 Expected guests
                  </span>
                </div>
              </div>
              <span className="font-inter text-[13px] font-bold text-[#181d14]">$82.00 cost</span>
            </div>

            {/* Checklist pills */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-[#181d14] text-[11px] font-medium shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#455038]" /> Green Goddess Dressing (3L)
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-[#181d14] text-[11px] font-medium shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" /> Heirloom Farro Base
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-[#181d14] text-[11px] font-medium shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#455038]" /> Poached Salmon Portions
              </span>
            </div>
          </div>

          {/* Dinner Service */}
          <div className="p-3 rounded-2xl bg-[#f1f6e6]/70 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#55624b] flex-shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-[18px]">dark_mode</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-inter text-[13px] text-[#181d14] font-semibold">
                    Dinner Service
                  </span>
                  <span className="font-inter text-[11px] text-[#55624b]">5:00 - 9:30 PM</span>
                </div>
                <span className="font-inter text-[11px] text-[#454840] truncate">
                  Braised short-rib stock reducing • Focaccia proving
                </span>
              </div>
            </div>
            <span className="font-inter text-[12px] text-[#454840] font-medium">42 Booked</span>
          </div>
        </div>
      </div>

      {/* Community Rescue Spotlight */}
      <div className="flex flex-col rounded-3xl bg-white p-4 shadow-sm border border-[#c6c7bd]/30">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#403421]">handshake</span>
            <h2 className="font-outfit text-[17px] font-semibold text-[#181d14]">
              Community Rescue Spotlight
            </h2>
          </div>
          <span className="font-inter text-[11px] text-[#55624b] font-bold">1 Dispatch Active</span>
        </div>

        {/* Active Donation Partner Card */}
        <div className="p-3 rounded-2xl bg-[#f1f6e6] flex flex-col gap-2.5 border border-[#c6c7bd]/20">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                alt="Community Food Pantry Shelter"
                src={ASSETS.shelterCommunity}
              />
              <div className="flex flex-col min-w-0">
                <span className="font-inter text-[13px] font-bold text-[#181d14] truncate">
                  City Hope Community Shelter
                </span>
                <span className="font-inter text-[11px] text-[#454840]">
                  15 Prepared Breakfast &amp; Bakery Boxes
                </span>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#d8e8c9] text-[#131f0c] text-[11px] font-semibold flex-shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#455038]" /> Confirmed
            </span>
          </div>

          <div className="flex items-center justify-between pt-1 text-[#454840] border-t border-[#c6c7bd]/20">
            <div className="flex items-center gap-1.5 font-inter text-[11px]">
              <span className="material-symbols-outlined text-[16px] text-[#455038]">schedule</span>
              <span>
                Pickup Window: <strong className="text-[#181d14]">Today 4:30 – 5:30 PM</strong>
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-inter text-[#55624b]">
              <span className="material-symbols-outlined text-[14px]">pin_drop</span>
              <span>0.8 mi away</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Navigation Action Tiles (4 Grid) */}
      <div className="flex flex-col gap-2 pb-2">
        <h2 className="font-outfit text-[17px] font-semibold text-[#181d14]">
          Quick Kitchen Workflows
        </h2>
        <div className="grid grid-cols-2 gap-2.5">
          {/* Tile 1 */}
          <button
            onClick={() => onNavigateTab('kitchen-inventory')}
            className="flex flex-col p-3 rounded-2xl bg-white hover:bg-[#ebf0e0] transition-all shadow-xs border border-[#c6c7bd]/30 text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-[#ebf0e0] group-hover:bg-[#455038] group-hover:text-white flex items-center justify-center text-[#455038] transition-colors mb-2">
              <span className="material-symbols-outlined text-[20px]">inventory_2</span>
            </div>
            <span className="font-inter text-[13px] font-semibold text-[#181d14]">Smart Restock</span>
            <span className="font-inter text-[11px] text-[#454840] mt-0.5 leading-snug">
              Predict next week supplier POs
            </span>
          </button>

          {/* Tile 2 */}
          <button
            onClick={onOpenScanModal}
            className="flex flex-col p-3 rounded-2xl bg-white hover:bg-[#ebf0e0] transition-all shadow-xs border border-[#c6c7bd]/30 text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-[#ebf0e0] group-hover:bg-[#455038] group-hover:text-white flex items-center justify-center text-[#455038] transition-colors mb-2">
              <span className="material-symbols-outlined text-[20px]">barcode_scanner</span>
            </div>
            <span className="font-inter text-[13px] font-semibold text-[#181d14]">Scan Invoices</span>
            <span className="font-inter text-[11px] text-[#454840] mt-0.5 leading-snug">
              Instant OCR optical item log
            </span>
          </button>

          {/* Tile 3 */}
          <button
            onClick={() => onNavigateTab('food-rescue')}
            className="flex flex-col p-3 rounded-2xl bg-white hover:bg-[#ebf0e0] transition-all shadow-xs border border-[#c6c7bd]/30 text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-[#ebf0e0] group-hover:bg-[#455038] group-hover:text-white flex items-center justify-center text-[#455038] transition-colors mb-2">
              <span className="material-symbols-outlined text-[20px]">share_location</span>
            </div>
            <span className="font-inter text-[13px] font-semibold text-[#181d14]">Rescue Feed</span>
            <span className="font-inter text-[11px] text-[#454840] mt-0.5 leading-snug">
              Post surplus to local pantries
            </span>
          </button>

          {/* Tile 4 */}
          <button
            onClick={() => onNavigateTab('impact-metrics')}
            className="flex flex-col p-3 rounded-2xl bg-white hover:bg-[#ebf0e0] transition-all shadow-xs border border-[#c6c7bd]/30 text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-[#ebf0e0] group-hover:bg-[#455038] group-hover:text-white flex items-center justify-center text-[#455038] transition-colors mb-2">
              <span className="material-symbols-outlined text-[20px]">analytics</span>
            </div>
            <span className="font-inter text-[13px] font-semibold text-[#181d14]">SDG Impact</span>
            <span className="font-inter text-[11px] text-[#454840] mt-0.5 leading-snug">
              Scope 3 CO2 emissions &amp; tax slips
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
