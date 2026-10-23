import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateSalvageValueAtRisk,
  filterInventory,
  calculateImpactMetrics,
  calculateBudgetStatus,
  InventoryItem,
} from './kitchenLogic';

const sampleItems: InventoryItem[] = [
  {
    id: '1',
    name: 'Organic Hass Avocados',
    category: 'critical',
    storageLocation: 'pantry',
    quantity: '8.5 kg',
    quantityValue: 8.5,
    unit: 'kg',
    locationLabel: 'Walk-in Pantry',
    expiryHours: 36,
    expiryLabel: 'Tomorrow 6:00 PM',
    estReplacementCost: 38.5,
    supplier: 'Wholesale GreenGrocer',
    imageUrl: '',
    imageAlt: '',
  },
  {
    id: '2',
    name: 'Barista Whole Oat Milk',
    category: 'critical',
    storageLocation: 'cooler',
    quantity: '12 cartons',
    quantityValue: 12,
    unit: 'cartons',
    locationLabel: 'Dairy Chiller',
    expiryHours: 48,
    expiryLabel: 'in 2 days',
    estReplacementCost: 42.0,
    supplier: 'OatFields Supply',
    imageUrl: '',
    imageAlt: '',
  },
  {
    id: '3',
    name: 'Artisan Sourdough Loaves',
    category: 'safe',
    storageLocation: 'pantry',
    quantity: '14 loaves',
    quantityValue: 14,
    unit: 'loaves',
    locationLabel: 'Bakery Rack',
    expiryHours: 96,
    expiryLabel: 'in 4 days',
    estReplacementCost: 56.0,
    supplier: 'In-house Bakery',
    imageUrl: '',
    imageAlt: '',
  },
];

test('calculateSalvageValueAtRisk sums critical expiring items accurately', () => {
  const atRisk = calculateSalvageValueAtRisk(sampleItems);
  assert.equal(atRisk, 80.5);
});

test('filterInventory correctly filters by critical status', () => {
  const criticalOnly = filterInventory(sampleItems, '', 'critical');
  assert.equal(criticalOnly.length, 2);
  assert.equal(criticalOnly[0].name, 'Organic Hass Avocados');
});

test('filterInventory correctly filters by storage location', () => {
  const coolerItems = filterInventory(sampleItems, '', 'cooler');
  assert.equal(coolerItems.length, 1);
  assert.equal(coolerItems[0].name, 'Barista Whole Oat Milk');
});

test('filterInventory matches search query substring', () => {
  const match = filterInventory(sampleItems, 'oat', 'all');
  assert.equal(match.length, 1);
  assert.equal(match[0].id, '2');
});

test('calculateImpactMetrics outputs realistic meals and CO2e prevention', () => {
  const metrics = calculateImpactMetrics(142);
  assert.equal(metrics.divertedKg, 142);
  assert.equal(metrics.mealsProvided, 284);
  assert.equal(metrics.co2ePreventedKg, 158);
});

test('calculateBudgetStatus computes correct remaining amount and percentage', () => {
  const status = calculateBudgetStatus(640, 850);
  assert.equal(status.available, 210);
  assert.equal(status.percentUsed, 75);
  assert.equal(status.isOverBudget, false);
});
