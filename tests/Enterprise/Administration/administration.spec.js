import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import AdministrationPage from '../../../pageObjects/enterprise/administrationFG/administration.po.js';

test('Verify Administration Page, Default Documentation Standards', async ({
  authenticatedPage,
}) => {
  const page = authenticatedPage;
  const administrationPage = new AdministrationPage(page);

  // Navigate to Administration page
  await administrationPage.navigateToAdministration();

  // Verify Individual Contact Document Section is visible and has correct text
  await expect(await administrationPage.verifyIndividualContactDocSection()).toBeVisible();
  await expect(await administrationPage.verifyIndividualContactDocSection()).toHaveText(
    'Individual Contact Document Section',
  );

  // Verify Contact Type Dropdown is visible
  await expect(await administrationPage.verifyContactTypeDropdown()).toBeVisible();

  // Verify Document Type Dropdown is visible
  await expect(await administrationPage.verifyDocumentTypeDropdown()).toBeVisible();

  // Verify Folder Select Dropdown is visible
  await expect(await administrationPage.verifyFolderSelectDropdown()).toBeVisible();

  // Verify Default Country Dropdown is visible
  await expect(await administrationPage.verifyDefaultCountryDropdown()).toBeVisible();

  // Verify Work Order Input is visible, not empty, and is text type
  await expect(await administrationPage.verifyWorkOrderInput()).toBeVisible();
  await expect(await administrationPage.verifyWorkOrderInput()).not.toBeEmpty();
  await expect(await administrationPage.verifyWorkOrderInput()).toHaveAttribute('type', 'text');

  // Verify Document Type Drop Down is visible
  await expect(await administrationPage.verifyDocumentTypeDropDown()).toBeVisible();

  // Verify Invoice Number Input is visible, not empty, and is text type
  await expect(await administrationPage.verifyInvoiceNumberInput()).toBeVisible();
  await expect(await administrationPage.verifyInvoiceNumberInput()).not.toBeEmpty();
  await expect(await administrationPage.verifyInvoiceNumberInput()).toHaveAttribute('type', 'text');

  // Verify No. of days for job lacking interactions input is visible and is text type
  await expect(await administrationPage.verifyNoOfDaysInput()).toBeVisible();
  await expect(await administrationPage.verifyNoOfDaysInput()).toHaveAttribute('type', 'text');

  // Verify Client Lacking Interaction input is visible and is text type
  await expect(await administrationPage.verifyClientLackingInteractionInput()).toBeVisible();
  await expect(await administrationPage.verifyClientLackingInteractionInput()).toHaveAttribute(
    'type',
    'text',
  );

  // Verify Fabric Job Due Date Interval input is visible and is text type
  await expect(await administrationPage.verifyFabricJobDueDateIntervalInput()).toBeVisible();
  await expect(await administrationPage.verifyFabricJobDueDateIntervalInput()).toHaveAttribute(
    'type',
    'text',
  );

  // Verify Job Warranty input is visible and is text type
  await expect(await administrationPage.verifyJobWarrantyInput()).toBeVisible();
  await expect(await administrationPage.verifyJobWarrantyInput()).toHaveAttribute('type', 'text');
});
