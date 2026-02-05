import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { CreateJobPage } from '../../../pageObjects/enterprise/quickNotes/CreateJobPage.po.js';
import jobData from '../../../testData/enterprise/quickNotes/createJob/jobData.json' with { type: 'json' };

test('Create a Local Job from Quick Notes', async ({ authenticatedPage }) => {
  const createJobPage = new CreateJobPage(authenticatedPage);
  const { jobDetails } = jobData;

  // 1. Navigation
  await createJobPage.openQuickNotesCreateJob();

  // 2. Create Job using the JSON object directly
  await createJobPage.createNewJob(jobDetails);

  // 3. Verification
  await expect(authenticatedPage).toHaveURL(/Job(Id|Number)/i, { timeout: 30000 });
});
