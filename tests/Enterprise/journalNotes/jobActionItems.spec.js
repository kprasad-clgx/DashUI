import { test } from '../../../fixtures/enterpriseFixtures.js';
import { TaskPage } from '../../../pageObjects/enterprise/quickNotes/TaskPage.po.js';
import { JobActionItemsPage } from '../../../pageObjects/enterprise/journalNotes/JobActionItems.po.js';
import jobActionItemData from '../../../testData/enterprise/journalNotes/jobActionItemData.json' with { type: 'json' };

test('Create Job Action Items from Journal Notes', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const taskPage = new TaskPage(page);
  const jobActionItemsPage = new JobActionItemsPage(page);

  // Navigate to Journal Notes > Job Action Items
  await jobActionItemsPage.navigateTo('Journal Notes', 'Job Action Items');

  // Add New
  await jobActionItemsPage.clickAddNewRecord();

  // Create Data
  const uniqueDescription = jobActionItemsPage.generateUniqueDescription(
    jobActionItemData.taskDescriptionPrefix,
    'Job',
  );

  // Fill Form
  await taskPage.fillJobNumber(jobActionItemData.jobNumber);

  await taskPage.fillTaskDescription(uniqueDescription);
  await taskPage.fillDates();
  await taskPage.assignResource(jobActionItemData.resourceAssigned);

  // Save & Close
  await taskPage.saveTask();

  await page.waitForLoadState('networkidle');

  // FILTER & VERIFY
  await jobActionItemsPage.searchAndVerifyTask(uniqueDescription);
});
