import path from 'path';
import fs from 'fs';
import { BasePage } from '../basePage/enterpriseBasePage.po.js';

export class UploadEstimatePage extends BasePage {
  constructor(page) {
    super(page);

    // --- PARENT PAGE LOCATORS ---
    this.uploadEstimateIcon = page.locator('div:nth-child(2)>a>.imgAccountingHeaderStyle');
    this.closeModalButton = page.locator('.rwCloseButton');

    // --- IFRAME SETUP ---
    this.modalIframeName = 'iframe[name="RadWindow_Common"]';
    this.iframe = page.frameLocator(this.modalIframeName);

    // --- IFRAME LOCATORS ---
    this.revisionRadioBtn = this.iframe.locator('#rdSupplement');
    this.overrideAmountInput = this.iframe.locator('#EstimateOverrideAmountTextBox');

    // File Inputs
    this.dataEstimateInput = this.iframe.locator('input[type="file"][id*="fileXactimate"]');
    this.finalDraftInput = this.iframe.locator('input[type="file"][id*="FileUpload4"]');

    // Dropdown
    this.billToArrow = this.iframe.locator('#RadComboBox_BillToContact_Arrow');
    this.billToInput = this.iframe.locator('#RadComboBox_BillToContact_Input');

    // Estimate Type Dropdown
    this.estimateTypeArrow = this.iframe.locator('#DropDownList1_Arrow');
    this.estimateTypeDropdown = this.iframe.locator('#DropDownList1_DropDown');

    this.notesInput = this.iframe.locator('#Notes');
    this.descriptionInput = this.iframe.locator('#TextBox1');
    this.uploadButton = this.iframe.locator('#btnUploadEstimate');

    this.estimatesDataPath = path.resolve('testData', 'enterprise', 'estimates');

    // Notification
    this.dashNotificationBar = page.locator('.dashNotificationBarDesc');
  }

  resolveFilePath(fileName) {
    const filePath = path.resolve(this.estimatesDataPath, fileName);
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    return filePath;
  }

  async openUploadEstimateModal() {
    await this.page.locator('#AccountingHeaderLinkPanel').waitFor({ state: 'visible' });
    await this.uploadEstimateIcon.click();
    await this.page.locator(this.modalIframeName).waitFor({ state: 'visible', timeout: 15000 });

    // Initialize dynamic locators
    this.normalXmlRadioBtn = this.iframe.locator('#NormalEstimatePdf_RadioButton');
    this.roughDraftRadioBtn = this.iframe.locator('#RoughDraftEstimatePdf_RadioButton');
    this.originalRadioBtn = this.iframe.locator('#rdOriginal, input[id*="Original"]').first();
    this.revisionRadioBtn = this.iframe.locator('#rdSupplement, input[id*="Revision"]').first();
    await this.overrideAmountInput.waitFor({ state: 'visible', timeout: 10000 });
  }

  async hasMainEstimate() {
    // Check visibility first with minimal timeout, then enabled state
    const revisionVisible = await this.revisionRadioBtn.isVisible({ timeout: 500 }).catch(() => false);
    let revisionEnabled = false;
    if (revisionVisible) {
      revisionEnabled = await this.revisionRadioBtn.isEnabled().catch(() => false);
    }

    const originalVisible = await this.originalRadioBtn.isVisible({ timeout: 500 }).catch(() => false);
    let originalEnabled = false;
    if (originalVisible) {
      originalEnabled = await this.originalRadioBtn.isEnabled().catch(() => false);
    }

    if (revisionVisible && revisionEnabled) {
      return true;
    }

    if (originalEnabled && !revisionEnabled) {
      return false;
    }

    return revisionVisible;
  }

  async selectEstimateOptionBasedOnJobState() {
    const jobHasMainEstimate = await this.hasMainEstimate();

    if (jobHasMainEstimate) {
      const isRevisionVisible = await this.revisionRadioBtn.isVisible({ timeout: 500 }).catch(() => false);
      let isRevisionEnabled = false;
      if (isRevisionVisible) {
        isRevisionEnabled = await this.revisionRadioBtn.isEnabled().catch(() => false);
      }
      
      if (isRevisionVisible && isRevisionEnabled) {
        await this.revisionRadioBtn.click();
      }
      return 'revision';
    } else {
      const isOriginalVisible = await this.originalRadioBtn.isVisible({ timeout: 500 }).catch(() => false);
      let isOriginalEnabled = false;
      if (isOriginalVisible) {
        isOriginalEnabled = await this.originalRadioBtn.isEnabled().catch(() => false);
      }
      
      if (isOriginalVisible && isOriginalEnabled) {
        await this.originalRadioBtn.click();
      }
      return 'original';
    }
  }

  async selectBillToContact(index = 5) {
    await this.billToArrow.click();

    const dropdownList = this.iframe.locator('#RadComboBox_BillToContact_DropDown .rcbList');
    await dropdownList.waitFor({ state: 'visible', timeout: 10000 });
    await this.page.waitForLoadState('domcontentloaded').catch(() => {});

    const options = this.iframe.locator('#RadComboBox_BillToContact_DropDown .rcbList li');
    const optionCount = await options.count();

    if (optionCount === 0) {
      throw new Error('No options found in Bill To Contact dropdown');
    }

    const selectedIndex = Math.min(index - 1, optionCount - 1);
    const selectedOption = options.nth(selectedIndex);

    await selectedOption.click({ force: true });
    
    await this.billToInput.waitFor(
      async (el) => {
        const value = await el.inputValue();
        return value && value.trim().length > 0;
      },
      { timeout: 5000 },
    );
  }

  async selectEstimateType(estimateType = 'Main') {
    const isVisible = await this.estimateTypeArrow.isVisible().catch(() => false);
    
    if (!isVisible) {
      return;
    }

    await this.estimateTypeArrow.click();

    const dropdownList = this.iframe.locator('#DropDownList1_DropDown .rcbList');
    await dropdownList.waitFor({ state: 'visible', timeout: 10000 });

    const options = this.iframe.locator('#DropDownList1_DropDown .rcbList li');
    const optionCount = await options.count();

    if (optionCount === 0) {
      throw new Error('No options found in Estimate Type dropdown');
    }

    let selectedOption = null;
    for (let i = 0; i < optionCount; i++) {
      const option = options.nth(i);
      const text = await option.textContent();
      if (text && text.trim().toLowerCase().includes(estimateType.toLowerCase())) {
        selectedOption = option;
        break;
      }
    }

    if (!selectedOption) {
      selectedOption = options.first();
    }

    await selectedOption.click({ force: true });
    
    try {
      await dropdownList.waitFor({ state: 'hidden', timeout: 10000 });
    } catch (e) {
      await this.page.locator('body').click({ force: true });
      await this.page.waitForLoadState('domcontentloaded').catch(() => {});
    }
  }

  async uploadEstimate({
    overrideAmount,
    dataEstimateFile,
    dataEstimateFileRoughDraft,
    finalDraftFile,
    billToContactIndex,
    notes,
    description,
    estimateType = 'Main',
    jobNumber,
  }) {
    await this.openUploadEstimateModal();

    // PDF selection: Prefer Normal XML, fallback to Rough Draft
    let isRoughDraftSelected = false;
    
    // Check visibility FIRST with minimal timeout to avoid waiting on isEnabled for missing elements
    const isNormalXmlVisible = await this.normalXmlRadioBtn.isVisible({ timeout: 500 }).catch(() => false);
    let isNormalXmlEnabled = false;
    if (isNormalXmlVisible) {
      isNormalXmlEnabled = await this.normalXmlRadioBtn.isEnabled().catch(() => false);
    }
    
    if (isNormalXmlVisible && isNormalXmlEnabled) {
      await this.normalXmlRadioBtn.click();
    } else {
      const isRoughDraftVisible = await this.roughDraftRadioBtn.isVisible({ timeout: 500 }).catch(() => false);
      let isRoughDraftEnabled = false;
      if (isRoughDraftVisible) {
        isRoughDraftEnabled = await this.roughDraftRadioBtn.isEnabled().catch(() => false);
      }
      
      if (isRoughDraftVisible && isRoughDraftEnabled) {
        await this.roughDraftRadioBtn.click();
        isRoughDraftSelected = true;
      }
    }

    // Detect job state and select appropriate option
    const selectedOption = await this.selectEstimateOptionBasedOnJobState();

    // Select estimate type
    if (selectedOption === 'revision') {
      await this.selectEstimateType('Main');
    } else {
      await this.selectEstimateType(estimateType || 'Supplement');
    }

    await this.page.waitForLoadState('domcontentloaded');

    // Fill form fields
    if (overrideAmount) {
      await this.overrideAmountInput.fill(String(overrideAmount));
    }

    // Upload PDF files
    const pdfToUpload = isRoughDraftSelected && dataEstimateFileRoughDraft ? dataEstimateFileRoughDraft : dataEstimateFile;
    if (pdfToUpload) {
      await this.dataEstimateInput.setInputFiles(this.resolveFilePath(pdfToUpload));
    }
    
    if (finalDraftFile) {
      await this.finalDraftInput.setInputFiles(this.resolveFilePath(finalDraftFile));
    }

    await this.selectBillToContact(billToContactIndex);

    if (notes) {
      await this.notesInput.fill(notes);
    }

    if (description) {
      await this.descriptionInput.fill(description);
    }

    await this.uploadButton.click();
    await this.handleMassExceptionDialogs();
    await this.waitForUploadAndVerifyQueued();

    // Verify notification
    if (jobNumber) {
      await this.verifyEstimateParserNotification(jobNumber);
    }
  }
  

  /**
   * Wait for "uploading" message to appear, close modal when button is enabled, then capture notification text
   */
  async waitForUploadAndVerifyQueued() {
    // Step 1: Wait for uploading message to appear on modal
    const uploadingLabel = this.iframe.locator('#LabelText, [class*="Label"]').filter({
      hasText: /uploading|in progress|please wait/i,
    });

    await uploadingLabel.waitFor({ state: 'visible', timeout: 30000 }).catch(() => {
      throw new Error('Uploading message did not appear on modal');
    });

    //  Wait for close button to be ENABLED 
    const closeButton = this.page.locator('.rwCloseButton[title="Close"]').first();
    
    // Wait for button to be enabled by checking it's not disabled
    let isEnabled = false;
    let attempts = 0;
    const maxAttempts = 60; // 60 attempts * 1 second = up to 60 seconds
    
    while (!isEnabled && attempts < maxAttempts) {
      try {
        const isDisabled = await closeButton.evaluate(el => el.disabled || el.classList.contains('rpDisabled'));
        if (!isDisabled) {
          isEnabled = true;
        } else {
          attempts++;
          await this.page.waitForTimeout(1000); // Wait 1 second before next check
        }
      } catch (e) {
        attempts++;
        await this.page.waitForTimeout(1000);
      }
    }

    if (!isEnabled) {
      throw new Error(`Close button did not become enabled after ${maxAttempts} seconds`);
    }

    //  Click the close button
    await closeButton.click();

    // Wait for modal to close
    await this.page
      .locator(this.modalIframeName)
      .waitFor({ state: 'hidden', timeout: 10000 })
      .catch(() => {
        console.warn('Modal did not close within timeout');
      });
        await this.page.waitForTimeout(500);
  }

  /**
   * Verify estimate parser notification after upload
   * Checks for notification with job number and green "Completed" tick
   */
  async verifyEstimateParserNotification(jobNumber) {
    // Click notification icon
    const notificationIcon = this.page.locator('#ctl00_imageDashNotifications');
    await notificationIcon.click();

    // Wait for modal
    const notificationsModal = this.page.locator('#Dash_notifications');
    await notificationsModal.waitFor({ state: 'visible', timeout: 10000 });

    // Poll for notification with job number and "Completed" status
    const maxAttempts = 120; 
    
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const notificationRows = this.page.locator('td[class*="Notification_Summary_Data"]').filter({
        hasText: new RegExp(`Estimate Parser for Job Number:${jobNumber}`, 'i'),
      });

      const rowCount = await notificationRows.count();
      
      if (rowCount > 0) {
        // Check the first notification for "Completed" status
        const firstRow = notificationRows.first();
        const iconCell = firstRow.locator('xpath=following-sibling::td[1]');
        
        // Check for completed icon
        const completedIcon = iconCell.locator('img[title="Completed"]');
        const hasCompleted = await completedIcon.count() > 0;
        
        if (hasCompleted) {
          return true; // Success!
        }
        
        // Get current status for better error handling and robust waiting
        const icon = iconCell.locator('img').first();
        const iconCount = await icon.count();
        let status = '';
        if (iconCount > 0) {
          status = await icon.getAttribute('title');
        }

        if (status && (status.includes('Fail') || status.includes('Error'))) {
           throw new Error(`Notification for job ${jobNumber} failed - Status: ${status}`);
        }
      }

      // Refresh modal every 5 seconds (every 5 attempts since we wait 1s)
      if (attempt > 0 && attempt % 5 === 0) {
        await this.page.locator('body').click({ position: { x: 10, y: 10 } });
        await this.page.waitForTimeout(200);
        await notificationIcon.click();
        await notificationsModal.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
      }

      await this.page.waitForTimeout(1000);
    }
    
    throw new Error(`Notification for job ${jobNumber} did not complete after ${maxAttempts} attempts`);
  }

  /**
   * ROBUST HANDLER: Finds the correct iframe and targets the specific DATA table.
   * Scans all iframes to find the one containing the specific grid ID, then interacts with it.
   */
  async handleMassExceptionDialogs() {
    const uniqueGridSelector = 'table[id$="_CompliancExceptionGridView_ctl00"]';

    let targetFrame = null;

    // Scan frames for the specific data grid (try for ~30 seconds)
    for (let i = 0; i < 15; i++) {
      const frames = this.page.frames();
      for (const frame of frames) {
        const grid = frame.locator(uniqueGridSelector);
        if ((await grid.count()) > 0 && (await grid.isVisible())) {
          targetFrame = frame;
          break;
        }
      }
      if (targetFrame) break;
      await this.page.waitForLoadState('domcontentloaded');
    }

    if (!targetFrame) {
      return; // No exception dialog appeared, proceed.
    }

    // Loop to handle rows
    while (true) {
      const grid = targetFrame.locator(uniqueGridSelector);

      // If the grid is no longer visible, we are done
      if (!(await grid.isVisible())) {
        break;
      }

      // We use the grid locator to find rows within it
      const rows = grid.locator('tbody > tr[id*="ctl00__"]');
      const rowCount = await rows.count();

      for (let i = 0; i < rowCount; i++) {
        const row = rows.nth(i);

        // Dropdown Arrow
        const dropdownArrow = row.locator('a[id*="ReasonRadComboBox_Arrow"]');
        if (await dropdownArrow.isVisible()) {
          await dropdownArrow.click();

          // Telerik list is at root of frame
          const dropDownList = targetFrame.locator(
            '.RadComboBoxDropDown_PrimaryComboBox .rcbList li',
          );

          try {
            await dropDownList.first().waitFor({ state: 'visible', timeout: 5000 });
            const otherOption = dropDownList.filter({ hasText: 'Other' });

            if ((await otherOption.count()) > 0) {
              await otherOption.first().click();
            } else {
              await dropDownList.nth(1).click();
            }
            await dropDownList.first().waitFor({ state: 'hidden', timeout: 3000 });
          } catch {
            // Ignore dropdown errors to attempt saving anyway
          }
        }

        // Note Input
        const noteInput = row.locator('textarea[id*="NotesDetailRadTextBox"]');
        if (await noteInput.isVisible()) {
          await noteInput.fill('Automated Test Exception Note');
        }
      }

      // Click Save
      const saveBtn = targetFrame.locator(
        '#MassExceptionReasonControlForBackground1_SaveExceptionButton',
      );
      await saveBtn.click();

      // Wait for grid to disappear to confirm dialog closure
      await grid.waitFor({ state: 'hidden', timeout: 30000 });
      await this.page.waitForLoadState('domcontentloaded');
    }
  }
}
