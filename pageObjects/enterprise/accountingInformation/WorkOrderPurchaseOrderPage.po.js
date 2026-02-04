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
    this.exportInvoicesButton = page.locator(
      '#ctl00_ContentPlaceHolder1_gvInvoice_ctl00_ctl02_ctl00_ExportToExcelButton',
    );
    this.backToWorkOrderButton = page.locator('#ctl00_ContentPlaceHolder1_btnWorkOrder');
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

    if (data.categoryCode) await this.categoryCodeInput.fill(data.categoryCode);
    if (data.summary) await this.summaryInput.fill(data.summary);
    if (data.budgetHoursOverride) await this.budgetHoursInput.fill(data.budgetHoursOverride);
    if (data.percentComplete) await this.percentCompleteInput.fill(data.percentComplete);

    if (data.userType) {
      await this.userTypeDropdown.selectOption({ label: data.userType });
      await this.waitForAjax(); // Dropdown change might trigger postback
    }

    if (data.assignee) {
      await this.assigneeInput.click();
      await this.assigneeInput.pressSequentially(data.assignee, { delay: 100 });

      // Improved: robust wait for Telerik autocomplete list
      const assigneeOption = this.page
        .locator('.rlbList .rlbItem .rlbText')
        .filter({ hasText: new RegExp(`^${data.assignee}$`, 'i') });

      await assigneeOption.first().waitFor({ state: 'visible', timeout: 10000 });
      await assigneeOption.first().click();
    }

    if (data.comments) await this.commentsInput.fill(data.comments);

    await this.saveWOBtn.click();
    await this.waitForAjax(); // Wait for grid reload

    return await this.woNumberLabel.innerText();
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

  // --- Workflow: Delete ---

  async deleteWorkOrder(woNumber) {
    // Search for the work order
    await this.searchBox.click();
    await this.searchBox.fill(woNumber);
    await this.page.keyboard.press('Enter');
    // Wait for the result to appear in the grid
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
    // Wait for AJAX loader to disappear
    await this.waitForAjax();
    // Wait for grid to be visible
    await this.page
      .locator('#ctl00_ContentPlaceHolder1_gvWorkOrder_ctl00')
      .waitFor({ state: 'visible' });
    // Wait 5 seconds to ensure grid is updated after search
    await this.page.waitForTimeout(5000);
    // Select all data rows in the grid
    const rows = await this.page.$$('#ctl00_ContentPlaceHolder1_gvWorkOrder_ctl00 tr.rgRow');
    if (!rows || rows.length === 0) {
      throw new Error('Grid verification failed: No data rows found.');
    }
    let found = false;
    for (const row of rows) {
      const numberCell = await row.$('td:nth-child(3)');
      const cellText = numberCell ? (await numberCell.textContent()).trim() : '';
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

  async verifyWorkOrderDeleted(workOrderNumber, expect) {
    await this.searchBox.click();
    await this.searchBox.fill(workOrderNumber);
    await this.searchBox.press('Enter');
    await this.waitForAjax();

    const resultCell = this.grid.getByText(workOrderNumber);
    await expect(resultCell).toBeHidden();
  }

  // --- Other Methods (Preserved) ---

  async openSchedulerAndGetJobLabel(jobNumber) {
    await this.toolbar.scheduler.click();
    await this.page.waitForLoadState('networkidle');
    return this.page.getByText(`Job Number: ${jobNumber}`);
  }

  async backToWorkFromScheduler() {
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

    // Wait for any AJAX after estimate selection
    await this.waitForAjax();

    await this.workOrderDatePicker.fill(workOrderDate);

    // Wait for button to be enabled before clicking
    await this.generateWorkOrderButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.page.waitForTimeout(500); // Brief wait for button state to update

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
}
