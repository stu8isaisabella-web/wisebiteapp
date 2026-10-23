import { useState } from 'react';
import { ScreenTab, InventoryItem, RecipeItem, DonationListing } from './types';
import {
  INITIAL_INVENTORY_ITEMS,
  INITIAL_SHIFTS,
  INITIAL_RECIPES,
  INITIAL_DONATION_LISTINGS,
  RESCUE_PARTNERS,
  BENEFICIARIES,
} from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Toast } from './components/Toast';
import { HomeOverviewScreen } from './components/screens/HomeOverviewScreen';
import { KitchenInventoryScreen } from './components/screens/KitchenInventoryScreen';
import { MealPlannerScreen } from './components/screens/MealPlannerScreen';
import { FoodRescueScreen } from './components/screens/FoodRescueScreen';
import { ImpactMetricsScreen } from './components/screens/ImpactMetricsScreen';
import { AlertsModal } from './components/modals/AlertsModal';
import { ScanProduceModal } from './components/modals/ScanProduceModal';
import { ListSurplusModal } from './components/modals/ListSurplusModal';
import { RecipeGeneratorModal } from './components/modals/RecipeGeneratorModal';
import { ExportGroceryModal } from './components/modals/ExportGroceryModal';
import { CertificateModal } from './components/modals/CertificateModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<ScreenTab>('home-overview');
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>(INITIAL_INVENTORY_ITEMS);
  const [recipes, setRecipes] = useState<RecipeItem[]>(INITIAL_RECIPES);
  const [donationListings, setDonationListings] = useState<DonationListing[]>(INITIAL_DONATION_LISTINGS);
  const [unreadAlerts, setUnreadAlerts] = useState<number>(3);

  // Modal Visibility States
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  const [isScanOpen, setIsScanOpen] = useState(false);
  const [isSurplusOpen, setIsSurplusOpen] = useState(false);
  const [surplusPrefill, setSurplusPrefill] = useState('');
  const [isRecipeGenOpen, setIsRecipeGenOpen] = useState(false);
  const [isExportGroceryOpen, setIsExportGroceryOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState('');
  const [isToastOpen, setIsToastOpen] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setIsToastOpen(true);
  };

  // Actions
  const handleAddItem = (newItem: Partial<InventoryItem>) => {
    const item: InventoryItem = {
      id: `item-${Date.now()}`,
      name: newItem.name || 'New Produce Batch',
      category: newItem.category || 'critical',
      storageLocation: newItem.storageLocation || 'cooler',
      quantity: newItem.quantity || '5.0 kg',
      quantityValue: newItem.quantityValue || 5.0,
      unit: newItem.unit || 'kg',
      locationLabel: newItem.locationLabel || 'Walk-in Cooler',
      expiryHours: newItem.expiryHours || 48,
      expiryLabel: newItem.expiryLabel || 'in 2 days',
      estReplacementCost: newItem.estReplacementCost || 24.0,
      supplier: newItem.supplier || 'Local Farm Direct',
      imageUrl: '',
      imageAlt: newItem.name || 'Produce',
    };
    setInventoryItems([item, ...inventoryItems]);
    showToast(`Logged "${item.name}" into inventory.`);
  };

  const handleMarkItemUsed = (itemId: string) => {
    const item = inventoryItems.find((i) => i.id === itemId);
    setInventoryItems(inventoryItems.filter((i) => i.id !== itemId));
    showToast(`Batch "${item?.name || 'Item'}" marked used in kitchen prep.`);
  };

  const handleOpenSurplusWithItem = (itemName: string) => {
    setSurplusPrefill(itemName);
    setIsSurplusOpen(true);
  };

  const handleAddDonationListing = (newListing: DonationListing) => {
    setDonationListings([newListing, ...donationListings]);
    showToast('Surplus listed on Live Rescue Network! Shelters notified.');
  };

  const handleClaimListing = (listingId: string) => {
    setDonationListings(
      donationListings.map((l) =>
        l.id === listingId ? { ...l, claimed: true, statusLabel: 'Claimed by You' } : l
      )
    );
  };

  const handleRequestPickup = (listingId: string) => {
    showToast('Volunteer courier dispatched for pickup.');
    setDonationListings(
      donationListings.map((l) =>
        l.id === listingId ? { ...l, statusLabel: 'Courier En Route' } : l
      )
    );
  };

  const handleToggleSaveRecipe = (recipeId: string) => {
    setRecipes(
      recipes.map((r) => (r.id === recipeId ? { ...r, saved: !r.saved } : r))
    );
  };

  const handleAddGeneratedRecipe = (newRecipe: RecipeItem) => {
    setRecipes([newRecipe, ...recipes]);
    showToast(`Adopted "${newRecipe.title}" into menu plan.`);
  };

  const handleConfirmExportGrocery = (supplier: string) => {
    showToast(`Restock PO successfully sent via EDI to ${supplier}!`);
  };

  const handleShareBadge = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'WiseBite Sustainability Impact',
          text: 'The Rustic Olive Cafe achieved 100% Zero-Landfill diversion with 342kg waste prevented and 684 meals donated!',
          url: window.location.href,
        })
        .catch(() => {
          showToast('Share link copied to clipboard!');
        });
    } else {
      showToast('Share link copied to clipboard!');
    }
  };

  const handleDownloadPdf = () => {
    showToast('Generating official WiseBite SDG Audit Certificate (PDF)...');
  };

  return (
    <div className="min-h-screen bg-[#f7fbeb] text-[#181d14] flex flex-col font-inter selection:bg-[#d8e8c9] selection:text-[#131f0c]">
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        unreadAlertsCount={unreadAlerts}
        onOpenAlerts={() => {
          setIsAlertsOpen(true);
          setUnreadAlerts(0);
        }}
        onOpenProfile={() =>
          showToast('Head Chef Sarah • The Rustic Olive Cafe & Bistro (Active)')
        }
      />

      {/* Main Content Viewport */}
      <main className="flex-1 w-full pt-16 pb-28">
        {currentTab === 'home-overview' && (
          <HomeOverviewScreen
            shifts={INITIAL_SHIFTS}
            onNavigateTab={(tab) => setCurrentTab(tab)}
            onOpenScanModal={() => setIsScanOpen(true)}
            onOpenSurplusModal={() => {
              setSurplusPrefill('8kg Hass Avocados & 12L Oat Milk');
              setIsSurplusOpen(true);
            }}
            onShowToast={showToast}
          />
        )}

        {currentTab === 'kitchen-inventory' && (
          <KitchenInventoryScreen
            items={inventoryItems}
            onOpenScanModal={() => setIsScanOpen(true)}
            onOpenSurplusModalWithItem={handleOpenSurplusWithItem}
            onNavigateTab={(tab) => setCurrentTab(tab)}
            onMarkItemUsed={handleMarkItemUsed}
            onShowToast={showToast}
          />
        )}

        {currentTab === 'meal-planner' && (
          <MealPlannerScreen
            recipes={recipes}
            onToggleSaveRecipe={handleToggleSaveRecipe}
            onOpenCustomRecipeModal={() => setIsRecipeGenOpen(true)}
            onOpenExportGroceryModal={() => setIsExportGroceryOpen(true)}
            onShowToast={showToast}
          />
        )}

        {currentTab === 'food-rescue' && (
          <FoodRescueScreen
            listings={donationListings}
            partners={RESCUE_PARTNERS}
            onOpenListSurplusModal={() => {
              setSurplusPrefill('');
              setIsSurplusOpen(true);
            }}
            onClaimListing={handleClaimListing}
            onRequestPickup={handleRequestPickup}
            onShowToast={showToast}
          />
        )}

        {currentTab === 'impact-metrics' && (
          <ImpactMetricsScreen
            beneficiaries={BENEFICIARIES}
            onOpenCertificateModal={() => setIsCertificateOpen(true)}
            onDownloadPdf={handleDownloadPdf}
            onShareBadge={handleShareBadge}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Floating Bottom Navigation Pill Bar */}
      <BottomNav
        currentTab={currentTab}
        onTabChange={(tab) => setCurrentTab(tab)}
        rescueCount={4}
      />

      {/* Interactive Modals */}
      <AlertsModal
        isOpen={isAlertsOpen}
        onClose={() => setIsAlertsOpen(false)}
        onActionItem={(actionKey) => {
          if (actionKey === 'kitchen') setCurrentTab('kitchen-inventory');
          else if (actionKey === 'rescue') setCurrentTab('food-rescue');
          else if (actionKey === 'impact') setCurrentTab('impact-metrics');
        }}
      />

      <ScanProduceModal
        isOpen={isScanOpen}
        onClose={() => setIsScanOpen(false)}
        onAddItem={handleAddItem}
      />

      <ListSurplusModal
        isOpen={isSurplusOpen}
        prefillItemName={surplusPrefill}
        onClose={() => setIsSurplusOpen(false)}
        onAddListing={handleAddDonationListing}
      />

      <RecipeGeneratorModal
        isOpen={isRecipeGenOpen}
        onClose={() => setIsRecipeGenOpen(false)}
        onAddRecipe={handleAddGeneratedRecipe}
      />

      <ExportGroceryModal
        isOpen={isExportGroceryOpen}
        onClose={() => setIsExportGroceryOpen(false)}
        onConfirmExport={handleConfirmExportGrocery}
      />

      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        onDownload={handleDownloadPdf}
        onShare={handleShareBadge}
      />

      {/* Floating Micro Toast */}
      <Toast
        message={toastMessage}
        isOpen={isToastOpen}
        onClose={() => setIsToastOpen(false)}
      />
    </div>
  );
}
