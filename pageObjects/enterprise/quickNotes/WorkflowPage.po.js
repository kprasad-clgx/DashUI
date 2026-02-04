import { BasePage } from '../basePage/enterpriseBasePage.po.js';

export class WorkflowPage extends BasePage {
  constructor(page) {
    super(page);

    // --- Loading Panel ---
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
    this.assignedToArrow = this.frame.locator('#DropDown_AssignedTo_Arrow');
    this.assignedToItems = this.frame.locator(
      '#DropDown_AssignedTo_DropDown .rcbItem, #DropDown_AssignedTo_DropDown .rcbList li',
    );
    this.internalParticipantsDropdownItems = this.frame.locator(
      '#DropDown_ActionInternalParticipants_DropDown li',
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
    this.propertyManagementCompanyAllCheckbox = this.frame.locator(
      '#ListBox_PropertyManagement_i0 label',
    );
    this.mortageCompanyAllCheckbox = this.frame.locator('#ListBox_Mortgage_i0 label');
    this.tpaCompanyAllCheckbox = this.frame.locator('#ListBox_TPA_i0 label');
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
   * Helper to wait for a specified duration
   * @param {number} ms - Milliseconds to wait
   */
  async wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // --- ACTIONS ---

  /**
   * Click the Add Workflow button and wait for the iframe to load
   */
  async clickAddWorkflow() {
    await this.addWorkflowButton.click();
    await this.waitForAjax();
    // Wait for the RadWindow/iframe container
    await this.rwWindowContent.waitFor({ state: 'visible', timeout: 30000 });
    // Wait for iframe to be attached and loaded
    await this.page.waitForLoadState('networkidle');
    // Ensure the content inside the iframe is loaded
    await this.actionTitleInput.waitFor({ state: 'visible', timeout: 30000 });
  }

  /**
   * Check a checkbox in a RadListBox
   * @param {import('@playwright/test').Locator} labelLocator - The label element containing the checkbox
   */
  async ensureCheckboxChecked(labelLocator) {
    const parentLi = labelLocator.locator('xpath=ancestor::li[contains(@class, "rlbItem")][1]');
    const checkboxInput = labelLocator.locator('input[type="checkbox"]');

    // Check if already checked
    const isAlreadyChecked = await checkboxInput.isChecked().catch(() => false);
    if (isAlreadyChecked) {
      return;
    }

    // Scroll into view and click the checkbox label (more reliable than input)
    try {
      await labelLocator.scrollIntoViewIfNeeded();
      await this.wait(300);

      // Try clicking the label first (more reliable for Telerik controls)
      await labelLocator.click({ force: true });
      await this.wait(500);
    } catch (e) {
      // If label click fails, try the input
      try {
        await checkboxInput.click({ force: true });
        await this.wait(500);
      } catch (e2) {
        console.warn('[ensureCheckboxChecked] Both label and input clicks failed:', e2.message);
      }
    }

    // Wait for the checked state - check both the input property and the parent class
    const maxWait = 8000;
    const startTime = Date.now();

    while (Date.now() - startTime < maxWait) {
      try {
        // Check 1: Is the input element checked?
        const isInputChecked = await checkboxInput.isChecked().catch(() => false);

        // Check 2: Does the parent li have the selected class?
        const hasSelectedClass = await parentLi
          .evaluate((el) => {
            return (
              el.classList.contains('rlbChecked') ||
              el.classList.contains('rlbSelected') ||
              el.classList.contains('rlbActive')
            );
          })
          .catch(() => false);

        if (isInputChecked || hasSelectedClass) {
          return; // Success
        }
      } catch (e) {
        // Ignore evaluation errors and keep waiting
      }

      await this.wait(200);
    }

    // Last resort: check using JavaScript directly
    try {
      await this.page.evaluate(() => {
        // This might help trigger any pending state changes
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((cb) => {
          if (!cb.checked) {
            // Dispatch change event to trigger any listeners
            cb.dispatchEvent(new Event('change', { bubbles: true }));
          }
        });
      });
    } catch (e) {
      // Ignore
    }

    throw new Error(`Checkbox failed to check within ${maxWait}ms`);
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

    // 2. Handle Cascading Dropdowns using test data values Using a helper pattern: Click Dropdown Arrow -> Search for Value -> Click Option -> Wait for AJAX

    // Trigger
    await this.selectDropdownByValue('DropDown_ActionTriggers', workflowData.actionTrigger);

    // Event (Depends on Trigger)
    await this.selectDropdownByValue('DropDown_ActionEvents', workflowData.actionEvent);

    // Resource Type (Depends on Event)
    await this.selectDropdownByValue('DropDown_AssignedToType', workflowData.assignedToType);

    // Use UI click approach for this cascading dropdown for reliability
    if (workflowData.assignedTo) {
      await this.waitForAjax();
      await this.selectCascadingDropdownByUI('DropDown_AssignedTo', workflowData.assignedTo);
    }

    // 3. Delays & Units
    await this.assignmentDelayInput.fill(workflowData.assignmentDelay.toString());
    await this.selectDropdownByValue('DropDown_AssignmentDelay', workflowData.assignmentDelayUnit);

    await this.mustCompleteWithinInput.fill(workflowData.mustCompleteWithin.toString());
    await this.selectDropdownByValue(
      'DropDown_CompleteWithin',
      workflowData.mustCompleteWithinUnit,
    );

    // 4. Completion Actions
    await this.selectDropdownByValue(
      'DropDown_RequiredCompletionAction',
      workflowData.requiredCompletionAction,
    );
    await this.selectDropdownByValue(
      'DropDown_AssociatedCompletionDate',
      workflowData.associatedCompletionDate,
    );

    // 5. Checkboxes (Using test data values)
    if (workflowData.notificationType === 'ALL') {
      await this.ensureCheckboxChecked(this.notificationTypesAllCheckbox);
    }
    await this.waitForAjax();

    // Divisions
    if (workflowData.divisions === 'ALL') {
      await this.ensureCheckboxChecked(this.divisionsAllCheckbox);
    }
    await this.waitForAjax();

    // Loss Types
    if (workflowData.lossTypes === 'ALL') {
      await this.ensureCheckboxChecked(this.lossTypesAllCheckbox);
    }
    await this.waitForAjax();

    // Loss Categories
    if (workflowData.lossCategories === 'ALL') {
      await this.ensureCheckboxChecked(this.lossCategoriesAllCheckbox);
    }
    await this.waitForAjax();

    // Insurance Carriers
    if (workflowData.insuranceCarrier === 'ALL') {
      await this.ensureCheckboxChecked(this.insuranceCarriersAllCheckbox);
    }
    await this.waitForAjax();

    // Property Management Company
    if (workflowData.propertyManagementCompany === 'ALL') {
      await this.ensureCheckboxChecked(this.propertyManagementCompanyAllCheckbox);
    }
    await this.waitForAjax();

    // Mortgage Company
    if (workflowData.mortageCompany === 'ALL') {
      await this.ensureCheckboxChecked(this.mortageCompanyAllCheckbox);
    }
    await this.waitForAjax();

    // TPA Company
    if (workflowData.tpaCompany === 'ALL') {
      await this.ensureCheckboxChecked(this.tpaCompanyAllCheckbox);
    }
    await this.waitForAjax();

    // Job Size
    if (workflowData.jobSize === 'ALL') {
      await this.ensureCheckboxChecked(this.jobSizeAllCheckbox);
    }
    // Year Built
    if (workflowData.yearBuilt === 'ALL') {
      await this.ensureCheckboxChecked(this.yearBuiltAllCheckbox);
    }

    // Specific Monitors (using test data)
    if (workflowData.employeeMonitors) {
      const employeeMonitor = this.frame
        .locator('#ListBox_EmployeeMonitor .rlbItem')
        .filter({ hasText: workflowData.employeeMonitors })
        .locator('label')
        .first();
      await this.ensureCheckboxChecked(employeeMonitor);
    }

    if (workflowData.completionMonitors) {
      const completionMonitor = this.frame
        .locator('#ListBox_CompletionMonitor .rlbItem')
        .filter({ hasText: workflowData.completionMonitors })
        .locator('label')
        .first();
      await this.ensureCheckboxChecked(completionMonitor);
    }

    // Accepted Programs (using test data)
    if (workflowData.appliesToType === 'Local Jobs') {
      await this.ensureCheckboxChecked(this.localJobsCheckbox);
    } else {
      const programCheckbox = this.frame
        .locator('#ListBox_AcceptedPrograms .rlbItem')
        .filter({ hasText: workflowData.appliesToType })
        .locator('label')
        .first();
      await this.ensureCheckboxChecked(programCheckbox);
    }
    await this.waitForAjax();

    // CRITICAL: Verify mandatory fields are still checked before saving
    if (workflowData.divisions === 'ALL') {
      const divisionsCheckboxInput = this.frame.locator('#ListBox_Divisions_i0 input');
      const isDivisionsChecked = await divisionsCheckboxInput.isChecked().catch(() => false);
      if (!isDivisionsChecked) {
        await this.ensureCheckboxChecked(this.divisionsAllCheckbox);
      }
    }

    // 6. Save
    await this.saveButton.scrollIntoViewIfNeeded();

    // Wait for button to be enabled
    await this.saveButton.waitFor({ state: 'visible', timeout: 10000 });

    // Click the save button
    await this.saveButton.click();

    // 7. Validation / Success Handling
    try {
      await this.waitForAjax(10000);
    } catch {
      // Ignore AJAX timeout
    }

    // Check if error dialog appeared (means save failed)
    if ((await this.dialogErrorText.count()) > 0) {
      const alerts = await this.dialogErrorText.allTextContents();
      const realErrors = alerts.filter((t) => t.trim() !== '{1}' && t.trim() !== '');
      if (realErrors.length > 0) {
        throw new Error(`Failed to save workflow. Errors: ${realErrors.join(', ')}`);
      }
    }

    // Wait for the RadWindow to close
    try {
      const isHidden = await this.radWindow.isHidden();
      if (!isHidden) {
        await this.radWindow.waitFor({ state: 'hidden', timeout: 60000 });
      }
    } catch {
      const mainGrid = this.page.locator(
        '#ctl00_ContentPlaceHolder1_GridView_WorkFlowBuilder_ctl00',
      );
      await mainGrid.isVisible({ timeout: 10000 });
    }
  }

  /**
   * Helper for robust dropdown selection by searching for value
   * Uses Telerik RadComboBox API to reliably select cascading dropdown values
   * @param {string} dropdownId - The base ID of the dropdown (e.g., 'DropDown_ActionTriggers')
   * @param {string} valueToSelect - The exact text value to search for and select
   */
  async selectDropdownByValue(dropdownId, valueToSelect) {
    // Wait for any loading panels first
    await this.waitForAjax();

    // Get the actual Frame object from the FrameLocator for evaluate()
    const iframeElement = await this.page
      .locator('iframe[name="RadWindow_CommonWindow"]')
      .elementHandle();
    const actualFrame = await iframeElement.contentFrame();

    // Try multiple times for cascading dropdowns where options load via AJAX
    let result = { success: false, method: 'none' };

    for (let apiAttempt = 1; apiAttempt <= 3; apiAttempt++) {
      // Use JavaScript to find and select the option using Telerik's API
      result = await actualFrame.evaluate(
        ({ dropdownId, valueToSelect }) => {
          // Get the RadComboBox client object
          const comboBox = window.$find ? window.$find(dropdownId) : null;

          if (comboBox && typeof comboBox.findItemByText === 'function') {
            // Use Telerik API to find and select item
            const item = comboBox.findItemByText(valueToSelect);
            if (item) {
              item.select();
              // Trigger the client-side change event
              if (typeof comboBox.commitChanges === 'function') {
                comboBox.commitChanges();
              }
              return { success: true, method: 'telerikApi' };
            }
            // Item not found - options may not be loaded yet for cascading dropdown
            return { success: false, method: 'itemNotFound', comboExists: true };
          }

          // Fallback: Try to find and click the option directly in the DOM
          const dropdown = document.querySelector(`#${dropdownId}_DropDown`);
          if (dropdown) {
            const items = dropdown.querySelectorAll('.rcbList li');
            for (const item of items) {
              if (item.textContent.trim() === valueToSelect) {
                // Simulate the selection by updating input and triggering events
                const input = document.querySelector(`#${dropdownId}_Input`);
                if (input) {
                  input.value = valueToSelect;
                  input.dispatchEvent(new Event('change', { bubbles: true }));
                }
                return { success: true, method: 'domFallback' };
              }
            }
          }

          return { success: false, method: 'none' };
        },
        { dropdownId, valueToSelect },
      );

      if (result.success) {
        break;
      }

      // Wait for AJAX to load options if item not found (cascading dropdown)
      if (result.method === 'itemNotFound' && apiAttempt < 3) {
        await this.wait(1000);
      }
    }

    if (!result.success) {
      // If JavaScript approach failed, try the UI click approach with retry logic
      for (let attempt = 1; attempt <= 5; attempt++) {
        try {
          // Click arrow to open dropdown
          const arrow = this.frame.locator(`#${dropdownId}_Arrow`);
          await arrow.scrollIntoViewIfNeeded();
          await arrow.click();

          // Wait for dropdown to be visible
          const dropdownContainer = this.frame.locator(`#${dropdownId}_DropDown`);
          await dropdownContainer.waitFor({ state: 'visible', timeout: 5000 });

          // Wait for options to load
          await this.wait(1500);

          // Find and click the option
          const option = this.frame
            .locator(`#${dropdownId}_DropDown .rcbList li`)
            .filter({ hasText: valueToSelect })
            .first();
          await option.waitFor({ state: 'visible', timeout: 5000 });
          await option.click();

          break; // Success, exit retry loop
        } catch (error) {
          if (attempt === 5) {
            throw new Error(
              `Failed to select "${valueToSelect}" from dropdown "${dropdownId}" after 5 attempts: ${error.message}`,
            );
          }
          // Close dropdown if open and retry
          await this.page.keyboard.press('Escape');
          await this.wait(500);
        }
      }
    }

    // Wait for cascading AJAX to complete
    await this.waitForAjax();
    await this.wait(500);
  }

  /**
   * Helper for cascading dropdown selection using UI click approach
   * This is more reliable for dropdowns that load options via AJAX after parent dropdown selection
   * @param {string} dropdownId - The base ID of the dropdown (e.g., 'DropDown_AssignedTo')
   * @param {string} valueToSelect - The exact text value to search for and select
   */
  async selectCascadingDropdownByUI(dropdownId, valueToSelect) {
    // Wait for any loading panels first
    await this.waitForAjax();

    for (let attempt = 1; attempt <= 5; attempt++) {
      try {
        // Click arrow to open dropdown
        const arrow = this.frame.locator(`#${dropdownId}_Arrow`);
        await arrow.waitFor({ state: 'visible', timeout: 5000 });
        await arrow.click();

        // Wait for dropdown container to be visible
        const dropdownContainer = this.frame.locator(`#${dropdownId}_DropDown`);
        await dropdownContainer.waitFor({ state: 'visible', timeout: 10000 });

        // Wait a bit for items to load
        await this.wait(1000);

        // Find the option - use exact text match
        const option = this.frame
          .locator(`#${dropdownId}_DropDown .rcbList li`)
          .filter({ hasText: valueToSelect })
          .first();

        // Check if option exists
        const optionCount = await this.frame
          .locator(`#${dropdownId}_DropDown .rcbList li`)
          .filter({ hasText: valueToSelect })
          .count();

        if (optionCount === 0) {
          // Options not loaded yet, close and retry
          await this.page.keyboard.press('Escape');
          await this.wait(1000);
          continue;
        }

        // Scroll the option into view and click it
        await option.scrollIntoViewIfNeeded();
        await option.waitFor({ state: 'visible', timeout: 5000 });
        await option.click();

        // Verify selection was made
        await this.wait(500);
        const inputValue = await this.frame.locator(`#${dropdownId}_Input`).inputValue();
        if (inputValue === valueToSelect || inputValue.includes(valueToSelect.split(',')[0])) {
          // Selection successful
          break;
        }

        // Selection didn't take, retry
        await this.page.keyboard.press('Escape');
        await this.wait(500);
      } catch (error) {
        if (attempt === 5) {
          throw new Error(
            `Failed to select "${valueToSelect}" from cascading dropdown "${dropdownId}" after 5 attempts: ${error.message}`,
          );
        }
        // Close dropdown if open and retry
        await this.page.keyboard.press('Escape');
        await this.wait(1000);
      }
    }

    // Wait for cascading AJAX to complete
    await this.waitForAjax();
    await this.wait(500);
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

    // Wait a bit for the grid to refresh with the new workflow
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Try to find the workflow in the grid with multiple retries
    for (let attempt = 0; attempt < 5; attempt++) {
      // Filter rows directly for the title (Faster than getting all texts)
      const matchingRow = this.page
        .locator(`${this.workflowGridId} td:nth-child(8)`)
        .filter({ hasText: expectedActionTitle.trim() });

      const found = (await matchingRow.count()) > 0;
      if (found) {
        return true;
      }

      // If not found on this attempt, wait and try again
      if (attempt < 4) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        // Try reloading the page if grid still empty
        if (attempt === 2) {
          await this.page.reload();
          await this.waitForGridVisible(30000);
          await this.waitForAjax();
        }
      }
    }

    // Final check - workflow not found after retries
    return false;
  }

  async openQuickNotesCreateWorkflow() {
    await this.quickNotesIcon.click();
    await this.createWorkflowsQuickLink.click();
    await this.page.waitForLoadState('networkidle');
  }
  /**
   * Select Action Trigger by name
   * @param {string} name
   */
  async selectActionTriggerByName(name) {
    // Wait for dropdown to be visible first
    await this.assignTriggerDropdown.waitFor({ state: 'visible', timeout: 30000 });

    // Try the UI approach with extended retry logic
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        await this.assignTriggerDropdown.click({ force: true });
        await this.waitForAjax();
        await this.wait(1500); // Wait for dropdown animation

        // Wait for the specific dropdown list to be visible
        const dropdownList = this.frame.locator('#DropDown_ActionTriggers_DropDown');
        await dropdownList.waitFor({ state: 'visible', timeout: 10000 });

        // Get items from this specific dropdown
        const items = dropdownList.locator('.rcbItem');
        const allItems = await items.allTextContents();
        const matchingIndex = allItems.findIndex((text) => text.includes(name));

        if (matchingIndex >= 0) {
          const item = items.nth(matchingIndex);
          await item.click({ timeout: 5000 });
          await this.waitForAjax();
          return;
        }
      } catch (e) {
        if (attempt === 3) {
          throw e;
        }
        if (!this.page.isClosed()) {
          await this.page.keyboard.press('Escape');
          await this.wait(500);
        }
      }
    }
  }

  /**
   * Select Action Event by name
   * @param {string} name
   */
  async selectActionEventByName(name) {
    // Wait for dropdown to be visible first
    await this.actionEventDropdown.waitFor({ state: 'visible', timeout: 30000 });

    // Try the UI approach with extended retry logic
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        await this.actionEventDropdown.click({ force: true });
        await this.waitForAjax();
        await this.wait(1500); // Wait for dropdown animation

        // Wait for the specific dropdown list to be visible
        const dropdownList = this.frame.locator('#DropDown_ActionEvents_DropDown');
        await dropdownList.waitFor({ state: 'visible', timeout: 10000 });

        // Get items from this specific dropdown
        const items = dropdownList.locator('.rcbItem');
        const allItems = await items.allTextContents();
        const matchingIndex = allItems.findIndex((text) => text.includes(name));

        if (matchingIndex >= 0) {
          const item = items.nth(matchingIndex);
          await item.click({ timeout: 5000 });
          await this.waitForAjax();
          return;
        }
      } catch (e) {
        if (attempt === 3) {
          throw e;
        }
        if (!this.page.isClosed()) {
          await this.page.keyboard.press('Escape');
          await this.wait(500);
        }
      }
    }
  }

  /**
   * Get all internal participants from the dropdown
   * @returns {Promise<string[]>}
   */
  async getInternalParticipants() {
    await this.internalParticipantsDropdown.click();
    await this.waitForAjax();
    const texts = await this.internalParticipantsDropdownItems.allTextContents();
    // Click again to close the dropdown if needed, or click away
    await this.internalParticipantsDropdown.click({ force: true });
    return texts;
  }

  /**
   * Select Assigned To Type by name
   * @param {string} name
   */
  async selectAssignedToTypeByName(name) {
    // Wait for dropdown to be visible first
    await this.resourceTypeDropdown.waitFor({ state: 'visible', timeout: 30000 });

    // Try the UI approach with extended retry logic
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        // Click with force to ensure it opens
        await this.resourceTypeDropdown.click({ force: true });
        await this.waitForAjax();
        await this.wait(1500); // Wait for dropdown to open and animate

        // Wait for the specific dropdown list to be visible
        const dropdownList = this.frame.locator('#DropDown_AssignedToType_DropDown');
        await dropdownList.waitFor({ state: 'visible', timeout: 10000 });

        // Get items - try multiple selectors for robustness
        let items = dropdownList.locator('.rcbItem');
        let allItems = await items.allTextContents();

        // If no items found, try li elements (fallback for different dropdown structures)
        if (allItems.length === 0) {
          items = dropdownList.locator('li');
          allItems = await items.allTextContents();
        }

        const matchingIndex = allItems.findIndex((text) => text.includes(name));

        if (matchingIndex >= 0) {
          const item = items.nth(matchingIndex);
          await item.click({ timeout: 5000 });
          // Wait for AJAX to load the dependent Assigned To dropdown options
          await this.waitForAjax();
          return;
        }
      } catch (e) {
        if (attempt === 3) {
          throw e;
        }
        if (!this.page.isClosed()) {
          await this.page.keyboard.press('Escape');
          await this.wait(500);
        }
      }
    }
  }

  /**
   * Get all options from the Assigned To dropdown
   * @returns {Promise<string[]>}
   */
  async getAssignedToOptions() {
    await this.assignedToArrow.click();
    await this.waitForAjax();
    // Wait for dropdown list to be visible
    const dropdownList = this.frame.locator('#DropDown_AssignedTo_DropDown');
    await dropdownList.waitFor({ state: 'visible', timeout: 10000 });
    // Get all items from the dropdown
    const items = dropdownList.locator('.rcbItem, .rcbList li');
    await items.first().waitFor({ state: 'visible', timeout: 5000 });

    // Wait for more than just the placeholder option to load
    const itemCount = await items.count();
    if (itemCount <= 1) {
      await this.wait(3000);
    }

    const texts = await items.allTextContents();
    return texts;
  }
}
