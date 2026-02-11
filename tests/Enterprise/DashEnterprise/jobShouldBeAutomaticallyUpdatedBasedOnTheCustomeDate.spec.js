import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { JobSlideboardPage } from '../../../pageObjects/enterprise/jobSlideboard/jobSlideboardPage.po.js';
import { CreateJobPage } from '../../../pageObjects/enterprise/quickNotes/CreateJobPage.po.js';
import jobData from '../../../testData/enterprise/quickNotes/createJob/jobData.json' with { type: 'json' };

test('Job status should be automatically updated based on the custom start date', async ({
  authenticatedPage,
}) => {
  //Load page and data 
  const jobSlideboardPage = new JobSlideboardPage(authenticatedPage);
  const createJobPage = new CreateJobPage(authenticatedPage);
  const { jobDetails } = jobData;

  //  Navigate to quick notes
  await createJobPage.openQuickNotesCreateJob();

  //  Create Job using the JSON object directly
  await createJobPage.createNewJob(jobDetails);

  //  Verify the job is created with job number
  await expect(authenticatedPage).toHaveURL(/Job(Id|Number)/i, { timeout: 30000 });

  // Wait for the job slideboard page to fully load
  await authenticatedPage.waitForLoadState('domcontentloaded');
  await authenticatedPage.waitForLoadState('networkidle');

  //confirm status for the job is pending sales
  let statusText = await jobSlideboardPage.getJobStatus();
  expect(statusText?.trim()).toBe('Pending Sales');

  //click on dates tab
  await jobSlideboardPage.clickDatesTab();

  //enter current date/time in date contacted
  await jobSlideboardPage.enterCurrentDateTimeInDateStarted();

  //click on save button
  await jobSlideboardPage.clickSaveDates();

  // wait for network to be idle and page refresh
  await authenticatedPage.waitForLoadState('networkidle');
  await authenticatedPage.waitForTimeout(2000); // Wait for status to update after save
  await authenticatedPage.reload(); // Reload to ensure status is updated
  await authenticatedPage.waitForLoadState('domcontentloaded');
  await authenticatedPage.waitForLoadState('networkidle');

  // confirm status for the job is work in progress
  statusText = await jobSlideboardPage.getJobStatus();
  expect(statusText?.trim()).toBe('Work in Progress');
});
