import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import DashboardSurveyTabPage from '../../../pageObjects/enterprise/dashboardEvans/surveyTab.po.js';
import dashboardAccountingNotesData from '../../../testData/enterprise/enterpriseCompanySettings/DashboardAccountingNotes.json' with { type: 'json' };
import { searchJobNumber } from '../../../utils/searchJobNumber.js';

test('Survey Tab Validation', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const surveyTabPage = new DashboardSurveyTabPage(page);

  // Search for job by number
  await searchJobNumber(page, dashboardAccountingNotesData.jobNumber);

  // Navigate to Survey tab
  await surveyTabPage.navigateToSurveyTab();

  // Validate Take a Survey button is visible
  await expect(await surveyTabPage.verifyTakeSurveyButtonVisible()).toBeVisible();

  // Validate Refresh button is visible
  await expect(await surveyTabPage.verifyRefreshButtonVisible()).toBeVisible();

  // Validate Export to Excel button is visible
  await expect(await surveyTabPage.verifyExportToExcelButtonVisible()).toBeVisible();

  // Validate Export to PDF button is visible
  await expect(await surveyTabPage.verifyExportToPDFButtonVisible()).toBeVisible();

  // Validate SNo. column header is visible
  await expect(await surveyTabPage.verifySNoColumnHeaderVisible()).toBeVisible();

  // Validate Question column header is visible
  await expect(await surveyTabPage.verifyQuestionColumnHeaderVisible()).toBeVisible();

  // Validate Survey Points column header is visible
  await expect(await surveyTabPage.verifySurveyPointsColumnHeaderVisible()).toBeVisible();

  // Validate Average Score column header is visible
  await expect(await surveyTabPage.verifyAverageScoreColumnHeaderVisible()).toBeVisible();

  // Click On Export to Excel button and assert download
  const downloadSuccess = await surveyTabPage.downloadAndAssertExcel();
  expect(downloadSuccess).toBeTruthy();

  // Click on Export to PDF button and assert download
  const pdfDownloadSuccess = await surveyTabPage.downloadAndAssertPDF();
  expect(pdfDownloadSuccess).toBeTruthy();

    // Click on Take a Survey button
  await surveyTabPage.clickTakeSurveyButton();

  // Validate Customer Service Survey Form title text is correct
  await expect(await surveyTabPage.verifyCustomerServiceSurveyFormTitle()).toHaveText(
    'Customer Service Survey Form',
  );
});
