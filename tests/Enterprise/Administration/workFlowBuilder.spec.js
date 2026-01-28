import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { WorkFlowBuilderPage } from '../../../pageObjects/enterprise/administrationFG/workFlowBuilder.po.js';
import { getRandomNumber } from '../../../utils/randomNumber.js';

let automatedWorkflowName = `Auto${getRandomNumber(1, 10000)}`;
let assignmentDelayDigit = `${getRandomNumber(1, 9)}`;
let mustCompleteWithinDigit = `${getRandomNumber(1, 9)}`;

test('Add New Workflow validation', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const workFlowBuilderPage = new WorkFlowBuilderPage(page);

  // Navigate to Workflow Builder page
  await workFlowBuilderPage.navigateToWorkflowBuilder();

  // Verify Apply button is visible and is button type
  const applyButton = await workFlowBuilderPage.verifyApplyButton();
  await expect(applyButton).toBeVisible();
  await expect(applyButton).toHaveAttribute('type', 'button');

  // Verify Clear button is visible and is submit type
  const clearButton = await workFlowBuilderPage.verifyClearButton();
  await expect(clearButton).toBeVisible();
  await expect(clearButton).toHaveAttribute('type', 'submit');

  // Verify Add new workflow grid button is visible
  const addNewWorkflowGridButton = await workFlowBuilderPage.verifyAddNewWorkflowGridButton();
  await expect(addNewWorkflowGridButton).toBeVisible();

  // Verify All Work Flows header is visible
  const allWorkFlowsHeader = await workFlowBuilderPage.verifyAllWorkFlowsHeader();
  await expect(allWorkFlowsHeader).toBeVisible();

  // Verify Options grid column header is visible
  const optionsGridColumnHeader = await workFlowBuilderPage.verifyOptionsGridColumnHeader();
  await expect(optionsGridColumnHeader).toBeVisible();

  // Verify Notifications grid column header is visible
  const notificationsGridColumnHeader =
    await workFlowBuilderPage.verifyNotificationsGridColumnHeader();
  await expect(notificationsGridColumnHeader).toBeVisible();

  // Verify Owner grid column header is visible
  const ownerGridColumnHeader = await workFlowBuilderPage.verifyOwnerGridColumnHeader();
  await expect(ownerGridColumnHeader).toBeVisible();

  // Verify Action Title grid column header is visible
  const actionGridColumnHeader = await workFlowBuilderPage.verifyActionGridColumnHeader();
  await expect(actionGridColumnHeader).toBeVisible();

  // Verify Job Loss Categories header is visible
  const jobLossCategoriesHeader = await workFlowBuilderPage.verifyJobLossCategoriesHeader();
  await expect(jobLossCategoriesHeader).toBeVisible();

  // Click Export to Excel button
  await workFlowBuilderPage.clickExportToExcel();

  // Verify Export modal
  const exportModal = await workFlowBuilderPage.verifyExportModal();

  // Select random export option and download
  const download = await workFlowBuilderPage.selectRandomExportOptionAndDownload(exportModal);

  // Verify downloaded file name
  await workFlowBuilderPage.verifyDownloadedFileName(download);

  // Click on add new workflow grid button
  await workFlowBuilderPage.clickOnAddNewWorkflowGridButton();

  // Verify Add Work modal
  const { addWorkModal, addWorkModalFrame } = await workFlowBuilderPage.verifyAddWorkModal();

  // Fill workflow title and description
  await workFlowBuilderPage.fillWorkflowTitleAndDescription(
    addWorkModalFrame,
    automatedWorkflowName,
  );

  // Select random action trigger
  await workFlowBuilderPage.selectRandomActionTrigger(addWorkModalFrame);

  // Select random action event
  await workFlowBuilderPage.selectRandomActionEvent(addWorkModalFrame);

  // Select random assigned to type
  await workFlowBuilderPage.selectRandomAssignedToType(addWorkModalFrame);

  // Select random assigned to
  await workFlowBuilderPage.selectRandomAssignedTo(addWorkModalFrame);

  // Fill assignment delay
  await workFlowBuilderPage.fillAssignmentDelay(addWorkModalFrame, assignmentDelayDigit);

  // Select random assignment delay unit
  await workFlowBuilderPage.selectRandomAssignmentDelayUnit(addWorkModalFrame);

  // Fill must complete within
  await workFlowBuilderPage.fillMustCompleteWithin(addWorkModalFrame, mustCompleteWithinDigit);

  // Select random must complete within unit
  await workFlowBuilderPage.selectRandomMustCompleteWithinUnit(addWorkModalFrame);

  // Select required completion action
  await workFlowBuilderPage.selectRequiredCompletionAction(addWorkModalFrame, addWorkModal);

  // Select random associated completion date
  await workFlowBuilderPage.selectRandomAssociatedCompletionDate(addWorkModalFrame, addWorkModal);

  // Select random notification type
  await workFlowBuilderPage.selectRandomNotificationType(addWorkModalFrame);

  // Select random division
  await workFlowBuilderPage.selectRandomDivision(addWorkModalFrame);

  // Select random loss type
  await workFlowBuilderPage.selectRandomLossType(addWorkModalFrame);

  // Select random job size
  await workFlowBuilderPage.selectRandomJobSize(addWorkModalFrame);

  // Select year built any
  await workFlowBuilderPage.selectYearBuiltAny(addWorkModalFrame);

  // Select random loss category
  await workFlowBuilderPage.selectRandomLossCategory(addWorkModalFrame);

  // Verify workflow buttons
  await workFlowBuilderPage.verifyWorkflowButtons(addWorkModalFrame);

  // Save workflow
  await workFlowBuilderPage.saveWorkflow(addWorkModalFrame, addWorkModal);

  // Search workflow by name
  await workFlowBuilderPage.searchWorkflowByName(automatedWorkflowName);

  // Apply contains filter
  await workFlowBuilderPage.applyContainsFilter();

  // Verify workflow exists in grid
  await workFlowBuilderPage.verifyWorkflowExistsInGrid();

  await page.waitForLoadState('networkidle');

  // Delete the created workflow to clean up
  await workFlowBuilderPage.deleteWorkflow(automatedWorkflowName);

  // Verify workflow is deleted
  await workFlowBuilderPage.verifyWorkflowDoesNotExistInGrid(automatedWorkflowName);
});
