import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { JobSlideboardPage } from '../../../pageObjects/enterprise/jobSlideboard/jobSlideboardPage.po.js';
import { searchJobNumber } from '../../../utils/searchJobNumber.js';
import jobData from '../../../testData/enterprise/enterpriseJobNumber.json' with { type: 'json' };

test('Action FG', async ({ authenticatedPage }) => {
  const jobSlideboardPage = new JobSlideboardPage(authenticatedPage);
  let jobNumber = jobData.jobNumber;

  // Search for the job using the robust utility
  await searchJobNumber(authenticatedPage, jobNumber);

  // verify DryTrack button
  await jobSlideboardPage.verifyDryTrack();

  // verify Drying Chart Button
  await jobSlideboardPage.verifyDryingChart();

  //verify DryTrack Report button
  await jobSlideboardPage.verifyDryTrackReport();

  //verify Equipment and Services button
  await jobSlideboardPage.verifyEquipAndService();

  //verify compose email button
  await jobSlideboardPage.verifyComposeEmail();

  //verify email link for job button
  await jobSlideboardPage.verifyEmailLinkForJob();

  //verify close job button
  await jobSlideboardPage.verifyCloseJob();

  // Assert job number is still visible on the page at the end (use specific locator to avoid strict mode)
  await expect(authenticatedPage.locator(`span:has-text("${jobNumber}")`).first()).toBeVisible();
});
