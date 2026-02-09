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
    const valueToSelect = 'Job Date Events';
    const dropdownId = 'DropDown_ActionTriggers';
    
    // Try Telerik API first
    const iframeElement = await this.page.locator('iframe[name="RadWindow_CommonWindow"]').elementHandle();
    const actualFrame = await iframeElement.contentFrame();
    
    let result = { success: false, method: 'none' };
    for (let apiAttempt = 1; apiAttempt <= 3; apiAttempt++) {
      result = await actualFrame.evaluate(({ dropdownId, valueToSelect }) => {
        const comboBox = window.$find ? window.$find(dropdownId) : null;
        if (comboBox && typeof comboBox.findItemByText === 'function') {
          const item = comboBox.findItemByText(valueToSelect);
          if (item) {
            item.select();
            if (typeof comboBox.commitChanges === 'function') {
              comboBox.commitChanges();
            }
            return { success: true, method: 'telerikApi' };
          }
          return { success: false, method: 'itemNotFound', comboExists: true };
        }
        return { success: false, method: 'none' };
      }, { dropdownId, valueToSelect });
      
      if (result.success) {
        break;
      }
      
      if (result.method === 'itemNotFound' && apiAttempt < 3) {
        await this.page.waitForTimeout(1000);
      }
    }
    
    // Fallback to UI approach if API failed
    if (!result.success) {
      const actionTriggerDropdown = addWorkModalFrame.locator(WorkFlowBuilderLocators.actionTriggerDropdown);
      await expect(actionTriggerDropdown).toBeVisible({ timeout: 5000 });
      
      for (let attempt = 1; attempt <= 5; attempt++) {
        try {
          await actionTriggerDropdown.scrollIntoViewIfNeeded();
          await actionTriggerDropdown.click();
          
          const dropdownContainer = addWorkModalFrame.locator('#DropDown_ActionTriggers_DropDown');
          await dropdownContainer.waitFor({ state: 'visible', timeout: 5000 });
          await this.page.waitForTimeout(1500);

          const option = addWorkModalFrame
            .locator('#DropDown_ActionTriggers_DropDown .rcbList li')
            .filter({ hasText: valueToSelect })
            .first();
          
          await option.waitFor({ state: 'visible', timeout: 5000 });
          await option.click();
          break;
        } catch (error) {
          if (attempt === 5) {
            throw new Error(
              `Failed to select "${valueToSelect}" from dropdown "${dropdownId}" after 5 attempts: ${error.message}`
            );
          }
          await this.page.keyboard.press('Escape').catch(() => {});
          await this.page.waitForTimeout(500);
        }
      }
    }
    
    // Wait for cascading AJAX
    await this.page.waitForTimeout(500);
  }

  // Select random action event
  async selectRandomActionEvent(addWorkModalFrame) {
    const valueToSelect = 'Date Received';
    const dropdownId = 'DropDown_ActionEvents';
    
    // Wait for cascading dropdown to load after Action Trigger selection
    await this.page.waitForTimeout(1000);
    
    // Try Telerik API first (with retries for cascading dropdown)
    const iframeElement = await this.page.locator('iframe[name="RadWindow_CommonWindow"]').elementHandle();
    const actualFrame = await iframeElement.contentFrame();
    
    let result = { success: false, method: 'none' };
    for (let apiAttempt = 1; apiAttempt <= 5; apiAttempt++) {
      result = await actualFrame.evaluate(({ dropdownId, valueToSelect }) => {
        const comboBox = window.$find ? window.$find(dropdownId) : null;
        if (comboBox && typeof comboBox.findItemByText === 'function') {
          const item = comboBox.findItemByText(valueToSelect);
          if (item) {
            item.select();
            if (typeof comboBox.commitChanges === 'function') {
              comboBox.commitChanges();
            }
            return { success: true, method: 'telerikApi' };
          }
          return { success: false, method: 'itemNotFound', comboExists: true };
        }
        return { success: false, method: 'none' };
      }, { dropdownId, valueToSelect });
      
      if (result.success) {
        break;
      }
      
      if (result.method === 'itemNotFound' && apiAttempt < 5) {
        await this.page.waitForTimeout(1000);
      }
    }
    
    // Fallback to UI approach if API failed
    if (!result.success) {
      const actionEventDropdown = addWorkModalFrame.locator(WorkFlowBuilderLocators.actionEventDropdown);
      await expect(actionEventDropdown).toBeVisible({ timeout: 10000 });
      
      for (let attempt = 1; attempt <= 5; attempt++) {
        try {
          await actionEventDropdown.scrollIntoViewIfNeeded();
          await actionEventDropdown.click();
          
          const dropdownContainer = addWorkModalFrame.locator('#DropDown_ActionEvents_DropDown');
          await dropdownContainer.waitFor({ state: 'visible', timeout: 10000 });
          await this.page.waitForTimeout(1000);

          const option = addWorkModalFrame
            .locator('#DropDown_ActionEvents_DropDown .rcbList li')
            .filter({ hasText: valueToSelect })
            .first();
          
          const optionCount = await addWorkModalFrame
            .locator('#DropDown_ActionEvents_DropDown .rcbList li')
            .filter({ hasText: valueToSelect })
            .count();
          
          if (optionCount === 0) {
            await this.page.keyboard.press('Escape').catch(() => {});
            await this.page.waitForTimeout(1000);
            continue;
          }

          await option.scrollIntoViewIfNeeded();
          await option.waitFor({ state: 'visible', timeout: 5000 });
          await option.click();
          break;
        } catch (error) {
          if (attempt === 5) {
            throw new Error(
              `Failed to select "${valueToSelect}" from cascading dropdown "${dropdownId}" after 5 attempts: ${error.message}`
            );
          }
          await this.page.keyboard.press('Escape').catch(() => {});
          await this.page.waitForTimeout(1000);
        }
      }
    }
    
    // Wait for cascading AJAX
    await this.page.waitForTimeout(500);
  }

  // Select random assigned to type
  async selectRandomAssignedToType(addWorkModalFrame) {
    const valueToSelect = 'Employee';
    const dropdownId = 'DropDown_AssignedToType';
    
    await this.page.waitForTimeout(500);
    
    // Try Telerik API first
    const iframeElement = await this.page.locator('iframe[name="RadWindow_CommonWindow"]').elementHandle();
    const actualFrame = await iframeElement.contentFrame();
    
    let result = { success: false, method: 'none' };
    for (let apiAttempt = 1; apiAttempt <= 5; apiAttempt++) {
      result = await actualFrame.evaluate(({ dropdownId, valueToSelect }) => {
        const comboBox = window.$find ? window.$find(dropdownId) : null;
        if (comboBox && typeof comboBox.findItemByText === 'function') {
          const item = comboBox.findItemByText(valueToSelect);
          if (item) {
            item.select();
            if (typeof comboBox.commitChanges === 'function') {
              comboBox.commitChanges();
            }
            return { success: true, method: 'telerikApi' };
          }
          return { success: false, method: 'itemNotFound', comboExists: true };
        }
        return { success: false, method: 'none' };
      }, { dropdownId, valueToSelect });
      
      if (result.success) {
        break;
      }
      
      if (result.method === 'itemNotFound' && apiAttempt < 5) {
        await this.page.waitForTimeout(1000);
      }
    }
    
    // Fallback to UI approach if API failed
    if (!result.success) {
      const assignedToTypeDropdown = addWorkModalFrame.locator(WorkFlowBuilderLocators.assignedToTypeDropdown);
      await expect(assignedToTypeDropdown).toBeVisible({ timeout: 10000 });
      
      for (let attempt = 1; attempt <= 5; attempt++) {
        try {
          await assignedToTypeDropdown.scrollIntoViewIfNeeded();
          await assignedToTypeDropdown.click();
          
          const dropdownContainer = addWorkModalFrame.locator('#DropDown_AssignedToType_DropDown');
          await dropdownContainer.waitFor({ state: 'visible', timeout: 10000 });
          await this.page.waitForTimeout(1500);

          let items = dropdownContainer.locator('.rcbItem');
          let allItems = await items.allTextContents();
          
          if (allItems.length === 0) {
            items = dropdownContainer.locator('li');
            allItems = await items.allTextContents();
          }
          
          const matchingIndex = allItems.findIndex((text) => text.includes(valueToSelect));
          
          if (matchingIndex >= 0) {
            const item = items.nth(matchingIndex);
            await item.click({ timeout: 5000 });
            break;
          }
        } catch (error) {
          if (attempt === 5) {
            throw new Error(
              `Failed to select "${valueToSelect}" from dropdown "${dropdownId}" after 5 attempts: ${error.message}`
            );
          }
          await this.page.keyboard.press('Escape').catch(() => {});
          await this.page.waitForTimeout(500);
        }
      }
    }
    
    // Wait for cascading AJAX
    await this.page.waitForTimeout(500);
  }

  // Select random assigned to
  async selectRandomAssignedTo(addWorkModalFrame) {
    const valueToSelect = 'admin, admin';
    const dropdownId = 'DropDown_AssignedTo';
    
    await this.page.waitForTimeout(1000);
    
    // Try Telerik API first (cascading dropdown may need retries)
    const iframeElement = await this.page.locator('iframe[name="RadWindow_CommonWindow"]').elementHandle();
    const actualFrame = await iframeElement.contentFrame();
    
    let result = { success: false, method: 'none' };
    for (let apiAttempt = 1; apiAttempt <= 5; apiAttempt++) {
      result = await actualFrame.evaluate(({ dropdownId, valueToSelect }) => {
        const comboBox = window.$find ? window.$find(dropdownId) : null;
        if (comboBox && typeof comboBox.findItemByText === 'function') {
          const item = comboBox.findItemByText(valueToSelect);
          if (item) {
            item.select();
            if (typeof comboBox.commitChanges === 'function') {
              comboBox.commitChanges();
            }
            return { success: true, method: 'telerikApi' };
          }
          return { success: false, method: 'itemNotFound', comboExists: true };
        }
        return { success: false, method: 'none' };
      }, { dropdownId, valueToSelect });
      
      if (result.success) {
        break;
      }
      
      if (result.method === 'itemNotFound' && apiAttempt < 5) {
        await this.page.waitForTimeout(1000);
      }
    }
    
    // Fallback to UI approach if API failed
    if (!result.success) {
      const assignedToDropdown = addWorkModalFrame.locator(WorkFlowBuilderLocators.assignedToDropdown);
      await expect(assignedToDropdown).toBeVisible({ timeout: 10000 });
      
      for (let attempt = 1; attempt <= 5; attempt++) {
        try {
          await assignedToDropdown.waitFor({ state: 'visible', timeout: 5000 });
          await assignedToDropdown.click();
          
          const dropdownContainer = addWorkModalFrame.locator('#DropDown_AssignedTo_DropDown');
          await dropdownContainer.waitFor({ state: 'visible', timeout: 10000 });
          await this.page.waitForTimeout(1000);

          const option = addWorkModalFrame
            .locator('#DropDown_AssignedTo_DropDown .rcbList li')
            .filter({ hasText: valueToSelect })
            .first();
          
          const optionCount = await addWorkModalFrame
            .locator('#DropDown_AssignedTo_DropDown .rcbList li')
            .filter({ hasText: valueToSelect })
            .count();
          
          if (optionCount === 0) {
            await this.page.keyboard.press('Escape').catch(() => {});
            await this.page.waitForTimeout(1000);
            continue;
          }

          await option.scrollIntoViewIfNeeded();
          await option.waitFor({ state: 'visible', timeout: 5000 });
          await option.click();
          
          // Verify selection
          await this.page.waitForTimeout(500);
          const inputValue = await addWorkModalFrame.locator(`#${dropdownId}_Input`).inputValue();
          if (inputValue === valueToSelect || inputValue.includes(valueToSelect.split(',')[0])) {
            break;
          }
          
          await this.page.keyboard.press('Escape').catch(() => {});
          await this.page.waitForTimeout(500);
        } catch (error) {
          if (attempt === 5) {
            throw new Error(
              `Failed to select "${valueToSelect}" from cascading dropdown "${dropdownId}" after 5 attempts: ${error.message}`
            );
          }
          await this.page.keyboard.press('Escape').catch(() => {});
          await this.page.waitForTimeout(1000);
        }
      }
    }
    
    // Wait for cascading AJAX
    await this.page.waitForTimeout(500);
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
    const dropdownId = 'DropDown_AssignmentDelay';
    
    // Try Telerik API first to select the second option (index 1)
    const iframeElement = await this.page.locator('iframe[name="RadWindow_CommonWindow"]').elementHandle();
    const actualFrame = await iframeElement.contentFrame();
    
    let result = { success: false, method: 'none' };
    for (let apiAttempt = 1; apiAttempt <= 3; apiAttempt++) {
      result = await actualFrame.evaluate(({ dropdownId }) => {
        const comboBox = window.$find ? window.$find(dropdownId) : null;
        if (comboBox && typeof comboBox.get_items === 'function') {
          const items = comboBox.get_items();
          if (items.get_count() > 1) {
            const secondItem = items.getItem(1);
            secondItem.select();
            if (typeof comboBox.commitChanges === 'function') {
              comboBox.commitChanges();
            }
            return { success: true, method: 'telerikApi' };
          }
        }
        return { success: false, method: 'none' };
      }, { dropdownId });
      
      if (result.success) {
        break;
      }
      await this.page.waitForTimeout(500);
    }

    // Fallback to UI approach if API failed
    if (!result.success) {
      const assignmentDelayUnitDropdown = addWorkModalFrame.locator(
        WorkFlowBuilderLocators.assignmentDelayUnitDropdown,
      );
      await expect(assignmentDelayUnitDropdown).toBeVisible({ timeout: 5000 });

      for (let attempt = 1; attempt <= 5; attempt++) {
        try {
          await assignmentDelayUnitDropdown.scrollIntoViewIfNeeded();
          await assignmentDelayUnitDropdown.click();
          
          const dropdownContainer = addWorkModalFrame.locator('#DropDown_AssignmentDelay_DropDown .rcbList');
          await dropdownContainer.waitFor({ state: 'visible', timeout: 5000 });
          await this.page.waitForTimeout(800);

          const assignmentDelayUnitOptions = addWorkModalFrame.locator('#DropDown_AssignmentDelay_DropDown .rcbList .rcbItem');
          const secondOption = assignmentDelayUnitOptions.nth(1);
          await secondOption.waitFor({ state: 'visible', timeout: 5000 });
          await secondOption.click();
          break;
        } catch (error) {
          if (attempt === 5) {
            throw new Error(
              `Failed to select assignment delay unit after 5 attempts: ${error.message}`
            );
          }
          await this.page.keyboard.press('Escape').catch(() => {});
          await this.page.waitForTimeout(500);
        }
      }
    }
    
    await this.page.waitForTimeout(500);
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
    const dropdownId = 'DropDown_CompleteWithin';
    
    // Try Telerik API first to select the second option (index 1)
    const iframeElement = await this.page.locator('iframe[name="RadWindow_CommonWindow"]').elementHandle();
    const actualFrame = await iframeElement.contentFrame();
    
    let result = { success: false, method: 'none' };
    for (let apiAttempt = 1; apiAttempt <= 3; apiAttempt++) {
      result = await actualFrame.evaluate(({ dropdownId }) => {
        const comboBox = window.$find ? window.$find(dropdownId) : null;
        if (comboBox && typeof comboBox.get_items === 'function') {
          const items = comboBox.get_items();
          if (items.get_count() > 1) {
            const secondItem = items.getItem(1);
            secondItem.select();
            if (typeof comboBox.commitChanges === 'function') {
              comboBox.commitChanges();
            }
            return { success: true, method: 'telerikApi' };
          }
        }
        return { success: false, method: 'none' };
      }, { dropdownId });
      
      if (result.success) {
        break;
      }
      await this.page.waitForTimeout(500);
    }

    // Fallback to UI approach if API failed
    if (!result.success) {
      const mustCompleteWithinUnitDropdown = addWorkModalFrame.locator(
        WorkFlowBuilderLocators.mustCompleteWithinUnitDropdown,
      );
      await expect(mustCompleteWithinUnitDropdown).toBeVisible({ timeout: 5000 });

      for (let attempt = 1; attempt <= 5; attempt++) {
        try {
          await mustCompleteWithinUnitDropdown.scrollIntoViewIfNeeded();
          await mustCompleteWithinUnitDropdown.click();
          
          const dropdownContainer = addWorkModalFrame.locator('#DropDown_CompleteWithin_DropDown .rcbList');
          await dropdownContainer.waitFor({ state: 'visible', timeout: 5000 });
          await this.page.waitForTimeout(800);

          const mustCompleteWithinUnitOptions = addWorkModalFrame.locator('#DropDown_CompleteWithin_DropDown .rcbList .rcbItem');
          const secondOption = mustCompleteWithinUnitOptions.nth(1);
          await secondOption.waitFor({ state: 'visible', timeout: 5000 });
          await secondOption.click();
          break;
        } catch (error) {
          if (attempt === 5) {
            throw new Error(
              `Failed to select must complete within unit after 5 attempts: ${error.message}`
            );
          }
          await this.page.keyboard.press('Escape').catch(() => {});
          await this.page.waitForTimeout(500);
        }
      }
    }
    
    await this.page.waitForTimeout(500);
  }

  // Select required completion action
  async selectRequiredCompletionAction(addWorkModalFrame) {
    const valueToSelect = 'Mark Completed';
    const dropdownId = 'DropDown_RequiredCompletionAction';
    
    // Try Telerik API first
    const iframeElement = await this.page.locator('iframe[name="RadWindow_CommonWindow"]').elementHandle();
    const actualFrame = await iframeElement.contentFrame();
    
    let apiSuccess = false;
    for (let attempt = 1; attempt <= 3; attempt++) {
      const result = await actualFrame.evaluate(({ dropdownId, valueToSelect }) => {
        const comboBox = window.$find ? window.$find(dropdownId) : null;
        if (comboBox && typeof comboBox.findItemByText === 'function') {
          const item = comboBox.findItemByText(valueToSelect);
          if (item) {
            item.select();
            if (typeof comboBox.commitChanges === 'function') {
              comboBox.commitChanges();
            }
            return { success: true };
          }
        }
        return { success: false };
      }, { dropdownId, valueToSelect });
      
      if (result.success) {
        apiSuccess = true;
        break;
      }
      await this.page.waitForTimeout(500);
    }
    
    // Fallback to UI approach if API failed
    if (!apiSuccess) {
      const requiredCompleteActionDropdown = addWorkModalFrame.locator(WorkFlowBuilderLocators.requiredCompleteActionDropdown);
      await expect(requiredCompleteActionDropdown).toBeVisible({ timeout: 5000 });
      
      for (let attempt = 1; attempt <= 5; attempt++) {
        try {
          await requiredCompleteActionDropdown.click();
          await addWorkModalFrame.locator('#DropDown_RequiredCompletionAction_DropDown .rcbList').waitFor({ state: 'visible', timeout: 5000 });
          await this.page.waitForTimeout(800);
          
          const markCompletedOption = addWorkModalFrame
            .locator('#DropDown_RequiredCompletionAction_DropDown .rcbList .rcbItem')
            .filter({ hasText: valueToSelect })
            .first();
          const count = await markCompletedOption.count();
          
          if (count > 0) {
            await markCompletedOption.click();
            break;
          }
          
          if (attempt < 5) {
            await requiredCompleteActionDropdown.click();
            await this.page.waitForTimeout(500);
          }
        } catch (e) {
          if (attempt === 5) throw new Error(`Failed to select "${valueToSelect}" after 5 attempts: ${e.message}`);
          await this.page.keyboard.press('Escape').catch(() => {});
          await this.page.waitForTimeout(500);
        }
      }
    }
  }

  // Select random associated completion date
  async selectRandomAssociatedCompletionDate(addWorkModalFrame) {
    const dropdownId = 'DropDown_AssociatedCompletionDate';
    
    // Try Telerik API first to select the second option (index 1)
    const iframeElement = await this.page.locator('iframe[name="RadWindow_CommonWindow"]').elementHandle();
    const actualFrame = await iframeElement.contentFrame();
    
    let result = { success: false, method: 'none' };
    for (let apiAttempt = 1; apiAttempt <= 3; apiAttempt++) {
      result = await actualFrame.evaluate(({ dropdownId }) => {
        const comboBox = window.$find ? window.$find(dropdownId) : null;
        if (comboBox && typeof comboBox.get_items === 'function') {
          const items = comboBox.get_items();
          if (items.get_count() > 1) {
            const secondItem = items.getItem(1);
            secondItem.select();
            if (typeof comboBox.commitChanges === 'function') {
              comboBox.commitChanges();
            }
            return { success: true, method: 'telerikApi' };
          }
        }
        return { success: false, method: 'none' };
      }, { dropdownId });
      
      if (result.success) {
        break;
      }
      await this.page.waitForTimeout(500);
    }

    // Fallback to UI approach if API failed
    if (!result.success) {
      const associatedCompletionDateDropdown = addWorkModalFrame.locator(
        WorkFlowBuilderLocators.associatedCompletionDateDropdown,
      );
      await expect(associatedCompletionDateDropdown).toBeVisible({ timeout: 5000 });

      for (let attempt = 1; attempt <= 5; attempt++) {
        try {
          await associatedCompletionDateDropdown.scrollIntoViewIfNeeded();
          await associatedCompletionDateDropdown.click();
          
          const dropdownContainer = addWorkModalFrame.locator('#DropDown_AssociatedCompletionDate_DropDown .rcbList');
          await dropdownContainer.waitFor({ state: 'visible', timeout: 5000 });
          await this.page.waitForTimeout(800);

          const associatedCompletionDateOptions = addWorkModalFrame.locator('#DropDown_AssociatedCompletionDate_DropDown .rcbList .rcbItem');
          const secondOption = associatedCompletionDateOptions.nth(1);
          await secondOption.waitFor({ state: 'visible', timeout: 5000 });
          await secondOption.click();
          break;
        } catch (error) {
          if (attempt === 5) {
            throw new Error(
              `Failed to select associated completion date after 5 attempts: ${error.message}`
            );
          }
          await this.page.keyboard.press('Escape').catch(() => {});
          await this.page.waitForTimeout(500);
        }
      }
    }
    
    await this.page.waitForTimeout(500);
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
    await expect(gridRows.first()).toBeVisible({ timeout: 60000 });
    await expect(gridRows).toHaveCount(1);
  }

  // Delete workflow by name
  async deleteWorkflow(workflowName) {
    // Wait for grid to be visible and loaded
    const gridRows = this.page.locator(WorkFlowBuilderLocators.gridRows);
    await gridRows.first().waitFor({ state: 'visible', timeout: 60000 });
    
    // Find the row that contains the workflow name in the Action Title column (8th column)
    const row = this.page
      .locator(`${WorkFlowBuilderLocators.gridRows}:has(td:nth-child(8):text-is("${workflowName}"))`)
      .first();
    
    // Wait for row to be visible
    await row.waitFor({ state: 'visible', timeout: 60000 });
    
    // Find delete button
    const deleteButton = row.locator('input[type="image"][title="Delete Workflow and Children"]');
    
    // Scroll into view and verify visibility
    await deleteButton.scrollIntoViewIfNeeded();
    await deleteButton.waitFor({ state: 'visible', timeout: 60000 });
    
    // Set up dialog handler and click delete button
    await Promise.all([
      this.page.waitForEvent('dialog').then(dialog => dialog.accept()),
      deleteButton.click({ force: true })
    ]);
  }

  // Verify workflow does not exist in grid
  async verifyWorkflowDoesNotExistInGrid(workflowName) {
    // Wait for grid to reload after deletion
    await this.page.waitForLoadState('networkidle', { timeout: 60000 });
    
    // Verify the specific workflow is gone
    const workflowRow = this.page.locator(
      `${WorkFlowBuilderLocators.gridRows}:has(td:nth-child(8):text-is("${workflowName}"))`
    );
    await expect(workflowRow).toHaveCount(0, { timeout: 60000 });
  }
}

export { WorkFlowBuilderPage, WorkFlowBuilderLocators };
