import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { searchJobNumber } from '../../../utils/searchJobNumber.js';
import { ImportEstimatePage } from '../../../pageObjects/enterprise/accountingInformation/ImportEstimatePage.po.js';
import fs from 'fs';

let jobNumber;

const jobData = JSON.parse(
  fs.readFileSync('testData/enterprise/enterpriseJobNumber.json', 'utf-8'),
);
jobNumber = jobData.jobNumber;

test('Import Estimate verification', async ({ authenticatedPage }) => {
  const importEstimatePage = new ImportEstimatePage(authenticatedPage);
  await searchJobNumber(authenticatedPage, jobNumber);
  await importEstimatePage.verifyImportEstimate();
});
