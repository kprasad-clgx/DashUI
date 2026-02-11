import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { searchJobNumber } from '../../../utils/searchJobNumber.js';
import { WorkOrderPurchaseOrderPage } from '../../../pageObjects/enterprise/accountingInformation/WorkOrderPurchaseOrderPage.po.js';
import jobData from '../../../testData/enterprise/enterpriseJobNumber.json' with { type: 'json' };
import workOrderData from '../../../testData/enterprise/accountingInformation/workOrderPurchaseOrder.json' with { type: 'json' };

test('Scheduling conflict in Work Order', async ({ authenticatedPage }) => {
  const workOrderPage = new WorkOrderPurchaseOrderPage(authenticatedPage);
  const jobNumber = jobData.jobNumber;
  await searchJobNumber(authenticatedPage, jobNumber);
  await workOrderPage.openWorkOrderPurchaseOrder();

  // Create 2 work orders
  const workOrderNumber1 = await workOrderPage.createNewWorkOrder(workOrderData.newWorkOrder);
  const workOrderNumber2 = await workOrderPage.createNewWorkOrder(workOrderData.newWorkOrder);

  // All 2 work orders created successfully
  expect(workOrderNumber1).toBeTruthy();
  expect(workOrderNumber2).toBeTruthy();

  // Open scheduler
  await workOrderPage.openScheduler();

  // Double-click on the first work order to edit it
  await workOrderPage.doubleClickFirstWorkOrder();

  // Select "SubContractor Company" for user type and wait for assignee list to be active
  await workOrderPage.selectUserType('SubContractor Company');

  // Select the first available assignee
  await workOrderPage.selectFirstAssignee();

  // Save the work order
  await workOrderPage.saveWorkOrderInScheduler();

  // First WO should save successfully 
  await workOrderPage.navigateBackToScheduler();

  // Double-click on the second work order to edit it
  await workOrderPage.doubleClickWorkOrderAtIndex(1);

  // Select same SubContractor Company user type
  await workOrderPage.selectUserType('SubContractor Company');

  // Select the same first assignee 
  await workOrderPage.selectFirstAssignee();

  // Conflict modal should appear immediately after selecting the assignee
  const conflictResult = await workOrderPage.checkSchedulingConflictModal();
  expect(conflictResult.hasConflict).toBe(true);
  expect(conflictResult.message).toContain(
    'Subcontractor/Vendor is already booked at this time on the following:',
  );

  // Close the conflict modal
  await workOrderPage.closeSchedulingConflictModal();
});
