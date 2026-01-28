import { expect } from '@playwright/test';

const StandardProgramWithActionsLocators = {
  // Requirements related locators
  firstUnpublishedProgramRow:
    '#ctl00_ContentPlaceHolder1_StandardProgramControl_GridView_UnPublishedPrograms_ctl00 > tbody > tr',
  viewRequirementsLink: 'a[title="View Requirements"]',
  addNewProgramRequirementButton: '#Button_AddNewRequirement',
  addNewProgramRequirementModal:
    '#RadWindowWrapper_ctl00_ContentPlaceHolder1_StandardProgramRequirementControl_RadWindow_AddProgramRequirement',
  addRequirementModalHeader: 'em[unselectable="on"]',
  addRequirementModalIframe: 'iframe[name="RadWindow_AddProgramRequirement"]',
  requirementNameInput: 'input[name="TextBox_RequirementName"]',
  timeFrameInput: 'input[name="TextBox_TimeFrame"]',
  appliesToStateEditLocator: '#RadGrid_States_ctl00_ctl06_Button_EditState',
  selectStateModalReq: '#RadWindowWrapper_RadWindow_SelectState',
  stateSourceListReq: '#RadWindow_SelectState_C_StatesControl_RadListBox_Source .rlbItem',
  allToRightButtonInReq: 'a.rlbButton.rlbTransferAllFrom',
  okButtonReq: 'input#RadWindow_SelectState_C_Button_OK',
  requirementTypeDropdown: '#RadComboBox_RequirementTypes_Arrow',
  requirementTypeDropdownList: '#RadComboBox_RequirementTypes_DropDown .rcbList',
  requirementCategoryDropdown: '#RadComboBox_RequirementCategory_Arrow',
  requirementCategoryDropdownList: '#RadComboBox_RequirementCategory_DropDown .rcbList',
  saveButtonReq: 'input#Button_Save',
  requirementsGrid:
    '#ctl00_ContentPlaceHolder1_StandardProgramRequirementControl_GridView_ProgramRequirements_GridData',

  // Action Items related locators
  viewActionItemsLink: 'a[title="View Action Items"]',
  addNewActionItemButton: '#Button_AddNew',
  addNewActionItemModal: '#RadWindowWrapper_ctl00_ContentPlaceHolder1_ActionItemsRadWindow',
  addActionItemModalHeader: 'em[unselectable="on"]',
  addActionItemModalIframe: 'iframe[name="ActionItemsRadWindow"]',
  actionItemTitleInput: 'input[name="TextBox_Title"]',
  actionItemDescriptionInput: 'textarea[name="TextBox_Description"]',
  actionTriggerDropdown: '#DropDown_ActionTriggers_Arrow',
  actionEventDropdown: '#DropDown_ActionEvents_Arrow',
  defaultAssigneeDropdown: '#DropDown_DefaultAssignee_Arrow',
  assignmentDelayInput: '#TextBox_AssignmentDelay',
  assignmentDelayUnitDropdown: '#DropDown_AssignmentDelay_Arrow',
  mustCompleteWithinInput: '#TextBox_CompleteWithin',
  mustCompleteWithinUnitDropdown: '#DropDown_CompleteWithin_Arrow',
  actionSaveButton: '#Button_Save',
  actionSaveAndAddNotificationButton: '#Button_SaveAndAddNotification',
  actionCancelButton: '#Button_Cancel',

  // Navigation related locators
  backToRequirementsButton: '#ctl00_ContentPlaceHolder1_Button_BackToRequirement',
  backToProgramsButton:
    '#ctl00_ContentPlaceHolder1_StandardProgramRequirementControl_Button_BackToStandardProgram',
};

class StandardProgramWithActionsPage {
  constructor(page) {
    this.page = page;
  }

  async clickViewRequirements() {
    const firstGridRow = this.page
      .locator(StandardProgramWithActionsLocators.firstUnpublishedProgramRow)
      .first();
    const viewRequirementsLink = firstGridRow.locator(
      StandardProgramWithActionsLocators.viewRequirementsLink,
    );
    await expect(viewRequirementsLink).toBeVisible({ timeout: 10000 });
    await viewRequirementsLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickAddNewProgramRequirement() {
    const addNewProgramRequirementButton = this.page.locator(
      StandardProgramWithActionsLocators.addNewProgramRequirementButton,
    );
    await expect(addNewProgramRequirementButton).toBeVisible({ timeout: 10000 });
    await addNewProgramRequirementButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyAddNewProgramRequirementModal() {
    const addNewProgramRequirementModal = this.page.locator(
      StandardProgramWithActionsLocators.addNewProgramRequirementModal,
    );
    await expect(addNewProgramRequirementModal).toBeVisible({ timeout: 10000 });

    const addRequirementModalHeader = addNewProgramRequirementModal.locator(
      StandardProgramWithActionsLocators.addRequirementModalHeader,
      { hasText: 'Add New Program Requirement' },
    );
    await expect(addRequirementModalHeader).toBeVisible();
    await expect(addRequirementModalHeader).toHaveText('Add New Program Requirement');

    const addRequirementModalIframe = addNewProgramRequirementModal.frameLocator(
      StandardProgramWithActionsLocators.addRequirementModalIframe,
    );
    await expect(addRequirementModalIframe.locator('body')).toBeVisible({ timeout: 10000 });

    return { addRequirementModalIframe, addNewProgramRequirementModal };
  }

  async fillRequirementDetails(addRequirementModalIframe, requirementName, timeFrame) {
    const requirementNameInput = addRequirementModalIframe.locator(
      StandardProgramWithActionsLocators.requirementNameInput,
    );
    await expect(requirementNameInput).toBeVisible({ timeout: 10000 });
    await requirementNameInput.click();
    await requirementNameInput.fill(requirementName);

    // Robust wait for the input to be attached and visible
    const timeFrameInput = addRequirementModalIframe.locator(
      StandardProgramWithActionsLocators.timeFrameInput,
    );
    await timeFrameInput.waitFor({ state: 'attached', timeout: 10000 });
    await expect(timeFrameInput).toBeVisible({ timeout: 10000 });
    await timeFrameInput.click();
    await timeFrameInput.fill(timeFrame);
  }

  async selectAllStatesForRequirement(addRequirementModalIframe) {
    const appliesToStateEditLocator = addRequirementModalIframe.locator(
      StandardProgramWithActionsLocators.appliesToStateEditLocator,
    );
    await expect(appliesToStateEditLocator).toBeVisible({ timeout: 10000 });
    await appliesToStateEditLocator.click();

    // Wait for the modal to be visible instead of networkidle
    const selectStateModalReq = addRequirementModalIframe.locator(
      StandardProgramWithActionsLocators.selectStateModalReq,
    );
    await expect(selectStateModalReq).toBeVisible({ timeout: 10000 });

    const stateSourceListReq = selectStateModalReq.locator(
      StandardProgramWithActionsLocators.stateSourceListReq,
    );
    await expect(stateSourceListReq.first()).toBeVisible({ timeout: 10000 });

    const allToRightButtonInReq = selectStateModalReq.locator(
      StandardProgramWithActionsLocators.allToRightButtonInReq,
    );
    await expect(allToRightButtonInReq).toBeVisible({ timeout: 10000 });
    await allToRightButtonInReq.click();

    const okButtonReq = selectStateModalReq.locator(StandardProgramWithActionsLocators.okButtonReq);
    await expect(okButtonReq).toBeVisible({ timeout: 10000 });
    await okButtonReq.click();

    await expect(selectStateModalReq).toBeHidden({ timeout: 10000 });
  }

  async selectRequirementType(
    addRequirementModalIframe,
    requirementType = 'Initial Customer Contact',
  ) {
    const requirementTypeDropdown = addRequirementModalIframe.locator(
      StandardProgramWithActionsLocators.requirementTypeDropdown,
    );
    await expect(requirementTypeDropdown).toBeVisible({ timeout: 10000 });
    await requirementTypeDropdown.click();

    const requirementTypeDropdownList = addRequirementModalIframe.locator(
      StandardProgramWithActionsLocators.requirementTypeDropdownList,
    );
    await expect(requirementTypeDropdownList).toBeVisible({ timeout: 10000 });

    const selectedOption = requirementTypeDropdownList.locator('li.rcbItem', {
      hasText: requirementType,
    });
    await expect(selectedOption).toBeVisible({ timeout: 10000 });
    await selectedOption.click();
  }

  async selectRequirementCategory(
    addRequirementModalIframe,
    requirementCategory = 'Service Standards',
  ) {
    const requirementCategoryDropdown = addRequirementModalIframe.locator(
      StandardProgramWithActionsLocators.requirementCategoryDropdown,
    );
    await expect(requirementCategoryDropdown).toBeVisible({ timeout: 10000 });
    await requirementCategoryDropdown.click();

    const requirementCategoryDropdownList = addRequirementModalIframe.locator(
      StandardProgramWithActionsLocators.requirementCategoryDropdownList,
    );
    await expect(requirementCategoryDropdownList).toBeVisible({ timeout: 10000 });

    const selectedOption = requirementCategoryDropdownList.locator('li.rcbItem', {
      hasText: requirementCategory,
    });
    await expect(selectedOption).toBeVisible({ timeout: 10000 });
    await selectedOption.click();
  }

  async saveRequirement(addNewProgramRequirementModal) {
    const saveButtonReq = addNewProgramRequirementModal.locator(
      StandardProgramWithActionsLocators.saveButtonReq,
    );
    await expect(saveButtonReq).toBeVisible({ timeout: 10000 });
    await saveButtonReq.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyRequirementsGrid() {
    const requirementsGrid = this.page.locator(StandardProgramWithActionsLocators.requirementsGrid);
    await expect(requirementsGrid).toBeVisible({ timeout: 10000 });
    return requirementsGrid;
  }

  async clickViewActionItems(requirementsGrid) {
    const firstRequirementRow = requirementsGrid.locator('tr.rgRow').first();
    const viewActionItemsLink = firstRequirementRow.locator(
      StandardProgramWithActionsLocators.viewActionItemsLink,
    );
    await expect(viewActionItemsLink).toBeVisible({ timeout: 10000 });
    await viewActionItemsLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickAddNewActionItem() {
    const addNewActionItemButton = this.page.locator(
      StandardProgramWithActionsLocators.addNewActionItemButton,
    );
    await expect(addNewActionItemButton).toBeVisible({ timeout: 10000 });
    await addNewActionItemButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyAddNewActionItemModal() {
    const addNewActionItemModal = this.page.locator(
      StandardProgramWithActionsLocators.addNewActionItemModal,
    );
    await expect(addNewActionItemModal).toBeVisible({ timeout: 10000 });

    const addActionItemModalHeader = addNewActionItemModal.locator(
      StandardProgramWithActionsLocators.addActionItemModalHeader,
      { hasText: 'Add New Action Item' },
    );
    await expect(addActionItemModalHeader).toBeVisible();
    await expect(addActionItemModalHeader).toHaveText('Add New Action Item');

    const addActionItemModalIframe = addNewActionItemModal.frameLocator(
      StandardProgramWithActionsLocators.addActionItemModalIframe,
    );
    await expect(addActionItemModalIframe.locator('body')).toBeVisible({ timeout: 20000 });

    return { addActionItemModalIframe, addNewActionItemModal };
  }

  async fillActionItemDetails(addActionItemModalIframe, actionItemName) {
    const actionItemTitleInput = addActionItemModalIframe.locator(
      StandardProgramWithActionsLocators.actionItemTitleInput,
    );
    await expect(actionItemTitleInput).toBeVisible({ timeout: 10000 });
    await actionItemTitleInput.click();
    await actionItemTitleInput.fill(actionItemName);

    const actionItemDescriptionInput = addActionItemModalIframe.locator(
      StandardProgramWithActionsLocators.actionItemDescriptionInput,
    );
    await expect(actionItemDescriptionInput).toBeVisible({ timeout: 10000 });
    await actionItemDescriptionInput.click();
    await actionItemDescriptionInput.fill(`Description for ${actionItemName}`);
  }

  async selectRandomActionTrigger(addActionItemModalIframe) {
    const actionTriggerDropdown = addActionItemModalIframe.locator(
      StandardProgramWithActionsLocators.actionTriggerDropdown,
    );
    await expect(actionTriggerDropdown).toBeVisible({ timeout: 5000 });
    await actionTriggerDropdown.click();

    const actionTriggerOptions = addActionItemModalIframe.locator('.rcbList .rcbItem');
    const jobDateEventsOption = actionTriggerOptions.filter({ hasText: 'Job Date Events' });
    const count = await jobDateEventsOption.count();
    if (count === 0) throw new Error('Job Date Events option not found in Action Trigger dropdown');
    await expect(jobDateEventsOption.first()).toBeVisible();
    await jobDateEventsOption.first().click();
  }

  async selectRandomActionEvent(addActionItemModalIframe) {
    const actionEventDropdown = addActionItemModalIframe.locator(
      StandardProgramWithActionsLocators.actionEventDropdown,
    );
    await expect(actionEventDropdown).toBeVisible({ timeout: 10000 });
    await actionEventDropdown.click();

    const actionEventOptions = addActionItemModalIframe.locator('.rcbList .rcbItem');
    const dateReceivedOption = actionEventOptions.filter({ hasText: 'Date Received' });
    const count = await dateReceivedOption.count();
    if (count === 0) throw new Error('Date Received option not found in Action Event dropdown');
    await expect(dateReceivedOption.first()).toBeVisible();
    await dateReceivedOption.first().click();
  }

  async selectRandomDefaultAssignee(addActionItemModalIframe) {
    const defaultAssigneeDropdown = addActionItemModalIframe.locator(
      StandardProgramWithActionsLocators.defaultAssigneeDropdown,
    );
    await expect(defaultAssigneeDropdown).toBeVisible({ timeout: 10000 });
    await defaultAssigneeDropdown.click();

    const defaultAssigneeOptions = addActionItemModalIframe.locator('.rcbList .rcbItem');
    const currentUserOption = defaultAssigneeOptions.filter({ hasText: 'Current User' });
    const count = await currentUserOption.count();
    if (count === 0) throw new Error('Current User option not found in Default Assignee dropdown');
    await expect(currentUserOption.first()).toBeVisible();
    await currentUserOption.first().click();
  }

  async fillAssignmentDelay(addActionItemModalIframe, assignmentDelayDigit) {
    const assignmentDelayInput = addActionItemModalIframe.locator(
      StandardProgramWithActionsLocators.assignmentDelayInput,
    );
    await expect(assignmentDelayInput).toBeVisible({ timeout: 5000 });
    await assignmentDelayInput.click();
    await assignmentDelayInput.fill(assignmentDelayDigit);
  }

  async selectRandomAssignmentDelayUnit(addActionItemModalIframe) {
    const assignmentDelayUnitDropdown = addActionItemModalIframe.locator(
      StandardProgramWithActionsLocators.assignmentDelayUnitDropdown,
    );
    await expect(assignmentDelayUnitDropdown).toBeVisible({ timeout: 5000 });
    await assignmentDelayUnitDropdown.click();

    const assignmentDelayUnitOptions = addActionItemModalIframe.locator('.rcbList .rcbItem');
    const assignmentDelayUnitCount = await assignmentDelayUnitOptions.count();
    if (assignmentDelayUnitCount < 2) throw new Error('Not enough assignment delay unit options');
    // Always select the first available option (index 1) if only 4 options
    await expect(assignmentDelayUnitOptions.nth(1)).toBeVisible();
    await assignmentDelayUnitOptions.nth(1).click();
  }

  async fillMustCompleteWithin(addActionItemModalIframe, mustCompleteWithinDigit) {
    const mustCompleteWithinInput = addActionItemModalIframe.locator(
      StandardProgramWithActionsLocators.mustCompleteWithinInput,
    );
    await expect(mustCompleteWithinInput).toBeVisible({ timeout: 5000 });
    await mustCompleteWithinInput.click();
    await mustCompleteWithinInput.fill(mustCompleteWithinDigit);
  }

  async selectRandomMustCompleteWithinUnit(addActionItemModalIframe) {
    const mustCompleteWithinUnitDropdown = addActionItemModalIframe.locator(
      StandardProgramWithActionsLocators.mustCompleteWithinUnitDropdown,
    );
    await expect(mustCompleteWithinUnitDropdown).toBeVisible({ timeout: 5000 });
    await mustCompleteWithinUnitDropdown.click();

    const mustCompleteWithinUnitOptions = addActionItemModalIframe.locator('.rcbList .rcbItem');
    const mustCompleteWithinUnitCount = await mustCompleteWithinUnitOptions.count();
    if (mustCompleteWithinUnitCount < 2)
      throw new Error('Not enough must complete within unit options');
    // Always select the first available option (index 1) for deterministic selection
    await expect(mustCompleteWithinUnitOptions.nth(1)).toBeVisible();
    await mustCompleteWithinUnitOptions.nth(1).click();
  }

  async selectMarkCompletedRequiredCompletionAction(addActionItemModalIframe) {
    const requiredCompletionActionDropdown = addActionItemModalIframe.locator(
      '#DropDown_RequiredCompletionAction_Arrow',
    );
    await expect(requiredCompletionActionDropdown).toBeVisible({ timeout: 5000 });
    await requiredCompletionActionDropdown.click();

    const options = addActionItemModalIframe.locator('.rcbList .rcbItem');
    const markCompletedOption = options.filter({ hasText: 'Mark Completed' });
    const count = await markCompletedOption.count();
    if (count === 0)
      throw new Error('Mark Completed option not found in Required Completion Action dropdown');
    await expect(markCompletedOption.first()).toBeVisible();
    await markCompletedOption.first().click();
  }

  async verifyActionItemButtons(addActionItemModalIframe) {
    const actionSaveButton = addActionItemModalIframe.locator(
      StandardProgramWithActionsLocators.actionSaveButton,
    );
    const actionSaveAndAddNotificationButton = addActionItemModalIframe.locator(
      StandardProgramWithActionsLocators.actionSaveAndAddNotificationButton,
    );
    const actionCancelButton = addActionItemModalIframe.locator(
      StandardProgramWithActionsLocators.actionCancelButton,
    );

    await expect(actionSaveButton).toBeVisible();
    await expect(actionSaveAndAddNotificationButton).toBeVisible();
    await expect(actionCancelButton).toBeVisible();
  }

  async saveActionItem(addActionItemModalIframe) {
    const actionSaveButton = addActionItemModalIframe.locator(
      StandardProgramWithActionsLocators.actionSaveButton,
    );
    await actionSaveButton.click();
    // Check the modal wrapper is hidden, not the FrameLocator
    const addNewActionItemModal = this.page.locator(
      StandardProgramWithActionsLocators.addNewActionItemModal,
    );
    await expect(addNewActionItemModal).toBeHidden({ timeout: 20000 });
  }

  async clickBackToRequirements() {
    const backToRequirementsButton = this.page.locator(
      StandardProgramWithActionsLocators.backToRequirementsButton,
    );
    await expect(backToRequirementsButton).toBeVisible({ timeout: 10000 });
    await backToRequirementsButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickBackToPrograms() {
    const backToProgramsButton = this.page.locator(
      StandardProgramWithActionsLocators.backToProgramsButton,
    );
    await expect(backToProgramsButton).toBeVisible({ timeout: 20000 });
    await backToProgramsButton.click();
    await this.page.waitForLoadState('networkidle');
  }
}

export default StandardProgramWithActionsPage;
