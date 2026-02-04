import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { JobSlideboardPage } from '../../../pageObjects/enterprise/jobSlideboard/jobSlideboardPage.po.js';
import { searchJobNumber } from '../../../utils/searchJobNumber.js';
import jobData from '../../../testData/enterprise/enterpriseJobNumber.json' with { type: 'json' };

test('Validate Accounting Information on Job Slideboard', async ({ authenticatedPage }) => {
  // Initialize page objects
  const jobSlideboardPage = new JobSlideboardPage(authenticatedPage);

  // Search for the job using the robust utility
  let jobNumber = jobData.jobNumber;
  await searchJobNumber(authenticatedPage, jobNumber);

  // Get all accounting information data
  const accountingData = await jobSlideboardPage.getAccountingInformation();

  // Perform validations in test
  expect(accountingData.totalEstimates).toMatch(/\$[\d,]+\.\d{2}/);
  expect(accountingData.invoicedSubtotal).toMatch(/\$[\d,]+\.\d{2}/);
  expect(accountingData.workOrderBudget).toMatch(/\$[\d,]+\.\d{2}/);
  expect(accountingData.estimatedGP).toMatch(/\$[\d,]+\.\d{2}/);
  expect(accountingData.balanceOwing).toMatch(/\$[\d,]+\.\d{2}/);
  expect(accountingData.actualGPPercentage).toMatch(/[\d,]+\.\d{2}\s*%/);

  // Verify all expected fields are present
  expect(accountingData).toHaveProperty('totalEstimates');
  expect(accountingData).toHaveProperty('creditMemos');
  expect(accountingData).toHaveProperty('paymentReceived');
  expect(accountingData).toHaveProperty('discount');
});
