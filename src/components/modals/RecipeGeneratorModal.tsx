import React, { useState } from 'react';
import { RecipeItem } from '../../types';

interface RecipeGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddRecipe: (recipe: RecipeItem) => void;
}

export const RecipeGeneratorModal: React.FC<RecipeGeneratorModalProps> = ({
  isOpen,
  onClose,
  onAddRecipe,
}) => {
  const [selectedSurplus, setSelectedSurplus] = useState<string[]>([
    'Avocados (4kg)',
    'Oat Milk (6L)',
  ]);
  const [dietary, setDietary] = useState('Plant-forward');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<RecipeItem | null>(null);

  if (!isOpen) return null;

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedResult({
        id: `recipe-${Date.now()}`,
        title: 'Heirloom Tomato & Smoked Farro Risotto Bowl',
        badge: 'Zero-Waste Special Feature',
        portionCost: '$1.45 / bowl',
        description:
          'Creamy slow-simmered ancient farro deglazed with roasted tomato stock and enriched with silky oat emulsion.',
        usedIngredients: ['Uses: 4.2kg Cherry Tomatoes', '2L Oat Milk', 'Heirloom Farro'],
        prepTime: '20 mins',
        yieldAmount: '22 bowls',
        thirdMetricLabel: 'MARGIN',
        thirdMetricValue: '82% Profit',
        imageUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuA_tZb2VIWxLWiPvbZj4VO_8J-obavRk3szvmq4otUxhp0lUvCpgI-pyPxSequw5zHSJaftWN7bF1nj27sVN30tULUTbx8WqyZ5pp4AQOm_ygDpi9fTT-AHqIBd-79xX47kmbX6zeEyGjwI46_YuSNsw3aZVswh842M2RiJWnqKyovbibOL-obINb_9siLz-_4BfV_DggVgxsV1tqwboalSQvWa-Kkl2d4it66qb9Des117Unqo-ZrS',
        imageAlt: 'Heirloom Tomato & Smoked Farro Risotto Bowl',
        actionText: 'Schedule for Lunch Prep',
        actionIcon: 'soup_kitchen',
        saved: true,
      });
    }, 850);
  };

  const handleAdoptRecipe = () => {
    if (generatedResult) {
      onAddRecipe(generatedResult);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl p-5 shadow-2xl flex flex-col gap-4 border border-[#c6c7bd]/30 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-[#ebf0e0] pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#dae7c7] text-[#151e0b] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">auto_fix_high</span>
            </div>
            <h3 className="font-outfit text-[18px] font-semibold text-[#181d14]">
              Zero-Waste Recipe Generator
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#ebf0e0] text-[#454840] hover:text-[#181d14] flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <p className="font-inter text-[12px] text-[#454840]">
          Pair expiring bulk stock with current cafe prep stations to maximize gross margin and hit 0% waste.
        </p>

        {/* Expiring ingredient selector */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold text-[#454840] uppercase tracking-wider">
            Select Expiring Stock to Rescue:
          </label>
          <div className="flex flex-wrap gap-2">
            {['Avocados (4kg)', 'Oat Milk (6L)', 'Cherry Tomatoes (4.2kg)', 'Day-old Sourdough (6)'].map(
              (item) => {
                const isSelected = selectedSurplus.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      if (isSelected) {
                        setSelectedSurplus(selectedSurplus.filter((s) => s !== item));
                      } else {
                        setSelectedSurplus([...selectedSurplus, item]);
                      }
                    }}
                    className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-all ${
                      isSelected
                        ? 'bg-[#455038] text-white'
                        : 'bg-[#ebf0e0] text-[#454840] hover:bg-[#e0e4d5]'
                    }`}
                  >
                    {item}
                  </button>
                );
              }
            )}
          </div>
        </div>

        {/* Dietary & Service profile */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold text-[#454840] uppercase tracking-wider">
            Service Target:
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['Plant-forward', 'Nut-Free', 'Quick Bistro Prep'].map((diet) => (
              <button
                key={diet}
                type="button"
                onClick={() => setDietary(diet)}
                className={`py-1.5 px-2 rounded-xl text-[11px] font-semibold text-center transition-all ${
                  dietary === diet
                    ? 'bg-[#d8e8c9] text-[#131f0c] ring-1 ring-[#455038]'
                    : 'bg-[#f1f6e6] text-[#454840] hover:bg-[#ebf0e0]'
                }`}
              >
                {diet}
              </button>
            ))}
          </div>
        </div>

        {/* Generate Trigger */}
        {!generatedResult && (
          <button
            type="button"
            disabled={isGenerating || selectedSurplus.length === 0}
            onClick={handleGenerate}
            className="w-full h-12 rounded-full bg-[#455038] text-white font-inter text-[14px] font-semibold hover:bg-[#2f3923] transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isGenerating ? 'sync' : 'auto_awesome'}
            </span>
            <span>{isGenerating ? 'Synthesizing Menu Feature...' : 'Synthesize Zero-Waste Recipe'}</span>
          </button>
        )}

        {/* Generated Result Preview */}
        {generatedResult && (
          <div className="p-4 rounded-2xl bg-[#f1f6e6] flex flex-col gap-2.5 border border-[#c6c7bd]/30 animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#D97706] uppercase tracking-wider">
                {generatedResult.badge}
              </span>
              <span className="text-[12px] font-bold text-[#2f3923] bg-white px-2 py-0.5 rounded-full">
                {generatedResult.portionCost}
              </span>
            </div>
            <h4 className="font-outfit font-semibold text-[16px] text-[#181d14]">
              {generatedResult.title}
            </h4>
            <p className="font-inter text-[12px] text-[#454840]">
              {generatedResult.description}
            </p>
            <div className="flex flex-wrap gap-1">
              {generatedResult.usedIngredients.map((ing, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md bg-white text-[11px] text-[#2f3923] font-medium"
                >
                  {ing}
                </span>
              ))}
            </div>

            <div className="pt-2 flex gap-2">
              <button
                type="button"
                onClick={handleGenerate}
                className="flex-1 h-10 rounded-full bg-[#ebf0e0] text-[#454840] font-semibold text-[12px]"
              >
                Try Another
              </button>
              <button
                type="button"
                onClick={handleAdoptRecipe}
                className="flex-1 h-10 rounded-full bg-[#455038] text-white font-semibold text-[12px] flex items-center justify-center gap-1 shadow-sm"
              >
                <span className="material-symbols-outlined text-[16px]">add_task</span>
                <span>Adopt into Menu</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
