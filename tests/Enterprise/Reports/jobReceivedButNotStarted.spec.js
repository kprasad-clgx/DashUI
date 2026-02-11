import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { ReportsPage } from '../../../pageObjects/enterprise/reports/reports.po.js';
import testData from '../../../testData/enterprise/jobReceivedReportData.json' with { type: 'json' };


test('Job Received but not started', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const reportsPage = new ReportsPage(page);

  // 1. Navigate to Reports page
  await reportsPage.navigateToReports();

  // 2. Verify Job Received but not started
  const newPage = await reportsPage.clickjobReceivedButNotStartedOptionAndAssertUrl();
  const jobReceivedReportTab = new ReportsPage(newPage);

  // 3. Select Date Range and Generate Report in new tab
  const { startDate, endDate } = testData[0];
  const networkRequest = await jobReceivedReportTab.selectDateRange(startDate, endDate);
  
  // 4. Assert network request was successful
  expect(networkRequest).toBeDefined();
});
