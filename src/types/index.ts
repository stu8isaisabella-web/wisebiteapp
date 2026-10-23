export type ScreenTab = 'home-overview' | 'kitchen-inventory' | 'meal-planner' | 'food-rescue' | 'impact-metrics';

export interface InventoryItem {
  id: string;
  name: string;
  category: 'critical' | 'safe';
  storageLocation: 'cooler' | 'pantry' | 'freezer';
  quantity: string;
  quantityValue: number;
  unit: string;
  locationLabel: string;
  expiryHours: number;
  expiryLabel: string;
  estReplacementCost: number;
  supplier: string;
  imageUrl: string;
  imageAlt: string;
  subDescription?: string;
  isUsed?: boolean;
}

export interface ShiftInfo {
  id: string;
  title: string;
  statusTag?: string;
  timeWindow: string;
  note: string;
  icon: string;
  isCompleted?: boolean;
  cost?: string;
  guestCount?: string;
  checklist?: { name: string; statusColor: string }[];
}

export interface RecipeItem {
  id: string;
  title: string;
  badge: string;
  portionCost: string;
  description: string;
  usedIngredients: string[];
  prepTime: string;
  yieldAmount: string;
  thirdMetricLabel: string;
  thirdMetricValue: string;
  imageUrl: string;
  imageAlt: string;
  actionText: string;
  actionIcon: string;
  saved?: boolean;
}

export interface DonationListing {
  id: string;
  title: string;
  postedBy: string;
  isOwnPost: boolean;
  statusLabel: string;
  statusBadgeClass: string;
  quantity: string;
  temperatureNote: string;
  pickupWindow: string;
  remainingTime: string;
  partnerName?: string;
  partnerAvatar?: string;
  partnerNote?: string;
  distance?: string;
  imageUrl: string;
  imageAlt: string;
  claimed?: boolean;
}

export interface RescuePartner {
  id: string;
  name: string;
  initials: string;
  type: string;
  badge: string;
  badgeActive: boolean;
  colorClass: string;
  capacity?: string;
}

export interface BeneficiaryRecord {
  id: string;
  name: string;
  neighborhood: string;
  frequency: string;
  mealsReceived: number;
  imageUrl: string;
  imageAlt: string;
}
