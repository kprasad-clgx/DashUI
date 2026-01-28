import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import DashboardEquipmentTabPage from '../../../pageObjects/enterprise/dashboardEvans/equipmentTab.po.js';
import dashboardAccountingNotesData from '../../../testData/enterprise/enterpriseCompanySettings/DashboardAccountingNotes.json' with { type: 'json' };
import { searchJobNumber } from '../../../utils/searchJobNumber.js';

test('Equipment Tab Validation', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const dashboardEquipmentTabPage = new DashboardEquipmentTabPage(page);

  // Search for job by number
  await searchJobNumber(page, dashboardAccountingNotesData.jobNumber);

  // Navigate to Equipment tab
  await dashboardEquipmentTabPage.navigateToEquipmentTab();

  // Verify Refresh button is visible
  await expect(await dashboardEquipmentTabPage.verifyRefreshButtonVisible()).toBeVisible();

  // Verify Export to Excel button is visible
  await expect(await dashboardEquipmentTabPage.verifyExportToExcelButtonVisible()).toBeVisible();

  // Verify Export to PDF button is visible
  await expect(await dashboardEquipmentTabPage.verifyExportToPDFButtonVisible()).toBeVisible();

  // Verify Equipment Name column header is visible
  await expect(
    await dashboardEquipmentTabPage.verifyEquipmentNameColumnHeaderVisible(),
  ).toBeVisible();

  // Verify Equipment Type column header is visible
  await expect(
    await dashboardEquipmentTabPage.verifyEquipmentTypeColumnHeaderVisible(),
  ).toBeVisible();

  // Verify Barcode Text column header is visible
  await expect(
    await dashboardEquipmentTabPage.verifyBarcodeTextColumnHeaderVisible(),
  ).toBeVisible();

  // Verify Start Date column header is visible
  await expect(await dashboardEquipmentTabPage.verifyStartDateColumnHeaderVisible()).toBeVisible();

  // Verify End Date column header is visible
  await expect(await dashboardEquipmentTabPage.verifyEndDateColumnHeaderVisible()).toBeVisible();

  // Verify Days on Job column header is visible
  await expect(await dashboardEquipmentTabPage.verifyDaysOnJobColumnHeaderVisible()).toBeVisible();

  await page.waitForLoadState('networkidle');

  // Click on Export to Excel button and Assert file download
  const downloadSuccess = await dashboardEquipmentTabPage.clickExportToExcelAndAssertDownload();
  expect(downloadSuccess).toBeTruthy();

  await page.waitForLoadState('networkidle');

  // Click on Export to PDF button and Assert file download
  const pdfDownloadSuccess = await dashboardEquipmentTabPage.clickExportToPDFAndAssertDownload();
  expect(pdfDownloadSuccess).toBeTruthy();
});
