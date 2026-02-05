import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { searchJobNumber } from '../../../utils/searchJobNumber.js';
import { WorkOrderPurchaseOrderPage } from '../../../pageObjects/enterprise/accountingInformation/WorkOrderPurchaseOrderPage.po.js';
import fs from 'fs';
import path from 'path';

const workOrderData = JSON.parse(
  fs.readFileSync(
    path.resolve('./testData/enterprise/accountingInformation/workOrderPurchaseOrder.json'),
    'utf-8',
  ),
);
const jobData = JSON.parse(
  fs.readFileSync(path.resolve('./testData/enterprise/enterpriseJobNumber.json'), 'utf-8'),
);

test.describe('Work Order & Purchase Order Workflow', () => {
  let test1Passed = false;

  // TEST 1: Convert Estimate -> Scheduler -> Export
  test('Convert Estimate, Scheduler, and Invoice Export', async ({ authenticatedPage }) => {
    test.setTimeout(180000);
    const jobNumber = jobData.jobNumber;
    const workOrderPage = new WorkOrderPurchaseOrderPage(authenticatedPage);

    await test.step(`1. Search for Job: ${jobNumber}`, async () => {
      await searchJobNumber(authenticatedPage, jobNumber);
    });

    await test.step('2. Navigate to Work Order/PO Page and Verify UI', async () => {
      await workOrderPage.openWorkOrderPurchaseOrder();
      // Assert Job Summary Labels
      for (const [key, locator] of Object.entries(workOrderPage.jobSummaryLabels)) {
        await expect.soft(locator, `Job Summary '${key}' should be visible`).toBeVisible();
      }

      // Assert Toolbar Icons
      for (const [key, locator] of Object.entries(workOrderPage.toolbar)) {
        await expect.soft(locator, `Toolbar icon '${key}' should be visible`).toBeVisible();
      }
    });

    await test.step('3. Convert Estimate to Work Order', async () => {
      // Uses "workOrderDate": "12/15/2025" from JSON
      await workOrderPage.convertEstimateToWorkOrder(workOrderData.workOrder.workOrderDate);

      // Verify Notification Success (Retry logic built-in to expect)
      const notificationIcon = await workOrderPage.getNotificationStatus();
      await expect(notificationIcon).toBeVisible({ timeout: 30000 });
      await expect(notificationIcon).toHaveAttribute('title', 'Completed');
    });

    await test.step('4. Verify Scheduler Integration', async () => {
      // Open Scheduler
      const jobLabel = await workOrderPage.openSchedulerAndGetJobLabel(jobNumber);

      // Screenshot for debug
      await authenticatedPage.screenshot({ path: 'scheduler-debug.png', fullPage: true });

      // Assert Job Number exists on Scheduler
      await expect(jobLabel).toBeVisible();

      // Return
      await workOrderPage.backToWorkFromScheduler();
    });

    await test.step('5. Invoice Export Workflow', async () => {
      const download = await workOrderPage.exportInvoicesWorkflow();
      expect(download).toBeTruthy();
      // Optional cleanup
      await download.delete();
    });

    // Mark test 1 as passed
    test1Passed = true;
  });

  // TEST 2: Create Manual WO -> Add Milestone -> Delete (New Data Flow)
  test('Create Manual Work Order, Milestone, and Delete', async ({ authenticatedPage }) => {
    test.skip(!test1Passed, 'Skipping because Test 1 failed');

    const jobNumber = jobData.jobNumber;
    const workOrderPage = new WorkOrderPurchaseOrderPage(authenticatedPage);

    await searchJobNumber(authenticatedPage, jobNumber);
    await workOrderPage.openWorkOrderPurchaseOrder();

    let woNumber;

    await test.step('Create Manual Work Order', async () => {
      // Passes the specific "newWorkOrder" object from your JSON
      woNumber = await workOrderPage.createNewWorkOrder(workOrderData.newWorkOrder);

      expect(woNumber).not.toBeNull();
      console.log(`Created Work Order: ${woNumber}`);

      // Verify it exists in grid
      await workOrderPage.searchForWorkOrder(woNumber);
    });

    await test.step('Add Milestone', async () => {
      // Passes the specific "milestone" object from your JSON
      await workOrderPage.addMilestone(workOrderData.milestone);

      // Optional: Add assertions here if the milestone appears in a specific sub-grid
    });

    await test.step('Delete Work Order', async () => {
      await workOrderPage.deleteWorkOrder(woNumber);

      // Verify deletion (Search and ensure no results)
      await workOrderPage.searchBox.fill(woNumber);
      await workOrderPage.searchBox.press('Enter');
      await expect(
        authenticatedPage.locator('#ctl00_ContentPlaceHolder1_gvWorkOrder'),
      ).not.toContainText(woNumber);
    });
  });
});
