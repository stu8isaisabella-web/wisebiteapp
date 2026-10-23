import React, { useState } from 'react';

interface ExportGroceryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmExport: (supplier: string) => void;
}

export const ExportGroceryModal: React.FC<ExportGroceryModalProps> = ({
  isOpen,
  onClose,
  onConfirmExport,
}) => {
  const [selectedSupplier, setSelectedSupplier] = useState('Metro Organic Wholesale & Local Market');

  if (!isOpen) return null;

  const orders = [
    { item: 'Organic Haas Avocados (Crate 10kg)', qty: '1 Crate', estCost: '$38.50' },
    { item: 'Barista Whole Oat Milk (12x1L Tetra)', qty: '2 Cases', estCost: '$42.00' },
    { item: 'Ancient Spelt & Sourdough Flour', qty: '25 kg Bag', estCost: '$54.00' },
    { item: 'Cold-Pressed Extra Virgin Olive Oil', qty: '5 L Tin', estCost: '$48.00' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl p-5 shadow-2xl flex flex-col gap-4 border border-[#c6c7bd]/30 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-[#ebf0e0] pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#f4dfc5] text-[#403421] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">receipt_long</span>
            </div>
            <h3 className="font-outfit text-[18px] font-semibold text-[#181d14]">
              Supplier Restock PO Manifest
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#ebf0e0] text-[#454840] hover:text-[#181d14] flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-[#454840] uppercase tracking-wider mb-1">
            Dispatch to Supplier:
          </label>
          <select
            value={selectedSupplier}
            onChange={(e) => setSelectedSupplier(e.target.value)}
            className="w-full h-11 px-3 rounded-xl bg-[#f1f6e6] text-[#181d14] text-[13px] font-medium border border-transparent focus:border-[#455038]"
          >
            <option value="Metro Organic Wholesale & Local Market">
              Metro Organic Wholesale &amp; Local Market
            </option>
            <option value="SunValley Fresh Produce Co.">SunValley Fresh Produce Co.</option>
            <option value="OatFields Regional Supply">OatFields Regional Supply</option>
          </select>
        </div>

        <div className="rounded-2xl bg-[#f1f6e6] p-3 flex flex-col gap-2">
          <span className="text-[11px] font-bold text-[#454840] uppercase tracking-wider">
            Optimized Smart Restock List:
          </span>
          <div className="space-y-1.5 divide-y divide-[#ebf0e0]">
            {orders.map((ord, idx) => (
              <div key={idx} className="pt-1.5 flex items-center justify-between text-[12px]">
                <div className="flex flex-col">
                  <span className="font-semibold text-[#181d14]">{ord.item}</span>
                  <span className="text-[11px] text-[#454840]">{ord.qty}</span>
                </div>
                <span className="font-bold text-[#2f3923]">{ord.estCost}</span>
              </div>
            ))}
          </div>
          <div className="pt-2 border-t border-[#c6c7bd]/30 flex items-center justify-between font-bold text-[13px] text-[#181d14]">
            <span>Total PO Estimate:</span>
            <span>$182.50</span>
          </div>
        </div>

        <div className="pt-2 flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 h-11 rounded-full bg-[#ebf0e0] text-[#454840] font-semibold text-[13px]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirmExport(selectedSupplier);
              onClose();
            }}
            className="flex-1 h-11 rounded-full bg-[#455038] text-white font-semibold text-[13px] hover:bg-[#2f3923] transition-colors shadow-sm flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">send</span>
            <span>Send Order via EDI</span>
          </button>
        </div>
      </div>
    </div>
  );
};
