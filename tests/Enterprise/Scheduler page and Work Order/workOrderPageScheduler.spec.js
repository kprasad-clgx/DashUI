import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { searchJobNumber } from '../../../utils/searchJobNumber.js';
import { WorkOrderPurchaseOrderPage } from '../../../pageObjects/enterprise/accountingInformation/WorkOrderPurchaseOrderPage.po.js';
import { SchedulerPage } from '../../../pageObjects/enterprise/scheduler/SchedulerPage.po.js';
import { AddEstimatesPage } from '../../../pageObjects/enterprise/accountingInformation/AddEstimatesPage.po.js';
import fs from 'fs';
import path from 'path';

// Reliable Data Loading
const jobData = JSON.parse(
  fs.readFileSync(path.resolve('./testData/enterprise/enterpriseJobNumber.json'), 'utf-8'),
);
const addEstimateData = JSON.parse(
  fs.readFileSync(
    path.resolve('./testData/enterprise/accountingInformation/addEstimate.json'),
    'utf-8',
  ),
);

test('Work order page scheduler export', async ({ authenticatedPage }) => {
  const workOrderPage = new WorkOrderPurchaseOrderPage(authenticatedPage);
  const schedulerPage = new SchedulerPage(authenticatedPage);
  const addEstimatesPage = new AddEstimatesPage(authenticatedPage);

  // 1. Setup Data
  const jobNumber = jobData.jobNumber;
  await searchJobNumber(authenticatedPage, jobNumber);

  // 2. Add Estimate (Pre-requisite)
  const estimateData = addEstimateData.estimates[0];
  await addEstimatesPage.addEstimate(estimateData);

  // 3. Open Scheduler
  await workOrderPage.openWorkOrderPurchaseOrder();
  await workOrderPage.openScheduler();

  // 4. Verify Toolbar Icons
  await schedulerPage.menuButton.click();
  expect(await schedulerPage.isIconChecked(schedulerPage.workOrderNumberCheckIcon)).toBe(true);
  expect(await schedulerPage.isIconChecked(schedulerPage.budgetHoursCheckIcon)).toBe(true);
  expect(await schedulerPage.isIconChecked(schedulerPage.budgetCostCheckIcon)).toBe(true);
  expect(await schedulerPage.isIconChecked(schedulerPage.assigneeCheckIcon)).toBe(true);

  // 5. Configure View
  // Adding waits to ensure dropdown changes propagate
  await schedulerPage.viewDropdown.selectOption('Today');
  await authenticatedPage.waitForLoadState('networkidle');

  await schedulerPage.sortDropdown.selectOption('ChronologicalOrder');
  await authenticatedPage.waitForLoadState('networkidle');

  await schedulerPage.filterDropdown.selectOption('ExternalWO');
  await authenticatedPage.waitForLoadState('networkidle');

  await schedulerPage.scaleDropdown.selectOption('Week');
  await authenticatedPage.waitForLoadState('networkidle');

  // 6. Export Actions
  await schedulerPage.exportScaleDropdown.selectOption('viewport');

  // PDF Export
  const pdfDownloadPromise = authenticatedPage.waitForEvent('download');
  await schedulerPage.exportPDFButton.click();
  const pdfDownload = await pdfDownloadPromise;
  expect(pdfDownload.suggestedFilename()).toContain('.pdf');

  // PNG Export
  const pngDownloadPromise = authenticatedPage.waitForEvent('download');
  await schedulerPage.exportPNGButton.click();
  const pngDownload = await pngDownloadPromise;
  expect(pngDownload.suggestedFilename()).toContain('.png');

  // 7. Share
  await schedulerPage.shareScheduler();
});
