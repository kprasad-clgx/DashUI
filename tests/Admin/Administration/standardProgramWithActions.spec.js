import { test } from '../../../fixtures/adminFixtures.js';
import { getRandomNumber } from '../../../utils/randomNumber.js';
import standardProgramData from '../../../testData/admin/Adminstration/standardProgram.json' with { type: 'json' };
import StandardProgramPage from '../../../pageObjects/admin/adminstration/standardProgram.po.js';
import StandardProgramWithActionsPage from '../../../pageObjects/admin/adminstration/standardProgramWithActions.po.js';

const { standardProgram } = standardProgramData;
let programName = `Program${getRandomNumber(1, 100000)}`;
let requirementName = `Requirement${getRandomNumber(1, 1000)}`;
let timeFrame = `Time${getRandomNumber(1, 9)}`;
let actionItemName = `ActionItem${getRandomNumber(1, 1000)}`;
let assignmentDelayDigit = `${getRandomNumber(1, 9)}`;
let mustCompleteWithinDigit = `${getRandomNumber(1, 9)}`;

test('Add New Standard Programs With Actions', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const standardProgramPage = new StandardProgramPage(page);
  const standardProgramWithActionsPage = new StandardProgramWithActionsPage(page);

  // Navigate to Standard Programs page
  await standardProgramPage.navigateToStandardPrograms();

  // Verify Standard Programs page is loaded
  await standardProgramPage.verifyStandardProgramsPage();

  // Click Add New Program button
  await standardProgramPage.clickAddNewProgram();

  // Verify Add New Program modal and get iframe
  const modalIframe = await standardProgramPage.verifyAddNewProgramModal();

  // Fill program details
  await standardProgramPage.fillProgramDetails(
    modalIframe,
    programName,
    getRandomNumber(1, 9),
    getRandomNumber(1, 9),
  );

  // Check allow program requirement checkbox
  await standardProgramPage.checkAllowProgramRequirement(modalIframe);

  // Select random division and category
  await standardProgramPage.selectRandomDivision(modalIframe);
  await standardProgramPage.selectRandomCategory(modalIframe);

  // Select all states
  await standardProgramPage.selectAllStates(modalIframe);

  // Save the program
  await standardProgramPage.saveProgram(modalIframe);

  // Search for the newly added program in unpublished grid
  await standardProgramPage.searchUnpublishedProgram(programName);

  // Verify the program exists in unpublished grid
  await standardProgramPage.verifyUnpublishedProgramExists();

  // Click the "View Requirements" link in the first row
  await standardProgramWithActionsPage.clickViewRequirements();

  // Click on Add New Program Requirement button
  await standardProgramWithActionsPage.clickAddNewProgramRequirement();

  // Verify Add New Program Requirement modal and get iframe
  const { addRequirementModalIframe, addNewProgramRequirementModal } =
    await standardProgramWithActionsPage.verifyAddNewProgramRequirementModal();

  // Fill requirement details
  await standardProgramWithActionsPage.fillRequirementDetails(
    addRequirementModalIframe,
    requirementName,
    timeFrame,
  );

  // Select requirement type
  await standardProgramWithActionsPage.selectRequirementType(
    addRequirementModalIframe,
    'Initial Customer Contact',
  );

  // Select requirement category
  await standardProgramWithActionsPage.selectRequirementCategory(
    addRequirementModalIframe,
    'Service Standards',
  );

  await standardProgramWithActionsPage.selectAllStatesForRequirement(addRequirementModalIframe);

  // Save the requirement
  await standardProgramWithActionsPage.saveRequirement(addRequirementModalIframe);

  // Verify requirements grid is visible
  const requirementsGrid = await standardProgramWithActionsPage.verifyRequirementsGrid();

  // Click the "View Action Items" link in the first row
  await standardProgramWithActionsPage.clickViewActionItems(requirementsGrid);

  // Click on Add New Action Item button
  await standardProgramWithActionsPage.clickAddNewActionItem();

  // Verify Add New Action Item modal and get iframe
  const { addActionItemModalIframe, addNewActionItemModal } =
    await standardProgramWithActionsPage.verifyAddNewActionItemModal();

  // Fill action item details
  await standardProgramWithActionsPage.fillActionItemDetails(
    addActionItemModalIframe,
    actionItemName,
  );

  // Select random action trigger
  await standardProgramWithActionsPage.selectRandomActionTrigger(addActionItemModalIframe);

  // Select random action event
  await standardProgramWithActionsPage.selectRandomActionEvent(addActionItemModalIframe);

  // Select random default assignee
  await standardProgramWithActionsPage.selectRandomDefaultAssignee(addActionItemModalIframe);

  // Fill assignment delay
  await standardProgramWithActionsPage.fillAssignmentDelay(
    addActionItemModalIframe,
    assignmentDelayDigit,
  );

  // Select random assignment delay unit
  await standardProgramWithActionsPage.selectRandomAssignmentDelayUnit(addActionItemModalIframe);

  // Fill must complete within
  await standardProgramWithActionsPage.fillMustCompleteWithin(
    addActionItemModalIframe,
    mustCompleteWithinDigit,
  );

  // Select random must complete within unit
  await standardProgramWithActionsPage.selectRandomMustCompleteWithinUnit(addActionItemModalIframe);

  // Select Requirement Action Item States
  await standardProgramWithActionsPage.selectMarkCompletedRequiredCompletionAction(
    addActionItemModalIframe,
  );

  // Verify action item buttons
  await standardProgramWithActionsPage.verifyActionItemButtons(addActionItemModalIframe);

  // Save the action item
  await standardProgramWithActionsPage.saveActionItem(addActionItemModalIframe);

  // Click Back to Requirements button
  await standardProgramWithActionsPage.clickBackToRequirements();

  // Click Back to Programs button
  await standardProgramWithActionsPage.clickBackToPrograms();

  // Search for the newly added program in unpublished grid
  await standardProgramPage.searchUnpublishedProgram(programName);

  // Verify the program exists in unpublished grid
  await standardProgramPage.verifyUnpublishedProgramExists();

  // Click Publish Program
  await standardProgramPage.clickPublishProgram();

  // Verify Publish Program modal and get iframe
  const publishModalIframe = await standardProgramPage.verifyPublishProgramModal();

  // Check publish program checkbox
  await standardProgramPage.checkPublishProgramCheckbox(publishModalIframe);

  // Click Invitees tab
  await standardProgramPage.clickInviteesTab(publishModalIframe);

  // Search for provider
  await standardProgramPage.searchProvider(publishModalIframe, standardProgram.providerName);

  // Select first provider
  await standardProgramPage.selectFirstProvider(publishModalIframe);

  // Publish the program
  await standardProgramPage.publishProgram(publishModalIframe);

  // Navigate to Published tab
  await standardProgramPage.navigateToPublishedTab();

  // Verify export button on published grid
  await standardProgramPage.verifyPublishedExportButton();

  // Search for the published program
  await standardProgramPage.searchPublishedProgram(programName);

  // Verify the program exists in published grid
  await standardProgramPage.verifyPublishedProgramExists();

  //
});
