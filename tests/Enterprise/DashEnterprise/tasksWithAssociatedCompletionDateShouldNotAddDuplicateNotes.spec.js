import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { CreateJobPage } from '../../../pageObjects/enterprise/quickNotes/CreateJobPage.po.js';
import jobData from '../../../testData/enterprise/quickNotes/createJob/jobData.json' with { type: 'json' };
import { WorkflowPage } from '../../../pageObjects/enterprise/quickNotes/WorkflowPage.po.js';
import workflowData from '../../../testData/enterprise/workflowData.json' with { type: 'json' };
import { generateUniqueName } from '../../../utils/helpers.js';
import { JobSlideboardPage } from '../../../pageObjects/enterprise/jobSlideboard/jobSlideboardPage.po.js';

test('Tasks With Associated Completion Date should not Add Duplicate Notes', async ({
  authenticatedPage,
}) => {
  const workflowPage = new WorkflowPage(authenticatedPage);

  // Open Quick Notes menu and navigate to Create Workflows
  await workflowPage.openQuickNotesCreateWorkflow();

  // Create unique title using utility method
  const uniqueActionTitleName = generateUniqueName(workflowData.actionTitle);
  const testData = { ...workflowData, actionTitle: uniqueActionTitleName };

  // Create workflow using the complete workflow
  await workflowPage.createWorkflow(testData);

  // Wait for the grid to be visible using POM
  await workflowPage.waitForGridVisible(30000);

  // Verify workflow was created successfully
  const isWorkflowCreated = await workflowPage.verifyWorkflowCreated(uniqueActionTitleName);
  expect(isWorkflowCreated).toBe(true);

  const createJobPage = new CreateJobPage(authenticatedPage);
  const { jobDetails } = jobData;

  //  Navigation to create jobs
  await createJobPage.openCreateJob();

  //  Create Job using the JSON object directly
  await createJobPage.createNewJob(jobDetails);

  //  Verification job was created
  await expect(authenticatedPage).toHaveURL(/Job(Id|Number)/i, { timeout: 30000 });

  const jobSlideboardPage = new JobSlideboardPage(authenticatedPage);

  // Search for the action title in Compliance Tasks and complete the task
  await jobSlideboardPage.searchAndCompleteComplianceTask(uniqueActionTitleName);

  // Verify that only one note is created for the unique action item
  await jobSlideboardPage.verifyUniqueNoteCount(uniqueActionTitleName);
});
