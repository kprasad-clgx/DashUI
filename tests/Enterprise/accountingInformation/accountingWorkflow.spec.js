import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { searchJobNumber } from '../../../utils/searchJobNumber.js';
import { AccountDetailsPage } from '../../../pageObjects/enterprise/accountingInformation/AccountDetailsPage.po.js';
import fs from 'fs';

test.describe('Account Details Validation', () => {
  let jobNumber;
  let accountDetailsPage;

  test.beforeAll(async () => {
    const jobData = JSON.parse(
      fs.readFileSync('testData/enterprise/enterpriseJobNumber.json', 'utf-8'),
    );
    jobNumber = jobData.jobNumber;
  });

  // Optimize: Setup state once before each test to remove duplication
  test.beforeEach(async ({ authenticatedPage }) => {
    accountDetailsPage = new AccountDetailsPage(authenticatedPage);
    await searchJobNumber(authenticatedPage, jobNumber);
    await accountDetailsPage.openAccountDetails();
  });

  test('1a. Job accounting summary validation', async () => {
    await accountDetailsPage.validateAccountingSummaryPage();
    const values = await accountDetailsPage.validateAccountingAmount();
    expect(values.finalEstimateAmount).not.toBeNull();
  });

  test('1b. Payments section validation', async () => {
    await accountDetailsPage.openPayments();
    await accountDetailsPage.validatePaymentsPage();
    await accountDetailsPage.addPayment({
      memo: 'Test payment',
      paymentAmount: 1000.0,
    });
  });

  test('1c. Estimates section validation', async () => {
    await accountDetailsPage.openEstimates();
    await accountDetailsPage.validateEstimatesPage();
  });

  test('1d. Job costing section validation', async () => {
    await accountDetailsPage.openJobCosting();
    await accountDetailsPage.validateJobCostingPage();
  });

  test('1e. Invoices section validation', async () => {
    await accountDetailsPage.openInvoices();
    await accountDetailsPage.validateInvoicesPage();
  });

  test('1f. Work orders section validation', async () => {
    await accountDetailsPage.openWorkOrder();
    await accountDetailsPage.validateWorkOrderPage();
  });

  test('1g. Accounting report validation', async () => {
    await accountDetailsPage.openAccountingReport();
    await accountDetailsPage.validateAccountingReportPage();
  });

  test('1h. Accounting report with POs validation', async ({ authenticatedPage }) => {
    const [download] = await Promise.all([
      authenticatedPage.waitForEvent('download'),
      accountDetailsPage.openAccountReportWithPOs(),
    ]);
    const filename = download.suggestedFilename();
    expect(filename).toContain('AccountingReport_WithPOs');
  });
});
