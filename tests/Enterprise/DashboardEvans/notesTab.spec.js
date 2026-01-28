import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import DashboardNotesTabPage from '../../../pageObjects/enterprise/dashboardEvans/notesTab.po.js';
import dashboardAccountingNotesData from '../../../testData/enterprise/enterpriseCompanySettings/DashboardAccountingNotes.json' with { type: 'json' };
import { searchJobNumber } from '../../../utils/searchJobNumber.js';

test('Notes Tab Validation', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const notesTabPage = new DashboardNotesTabPage(page);

  // Search for job by number
  await searchJobNumber(page, dashboardAccountingNotesData.jobNumber);

  // Navigate to Notes tab
  await notesTabPage.navigateToNotesTab();

  // Verify visibility dropdown is visible
  await expect(await notesTabPage.verifyVisibilityDropdownVisible()).toBeVisible();

  // Click visibility dropdown
  await notesTabPage.clickVisibilityDropdown();

  // Verify dropdown options are visible
  const { privateOption, publicAdminOption, publicOption } =
    await notesTabPage.verifyDropdownOptionsVisible();
  await expect(privateOption).toBeVisible();
  await expect(publicAdminOption).toBeVisible();
  await expect(publicOption).toBeVisible();

  // Verify Copy Notes button is disabled
  await notesTabPage.verifyCopyNotesButtonDisabled();

  // Verify Change Visibility button is visible
  await expect(await notesTabPage.verifyChangeVisibilityButtonVisible()).toBeVisible();

  // Verify Added By header is visible
  await expect(await notesTabPage.verifyAddedByHeaderVisible()).toBeVisible();

  // Verify Date header is visible
  await expect(await notesTabPage.verifyDateHeaderVisible()).toBeVisible();

  // Verify Notes header is visible
  await expect(await notesTabPage.verifyNotesHeaderVisible()).toBeVisible();

  // Verify Email Attachments header is visible
  await expect(await notesTabPage.verifyEmailAttachmentsHeaderVisible()).toBeVisible();

  // Verify Note E-mailed To header is visible
  await expect(await notesTabPage.verifyNoteEmailedToHeaderVisible()).toBeVisible();

  // Verify Visibility header is visible
  await expect(await notesTabPage.verifyVisibilityHeaderVisible()).toBeVisible();

  // Verify Refresh Notes Grid button is visible
  await expect(await notesTabPage.verifyRefreshNotesGridButtonVisible()).toBeVisible();

  // Verify Export to Excel button is visible
  await expect(await notesTabPage.verifyExportToExcelButtonVisible()).toBeVisible();

  // Verify Export to PDF button is visible
  await expect(await notesTabPage.verifyExportToPDFButtonVisible()).toBeVisible();

  // Verify Add New Note button is visible
  await expect(await notesTabPage.verifyAddNewNoteButtonVisible()).toBeVisible();

  // Verify Add New Note button type is button
  await notesTabPage.verifyAddNewNoteButtonType();

  // Verify grid first checkbox is visible
  await expect(await notesTabPage.verifyGridFirstCheckBoxVisible()).toBeVisible();

  // Click grid first checkbox
  await notesTabPage.clickGridFirstCheckBox();

  // Verify Copy Notes button is enabled after selecting a note
  await notesTabPage.verifyCopyNotesButtonEnabled();

  // Select public from visibility dropdown and click Change Visibility button
  await notesTabPage.selectVisibilityAndChange('Private');

  // Click on export to excel button and assert download
  const downloadSuccess = await notesTabPage.downloadAndAssertExcel();
  expect(downloadSuccess).toBeTruthy();

  // Click on export to PDF button and assert download
  const pdfDownloadSuccess = await notesTabPage.downloadAndAssertPDF();
  expect(pdfDownloadSuccess).toBeTruthy();
});
