import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { AccountingSettingsPage } from '../../../pageObjects/enterprise/dashEnterprise/AccountingSettingsPage.po.js';

test('Account Condition Check for Invoices', async ({ authenticatedPage }) => {
  const accountingPage = new AccountingSettingsPage(authenticatedPage);

  // Navigate to Accounting Settings
  await accountingPage.openAccountSettings();

  // Verify Accounting Settings page is displayed
  expect(await accountingPage.isAccountingSettingsDisplayed()).toBe(true);
  expect(await accountingPage.isAllowPastDatesForInvoicesDisplayed()).toBe(true);

  // Configure invoice exception days to 10 and re-enable past dates
  await accountingPage.configureInvoiceExceptionDaysAndEnablePastDates(10);

  // Verify settings were saved successfully (after final save)
  expect(await accountingPage.isUpdatedSuccessfullyDisplayed()).toBe(true);
});
