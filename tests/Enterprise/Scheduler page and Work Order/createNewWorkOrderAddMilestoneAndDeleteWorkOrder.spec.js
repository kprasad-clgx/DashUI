import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { searchJobNumber } from '../../../utils/searchJobNumber.js';
import { WorkOrderPurchaseOrderPage } from '../../../pageObjects/enterprise/accountingInformation/WorkOrderPurchaseOrderPage.po.js';
import jobData from '../../../testData/enterprise/enterpriseJobNumber.json' with { type: 'json' };
import workOrderData from '../../../testData/enterprise/accountingInformation/workOrderPurchaseOrder.json' with { type: 'json' };

test.describe('Work Order CRUD Operations', () => {
  let workOrderPage;

  test.beforeEach(async ({ authenticatedPage }) => {
    workOrderPage = new WorkOrderPurchaseOrderPage(authenticatedPage);
    const jobNumber = jobData.jobNumber;
    await searchJobNumber(authenticatedPage, jobNumber);
    await workOrderPage.openWorkOrderPurchaseOrder();
  });

  test('Create New Work Order & Delete Work Order', async () => {
    // Create new work order
    const workOrderNumber = await workOrderPage.createNewWorkOrder(workOrderData.newWorkOrder);

    // Verify creation
    await workOrderPage.verifyGridEntry(workOrderNumber);

    // Delete work order
    await workOrderPage.deleteWorkOrder(workOrderNumber);

    // Verify deletion
    await workOrderPage.verifyWorkOrderDeleted(workOrderNumber, expect);
  });

  test('Add Milestone to Work Order', async () => {
    // Add milestone
    const milestoneNumber = await workOrderPage.addMilestone(workOrderData.milestone);

    // Verify milestone in grid
    await workOrderPage.verifyGridEntry(milestoneNumber);
  });
});
