import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { ReportsPage } from '../../../pageObjects/enterprise/reports/reports.po.js';
import testData from '../../../testData/enterprise/jobReceivedReportData.json' with { type: 'json' };

test.describe('Job Received Report', () => {
  for (const data of testData) {
    test(`Job Received Report - ${data.startDate} to ${data.endDate}`, async ({
      authenticatedPage,
    }) => {
      const page = authenticatedPage;
      const reportsPage = new ReportsPage(page);

      // 1. Navigate
      await reportsPage.navigateToReports();

      // 2. Open report and CAPTURE the new popup window
      const reportNewPage = await reportsPage.clickJobsReceivedReportOptionAndAssertUrl();

      // 3. Switch context to the new page and fill date range + generate
      // Wait for page to load first
      await reportNewPage.waitForLoadState('networkidle', { timeout: 30000 });

      const startDateInput = reportNewPage.locator('#txtStartDate_dateInput');
      const endDateInput = reportNewPage.locator('#txtEndDate_dateInput');
      const generateButton = reportNewPage.locator('#btnSubmit');

      // Wait for all elements to be visible
      await expect(startDateInput).toBeVisible({ timeout: 10000 });
      await expect(endDateInput).toBeVisible({ timeout: 10000 });
      await expect(generateButton).toBeVisible({ timeout: 10000 });

      // Fill dates
      await startDateInput.click();
      await startDateInput.fill(data.startDate);
      await startDateInput.blur();
      
      await endDateInput.click();
      await endDateInput.fill(data.endDate);
      await endDateInput.blur();

      // Wait a moment for validation
      await reportNewPage.waitForTimeout(500);

      // Wait for download while clicking the button
      const download = await Promise.all([
        reportNewPage.waitForEvent('download', { timeout: 30000 }),
        generateButton.click(),
      ]).then(([dl]) => dl);
      expect(await download.suggestedFilename()).toBe('JobsReceived_Report.xls');

      // 5. Cleanup: Close the popup so the next iteration starts clean
      await reportNewPage.close();
    });
  }
});
