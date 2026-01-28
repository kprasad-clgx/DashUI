import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { EquipmentPage } from '../../../pageObjects/enterprise/moreFg/equipment.po.js';

test('Equipment Page in More FG', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const equipmentPage = new EquipmentPage(page);

  // Navigate to Equipment
  await equipmentPage.navigateToEquipment();

  // Validate Page Title
  await equipmentPage.validatePageTitle();

  // Validate Back Button
  await equipmentPage.validateBackButton();

  // Validate Move Date Label
  await equipmentPage.validateMoveDateLabel();

  // Define grid headers
  const expectedHeaders = [
    'Equipment Name',
    'Equipment Type',
    'Barcode Text',
    'Secondary Equipment Type',
    'Current Location',
    'Job Number',
    'Vendors',
    'Serial Number',
    'Model',
    'Manufacturer',
    'Description',
    'Storage Location',
    'Purchase Amount',
    'Status',
    'Last Moved Date',
  ];

  // Validate Grid Headers
  await equipmentPage.validateGridHeaders(expectedHeaders);

  // Validate Add New Equipment Button
  await equipmentPage.validateAddNewEquipmentButton();

  // Click on Add New Equipment Button and validate navigation
  await equipmentPage.addNewEquipmentButton.click();
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(/.*eEditEquipment\.aspx.*/);

  // Details in Equipment Edit Page
  await expect(page.locator('span.rtsTxt', { hasText: 'Details' })).toBeVisible();

  // Validate Export Buttons
  await equipmentPage.validateExportButtons();

  await page.waitForLoadState('networkidle');

  // Click on Export to Excel Button and assert file name
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    await equipmentPage.exportToExcelButton.click(),
  ]);
  const fileName = download.suggestedFilename();
  expect(fileName).toBe('EquipmentDetails.xlsx');

  await page.waitForLoadState('networkidle');

  // Click on Export to PDF Button and assert file name
  const [pdfDownload] = await Promise.all([
    page.waitForEvent('download'),
    await equipmentPage.exportToPDFButton.click(),
  ]);
  const pdfFileName = pdfDownload.suggestedFilename();
  expect(pdfFileName).toBe('EquipmentDetails.pdf');
});
