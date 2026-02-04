import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { CreateJobPage } from '../../../pageObjects/enterprise/quickNotes/CreateJobPage.po.js';
import jobData from '../../../testData/enterprise/quickNotes/createJob/jobData.json' with { type: 'json' };

test('Automate Navigate to Home after job deletion', async ({ authenticatedPage }) => {
  // Initialize page objects
  const createJobPage = new CreateJobPage(authenticatedPage);

  // Extract test data
  const { jobDetails } = jobData;

  // Fill out job creation form
  await createJobPage.openCreateJob();
  await createJobPage.createNewJob(jobDetails);

  // Wait for navigation to complete after save
  await authenticatedPage.waitForLoadState('networkidle');

  // Wait for URL change to job slideboard
  await expect(authenticatedPage).toHaveURL(/Job(Id|Number)/i, { timeout: 30000 });

  //click on delete job
  await createJobPage.deleteJob();

  //assert it lands on home page
  await expect(authenticatedPage).toHaveURL(/uPostLogin/i, { timeout: 30000 });
});
