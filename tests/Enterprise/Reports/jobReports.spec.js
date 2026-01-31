import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { ReportsPage } from '../../../pageObjects/enterprise/reports/reports.po.js';

test('Job Reports', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const reportsPage = new ReportsPage(page);

  // 1. Navigate to Reports page
  await reportsPage.navigateToReports();

  // 2. Verify job reports links are accessible (opens and closes popups)
  await reportsPage.verifyJobReportsLinks();

  // 3. Verify Job Status Report functionality
  const { reportPopup, notification } = await reportsPage.verifyJobStatusReport();

  // 4. Assert that the notification appears after submitting the report
  await expect(notification).toBeVisible({ timeout: 30000 });
  await expect(notification).toContainText('Job Status Report is completed', { timeout: 30000 });

  // 5. Close the popup
  await reportPopup.close();
});
