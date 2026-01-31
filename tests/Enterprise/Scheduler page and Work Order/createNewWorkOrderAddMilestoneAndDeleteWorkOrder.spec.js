import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { searchJobNumber } from '../../../utils/searchJobNumber.js';
import { WorkOrderPurchaseOrderPage } from '../../../pageObjects/enterprise/accountingInformation/WorkOrderPurchaseOrderPage.po.js';
import fs from 'fs';
import path from 'path';

// Load Data using fs to avoid deprecated import assertions
const workOrderData = JSON.parse(
  fs.readFileSync(
    path.resolve('./testData/enterprise/accountingInformation/workOrderPurchaseOrder.json'),
    'utf-8',
  ),
);
const jobData = JSON.parse(
  fs.readFileSync(path.resolve('./testData/enterprise/enterpriseJobNumber.json'), 'utf-8'),
);

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
    console.log(`Created Work Order: ${workOrderNumber}`);

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
    console.log(`Created Milestone: ${milestoneNumber}`);

    // Verify milestone in grid
    await workOrderPage.verifyGridEntry(milestoneNumber);
  });
});
