import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { JobSlideboardPage } from '../../../pageObjects/enterprise/jobSlideboard/jobSlideboardPage.po.js';
import { TaskPage } from '../../../pageObjects/enterprise/quickNotes/TaskPage.po.js';
import { searchJobNumber } from '../../../utils/searchJobNumber.js';
import jobData from '../../../testData/enterprise/enterpriseJobNumber.json' with { type: 'json' };

test('Add Start Date Column to Job Task Grid', async ({ authenticatedPage }) => {
  const jobSlideboardPage = new JobSlideboardPage(authenticatedPage);
  let jobNumber = jobData.jobNumber;

  // Search for the job using the robust utility
  await searchJobNumber(authenticatedPage, jobNumber);

  // Wait for job slideboard page to load
  await authenticatedPage.waitForLoadState('networkidle');

  // Create JobSlideboardPage instance and click Job Tasks tab
  await jobSlideboardPage.clickJobTasksTab();

  // Generate timestamp in hhmmss format
  const now = new Date();
  const timestamp =
    now.getHours().toString().padStart(2, '0') +
    now.getMinutes().toString().padStart(2, '0') +
    now.getSeconds().toString().padStart(2, '0');

  // Click the Add New button to open create task modal
  await jobSlideboardPage.clickAddNewTask();

  // Wait for modal to appear
  await authenticatedPage.locator('.modal-content').waitFor({ state: 'visible', timeout: 10000 });

  // Create a task using TaskPage
  const taskPage = new TaskPage(authenticatedPage);
  await taskPage.fillTaskDescription(`Test Task ${timestamp}`);
  await taskPage.fillDates(7);
  await taskPage.assignResource('admin admin');

  // Wait for the Save button to be enabled before saving
  await expect(authenticatedPage.locator('button:has-text("Save")')).toBeEnabled({
    timeout: 10000,
  });
  await taskPage.saveTask();

  // Now search for the task using the timestamp in the Action filter
  await jobSlideboardPage.filterTasksByAction(timestamp);

  await authenticatedPage.waitForLoadState('networkidle');

  // Wait for the task description link to be visible after filtering
  await jobSlideboardPage.taskDescriptionLink.waitFor({ state: 'visible', timeout: 10000 });

  // Wait for the start date column to be visible instead of using a fixed timeout
  await jobSlideboardPage.startDateColumn.waitFor({ state: 'visible', timeout: 10000 });

  // Wait for the task description to contain the timestamp using expect.poll
  await expect
    .poll(async () => await jobSlideboardPage.getTaskDescriptionText(), {
      timeout: 10000,
      intervals: [1500, 1500, 1500, 1500, 1500],
    })
    .toContain(timestamp);

  // Assert that the start date column has a date
  const startDateText = await jobSlideboardPage.getStartDateText();
  expect(startDateText).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/); // Expect date format MM/DD/YYYY
});
