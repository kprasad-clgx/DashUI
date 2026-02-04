import { BasePage } from '../basePage/enterpriseBasePage.po.js';

export class CreateJobPage extends BasePage {
  constructor(page) {
    super(page);

    this.quickNotesIcon = page.locator('#RAD_SLIDING_PANE_ICON_ctl00_ctl44_QuickMenuSlidingPane');
    // Scope to the quick notes sliding panel to avoid ambiguity
    this.quickNotesPanel = page.locator('#ctl00_ctl44_QuickMenuSlidingPane');
    this.createJobQuickLink = page
      .locator('#ctl00_ctl44_QuickMenuSlidingPane')
      .getByRole('link', { name: 'Job', exact: true });

    // --- General Info ---
    this.officeArrow = page.locator('[id$="comboBoxOffice_Arrow"]');
    this.dateOfLossInput = page.locator('[id$="DatePicker_DateOffLoss_dateInput"]');
    this.lossCategoryArrow = page.locator('[id$="comboBox_LossCategory_Arrow"]');
    this.priorityArrow = page.locator('[id$="comboBoxPriority_Arrow"]');

    // --- Customer Info ---
    this.customerArrow = page.locator('[id$="DropDown_Customer_Arrow"]');
    this.customerInput = page.locator('[id$="DropDown_Customer_Input"]');

    // --- Job Settings ---
    this.sameAsCustomerCheckbox = page.locator('[id$="CheckBox_SameIndividualAddress"]');

    // --- Loss Details ---
    this.lossDescriptionInput = page.locator('[id$="TextBox_LossDescription"]');
    this.specialInstructionsInput = page.locator('[id$="TextBox_SpecialIns"]');
    this.sourceOfLossArrow = page.locator('[id$="SourceOfLossComboBox_Arrow"]');
    this.createJobButton = page.locator(
      '#ctl00_ContentPlaceHolder1_JobParentInformation_Button_SaveAndGoToSlideBoardBottom_input',
    );
    this.generalSpinner = page.locator('.RadAjax.RadAjax_Office2007');

    //open create job
    this.openCreateJobLink = page.getByRole('img', { name: 'Create Job' });

    //close job
    this.closeJobButton = page.getByRole('button', { name: 'Close Job' });

    //delete job
    this.deleteJobButton = page.getByRole('button', { name: 'Delete Job' });
  }
  /**
   * Waits for the general loading spinner to disappear (processing complete)
   */
  async waitForProcessing(timeout = 10000) {
    // Wait for the spinner to appear (if it does), then disappear
    try {
      await this.generalSpinner.waitFor({ state: 'visible', timeout: 5000 });
    } catch {
      // Spinner may not appear, that's fine
    }
    await this.generalSpinner.waitFor({ state: 'hidden', timeout });
  }

  /** STANDARD TELERIK SELECT */
  async selectTelerikOption(arrowLocator, optionText) {
    const arrowId = await arrowLocator.getAttribute('id');
    const inputId = arrowId.replace('_Arrow', '_Input');
    const inputLocator = this.page.locator(`[id="${inputId}"]`);

    if (await inputLocator.isEditable()) {
      await inputLocator.click();
      await inputLocator.fill(optionText);
      await this.waitForProcessing();
      await inputLocator.press('Tab');
      return;
    }

    await arrowLocator.click();
    const dropdownId = arrowId.replace('_Arrow', '_DropDown');
    const specificDropdown = this.page.locator(`[id="${dropdownId}"]`);
    await specificDropdown.waitFor({ state: 'visible' });
    const item = specificDropdown.locator('.rcbItem, li').filter({ hasText: optionText }).first();
    await item.scrollIntoViewIfNeeded();
    await item.click();
  }

  async fillGeneralInfo(data) {
    if (data.office) await this.selectTelerikOption(this.officeArrow, data.office);
    if (data.dateOfLoss) {
      // Close any open dropdowns or menus that might be blocking
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(300);

      // Use force: true to bypass pointer interception checks
      await this.dateOfLossInput.click({ force: true, timeout: 10000 });
      await this.page.waitForTimeout(300);

      // Clear any existing value and fill with new date
      await this.dateOfLossInput.selectText();
      await this.dateOfLossInput.fill(data.dateOfLoss);
      await this.dateOfLossInput.press('Tab');
    }
    if (data.lossCategory)
      await this.selectTelerikOption(this.lossCategoryArrow, data.lossCategory);
    if (data.priority) await this.selectTelerikOption(this.priorityArrow, data.priority);
  }

  /**
   * CUSTOMER FLOW: Type -> Select -> Wait 2s
   */
  async fillCustomerInfo(customer) {
    // 1. Prepare Locators
    const dropdownId = await this.customerArrow.getAttribute('id');
    const listId = dropdownId.replace('_Arrow', '_DropDown');
    const listLocator = this.page.locator(`[id="${listId}"]`);

    // 2. Type FIRST NAME to trigger search
    await this.customerInput.click();
    await this.customerInput.clear();
    await this.customerInput.type(customer.firstName, { delay: 100 });

    // 3. Wait for Dropdown List to Populate
    await listLocator.waitFor({ state: 'visible', timeout: 5000 });

    // 4. Click the Matching Customer (Format: Last, First)
    const matchText = `${customer.lastName}, ${customer.firstName}`;
    const targetItem = listLocator.locator('.rcbItem, li').filter({ hasText: matchText }).first();
    await targetItem.click();

    // 5. Wait for dropdown to close
    await listLocator.waitFor({ state: 'hidden' });

    // 6. Wait for the customer data to populate
    await this.waitForProcessing();
  }

  async selectDivisions(divisions) {
    const divisionList = Array.isArray(divisions) ? divisions : [divisions];
    for (const division of divisionList) {
      await this.page.getByLabel(division, { exact: true }).check();
    }
  }

  /**
   * LOSS DETAILS & CHECKBOX FLOW: Click Checkbox
   */
  async fillLossDetails(data) {
    await this.lossDescriptionInput.fill(data.lossDescription);
    await this.specialInstructionsInput.fill(data.specialInstructions);
    await this.sameAsCustomerCheckbox.click();
    await this.waitForProcessing();
  }

  async submitJob() {
    await this.waitForProcessing();
    this.createJobButton.click();
  }

  async createNewJob(jobData) {
    await this.fillGeneralInfo(jobData);
    await this.fillCustomerInfo(jobData.customer);
    await this.selectDivisions(jobData.divisions);
    await this.fillLossDetails({ ...jobData, customer: jobData.customer });
    await this.submitJob();
  }

  async openQuickNotesCreateJob() {
    // Close any open menus/dropdowns that might be blocking
    await this.page.keyboard.press('Escape');
    await this.page.waitForTimeout(300);

    // Use force: true to bypass pointer interception checks
    await this.quickNotesIcon.click({ force: true, timeout: 10000 });

    // Wait for the quick notes panel to expand
    await this.quickNotesPanel.waitFor({ state: 'visible', timeout: 5000 });
    await this.page.waitForTimeout(500); // Allow animation to complete

    await this.createJobQuickLink.click({ force: true });
    await this.page.waitForLoadState('networkidle');
  }

  async openCreateJob() {
    await this.openCreateJobLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async closeJob() {
    await this.closeJobButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async deleteJob() {
    await this.deleteJobButton.click();
    await this.page.waitForLoadState('networkidle');
    await this.page
      .frameLocator('[name="RadWindow_Common"]')
      .locator('#DeleteButton:visible')
      .click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Verifies that the Source Of Loss dropdown contains the specified option
   */
  async verifySourceOfLossOption(expectedOption) {
    await this.sourceOfLossArrow.click();
    const dropdownId = await this.sourceOfLossArrow.getAttribute('id');
    const listId = dropdownId.replace('_Arrow', '_DropDown');
    const listLocator = this.page.locator(`[id="${listId}"]`);
    await listLocator.waitFor({ state: 'visible', timeout: 5000 });

    const optionExists =
      (await listLocator.locator('.rcbItem, li').filter({ hasText: expectedOption }).count()) > 0;

    // Close the dropdown
    await this.page.keyboard.press('Escape');

    return optionExists;
  }
}
