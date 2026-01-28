import { test } from '../../../fixtures/enterpriseFixtures.js';
import { EquipmentAndTrackingPage } from '../../../pageObjects/enterprise/moreFg/equipmentAndTracking.po.js';

test('Equipment And Tracking in More FG', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const equipmentAndTrackingPage = new EquipmentAndTrackingPage(page);

  // Navigate to Equipment and Tracking
  await equipmentAndTrackingPage.navigateToEquipmentAndTracking();

  // Validate Dashboard Text
  await equipmentAndTrackingPage.validateDashboardText();

  // Validate Action Buttons
  await equipmentAndTrackingPage.validateActionButtons();

  // Define Equipment Currently Billed Tab headers
  const equipmentCurrentlyBilledHeaders = ['Equipment Type', 'Total Equipment', 'Percent'];

  // Validate Equipment Currently Billed Tab
  await equipmentAndTrackingPage.validateEquipmentCurrentlyBilledTab(
    equipmentCurrentlyBilledHeaders,
  );

  // Define Equipment Available Tab headers
  const equipmentAvailableHeaders = [
    'Equipment Type',
    'In Stock',
    'Total Charges',
    'Percentage(%)',
  ];

  // Validate Equipment Available Tab
  await equipmentAndTrackingPage.validateEquipmentAvailableTab(equipmentAvailableHeaders);

  // Define Equipment Coming Available Tab headers
  const equipmentComingAvailableHeaders = [
    'Equipment Type',
    'Total Equipment',
    'Total Charges',
    'Percentage(%)',
  ];

  // Validate Equipment Coming Available Tab
  await equipmentAndTrackingPage.validateEquipmentComingAvailableTab(
    equipmentComingAvailableHeaders,
  );
});
