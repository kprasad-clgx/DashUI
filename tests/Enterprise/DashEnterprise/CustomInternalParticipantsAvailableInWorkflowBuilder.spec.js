import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { WorkflowPage } from '../../../pageObjects/enterprise/quickNotes/WorkflowPage.po.js';

test('Custom Internal Participants Available in Enterprise Workflow Builder', async ({
  authenticatedPage,
}) => {
  test.setTimeout(180000); // 3 minutes timeout
  const workflowPage = new WorkflowPage(authenticatedPage);

  // Navigate to Workflow Builder page
  await workflowPage.navigateTo('Administration', 'Workflow Builder');

  // Verify we are on the Workflow Builder page
  await expect(authenticatedPage).toHaveURL(/WorkFlowBuilder/i);

  // Click Add New Workflow
  await workflowPage.clickAddWorkflow();

  // 1. Select Action Trigger: "Job Document Events"
  await workflowPage.selectActionTriggerByName('Job Document Events');

  // 2. Select Action Event: "Cert. of Satisfaction"
  await workflowPage.selectActionEventByName('Cert. of Satisfaction');

  // 3. Select "Participant" for Assigned To Type
  await workflowPage.selectAssignedToTypeByName('Participant');

  // 4. Verify "Custom" participant is visible for Assigned To
  const assignedToOptions = await workflowPage.getAssignedToOptions();

  const customOptions = assignedToOptions.filter((opt) => opt.toLowerCase().includes('(custom)'));
  expect(customOptions.length).toBeGreaterThan(0);
});
