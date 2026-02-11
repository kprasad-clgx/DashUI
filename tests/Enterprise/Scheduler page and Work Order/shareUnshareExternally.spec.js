import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { searchJobNumber } from '../../../utils/searchJobNumber.js';
import { WorkOrderPurchaseOrderPage } from '../../../pageObjects/enterprise/accountingInformation/WorkOrderPurchaseOrderPage.po.js';
import jobData from '../../../testData/enterprise/enterpriseJobNumber.json' with { type: 'json' };
import workOrderData from '../../../testData/enterprise/accountingInformation/workOrderPurchaseOrder.json' with { type: 'json' };

test('Share/Unshare Externally in Work Order', async ({ authenticatedPage }) => {
  const workOrderPage = new WorkOrderPurchaseOrderPage(authenticatedPage);
  const jobNumber = jobData.jobNumber;
  await searchJobNumber(authenticatedPage, jobNumber);
  await workOrderPage.openWorkOrderPurchaseOrder();

  //create work order
  const workOrderNumber = await workOrderPage.createNewWorkOrder(workOrderData.newWorkOrder);

  // work order created successfully
  expect(workOrderNumber).toBeTruthy();

  // Verify initial External status is "No"
  let externalStatus = await workOrderPage.getExternalStatusByWorkOrderNumber(workOrderNumber);
  expect(externalStatus).toBe('No');

  // Select the work order
  await workOrderPage.selectWorkOrderByNumber(workOrderNumber);

  // Click Share/Unshare Externally button
  await workOrderPage.clickShareUnshareExternally();

  // Confirm the message by clicking OK
  await workOrderPage.confirmShareUnshareMessage();

  // Wait for server to fully process the share/unshare action before checking status
  await authenticatedPage.waitForTimeout(3000);

  // Verify External status changed to "Yes"
  externalStatus = await workOrderPage.getExternalStatusByWorkOrderNumber(workOrderNumber);
  expect(externalStatus).toBe('Yes');
});
