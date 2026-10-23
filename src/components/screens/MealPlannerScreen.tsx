import React, { useState } from 'react';
import { RecipeItem } from '../../types';

interface MealPlannerScreenProps {
  recipes: RecipeItem[];
  onToggleSaveRecipe: (recipeId: string) => void;
  onOpenCustomRecipeModal: () => void;
  onOpenExportGroceryModal: () => void;
  onShowToast: (msg: string) => void;
}

export const MealPlannerScreen: React.FC<MealPlannerScreenProps> = ({
  recipes,
  onToggleSaveRecipe,
  onOpenCustomRecipeModal,
  onOpenExportGroceryModal,
  onShowToast,
}) => {
  const [plannerMode, setPlannerMode] = useState<'planner' | 'recipe'>('planner');
  const [timelineDays, setTimelineDays] = useState<'7' | '14' | '30'>('7');

  const budgetCaps: Record<string, { total: string; allocated: string; available: string; width: string }> = {
    '7': { total: '$850.00 / wk', allocated: '$640.00 allocated', available: '$210.00 available', width: '75.3%' },
    '14': { total: '$1,700.00 / 2wk', allocated: '$1,280.00 allocated', available: '$420.00 available', width: '75.3%' },
    '30': { total: '$3,600.00 / mo', allocated: '$2,750.00 allocated', available: '$850.00 available', width: '76.4%' },
  };

  const currentBudget = budgetCaps[timelineDays];

  return (
    <div className="flex flex-col w-full px-4 pb-6 gap-y-4 max-w-md mx-auto">
      {/* Top Segmented Toggle */}
      <div className="w-full bg-[#e5eada] p-1 rounded-full flex items-center relative shadow-xs">
        <button
          onClick={() => {
            setPlannerMode('planner');
            onShowToast('Viewing full restock allocation & prep calendar.');
          }}
          className={`flex-1 py-2.5 rounded-full flex items-center justify-center gap-1.5 transition-all duration-300 font-inter text-[13px] cursor-pointer ${
            plannerMode === 'planner'
              ? 'bg-white text-[#181d14] shadow-xs font-semibold'
              : 'text-[#454840] hover:text-[#181d14]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">event_note</span>
          <span>Restock &amp; Planner</span>
        </button>

        <button
          onClick={() => {
            setPlannerMode('recipe');
            onShowToast('Prioritizing zero-waste items for current shift.');
          }}
          className={`flex-1 py-2.5 rounded-full flex items-center justify-center gap-1.5 transition-all duration-300 font-inter text-[13px] cursor-pointer ${
            plannerMode === 'recipe'
              ? 'bg-white text-[#181d14] shadow-xs font-semibold'
              : 'text-[#454840] hover:text-[#181d14]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">skillet</span>
          <span>Zero-Waste Maker</span>
          <span className="w-2 h-2 rounded-full bg-[#d7c4aa] inline-block animate-pulse" />
        </button>
      </div>

      {/* Warm Community & Kitchen Notice Banner */}
      <div className="w-full bg-[#d8e8c9]/60 rounded-2xl p-4 flex items-start gap-3 shadow-xs border border-[#c6c7bd]/20">
        <div className="w-9 h-9 rounded-full bg-[#d8e8c9] flex items-center justify-center flex-shrink-0 text-[#5b6950] mt-0.5">
          <span className="material-symbols-outlined text-[20px]">eco</span>
        </div>
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-outfit text-[16px] font-semibold text-[#131f0c]">
              Surplus Sync Active
            </span>
            <span className="px-2 py-0.5 rounded-full bg-white text-[#55624b] font-inter text-[11px] font-medium shadow-2xs">
              Bistro + Rescue Hub
            </span>
          </div>
          <p className="font-inter text-[12px] text-[#5b6950] mt-0.5 leading-relaxed">
            18.4 kg of incoming rescued pantry produce paired with commercial prep schedules today.
          </p>
        </div>
      </div>

      {/* Kitchen Configuration Card */}
      <div className="w-full bg-white rounded-3xl p-5 shadow-sm border border-[#c6c7bd]/30 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#f1f6e6] flex items-center justify-center text-[#455038]">
              <span className="material-symbols-outlined text-[18px]">tune</span>
            </div>
            <h2 className="font-outfit text-[17px] font-semibold text-[#181d14]">
              Kitchen Setup &amp; Logistics
            </h2>
          </div>
          <button
            onClick={() => onShowToast('Kitchen profile configuration: Standard Bistro Line, 168 Covers.')}
            className="text-[#55624b] hover:text-[#2f3923] font-inter text-[11px] font-semibold flex items-center gap-0.5"
          >
            <span>Edit Profiles</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        {/* Timeline Selector */}
        <div className="flex flex-col gap-1.5">
          <label className="font-inter text-[11px] text-[#454840] font-bold uppercase tracking-wider">
            PLANNING TIMELINE
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['7', '14', '30'] as const).map((days) => (
              <button
                key={days}
                onClick={() => {
                  setTimelineDays(days);
                  onShowToast(`Recalculated budget & wholesale order for ${days} days.`);
                }}
                className={`py-2 px-3 rounded-full font-inter text-[12px] transition-all text-center cursor-pointer ${
                  timelineDays === days
                    ? 'bg-[#455038] text-white font-semibold shadow-xs'
                    : 'bg-[#f1f6e6] text-[#454840] hover:bg-[#e5eada]'
                }`}
              >
                {days === '7' ? 'Next 7 Days' : `${days} Days`}
              </button>
            ))}
          </div>
        </div>

        {/* Preferred Wholesale Supplier */}
        <div className="bg-[#f1f6e6]/80 rounded-2xl p-3.5 flex items-center justify-between gap-3 border border-[#c6c7bd]/20">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0 text-[#2f3923] shadow-xs">
              <span className="material-symbols-outlined text-[22px]">storefront</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-inter text-[10px] text-[#454840] font-bold uppercase tracking-wider">
                PREFERRED WHOLESALE / HUB
              </span>
              <span className="font-outfit text-[14px] font-semibold text-[#181d14] truncate">
                Metro Organic Wholesale &amp; Local Market
              </span>
            </div>
          </div>
          <button
            onClick={() => onShowToast('Switched to SunValley Organic Co-op delivery slot.')}
            className="text-[#55624b] hover:text-[#2f3923] p-1"
            title="Switch Supplier"
          >
            <span className="material-symbols-outlined text-[20px]">swap_horiz</span>
          </button>
        </div>

        {/* Weekly Budget Cap & Progress Bar */}
        <div className="bg-[#f1f6e6]/80 rounded-2xl p-3.5 flex flex-col gap-2 border border-[#c6c7bd]/20">
          <div className="flex items-center justify-between">
            <span className="font-inter text-[10px] text-[#454840] font-bold uppercase tracking-wider">
              WEEKLY BUDGET CAP
            </span>
            <span className="font-outfit text-[17px] text-[#2f3923] font-bold">
              {currentBudget.total}
            </span>
          </div>

          {/* Progress Bar Graphic */}
          <div className="w-full bg-[#e0e4d5] rounded-full h-3 overflow-hidden flex">
            <div
              className="bg-[#455038] h-full rounded-full transition-all duration-500"
              style={{ width: currentBudget.width }}
            />
          </div>

          <div className="flex items-center justify-between font-inter text-[11px] text-[#454840] pt-0.5">
            <span className="flex items-center gap-1 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#455038]" />
              {currentBudget.allocated}
            </span>
            <span className="flex items-center gap-1 font-semibold text-[#55624b]">
              <span className="w-2 h-2 rounded-full bg-[#d8e8c9]" />
              {currentBudget.available}
            </span>
          </div>
        </div>

        {/* Kitchen Appliances Tags */}
        <div className="flex flex-col gap-1.5">
          <span className="font-inter text-[11px] text-[#454840] font-bold uppercase tracking-wider">
            ACTIVE KITCHEN EQUIPMENT
          </span>
          <div className="flex flex-wrap gap-1.5">
            <span className="px-3 py-1.5 rounded-full bg-[#ebf0e0] text-[#181d14] font-inter text-[11px] font-medium flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-[#55624b]">oven_gen</span>
              Commercial Oven
            </span>
            <span className="px-3 py-1.5 rounded-full bg-[#ebf0e0] text-[#181d14] font-inter text-[11px] font-medium flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-[#55624b]">cooking</span>
              Induction Cooktop
            </span>
            <span className="px-3 py-1.5 rounded-full bg-[#ebf0e0] text-[#181d14] font-inter text-[11px] font-medium flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-[#55624b]">mode_heat</span>
              Convection Air Fryer
            </span>
            <span className="px-3 py-1.5 rounded-full bg-[#ebf0e0] text-[#181d14] font-inter text-[11px] font-medium flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-[#55624b]">water_voc</span>
              Sous-vide
            </span>
          </div>
        </div>

        {/* Dietary / Service Profile */}
        <div className="flex flex-col gap-1.5">
          <span className="font-inter text-[11px] text-[#454840] font-bold uppercase tracking-wider">
            DIETARY &amp; SERVICE PROFILE
          </span>
          <div className="flex flex-wrap gap-1.5">
            <span className="px-3 py-1 rounded-full bg-[#d8e8c9] text-[#131f0c] font-inter text-[11px] font-semibold">
              Plant-forward
            </span>
            <span className="px-3 py-1 rounded-full bg-[#f4dfc5] text-[#241a09] font-inter text-[11px] font-semibold">
              Nut-Free options
            </span>
            <span className="px-3 py-1 rounded-full bg-[#e0e4d5] text-[#454840] font-inter text-[11px] font-semibold">
              Gluten-Free pastry
            </span>
          </div>
        </div>
      </div>

      {/* Expiring Ingredients Live Callout Bar */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[#403421] text-[20px]">timer</span>
          <h3 className="font-outfit text-[18px] font-semibold text-[#181d14]">
            Today&apos;s Rescue Recipes
          </h3>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-[#f4dfc5] text-[#241a09] font-inter text-[11px] font-bold">
          3 Items Expiring
        </span>
      </div>

      {/* Expiring Items Summary Strip */}
      <div className="w-full bg-[#e5eada]/80 rounded-2xl p-3 flex items-center justify-around text-center border border-[#c6c7bd]/30">
        <div className="flex flex-col items-center">
          <span className="text-[18px]">🥑</span>
          <span className="font-inter text-[11px] font-bold text-[#181d14] mt-0.5">4kg Avocados</span>
          <span className="text-[10px] text-[#ba1a1a] font-semibold">Expires in 24h</span>
        </div>
        <div className="w-px h-8 bg-[#c6c7bd]/40" />
        <div className="flex flex-col items-center">
          <span className="text-[18px]">🥛</span>
          <span className="font-inter text-[11px] font-bold text-[#181d14] mt-0.5">6L Oat Milk</span>
          <span className="text-[10px] text-[#403421] font-semibold">Expires in 36h</span>
        </div>
        <div className="w-px h-8 bg-[#c6c7bd]/40" />
        <div className="flex flex-col items-center">
          <span className="text-[18px]">🥖</span>
          <span className="font-inter text-[11px] font-bold text-[#181d14] mt-0.5">6 Sourdough</span>
          <span className="text-[10px] text-[#454840] font-medium">Day-old crust</span>
        </div>
      </div>

      {/* Recipe Cards Feed */}
      <div className="space-y-4">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="w-full bg-white rounded-3xl overflow-hidden shadow-sm border border-[#c6c7bd]/30 flex flex-col group hover:shadow-md transition-shadow"
          >
            <div className="relative w-full h-44 bg-[#e0e4d5] overflow-hidden">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt={recipe.imageAlt}
                src={recipe.imageUrl}
              />
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#2f3923] font-inter text-[11px] font-bold shadow-xs flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-[#2f3923]">star</span>
                  {recipe.badge}
                </span>
              </div>
              <div className="absolute bottom-3 right-3">
                <span className="px-2.5 py-1 rounded-full bg-[#455038] text-white font-inter text-[11px] font-bold shadow-xs">
                  {recipe.portionCost}
                </span>
              </div>
            </div>

            <div className="p-4 flex flex-col gap-3">
              <div className="flex flex-col">
                <h4 className="font-outfit text-[17px] font-semibold text-[#181d14] leading-snug">
                  {recipe.title}
                </h4>
                <p className="font-inter text-[12px] text-[#454840] mt-1 leading-relaxed">
                  {recipe.description}
                </p>
              </div>

              {/* Ingredient Rescue Pill Badges */}
              <div className="flex flex-wrap gap-1.5 py-0.5">
                {recipe.usedIngredients.map((ing, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-[#f1f6e6] text-[#2f3923] font-inter text-[11px] font-medium flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">recycling</span>
                    {ing}
                  </span>
                ))}
              </div>

              {/* Recipe Quick Specs Grid */}
              <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-2xl bg-[#f1f6e6]/70 text-center border border-[#c6c7bd]/20">
                <div>
                  <span className="font-inter text-[10px] text-[#454840] uppercase tracking-wider block">
                    PREP TIME
                  </span>
                  <span className="font-outfit text-[14px] font-semibold text-[#181d14]">
                    {recipe.prepTime}
                  </span>
                </div>
                <div>
                  <span className="font-inter text-[10px] text-[#454840] uppercase tracking-wider block">
                    YIELD
                  </span>
                  <span className="font-outfit text-[14px] font-semibold text-[#181d14]">
                    {recipe.yieldAmount}
                  </span>
                </div>
                <div>
                  <span className="font-inter text-[10px] text-[#454840] uppercase tracking-wider block">
                    {recipe.thirdMetricLabel}
                  </span>
                  <span className="font-outfit text-[14px] font-semibold text-[#55624b]">
                    {recipe.thirdMetricValue}
                  </span>
                </div>
              </div>

              {/* Action Footer */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => onShowToast(`Scheduled "${recipe.title}" for today’s production run!`)}
                  className="flex-1 py-2.5 rounded-full bg-[#455038] text-white font-inter text-[13px] font-semibold hover:bg-[#2f3923] transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-[0.98]"
                >
                  <span className="material-symbols-outlined text-[18px]">{recipe.actionIcon}</span>
                  <span>{recipe.actionText}</span>
                </button>
                <button
                  onClick={() => {
                    onToggleSaveRecipe(recipe.id);
                    onShowToast(recipe.saved ? 'Removed from favorites.' : 'Saved to Chef recipes binder!');
                  }}
                  aria-label="Save Recipe"
                  className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                    recipe.saved
                      ? 'bg-[#d8e8c9] text-[#2f3923]'
                      : 'bg-[#ebf0e0] text-[#454840] hover:text-[#181d14]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {recipe.saved ? 'bookmark' : 'bookmark_border'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Primary Interactive Actions Section */}
      <div className="w-full flex flex-col gap-3 pt-2">
        <button
          onClick={onOpenCustomRecipeModal}
          className="w-full h-12 rounded-full bg-[#455038] text-white font-inter text-[13px] font-semibold shadow-sm hover:bg-[#2f3923] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">auto_fix_high</span>
          <span>Generate Custom Recipe from Surplus Produce</span>
        </button>

        <button
          onClick={onOpenExportGroceryModal}
          className="w-full h-12 rounded-full bg-[#f4dfc5] text-[#241a09] font-inter text-[13px] font-semibold shadow-xs hover:bg-[#d7c4aa] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">receipt_long</span>
          <span>Export Weekly Restock Grocery List to Supplier</span>
        </button>
      </div>

      {/* Wholesale Disclaimer */}
      <div className="w-full text-center py-1">
        <p className="font-inter text-[11px] text-[#454840]/70 italic leading-tight">
          *Ingredient costs are estimated based on regional wholesale averages and seasonal surplus indexes.
        </p>
      </div>
    </div>
  );
};
