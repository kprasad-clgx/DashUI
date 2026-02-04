import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { EquipmentPage } from '../../../pageObjects/enterprise/quickNotes/EquipmentPage.po.js';
import { generateUniqueName } from '../../../utils/helpers.js';
import equipmentData from '../../../testData/enterprise/quickNotes/equipmentData/equipmentData.json' with { type: 'json' };

test('Create Equipment from Quick Notes', async ({ authenticatedPage }) => {
  // Initialize page objects
  const equipmentPage = new EquipmentPage(authenticatedPage);

  // Generate unique equipment name, ID, and barcode
  const uniqueEquipmentName = generateUniqueName('TestEquipment');
  const uniqueEquipmentId = generateUniqueName('EQ-ID-');
  const uniqueBarcode = generateUniqueName('110011');

  // Open Quick Notes and navigate to Create Equipment
  await equipmentPage.openQuickNotesCreateEquipment();

  // Fill out equipment creation form with all fields
  await equipmentPage.createEquipment({
    ...equipmentData,
    equipmentName: uniqueEquipmentName,
    equipmentId: uniqueEquipmentId,
    barcode: uniqueBarcode,
  });

  // Wait for uniqueness validation to complete by waiting for the Save button to be enabled
  await expect(authenticatedPage.locator(equipmentPage.saveButton)).toBeEnabled();

  // Click Save button
  await equipmentPage.clickSave();

  // Search for the created equipment
  await equipmentPage.searchEquipment(uniqueEquipmentName);

  // Verify equipment exists in search results
  const equipmentExists = await equipmentPage.verifyEquipmentExists(uniqueEquipmentName);
  expect(equipmentExists).toBe(true);

  // Click on the created equipment to navigate to edit page
  await equipmentPage.clickEquipment(uniqueEquipmentName);

  // Verify navigation to equipment edit page and assert equipment name value
  const equipmentNameInput = await equipmentPage.verifyEquipmentEditPage(uniqueEquipmentName);
  await expect(equipmentNameInput).toHaveValue(uniqueEquipmentName);
});
