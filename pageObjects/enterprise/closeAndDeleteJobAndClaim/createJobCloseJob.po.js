import { expect } from '@playwright/test';
import { getRandomNumber } from '../../../utils/randomNumber.js';

export class CreateJobCloseJobPage {
  constructor(page) {
    this.page = page;
  }

  // Navigate to Create Job
  async clickCreateJobButton() {
    await expect(this.page.locator('#ctl00_UpdatePanelLastView')).toBeVisible();
    await this.page.locator('#ctl00_UpdatePanelLastView img[title="Create Job"]').click();
    await this.page.waitForLoadState('networkidle');
  }

  // Enter Job Name
  async createUniqueJobName(name) {
    const jobName = this.page.locator(
      '#ctl00_ContentPlaceHolder1_JobParentInformation_GenaralInfo_JobNameRadTextBox',
    );
    await expect(jobName).toBeVisible();
    await jobName.click();
    await jobName.fill(name);
  }

  // Select Loss Category by name
  async selectLossCategory(category) {
    const lossCategoryArrow = this.page.locator(
      '#ctl00_ContentPlaceHolder1_JobParentInformation_GenaralInfo_comboBox_LossCategory_Arrow',
    );
    await lossCategoryArrow.click();

    const categoryOption = this.page
      .locator('ul.rcbList > li', {
        hasText: category,
      })
      .first();
    await categoryOption.click();
  }

  // Select Loss Category - Random (Except First)
  async selectRandomLossCategoryExceptFirst() {
    const lossCategoryInput = this.page.locator(
      '#ctl00_ContentPlaceHolder1_JobParentInformation_GenaralInfo_comboBox_LossCategory_Arrow',
    );
    await lossCategoryInput.click();

    // Wait for dropdown to appear and options to load
    const options = this.page.locator(
      '#ctl00_ContentPlaceHolder1_JobParentInformation_GenaralInfo_comboBox_LossCategory_DropDown .rcbItem',
    );
    await expect(options.nth(1)).toBeVisible({ timeout: 5000 }); // Ensure at least the second option is loaded

    // Get count and select a random option except the first
    const count = await options.count();
    if (count <= 1) throw new Error('No selectable options in Loss Category dropdown.');

    const randomIndex = Math.floor(Math.random() * (count - 1)) + 1; // 1 to count-1
    await options.nth(randomIndex).click();
  }

  // Utility: Type text into an input field one character at a time, waiting after each keystroke
  async typeSequentially(inputLocator, text, delayMs = 300) {
    for (const char of text) {
      await inputLocator.type(char);
      await this.page.waitForTimeout(delayMs); // Wait for dropdown to update
    }
  }

  // Select Customer and wait for data to load
  async selectCustomer(customerName, expectedFirstName, expectedLastName) {
    const customerInput = this.page.locator(
      '#ctl00_ContentPlaceHolder1_JobParentInformation_DropDown_Customer_Input',
    );
    await expect(customerInput).toBeEnabled();
    await customerInput.click();

    // Type the actual customer name
    await this.typeSequentially(customerInput, expectedLastName, 300);

    // Wait for dropdown to appear
    const dropdown = this.page.locator(
      '#ctl00_ContentPlaceHolder1_JobParentInformation_DropDown_Customer_DropDown',
    );
    await expect(dropdown).toBeVisible({ timeout: 5000 });

    // Wait for dropdown options to be visible
    const dropdownOptions = dropdown.locator('ul.rcbList > li');
    await dropdownOptions.first().waitFor({ state: 'visible', timeout: 5000 });

    // Check if customer name is present and click on it
    const customerOption = dropdownOptions.filter({ hasText: new RegExp(customerName, 'i') });
    await expect(customerOption.first()).toBeVisible({ timeout: 5000 });
    await customerOption.first().click();

    // Wait for customer data to load
    const customerFirstName = this.page.locator(
      '#ctl00_ContentPlaceHolder1_JobParentInformation_TextBox_FirstName',
    );
    const customerLastName = this.page.locator(
      '#ctl00_ContentPlaceHolder1_JobParentInformation_TextBox_LastName',
    );

    await expect(customerFirstName).not.toHaveValue('First Name', { timeout: 10000 });
    await expect(customerFirstName).toHaveValue(expectedFirstName, { timeout: 10000 });
    await expect(customerLastName).toHaveValue(expectedLastName, { timeout: 10000 });
  }

  // Check "Same as Customer" checkbox and verify job address
  async checkSameAsCustomerAddress(expectedFirstName, expectedLastName) {
    const sameAsCustomerCheckbox = this.page.locator(
      '#ctl00_ContentPlaceHolder1_JobParentInformation_CheckBox_SameIndividualAddress',
    );
    await expect(sameAsCustomerCheckbox).toBeVisible();
    await sameAsCustomerCheckbox.click();

    // Verify job address data populated
    const jobAddressFirstName = this.page.locator(
      '#ctl00_ContentPlaceHolder1_JobParentInformation_TextBox_FirstNameLoss',
    );
    const jobAddressLastName = this.page.locator(
      '#ctl00_ContentPlaceHolder1_JobParentInformation_TextBox_LastNameLoss',
    );

    await expect(jobAddressFirstName).toHaveValue(expectedFirstName);
    await expect(jobAddressLastName).toHaveValue(expectedLastName);
  }

  // Policy information Start Date and Expiration Date only
  async selectLastMonthDateRangeAndFillPolicyDates() {
    const today = new Date();
    const lastMonth = new Date(today);
    lastMonth.setMonth(today.getMonth() - 1);
    const nextMonth = new Date(today);
    nextMonth.setMonth(today.getMonth() + 1);

    // Format: MM/D/YYYY (no leading zero for day)
    const formatDate = (date) => {
      const mm = date.getMonth() + 1;
      const d = date.getDate();
      const yyyy = date.getFullYear();
      return `${mm}/${d}/${yyyy}`;
    };

    const startDate = formatDate(lastMonth);
    const endDate = formatDate(nextMonth);

    await this.fillPolicyStartAndEndDates(startDate, endDate);
  }

  // Fill only policy start and end dates
  async fillPolicyStartAndEndDates(startDate, endDate) {
    const policyStartDateInput = this.page.locator(
      '#ctl00_ContentPlaceHolder1_JobParentInformation_DatePicker_PolicyStartDate_dateInput',
    );
    await expect(policyStartDateInput).toBeEnabled();
    await policyStartDateInput.fill(startDate);

    const policyEndDateInput = this.page.locator(
      '#ctl00_ContentPlaceHolder1_JobParentInformation_DatePicker_PolicyExpirationDate_dateInput',
    );
    await expect(policyEndDateInput).toBeEnabled();
    await policyEndDateInput.fill(endDate);
  }

  // Policy information input
  async fillPolicyInformation(claimNumber, fileNumber, policyNumber, yearBuilt) {
    // Generate random values for policy information
    claimNumber = claimNumber || getRandomNumber(1, 9999).toString();
    fileNumber = fileNumber || getRandomNumber(1, 9999).toString();
    policyNumber = policyNumber || getRandomNumber(1, 9999).toString();
    yearBuilt = yearBuilt || getRandomNumber(1900, 2025).toString();

    const claimNumberInput = this.page.locator(
      '#ctl00_ContentPlaceHolder1_JobParentInformation_TextBox_ClaimNumber',
    );
    await expect(claimNumberInput).toBeVisible();
    await claimNumberInput.fill(claimNumber);
    const fileNumberInput = this.page.locator(
      '#ctl00_ContentPlaceHolder1_JobParentInformation_TextBox_ExternalFileNumber',
    );
    await expect(fileNumberInput).toBeEnabled();
    await fileNumberInput.fill(fileNumber);

    const policyNumberInput = this.page.locator(
      '#ctl00_ContentPlaceHolder1_JobParentInformation_TextBox_PolicyNumber',
    );
    await expect(policyNumberInput).toBeEnabled();
    await policyNumberInput.fill(policyNumber);

    const yearBuiltInput = this.page.locator(
      '#ctl00_ContentPlaceHolder1_JobParentInformation_TextBox_Year',
    );
    await expect(yearBuiltInput).toBeEnabled();
    await yearBuiltInput.fill(yearBuilt);

    await this.selectLastMonthDateRangeAndFillPolicyDates();
  }

  // Check Water Mitigation checkbox
  async checkWaterMitigation() {
    const waterMitigationCheckbox = this.page.locator(
      '#ctl00_ContentPlaceHolder1_JobParentInformation_CheckBox_RequiredServices_0',
    );
    await expect(waterMitigationCheckbox).toBeVisible();
    await waterMitigationCheckbox.click();
  }

  // Fill Loss Description
  async fillLossDescription(lossDescription) {
    const lossDescriptionInput = this.page.locator(
      '#ctl00_ContentPlaceHolder1_JobParentInformation_TextBox_LossDescription',
    );
    await expect(lossDescriptionInput).toBeVisible();
    await lossDescriptionInput.fill(lossDescription);
  }

  // Save job and return job number
  async saveJobAndGetJobNumber() {
    const saveButton = this.page.locator(
      '#ctl00_ContentPlaceHolder1_JobParentInformation_Button_SaveAndGoToSlideBoardBottom_input',
    );
    await expect(saveButton).toBeVisible();
    await saveButton.click();

    await this.page.waitForLoadState('networkidle');

    // Wait for navigation and verify URL contains job identifier
    await expect(this.page).toHaveURL(/Job(Id|Number)/i, { timeout: 30000 });

    // Get the current URL and extract JobNumber
    const url = this.page.url();
    const jobNumberMatch = url.match(/JobNumber=([^&]+)/i);
    const jobNumber = jobNumberMatch ? jobNumberMatch[1] : null;

    // Refresh to exit error page
    await this.page.reload();
    await this.page.waitForLoadState('networkidle');

    return jobNumber;
  }

  // click on saveAndGotoSlideBoard
  async clickSaveBtnAndGoToSlideBoard() {
    const saveButton = this.page.locator(
      '#ctl00_ContentPlaceHolder1_JobParentInformation_Button_SaveAndGoToSlideBoardBottom_input',
    );
    await expect(saveButton).toBeVisible();
    await saveButton.click();

    await this.page.waitForLoadState('networkidle');
  }

  // Reject all compliance tasks
  async rejectAllComplianceTasks() {
    // Select All checkbox with robust retry for slow/flaky loading
    const selectAllCheckbox = this.page.locator(
      '#ctl00_ContentPlaceHolder1_dockJobTabs_C_ComplianceTasks_userControl_ComplianceManagerGridView_ctl00_ctl02_ctl02_SelectColumnSelectCheckBox',
    );
    let loaded = false;
    for (let i = 0; i < 10; i++) {
      try {
        await selectAllCheckbox.waitFor({ state: 'visible', timeout: 5000 });
        if (await selectAllCheckbox.isEnabled()) {
          await this.page.waitForLoadState('domcontentloaded');
          loaded = true;
          break;
        }
      } catch (e) {
        // ignore and retry
      }
    }
    if (!loaded) {
      throw new Error('Select All checkbox did not load after multiple retries.');
    }
    await selectAllCheckbox.click();

    // Select random reject reason
    const rejectReasonDropdown = this.page.locator(
      '#ctl00_ContentPlaceHolder1_dockJobTabs_C_ComplianceTasks_userControl_ReviewStatusRadComboBox_Input',
    );
    await rejectReasonDropdown.click();

    const rejectReasonOptions = this.page.locator(
      '#ctl00_ContentPlaceHolder1_dockJobTabs_C_ComplianceTasks_userControl_ReviewStatusRadComboBox_DropDown .rcbList .rcbItem',
    );
    await expect(rejectReasonOptions.first()).toBeVisible();

    const optionCount = await rejectReasonOptions.count();
    const randomIndex = Math.floor(Math.random() * (optionCount - 1)) + 1;
    await rejectReasonOptions.nth(randomIndex).click();

    // Click Reject button
    const rejectButton = this.page.locator(
      '#ctl00_ContentPlaceHolder1_dockJobTabs_C_ComplianceTasks_userControl_ReasonButton',
    );
    await rejectButton.click();

    // Wait for all rows to be removed
    const complianceTaskRows = this.page.locator(
      '#ctl00_ContentPlaceHolder1_dockJobTabs_C_ComplianceTasks_userControl_ComplianceManagerGridView_ctl00',
    );
    await expect(complianceTaskRows).toHaveCount(1, { timeout: 10000 });
  }

  // Close Job
  async closeJob() {
    await this.page.reload();
    await this.page.waitForLoadState('networkidle');
    const closeJobButton = this.page.locator(
      '#DivisionActionsPanel button.buttonCore.primaryButton.divisionButtonStyle',
      { hasText: 'Close Job' },
    );
    await expect(closeJobButton).toBeVisible();
    await closeJobButton.click();

    // Wait for modal to appear
    const modalWrapper = this.page.locator(
      '#RadWindowWrapper_ctl00_ContentPlaceHolder1_RadWindow_Common',
    );
    await expect(modalWrapper).toBeVisible({ timeout: 20000 });

    const confirmationHeader = modalWrapper.locator('em', {
      hasText: 'Confirmation',
    });
    await expect(confirmationHeader).toBeVisible({ timeout: 10000 });

    // Wait for iframe
    const iframeSelector = 'iframe[name="RadWindow_Common"]';
    await expect(this.page.locator(iframeSelector)).toBeVisible({
      timeout: 20000,
    });

    // Get frame
    let modalFrame = null;
    for (let i = 0; i < 20; i++) {
      modalFrame = this.page.frame({ name: 'RadWindow_Common' });
      if (modalFrame) break;
      await this.page.waitForTimeout(500);
    }
    expect(modalFrame).not.toBeNull();

    // Select random Provider reason
    const reasonDropdownArrow = modalFrame.locator('#ReasonForClosingRadComboBox_Arrow');
    await expect(reasonDropdownArrow).toBeVisible({ timeout: 10000 });
    await reasonDropdownArrow.click();

    const reasonOptions = modalFrame.locator(
      '#ReasonForClosingRadComboBox_DropDown .rcbList .rcbItem',
    );
    await expect(reasonOptions.first()).toBeVisible({ timeout: 10000 });
    const reasonOptionCount = await reasonOptions.count();
    const randomReasonIndex = Math.floor(Math.random() * (reasonOptionCount - 1)) + 1;
    await reasonOptions.nth(randomReasonIndex).click();

    // Click Close Job button in modal
    const modalCloseButton = modalFrame.locator(
      'input#CloseReopenButton.buttonCore.primaryButton[type="submit"][value="Close Job"]',
    );
    await expect(modalCloseButton).toBeVisible({ timeout: 10000 });
    await modalCloseButton.click();

    // Wait for modal to close
    await expect(modalWrapper).toBeHidden({ timeout: 10000 });
  }

  // Verify job is closed
  async verifyJobIsClosed() {
    // Assert Reopen Job button is visible
    const reopenJobButton = this.page.locator(
      '#DivisionActionsPanel button.buttonCore.primaryButton.divisionButtonStyle',
      { hasText: 'Reopen Job' },
    );
    await expect(reopenJobButton).toBeVisible();

    // Verify status is "Closed"
    const jobTabLinkPanel = this.page.locator('#JobTabLinkPanel');
    await expect(jobTabLinkPanel).toBeVisible({ timeout: 10000 });

    const statusSpan = jobTabLinkPanel
      .locator('span.fontHeaderNormalLightBlue', { hasText: 'Status:' })
      .locator('xpath=following-sibling::span[contains(@class,"fontHeaderNormalGray")]');

    await expect(statusSpan).toHaveText(/Closed/i);
  }
}
