import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { AccountingSettingsPage } from '../../../pageObjects/enterprise/dashEnterprise/AccountingSettingsPage.po.js';

test('Accounting setting page', async ({ authenticatedPage }) => {
  const accountingPage = new AccountingSettingsPage(authenticatedPage);

  // Access Accounting Settings: Click the "Accounting" section header
  await accountingPage.openAccountSettings();

  // Verify  "Accounting Settings" is displayed
  expect(await accountingPage.isAccountingSettingsDisplayed()).toBe(true);

  // Check if "Allow past dates for invoices" option is displayed
  expect(await accountingPage.isAllowPastDatesForInvoicesDisplayed()).toBe(true);

  // Check if the checkbox ctl00_ContentPlaceHolder1_CheckBox_AllowPastDatesForInvoices is selected
  expect(await accountingPage.isAllowPastDatesForInvoicesChecked()).toBe(true);

  // Uncheck the checkbox to enable editing the dropdown
  await accountingPage.allowPastDatesForInvoicesCheckbox.uncheck();

  // Configure Invoice Exception Days: Click the dropdown arrow and select
  await accountingPage.selectInvoiceExceptionDays(10); // Example: select 10 days

  // Save Settings: Click the "Save Accounting Settings" button
  await accountingPage.saveSettings();

  // Verify Save Success: Check if "Updated Successfully" message is displayed
  expect(await accountingPage.isUpdatedSuccessfullyDisplayed()).toBe(true);

  // Check the checkbox again to enable the past dates feature
  await accountingPage.allowPastDatesForInvoicesCheckbox.check();

  // Save Settings again: Click the "Save Accounting Settings" button
  await accountingPage.saveSettings();

  // Verify Save Success: Check if "Updated Successfully" message is displayed
  expect(await accountingPage.isUpdatedSuccessfullyDisplayed()).toBe(true);
});
