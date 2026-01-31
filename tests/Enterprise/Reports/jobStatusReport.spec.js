import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { ReportsPage } from '../../../pageObjects/enterprise/reports/reports.po.js';

test('Job Status Reports', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const reportsPage = new ReportsPage(page);

  // 1. Navigate
  await reportsPage.navigateToReports();

  const { reportPopup, notification } = await reportsPage.verifyJobStatusReport();
  await expect(notification).toContainText(/Queued|completed/i, { timeout: 50000 });
  await reportPopup.close();
});
