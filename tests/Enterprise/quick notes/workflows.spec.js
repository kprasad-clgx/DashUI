import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { WorkflowPage } from '../../../pageObjects/enterprise/quickNotes/WorkflowPage.po.js';
import workflowData from '../../../testData/enterprise/workflowData.json' with { type: 'json' };
import { generateUniqueName } from '../../../utils/helpers.js';

test('Create Workflow from Quick Notes', async ({ authenticatedPage }) => {
  // Initialize page objects
  const workflowPage = new WorkflowPage(authenticatedPage);

  // Open Quick Notes menu and navigate to Create Workflows
  await workflowPage.openQuickNotesCreateWorkflow();

  // Create unique title using utility method
  const uniqueName = generateUniqueName(workflowData.actionTitle);
  const testData = { ...workflowData, actionTitle: uniqueName };

  // Create workflow using the complete workflow
  await workflowPage.createWorkflow(testData);

  // Wait for the grid to be visible using POM
  await workflowPage.waitForGridVisible(30000);

  // Verify workflow was created successfully
  const isWorkflowCreated = await workflowPage.verifyWorkflowCreated(uniqueName);

  expect(isWorkflowCreated).toBe(true);
});
