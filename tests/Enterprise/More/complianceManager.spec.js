import { test } from '../../../fixtures/enterpriseFixtures.js';
import { ComplianceManagerPage } from '../../../pageObjects/enterprise/moreFg/complianceManager.po.js';

test('Claim Center Page in More...', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const complianceManagerPage = new ComplianceManagerPage(page);

  // Navigate to Compliance Manager
  await complianceManagerPage.navigateToComplianceManager();

  // Validate Page Title
  await complianceManagerPage.validatePageTitle();

  // Validate Labels
  await complianceManagerPage.validateLabels();

  // Validate Buttons
  await complianceManagerPage.validateButtons();

  // Define pending task labels
  const pendingTaskLabelText = ComplianceManagerPage.taskLabels.pending;

  // Validate Pending Task Labels
  await complianceManagerPage.validatePendingTaskLabels(pendingTaskLabelText);

  // Click Completed Task Radio Button
  await complianceManagerPage.clickCompletedTaskRadioButton();

  // Define completed task labels
  const completedTaskRowText = ComplianceManagerPage.taskLabels.completed;

  // Validate Completed Task Labels
  await complianceManagerPage.validateCompletedTaskLabels(completedTaskRowText);
});
