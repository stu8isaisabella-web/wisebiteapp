import React, { useState } from 'react';
import { BeneficiaryRecord } from '../../types';

interface ImpactMetricsScreenProps {
  beneficiaries: BeneficiaryRecord[];
  onOpenCertificateModal: () => void;
  onDownloadPdf: () => void;
  onShareBadge: () => void;
  onShowToast: (msg: string) => void;
}

export const ImpactMetricsScreen: React.FC<ImpactMetricsScreenProps> = ({
  beneficiaries,
  onOpenCertificateModal,
  onDownloadPdf,
  onShareBadge,
  onShowToast,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'month' | 'quarter' | 'year'>('month');

  return (
    <div className="flex flex-col w-full px-4 pb-6 gap-y-4 max-w-md mx-auto">
      {/* Celebratory Header Toast */}
      <div className="w-full bg-[#d8e8c9] text-[#131f0c] rounded-2xl p-4 shadow-xs flex items-center justify-between gap-3 border border-[#c6c7bd]/30">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0 text-[#2f3923] shadow-xs">
            <span className="material-symbols-outlined text-[22px]">workspace_premium</span>
          </div>
          <div className="flex flex-col min-w-0">
            <p className="font-outfit text-[16px] font-semibold leading-tight truncate">
              Zero-Landfill Milestone
            </p>
            <p className="font-inter text-[11px] text-[#3e4b34] truncate mt-0.5">
              Week 4 running: 100% diversion achieved!
            </p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-white font-inter text-[11px] text-[#2f3923] font-bold flex-shrink-0 shadow-2xs">
          Tier 1
        </span>
      </div>

      {/* Hero Impact Summary Card */}
      <section className="w-full bg-[#f4dfc5] rounded-3xl p-5 text-[#2f3923] relative overflow-hidden shadow-sm border border-[#d7c4aa]">
        <div className="absolute -right-6 -bottom-6 w-36 h-36 rounded-full bg-[#dae7c7]/40 pointer-events-none blur-xl" />

        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="font-inter text-[11px] font-bold uppercase tracking-wider text-[#524531] block">
              October Overview
            </span>
            <h2 className="font-outfit text-[26px] font-semibold text-[#2f3923] mt-0.5">
              Total Impact
            </h2>
          </div>
          <button
            onClick={() => {
              const nextPeriod = selectedPeriod === 'month' ? 'quarter' : 'month';
              setSelectedPeriod(nextPeriod);
              onShowToast(`Filtered impact logs for ${nextPeriod === 'month' ? 'October 2024' : 'Q3-Q4 2024'}.`);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 text-[#2f3923] shadow-xs cursor-pointer hover:bg-white"
          >
            <span className="material-symbols-outlined text-[16px] text-[#55624b]">calendar_today</span>
            <span className="font-inter text-[11px] font-bold">
              {selectedPeriod === 'month' ? 'This Month' : 'This Quarter'}
            </span>
          </button>
        </div>

        {/* 3 Core Metric Blocks */}
        <div className="grid grid-cols-1 gap-2.5">
          <div className="bg-white/90 rounded-2xl p-4 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-xl bg-[#dae7c7] flex items-center justify-center text-[#2f3923] flex-shrink-0">
                <span className="material-symbols-outlined text-[24px]">scale</span>
              </div>
              <div className="min-w-0">
                <div className="flex items-baseline gap-1">
                  <span className="font-outfit text-[32px] font-semibold text-[#2f3923] leading-tight">
                    342
                  </span>
                  <span className="font-outfit text-[18px] font-semibold text-[#55624b]">kg</span>
                </div>
                <p className="font-inter text-[11px] text-[#454840] truncate">
                  Kitchen Waste Prevented
                </p>
              </div>
            </div>
            <span className="font-inter text-[11px] font-bold px-2 py-1 rounded-full bg-[#d8e8c9] text-[#131f0c]">
              +18% vs Sep
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-white/90 rounded-2xl p-3.5 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-xl bg-[#d7c4aa]/50 flex items-center justify-center text-[#403421] flex-shrink-0">
                  <span className="material-symbols-outlined text-[20px]">volunteer_activism</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-[#455038]" />
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="font-outfit text-[22px] font-semibold text-[#2f3923]">684</span>
                  <span className="font-inter text-[11px] text-[#55624b]">meals</span>
                </div>
                <p className="font-inter text-[11px] text-[#454840] truncate">Rescued &amp; Donated</p>
              </div>
            </div>

            <div className="bg-white/90 rounded-2xl p-3.5 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-xl bg-[#d8e8c9] flex items-center justify-center text-[#2f3923] flex-shrink-0">
                  <span className="material-symbols-outlined text-[20px]">savings</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-[#55624b]" />
              </div>
              <div>
                <div className="flex items-baseline gap-0.5">
                  <span className="font-outfit text-[22px] font-semibold text-[#2f3923]">
                    $1,840
                  </span>
                </div>
                <p className="font-inter text-[11px] text-[#454840] truncate">Procurement Saved</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UN Sustainable Development Goals Section */}
      <section className="flex flex-col gap-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-5 rounded-full bg-[#2f3923]" />
            <h3 className="font-outfit text-[18px] font-semibold text-[#181d14]">
              UN SDG Alignment
            </h3>
          </div>
          <span className="font-inter text-[11px] text-[#55624b] bg-[#e5eada] px-2.5 py-1 rounded-full font-semibold">
            Audited Impact
          </span>
        </div>

        {/* SDG Cards List */}
        <div className="space-y-2.5">
          {/* SDG 2 */}
          <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#c6c7bd]/30 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="px-2.5 py-1 rounded-lg bg-[#DDA63A] text-white font-inter text-[11px] font-bold flex items-center gap-1 shadow-xs">
                  <span className="material-symbols-outlined text-[15px]">restaurant</span>
                  <span>SDG 2</span>
                </div>
                <span className="font-outfit text-[16px] font-semibold text-[#181d14]">
                  Zero Hunger
                </span>
              </div>
              <span className="font-inter text-[11px] text-[#2f3923] font-bold bg-[#dae7c7] px-2 py-0.5 rounded-full">
                Primary
              </span>
            </div>
            <p className="font-inter text-[12px] text-[#454840] leading-relaxed">
              <strong className="font-semibold text-[#181d14]">684 nutrient-rich meals</strong> safely routed to 3 active local shelters, including hot dinner prep and perishable produce bags.
            </p>
            <div className="w-full bg-[#f1f6e6] h-1.5 rounded-full overflow-hidden mt-1">
              <div className="bg-[#DDA63A] h-full rounded-full" style={{ width: '86%' }} />
            </div>
          </div>

          {/* SDG 12 */}
          <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#c6c7bd]/30 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="px-2.5 py-1 rounded-lg bg-[#BF8B2E] text-white font-inter text-[11px] font-bold flex items-center gap-1 shadow-xs">
                  <span className="material-symbols-outlined text-[15px]">autorenew</span>
                  <span>SDG 12</span>
                </div>
                <span className="font-outfit text-[16px] font-semibold text-[#181d14]">
                  Responsible Consumption
                </span>
              </div>
              <span className="font-inter text-[11px] text-[#55624b] font-medium">Kitchen ops</span>
            </div>
            <p className="font-inter text-[12px] text-[#454840] leading-relaxed">
              <strong className="font-semibold text-[#181d14]">94.2% of pantry inventory</strong> utilized before expiry date via automated menu prep alerts and daily chef rotations.
            </p>
            <div className="w-full bg-[#f1f6e6] h-1.5 rounded-full overflow-hidden mt-1">
              <div className="bg-[#BF8B2E] h-full rounded-full" style={{ width: '94%' }} />
            </div>
          </div>

          {/* SDG 13 */}
          <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#c6c7bd]/30 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="px-2.5 py-1 rounded-lg bg-[#3F7E44] text-white font-inter text-[11px] font-bold flex items-center gap-1 shadow-xs">
                  <span className="material-symbols-outlined text-[15px]">park</span>
                  <span>SDG 13</span>
                </div>
                <span className="font-outfit text-[16px] font-semibold text-[#181d14]">
                  Climate Action
                </span>
              </div>
              <span className="font-inter text-[11px] text-[#55624b] font-medium">Scope 3</span>
            </div>
            <p className="font-inter text-[12px] text-[#454840] leading-relaxed">
              <strong className="font-semibold text-[#181d14]">855 kg CO2e greenhouse emissions</strong> eliminated by diverting organic solid waste away from municipal landfills.
            </p>
            <div className="w-full bg-[#f1f6e6] h-1.5 rounded-full overflow-hidden mt-1">
              <div className="bg-[#3F7E44] h-full rounded-full" style={{ width: '78%' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Visual Analytics & Charts Section */}
      <section className="flex flex-col gap-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-5 rounded-full bg-[#55624b]" />
            <h3 className="font-outfit text-[18px] font-semibold text-[#181d14]">
              Analytics &amp; Lifecycle
            </h3>
          </div>
          <button
            onClick={() => onShowToast('Full kitchen audit logs synced with cloud inventory.')}
            className="text-[#55624b] font-inter text-[12px] font-semibold flex items-center gap-0.5 hover:underline"
          >
            <span>Insights</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        {/* Chart Card 1: Weekly Progress Bar Graph */}
        <div className="bg-white rounded-3xl p-5 shadow-xs border border-[#c6c7bd]/30 flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-outfit text-[16px] font-semibold text-[#181d14]">
                Weekly Waste Target
              </h4>
              <p className="font-inter text-[11px] text-[#454840]">
                Efficiency performance vs 90% benchmark
              </p>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#d8e8c9] text-[#131f0c] font-inter text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2f3923]" />
              <span>Target Met</span>
            </div>
          </div>

          {/* Custom SVG Bar Chart */}
          <div className="w-full pt-2">
            <div className="flex justify-between items-end gap-3 h-36 px-2">
              {/* Week 1 */}
              <div className="flex flex-col items-center gap-2 flex-1 group">
                <span className="font-inter text-[11px] font-semibold text-[#454840]">85%</span>
                <div className="w-full max-w-[42px] bg-[#ebf0e0] rounded-t-xl h-24 relative overflow-hidden flex items-end">
                  <div
                    className="w-full bg-[#55624b] rounded-t-xl transition-all duration-700 ease-out"
                    style={{ height: '85%' }}
                  />
                </div>
                <span className="font-inter text-[11px] text-[#454840]">W1</span>
              </div>

              {/* Week 2 */}
              <div className="flex flex-col items-center gap-2 flex-1 group">
                <span className="font-inter text-[11px] font-semibold text-[#454840]">92%</span>
                <div className="w-full max-w-[42px] bg-[#ebf0e0] rounded-t-xl h-24 relative overflow-hidden flex items-end">
                  <div
                    className="w-full bg-[#55624b] rounded-t-xl transition-all duration-700 ease-out"
                    style={{ height: '92%' }}
                  />
                </div>
                <span className="font-inter text-[11px] text-[#454840]">W2</span>
              </div>

              {/* Week 3 */}
              <div className="flex flex-col items-center gap-2 flex-1 group">
                <span className="font-inter text-[11px] font-semibold text-[#454840]">96%</span>
                <div className="w-full max-w-[42px] bg-[#ebf0e0] rounded-t-xl h-24 relative overflow-hidden flex items-end">
                  <div
                    className="w-full bg-[#455038] rounded-t-xl shadow-xs transition-all duration-700 ease-out"
                    style={{ height: '96%' }}
                  />
                </div>
                <span className="font-inter text-[11px] text-[#2f3923] font-bold">W3</span>
              </div>

              {/* Week 4 Current */}
              <div className="flex flex-col items-center gap-2 flex-1 group">
                <span className="font-inter text-[11px] font-bold text-[#2f3923]">98%</span>
                <div className="w-full max-w-[42px] bg-[#dae7c7] rounded-t-xl h-24 relative overflow-hidden flex items-end">
                  <div
                    className="w-full bg-[#2f3923] rounded-t-xl transition-all duration-700 ease-out"
                    style={{ height: '98%' }}
                  />
                </div>
                <span className="font-inter text-[11px] text-[#2f3923] font-bold">Now</span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-[#c6c7bd]/20 flex items-center justify-between text-[11px] font-inter text-[#454840]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2f3923]" />
                <span>Current Sprint</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#55624b]" />
                <span>Historical Sprints</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Card 2: Ingredient Lifecycle Breakdown */}
        <div className="bg-white rounded-3xl p-5 shadow-xs border border-[#c6c7bd]/30 flex flex-col gap-3">
          <div>
            <h4 className="font-outfit text-[16px] font-semibold text-[#181d14]">
              Ingredient Lifecycle Split
            </h4>
            <p className="font-inter text-[11px] text-[#454840]">
              Outcome distribution of all logged pantry weight
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            {/* Segmented horizontal progress tracker */}
            <div className="h-4 w-full rounded-full bg-[#e5eada] overflow-hidden flex p-0.5">
              <div
                className="h-full bg-[#2f3923] rounded-l-full transition-all duration-500"
                style={{ width: '78%' }}
                title="78% Consumed in Menu"
              />
              <div
                className="h-full bg-[#BF8B2E] transition-all duration-500 mx-0.5"
                style={{ width: '16%' }}
                title="16% Donated"
              />
              <div
                className="h-full bg-[#d8e8c9] rounded-r-full transition-all duration-500"
                style={{ width: '6%' }}
                title="6% Composted"
              />
            </div>

            {/* Breakdown Legend Rows */}
            <div className="space-y-1.5 mt-1">
              <div className="flex items-center justify-between p-2 rounded-xl bg-[#f1f6e6]">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#2f3923] flex-shrink-0" />
                  <span className="font-inter text-[12px] text-[#181d14] truncate">
                    Consumed in Menu &amp; Daily Specials
                  </span>
                </div>
                <span className="font-outfit text-[15px] font-semibold text-[#2f3923]">78%</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-[#f1f6e6]">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#BF8B2E] flex-shrink-0" />
                  <span className="font-inter text-[12px] text-[#181d14] truncate">
                    Donated via Food Rescue Network
                  </span>
                </div>
                <span className="font-outfit text-[15px] font-semibold text-[#403421]">16%</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-[#f1f6e6]">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#d8e8c9] flex-shrink-0" />
                  <span className="font-inter text-[12px] text-[#181d14] truncate">
                    Community Composted (Soil Return)
                  </span>
                </div>
                <span className="font-outfit text-[15px] font-semibold text-[#55624b]">6%</span>
              </div>
            </div>

            {/* Highlight callout for zero landfill */}
            <div className="p-2.5 rounded-xl bg-[#d8e8c9]/60 flex items-center gap-2 text-[#131f0c] mt-0.5">
              <span className="material-symbols-outlined text-[18px] text-[#2f3923]">verified</span>
              <span className="font-inter text-[12px] font-semibold">
                0.0% Sent to Landfill — Certified Zero Direct Waste
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Community Partner Beneficiaries Wall */}
      <section className="flex flex-col gap-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-5 rounded-full bg-[#584a36]" />
            <h3 className="font-outfit text-[18px] font-semibold text-[#181d14]">
              Community Beneficiaries
            </h3>
          </div>
          <span className="font-inter text-[11px] text-[#55624b] font-semibold">
            3 Partners Active
          </span>
        </div>

        <div className="space-y-2.5">
          {beneficiaries.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-2xl p-3.5 shadow-xs border border-[#c6c7bd]/30 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                  alt={b.imageAlt}
                  src={b.imageUrl}
                />
                <div className="min-w-0">
                  <h4 className="font-outfit text-[15px] font-semibold text-[#181d14] truncate">
                    {b.name}
                  </h4>
                  <p className="font-inter text-[11px] text-[#454840] truncate">
                    {b.neighborhood} • {b.frequency}
                  </p>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="font-outfit text-[16px] font-bold text-[#2f3923] block">
                  {b.mealsReceived}
                </span>
                <span className="font-inter text-[10px] text-[#55624b]">meals received</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Verified Certificate Banner & Action */}
      <section className="w-full bg-[#e5eada] rounded-3xl p-5 shadow-xs border border-[#c6c7bd]/30 flex flex-col gap-3 relative overflow-hidden">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#d8e8c9] flex items-center justify-center text-[#2f3923] flex-shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-[28px]">verified_user</span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-inter text-[11px] px-2 py-0.5 rounded-full bg-[#2f3923] text-white font-bold">
                Certified
              </span>
              <span className="font-inter text-[11px] text-[#55624b] font-semibold">
                Reg #WB-2024-992
              </span>
            </div>
            <h4 className="font-outfit text-[18px] font-bold text-[#181d14] mt-1">
              Verified Sustainable Cafe
            </h4>
            <p className="font-inter text-[12px] text-[#454840] mt-0.5">
              Valid for October 2024 operations. Third-party verified according to FAO standards.
            </p>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
          <button
            onClick={() => {
              onDownloadPdf();
              onOpenCertificateModal();
            }}
            className="flex-1 h-12 rounded-full bg-[#2f3923] text-white font-inter text-[13px] font-semibold flex items-center justify-center gap-2 hover:bg-[#455038] transition-all active:scale-[0.98] shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">download</span>
            <span>Download Impact PDF</span>
          </button>
          <button
            onClick={onShareBadge}
            className="h-12 px-6 rounded-full bg-white text-[#2f3923] font-inter text-[13px] font-semibold flex items-center justify-center gap-2 hover:bg-[#f1f6e6] transition-all active:scale-[0.98] shadow-xs cursor-pointer border border-[#c6c7bd]/30"
          >
            <span className="material-symbols-outlined text-[20px]">share</span>
            <span>Share Badge</span>
          </button>
        </div>
      </section>
    </div>
  );
};
