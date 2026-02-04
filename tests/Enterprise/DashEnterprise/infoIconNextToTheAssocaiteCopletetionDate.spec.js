import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { WorkflowPage } from '../../../pageObjects/enterprise/quickNotes/WorkflowPage.po.js';

test('Add info icon next to the associate completion date', async ({ authenticatedPage }) => {
  const workflowPage = new WorkflowPage(authenticatedPage);

  // Navigate to Administration -> Workflow Builder
  await workflowPage.navigateTo('Administration', 'Workflow Builder');

  // Verify we're on the Workflow Builder page
  await expect(authenticatedPage).toHaveURL(/WorkFlowBuilder/i);

  // Click on add workflow button and wait for iframe
  await workflowPage.clickAddWorkflow();

  // Additional stability waits after iframe opens
  await workflowPage.frame.locator('body').waitFor({ state: 'visible' });

  // Hover over the info icon next to 'Associated Completion Date:'
  await workflowPage.associatedDateInfoIcon.waitFor({ state: 'visible' });
  await workflowPage.associatedDateInfoIcon.hover();

  // Verify the info icon has the correct tooltip text
  const expectedTooltip =
    'Custom Dates may not apply to all divisions. When editing to a custom date, please re-select the necessary divisions.';

  // verify the title attribute exists and matches the expected text
  await expect(workflowPage.associatedDateInfoIcon).toHaveAttribute('title', expectedTooltip);
});
