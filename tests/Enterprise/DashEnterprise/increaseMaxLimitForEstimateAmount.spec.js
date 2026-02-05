import { test } from '../../../fixtures/enterpriseFixtures.js';
import { searchJobNumber } from '../../../utils/searchJobNumber.js';
import jobData from '../../../testData/enterprise/enterpriseJobNumber.json' with { type: 'json' };
import addEstimateData from '../../../testData/enterprise/accountingInformation/addEstimate.json' with { type: 'json' };
import { AddEstimatesPage } from '../../../pageObjects/enterprise/accountingInformation/AddEstimatesPage.po.js';

test('Increase Max limit for estimate amounts', async ({ authenticatedPage }) => {
  const addEstimatesPage = new AddEstimatesPage(authenticatedPage);
  let jobNumber = jobData.jobNumber;

  await searchJobNumber(authenticatedPage, jobNumber);
  const estimateData = addEstimateData.estimates[2];
  await addEstimatesPage.addEstimate(estimateData);
});
