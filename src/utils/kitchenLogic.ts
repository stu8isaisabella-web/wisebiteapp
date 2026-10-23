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
}

export interface WasteMetrics {
  divertedKg: number;
  mealsProvided: number;
  co2ePreventedKg: number;
  costSaved: number;
  diversionRatePercent: number;
}

/**
 * Calculates total financial value at risk from critical expiring batches
 */
export function calculateSalvageValueAtRisk(items: InventoryItem[]): number {
  return items
    .filter((item) => item.category === 'critical' || item.expiryHours <= 48)
    .reduce((total, item) => total + item.estReplacementCost, 0);
}

/**
 * Filters inventory by search string and category filter tab
 */
export function filterInventory(
  items: InventoryItem[],
  query: string,
  filterTab: 'all' | 'critical' | 'cooler' | 'pantry' | 'freezer'
): InventoryItem[] {
  const normalizedQuery = query.trim().toLowerCase();

  return items.filter((item) => {
    // Check tab filter
    if (filterTab === 'critical') {
      if (item.category !== 'critical' && item.expiryHours > 48) return false;
    } else if (filterTab === 'cooler' || filterTab === 'pantry' || filterTab === 'freezer') {
      if (item.storageLocation !== filterTab) return false;
    }

    // Check search term
    if (!normalizedQuery) return true;
    return (
      item.name.toLowerCase().includes(normalizedQuery) ||
      item.locationLabel.toLowerCase().includes(normalizedQuery) ||
      item.supplier.toLowerCase().includes(normalizedQuery)
    );
  });
}

/**
 * Converts rescued weight (kg) to community impact metrics
 * standard FAO / EPA food waste conversion factors:
 * ~2 meals per kg of food rescued
 * ~1.11 kg CO2e emissions avoided per kg food waste diverted
 */
export function calculateImpactMetrics(divertedKg: number, avgCostPerKg: number = 5.38): WasteMetrics {
  const mealsProvided = Math.round(divertedKg * 2);
  const co2ePreventedKg = Math.round(divertedKg * 1.11);
  const costSaved = Math.round(divertedKg * avgCostPerKg);
  const benchmarkKg = 350;
  const diversionRatePercent = Math.min(100, Math.round((divertedKg / benchmarkKg) * 100));

  return {
    divertedKg,
    mealsProvided,
    co2ePreventedKg,
    costSaved,
    diversionRatePercent,
  };
}

/**
 * Calculates budget allocation status
 */
export function calculateBudgetStatus(allocated: number, weeklyCap: number) {
  const available = Math.max(0, weeklyCap - allocated);
  const percentUsed = Math.min(100, Math.round((allocated / weeklyCap) * 100));
  return {
    allocated,
    weeklyCap,
    available,
    percentUsed,
    isOverBudget: allocated > weeklyCap,
  };
}
