import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { AccountDetailsPage } from '../../../pageObjects/enterprise/accountingInformation/AccountDetailsPage.po.js';
import { searchJobNumber } from '../../../utils/searchJobNumber.js';
import jobData from '../../../testData/enterprise/enterpriseJobNumber.json' with { type: 'json' };

test('Accounting Amount Validation', async ({ authenticatedPage }) => {
  const accountDetailsPage = new AccountDetailsPage(authenticatedPage);
  let jobNumber = jobData.jobNumber;

  // Search for the job using the robust utility
  await searchJobNumber(authenticatedPage, jobNumber);
  await accountDetailsPage.openAccountDetails();

  // Validate all accounting amounts using the page object method
  const results = await accountDetailsPage.validateAccountingAmount();
  expect(results).toBeDefined();
});
