import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { ShowAdminJobPage } from '../../../pageObjects/enterprise/administrationFG/showAdminJob.po.js';

test('Show Admin Job Only in Grid', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const showAdminJobPage = new ShowAdminJobPage(page);

  // Navigate to Mass Assignment for Jobs page
  await showAdminJobPage.navigateToMassAssignmentForJobs();

  // Verify Mass Assignment for Jobs header is visible
  const massAssignmentHeader = await showAdminJobPage.verifyMassAssignmentHeader();
  await expect(massAssignmentHeader).toBeVisible();
  await expect(massAssignmentHeader).toHaveText(/^\s*Mass Assignment for Jobs\s*$/);

  // Verify Show Admin Jobs Grid text is visible
  const showAdminJobsGridText = await showAdminJobPage.verifyShowAdminJobsGridText();
  await expect(showAdminJobsGridText).toBeVisible();

  // Verify Close Selected Job button is visible and is submit type
  const closeSelectedJobButton = await showAdminJobPage.verifyCloseSelectedJobButton();
  await expect(closeSelectedJobButton).toBeVisible();
  await expect(closeSelectedJobButton).toHaveAttribute('type', 'submit');
  await expect(closeSelectedJobButton).toBeEnabled();

  // Get toggle text and verify initial state is "off"
  const toggleText = await showAdminJobPage.getToggleText();
  await expect(toggleText).toHaveText(/^off$/i);

  // Click toggle button
  await showAdminJobPage.clickToggleButton();

  // Verify state changes to "on"
  await expect(toggleText).toHaveText(/^on$/i);

  // Verify Close Selected Job button is disabled
  await expect(closeSelectedJobButton).toBeDisabled();

  // Get job number text from first row
  const jobNumberText = await showAdminJobPage.getJobNumberText();

  // Click on first row of job number column and wait for navigation
  await showAdminJobPage.clickJobNumberFirstRow(jobNumberText);

  // Verify URL contains job number text
  const currentURL = page.url();
  expect(currentURL).toContain(jobNumberText?.trim());

  // Verify Admin Claim Info Section is visible
  const adminClaimInfoSection = await showAdminJobPage.verifyAdminClaimInfoSection();
  await expect(adminClaimInfoSection).toBeVisible();
});
