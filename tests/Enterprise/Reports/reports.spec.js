import { test } from '../../../fixtures/enterpriseFixtures.js';
import { ReportsPage } from '../../../pageObjects/enterprise/reports/reports.po.js';

test('Reports validation', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const reportsPage = new ReportsPage(page);

  // Navigate to Reports page
  await reportsPage.navigateToReports();

  // Verify Create Report header
  await reportsPage.verifyCreateReportHeader();

  // Verify New Report heading
  await reportsPage.verifyNewReportHeading();

  // Verify Legacy Report Creator heading
  await reportsPage.verifyLegacyReportCreatorHeading();

  // Click on Job Received Report Option and switch to new tab
  const newPage = await reportsPage.clickJobsReceivedReportOptionAndAssertUrl();
  const reportsPageNewTab = new ReportsPage(newPage);

  // Select Date Range and Generate Report in new tab
  await reportsPageNewTab.selectLastMonthDateRangeAndGenerateReport();

  // Switch back to the original tab
  await page.bringToFront();

  console.log('Current Url' + page.url());

  // Click on Job Status report Option and switch to new tab
  const jobStatusReportTab = await reportsPage.clickJobStatusReportOptionAndAssertUrl();
  const reportsPageJobStatusTab = new ReportsPage(jobStatusReportTab);

  console.log('Current Url 1' + jobStatusReportTab.url());

  // Select Job from dropdown and Generate Report in new tab
  await reportsPageJobStatusTab.selectJobStatusReportJobAndGenerateReport();
});
