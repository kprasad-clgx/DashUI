import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { searchJobNumber } from '../../../utils/searchJobNumber.js';
import { JobSlideboardPage } from '../../../pageObjects/enterprise/jobSlideboard/jobSlideboardPage.po.js';
import jobData from '../../../testData/enterprise/enterpriseJobNumber.json' with { type: 'json' };

test('Accounting Information Events and Upload Dialog Validation', async ({
  authenticatedPage,
}) => {
  // Initialize page objects
  let jobNumber = jobData.jobNumber;
  const jobSlideboardPage = new JobSlideboardPage(authenticatedPage);

  // Search for the job using the robust utility
  await searchJobNumber(authenticatedPage, jobNumber);

  await expect(jobSlideboardPage.accountingInformationPanel).toBeVisible();

  // Get all accounting information data
  const accountingData = await jobSlideboardPage.getAccountingInformation();

  // --- Validation Regex Patterns ---
  const currencyRegex = /^(\$[\d,]+\.\d{2}|\(\$[\d,]+\.\d{2}\))$/;
  const percentRegex = /^-?[\d,]+\.\d{2}\s?%$/;

  // Validate Financial Data
  expect(accountingData.totalEstimates).toMatch(currencyRegex);
  expect(accountingData.invoicedSubtotal).toMatch(currencyRegex);
  expect(accountingData.workOrderBudget).toMatch(currencyRegex);
  expect(accountingData.creditMemos).toMatch(currencyRegex);
  expect(accountingData.estimatedGP).toMatch(currencyRegex);
  expect(accountingData.adjustedInvoiceSubtotal).toMatch(currencyRegex);
  expect(accountingData.invoicedTax).toMatch(currencyRegex);
  expect(accountingData.totalInvoiced).toMatch(currencyRegex);
  expect(accountingData.burdenTotal).toMatch(currencyRegex);
  expect(accountingData.paymentReceived).toMatch(currencyRegex);
  expect(accountingData.actualCost).toMatch(currencyRegex);
  expect(accountingData.discount).toMatch(currencyRegex);
  expect(accountingData.totalJobCost).toMatch(currencyRegex);
  expect(accountingData.totalCollected).toMatch(currencyRegex);
  expect(accountingData.balanceOwing).toMatch(currencyRegex);
  expect(accountingData.actualGP).toMatch(currencyRegex);

  // Validate Percentages
  expect(accountingData.estimatedGPPercentage).toMatch(percentRegex);
  expect(accountingData.workingGPPercentage).toMatch(percentRegex);
  expect(accountingData.actualGPPercentage).toMatch(percentRegex);

  // Validate Text/State fields (Lien Rights usually has text like 'Not Found' or a Date)
  expect(accountingData.lienRights).toBeTruthy();
  expect(accountingData.lienRightsDays).toBeTruthy();

  // --- Upload Estimate Dialog Interaction ---

  // 1. Open (Handles clicking & waiting internally)
  await jobSlideboardPage.openUploadEstimateDialog();

  // 2. Ensure Content is Ready
  await jobSlideboardPage.waitForUploadEstimateDialog();

  // 3. Verify Elements
  await expect(jobSlideboardPage.closeButton).toBeVisible();

  // 4. Close
  await jobSlideboardPage.closeUploadEstimateDialog();

  // 5. Verify Closed
  await expect(jobSlideboardPage.uploadEstimateWindow).toBeHidden();
});
