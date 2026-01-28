import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import DashboardAccountingNotesPage from '../../../pageObjects/enterprise/dashboardEvans/accountingNotesTab.po.js';
import dashboardAccountingNotesData from '../../../testData/enterprise/enterpriseCompanySettings/DashboardAccountingNotes.json' with { type: 'json' };
import { searchJobNumber } from '../../../utils/searchJobNumber.js';

test('Dashboard Accounting Notes Tab Validation', async ({ authenticatedPage }) => {
  //------------Code Starts Here------------

  const page = authenticatedPage;
  const dashboardAccountingNotesPage = new DashboardAccountingNotesPage(page);

  // Search for job by number
  await searchJobNumber(page, dashboardAccountingNotesData.jobNumber);

  // Navigate to Accounting Notes tab
  await dashboardAccountingNotesPage.navigateToAccountingNotesTab();

  // Verify Export to Excel button is visible
  await expect(await dashboardAccountingNotesPage.verifyExportToExcelButtonVisible()).toBeVisible();

  // Verify Refresh button is visible
  await expect(await dashboardAccountingNotesPage.verifyRefreshButtonVisible()).toBeVisible();

  // Verify Export to PDF button is visible
  await expect(await dashboardAccountingNotesPage.verifyExportToPDFButtonVisible()).toBeVisible();

  // Verify Assigned To column header is visible
  await expect(
    await dashboardAccountingNotesPage.verifyAssignedToColumnHeaderVisible(),
  ).toBeVisible();

  // Verify Added By column header is visible
  await expect(await dashboardAccountingNotesPage.verifyAddedByColumnHeaderVisible()).toBeVisible();
});
