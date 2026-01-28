import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { ResetPurchaseOrderPage } from '../../../pageObjects/enterprise/administrationFG/resetPurchaseOrder.po.js';

test('Reset Purchase Order Page', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const resetPurchaseOrderPage = new ResetPurchaseOrderPage(page);

  // Navigate to Reset Purchase Order page
  await resetPurchaseOrderPage.navigateToResetPurchaseOrder();

  // Verify Reset Purchase Order text is visible
  const resetPurchaseOrderText = await resetPurchaseOrderPage.verifyResetPurchaseOrderText();
  await expect(resetPurchaseOrderText).toBeVisible();
  await expect(resetPurchaseOrderText).toHaveText(/^\s*Reset Purchase Order\s*$/);

  // Verify Convert Purchase Order to Work Order button is visible and is submit type
  const convertButton = await resetPurchaseOrderPage.verifyConvertPurchaseOrderToWorkOrderButton();
  await expect(convertButton).toBeVisible();
  await expect(convertButton).toHaveAttribute('type', 'submit');

  // Verify Export To Excel button is visible and is submit type
  const exportToExcelButton = await resetPurchaseOrderPage.verifyExportToExcelButton();
  await expect(exportToExcelButton).toBeVisible();
  await expect(exportToExcelButton).toHaveAttribute('type', 'submit');

  // Verify Back to HomePage button is visible and is submit type
  const backToHomePageButton = await resetPurchaseOrderPage.verifyBackToHomePageButton();
  await expect(backToHomePageButton).toBeVisible();
  await expect(backToHomePageButton).toHaveAttribute('type', 'submit');

  // Verify Purchase Order grid header is visible
  const purchaseOrderGridHeader = await resetPurchaseOrderPage.verifyPurchaseOrderGridHeader();
  await expect(purchaseOrderGridHeader).toBeVisible();

  // Verify Work Order grid header is visible
  const workOrderGridHeader = await resetPurchaseOrderPage.verifyWorkOrderGridHeader();
  await expect(workOrderGridHeader).toBeVisible();

  // Verify Status grid header is visible
  const statusGridHeader = await resetPurchaseOrderPage.verifyStatusGridHeader();
  await expect(statusGridHeader).toBeVisible();
});
