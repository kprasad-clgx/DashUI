import { BasePage } from '../basePage/enterpriseBasePage.po.js';

export class WorkflowPage extends BasePage {
  constructor(page) {
    super(page);

    // --- Loading Panel (Based on your provided HTML) ---
    this.loadingPanel = page.locator('#RadAjaxLoadingPanel_WorkFlowBuilder');

    this.frame = page.frameLocator('iframe[name="RadWindow_CommonWindow"]');

    // --- Locators within the iframe ---
    this.actionTitleInput = this.frame.locator('#TextBox_Title');
    this.descriptionInput = this.frame.locator('#TextBox_Description');

    // Dropdowns (Inputs)
    this.assignTriggerDropdown = this.frame.locator('#DropDown_ActionTriggers_Input');
    this.actionEventDropdown = this.frame.locator('#DropDown_ActionEvents_Input');
    this.resourceTypeDropdown = this.frame.locator('#DropDown_AssignedToType_Input');
    this.delayUnitSelect = this.frame.locator('#DropDown_AssignmentDelay_Input');
    this.completeUnitSelect = this.frame.locator('#DropDown_CompleteWithin_Input');
    this.requiredCompletionActionDropdown = this.frame.locator(
      '#DropDown_RequiredCompletionAction_Input',
    );
    this.associatedCompletionDateDropdown = this.frame.locator(
      '#DropDown_AssociatedCompletionDate_Input',
    );
    this.internalParticipantsDropdown = this.frame.locator(
      '#DropDown_ActionInternalParticipants_Input',
    );
    this.assignedToDropdown = this.frame.locator('#DropDown_AssignedTo_Input');

    // Dropdown Options
    this.assignTriggerDropdownOption = this.frame.locator(
      '#DropDown_ActionTriggers_DropDown .rcbList li:nth-child(2)',
    );
    this.actionEventDropdownOption = this.frame.locator(
      '#DropDown_ActionEvents_DropDown .rcbList li:nth-child(2)',
    );
    this.resourceTypeDropdownOption = this.frame.locator(
      '#DropDown_AssignedToType_DropDown .rcbList li:nth-child(3)',
    );
    this.delayUnitSelectOption = this.frame.locator(
      '#DropDown_AssignmentDelay_DropDown .rcbList li:nth-child(2)',
    );
    this.completeUnitSelectOption = this.frame.locator(
      '#DropDown_CompleteWithin_DropDown .rcbList li:nth-child(2)',
    );

    // --- Loading Panel (Based on your provided HTML) ---
    this.loadingPanel = page.locator('#RadAjaxLoadingPanel_WorkFlowBuilder');

    this.frame = page.frameLocator('iframe[name="RadWindow_CommonWindow"]');

    // --- Locators within the iframe ---
    this.actionTitleInput = this.frame.locator('#TextBox_Title');
    this.descriptionInput = this.frame.locator('#TextBox_Description');

    // Dropdowns (Inputs)
    this.assignTriggerDropdown = this.frame.locator('#DropDown_ActionTriggers_Input');
    this.actionEventDropdown = this.frame.locator('#DropDown_ActionEvents_Input');
    this.resourceTypeDropdown = this.frame.locator('#DropDown_AssignedToType_Input');
    this.delayUnitSelect = this.frame.locator('#DropDown_AssignmentDelay_Input');
    this.completeUnitSelect = this.frame.locator('#DropDown_CompleteWithin_Input');
    this.requiredCompletionActionDropdown = this.frame.locator(
      '#DropDown_RequiredCompletionAction_Input',
    );
    this.associatedCompletionDateDropdown = this.frame.locator(
      '#DropDown_AssociatedCompletionDate_Input',
    );
    this.internalParticipantsDropdown = this.frame.locator(
      '#DropDown_ActionInternalParticipants_Input',
    );
    this.assignedToDropdown = this.frame.locator('#DropDown_AssignedTo_Input');

    // Dropdown Options (Specific options used in your logic)
    this.assignTriggerDropdownOption = this.frame.locator(
      '#DropDown_ActionTriggers_DropDown .rcbList li:nth-child(2)',
    );
    this.actionEventDropdownOption = this.frame.locator(
      '#DropDown_ActionEvents_DropDown .rcbList li:nth-child(2)',
    );
    this.resourceTypeDropdownOption = this.frame.locator(
      '#DropDown_AssignedToType_DropDown .rcbList li:nth-child(3)',
    ); // Changed index to match '3' from your code
    this.delayUnitSelectOption = this.frame.locator(
      '#DropDown_AssignmentDelay_DropDown .rcbList li:nth-child(2)',
    );
    this.completeUnitSelectOption = this.frame.locator(
      '#DropDown_CompleteWithin_DropDown .rcbList li:nth-child(2)',
    );
    this.requiredCompletionActionDropdownOption = this.frame.locator(
      '#DropDown_RequiredCompletionAction_DropDown .rcbList li:nth-child(3)',
    );
    this.associatedCompletionDateDropdownOption = this.frame.locator(
      '#DropDown_AssociatedCompletionDate_DropDown .rcbList li:nth-child(2)',
    );

    // Text Inputs
    this.assignmentDelayInput = this.frame.locator('#TextBox_AssignmentDelay');
    this.mustCompleteWithinInput = this.frame.locator('#TextBox_CompleteWithin');

    // ListBox Checkboxes (Locating the LABEL as Telerik inputs are often hidden)
    this.notificationTypesAllCheckbox = this.frame.locator('#ListBox_NotificationTypes_i0 label');
    this.divisionsAllCheckbox = this.frame.locator('#ListBox_Divisions_i0 label');
    this.lossTypesAllCheckbox = this.frame.locator('#ListBox_LossTypes_i0 label');
    this.lossCategoriesAllCheckbox = this.frame.locator('#ListBox_LossCategories_i0 label');
    this.insuranceCarriersAllCheckbox = this.frame.locator('#ListBox_InsuranceCompanies_i0 label');
    this.jobSizeAllCheckbox = this.frame.locator('#RadListBox_JobSize_i0 label');
    this.yearBuiltAllCheckbox = this.frame.locator('#RadListBox_YearBuilt_i0 label');

    // Specific item locators
    this.employeeMonitorAdminCheckbox = this.frame
      .locator('#ListBox_EmployeeMonitor .rlbItem')
      .filter({ hasText: 'admin, admin' })
      .locator('label')
      .first();
    this.completionMonitorAdminCheckbox = this.frame
      .locator('#ListBox_CompletionMonitor .rlbItem')
      .filter({ hasText: 'admin, admin' })
      .locator('label')
      .first();
    this.acceptedProgramCheckbox = this.frame.locator('#ListBox_AcceptedPrograms_i0 label');
    this.localJobsCheckbox = this.frame
      .locator('#ListBox_AcceptedPrograms .rlbItem')
      .filter({ hasText: 'Local Jobs' })
      .locator('label')
      .first();

    this.saveButton = this.frame.locator('#Button_Save');

    // Tooltip and Info Icon
    this.associatedDateInfoIcon = this.frame.locator('#AssociatedDateInfoImage');
    this.tooltip = this.page.locator('.rwTooltip, .rtTooltip, .RadToolTip, [role="tooltip"]');
    this.frameTooltip = this.frame.locator('.rwTooltip, .rtTooltip, .RadToolTip, [role="tooltip"]');

    // Locators for workflow grid (outside iframe, on main page)
    this.addWorkflowButton = page.locator(
      '#ctl00_ContentPlaceHolder1_GridView_WorkFlowBuilder_ctl00_ctl02_ctl00_AddWorkFlow',
    );
    this.workflowGridRows = page.locator(
      '#ctl00_ContentPlaceHolder1_GridView_WorkFlowBuilder_ctl00 tbody tr',
    );

    //  grid title locator
    this.workflowGridActionTitle = page.locator(
      '#ctl00_ContentPlaceHolder1_GridView_WorkFlowBuilder_ctl00 td:nth-child(8)',
    );

    // Dialog & Validation locators
    this.addNewWorkflowDialogTitle = this.page.locator('.rwTitleRow:has-text("Add New Workflow")');
    this.radWindow = this.page.locator('.rwWindow');
    this.rwWindowContent = this.page.locator('.rwWindowContent');
    this.dialogErrorText = this.page.locator('.rwDialogText:visible, .RadNotification:visible');

    // Grid helpers
    this.workflowGridId = '#ctl00_ContentPlaceHolder1_GridView_WorkFlowBuilder_ctl00';
    this.workflowGrid = this.page.locator(this.workflowGridId);

    //quickNotes locators
    this.quickNotesIcon = page.locator('#RAD_SLIDING_PANE_ICON_ctl00_ctl44_QuickMenuSlidingPane');
    this.createWorkflowsQuickLink = page.getByText('Workflows', { exact: true });
  }
  /**
   * Helper to wait for Telerik AJAX loading panels to disappear.
   */
  async waitForAjax() {
    try {
      // 1. Wait for network
      await this.page.waitForLoadState('networkidle', { timeout: 2000 });
      // 2. Check for spinner
      if (await this.loadingPanel.isVisible({ timeout: 500 })) {
        await this.loadingPanel.waitFor({ state: 'hidden', timeout: 30000 });
      }
    } catch {
      // Ignore if spinner never appeared
    }
  }

  // --- ACTIONS ---

  /**
   * Click the Add Workflow button and wait for the iframe to load
   */
  async clickAddWorkflow() {
    await this.addWorkflowButton.click();
    await this.waitForAjax();
    // Wait for the RadWindow/iframe container
    await this.rwWindowContent.waitFor({ state: 'visible' });
    // Ensure the content inside the iframe is loaded
    await this.actionTitleInput.waitFor({ state: 'visible', timeout: 15000 });
  }

  /**
   * Robustly check an all/item checkbox in a RadListBox
   * @param {import('@playwright/test').Locator} labelLocator - The label element containing the checkbox
   */
  async ensureCheckboxChecked(labelLocator) {
    // 1. Find the parent <li> based on the label.
    const parentLi = labelLocator.locator('xpath=ancestor::li[contains(@class, "rlbItem")][1]');

    // 2. Define a locator representing the "Checked State".
    const checkedStateLocator = parentLi.locator(
      'xpath=self::*[contains(@class, "rlbChecked") or contains(@class, "rlbSelected")]',
    );

    // 3. Check Initial State (Fast fail)
    if ((await checkedStateLocator.count()) > 0) {
      return; // Already checked
    }

    // 4. Primary Action: Click the Label
    await labelLocator.scrollIntoViewIfNeeded();
    await labelLocator.click();

    try {
      // 5. Verification: Wait for class to be applied
      await checkedStateLocator.waitFor({ state: 'attached', timeout: 3000 });
    } catch {
      // 6. Fallback: Try clicking the input if label failed
      const input = labelLocator.locator('input');

      // CRITICAL CHECK: Only click if input is actually visible
      if ((await input.count()) > 0 && (await input.isVisible())) {
        if (!(await input.isChecked())) {
          await input.click();
          await checkedStateLocator.waitFor({ state: 'attached', timeout: 3000 });
        }
      } else {
        // Log warning if both methods fail
        console.warn('Checkbox could not be checked: Label click failed and Input is hidden.');
      }
    }
  }

  /**
   * Complete workflow creation workflow
   * @param {Object} workflowData - Workflow data object
   */
  async createWorkflow(workflowData) {
    // Wait for dialog title
    await this.addNewWorkflowDialogTitle.waitFor({ state: 'visible' });

    // 1. Fill Text Fields
    await this.actionTitleInput.fill(workflowData.actionTitle);
    await this.descriptionInput.fill(workflowData.description);

    // 2. Handle Cascading Dropdowns
    // Using a helper pattern: Click Dropdown -> Wait for List -> Click Option -> Wait for AJAX

    // Trigger
    await this._selectDropdown(this.assignTriggerDropdown, this.assignTriggerDropdownOption);

    // Event (Depends on Trigger)
    await this._selectDropdown(this.actionEventDropdown, this.actionEventDropdownOption);

    // Resource Type (Depends on Event)
    await this._selectDropdown(this.resourceTypeDropdown, this.resourceTypeDropdownOption);

    // 3. Delays & Units
    await this.assignmentDelayInput.fill(workflowData.assignmentDelay.toString());
    await this._selectDropdown(this.delayUnitSelect, this.delayUnitSelectOption);

    await this.mustCompleteWithinInput.fill(workflowData.mustCompleteWithin.toString());
    await this._selectDropdown(this.completeUnitSelect, this.completeUnitSelectOption);

    // 4. Completion Actions
    await this._selectDropdown(
      this.requiredCompletionActionDropdown,
      this.requiredCompletionActionDropdownOption,
    );
    await this._selectDropdown(
      this.associatedCompletionDateDropdown,
      this.associatedCompletionDateDropdownOption,
    );

    // 5. Checkboxes (Using optimized ensureCheckboxChecked)
    await this.ensureCheckboxChecked(this.notificationTypesAllCheckbox);
    await this.waitForAjax();

    await this.ensureCheckboxChecked(this.divisionsAllCheckbox);
    await this.waitForAjax();

    await this.ensureCheckboxChecked(this.lossTypesAllCheckbox);
    await this.waitForAjax();

    await this.ensureCheckboxChecked(this.lossCategoriesAllCheckbox);
    await this.waitForAjax();

    await this.ensureCheckboxChecked(this.insuranceCarriersAllCheckbox);
    await this.waitForAjax();

    await this.ensureCheckboxChecked(this.jobSizeAllCheckbox);
    await this.ensureCheckboxChecked(this.yearBuiltAllCheckbox);

    // Specific Monitors
    await this.ensureCheckboxChecked(this.employeeMonitorAdminCheckbox);
    await this.ensureCheckboxChecked(this.completionMonitorAdminCheckbox);

    // Accepted Programs
    await this.ensureCheckboxChecked(this.localJobsCheckbox);
    await this.waitForAjax();

    // 6. Save
    await this.saveButton.scrollIntoViewIfNeeded();
    await this.saveButton.click();

    // 7. Validation / Success Handling
    await this.waitForAjax();

    // Check if error dialog appeared (means save failed)
    if ((await this.dialogErrorText.count()) > 0) {
      const alerts = await this.dialogErrorText.allTextContents();
      // Filter out lingering template placeholders like "{1}"
      const realErrors = alerts.filter((t) => t.trim() !== '{1}' && t.trim() !== '');

      if (realErrors.length > 0) {
        throw new Error(`Failed to save workflow. Errors: ${realErrors.join(', ')}`);
      }
    }
    // Wait for the RadWindow to actually close
    await this.radWindow.waitFor({ state: 'hidden', timeout: 30000 });
  }

  /**
   * Helper for robust dropdown selection
   */
  async _selectDropdown(triggerLocator, optionLocator) {
    await triggerLocator.click();
    await optionLocator.waitFor({ state: 'visible' });
    await optionLocator.click();
    await this.waitForAjax(); // Wait for any cascading updates
  }
  get grid() {
    return this.page.locator('#ctl00_ContentPlaceHolder1_GridView_WorkFlowBuilder_ctl00');
  }

  async waitForGridVisible(timeout = 15000) {
    await this.grid.waitFor({ state: 'visible', timeout });
  }

  /**
   * Verify workflow was created successfully
   * @param {string} expectedActionTitle - Expected action title to verify
   * @returns {boolean} - True if workflow title matches
   */
  async verifyWorkflowCreated(expectedActionTitle) {
    // Wait for the grid container to be visible and attached
    await this.workflowGrid.waitFor({ state: 'visible', timeout: 20000 });
    // Extra: Wait for grid to be attached to DOM
    let attached = false;
    for (let i = 0; i < 10; i++) {
      attached = await this.workflowGrid.isVisible().catch(() => false);
      if (attached) break;
      await this.workflowGrid.waitFor({ state: 'visible', timeout: 1000 }).catch(() => {});
    }
    await this.waitForAjax();

    // Filter rows directly for the title (Faster than getting all texts)
    const matchingRow = this.page
      .locator(`${this.workflowGridId} td:nth-child(8)`)
      .filter({ hasText: expectedActionTitle.trim() });

    // If not found, print all action titles for diagnosis
    const found = (await matchingRow.count()) > 0;
    if (!found) {
      const allTitles = await this.page
        .locator(`${this.workflowGridId} td:nth-child(8)`)
        .allTextContents();
      console.warn('[verifyWorkflowCreated] Workflow not found. Current grid titles:', allTitles);
    }
    return found;
  }

  async openQuickNotesCreateWorkflow() {
    await this.quickNotesIcon.click();
    await this.createWorkflowsQuickLink.click();
    await this.page.waitForLoadState('networkidle');
  }
}
