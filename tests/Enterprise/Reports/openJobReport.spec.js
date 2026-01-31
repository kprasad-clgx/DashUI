import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { ReportsPage } from '../../../pageObjects/enterprise/reports/reports.po.js';

test('Open Job Reports', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const reportsPage = new ReportsPage(page);

  // 1. Navigate to Reports page
  await reportsPage.navigateToReports();

  // 2. Generate and verify Open Jobs Report download
  const download = await reportsPage.verifyOpenJobsReport();

  // 3. Assert that download was successful
  expect(download).not.toBeNull();
  expect(download.suggestedFilename()).toBe('Open_Jobs_Report.xls');
});
