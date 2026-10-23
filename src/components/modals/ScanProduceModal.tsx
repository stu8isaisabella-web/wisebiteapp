import React, { useState } from 'react';
import { InventoryItem } from '../../types';

interface ScanProduceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (item: Partial<InventoryItem>) => void;
}

export const ScanProduceModal: React.FC<ScanProduceModalProps> = ({
  isOpen,
  onClose,
  onAddItem,
}) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [storageLocation, setStorageLocation] = useState<'cooler' | 'pantry' | 'freezer'>('cooler');
  const [expiryHours, setExpiryHours] = useState('48');
  const [supplier, setSupplier] = useState('');
  const [cost, setCost] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  if (!isOpen) return null;

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setName('Organic Meyer Lemons');
      setQuantity('6.0 kg');
      setStorageLocation('cooler');
      setExpiryHours('48');
      setSupplier('SunValley Citrus');
      setCost('24.50');
      setIsScanning(false);
    }, 900);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddItem({
      name: name.trim(),
      quantity: quantity || '5.0 kg',
      quantityValue: parseFloat(quantity) || 5.0,
      unit: 'kg',
      storageLocation,
      locationLabel:
        storageLocation === 'cooler'
          ? 'Walk-in Cooler'
          : storageLocation === 'pantry'
          ? 'Walk-in Pantry'
          : 'Deep Freeze Bay',
      category: parseInt(expiryHours) <= 48 ? 'critical' : 'safe',
      expiryHours: parseInt(expiryHours) || 48,
      expiryLabel: parseInt(expiryHours) <= 48 ? 'in 2 days' : 'in 5 days',
      estReplacementCost: parseFloat(cost) || 28.0,
      supplier: supplier || 'Local Direct Producer',
      imageUrl: '',
      imageAlt: name,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl p-5 shadow-2xl flex flex-col gap-4 border border-[#c6c7bd]/30 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-[#ebf0e0] pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#d8e8c9] text-[#2f3923] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
            </div>
            <h3 className="font-outfit text-[18px] font-semibold text-[#181d14]">
              Scan Produce / Batch Entry
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#ebf0e0] text-[#454840] hover:text-[#181d14] flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Optical Simulation Card */}
        <div className="p-4 rounded-2xl bg-[#f1f6e6] flex flex-col items-center justify-center text-center gap-2 border border-dashed border-[#55624b]/40">
          <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#2f3923]">
            <span className="material-symbols-outlined text-[24px]">barcode_scanner</span>
          </div>
          <div className="flex flex-col">
            <span className="font-inter text-[13px] font-semibold text-[#181d14]">
              Optical QR &amp; Barcode Reader
            </span>
            <span className="font-inter text-[11px] text-[#454840]">
              Instant OCR parser for delivery invoices &amp; crate labels
            </span>
          </div>
          <button
            type="button"
            disabled={isScanning}
            onClick={handleSimulateScan}
            className="mt-1 px-4 py-1.5 rounded-full bg-[#455038] text-white text-[12px] font-semibold hover:bg-[#2f3923] transition-all active:scale-95 flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">
              {isScanning ? 'sync' : 'document_scanner'}
            </span>
            <span>{isScanning ? 'Reading Invoice...' : 'Simulate Scan Crate'}</span>
          </button>
        </div>

        {/* Manual or auto-filled form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-[#454840] uppercase tracking-wider mb-1">
              Ingredient / Item Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Organic Meyer Lemons"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-[#f1f6e6] text-[#181d14] text-[13px] focus:bg-white focus:outline-none border border-transparent focus:border-[#455038] transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-semibold text-[#454840] uppercase tracking-wider mb-1">
                Batch Quantity
              </label>
              <input
                type="text"
                placeholder="e.g. 6.0 kg or 12 units"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl bg-[#f1f6e6] text-[#181d14] text-[13px] focus:bg-white focus:outline-none border border-transparent focus:border-[#455038] transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#454840] uppercase tracking-wider mb-1">
                Location
              </label>
              <select
                value={storageLocation}
                onChange={(e) =>
                  setStorageLocation(e.target.value as 'cooler' | 'pantry' | 'freezer')
                }
                className="w-full h-11 px-3 rounded-xl bg-[#f1f6e6] text-[#181d14] text-[13px] focus:bg-white focus:outline-none border border-transparent focus:border-[#455038] transition-all"
              >
                <option value="cooler">Walk-in Cooler</option>
                <option value="pantry">Dry Pantry</option>
                <option value="freezer">Freezer Bay</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-semibold text-[#454840] uppercase tracking-wider mb-1">
                Expiry (Hours)
              </label>
              <input
                type="number"
                placeholder="36"
                value={expiryHours}
                onChange={(e) => setExpiryHours(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl bg-[#f1f6e6] text-[#181d14] text-[13px] focus:bg-white focus:outline-none border border-transparent focus:border-[#455038] transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#454840] uppercase tracking-wider mb-1">
                Est. Value ($)
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="24.50"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl bg-[#f1f6e6] text-[#181d14] text-[13px] focus:bg-white focus:outline-none border border-transparent focus:border-[#455038] transition-all"
              />
            </div>
          </div>

          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-11 rounded-full bg-[#ebf0e0] text-[#454840] font-semibold text-[13px] hover:bg-[#e0e4d5] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 h-11 rounded-full bg-[#455038] text-white font-semibold text-[13px] hover:bg-[#2f3923] transition-colors shadow-sm"
            >
              Log into Pantry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
