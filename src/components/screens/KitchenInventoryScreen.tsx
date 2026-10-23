import React, { useState } from 'react';
import { InventoryItem, ScreenTab } from '../../types';
import { filterInventory, calculateSalvageValueAtRisk } from '../../utils/kitchenLogic';

interface KitchenInventoryScreenProps {
  items: InventoryItem[];
  onOpenScanModal: () => void;
  onOpenSurplusModalWithItem: (itemName: string) => void;
  onNavigateTab: (tab: ScreenTab) => void;
  onMarkItemUsed: (itemId: string) => void;
  onShowToast: (msg: string) => void;
}

export const KitchenInventoryScreen: React.FC<KitchenInventoryScreenProps> = ({
  items,
  onOpenScanModal,
  onOpenSurplusModalWithItem,
  onNavigateTab,
  onMarkItemUsed,
  onShowToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'critical' | 'cooler' | 'pantry' | 'freezer'>('all');
  const [batchRemindersEnabled, setBatchRemindersEnabled] = useState(true);

  const filteredItems = filterInventory(items, searchQuery, activeFilter);
  const criticalItems = filteredItems.filter((i) => i.category === 'critical' || i.expiryHours <= 48);
  const safeItems = filteredItems.filter((i) => i.category === 'safe' && i.expiryHours > 48);
  const salvageValue = calculateSalvageValueAtRisk(items);

  const filterTabs = [
    { id: 'all', label: 'All (42)' },
    { id: 'critical', label: 'Expiring Soon (5)', hasDot: true },
    { id: 'cooler', label: 'Walk-in Cooler (18)' },
    { id: 'pantry', label: 'Dry Pantry (14)' },
    { id: 'freezer', label: 'Freezer (10)' },
  ];

  return (
    <div className="flex flex-col w-full gap-4 px-4 pb-6 max-w-md mx-auto">
      {/* Interactive Search & Action Top Deck */}
      <section className="flex flex-col gap-2 pt-1">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative flex items-center">
            <span className="material-symbols-outlined absolute left-3.5 text-[#454840] text-[20px] pointer-events-none">
              search
            </span>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ingredients, batches, or suppliers..."
              className="w-full h-12 pl-11 pr-4 rounded-2xl bg-[#f1f6e6] text-[#181d14] placeholder:text-[#454840]/60 font-inter text-[13px] focus:bg-white focus:outline-none transition-all shadow-xs border border-transparent focus:border-[#455038]"
            />
          </div>
          <button
            onClick={onOpenScanModal}
            title="Scan Label / Add Produce"
            className="h-12 px-4 rounded-2xl bg-[#455038] text-white flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform flex-shrink-0 cursor-pointer hover:bg-[#2f3923]"
          >
            <span className="material-symbols-outlined text-[20px]">qr_code_scanner</span>
            <span className="font-inter text-[13px] font-semibold hidden xs:inline">+ Scan</span>
          </button>
        </div>

        {/* Scrollable Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 -mx-4 px-4">
          {filterTabs.map((tab) => {
            const isSelected = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() =>
                  setActiveFilter(tab.id as 'all' | 'critical' | 'cooler' | 'pantry' | 'freezer')
                }
                className={`px-3.5 py-1.5 rounded-full font-inter text-[12px] font-semibold flex-shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-[#2f3923] text-white shadow-xs'
                    : 'bg-[#ebf0e0] text-[#454840] hover:bg-[#e5eada]'
                }`}
              >
                {tab.hasDot && <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a]" />}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Ambient Hero Insight Banner */}
      <div className="w-full bg-[#f1f6e6] rounded-2xl p-4 flex items-center justify-between gap-3 shadow-xs border border-[#c6c7bd]/30">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-[#f4dfc5] flex items-center justify-center text-[#241a09] flex-shrink-0">
            <span className="material-symbols-outlined text-[22px]">timer</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-outfit text-[16px] font-semibold text-[#181d14] truncate">
              {criticalItems.length} Critical Batches
            </span>
            <span className="font-inter text-[12px] text-[#454840] truncate">
              Estimated ${salvageValue.toFixed(2)} salvage value at risk
            </span>
          </div>
        </div>
        <button
          onClick={() => {
            onNavigateTab('meal-planner');
            onShowToast('Auto-planning zero waste menu using critical batches.');
          }}
          className="h-9 px-3 rounded-full bg-[#403421] text-white font-inter text-[11px] font-bold flex items-center gap-1 flex-shrink-0 active:scale-95 transition-transform hover:bg-[#241a09] cursor-pointer"
        >
          <span>Auto-Plan</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>

      {/* SECTION 1: Critical (Next 24 - 48 Hours) */}
      {(activeFilter === 'all' || activeFilter === 'critical') && criticalItems.length > 0 && (
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a] animate-pulse" />
              <h2 className="font-outfit text-[18px] font-semibold text-[#181d14]">
                Critical (Next 24 - 48 Hours)
              </h2>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] font-inter text-[11px] font-bold">
              High Urgency
            </span>
          </div>

          {criticalItems.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-2xl p-4 shadow-xs flex flex-col gap-3 border border-[#c6c7bd]/30 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-3">
                {item.imageUrl ? (
                  <img
                    className="w-16 h-16 rounded-xl object-cover bg-[#e5eada] flex-shrink-0"
                    alt={item.imageAlt}
                    src={item.imageUrl}
                  />
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-[#e5eada] flex items-center justify-center text-[#2f3923] flex-shrink-0">
                    <span className="material-symbols-outlined text-[28px]">inventory_2</span>
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h3 className="font-outfit text-[16px] font-semibold text-[#181d14] truncate">
                      {item.name}
                    </h3>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#f4dfc5] text-[#241a09] font-inter text-[11px] font-semibold flex-shrink-0">
                      <span className="material-symbols-outlined text-[13px]">alarm</span>
                      {item.expiryLabel}
                    </span>
                  </div>

                  <p className="font-inter text-[12px] text-[#454840] mt-0.5 truncate">
                    <span className="font-bold text-[#2f3923]">{item.quantity}</span> •{' '}
                    {item.locationLabel}
                  </p>

                  <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#f1f6e6] text-[#454840] font-inter text-[11px]">
                    <span className="material-symbols-outlined text-[14px] text-[#55624b]">
                      local_shipping
                    </span>
                    <span className="truncate">
                      Est. replacement: ${item.estReplacementCost.toFixed(2)} ({item.supplier})
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1 border-t border-[#ebf0e0]/60">
                <button
                  onClick={() => {
                    onNavigateTab('meal-planner');
                    onShowToast(`Crafting rescue recipe for ${item.name}...`);
                  }}
                  className="flex-1 h-9 rounded-full bg-[#d8e8c9] text-[#131f0c] font-inter text-[12px] font-semibold flex items-center justify-center gap-1.5 hover:opacity-90 active:scale-95 transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {item.id === 'item-3' ? 'blender' : 'menu_book'}
                  </span>
                  <span>
                    {item.id === 'item-1'
                      ? 'Generate Recipe'
                      : item.id === 'item-2'
                      ? 'Recipe Ideas'
                      : 'Prep Sauce Batch'}
                  </span>
                </button>

                <button
                  onClick={() => {
                    if (item.id === 'item-3') {
                      onMarkItemUsed(item.id);
                    } else {
                      onOpenSurplusModalWithItem(item.name);
                    }
                  }}
                  className={`flex-1 h-9 rounded-full font-inter text-[12px] font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer ${
                    item.id === 'item-3'
                      ? 'bg-[#ebf0e0] text-[#454840] hover:bg-[#e0e4d5]'
                      : 'bg-[#584a36] text-white hover:bg-[#403421]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {item.id === 'item-1'
                      ? 'volunteer_activism'
                      : item.id === 'item-2'
                      ? 'local_mall'
                      : 'fast_forward'}
                  </span>
                  <span>
                    {item.id === 'item-1'
                      ? 'Donate Surplus'
                      : item.id === 'item-2'
                      ? 'Rescue Listing'
                      : 'Mark Used'}
                  </span>
                </button>
              </div>
            </article>
          ))}
        </section>
      )}

      {/* SECTION 2: Safe & Stable (3 - 7 Days) */}
      {(activeFilter === 'all' || activeFilter !== 'critical') && safeItems.length > 0 && (
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#55624b]" />
              <h2 className="font-outfit text-[18px] font-semibold text-[#181d14]">
                Safe &amp; Stable (3 - 7 Days)
              </h2>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#d8e8c9] text-[#131f0c] font-inter text-[11px] font-semibold">
              Optimal
            </span>
          </div>

          {safeItems.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-2xl p-4 shadow-xs flex items-center justify-between gap-3 border border-[#c6c7bd]/30 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-[#ebf0e0] flex items-center justify-center text-[#455038] flex-shrink-0">
                  <span className="material-symbols-outlined text-[24px]">
                    {item.id === 'item-4'
                      ? 'bakery_dining'
                      : item.id === 'item-5'
                      ? 'egg'
                      : 'eco'}
                  </span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-outfit text-[15px] font-semibold text-[#181d14] truncate">
                    {item.name}
                  </h3>
                  <p className="font-inter text-[12px] text-[#454840]">
                    {item.quantity} • {item.locationLabel}
                  </p>
                  <span className="font-inter text-[11px] text-[#55624b] font-medium">
                    Est. replacement: ${item.estReplacementCost.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#e5eada] text-[#454840] font-inter text-[11px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#55624b]" />
                  {item.expiryLabel}
                </span>
                <button
                  onClick={() => onShowToast(`Batch details for ${item.name} up to date.`)}
                  aria-label="Options"
                  className="text-[#454840] hover:text-[#181d14] p-1 rounded-full"
                >
                  <span className="material-symbols-outlined text-[18px]">more_vert</span>
                </button>
              </div>
            </article>
          ))}
        </section>
      )}

      {/* Smart Batch Expiry Reminder Settings Snippet */}
      <section className="bg-[#f1f6e6] rounded-2xl p-4 flex flex-col gap-3 shadow-xs border border-[#c6c7bd]/30">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#d8e8c9] flex items-center justify-center text-[#131f0c] flex-shrink-0">
              <span className="material-symbols-outlined text-[22px]">notifications_active</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-outfit text-[16px] font-semibold text-[#181d14]">
                Smart Batch Reminders
              </span>
              <p className="font-inter text-[12px] text-[#454840] leading-relaxed">
                Auto-remind kitchen team 3 days before expiry to avoid over-ordering and minimize prep waste.
              </p>
            </div>
          </div>

          {/* Interactive Toggle */}
          <label className="relative inline-flex items-center cursor-pointer flex-shrink-0 mt-1">
            <input
              type="checkbox"
              checked={batchRemindersEnabled}
              onChange={() => {
                const nextState = !batchRemindersEnabled;
                setBatchRemindersEnabled(nextState);
                onShowToast(
                  nextState
                    ? 'Smart batch reminders activated for morning prep.'
                    : 'Smart reminders paused.'
                );
              }}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-[#e0e4d5] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#e0e4d5] after:border-0 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#455038]" />
          </label>
        </div>

        {/* Active Schedule Pill Tag */}
        <div className="flex items-center justify-between pt-2 border-t border-[#c6c7bd]/20 text-[#454840]">
          <span className="font-inter text-[11px] flex items-center gap-1 text-[#55624b]">
            <span className="material-symbols-outlined text-[14px]">tune</span>
            Daily summary sent to Head Chef at 07:00 AM
          </span>
          <button
            onClick={() => onShowToast('Notification schedule: 07:00 AM & 15:30 PM (before dinner prep).')}
            className="font-inter text-[11px] text-[#2f3923] underline underline-offset-2 hover:opacity-80 font-medium"
          >
            Edit Schedule
          </button>
        </div>
      </section>
    </div>
  );
};
