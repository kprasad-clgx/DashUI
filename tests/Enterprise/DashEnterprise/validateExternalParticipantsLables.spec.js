import { test } from '../../../fixtures/enterpriseFixtures.js';
import { JobSlideboardPage } from '../../../pageObjects/enterprise/jobSlideboard/jobSlideboardPage.po.js';
import { searchJobNumber } from '../../../utils/searchJobNumber.js';
import jobData from '../../../testData/enterprise/enterpriseJobNumber.json' with { type: 'json' };

test('Validate External Participants Labels', async ({ authenticatedPage }) => {
  const jobSlideboardPage = new JobSlideboardPage(authenticatedPage);
  let jobNumber = jobData.jobNumber;

  // Search for the job
  await searchJobNumber(authenticatedPage, jobNumber);

  await jobSlideboardPage.editJobInformation();

  await jobSlideboardPage.validateExternalParticipantLabels();
});
