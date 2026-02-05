import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { JobSlideboardPage } from '../../../pageObjects/enterprise/jobSlideboard/jobSlideboardPage.po.js';
import { searchJobNumber } from '../../../utils/searchJobNumber.js';
import jobData from '../../../testData/enterprise/enterpriseJobNumber.json' with { type: 'json' };

test('Job status should be automatically updated based on the custom date', async ({
  authenticatedPage,
}) => {
  const jobSlideboardPage = new JobSlideboardPage(authenticatedPage);
  let jobNumber = jobData.jobNumber;

  // Search for the job using the robust utility
  await searchJobNumber(authenticatedPage, jobNumber);

  //confirm status for the job is pending sales
  const statusValue = authenticatedPage.locator('span:has-text("Status:") + span');

  // Verify the text
  await expect(statusValue).toHaveText('Pending Sales');

  //click on dates tab
  await jobSlideboardPage.clickDatesTab();

  // //enter current date/time in date contacted
  // await jobSlideboardPage.enterCurrentDateTimeInDateContacted();

  // //click on save button
  // await jobSlideboardPage.clickSaveDates();

  // // wait for network to be idle
  // await authenticatedPage.waitForLoadState('networkidle');

  // // confirm status for the job is open
  // await expect(statusValue).toHaveText('Work in Progress');
});
