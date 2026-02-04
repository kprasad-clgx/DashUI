import { BasePage } from '../basePage/enterpriseBasePage.po.js';
export class EmployeePage extends BasePage {
  constructor(page) {
    super(page);

    this.quickNotesIcon = page.locator('#RAD_SLIDING_PANE_ICON_ctl00_ctl44_QuickMenuSlidingPane');
    this.createEmployeeQuickLink = page
      .locator('#ctl00_ctl44_QuickMenudDiv')
      .getByText('Employee', { exact: true });

    // Personal Information Fields
    this.firstNameInput = page.locator('#ctl00_ContentPlaceHolder1_txtFName');
    this.lastNameInput = page.locator('#ctl00_ContentPlaceHolder1_txtLName');
    this.userNameInput = page.locator('#ctl00_ContentPlaceHolder1_txtDASHID');
    this.passwordInput = page.locator('#ctl00_ContentPlaceHolder1_txtPassword');
    this.emailInput = page.locator('#ctl00_ContentPlaceHolder1_txtEmail');

    // Job Information Fields
    this.jobTitleInput = page.locator('#ctl00_ContentPlaceHolder1_ddlJobTitle_Input');
    this.jobTitleDropdown = page.locator('#ctl00_ContentPlaceHolder1_ddlJobTitle_DropDown');

    // Address Fields
    this.addressInput = page.locator('#ctl00_ContentPlaceHolder1_txtAddress');
    this.zipCodeInput = page.locator('#ctl00_ContentPlaceHolder1_ctl13_ZipCodeTextBox');
    this.cityInput = page.locator('#ctl00_ContentPlaceHolder1_ctl13_CityTextBox');
    this.stateInput = page.locator('#ctl00_ContentPlaceHolder1_ctl13_StateComboBox_Input');
    this.countryInput = page.locator('#ctl00_ContentPlaceHolder1_ctl13_CountryComboBox_Input');
    this.countyInput = page.locator('#ctl00_ContentPlaceHolder1_ctl13_RegionCountyComboBox_Input');

    // Actions
    this.saveButton = page.locator('#ctl00_ContentPlaceHolder1_btnSave');
    this.deactivateEmployeeCheckbox = page.locator('#ctl00_ContentPlaceHolder1_chkInactive');

    // Messages
    this.successMessage = page.locator('#ctl00_ContentPlaceHolder1_lblmsg');

    // Employee Search/List Page
    this.dashIdFilterInput = page.getByRole('textbox', { name: 'Filter DASHID column' });
    this.editEmployeeLink = page.locator('a').filter({ hasText: 'Edit' }).first();

    // Reassignment Dialog/Form
    this.employeeDeactivatedMessage = page
      .locator('.DashTitle')
      .filter({ hasText: 'Employee Deactivated' });
    this.updateButtonReassign = page.locator('#ButtonSaveEmployee');

    // Employee Search/List Page - No Records Message
    this.noRecordsRow = page.locator('tr.rgNoRecords');
  }

  /**
   * Fills personal information fields
   * @param {Object} employeeData - Employee data object
   */
  async fillPersonalInfo(employeeData) {
    await this.firstNameInput.waitFor({ state: 'visible' });
    await this.firstNameInput.fill(employeeData.firstName);
    await this.lastNameInput.fill(employeeData.lastName);

    await this.userNameInput.fill(employeeData.userName);
    await this.passwordInput.fill(employeeData.password);
    await this.emailInput.fill(employeeData.email);
  }

  /**
   * Selects job title from dropdown
   * @param {string} jobTitle - Job title to select
   */
  async selectJobTitle(jobTitle) {
    const optionLocator = this.jobTitleDropdown
      .locator('div.rcbScroll.rcbWidth > ul > li')
      .filter({ hasText: jobTitle })
      .first();

    await this.jobTitleInput.waitFor({ state: 'visible', timeout: 5000 });
    await this.jobTitleInput.click();
    await optionLocator.waitFor({ state: 'visible', timeout: 5000 });
    await optionLocator.click();
  }

  /**
   * Fills address information fields
   * @param {Object} employeeData - Employee data object
   */
  async fillAddressInfo(employeeData) {
    await this.addressInput.fill(employeeData.address);
    await this.zipCodeInput.fill(employeeData.zipCode);
    await this.cityInput.fill(employeeData.city);
    await this.stateInput.fill(employeeData.state);
    await this.countryInput.fill(employeeData.country);
    await this.countyInput.fill(employeeData.county);
  }

  /**
   * Fills all employee details
   * @param {Object} employeeData - Employee data object
   */
  async fillEmployeeDetails(employeeData) {
    await this.fillPersonalInfo(employeeData);
    await this.selectJobTitle(employeeData.jobTitle);
    await this.fillAddressInfo(employeeData);
  }

  /**
   * Saves the employee
   */
  async saveEmployee() {
    await this.saveButton.waitFor({ state: 'visible' });
    await this.saveButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Complete employee creation workflow
   * @param {Object} employeeData - Employee data object
   */
  async createEmployee(employeeData) {
    await this.fillEmployeeDetails(employeeData);
    await this.saveEmployee();
  }

  /**
   * Gets success message text after waiting for it to be visible
   * @returns {Promise<string>} The success message text
   */
  async getSuccessMessage() {
    await this.page.waitForLoadState('networkidle');
    await this.successMessage.waitFor({ state: 'visible' });
    return await this.successMessage.textContent();
  }

  /**
   * Waits for employee form to be loaded
   */
  async waitForFormLoaded() {
    await this.page.waitForLoadState('networkidle');
    await this.firstNameInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.saveButton.waitFor({ state: 'visible', timeout: 10000 });
  }

  /**
   * Asserts that the success message is displayed
   */
  async assertSuccessMessage() {
    await this.page.waitForLoadState('networkidle');
    await this.successMessage.waitFor({ state: 'visible', timeout: 10000 });
    const messageText = await this.successMessage.textContent();
    if (!messageText || messageText.trim() === '') {
      throw new Error('Success message is empty or not found');
    }
  }

  /**
   * Handles possible scenarios after clicking save:
   * 1. Employee has assigned tasks - shows reassignment form in iframe with "Update" button
   * 2. No tasks assigned - shows confirmation in iframe with "OK" button
   * 3. No dialog appears - deactivation completes directly
   */
  async deactivateEmployee() {
    // Check the deactivate checkbox
    await this.deactivateEmployeeCheckbox.check();
    await this.page.waitForTimeout(500);

    // Click save button
    await this.saveButton.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);

    // Check if modal dialog with iframe appears
    const modalDialog = this.page
      .locator('.rwTitlebar em')
      .filter({ hasText: 'Reassign to an Active Employee' });
    const dialogAppeared = await modalDialog.isVisible().catch(() => false);

    if (dialogAppeared) {
      console.log('Reassignment dialog appeared in iframe');

      // Wait for iframe to load
      await this.page.waitForTimeout(2000);

      // Access the iframe and get the message text
      const frame = this.page.frameLocator('iframe[name="window_Common"]');
      const messageText = await frame
        .locator('.DashLabelFontStyle')
        .first()
        .textContent()
        .catch(() => '');
      console.log(`Deactivation message: ${messageText.trim()}`);

      // Click the OK/Update button inside the iframe
      const okButton = frame.locator('#ButtonSaveEmployee');
      await okButton.waitFor({ state: 'visible', timeout: 5000 });
      await okButton.click();

      // Wait for iframe to process the click
      await this.page.waitForTimeout(2000);

      // Close the modal dialog by clicking the Close button
      const closeButton = this.page.locator('.rwCloseButton');
      await closeButton.click({ force: true }).catch(() => {
        console.log('Close button not found or already closed');
      });

      // Alternative: Press Escape to close modal
      await this.page.keyboard.press('Escape');

      // Wait for modal to close completely
      await this.page.waitForTimeout(1000);
      await this.page.waitForLoadState('networkidle');

      // Verify modal is closed by checking if it's hidden
      const modalStillVisible = await modalDialog.isVisible().catch(() => false);
      if (modalStillVisible) {
        console.log('Modal still visible, forcing page reload');
        await this.page.reload({ waitUntil: 'networkidle' });
      }
    } else {
      console.log('No deactivation dialog appeared - deactivation completed directly');
    }
  }

  /**
   * Verifies that no employee is found after search (for deactivated employees)
   * Deactivated employees should not appear in search results
   */
  async assertEmployeeNotFound() {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);

    // Check if "No records to display" message appears
    await this.noRecordsRow.waitFor({ state: 'visible', timeout: 10000 });

    const messageVisible = await this.noRecordsRow.isVisible();
    if (!messageVisible) {
      throw new Error(
        'Employee was found after deactivation - deactivation may have failed or employee still appears in search results',
      );
    }
  }

  /**
   * Navigates to the employee list/search page
   */
  async navigateToEmployeeList() {
    // Navigate through main menu - Administration > Employee
    await this.page.locator('li:nth-child(34)>.rmLink>.rmText').click(); // Administration
    await this.page.locator('a').filter({ hasText: 'Employee' }).click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Searches for an employee by username/DASH ID
   * @param {string} username - The username to search for
   */
  async searchEmployeeByUsername(username) {
    await this.page.waitForTimeout(3000);

    const filterInput = this.page.locator(
      '#ctl00_ContentPlaceHolder1_gvEmplyees_ctl00_ctl02_ctl03_FilterTextBox_DASHID',
    );
    await filterInput.waitFor({ state: 'visible', timeout: 10000 });
    await filterInput.fill(username);
    await this.page.waitForTimeout(500);
    await filterInput.press('Enter');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Clicks the Edit link for the first employee in the search results
   */
  async clickEditEmployee() {
    await this.editEmployeeLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Complete workflow: navigate to employee list, search by username, click edit, then deactivate
   * @param {string} username - The username to search for
   */
  async searchAndEditEmployee(username) {
    await this.navigateToEmployeeList();
    await this.searchEmployeeByUsername(username);
    await this.clickEditEmployee();
  }

  async openQuickNotesCreateEmployee() {
    await this.quickNotesIcon.click();
    await this.createEmployeeQuickLink.waitFor({ state: 'visible', timeout: 5000 }); // Wait for menu to expand
    await this.createEmployeeQuickLink.click();
    await this.page.waitForLoadState('networkidle');
  }
}
