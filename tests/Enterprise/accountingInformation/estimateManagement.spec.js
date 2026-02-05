import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { searchJobNumber } from '../../../utils/searchJobNumber.js';
import { AddEstimatesPage } from '../../../pageObjects/enterprise/accountingInformation/AddEstimatesPage.po.js';
import { UploadEstimatePage } from '../../../pageObjects/enterprise/accountingInformation/UploadEstimatePage.po.js';
import { EstimateTrackerPage } from '../../../pageObjects/enterprise/accountingInformation/EstimateTrackerPage.po.js';
import fs from 'fs';
import path from 'path';

// --- DATA LOADING ---
const dataPath = path.resolve('testData/enterprise/accountingInformation');

// Ensure the file exists before reading
const addEstimateFilePath = path.join(dataPath, 'addEstimate.json');
if (!fs.existsSync(addEstimateFilePath)) {
  throw new Error(`File not found: ${addEstimateFilePath}`);
}
const addEstimateData = JSON.parse(fs.readFileSync(addEstimateFilePath, 'utf-8'));
const uploadEstimateData = JSON.parse(
  fs.readFileSync(path.join(dataPath, 'uploadEstimate.json'), 'utf-8'),
);
const estimateTrackerData = JSON.parse(
  fs.readFileSync(path.join(dataPath, 'estimateTracker.json'), 'utf-8'),
);
const estimatesPdfDir = path.resolve('testData/enterprise/estimates');

test.describe('Estimate Management', () => {
  let jobNumber;
  let test1Passed = false;

  test.beforeAll(async () => {
    const jobData = JSON.parse(
      fs.readFileSync('testData/enterprise/enterpriseJobNumber.json', 'utf-8'),
    );
    jobNumber = jobData.jobNumber;
  });

  test('1. Add Estimates', async ({ authenticatedPage }) => {
    const addEstimatesPage = new AddEstimatesPage(authenticatedPage);

    // 1. Navigate to Job
    await searchJobNumber(authenticatedPage, jobNumber);

    // 2. Add Estimate (Robust PO handles Iframe & Dropdowns)
    const estimateData = addEstimateData.estimates[0];
    await addEstimatesPage.addEstimate(estimateData);

    // Mark test 1 as passed
    test1Passed = true;
  });

  test('2. Upload Estimate', async ({ authenticatedPage }) => {
    test.skip(!test1Passed, 'Skipping because Test 1 failed');

    const uploadEstimatePage = new UploadEstimatePage(authenticatedPage);

    // 1. Navigate to Job
    await searchJobNumber(authenticatedPage, jobNumber);

    // 2. Upload Files and verify
    await uploadEstimatePage.uploadEstimate({
      ...uploadEstimateData.upload,
      pdfDir: estimatesPdfDir,
    });
  });

  test('3. Estimate Tracker', async ({ authenticatedPage }) => {
    const estimateTrackerPage = new EstimateTrackerPage(authenticatedPage);

    // 1. Navigate to Job
    await searchJobNumber(authenticatedPage, jobNumber);

    // 2. Verify Data
    await estimateTrackerPage.verifyEstimateTracker(estimateTrackerData.tabs, expect);
  });
});
