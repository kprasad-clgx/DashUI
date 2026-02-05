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
    this.roughDraftRadioBtn = this.iframe.locator('#RoughDraftEstimatePdf_RadioButton');
    await this.overrideAmountInput.waitFor({ state: 'visible', timeout: 10000 });
  }

  async selectBillToContact(index = 5) {
    // Click arrow to open dropdown
    await this.billToArrow.click();

    // Wait for dropdown list to be visible
    const dropdownList = this.iframe.locator('#RadComboBox_BillToContact_DropDown .rcbList');
    await dropdownList.waitFor({ state: 'visible', timeout: 10000 });

    // Give the dropdown a moment to stabilize
    await this.page.waitForLoadState('domcontentloaded').catch(() => {});

    // Get all options and select by index
    const options = this.iframe.locator('#RadComboBox_BillToContact_DropDown .rcbList li');
    const optionCount = await options.count();

    if (optionCount === 0) {
      throw new Error('[selectBillToContact] No options found in dropdown');
    }

    // Use the requested index, fallback to first if index is out of bounds
    const selectedIndex = Math.min(index - 1, optionCount - 1);
    const selectedOption = options.nth(selectedIndex);

    // Try to click directly without scrolling (more stable)
    try {
      await selectedOption.click({ force: true });
    } catch (e) {
      console.warn(
        '[selectBillToContact] Direct click failed, attempting alternative approach:',
        e.message,
      );
    }
    // Wait for selection to be confirmed
    await this.billToInput.waitFor(
      async (el) => {
        const value = await el.inputValue();
        return value && value.trim().length > 0;
      },
      { timeout: 5000 },
    );
  }

  async uploadEstimate({
    overrideAmount,
    dataEstimateFile,
    finalDraftFile,
    billToContactIndex,
    notes,
    description,
  }) {
    await this.openUploadEstimateModal();

    if (await this.roughDraftRadioBtn.isVisible()) {
      await this.roughDraftRadioBtn.click();
    }

    if (await this.revisionRadioBtn.isEnabled()) {
      await this.revisionRadioBtn.click();
      // Logic for supplemental dropdown
      const estTypeArrow = this.iframe.locator('#DropDownList1_Arrow');
      if (await estTypeArrow.isVisible()) {
        await estTypeArrow.click();
        const estTypeList = this.iframe.locator('#DropDownList1_DropDown .rcbList li');
        const supplementalOption = estTypeList.filter({ hasText: 'Supplemental 1' });

        if (await supplementalOption.isVisible()) {
          await supplementalOption.click();
        } else {
          await estTypeList.first().click();
        }
      }
    }

    if (overrideAmount) await this.overrideAmountInput.fill(String(overrideAmount));

    if (dataEstimateFile) {
      const p1 = this.resolveFilePath(dataEstimateFile);
      await this.dataEstimateInput.setInputFiles(p1);
    }

    if (finalDraftFile) {
      const p2 = this.resolveFilePath(finalDraftFile);
      await this.finalDraftInput.setInputFiles(p2);
    }

    await this.selectBillToContact(billToContactIndex);

    if (notes) await this.notesInput.fill(notes);
    if (description) await this.descriptionInput.fill(description);

    await this.uploadButton.click();

    // Handle Mass Exception Dialogs (Loop in case of multiples)
    await this.handleMassExceptionDialogs();

    // Wait for uploading message and close modal, then verify queued notification
    await this.waitForUploadAndVerifyQueued();
  }

  /**
   * Wait for "uploading" message to appear, close modal, then verify "queued" notification
   */
  async waitForUploadAndVerifyQueued() {
    // Step 1: Wait for uploading message to appear on modal
    const uploadingLabel = this.iframe.locator('#LabelText, [class*="Label"]').filter({
      hasText: /uploading|in progress|please wait/i,
    });

    await uploadingLabel.waitFor({ state: 'visible', timeout: 30000 }).catch(() => {
      throw new Error('Uploading message did not appear on modal');
    });

    // Step 2: Close the modal by clicking close button
    const closeButton = this.page.locator('.rwCloseButton[title="Close"]').first();
    const closeVisible = await closeButton.isVisible().catch(() => false);

    if (closeVisible) {
      await closeButton.click();
      // Wait for modal to close
      await this.page
        .locator(this.modalIframeName)
        .waitFor({ state: 'hidden', timeout: 10000 })
        .catch(() => {});
    } else {
      throw new Error('Close button not found on modal');
    }

    // Step 3: Verify "Estimate parser job has been queued" message in dash notification bar
    const notificationLocator = this.page.locator('text=/Estimate parser job has been queued/i');

    await notificationLocator.waitFor({ state: 'visible', timeout: 60000 });

    // If we reach here, the test passes - the notification is visible
  }

  /**
   * ROBUST HANDLER: Finds the correct iframe and targets the specific DATA table.
   * Scans all iframes to find the one containing the specific grid ID, then interacts with it.
   */
  async handleMassExceptionDialogs() {
    // Target only the DATA table ID (ends in _ctl00), ignoring Header/Pager tables.
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
