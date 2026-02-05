import { test } from '../../../fixtures/enterpriseFixtures';
import { SecurityPage } from '../../../pageObjects/enterprise/dashEnterprise/securityPage.po.js';
import { JobSlideboardPage } from '../../../pageObjects/enterprise/jobSlideboard/jobSlideboardPage.po.js';
import { searchJobNumber } from '../../../utils/searchJobNumber.js';
import jobData from '../../../testData/enterprise/enterpriseJobNumber.json' with { type: 'json' };

test('Copy Jobs  Security', async ({ authenticatedPage }) => {
  const securityPage = new SecurityPage(authenticatedPage);

  //navigate to Administration -> Employee/Security Settings
  await securityPage.navigateTo('Administration', 'Employee / Security Settings');

  await securityPage.openSecurityPage();

  await securityPage.verifyAllCopyJobsChecked();

  const jobSlideboardPage = new JobSlideboardPage(authenticatedPage);
  let jobNumber = jobData.jobNumber;

  // Search for the job
  await searchJobNumber(authenticatedPage, jobNumber);

  //perform copy job operation
  await jobSlideboardPage.performCopyJobWorkflow();
});
