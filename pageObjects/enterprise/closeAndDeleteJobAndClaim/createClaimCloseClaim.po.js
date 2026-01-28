export class CreateClaimCloseClaimPage {
  constructor(page) {
    this.page = page;

    // Compliance Task Tab locators
    this.selectAllCheckbox = page.locator(
      '#ctl00_ContentPlaceHolder1_dockJobTabs_C_ComplianceTasks_userControl_ComplianceManagerGridView_ctl00_ctl02_ctl02_SelectColumnSelectCheckBox',
    );

    this.rejectReasonDropdown = page.locator(
      '#ctl00_ContentPlaceHolder1_dockJobTabs_C_ComplianceTasks_userControl_ReviewStatusRadComboBox_Input',
    );

    this.rejectReasonOptions = page.locator(
      '#ctl00_ContentPlaceHolder1_dockJobTabs_C_ComplianceTasks_userControl_ReviewStatusRadComboBox_DropDown .rcbList .rcbItem',
    );

    this.rejectButton = page.locator(
      '#ctl00_ContentPlaceHolder1_dockJobTabs_C_ComplianceTasks_userControl_ReasonButton',
    );

    this.complianceTaskRows = page.locator(
      '#ctl00_ContentPlaceHolder1_dockJobTabs_C_ComplianceTasks_userControl_ComplianceManagerGridView_ctl00',
    );

    // Close Job locators
    this.closeJobButton = page.locator(
      '#DivisionActionsPanel button.buttonCore.primaryButton.divisionButtonStyle',
      { hasText: 'Close Job' },
    );

    this.modalWrapper = page.locator(
      '#RadWindowWrapper_ctl00_ContentPlaceHolder1_RadWindow_Common',
    );

    this.iframeSelector = 'iframe[name="RadWindow_Common"]';

    // Reopen Job locators
    this.reopenJobButton = page.locator(
      '#DivisionActionsPanel button.buttonCore.primaryButton.divisionButtonStyle',
      { hasText: 'Reopen Job' },
    );

    this.jobTabLinkPanel = page.locator('#JobTabLinkPanel');
  }

  async rejectAllComplianceTasks() {
    // Wait for Select All checkbox to be visible
    await this.selectAllCheckbox.waitFor({ state: 'visible', timeout: 15000 });

    // Click on Select All checkbox in compliance Tasks tab
    await this.selectAllCheckbox.click();

    // Click the Reject Reason dropdown to open it
    await this.rejectReasonDropdown.click();

    // Wait for the dropdown options to be visible
    await this.rejectReasonOptions.first().waitFor({ state: 'visible' });

    // Get the count of options
    const optionCount = await this.rejectReasonOptions.count();

    // Pick a random index except the first (so from 1 to optionCount-1)
    const randomIndex = Math.floor(Math.random() * (optionCount - 1)) + 1;

    // Click the random option
    await this.rejectReasonOptions.nth(randomIndex).click();

    // Click on Reject button and wait for compliance task to be rejected
    await this.rejectButton.click();

    // Wait for all rows to be removed (count to be one)
    await this.complianceTaskRows.waitFor({
      state: 'attached',
      timeout: 10000,
    });
    await this.page.reload();
    await this.page.waitForLoadState('networkidle');
  }

  async closeJob() {
    await this.closeJobButton.waitFor({ state: 'visible' });
    await this.closeJobButton.click();

    // Wait for modal wrapper
    await this.modalWrapper.waitFor({ state: 'visible', timeout: 20000 });

    // Check for required fields modal
    const requiredFieldsHeader = this.modalWrapper.locator('em', {
      hasText: 'Required Field(s) to Close',
    });
    if (await requiredFieldsHeader.isVisible({ timeout: 5000 })) {
      // Fill required fields in the iframe
      const requiredFieldsFrame = this.page.frame({
        name: 'RadWindow_Common',
      });
      if (requiredFieldsFrame) {
        // Example: Fill "Referred By" if present
        const referredByInput = requiredFieldsFrame.locator('input[name*="ReferredBy"]');
        if (await referredByInput.isVisible({ timeout: 5000 })) {
          await referredByInput.fill('Automated Test');
        }
        // Click "Close" button to submit required fields
        const closeButton = requiredFieldsFrame.locator('button:has-text("Close")');
        await closeButton.click();

        await this.modalWrapper.waitFor({ state: 'hidden', timeout: 10000 });

        // Wait for required fields modal to be hidden before proceeding
        await this.modalWrapper.waitFor({ state: 'hidden', timeout: 10000 });
      }
    }

    // Continue with normal close job flow
    const confirmationHeader = this.modalWrapper.locator('em', {
      hasText: 'Confirmation',
    });
    await confirmationHeader.waitFor({ state: 'visible', timeout: 10000 });

    await this.page.locator(this.iframeSelector).waitFor({ state: 'visible', timeout: 20000 });
    let modalFrame = null;
    for (let i = 0; i < 20; i++) {
      modalFrame = this.page.frame({ name: 'RadWindow_Common' });
      if (modalFrame) break;
      await this.page.waitForTimeout(1000);
    }
    if (!modalFrame) throw new Error('Modal frame not found');
    await this.page.waitForTimeout(3000);
    await modalFrame.waitForLoadState('domcontentloaded').catch(() => {});

    // Select a Provider reason for closing a job
    const reasonDropdownArrow = modalFrame.locator('#ReasonForClosingRadComboBox_Arrow');
    await reasonDropdownArrow.waitFor({ state: 'visible', timeout: 60000 });
    await reasonDropdownArrow.click();

    const reasonOptions = modalFrame.locator(
      '#ReasonForClosingRadComboBox_DropDown .rcbList .rcbItem',
    );
    await reasonOptions.first().waitFor({ state: 'visible', timeout: 10000 });
    const reasonOptionCount = await reasonOptions.count();
    const randomReasonIndex = Math.floor(Math.random() * (reasonOptionCount - 1)) + 1;
    await reasonOptions.nth(randomReasonIndex).click();

    // Select DPLS reason for closing a job
    const dplsReasonDropdownArrow = modalFrame.locator('#DplsReasonForClosingRadComboBox_Arrow');
    await dplsReasonDropdownArrow.waitFor({ state: 'visible', timeout: 10000 });
    await dplsReasonDropdownArrow.click();

    const dplsReasonOptions = modalFrame.locator(
      '#DplsReasonForClosingRadComboBox_DropDown .rcbList .rcbItem',
    );
    await dplsReasonOptions.first().waitFor({ state: 'visible', timeout: 10000 });
    const dplsReasonOptionCount = await dplsReasonOptions.count();
    const randomDplsReasonIndex = Math.floor(Math.random() * (dplsReasonOptionCount - 1)) + 1;
    await dplsReasonOptions.nth(randomDplsReasonIndex).click();

    // Click Close Job
    const modalCloseButton = modalFrame.locator(
      'input#CloseReopenButton.buttonCore.primaryButton[type="submit"][value="Close Job"]',
    );
    await modalCloseButton.waitFor({ state: 'visible', timeout: 10000 });
    await modalCloseButton.click();
  }

  async validateJobClosed() {
    // Assert Reopen Job button, shown after job is closed
    await this.reopenJobButton.waitFor({ state: 'visible' });

    // Wait for the main status panel to be visible
    await this.jobTabLinkPanel.waitFor({ state: 'visible', timeout: 10000 });

    // Locate the status span inside the panel
    const statusSpan = this.jobTabLinkPanel
      .locator('span.fontHeaderNormalLightBlue', { hasText: 'Status:' })
      .locator('xpath=following-sibling::span[contains(@class,"fontHeaderNormalGray")]');

    // Assert that the status is "Closed"
    await statusSpan.waitFor({ state: 'visible' });
    const statusText = await statusSpan.textContent();
    if (!statusText || !/Closed/i.test(statusText)) {
      throw new Error(`Expected status to be "Closed" but got "${statusText}"`);
    }
  }
}
