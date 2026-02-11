import { BasePage } from '../basePage/enterpriseBasePage.po.js';

export class WorkOrderPurchaseOrderPage extends BasePage {
  constructor(page) {
    super(page);

    // --- Loading Panel (Telerik) ---
    this.loadingPanel = page.locator('.RadAjax.RadAjax_Default'); // Generic class for Telerik loaders

    // --- Navigation ---
    this.workOrderPoLink = page.locator('#AccountingHeaderLinkPanel a:has-text("WO / PO")').first();

    // --- Job Summary Labels ---
    this.jobSummaryLabels = {
      header: page.locator(
        '#ctl00_ContentPlaceHolder1_JobSummaryControl_JobSummaryPane_header_Label16',
      ),
      estimateAmount: page.locator(
        '#ctl00_ContentPlaceHolder1_JobSummaryControl_JobSummaryPane_content_lblEstimateAmount',
      ),
      woTotal: page.locator(
        '#ctl00_ContentPlaceHolder1_JobSummaryControl_JobSummaryPane_content_lblWOTotal',
      ),
      estimateGP: page.locator(
        '#ctl00_ContentPlaceHolder1_JobSummaryControl_JobSummaryPane_content_lblEstimateGP',
      ),
      actualJobCost: page.locator(
        '#ctl00_ContentPlaceHolder1_JobSummaryControl_JobSummaryPane_content_lblActualJobCost',
      ),
      actualGP: page.locator(
        '#ctl00_ContentPlaceHolder1_JobSummaryControl_JobSummaryPane_content_lblActualGP',
      ),
    };

    // --- Toolbar Icons ---
    this.toolbar = {
      convertEstimate: page.locator('#ctl00_ContentPlaceHolder1_imgAutoGenerateWo'),
      createNew: page.locator('#ctl00_ContentPlaceHolder1_imgCreateNewWo'),
      startWO: page.locator('#ctl00_ContentPlaceHolder1_imgActualWorkOrderStart'),
      completeWO: page.locator('#ctl00_ContentPlaceHolder1_imgCompleteWo'),
      deleteWO: page.locator('#ctl00_ContentPlaceHolder1_imgDeleteWo'),
      scheduler: page.locator('#ctl00_ContentPlaceHolder1_imgJobGantchart'),
      addEstimate: page.locator('#ctl00_ContentPlaceHolder1_imgaddEstimate'),
      printSummary: page.locator('#ctl00_ContentPlaceHolder1_imgPrintProductionSummary'),
      addMilestone: page.locator('#ctl00_ContentPlaceHolder1_MilestoneImageButton'),
      shareUnshareExternally: page.locator('#ctl00_ContentPlaceHolder1_WorkOrderSharedExternallyImageButton'),
    };

    // --- Auto Generate Work Order Modal ---
    this.autoGenModal = page.locator('#ctl00_ContentPlaceHolder1_pnlAutoLink');
    this.includeOverheadCheckbox = page.locator('#ctl00_ContentPlaceHolder1_chkpercentageoverhead');
    this.estimateDropdown = page.locator('#ctl00_ContentPlaceHolder1_lsbEstimate');
    this.workOrderDatePicker = page.locator(
      '#ctl00_ContentPlaceHolder1_WorkOrderSatrtDateTimePicker_dateInput',
    );
    this.generateWorkOrderButton = page.locator('#ctl00_ContentPlaceHolder1_btnGenrateWorkOrder');

    // --- Create New Work Order Form ---
    this.createWOContainer = page.locator('#ctl00_ContentPlaceHolder1_SummaryPanel');
    this.woNumberLabel = page.locator('#ctl00_ContentPlaceHolder1_lblWorkorderNO');
    this.convertToPOButton = page.locator('#ctl00_ContentPlaceHolder1_imgConvertPurchaseOrder');
    this.categoryCodeInput = page.locator('#ctl00_ContentPlaceHolder1_CategoryCodeTextBox');
    this.summaryInput = page.locator('#ctl00_ContentPlaceHolder1_txtDescription');
    this.budgetHoursInput = page.locator('#ctl00_ContentPlaceHolder1_txtHourRate');
    this.percentCompleteInput = page.locator(
      '#ctl00_ContentPlaceHolder1_RadNumericTextBox_PercentComplete',
    );
    this.shareExternallyChk = page.locator(
      '#ctl00_ContentPlaceHolder1_WorkOrderShareExternallyCheckBox',
    );
    this.scheduleWorkOrderButton = page.locator('#ctl00_ContentPlaceHolder1_imgJobGantchart');

    this.userTypeDropdown = page.locator('#ctl00_ContentPlaceHolder1_ddlUserType');
    this.assigneeInput = page.locator('#ctl00_ContentPlaceHolder1_lsbUser');
    this.assigneeOptions = page.locator('.rlbList .rlbItem .rlbText');
    this.commentsInput = page.locator('#ctl00_ContentPlaceHolder1_CommentsTextBox');
    this.saveWOBtn = page.locator('#ctl00_ContentPlaceHolder1_btnSave');

    this.convertEstimateToWorkOrderButton = page.locator(
      '#ctl00_ContentPlaceHolder1_imgAutoGenerateWo',
    );

    // --- Milestone (Iframe Handling) ---
    this.milestoneIframe = page.frameLocator('iframe[name*="RadWindow"]');
    this.milestoneForm = {
      assigneeTypeArrow: this.milestoneIframe.locator('[id*="AssigneeTypeComboBox_Arrow"]'),
      assigneeTypeDropdown: this.milestoneIframe.locator('[id*="AssigneeTypeComboBox_DropDown"]'),
      employeeList: this.milestoneIframe.locator('#AddMileStoneControl_EmployeeList_i2'),
      description: this.milestoneIframe.locator('#AddMileStoneControl_SummaryTextBox'),
      startDate: this.milestoneIframe.locator('#AddMileStoneControl_StartDateDatePicker_dateInput'),
      endDate: this.milestoneIframe.locator('#AddMileStoneControl_EndDateDatePicker_dateInput'),
      saveBtn: this.milestoneIframe.locator('#AddMileStoneControl_SaveMilestoneButton'),
      numberLabel: this.milestoneIframe.locator('#AddMileStoneControl_MilestoneTextLabel'),
    };

    // --- Grid & Search ---
    this.searchBox = page.locator(
      '#ctl00_ContentPlaceHolder1_gvWorkOrder_ctl00_ctl02_ctl03_FilterTextBox_WONAME',
    );
    this.grid = page.locator('#ctl00_ContentPlaceHolder1_gvWorkOrder_ctl00');

    // --- Notifications ---
    this.notificationsButton = page.locator('#ctl00_imageDashNotifications');
    this.notificationCompletedIcon = page
      .locator("#dashNotificationSummary img[title='Completed']")
      .first();
    this.modalOverlay = page.locator('.ModalPopupBG, #BD1_backgroundElement');
    this.closeButton = page.locator(
      '.rwCloseButton, button:has-text("Close"), button:has-text("OK")',
    );

    // --- Scheduler & Export ---
    this.backToWorkFromSchedulerLink = page.locator(
      '#ctl00_ContentPlaceHolder1_LinkButtonBackToWorkOrder',
    );
    this.backToSchedulerLink = page.locator(
      '#ctl00_ContentPlaceHolder1_LinkButtonBackToScheduler',
    );
    this.exportInvoicesButton = page.locator(
      '#ctl00_ContentPlaceHolder1_gvInvoice_ctl00_ctl02_ctl00_ExportToExcelButton',
    );
    this.backToWorkOrderButton = page.locator('#ctl00_ContentPlaceHolder1_btnWorkOrder');

    // --- Reschedule Modal ---
    this.rescheduleButton = page.locator('#ctl00_ContentPlaceHolder1_ImageButton2:visible');
    this.rescheduleModal = {
      datePickerPopupButton: page.locator('#ctl00_ContentPlaceHolder1_RadDatePickerEstimateDate_popupButton'),
      dateInput: page.locator('#ctl00_ContentPlaceHolder1_RadDatePickerEstimateDate_dateInput'),
      calendarTable: page.locator('table#ctl00_ContentPlaceHolder1_RadDatePickerEstimateDate_calendar_Top'),
      rescheduleButton: page.locator('#ctl00_ContentPlaceHolder1_Button1'),
    };

    // --- Purchase Order Grid & Reset ---
    this.purchaseOrderGrid = page.locator('#ctl00_ContentPlaceHolder1_gvPurchaseOrder');
    this.poSearchBox = page.locator('#ctl00_ContentPlaceHolder1_gvPurchaseOrder_ctl00_ctl02_ctl03_FilterTextBox_PONumber');
    this.convertPOToWOButton = page.locator('#ctl00_ContentPlaceHolder1_btnreset');

    // --- Scheduler & Edit Modal ---
    this.schedulerIcon = page.locator('#ctl00_ContentPlaceHolder1_imgJobGantchart');
    this.userTypeDropdown = page.locator('#ctl00_ContentPlaceHolder1_ddlUserType');
    this.assigneeDropdown = page.locator('#ctl00_ContentPlaceHolder1_lsbUser');
  }

  // ================= ACTIONS =================

  async openWorkOrderPurchaseOrder() {
    await this.workOrderPoLink.click();
    await this.page.waitForLoadState('networkidle');
    await this.toolbar.convertEstimate.waitFor({ state: 'visible' });
  }

  // --- Workflow: Create New Work Order ---

  async createNewWorkOrder(data) {
    await this.toolbar.createNew.click();
    await this.waitForAjax(); // Wait for postback to complete before form appears
    await this.createWOContainer.waitFor({ state: 'visible', timeout: 15000 });

    // Get the work order number as soon as the form is visible
    await this.woNumberLabel.waitFor({ state: 'visible', timeout: 10000 });
    const workOrderNumber = await this.woNumberLabel.textContent();

    if (data.categoryCode) await this.categoryCodeInput.fill(data.categoryCode);
    if (data.summary) await this.summaryInput.fill(data.summary);
    if (data.budgetHoursOverride) await this.budgetHoursInput.fill(data.budgetHoursOverride);
    if (data.percentComplete) await this.percentCompleteInput.fill(data.percentComplete);

    if (data.userType) {
      await this.userTypeDropdown.selectOption({ label: data.userType });
      await this.waitForAjax();
    }

    if (data.assignee) {
      await this.assigneeInput.click();
      await this.page.waitForTimeout(300);
      
      await this.assigneeInput.pressSequentially(data.assignee, { delay: 50 });
      await this.page.waitForTimeout(500);

      await this.assigneeOptions.first().waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
      
      const count = await this.assigneeOptions.count();
      let foundOption = false;
      
      for (let i = 0; i < count; i++) {
        const text = (await this.assigneeOptions.nth(i).textContent()).trim();
        if (text === data.assignee.trim()) {
          await this.assigneeOptions.nth(i).click();
          foundOption = true;
          await this.page.waitForTimeout(300);
          break;
        }
      }

      if (!foundOption) {
        const partialMatch = this.assigneeOptions.filter({ hasText: new RegExp(data.assignee.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') });
        const partialCount = await partialMatch.count();
        if (partialCount > 0) {
          await partialMatch.first().click();
          await this.page.waitForTimeout(300);
        } else {
          throw new Error(`Could not find assignee "${data.assignee}" in the list`);
        }
      }
    }

    if (data.comments) await this.commentsInput.fill(data.comments);

    await this.saveWOBtn.click();
    await this.waitForAjax(); 

    return workOrderNumber.trim();
  }

  // --- Workflow: Milestones ---

  async addMilestone(data) {
    await this.toolbar.addMilestone.click();

    // Ensure iframe contents are loaded
    await this.milestoneForm.saveBtn.waitFor({ state: 'visible', timeout: 15000 });

    if (data.userType) {
      await this.milestoneForm.assigneeTypeArrow.click();
      await this.milestoneForm.assigneeTypeDropdown
        .locator('.rcbItem', { hasText: data.userType })
        .click();
    }

    await this.milestoneForm.employeeList.waitFor({ state: 'visible' });
    await this.milestoneForm.employeeList.click();

    await this.milestoneForm.description.fill(data.description);
    await this.milestoneForm.startDate.fill(data.estimatedStartDate);
    await this.milestoneForm.endDate.fill(data.estimatedDueDate);

    const milestoneNum = await this.milestoneForm.numberLabel.innerText();

    await this.milestoneForm.saveBtn.click();
    await this.page.waitForLoadState('networkidle');

    return milestoneNum;
  }

  // --- Workflow: Reschedule ---

  async rescheduleWorkOrder(daysOffset = 7) {
    await this.rescheduleButton.click();
    await this.rescheduleModal.datePickerPopupButton.click();

    // Get current date and calculate target date
    const currentDateValue = await this.rescheduleModal.dateInput.inputValue();
    const currentDate = new Date(currentDateValue);
    const futureDate = new Date(currentDate);
    futureDate.setDate(futureDate.getDate() + daysOffset);
    const dayToSelect = futureDate.getDate();

    // Click the target date
    await this.rescheduleModal.calendarTable.locator(`td:has-text("${dayToSelect}") a`).click();

    // Submit reschedule
    await this.rescheduleModal.rescheduleButton.click();
    await this.waitForAjax();
  }

  // --- Workflow: Delete ---

  async deleteWorkOrder(woNumber) {
    await this.searchBox.click();
    await this.searchBox.fill(woNumber);
    await this.page.keyboard.press('Enter');
    const grid = this.page.locator('#ctl00_ContentPlaceHolder1_gvWorkOrder');
    const resultCell = grid.getByText(woNumber);
    await resultCell.waitFor({ state: 'visible', timeout: 10000 });

    // Click the checkbox
    const checkbox = this.page.locator(
      '#ctl00_ContentPlaceHolder1_gvWorkOrder_ctl00_ctl04_SelectColumnSelectCheckBox',
    );
    await checkbox.check();

    // Click delete button
    await this.toolbar.deleteWO.click();

    // Wait for confirm dialog and click confirm
    const confirmButton = this.page.locator('[id^="confirm"] .confirmButton input');
    await confirmButton.waitFor({ state: 'visible', timeout: 5000 });
    await confirmButton.click();

    await this.page.waitForLoadState('networkidle');
  }

  // --- Search & Verify ---

  async searchForWorkOrder(woNumber) {
    await this.searchBox.click();
    await this.searchBox.fill(woNumber);
    await this.searchBox.press('Enter');
    await this.waitForAjax(); // Critical: Wait for grid to filter
  }

  /**
   * Verifies that the entry number appears in any visible row of the grid after search/filter.
   * @param {string} entryNumber - The work order or milestone number to verify.
   */
  async verifyGridEntry(entryNumber) {
    await this.searchForWorkOrder(entryNumber);
    await this.waitForAjax();
    await this.waitForAjax();
    await this.page
      .locator('#ctl00_ContentPlaceHolder1_gvWorkOrder_ctl00')
      .waitFor({ state: 'visible' });
    await this.page.waitForTimeout(5000);
    const rows = await this.page.locator('#ctl00_ContentPlaceHolder1_gvWorkOrder_ctl00 tr.rgRow').all();
    if (!rows || rows.length === 0) {
      throw new Error('Grid verification failed: No data rows found.');
    }
    let found = false;
    for (const row of rows) {
      const numberCell = await row.locator('td:nth-child(3)').first();
      const cellText = (await numberCell.textContent()).trim();
      if (cellText === entryNumber) {
        found = true;
        break;
      }
    }
    if (!found) {
      throw new Error(
        `Grid verification failed: Entry number '${entryNumber}' is not found in any visible row.`,
      );
    }
    return true;
  }

  async selectWorkOrderCheckbox(workOrderNumber) {
    await this.searchForWorkOrder(workOrderNumber);
    await this.waitForAjax();
    const workOrderCell = this.grid.getByText(workOrderNumber).first();
    await workOrderCell.click();
    await this.waitForAjax();
  }

  async clearSearchAndRefresh() {
    await this.searchBox.click();
    await this.searchBox.clear();
    await this.page.keyboard.press('Enter');
    await this.waitForAjax();
    await this.page.waitForTimeout(1000);
  }

  async workOrderNotFoundInGrid(workOrderNumber) {
    await this.searchForWorkOrder(workOrderNumber);
    await this.waitForAjax();
    const grid = this.page.locator('#ctl00_ContentPlaceHolder1_gvWorkOrder');
    const resultCell = grid.getByText(workOrderNumber);
    const isHidden = await resultCell.isHidden();
    return isHidden; // Returns true if WO is not found (hidden/not visible)
  }

  async verifyWorkOrderDeleted(workOrderNumber, expect) {
    await this.searchBox.click();
    await this.searchBox.fill(workOrderNumber);
    await this.searchBox.press('Enter');
    await this.waitForAjax();

    const resultCell = this.grid.getByText(workOrderNumber);
    await expect(resultCell).toBeHidden();
  }

  /**
   * Gets the estimated start date for a work order from the grid
   * @param {string} workOrderNumber - The work order number to search for
   * @returns {Promise<string>} The estimated start date (e.g., "4/29/2026 12:00:00 AM")
   */
  async getEstimatedStartDateFromGrid(workOrderNumber) {
    await this.searchForWorkOrder(workOrderNumber);
    await this.waitForAjax();
    await this.page.waitForTimeout(2000); // Wait for grid update

    const rows = this.page.locator('#ctl00_ContentPlaceHolder1_gvWorkOrder_ctl00 tr.rgRow');
    const rowCount = await rows.count();
    
    for (let i = 0; i < rowCount; i++) {
      const row = rows.nth(i);
      const numberCell = row.locator('td:nth-child(3)').first();
      const cellText = (await numberCell.textContent()).trim();
      if (cellText === workOrderNumber) {
        // Estimated Start Date is in column 14 (td:nth-child(14))
        const dateCell = row.locator('td:nth-child(14)').first();
        const dateText = (await dateCell.textContent()).trim();
        return dateText;
      }
    }
    throw new Error(`Work order ${workOrderNumber} not found in grid`);
  }

  // --- Other Methods (Preserved) ---

  async openSchedulerAndGetJobLabel(jobNumber) {
    await this.toolbar.scheduler.click();
    await this.page.waitForLoadState('networkidle');
    return this.page.getByText(`Job Number: ${jobNumber}`);
  }

  async backToWorkFromScheduler() {
    await this.backToWorkFromSchedulerLink.waitFor({ state: 'visible', timeout: 10000 });
    await this.backToWorkFromSchedulerLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async exportInvoicesWorkflow() {
    await this.toolbar.addEstimate.click();
    await this.page.waitForLoadState('networkidle');
    await this.exportInvoicesButton.waitFor({ state: 'visible' });
    const downloadPromise = this.page.waitForEvent('download');
    await this.exportInvoicesButton.click();
    const download = await downloadPromise;
    await this.backToWorkOrderButton.click();
    return download;
  }

  async openScheduler() {
    await this.scheduleWorkOrderButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.scheduleWorkOrderButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async convertEstimateToWorkOrder(workOrderDate) {
    await this.toolbar.convertEstimate.click();
    await this.autoGenModal.waitFor({ state: 'visible', timeout: 10000 });

    if (await this.includeOverheadCheckbox.isVisible()) {
      if (!(await this.includeOverheadCheckbox.isChecked())) {
        await this.includeOverheadCheckbox.check();
      }
    }
    await this.selectEstimateFromDropdown();
    await this.waitForAjax();
    await this.workOrderDatePicker.fill(workOrderDate);
    await this.generateWorkOrderButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.page.waitForTimeout(500); 
    await this.generateWorkOrderButton.click();
    await this.waitForAjax();
    await this.autoGenModal.waitFor({ state: 'hidden', timeout: 15000 });
  }

  async selectEstimateFromDropdown() {
    try {
      await this.estimateDropdown.waitFor({ state: 'visible', timeout: 10000 });
      const options = this.estimateDropdown.locator('option');
      if ((await options.count()) > 1) {
        const val = await options.nth(1).getAttribute('value');
        await this.estimateDropdown.selectOption(val);
      }
    } catch (error) {
      console.warn('Estimate dropdown interaction failed:', error);
    }
  }

  async getNotificationStatus() {
    if (!(await this.notificationCompletedIcon.isVisible())) {
      await this.notificationsButton.click();
    }
    return this.notificationCompletedIcon;
  }

  async verifyNotificationCompleted(expect) {
    // Existing logic preserved...
    await this.notificationsButton.waitFor({ state: 'visible', timeout: 2000 });
    try {
      if (await this.modalOverlay.isVisible({ timeout: 1000 })) {
        if (await this.closeButton.first().isVisible({ timeout: 1000 })) {
          await this.closeButton.first().click();
        } else {
          await this.page.keyboard.press('Escape');
        }
      }
    } catch {
      // Intentionally ignored
    }

    await this.notificationsButton.click({ timeout: 50000 });
    await this.notificationCompletedIcon.waitFor({ state: 'visible', timeout: 10000 });

    // Polling logic preserved...
    const maxAttempts = 10;
    for (let i = 0; i < maxAttempts; i++) {
      if (await this.notificationCompletedIcon.isVisible()) {
        if ((await this.notificationCompletedIcon.getAttribute('title')) === 'Completed') break;
      }
      if (i < maxAttempts - 1) {
        await this.notificationsButton.click();
        await new Promise((resolve) => setTimeout(resolve, 500));
        await this.notificationsButton.click();
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }
    await expect.soft(this.notificationCompletedIcon).toHaveAttribute('title', 'Completed');
  }

  async checkIncludeOverhead() {
    try {
      await this.includeOverheadCheckbox.waitFor({ state: 'visible', timeout: 10000 });
      if (!(await this.includeOverheadCheckbox.isChecked()))
        await this.includeOverheadCheckbox.check();
    } catch {
      console.warn('Include Overhead checkbox not found');
    }
  }

  async clickConvertEstimateToWorkOrder() {
    await this.convertEstimateToWorkOrderButton.click();
    await this.waitForAjax();
    await this.autoGenModal.waitFor({ state: 'visible', timeout: 20000 });
  }

  async fillWorkOrderDate(date) {
    await this.workOrderDatePicker.fill(date);
  }
  async clickGenerateWorkOrder() {
    await this.generateWorkOrderButton.click();
    await this.waitForAjax();
    await this.autoGenModal.waitFor({ state: 'hidden', timeout: 10000 });
  }

  async convertWorkOrderToPurchaseOrder(workOrderNumber) {
    await this.convertToPOButton.click();
    await this.waitForAjax();
    await this.page.waitForTimeout(3000); // Wait for conversion to complete
    // Refresh the page to reload the grid with updated data
    await this.page.reload();
    await this.waitForAjax();
    await this.page.waitForTimeout(2000);
  }

  async searchPurchaseOrderByWorkOrder(workOrderNumber) {
    // Search by work order number 
    const woSearchBox = this.page.locator('#ctl00_ContentPlaceHolder1_gvPurchaseOrder_ctl00_ctl02_ctl03_FilterTextBox_WorkOrderNumber');
    await woSearchBox.click();
    await woSearchBox.fill(workOrderNumber);
    await this.page.keyboard.press('Enter');
    await this.waitForAjax();
    await this.page.waitForTimeout(1500);
  }

  async selectPurchaseOrderCheckbox(poNumber) {
    // Search for the PO
    await this.searchPurchaseOrder(poNumber);
    
    // Find and click the checkbox for the PO row
    const poCell = this.purchaseOrderGrid.getByText(poNumber).first();
    const poRow = poCell.locator('..').first();
    const checkbox = poRow.locator('input[type="checkbox"]').first();
    await checkbox.check();
    await this.waitForAjax();
  }

  async convertPurchaseOrderToWorkOrder() {
    await this.convertPOToWOButton.click();
    await this.waitForAjax();
    await this.page.waitForTimeout(2000); // Wait for conversion to complete
    await this.page.reload();
    await this.waitForAjax();
  }

  async doubleClickFirstWorkOrder() {
    await this.page.waitForLoadState('networkidle');
    const schedulerViewDropdown = this.page.locator('#SchedulerViewDropDownList');
    await schedulerViewDropdown.waitFor({ state: 'visible', timeout: 20000 });

    // Strategy 1: Text elements matching WO pattern (e.g. WO0001)
    const woTextLocator = this.page.locator('text=/WO\\d+/');
    // Strategy 2: DayPilot event containers with WO text
    const eventInnerWithWO = this.page.locator('[class*="event_inner"]').filter({ hasText: /WO\d+/ });
    // Strategy 3: Generic DayPilot event elements
    const eventElements = this.page.locator('[class*="scheduler_default_event_inner"], [class*="event_inner"]');

    let woElements = null;
    let woCount = 0;

    // Strategy 1: Wait for WO text elements to appear
    try {
      await woTextLocator.first().waitFor({ state: 'visible', timeout: 30000 });
      woCount = await woTextLocator.count();
      woElements = woTextLocator;
    } catch {
      // Strategy 1 unsuccessful, attempt next strategy
    }

    // Strategy 2: If text elements not found, try event containers
    if (!woElements) {
      try {
        await eventInnerWithWO.first().waitFor({ state: 'visible', timeout: 10000 });
        woCount = await eventInnerWithWO.count();
        woElements = eventInnerWithWO;
      } catch {
        // Strategy 2 unsuccessful, attempt next strategy
      }
    }

    // Strategy 3: If event containers not found, try generic event elements
    if (!woElements) {
      try {
        await eventElements.first().waitFor({ state: 'visible', timeout: 10000 });
        woCount = await eventElements.count();
        woElements = eventElements;
      } catch {
        // All locator strategies exhausted
      }
    }

    // If any work order elements were located, double-click the first one
    if (woElements && woCount > 0) {
      const firstWO = woElements.first();
      await firstWO.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await firstWO.dblclick({ force: true });

      // Double-clicking work order event navigates to EditWorkOrder.aspx (full page navigation)
      await this.page.waitForURL(/EditWorkOrder\.aspx/, { timeout: 20000 });
      await this.page.waitForLoadState('networkidle');
    } else {
      throw new Error('No work order elements found in scheduler');
    }
  }

  async doubleClickWorkOrderAtIndex(index = 0) {
    // Wait for scheduler page to fully load
    await this.page.waitForLoadState('networkidle');
    
    // Wait for scheduler to be ready (check for work order elements first)
    const woTextLocator = this.page.locator('text=/WO\\d+/');
    await woTextLocator.first().waitFor({ state: 'visible', timeout: 30000 });

    const woCount = await woTextLocator.count();
    if (index >= woCount) {
      throw new Error(`Work order index ${index} out of bounds, found ${woCount} elements`);
    }

    const woElement = woTextLocator.nth(index);
    await woElement.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(500);
    await woElement.dblclick({ force: true });

    // Double-clicking navigates to EditWorkOrder.aspx (full page navigation)
    await this.page.waitForURL(/EditWorkOrder\.aspx/, { timeout: 20000 });
    await this.page.waitForLoadState('networkidle');
  }

  async navigateBackToScheduler() {
    // Click the "Back to Scheduler" link on EditWorkOrder.aspx page
    await this.backToSchedulerLink.waitFor({ state: 'visible', timeout: 10000 });
    await this.backToSchedulerLink.click();
    
    // Wait for navigation to scheduler page
    await this.page.waitForURL(/jSchedular\.aspx/, { timeout: 20000 });
    await this.page.waitForLoadState('networkidle');
    
    // Wait for work orders to appear in the scheduler
    const woTextLocator = this.page.locator('text=/WO\\d+/');
    await woTextLocator.first().waitFor({ state: 'visible', timeout: 30000 });
    
    // Additional wait to ensure scheduler is fully interactive
    await this.page.waitForTimeout(2000);
  }

  async selectUserType(userType) {
    // On EditWorkOrder.aspx page (full page navigation from scheduler)
    await this.page.waitForLoadState('networkidle');

    // RadComboBox for assignee type
    const comboBox = this.page.locator('#ctl00_ContentPlaceHolder1_AssigneeTypeComboBox');
    await comboBox.waitFor({ state: 'visible', timeout: 15000 });

    // Get current value to check if already selected
    const currentValue = await comboBox.locator('input').inputValue().catch(() => '');

    if (currentValue.toLowerCase().includes(userType.toLowerCase())) {
      await this.page.waitForTimeout(1000);
      return;
    }

    // Click the dropdown button/arrow to open RadComboBox
    const comboBoxButton = comboBox.locator('button, [class*="rcbArrowCell"]').first();
    await comboBoxButton.waitFor({ state: 'visible', timeout: 10000 });
    await comboBoxButton.click();
    await this.page.waitForTimeout(1000);

    // Wait for dropdown options to appear
    const dropdownList = this.page.locator('#ctl00_ContentPlaceHolder1_AssigneeTypeComboBox_DropDown');
    await dropdownList.waitFor({ state: 'visible', timeout: 10000 });

    // Select the option using exact text matching (required for precise control)
    const exactOption = this.page.getByText(userType, { exact: true }).first();
    const partialOption = this.page.getByText(userType, { exact: false }).first();
    
    const exactVisible = await exactOption.isVisible({ timeout: 2000 }).catch(() => false);
    if (exactVisible) {
      await exactOption.click();
    } else {
      await partialOption.waitFor({ state: 'visible', timeout: 10000 });
      await partialOption.click();
    }
    
    // Wait for AJAX to complete after user type change
    await this.waitForAjax();
    await this.page.waitForTimeout(3000); 
  }

  async selectFirstAssignee() {
    // Access the assignee RadComboBox on EditWorkOrder.aspx page
    const assigneeComboBox = this.page.locator('#ctl00_ContentPlaceHolder1_AsigneeRadComboBox');
    await assigneeComboBox.waitFor({ state: 'visible', timeout: 15000 });

    // Click the dropdown button/arrow to open RadComboBox
    const comboBoxButton = assigneeComboBox.locator('button, [class*="rcbArrowCell"]').first();
    await comboBoxButton.waitFor({ state: 'visible', timeout: 10000 });
    await comboBoxButton.click();
    await this.page.waitForTimeout(1000);

    // Wait for dropdown list to appear (use specific ID to avoid strict mode violation)
    const dropdownList = this.page.locator('#ctl00_ContentPlaceHolder1_AsigneeRadComboBox_DropDown');
    await dropdownList.waitFor({ state: 'visible', timeout: 10000 });

    // Select the first assignee item (skips the placeholder item at index 0)
    const dropdownItems = this.page.locator('[id*="AsigneeRadComboBox_DropDown"] .rcbItem');
    const itemCount = await dropdownItems.count();

    if (itemCount === 0) {
      throw new Error('No assignees available in the dropdown for the selected user type');
    }

    // Get the first item text to check if it's a placeholder
    const firstItemText = await dropdownItems.first().textContent();

    // If first item is a placeholder (e.g., "Select"), use the second item; otherwise use the first
    if (firstItemText.toLowerCase().includes('select') && itemCount > 1) {
      await dropdownItems.nth(1).click();
    } else {
      await dropdownItems.first().click();
    }

    await this.page.waitForTimeout(500);
    await this.waitForAjax();
  }

  async saveWorkOrderInScheduler() {
    // Click the save button on EditWorkOrder.aspx page
    const saveButton = this.page.locator('#ctl00_ContentPlaceHolder1_ButtonSave');
    await saveButton.waitFor({ state: 'visible', timeout: 10000 });
    await saveButton.click();
    await this.waitForAjax();
    await this.page.waitForTimeout(2000);
  }

  async checkSchedulingConflictModal() {
    try {
      // After selecting assignee, the conflict may appear as:
      // 1. A RadWindow iframe popup on the EditWorkOrder page
      // 2. A visible element/label directly on the page

      // Strategy 1: Check for conflict text directly on the page
      const pageConflictText = this.page.getByText('already booked at this time', { exact: false });
      const pageConflictVisible = await pageConflictText.isVisible({ timeout: 3000 }).catch(() => false);
      if (pageConflictVisible) {
        const message = await pageConflictText.textContent();
        return { hasConflict: true, message };
      }

      // Strategy 2: Check for conflict inside a RadWindow iframe popup
      const iframe = this.page.frameLocator('iframe[name*="RadWindow"]').first();
      const iframeConflictText = iframe.locator('text=/already booked at this time/');
      await iframeConflictText.waitFor({ state: 'visible', timeout: 8000 });
      const message = await iframeConflictText.textContent();
      return { hasConflict: true, message };
    } catch {
      return { hasConflict: false, message: '' };
    }
  }

  async closeSchedulingConflictModal() {
    // Try closing via close button, OK button, or Escape
    try {
      const closeButton = this.page.locator('.rwCloseButton, button:has-text("Close"), button:has-text("OK"), input[value="OK"]').first();
      if (await closeButton.isVisible({ timeout: 2000 })) {
        await closeButton.click();
      } else {
        await this.page.keyboard.press('Escape');
      }
    } catch {
      await this.page.keyboard.press('Escape');
    }
    await this.page.waitForTimeout(1000);
  }

  async selectWorkOrderByNumber(workOrderNumber) {
    // Search for the work order
    await this.searchBox.click();
    await this.searchBox.fill(workOrderNumber);
    await this.page.keyboard.press('Enter');
    
    // Wait for grid to filter and show the result
    await this.waitForAjax();
    await this.page.waitForTimeout(2000);
    
    // Find the work order row by number
    const workOrderCell = this.grid.getByText(workOrderNumber).first();
    await workOrderCell.waitFor({ state: 'visible', timeout: 10000 });
    
    // Get the parent row and check its checkbox to select it
    const row = workOrderCell.locator('xpath=ancestor::tr[1]');
    const checkbox = row.locator('input[type="checkbox"]').first();
    await checkbox.check();
    await this.waitForAjax();
    
    // Wait for toolbar buttons to be enabled after selection
    await this.page.waitForTimeout(3000);
  }

  async clickShareUnshareExternally() {
    // The Share/Unshare button triggers confirmMsg() which uses native browser confirm().
    // If user clicks OK, it proceeds with __doPostBack to toggle the external status.
    // We MUST register a dialog handler BEFORE the click to accept the confirm dialog.
    // IMPORTANT: Do NOT use force:true — it bypasses the onclick handler and prevent the confirm dialog.
    const shareButton = this.toolbar.shareUnshareExternally;
    
    // Wait for button to be visible and ready
    await shareButton.waitFor({ state: 'visible', timeout: 10000 });
    await shareButton.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(500);
    
    // Set up dialog handler BEFORE clicking — accept the confirm dialog
    this.page.once('dialog', async (dialog) => {
      await dialog.accept();
    });
    
    // Click the button WITHOUT force:true so the onclick handler (confirmMsg) fires properly
    await shareButton.click();
    
    // Wait for the postback triggered by confirm acceptance to complete
    await this.page.waitForTimeout(3000);
    await this.waitForAjax();
  }

  async confirmShareUnshareMessage() {
    // Dialog is already handled in clickShareUnshareExternally via page.once('dialog')
    // Just wait for the server to process and the grid to refresh
    await this.waitForAjax();
    
    // Ensure the grid is visible after the confirmation
    await this.grid.waitFor({ state: 'visible', timeout: 10000 });
    
    // Wait for grid to refresh with updated data
    await this.waitForAjax();
    await this.page.waitForTimeout(2000);
  }

  async getExternalStatusByWorkOrderNumber(workOrderNumber) {
    // Clear any existing search filter and search for the specific work order
    await this.searchBox.click();
    await this.searchBox.clear();
    await this.searchBox.fill(workOrderNumber);
    await this.page.keyboard.press('Enter');
    
    // Wait for grid to filter and show the result
    await this.waitForAjax();
    await this.page.waitForTimeout(2000);
    
    // Wait for grid to refresh and render new data
    await this.grid.waitFor({ state: 'visible', timeout: 10000 });
    await this.waitForAjax();
    
    // Find the work order row by number
    const workOrderCell = this.grid.getByText(workOrderNumber).first();
    await workOrderCell.waitFor({ state: 'visible', timeout: 10000 });
    
    // Get the parent row
    const row = workOrderCell.locator('xpath=ancestor::tr[1]');
    
    // The External? column is at index 6 in the grid row 
    const cells = row.locator('td');
    const externalCell = cells.nth(6);
    const externalValue = await externalCell.textContent();
    
    return externalValue.trim(); // Returns "Yes" or "No"
  }
}

