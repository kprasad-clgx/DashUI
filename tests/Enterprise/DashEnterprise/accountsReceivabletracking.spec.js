import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { AccountsReceivableTrackingPage } from '../../../pageObjects/enterprise/dashEnterprise/AccountsReceivableTrackingPage.po.js';

test('Accounts Receivable Tracking', async ({ authenticatedPage }) => {
  // Page automatically starts on home page via fixture
  const accountsReceivablePage = new AccountsReceivableTrackingPage(authenticatedPage);

  // Navigate to Accounts Receivable Tracking dashboard
  await accountsReceivablePage.navigateToAccountsReceivableTracking();

  // Validate page title
  const pageTitle = await accountsReceivablePage.getPageTitle();
  expect(pageTitle).toBe('Accounts Receivable Tracking Dashboard');

  // Validate page title is visible
  const isTitleVisible = await accountsReceivablePage.isPageTitleVisible();
  expect(isTitleVisible).toBe(true);

  // Validate filter radio buttons are visible
  expect(await accountsReceivablePage.isShowRequestedVisible()).toBe(true);

  // Select Show All to ensure it's selected
  await accountsReceivablePage.selectShowAll();

  // Validate Show All is selected
  expect(await accountsReceivablePage.isShowAllSelected()).toBe(true);

  // Validate grid is visible
  expect(await accountsReceivablePage.isGridVisible()).toBe(true);

  // Validate all grid headers in a single efficient call
  const { expected, actual } = await accountsReceivablePage.validateGridHeaders();
  expect(actual).toEqual(expected);

  // Validate grid has data
  const rowCount = await accountsReceivablePage.getGridRowCount();
  expect(rowCount).toBeGreaterThan(0);

  // Get and validate grid data
  const gridData = await accountsReceivablePage.getGridData();
  expect(gridData.length).toBeGreaterThan(0);

  // Validate first row has required fields
  expect(gridData[0].requestId).toBeTruthy();
  expect(gridData[0].type).toBeTruthy();
  expect(gridData[0].status).toBeTruthy();
  expect(gridData[0].amount).toMatch(/\$/); // Should contain dollar sign

  // Test filter: Show Requested
  await accountsReceivablePage.selectShowRequested();

  // Test pagination info
  const paginationInfo = await accountsReceivablePage.getPaginationInfo();
  expect(paginationInfo).toContain('items in');
  expect(paginationInfo).toContain('pages');

  // // Test Export to Excel functionality
  // await accountsReceivablePage.clickExportToExcel();
  // console.log('✓ Export to Excel button clicked successfully');

  // // Wait a moment for export to process
  // await page.waitForTimeout(2000);

  // // Wait for and validate export notification
  // await accountsReceivablePage.waitForExportNotification();

  // expect(await accountsReceivablePage.isExportNotificationVisible()).toBe(true);

  // const notificationText = await accountsReceivablePage.getExportNotificationText();

  // // Check if notification contains either completed or queued
  // const isValidNotification = notificationText.includes('File export request completed') ||
  //                             notificationText.includes('File export request queued');
  // expect(isValidNotification).toBe(true);
});
