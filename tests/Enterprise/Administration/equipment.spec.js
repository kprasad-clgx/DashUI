import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import EquipmentPage from '../../../pageObjects/enterprise/administrationFG/equipment.po.js';

test('Verify Equipment Page', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const equipmentPage = new EquipmentPage(page);

  // Navigate to Equipment page from Administration menu
  await equipmentPage.navigateToEquipment();

  // Verify Equipment Details header is visible
  await expect(await equipmentPage.verifyEquipmentDetailsHeaderVisible()).toBeVisible();

  // Verify Equipment Details header has correct text
  await expect(await equipmentPage.verifyEquipmentDetailsHeaderText()).toHaveText(
    'Equipment Details',
  );

  // Verify Add New Equipment button is visible
  await expect(await equipmentPage.verifyAddNewEquipmentButtonVisible()).toBeVisible();

  // Verify Equipment Name column header is visible
  await expect(await equipmentPage.verifyEquipmentNameHeaderVisible()).toBeVisible();

  // Verify Linked column header is visible
  await expect(await equipmentPage.verifyLinkedHeaderVisible()).toBeVisible();

  // Verify Equipment Type column header is visible
  await expect(await equipmentPage.verifyEquipmentTypeHeaderVisible()).toBeVisible();

  // Verify Secondary Equipment Type column header is visible
  await expect(await equipmentPage.verifySecondaryEquipmentTypeHeaderVisible()).toBeVisible();

  // Verify Status column header is visible
  await expect(await equipmentPage.verifyStatusHeaderVisible()).toBeVisible();
});
