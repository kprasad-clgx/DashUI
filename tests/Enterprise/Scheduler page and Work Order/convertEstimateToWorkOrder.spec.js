import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { searchJobNumber } from '../../../utils/searchJobNumber.js';
import { WorkOrderPurchaseOrderPage } from '../../../pageObjects/enterprise/accountingInformation/WorkOrderPurchaseOrderPage.po.js';
import { AddEstimatesPage } from '../../../pageObjects/enterprise/accountingInformation/AddEstimatesPage.po.js';
import fs from 'fs';
import path from 'path';

// Load Data using fs
const workOrderDataPath = path.resolve(
  './testData/enterprise/accountingInformation/workOrderPurchaseOrder.json',
);
if (!fs.existsSync(workOrderDataPath)) {
  throw new Error('workOrderPurchaseOrder.json file not found at ' + workOrderDataPath);
}
const workOrderData = JSON.parse(fs.readFileSync(workOrderDataPath, 'utf-8'));

const jobDataPath = path.resolve('./testData/enterprise/enterpriseJobNumber.json');
if (!fs.existsSync(jobDataPath)) {
  throw new Error('enterpriseJobNumber.json file not found at ' + jobDataPath);
}
const jobData = JSON.parse(fs.readFileSync(jobDataPath, 'utf-8'));

const addEstimateDataPath = path.resolve(
  './testData/enterprise/accountingInformation/addEstimate.json',
);
if (!fs.existsSync(addEstimateDataPath)) {
  throw new Error('addEstimate.json file not found at ' + addEstimateDataPath);
}
const addEstimateData = JSON.parse(fs.readFileSync(addEstimateDataPath, 'utf-8'));

test('Convert Estimate To WorkOrder', async ({ authenticatedPage }) => {
  const workOrderPage = new WorkOrderPurchaseOrderPage(authenticatedPage);
  const addEstimatesPage = new AddEstimatesPage(authenticatedPage);

  // Fetch job number from test data
  const jobNumber = jobData.jobNumber;
  await searchJobNumber(authenticatedPage, jobNumber);

  // Add estimate using AddEstimatesPage and test data
  const estimateData = addEstimateData.estimates[0];
  await addEstimatesPage.addEstimate(estimateData);

  // Open WorkOrderPurchaseOrder tab
  await workOrderPage.openWorkOrderPurchaseOrder();

  // Click convert estimate to work order button (open modal)
  await workOrderPage.clickConvertEstimateToWorkOrder();

  // Select estimate from dropdown
  await workOrderPage.selectEstimateFromDropdown();

  // Fill work order date from test data
  const workOrderDate = workOrderData.workOrder?.workOrderDate;
  await workOrderPage.fillWorkOrderDate(workOrderDate);

  // Click generate work order
  await workOrderPage.clickGenerateWorkOrder();

  // Verify notification completed
  await workOrderPage.verifyNotificationCompleted(expect);
});
