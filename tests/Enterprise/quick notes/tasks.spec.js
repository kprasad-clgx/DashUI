import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { TaskPage } from '../../../pageObjects/enterprise/quickNotes/TaskPage.po.js';
import { generateUniqueName } from '../../../utils/helpers.js';
import taskData from '../../../testData/enterprise/createTaskData/taskData.json' with { type: 'json' };

test('Create Task from Quick Notes', async ({ authenticatedPage }) => {
  const taskPage = new TaskPage(authenticatedPage);

  // Navigate to Quick Notes Create Task
  await taskPage.openQuickNotesCreateTask();

  // Open Create Task modal
  await taskPage.openCreateTaskModal();

  // Generate unique task description
  const uniqueTaskDescription = generateUniqueName(taskData.taskDescriptionPrefix);

  // Assign resource (must be done first for job context to load)
  await taskPage.assignResource(taskData.resourceAssigned);

  // Fill job number (select first available job)
  await taskPage.fillJobNumber();

  // Fill task description with unique ID
  await taskPage.fillTaskDescription(uniqueTaskDescription);

  // Fill dates (7 days from today, 2:00 PM - 4:00 PM)
  const dateInfo = await taskPage.fillDates(taskData.daysFromToday);

  // Save the task
  await taskPage.saveTask();

  // Verify task appears on calendar
  const taskCreated = await taskPage.verifyTaskOnCalendar(uniqueTaskDescription, dateInfo);

  // Assert the unique task description
  await expect(taskCreated).toHaveText(uniqueTaskDescription);
});
