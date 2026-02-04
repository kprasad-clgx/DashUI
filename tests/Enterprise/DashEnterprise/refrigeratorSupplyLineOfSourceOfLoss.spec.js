import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { CreateJobPage } from '../../../pageObjects/enterprise/quickNotes/CreateJobPage.po.js';

test('Refrigerator Supply Line of Source of Loss is spelled correctly', async ({
  authenticatedPage,
}) => {
  // Initialize page objects
  const createJobPage = new CreateJobPage(authenticatedPage);

  // Navigate to create job page
  await createJobPage.openCreateJob();

  // Verify that "Refrigerator Supply Line" option exists in Source Of Loss dropdown
  const optionExists = await createJobPage.verifySourceOfLossOption('Refrigerator Supply Line');
  expect(optionExists).toBe(true);
});
