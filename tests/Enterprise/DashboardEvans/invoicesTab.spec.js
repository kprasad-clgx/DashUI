import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import DashboardInvoicesTabPage from '../../../pageObjects/enterprise/dashboardEvans/invoicesTab.po.js';
import dashboardAccountingNotesData from '../../../testData/enterprise/enterpriseCompanySettings/DashboardAccountingNotes.json' with { type: 'json' };
import { getRandomNumber } from '../../../utils/randomNumber.js';
import { searchJobNumber } from '../../../utils/searchJobNumber.js';

let randomNumber = getRandomNumber(1, 10000);

test('Invoices Tab Validation And Add New Data Validation', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const dashboardInvoicesTabPage = new DashboardInvoicesTabPage(page);

  // Search for job by number
  await searchJobNumber(page, dashboardAccountingNotesData.jobNumber);

  // Navigate to Invoices tab
  await dashboardInvoicesTabPage.navigateToInvoicesTab();

  // Verify Add New button is visible
  await expect(await dashboardInvoicesTabPage.verifyAddNewButtonVisible()).toBeVisible();

  // Verify Refresh button is visible
  await expect(await dashboardInvoicesTabPage.verifyRefreshButtonVisible()).toBeVisible();

  // Verify Export to Excel button is visible
  await expect(await dashboardInvoicesTabPage.verifyExportToExcelButtonVisible()).toBeVisible();

  // Verify Export to PDF button is visible
  await expect(await dashboardInvoicesTabPage.verifyExportToPDFButtonVisible()).toBeVisible();

  // Verify Invoice PDF column header is visible
  await expect(await dashboardInvoicesTabPage.verifyInvoicePDFColumnHeaderVisible()).toBeVisible();

  // Verify Invoice No. column header is visible
  await expect(await dashboardInvoicesTabPage.verifyInvoiceNoColumnHeaderVisible()).toBeVisible();

  // Verify Note column header is visible
  await expect(await dashboardInvoicesTabPage.verifyNoteColumnHeaderVisible()).toBeVisible();

  // Verify Customer column header is visible
  await expect(await dashboardInvoicesTabPage.verifyCustomerColumnHeaderVisible()).toBeVisible();

  // Verify Invoice Date column header is visible
  await expect(await dashboardInvoicesTabPage.verifyInvoiceDateColumnHeaderVisible()).toBeVisible();

  // Verify Amount column header is visible
  await expect(await dashboardInvoicesTabPage.verifyAmountColumnHeaderVisible()).toBeVisible();

  // Verify Tax Included column header is visible
  await expect(await dashboardInvoicesTabPage.verifyTaxIncludedColumnHeaderVisible()).toBeVisible();

  // Click Add New button to navigate to Invoice detail page
  await dashboardInvoicesTabPage.clickAddNewButton();

  // Verify URL contains job number after navigating to Invoices tab
  const currentURL = page.url();
  expect(currentURL).toContain(dashboardAccountingNotesData.jobNumber);

  // Verify Invoice detail page is visible and has correct text
  const invoiceDetailPage = await dashboardInvoicesTabPage.verifyInvoiceDetailPageVisible();
  await expect(invoiceDetailPage).toBeVisible();
  await expect(invoiceDetailPage).toHaveText(dashboardInvoicesTabPage.getExpectedInvoiceDetail());

  // Verify Invoice detail page Add New button is visible
  await expect(
    await dashboardInvoicesTabPage.verifyInvoiceDetailAddNewButtonVisible(),
  ).toBeVisible();

  // Verify Invoice detail page Refresh button is visible
  await expect(
    await dashboardInvoicesTabPage.verifyInvoiceDetailRefreshButtonVisible(),
  ).toBeVisible();

  // Verify Job Number column header is visible
  await expect(await dashboardInvoicesTabPage.verifyJobNumberColumnHeaderVisible()).toBeVisible();

  // Verify Invoice Memo column header is visible
  await expect(await dashboardInvoicesTabPage.verifyInvoiceMemoColumnHeaderVisible()).toBeVisible();

  // Click Invoice Detail Add New button
  await dashboardInvoicesTabPage.clickInvoiceDetailAddNewButton();

  // Verify Invoice Memo label is visible
  await expect(await dashboardInvoicesTabPage.verifyInvoiceMemoLabelVisible()).toBeVisible();

  // Enter Random Number in Invoice Memo input field
  await dashboardInvoicesTabPage.fillInvoiceMemo(randomNumber);

  // Verify Invoice Amount label is visible
  await expect(await dashboardInvoicesTabPage.verifyInvoiceAmountLabelVisible()).toBeVisible();

  // Enter Random Number in invoice Amount input field
  await dashboardInvoicesTabPage.fillInvoiceAmount(randomNumber);

  // Verify Save button is visible and has correct type
  const saveButton = await dashboardInvoicesTabPage.verifySaveButtonVisible();
  await expect(saveButton).toBeVisible();
  await expect(saveButton).toHaveAttribute('type', 'button');

  // Verify Cancel button is visible and has correct type
  const cancelButton = await dashboardInvoicesTabPage.verifyCancelButtonVisible();
  await expect(cancelButton).toBeVisible();
  await expect(cancelButton).toHaveAttribute('type', 'button');

  // Verify Back to Slide Board button is visible
  await expect(await dashboardInvoicesTabPage.verifyBackToSlideBoardButtonVisible()).toBeVisible();

  // Click on save button
  await dashboardInvoicesTabPage.clickSaveButton();

  // Click Back to Slide Board button
  await dashboardInvoicesTabPage.clickBackToSlideBoardButton();
  await page.waitForLoadState('networkidle');

  // Verify URL contains job number after navigating to slideboard
  const finalURL = page.url();
  expect(finalURL).toContain(dashboardAccountingNotesData.jobNumber);

  // Navigate to Invoices tab
  await dashboardInvoicesTabPage.navigateToInvoicesTab();

  // Click on refresh button to load newly added invoice
  await dashboardInvoicesTabPage.clickRefreshButton();

  // Filter by note with random number
  await dashboardInvoicesTabPage.filterByNote(randomNumber);

  // Assert the count of invoice rows in the grid to be 1
  const invoiceRows = await dashboardInvoicesTabPage.assertInvoiceRowCount(1);
  await expect(invoiceRows).toHaveCount(1);

  await page.waitForLoadState('networkidle');

  // Click on Export to Excel button and assert file download
  const downloadSuccess = await dashboardInvoicesTabPage.clickExportToExcelAndAssertDownload();
  expect(downloadSuccess).toBeTruthy();

  await page.waitForLoadState('networkidle');

  // Click on Export to PDF button and assert file download
  const pdfDownloadSuccess = await dashboardInvoicesTabPage.clickExportToPDFAndAssertDownload();
  expect(pdfDownloadSuccess).toBeTruthy();
});
