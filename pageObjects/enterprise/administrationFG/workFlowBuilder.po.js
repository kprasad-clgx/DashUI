import { expect } from '@playwright/test';

/**
 * @typedef {Object} WorkFlowBuilderLocatorsType
 * @property {string} administrationMenu
 * @property {string} menuContainer
 * @property {string} workflowBuilderMenuOption
 * @property {string} applyButton
 * @property {string} clearButton
 * @property {string} addNewWorkflowGridButton
 * @property {string} allWorkFlowsHeader
 * @property {string} optionsGridColumnHeader
 * @property {string} notificationsGridColumnHeader
 * @property {string} ownerGridColumnHeader
 * @property {string} actionGridColumnHeader
 * @property {string} jobLossCategoriesHeader
 * @property {string} exportToExcelButton
 * @property {string} exportModal
 * @property {string} exportModalHeader
 * @property {string} exportButton
 * @property {string} addWorkModal
 * @property {string} addNewWorkflowTitle
 * @property {string} addWorkModalIframe
 * @property {string} actionTitleInput
 * @property {string} actionDescriptionInput
 * @property {string} actionTriggerDropdown
 * @property {string} actionEventDropdown
 * @property {string} assignedToTypeDropdown
 * @property {string} assignedToDropdown
 * @property {string} assignmentDelayInput
 * @property {string} assignmentDelayUnitDropdown
 * @property {string} mustCompleteWithinInput
 * @property {string} mustCompleteWithinUnitDropdown
 * @property {string} requiredCompleteActionDropdown
 * @property {string} associatedCompletionDateDropdown
 * @property {string} notificationCheckboxes
 * @property {string} divisionCheckboxes
 * @property {string} lossTypeCheckboxes
 * @property {string} jobSizeCheckboxes
 * @property {string} yearBuiltCheckboxes
 * @property {string} lossCategoryCheckboxes
 * @property {string} saveButton
 * @property {string} saveAndAddNotificationButton
 * @property {string} cancelButton
 * @property {string} actionTitleGridSearchInput
 * @property {string} actionTitleGridSearchButton
 * @property {string} filterDropdownModal
 * @property {string} gridRows
 */

/** @type {WorkFlowBuilderLocatorsType} */
const WorkFlowBuilderLocators = {
  administrationMenu: "span:has-text('Administration')",
  menuContainer: 'div.rmSlide[style*="display: block"]',
  workflowBuilderMenuOption: 'ul.rmVertical.rmGroup.rmLevel1 li.rmItem a.rmLink span.rmText',
  applyButton: '#ctl00_ContentPlaceHolder1_Button_ApplyFilter',
  clearButton: '#ctl00_ContentPlaceHolder1_Button_ClearFilter',
  addNewWorkflowGridButton:
    '#ctl00_ContentPlaceHolder1_GridView_WorkFlowBuilder_ctl00_ctl02_ctl00_AddWorkFlow',
  allWorkFlowsHeader: '#ctl00_ContentPlaceHolder1_RadTreeView_WorkFlows .rtIn',
  optionsGridColumnHeader:
    '#ctl00_ContentPlaceHolder1_GridView_WorkFlowBuilder_GridHeader th.rgHeader',
  notificationsGridColumnHeader:
    '#ctl00_ContentPlaceHolder1_GridView_WorkFlowBuilder_GridHeader th.rgHeader',
  ownerGridColumnHeader:
    '#ctl00_ContentPlaceHolder1_GridView_WorkFlowBuilder_GridHeader th.rgHeader',
  actionGridColumnHeader:
    '#ctl00_ContentPlaceHolder1_GridView_WorkFlowBuilder_GridHeader th.rgHeader',
  jobLossCategoriesHeader: '#ctl00_ContentPlaceHolder1_RadTreeView_WorkFlows .rtIn',
  exportToExcelButton:
    '#ctl00_ContentPlaceHolder1_GridView_WorkFlowBuilder_ctl00_ctl02_ctl00_excelExport',
  exportModal: '#RadWindowWrapper_ctl00_ContentPlaceHolder1_RadWindow_ContentTemplate',
  exportModalHeader: 'em[unselectable="on"]',
  exportButton: '#ctl00_ContentPlaceHolder1_RadWindow_ContentTemplate_C_ButtonExportData',
  addWorkModal: '#RadWindowWrapper_ctl00_ContentPlaceHolder1_RadWindow_CommonWindow',
  addNewWorkflowTitle: 'em[unselectable="on"]',
  addWorkModalIframe: 'iframe[name="RadWindow_CommonWindow"]',
  actionTitleInput: '#TextBox_Title',
  actionDescriptionInput: '#TextBox_Description',
  actionTriggerDropdown: '#DropDown_ActionTriggers_Arrow',
  actionEventDropdown: '#DropDown_ActionEvents_Arrow',
  assignedToTypeDropdown: '#DropDown_AssignedToType_Arrow',
  assignedToDropdown: '#DropDown_AssignedTo_Arrow',
  assignmentDelayInput: '#TextBox_AssignmentDelay',
  assignmentDelayUnitDropdown: '#DropDown_AssignmentDelay_Arrow',
  mustCompleteWithinInput: '#TextBox_CompleteWithin',
  mustCompleteWithinUnitDropdown: '#DropDown_CompleteWithin_Arrow',
  requiredCompleteActionDropdown: '#DropDown_RequiredCompletionAction_Arrow',
  associatedCompletionDateDropdown: '#DropDown_AssociatedCompletionDate_Arrow',
  notificationCheckboxes: '#ListBox_NotificationTypes .rlbList .rlbItem input[type="checkbox"]',
  divisionCheckboxes: '#ListBox_Divisions .rlbList .rlbItem input[type="checkbox"]',
  lossTypeCheckboxes: '#ListBox_LossTypes .rlbList .rlbItem input[type="checkbox"]',
  jobSizeCheckboxes: '#RadListBox_JobSize .rlbList .rlbItem input[type="checkbox"]',
  yearBuiltCheckboxes: '#RadListBox_YearBuilt .rlbList .rlbItem input[type="checkbox"]',
  lossCategoryCheckboxes: '#ListBox_LossCategories .rlbList .rlbItem input[type="checkbox"]',
  saveButton: '#Button_Save',
  saveAndAddNotificationButton: '#Button_SaveAndAddNotification',
  cancelButton: '#Button_Cancel',
  actionTitleGridSearchInput:
    '#ctl00_ContentPlaceHolder1_GridView_WorkFlowBuilder_ctl00_ctl02_ctl03_FilterTextBox_ActionTitle',
  actionTitleGridSearchButton:
    '#ctl00_ContentPlaceHolder1_GridView_WorkFlowBuilder_ctl00_ctl02_ctl03_Filter_ActionTitle',
  filterDropdownModal: '#ctl00_ContentPlaceHolder1_GridView_WorkFlowBuilder_rfltMenu_detached',
  gridRows: '#ctl00_ContentPlaceHolder1_GridView_WorkFlowBuilder_ctl00 > tbody > tr',
};

class WorkFlowBuilderPage {
  constructor(page) {
    this.page = page;
  }

  // Navigate to Workflow Builder page through Administration menu
  async navigateToWorkflowBuilder() {
    await this.page.locator(WorkFlowBuilderLocators.administrationMenu).first().hover();
    await this.page
      .locator(WorkFlowBuilderLocators.menuContainer)
      .waitFor({ state: 'visible', timeout: 5000 });
    await this.page
      .locator(WorkFlowBuilderLocators.workflowBuilderMenuOption, {
        hasText: /^Workflow Builder$/,
      })
      .first()
      .waitFor({ state: 'visible', timeout: 10000 });
    await this.page
      .locator(WorkFlowBuilderLocators.workflowBuilderMenuOption, {
        hasText: /^Workflow Builder$/,
      })
      .first()
      .click();
    await this.page.waitForLoadState('networkidle');
  }

  // Verify Apply button is visible and is button type
  async verifyApplyButton() {
    const button = this.page.locator(WorkFlowBuilderLocators.applyButton);
    await button.waitFor({ state: 'visible' });
    return button;
  }

  // Verify Clear button is visible and is submit type
  async verifyClearButton() {
    const button = this.page.locator(WorkFlowBuilderLocators.clearButton);
    await button.waitFor({ state: 'visible' });
    return button;
  }

  // Verify Add new workflow grid button is visible
  async verifyAddNewWorkflowGridButton() {
    const button = this.page.locator(WorkFlowBuilderLocators.addNewWorkflowGridButton);
    await button.waitFor({ state: 'visible' });
    return button;
  }

  // Verify All Work Flows header is visible
  async verifyAllWorkFlowsHeader() {
    const header = this.page.locator(WorkFlowBuilderLocators.allWorkFlowsHeader, {
      hasText: /^All Work Flows$/,
    });
    await header.waitFor({ state: 'visible' });
    return header;
  }

  // Verify Options grid column header is visible
  async verifyOptionsGridColumnHeader() {
    const header = this.page.locator(WorkFlowBuilderLocators.optionsGridColumnHeader, {
      hasText: /^Options$/,
    });
    await header.waitFor({ state: 'visible' });
    return header;
  }

  // Verify Notifications grid column header is visible
  async verifyNotificationsGridColumnHeader() {
    const header = this.page.locator(WorkFlowBuilderLocators.notificationsGridColumnHeader, {
      hasText: /^Notifications$/,
    });
    await header.waitFor({ state: 'visible' });
    return header;
  }

  // Verify Owner grid column header is visible
  async verifyOwnerGridColumnHeader() {
    const header = this.page.locator(WorkFlowBuilderLocators.ownerGridColumnHeader, {
      hasText: /^Owner$/,
    });
    await header.waitFor({ state: 'visible' });
    return header;
  }

  // Verify Action Title grid column header is visible
  async verifyActionGridColumnHeader() {
    const header = this.page.locator(WorkFlowBuilderLocators.actionGridColumnHeader, {
      hasText: /^Action Title$/,
    });
    await header.waitFor({ state: 'visible' });
    return header;
  }

  // Verify Job Loss Categories header is visible
  async verifyJobLossCategoriesHeader() {
    const header = this.page.locator(WorkFlowBuilderLocators.jobLossCategoriesHeader, {
      hasText: /^Job Loss Categories$/,
    });
    await header.waitFor({ state: 'visible' });
    return header;
  }

  // click on add new workflow grid button
  async clickOnAddNewWorkflowGridButton() {
    const button = this.page.locator(WorkFlowBuilderLocators.addNewWorkflowGridButton);
    await button.waitFor({ state: 'visible' });
    await button.click();
  }

  // Click Export to Excel button and verify modal
  async clickExportToExcel() {
    await this.page.waitForLoadState('networkidle');
    const exportToExcelButton = this.page.locator(WorkFlowBuilderLocators.exportToExcelButton);
    await expect(exportToExcelButton).toBeVisible();
    await exportToExcelButton.click();
  }

  // Verify Export modal and return it
  async verifyExportModal() {
    const exportModal = this.page.locator(WorkFlowBuilderLocators.exportModal);
    await expect(exportModal).toBeVisible({ timeout: 5000 });

    const exportModalHeader = exportModal.locator(WorkFlowBuilderLocators.exportModalHeader, {
      hasText: 'Export Data',
    });
    await expect(exportModalHeader).toBeVisible();
    await expect(exportModalHeader).toHaveText('Export Data');

    return exportModal;
  }

  // Select random export option and download
  async selectRandomExportOptionAndDownload(exportModal) {
    const exportOptions = ['Export Summary data', 'Export with Program Details'];
    const randomOptionText = exportOptions[Math.floor(Math.random() * exportOptions.length)];

    const exportOptionLabel = exportModal.locator(`label:text-is("${randomOptionText}")`);
    await expect(exportOptionLabel).toBeVisible();
    await exportOptionLabel.click();

    const exportButton = exportModal.locator(WorkFlowBuilderLocators.exportButton);
    await expect(exportButton).toBeVisible();

    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      exportButton.click(),
    ]);

    await expect(exportModal).toBeHidden({ timeout: 10000 });
    await this.page.waitForLoadState('networkidle');

    return download;
  }

  // Verify downloaded file name
  async verifyDownloadedFileName(download) {
    const suggestedFilename = await download.suggestedFilename();
    expect(suggestedFilename).toMatch(/^WorkFlowDetails-\d{2}-\d{2}-\d{2}( \(\d+\))?\.xlsx?$/);
    await this.page.waitForLoadState('networkidle');
  }

  // Verify Add Work modal
  async verifyAddWorkModal() {
    const addWorkModal = this.page.locator(WorkFlowBuilderLocators.addWorkModal);
    await expect(addWorkModal).toBeVisible({ timeout: 5000 });

    const addNewWorkflowTitle = addWorkModal.locator(WorkFlowBuilderLocators.addNewWorkflowTitle, {
      hasText: 'Add New Workflow',
    });
    await expect(addNewWorkflowTitle).toBeVisible();
    await expect(addNewWorkflowTitle).toHaveText('Add New Workflow');

    const addWorkModalFrame = this.page.frameLocator(WorkFlowBuilderLocators.addWorkModalIframe);
    await expect(addWorkModalFrame.locator('body')).toBeVisible({ timeout: 10000 });

    return { addWorkModal, addWorkModalFrame };
  }

  // Fill workflow title and description
  async fillWorkflowTitleAndDescription(addWorkModalFrame, workflowName) {
    const actionTitleInput = addWorkModalFrame.locator(WorkFlowBuilderLocators.actionTitleInput);
    await expect(actionTitleInput).toBeVisible();
    await actionTitleInput.click();
    await actionTitleInput.fill(workflowName);

    const actionDescriptionInput = addWorkModalFrame.locator(
      WorkFlowBuilderLocators.actionDescriptionInput,
    );
    await expect(actionDescriptionInput).toBeVisible();
    await actionDescriptionInput.click();
    await actionDescriptionInput.fill(`Desc_${workflowName}`);
  }

  // Select random action trigger
  async selectRandomActionTrigger(addWorkModalFrame) {
    const actionTriggerDropdown = addWorkModalFrame.locator(
      WorkFlowBuilderLocators.actionTriggerDropdown,
    );
    await expect(actionTriggerDropdown).toBeVisible({ timeout: 5000 });
    await actionTriggerDropdown.click();

    const actionTriggerOptions = addWorkModalFrame.locator('.rcbList .rcbItem');
    const jobDateEventsOption = actionTriggerOptions.filter({ hasText: 'Job Date Events' });
    const count = await jobDateEventsOption.count();
    if (count === 0) throw new Error('Job Date Events option not found in Action Trigger dropdown');
    await expect(jobDateEventsOption.first()).toBeVisible();
    await jobDateEventsOption.first().click();
  }

  // Select random action event
  async selectRandomActionEvent(addWorkModalFrame) {
    const actionEventDropdown = addWorkModalFrame.locator(
      WorkFlowBuilderLocators.actionEventDropdown,
    );
    await expect(actionEventDropdown).toBeVisible({ timeout: 10000 });
    await actionEventDropdown.click();

    const actionEventOptions = addWorkModalFrame.locator('.rcbList .rcbItem');
    const dateReceivedOption = actionEventOptions.filter({ hasText: 'Date Received' });
    const count = await dateReceivedOption.count();
    if (count === 0) throw new Error('Date Received option not found in Action Event dropdown');
    await expect(dateReceivedOption.first()).toBeVisible();
    await dateReceivedOption.first().click();
  }

  // Select random assigned to type
  async selectRandomAssignedToType(addWorkModalFrame) {
    const assignedToTypeDropdown = addWorkModalFrame.locator(
      WorkFlowBuilderLocators.assignedToTypeDropdown,
    );
    await expect(assignedToTypeDropdown).toBeVisible({ timeout: 10000 });
    await assignedToTypeDropdown.click();

    const assignedToTypeOptions = addWorkModalFrame.locator('.rcbList .rcbItem');
    const currentUserOption = assignedToTypeOptions.filter({ hasText: 'Employee' });
    const count = await currentUserOption.count();
    if (count === 0) throw new Error('Current User option not found in Default Assignee dropdown');
    await expect(currentUserOption.first()).toBeVisible();
    await currentUserOption.first().click();
  }

  // Select random assigned to
  async selectRandomAssignedTo(addWorkModalFrame) {
    const assignedToDropdown = addWorkModalFrame.locator(
      WorkFlowBuilderLocators.assignedToDropdown,
    );
    await expect(assignedToDropdown).toBeVisible({ timeout: 10000 });
    await assignedToDropdown.click();

    const assignedToOptions = addWorkModalFrame.locator('.rcbList .rcbItem');
    const currentUserOption = assignedToOptions.filter({ hasText: 'admin, admin ' });
    const count = await currentUserOption.count();
    if (count === 0) throw new Error('Current User option not found in Default Assignee dropdown');
    await expect(currentUserOption.first()).toBeVisible();
    await currentUserOption.first().click();
  }

  // Fill assignment delay
  async fillAssignmentDelay(addWorkModalFrame, assignmentDelayDigit) {
    const assignmentDelayInput = addWorkModalFrame.locator(
      WorkFlowBuilderLocators.assignmentDelayInput,
    );
    await expect(assignmentDelayInput).toBeVisible({ timeout: 5000 });
    await assignmentDelayInput.click();
    await assignmentDelayInput.fill(assignmentDelayDigit);
  }

  // Select random assignment delay unit
  async selectRandomAssignmentDelayUnit(addWorkModalFrame) {
    const assignmentDelayUnitDropdown = addWorkModalFrame.locator(
      WorkFlowBuilderLocators.assignmentDelayUnitDropdown,
    );
    await expect(assignmentDelayUnitDropdown).toBeVisible({ timeout: 5000 });
    await assignmentDelayUnitDropdown.click();

    const assignmentDelayUnitOptions = addWorkModalFrame.locator('.rcbList .rcbItem');
    // Always select the second option (index 1)
    const secondOption = assignmentDelayUnitOptions.nth(1);
    await expect(secondOption).toBeVisible();
    await secondOption.click();
  }

  // Fill must complete within
  async fillMustCompleteWithin(addWorkModalFrame, mustCompleteWithinDigit) {
    const mustCompleteWithinInput = addWorkModalFrame.locator(
      WorkFlowBuilderLocators.mustCompleteWithinInput,
    );
    await expect(mustCompleteWithinInput).toBeVisible({ timeout: 5000 });
    await mustCompleteWithinInput.click();
    await mustCompleteWithinInput.fill(mustCompleteWithinDigit);
  }

  // Select random must complete within unit
  async selectRandomMustCompleteWithinUnit(addWorkModalFrame) {
    const mustCompleteWithinUnitDropdown = addWorkModalFrame.locator(
      WorkFlowBuilderLocators.mustCompleteWithinUnitDropdown,
    );
    await expect(mustCompleteWithinUnitDropdown).toBeVisible({ timeout: 5000 });
    await mustCompleteWithinUnitDropdown.click();

    const mustCompleteWithinUnitOptions = addWorkModalFrame.locator('.rcbList .rcbItem');
    // Always select the second option (index 1)
    const secondOption = mustCompleteWithinUnitOptions.nth(1);
    await expect(secondOption).toBeVisible();
    await secondOption.click();
  }

  // Select required completion action
  async selectRequiredCompletionAction(addWorkModalFrame) {
    const requiredCompleteActionDropdown = addWorkModalFrame.locator(
      WorkFlowBuilderLocators.requiredCompleteActionDropdown,
    );
    await expect(requiredCompleteActionDropdown).toBeVisible({ timeout: 5000 });
    await requiredCompleteActionDropdown.click();

    // Search for the option inside the frame, not the modal
    const markCompletedOption = addWorkModalFrame
      .locator('.rcbList .rcbItem', {
        hasText: 'Mark Completed',
      })
      .first();
    await expect(markCompletedOption).toBeVisible({ timeout: 5000 });
    await markCompletedOption.click();
  }

  // Select random associated completion date
  async selectRandomAssociatedCompletionDate(addWorkModalFrame) {
    const associatedCompletionDateDropdown = addWorkModalFrame.locator(
      WorkFlowBuilderLocators.associatedCompletionDateDropdown,
    );
    await expect(associatedCompletionDateDropdown).toBeVisible({ timeout: 5000 });
    await associatedCompletionDateDropdown.click();

    const associatedCompletionDateOptions = addWorkModalFrame.locator('.rcbList .rcbItem');
    const secondOption = associatedCompletionDateOptions.nth(1);
    await expect(secondOption).toBeVisible();
    await secondOption.click();
  }

  // Select random notification type
  async selectRandomNotificationType(addWorkModalFrame) {
    const notificationCheckboxes = addWorkModalFrame.locator(
      WorkFlowBuilderLocators.notificationCheckboxes,
    );
    const notificationCount = await notificationCheckboxes.count();
    const randomNotificationIndex = Math.floor(Math.random() * notificationCount);
    await notificationCheckboxes.nth(randomNotificationIndex).check();
  }

  // Select random division
  async selectRandomDivision(addWorkModalFrame) {
    const divisionCheckboxes = addWorkModalFrame.locator(
      WorkFlowBuilderLocators.divisionCheckboxes,
    );
    const divisionCount = await divisionCheckboxes.count();
    const randomDivisionIndex = Math.floor(Math.random() * divisionCount);
    await divisionCheckboxes.nth(randomDivisionIndex).check();
  }

  // Select random loss type
  async selectRandomLossType(addWorkModalFrame) {
    const lossTypeCheckboxes = addWorkModalFrame.locator(
      WorkFlowBuilderLocators.lossTypeCheckboxes,
    );
    const lossTypeCount = await lossTypeCheckboxes.count();
    const randomLossTypeIndex = Math.floor(Math.random() * lossTypeCount);
    await lossTypeCheckboxes.nth(randomLossTypeIndex).check();
  }

  // Select random job size
  async selectRandomJobSize(addWorkModalFrame) {
    const jobSizeCheckboxes = addWorkModalFrame.locator(WorkFlowBuilderLocators.jobSizeCheckboxes);
    // Always select the second checkbox (index 1)
    const secondCheckbox = jobSizeCheckboxes.nth(1);
    await secondCheckbox.check();
  }

  // Select year built any
  async selectYearBuiltAny(addWorkModalFrame) {
    const yearBuiltAnyCheckbox = addWorkModalFrame
      .locator(WorkFlowBuilderLocators.yearBuiltCheckboxes)
      .first();
    await yearBuiltAnyCheckbox.check();
  }

  // Select random loss category
  async selectRandomLossCategory(addWorkModalFrame) {
    const allOption = addWorkModalFrame
      .locator('#ListBox_LossCategories .rlbList .rlbItem')
      .filter({ hasText: '--- ALL ---' })
      .locator('input[type="checkbox"]');
    await allOption.check();
  }

  // Verify workflow buttons
  async verifyWorkflowButtons(addWorkModalFrame) {
    const saveButton = addWorkModalFrame.locator(WorkFlowBuilderLocators.saveButton);
    const saveAndAddNotificationButton = addWorkModalFrame.locator(
      WorkFlowBuilderLocators.saveAndAddNotificationButton,
    );
    const cancelButton = addWorkModalFrame.locator(WorkFlowBuilderLocators.cancelButton);

    await expect(saveButton).toBeVisible();
    await expect(saveAndAddNotificationButton).toBeVisible();
    await expect(cancelButton).toBeVisible();
  }

  // Save workflow
  async saveWorkflow(addWorkModalFrame, addWorkModal) {
    const saveButton = addWorkModalFrame.locator(WorkFlowBuilderLocators.saveButton);
    await saveButton.click();
    await expect(addWorkModal).toBeHidden({ timeout: 10000 });
    await this.page.waitForLoadState('networkidle');
  }

  // Search workflow by name
  async searchWorkflowByName(workflowName) {
    const addNewWorkflowGridButton = this.page.locator(
      WorkFlowBuilderLocators.addNewWorkflowGridButton,
    );
    await expect(addNewWorkflowGridButton).toBeVisible({ timeout: 10000 });

    const actionTitleGridSearchInput = this.page.locator(
      WorkFlowBuilderLocators.actionTitleGridSearchInput,
    );
    await expect(actionTitleGridSearchInput).toBeVisible({ timeout: 5000 });
    await actionTitleGridSearchInput.click();
    await actionTitleGridSearchInput.fill(workflowName);

    const actionTitleGridSearchButton = this.page.locator(
      WorkFlowBuilderLocators.actionTitleGridSearchButton,
    );
    await expect(actionTitleGridSearchButton).toBeVisible({ timeout: 5000 });
    await actionTitleGridSearchButton.click();
  }

  // Apply contains filter
  async applyContainsFilter() {
    const filterDropdownModal = this.page.locator(WorkFlowBuilderLocators.filterDropdownModal);
    await expect(filterDropdownModal).toBeVisible({ timeout: 5000 });

    const containsOption = filterDropdownModal.locator('.rmText', {
      hasText: 'Contains',
    });
    await expect(containsOption).toBeVisible({ timeout: 5000 });
    await containsOption.click();
    await this.page.waitForLoadState('networkidle');
  }

  // Verify workflow exists in grid
  async verifyWorkflowExistsInGrid() {
    const gridRows = this.page.locator(WorkFlowBuilderLocators.gridRows);
    await expect(gridRows.first()).toBeVisible({ timeout: 10000 });
    await expect(gridRows).toHaveCount(1);
  }

  // Delete workflow by name
  async deleteWorkflow(workflowName) {
    // Accepts a row locator directly, clicks the delete button in that row
    // Example usage: await deleteWorkflow(row)
    const row = workflowName; // here, workflowName is actually a row locator
    const deleteButton = row.locator('input[type="image"][title="Delete Workflow and Children"]');
    await deleteButton.waitFor({ state: 'visible', timeout: 10000 });
    await deleteButton.click();
    // Handle confirm dialog if present
    try {
      await this.page.waitForEvent('dialog', { timeout: 10000 }).then((dialog) => dialog.accept());
    } catch (e) {
      // No dialog appeared, continue
    }
    await this.page.waitForLoadState('networkidle');
  }

  // Verify workflow does not exist in grid
  async verifyWorkflowDoesNotExistInGrid() {
    await this.page.waitForLoadState('domcontentloaded');
    const gridRows = this.page.locator(WorkFlowBuilderLocators.gridRows);
    await expect(gridRows).toHaveCount(0);
  }
}

export { WorkFlowBuilderPage, WorkFlowBuilderLocators };
