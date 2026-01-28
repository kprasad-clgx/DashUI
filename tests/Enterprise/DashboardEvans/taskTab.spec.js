import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import DashboardComplianceTasksTabPage from '../../../pageObjects/enterprise/dashboardEvans/taskTab.po.js';
import dashboardAccountingNotesData from '../../../testData/enterprise/enterpriseCompanySettings/DashboardAccountingNotes.json' with { type: 'json' };
import { searchJobNumber } from '../../../utils/searchJobNumber.js';

test('Compliance Tasks Tab Validation', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const complianceTasksTabPage = new DashboardComplianceTasksTabPage(page);

  // Search for job by number
  await searchJobNumber(page, dashboardAccountingNotesData.jobNumber);
  // Navigate to Compliance Tasks tab
  await complianceTasksTabPage.navigateToComplianceTasksTab();

  // Assert the text of the Compliance Manager label
  await expect(await complianceTasksTabPage.verifyComplianceManagerLabel()).toHaveText(
    'Compliance Manager',
  );

  // Validate Reassign button is visible
  await expect(await complianceTasksTabPage.verifyReassignButtonVisible()).toBeVisible();

  // Validate Pending color indicator is visible
  await expect(await complianceTasksTabPage.verifyPendingLabelVisible()).toBeVisible();

  // Validate Warning color indicator is visible
  await expect(await complianceTasksTabPage.verifyWarningLabelVisible()).toBeVisible();

  // Validate Overdue color indicator is visible
  await expect(await complianceTasksTabPage.verifyOverdueLabelVisible()).toBeVisible();

  // Validate Refresh button is visible
  await expect(await complianceTasksTabPage.verifyRefreshButtonVisible()).toBeVisible();

  // Validate Export to Excel button is visible
  await expect(await complianceTasksTabPage.verifyExportToExcelButtonVisible()).toBeVisible();
});
