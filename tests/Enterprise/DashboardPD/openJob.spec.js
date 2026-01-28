import { test } from '../../../fixtures/enterpriseFixtures.js';
import OpenJobPage from '../../../pageObjects/enterprise/dashboardPD/openJob.po.js';

test('Open Job Page', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const openJobPage = new OpenJobPage(page);

  // Navigate to Open Job page
  await openJobPage.navigateToOpenJob();

  // Assert Global Job Search
  await openJobPage.assertGlobalJobSearch();

  // Assert all grid column headers are visible
  await openJobPage.assertAllGridHeadersVisible();

  // Download and assert Excel file
  await openJobPage.downloadAndAssertExcel();

  // Download and assert PDF file
  await openJobPage.downloadAndAssertPDF();
});
