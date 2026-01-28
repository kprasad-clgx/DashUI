import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import JobSettingPage from '../../../pageObjects/enterprise/administrationFG/jobSetting.po.js';

test('Job Settings Page, Edit division', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const jobSettingPage = new JobSettingPage(page);

  // Navigate to Job Settings page from Administration menu
  await jobSettingPage.navigateToJobSettings();

  // Verify Catastrophe section header is visible
  await expect(await jobSettingPage.verifyCatastropheHeaderVisible()).toBeVisible();

  // Verify Custom Codes section header is visible
  await expect(await jobSettingPage.verifyCustomCodesHeaderVisible()).toBeVisible();

  // Verify Division section header is visible
  await expect(await jobSettingPage.verifyDivisionHeaderVisible()).toBeVisible();

  // Verify Lien Rights section header is visible
  await expect(await jobSettingPage.verifyLienRightsHeaderVisible()).toBeVisible();

  // Verify Loss Category section header is visible
  await expect(await jobSettingPage.verifyLossCategoryHeaderVisible()).toBeVisible();

  // Verify Reason for Closing section header is visible
  await expect(await jobSettingPage.verifyReasonForClosingHeaderVisible()).toBeVisible();

  // Verify Reported By section header is visible
  await expect(await jobSettingPage.verifyReportedByHeaderVisible()).toBeVisible();

  // Verify Tags section header is visible
  await expect(await jobSettingPage.verifyTagsHeaderVisible()).toBeVisible();

  // Verify Type of Loss section header is visible
  await expect(await jobSettingPage.verifyTypeOfLossHeaderVisible()).toBeVisible();

  // Verify Work Order Master section header is visible
  await expect(await jobSettingPage.verifyWorkOrderMasterHeaderVisible()).toBeVisible();

  // Click on Division section to expand
  await jobSettingPage.clickDivisionSection();

  // Verify Add New Record in Division section button is visible
  await expect(await jobSettingPage.verifyAddNewDivisionRecordButtonVisible()).toBeVisible();

  // Grid Header Array
  const expectedDivisionGridHeaders = ['Division Name', 'Division Type', 'Prefix', 'Suffix'];

  // Verify Division Grid Headers are visible and have correct text
  await jobSettingPage.verifyDivisionGridHeaders(expectedDivisionGridHeaders);

  // Click on First Edit button in grid
  await jobSettingPage.clickFirstEditButton();

  // Verify Division Name Label is visible
  await expect(await jobSettingPage.verifyDivisionNameLabelVisible()).toBeVisible({
    timeout: 15000,
  });

  // Verify Cancel button is visible and click it to exit edit mode
  await expect(await jobSettingPage.verifyCancelButtonVisible()).toBeVisible();
  await jobSettingPage.clickCancelButton();
});
