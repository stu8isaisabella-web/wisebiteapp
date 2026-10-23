import React, { useState } from 'react';
import { DonationListing } from '../../types';

interface ListSurplusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddListing: (listing: DonationListing) => void;
  prefillItemName?: string;
}

export const ListSurplusModal: React.FC<ListSurplusModalProps> = ({
  isOpen,
  onClose,
  onAddListing,
  prefillItemName = '',
}) => {
  const [title, setTitle] = useState(prefillItemName || '8kg Hass Avocados & Pastries');
  const [quantity, setQuantity] = useState('8.5 kg in food-grade crate');
  const [storageType, setStorageType] = useState('Chilled (4°C)');
  const [pickupWindow, setPickupWindow] = useState('Today: 4:30 PM – 6:30 PM');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newListing: DonationListing = {
      id: `donation-${Date.now()}`,
      title: title.trim(),
      postedBy: 'Posted by You (The Rustic Olive Cafe)',
      isOwnPost: true,
      statusLabel: 'Available for Dispatch',
      statusBadgeClass: 'bg-[#dae7c7] text-[#151e0b]',
      quantity: quantity || 'Standard catering parcel',
      temperatureNote: storageType,
      pickupWindow: pickupWindow || 'Today: 4:30 – 6:30 PM',
      remainingTime: '3h 30m left',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCLuNkwPJ-yH1FvslLED0cpUuoXrgUOtrpyFHnAe3K2U-eW7XJ6cWDoUFERKCmI8ebMZA5L3l9M90npFfR5nPyjbKhcyKqWbRQ_fdWvGCk49NaIWUpgWuYxerq9PHCC5i-6bbdLQF32c4bBOKHRMdsMpmOAyk_TDQH7ERe7xeIcjzG7yc2w4snG9lqmUJkQUq7sp2_dONa1UHsYjU-YMuhEoQ3r0CLgwssTAzCIpW_U44a85_BDCxzU',
      imageAlt: title,
      claimed: false,
    };

    onAddListing(newListing);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl p-5 shadow-2xl flex flex-col gap-4 border border-[#c6c7bd]/30 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-[#ebf0e0] pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#f4dfc5] text-[#403421] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">volunteer_activism</span>
            </div>
            <h3 className="font-outfit text-[18px] font-semibold text-[#181d14]">
              List Surplus for Food Rescue
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
          Directly alert neighborhood shelters, food pantries, and verified couriers with zero waste diversion.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-[#454840] uppercase tracking-wider mb-1">
              Surplus Items Description
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. 8kg Organic Hass Avocados & Oat Milk"
              className="w-full h-11 px-3.5 rounded-xl bg-[#f1f6e6] text-[#181d14] text-[13px] focus:bg-white focus:outline-none border border-transparent focus:border-[#455038] transition-all"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#454840] uppercase tracking-wider mb-1">
              Quantity &amp; Packaging
            </label>
            <input
              type="text"
              required
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="e.g. 15 Prepared Breakfast & Bakery Boxes"
              className="w-full h-11 px-3.5 rounded-xl bg-[#f1f6e6] text-[#181d14] text-[13px] focus:bg-white focus:outline-none border border-transparent focus:border-[#455038] transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-semibold text-[#454840] uppercase tracking-wider mb-1">
                Holding Temp
              </label>
              <select
                value={storageType}
                onChange={(e) => setStorageType(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-[#f1f6e6] text-[#181d14] text-[13px] focus:bg-white focus:outline-none border border-transparent focus:border-[#455038] transition-all"
              >
                <option value="Chilled (4°C)">Chilled (4°C)</option>
                <option value="Ambient / Room Temp">Ambient / Room Temp</option>
                <option value="Hot Hold (65°C+)">Hot Hold (65°C+)</option>
                <option value="Frozen (-18°C)">Frozen (-18°C)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#454840] uppercase tracking-wider mb-1">
                Pickup Window
              </label>
              <input
                type="text"
                value={pickupWindow}
                onChange={(e) => setPickupWindow(e.target.value)}
                placeholder="Today 4:00 - 6:00 PM"
                className="w-full h-11 px-3.5 rounded-xl bg-[#f1f6e6] text-[#181d14] text-[13px] focus:bg-white focus:outline-none border border-transparent focus:border-[#455038] transition-all"
              />
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#ebf0e0]/70 flex items-center gap-2 text-[11px] text-[#454840]">
            <span className="material-symbols-outlined text-[16px] text-[#2f3923]">verified</span>
            <span>WiseBite automated cold-chain audit log will accompany this dispatch.</span>
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
              className="flex-1 h-11 rounded-full bg-[#455038] text-white font-semibold text-[13px] hover:bg-[#2f3923] transition-colors shadow-sm flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">publish</span>
              <span>Publish Listing</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
