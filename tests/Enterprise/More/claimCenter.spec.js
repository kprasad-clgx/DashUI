import { test } from '../../../fixtures/enterpriseFixtures.js';
import { ClaimCenterPage } from '../../../pageObjects/enterprise/moreFg/claimCenter.po.js';

test('Claim Center Page in More FG', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const claimCenterPage = new ClaimCenterPage(page);

  // Navigate to Claim Center
  await claimCenterPage.navigateToClaimCenter();

  // Validate Back to HomePage Button
  await claimCenterPage.validateBackToHomePageButton();

  // Validate Export Buttons Excel and PDF
  await claimCenterPage.validateExportButtons();

  // Validate Clear All Filters Label
  await claimCenterPage.validateClearAllFiltersLabel();

  // Define grid headers
  const claimCenterGridHeaders = [
    'Job Number',
    'Job Name',
    'Office Name',
    'Customer',
    'Estimator',
    'Insurance Carrier',
    'Date Received',
    'Claim Number',
    'Job Address',
    'Status',
  ];

  // Validate Grid Headers
  await claimCenterPage.validateGridHeaders(claimCenterGridHeaders);

  // Download and assert Excel file
  await claimCenterPage.downloadAndAssertExcel();

  // Download and assert PDF file
  await claimCenterPage.downloadAndAssertPDF();

  // Click Back to HomePage and validate navigation
  await claimCenterPage.clickBackToHomePage();
});
