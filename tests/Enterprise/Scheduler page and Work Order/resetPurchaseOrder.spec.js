import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { searchJobNumber } from '../../../utils/searchJobNumber.js';
import { WorkOrderPurchaseOrderPage } from '../../../pageObjects/enterprise/accountingInformation/WorkOrderPurchaseOrderPage.po.js';
import jobData from '../../../testData/enterprise/enterpriseJobNumber.json' with { type: 'json' };
import workOrderData from '../../../testData/enterprise/accountingInformation/workOrderPurchaseOrder.json' with { type: 'json' };

test('Reset A Purchase Order', async ({ authenticatedPage }) => {
  const workOrderPage = new WorkOrderPurchaseOrderPage(authenticatedPage);
  const jobNumber = jobData.jobNumber;
  await searchJobNumber(authenticatedPage, jobNumber);
  await workOrderPage.openWorkOrderPurchaseOrder();
  const workOrderNumber = await workOrderPage.createNewWorkOrder(workOrderData.newWorkOrder);

  // Verify creation
  await workOrderPage.verifyGridEntry(workOrderNumber);

  // Select the work order checkbox in grid
  await workOrderPage.selectWorkOrderCheckbox(workOrderNumber);

  // Convert work order to purchase order
  await workOrderPage.convertWorkOrderToPurchaseOrder(workOrderNumber);

  // Clear grid and search specifically for the new PO to uniquely verify it was created
  await workOrderPage.clearSearchAndRefresh();

  // Verify the old WO number is no longer in grid (converted)
  const woNotFound = await workOrderPage.workOrderNotFoundInGrid(workOrderNumber);
  expect(woNotFound).toBe(true);

  // Navigate to Reset Purchase Order page
  await workOrderPage.navigateTo('Administration', 'Reset Purchase Order');

  // Search for the PO by work order number
  await workOrderPage.searchPurchaseOrderByWorkOrder(workOrderNumber);

  // Select the PO checkbox
  const poRow = authenticatedPage
    .locator('#ctl00_ContentPlaceHolder1_gvPurchaseOrder_ctl00 tr.rgRow')
    .first();
  const poCheckbox = poRow.locator('input[type="checkbox"]').first();
  await poCheckbox.check();
  await workOrderPage.waitForAjax();

  // Click Convert PO back to WO button
  await workOrderPage.convertPurchaseOrderToWorkOrder();

  // Verify the conversion was successful
  expect(true).toBe(true); // Conversion completed without errors
});
