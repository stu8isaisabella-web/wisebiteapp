import React, { useState } from 'react';
import { DonationListing, RescuePartner } from '../../types';

interface FoodRescueScreenProps {
  listings: DonationListing[];
  partners: RescuePartner[];
  onOpenListSurplusModal: () => void;
  onClaimListing: (id: string) => void;
  onRequestPickup: (id: string) => void;
  onShowToast: (msg: string) => void;
}

export const FoodRescueScreen: React.FC<FoodRescueScreenProps> = ({
  listings,
  partners,
  onOpenListSurplusModal,
  onClaimListing,
  onRequestPickup,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'available' | 'my-donations' | 'food-banks'>('available');

  const filteredListings = listings.filter((item) => {
    if (activeTab === 'my-donations') return item.isOwnPost;
    if (activeTab === 'available') return true;
    return true;
  });

  return (
    <div className="flex flex-col w-full px-4 pb-6 gap-y-4 max-w-md mx-auto">
      {/* Top Rescue Header Section */}
      <div className="flex flex-col gap-y-3 pt-1">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col min-w-0">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#d8e8c9] text-[#131f0c] text-[11px] font-semibold w-fit mb-1 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#455038] animate-pulse" />
              Live Rescue Network
            </div>
            <h1 className="font-outfit text-[26px] font-semibold text-[#181d14] tracking-tight">
              Food Rescue Hub
            </h1>
            <p className="font-inter text-[12px] text-[#454840] mt-0.5 leading-relaxed">
              Directly channeling verified excess food to neighborhood shelters, kitchens, and families in need.
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#d8e8c9] flex items-center justify-center flex-shrink-0 text-[#2f3923] shadow-xs">
            <span className="material-symbols-outlined text-[28px]">volunteer_activism</span>
          </div>
        </div>

        {/* Primary Action Button */}
        <button
          onClick={onOpenListSurplusModal}
          className="w-full h-12 px-6 rounded-full bg-[#455038] text-white font-inter text-[13px] font-semibold flex items-center justify-center gap-2 shadow-sm active:scale-[0.99] transition-transform hover:bg-[#2f3923] cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">favorite</span>
          <span>List Surplus Food for Donation</span>
        </button>
      </div>

      {/* Impact Snapshot Micro Ticker */}
      <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-[#f1f6e6] shadow-xs border border-[#c6c7bd]/30">
        <div className="flex flex-col items-center text-center">
          <span className="font-outfit text-[18px] font-bold text-[#455038]">142 kg</span>
          <span className="font-inter text-[11px] text-[#454840]">Diverted Today</span>
        </div>
        <div className="flex flex-col items-center text-center bg-white/70 rounded-xl py-1">
          <span className="font-outfit text-[18px] font-bold text-[#55624b]">310</span>
          <span className="font-inter text-[11px] text-[#454840]">Meals Provided</span>
        </div>
        <div className="flex flex-col items-center text-center">
          <span className="font-outfit text-[18px] font-bold text-[#403421]">380 kg</span>
          <span className="font-inter text-[11px] text-[#454840]">
            CO<sub className="text-[9px]">2</sub>e Prevented
          </span>
        </div>
      </div>

      {/* Filter Pill Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 -mx-4 px-4">
        <button
          onClick={() => setActiveTab('available')}
          className={`flex-shrink-0 px-4 py-2 rounded-full font-inter text-[12px] font-semibold transition-all cursor-pointer ${
            activeTab === 'available'
              ? 'bg-[#455038] text-white shadow-xs'
              : 'bg-white text-[#454840] hover:bg-[#ebf0e0]'
          }`}
        >
          Available Listings (12)
        </button>
        <button
          onClick={() => setActiveTab('my-donations')}
          className={`flex-shrink-0 px-4 py-2 rounded-full font-inter text-[12px] font-semibold transition-all cursor-pointer ${
            activeTab === 'my-donations'
              ? 'bg-[#455038] text-white shadow-xs'
              : 'bg-white text-[#454840] hover:bg-[#ebf0e0]'
          }`}
        >
          My Cafe Donations (3)
        </button>
        <button
          onClick={() => setActiveTab('food-banks')}
          className={`flex-shrink-0 px-4 py-2 rounded-full font-inter text-[12px] font-semibold transition-all cursor-pointer ${
            activeTab === 'food-banks'
              ? 'bg-[#455038] text-white shadow-xs'
              : 'bg-white text-[#454840] hover:bg-[#ebf0e0]'
          }`}
        >
          Nearby Food Banks (8)
        </button>
      </div>

      {/* Safety Compliance Assurance Banner */}
      <div className="p-3.5 rounded-2xl bg-[#e5eada] shadow-xs flex items-start gap-3 border border-[#c6c7bd]/30">
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 text-[#455038] shadow-xs">
          <span className="material-symbols-outlined text-[19px]">verified_user</span>
        </div>
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-inter text-[12px] font-bold text-[#181d14]">
              WiseBite Safety Guarantee
            </span>
            <span className="font-inter text-[10px] uppercase font-bold text-[#55624b] bg-white px-1.5 py-0.2 rounded-full">
              Certified
            </span>
          </div>
          <p className="font-inter text-[11px] text-[#454840] mt-0.5 leading-snug">
            Surplus items must adhere strictly to ambient or cold-chain holding temperatures. Uncollected donations auto-expire prior to end-of-safe-life.
          </p>
        </div>
      </div>

      {/* Active Listings Feed */}
      <div className="flex flex-col gap-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#55624b] text-[20px]">schedule</span>
            <h2 className="font-outfit text-[17px] font-semibold text-[#181d14]">
              Time-Sensitive Donations
            </h2>
          </div>
          <span className="font-inter text-[11px] text-[#454840]">Live sync</span>
        </div>

        {filteredListings.map((listing) => (
          <div
            key={listing.id}
            className="flex flex-col rounded-3xl bg-white p-4 shadow-sm border border-[#c6c7bd]/30 gap-3 relative overflow-hidden"
          >
            {/* Top Meta Row */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 min-w-0">
                {listing.isOwnPost ? (
                  <span className="w-2 h-2 rounded-full bg-[#455038]" />
                ) : (
                  <span className="material-symbols-outlined text-[#55624b] text-[16px]">
                    storefront
                  </span>
                )}
                <span className="font-inter text-[11px] text-[#454840] truncate">
                  {listing.postedBy}
                </span>
              </div>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold flex-shrink-0 ${listing.statusBadgeClass}`}
              >
                {listing.statusLabel}
              </span>
            </div>

            {/* Item Thumbnail + Headline */}
            <div className="flex items-start gap-3">
              <img
                className="w-20 h-20 rounded-2xl object-cover flex-shrink-0 shadow-inner"
                alt={listing.imageAlt}
                src={listing.imageUrl}
              />
              <div className="flex flex-col min-w-0 justify-center">
                <h3 className="font-outfit text-[16px] font-semibold text-[#181d14] leading-snug">
                  {listing.title}
                </h3>
                <span className="font-inter text-[12px] text-[#55624b] mt-0.5 font-medium">
                  {listing.quantity}
                </span>
                <div className="flex items-center gap-1 text-[#454840] mt-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#55624b]">
                    {listing.temperatureNote.includes('4°C')
                      ? 'ac_unit'
                      : listing.temperatureNote.includes('bakery')
                      ? 'bakery_dining'
                      : 'inventory_2'}
                  </span>
                  <span className="font-inter text-[11px] text-[#454840] truncate">
                    {listing.temperatureNote}
                  </span>
                </div>
              </div>
            </div>

            {/* Collection Window Strip */}
            {listing.isOwnPost ? (
              <div className="flex items-center justify-between p-2.5 rounded-2xl bg-[#f1f6e6] shadow-xs">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#403421] text-[20px]">alarm</span>
                  <div className="flex flex-col">
                    <span className="font-inter text-[11px] text-[#181d14] font-semibold">
                      Pickup Window
                    </span>
                    <span className="font-inter text-[11px] text-[#454840]">
                      {listing.pickupWindow}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-inter text-[12px] text-[#403421] font-bold">
                    {listing.remainingTime}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between text-[#454840] pt-0.5 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">location_on</span>
                  <span>{listing.pickupWindow}</span>
                </div>
                <span className="font-inter text-[11px] text-[#55624b] font-semibold">
                  {listing.remainingTime}
                </span>
              </div>
            )}

            {/* Action Bottom Row */}
            {listing.isOwnPost ? (
              <div className="flex items-center justify-between pt-1 border-t border-[#ebf0e0]/70">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-full bg-[#d8e8c9] flex items-center justify-center text-[#2f3923] text-[11px] font-bold flex-shrink-0">
                    {listing.partnerAvatar || 'SV'}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-inter text-[12px] font-semibold text-[#181d14] truncate">
                      {listing.partnerName || 'St. Vincent Community Kitchen'}
                    </span>
                    <span className="font-inter text-[10px] text-[#454840]">
                      {listing.partnerNote || '3 Volunteers assigned for transit'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() =>
                    onShowToast('Direct dispatch channel open with volunteer coordinator.')
                  }
                  className="px-3 py-1.5 rounded-full bg-[#ebf0e0] text-[#181d14] font-inter text-[11px] font-semibold flex items-center gap-1 hover:bg-[#e0e4d5] transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[15px]">chat</span>
                  <span>Message</span>
                </button>
              </div>
            ) : listing.id === 'donation-2' ? (
              <button
                onClick={() => {
                  onClaimListing(listing.id);
                  onShowToast('Claim confirmed! Transfer order generated for side bay.');
                }}
                className={`w-full h-11 px-5 rounded-full font-inter text-[13px] font-semibold flex items-center justify-center gap-2 shadow-xs active:scale-[0.99] transition-transform cursor-pointer ${
                  listing.claimed
                    ? 'bg-[#d8e8c9] text-[#131f0c]'
                    : 'bg-[#f4dfc5] text-[#241a09] hover:bg-[#d7c4aa]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {listing.claimed ? 'check_circle' : 'handshake'}
                </span>
                <span>{listing.claimed ? 'Claimed for Kitchen!' : 'Claim for Community Kitchen'}</span>
              </button>
            ) : (
              <div className="flex items-center justify-between pt-1 border-t border-[#ebf0e0]/70">
                <div className="flex flex-col">
                  <span className="font-inter text-[11px] text-[#181d14] font-semibold">
                    Safe Intake Window
                  </span>
                  <span className="font-inter text-[11px] text-[#454840]">
                    Collect today before 7:00 PM
                  </span>
                </div>
                <button
                  onClick={() => {
                    onRequestPickup(listing.id);
                    onShowToast('Pickup dispatch request broadcasted to couriers!');
                  }}
                  className="h-10 px-4 rounded-full bg-[#455038] text-white font-inter text-[12px] font-semibold flex items-center justify-center gap-1.5 shadow-xs active:scale-[0.99] transition-transform hover:bg-[#2f3923] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">local_shipping</span>
                  <span>Request Pickup</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Verified Community Partners Section */}
      <div className="flex flex-col gap-y-2.5 pt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#55624b] text-[20px]">diversity_1</span>
            <h2 className="font-outfit text-[17px] font-semibold text-[#181d14]">
              Registered Food Rescue Partners
            </h2>
          </div>
          <button
            onClick={() => onShowToast('Showing 14 certified local community beneficiaries.')}
            className="font-inter text-[11px] text-[#2f3923] font-semibold underline"
          >
            View Directory
          </button>
        </div>

        {/* Horizontal Partner Showcase */}
        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar -mx-4 px-4 py-1">
          {partners.map((partner) => (
            <div
              key={partner.id}
              onClick={() => onShowToast(`Partner ${partner.name}: ${partner.capacity || partner.type}`)}
              className="flex flex-col items-center p-3 rounded-2xl bg-white min-w-[130px] flex-shrink-0 shadow-xs text-center border border-[#c6c7bd]/30 cursor-pointer hover:bg-[#f1f6e6] transition-colors"
            >
              <div
                className={`w-12 h-12 rounded-full ${partner.colorClass} flex items-center justify-center font-outfit text-[16px] font-bold mb-2 shadow-xs`}
              >
                {partner.initials}
              </div>
              <span className="font-inter text-[12px] font-semibold text-[#181d14] line-clamp-1">
                {partner.name}
              </span>
              <span className="font-inter text-[10px] text-[#454840] mt-0.5">
                {partner.type}
              </span>
              <span className="inline-flex items-center gap-1 font-inter text-[10px] text-[#55624b] mt-1.5 bg-[#f1f6e6] px-2 py-0.5 rounded-full font-medium">
                {partner.badgeActive && <span className="w-1.5 h-1.5 rounded-full bg-[#455038]" />}
                {partner.badge}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Operational Food Safety Guidelines Micro Footer */}
      <div className="p-4 rounded-3xl bg-[#f1f6e6] flex flex-col gap-2 border border-[#c6c7bd]/30">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px] text-[#455038]">eco</span>
          <span className="font-inter text-[12px] font-bold text-[#181d14]">
            Sustainable Redistribution Policy
          </span>
        </div>
        <p className="font-inter text-[11px] text-[#454840] leading-relaxed">
          Every donation logged on WiseBite is tracked with an immutable time-log and temperature log verifying compliance with public health regulations. Together we turn surplus into sustenance.
        </p>
      </div>
    </div>
  );
};
