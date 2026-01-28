/**
 * @typedef {Object} EmployeeLocatorsType
 * @property {string} administrationMenu
 * @property {string} menuContainer
 * @property {string} employeeMenuOption
 * @property {string} employeeDetailsText
 * @property {string} addNewButton
 * @property {string} showActiveEmployeesCheckbox
 * @property {string} showInactiveEmployeesCheckbox
 * @property {string} showAllEmployeesCheckbox
 * @property {string} secondNameHeader
 * @property {string} userIdHeader
 * @property {string} addressHeader
 * @property {string} emailHeader
 * @property {string} statusHeader
 * @property {string} refreshButton
 * @property {string} exportToExcelButton
 * @property {string} exportToPdfButton
 * @property {string} sectionHeading
 * @property {string} firstNameInput
 * @property {string} lastNameInput
 * @property {string} userNameInput
 * @property {string} passwordInput
 * @property {string} jobTitleDropdown
 * @property {string} jobTitleDropdownOptions
 * @property {string} stateProvinceInput
 * @property {string} addressInput
 * @property {string} zipCodeInput
 * @property {string} cityInput
 * @property {string} emailInput
 * @property {string} saveButton
 * @property {string} successMessage
 * @property {string} backButton
 * @property {string} showAllRadioButton
 * @property {string} userIdGridInput
 * @property {string} gridDataDiv
 * @property {string} gridTable
 * @property {string} gridSearchInput
 * @property {string} editLinks
 */

/** @type {EmployeeLocatorsType} */
const EmployeeLocators = {
  administrationMenu: "span:has-text('Administration')",
  menuContainer: 'div.rmSlide[style*="display: block"]',
  employeeMenuOption: 'ul.rmVertical.rmGroup.rmLevel1 li.rmItem a.rmLink span.rmText',
  employeeDetailsText: 'text=Employee Details',
  addNewButton: '#ctl00_ContentPlaceHolder1_gvEmplyees_ctl00_ctl02_ctl00_AddNewButton',
  showActiveEmployeesCheckbox: "label:has-text('Show Active Employees')",
  showInactiveEmployeesCheckbox: "label:has-text('Show Inactive Employees')",
  showAllEmployeesCheckbox: "label:has-text('Show All Employees')",
  secondNameHeader:
    'table#ctl00_ContentPlaceHolder1_gvEmplyees_ctl00_Header th.rgHeader[style*="display:none"] a',
  userIdHeader: 'table#ctl00_ContentPlaceHolder1_gvEmplyees_ctl00_Header th.rgHeader a',
  addressHeader: 'table#ctl00_ContentPlaceHolder1_gvEmplyees_ctl00_Header th.rgHeader a',
  emailHeader: 'table#ctl00_ContentPlaceHolder1_gvEmplyees_ctl00_Header th.rgHeader a',
  statusHeader: 'table#ctl00_ContentPlaceHolder1_gvEmplyees_ctl00_Header th.rgHeader',
  refreshButton: 'input#ctl00_ContentPlaceHolder1_gvEmplyees_ctl00_ctl02_ctl00_RefreshGridButton',
  exportToExcelButton:
    'input#ctl00_ContentPlaceHolder1_gvEmplyees_ctl00_ctl02_ctl00_ExportToExcelButton',
  exportToPdfButton:
    'input#ctl00_ContentPlaceHolder1_gvEmplyees_ctl00_ctl02_ctl00_ExportToPdfButton',
  sectionHeading: '.Heading_blue_s',
  firstNameInput: '#ctl00_ContentPlaceHolder1_txtFName',
  lastNameInput: '#ctl00_ContentPlaceHolder1_txtLName',
  userNameInput: '#ctl00_ContentPlaceHolder1_txtDASHID',
  passwordInput: '#ctl00_ContentPlaceHolder1_txtPassword',
  jobTitleDropdown: '#ctl00_ContentPlaceHolder1_ddlJobTitle_Input',
  jobTitleDropdownOptions: '#ctl00_ContentPlaceHolder1_ddlJobTitle_DropDown .rcbList .rcbItem',
  stateProvinceInput: '#ctl00_ContentPlaceHolder1_ctl13_StateComboBox_Input',
  addressInput: '#ctl00_ContentPlaceHolder1_txtAddress',
  zipCodeInput: '#ctl00_ContentPlaceHolder1_ctl13_ZipCodeTextBox',
  cityInput: '#ctl00_ContentPlaceHolder1_ctl13_CityTextBox',
  emailInput: '#ctl00_ContentPlaceHolder1_txtEmail',
  saveButton: '#ctl00_ContentPlaceHolder1_btnSave',
  successMessage: '#ctl00_ContentPlaceHolder1_lblmsg',
  backButton: '#ctl00_ContentPlaceHolder1_btnBack',
  showAllRadioButton: '#ctl00_ContentPlaceHolder1_rbtnlstEmps_2',
  userIdGridInput: '#ctl00_ContentPlaceHolder1_gvEmplyees_ctl00_ctl02_ctl03_FilterTextBox_DASHID',
  gridDataDiv: '#ctl00_ContentPlaceHolder1_gvEmplyees_GridData',
  gridTable: '#ctl00_ContentPlaceHolder1_gvEmplyees_ctl00',
  gridSearchInput: '#ctl00_ContentPlaceHolder1_gvEmplyees_ctl00_ctl02_ctl03_FilterTextBox_Name',
  editLinks: 'a.buttonThin.secondaryButton',
  deactivateCheckbox: '#ctl00_ContentPlaceHolder1_chkInactive',
  reassignModal: '#RadWindowWrapper_ctl00_ContentPlaceHolder1_window_Common',
  reassignModalHeading: '#RadWindowWrapper_ctl00_ContentPlaceHolder1_window_Common em',
  reassignIframe: 'iframe[name="window_Common"]',
  reassignOkButton: 'input[type="submit"][value="OK"], button:has-text("OK")',
};

class EmployeePage {
  constructor(page) {
    this.page = page;
  }

  // Navigate to Employee page through Administration menu
  async navigateToEmployee() {
    await this.page.locator(EmployeeLocators.administrationMenu).first().hover();
    await this.page
      .locator(EmployeeLocators.menuContainer)
      .waitFor({ state: 'visible', timeout: 15000 });
    await this.page
      .locator(EmployeeLocators.employeeMenuOption, {
        hasText: /^Employee$/,
      })
      .first()
      .waitFor({ state: 'visible', timeout: 10000 });
    await this.page
      .locator(EmployeeLocators.employeeMenuOption, {
        hasText: /^Employee$/,
      })
      .first()
      .click();
    await this.page.waitForLoadState('networkidle');
  }

  // Verify Employee Details text is visible
  async verifyEmployeeDetailsText() {
    const text = this.page.getByText('Employee Details', { exact: true });
    await text.waitFor({ state: 'visible' });
    return text;
  }

  // Click on Add New button to open the Add Employee form
  async clickAddNewButton() {
    const button = this.page.locator(EmployeeLocators.addNewButton);
    await button.waitFor({ state: 'visible' });
    await button.click();
    await this.page.waitForLoadState('networkidle');
  }

  // Verify Add New Button is visible and is a button element
  async verifyAddNewButton() {
    const button = this.page.locator(EmployeeLocators.addNewButton);
    await button.waitFor({ state: 'visible' });
    return button;
  }

  // Verify Show Active Employees checkbox is visible
  async verifyShowActiveEmployeesCheckbox() {
    const checkbox = this.page.getByLabel('Show Active Employees', {
      exact: true,
    });
    await checkbox.waitFor({ state: 'visible' });
    return checkbox;
  }

  // Verify Second Name Header is hidden
  async verifySecondNameHeader() {
    const header = this.page.locator(EmployeeLocators.secondNameHeader, {
      hasText: 'Name',
    });
    return header;
  }

  // Verify User ID Header is visible
  async verifyUserIdHeader() {
    const header = this.page.locator(EmployeeLocators.userIdHeader, {
      hasText: 'User ID',
    });
    await header.waitFor({ state: 'visible' });
    return header;
  }

  // Verify Address Header is visible
  async verifyAddressHeader() {
    const header = this.page.locator(EmployeeLocators.addressHeader, {
      hasText: 'Address',
    });
    await header.waitFor({ state: 'visible' });
    return header;
  }

  // Verify Email Header is visible
  async verifyEmailHeader() {
    const header = this.page
      .locator(EmployeeLocators.emailHeader, {
        hasText: 'E-mail',
      })
      .first();
    await header.waitFor({ state: 'visible' });
    return header;
  }

  // Verify Status Header is visible
  async verifyStatusHeader() {
    const header = this.page.locator(EmployeeLocators.statusHeader, {
      hasText: 'Status',
    });
    await header.waitFor({ state: 'visible' });
    return header;
  }

  // Verify Refresh Button is visible
  async verifyRefreshButton() {
    const button = this.page.locator(EmployeeLocators.refreshButton);
    await button.waitFor({ state: 'visible' });
    return button;
  }

  // Verify Export to Excel Button is visible
  async verifyExportToExcelButton() {
    const button = this.page.locator(EmployeeLocators.exportToExcelButton);
    await button.waitFor({ state: 'visible' });
    return button;
  }

  // Verify Export to PDF Button is visible
  async verifyExportToPdfButton() {
    const button = this.page.locator(EmployeeLocators.exportToPdfButton);
    await button.waitFor({ state: 'visible' });
    return button;
  }

  // Verify Show Inactive Employees checkbox is visible
  async verifyShowInactiveEmployeesCheckbox() {
    const checkbox = this.page.getByLabel('Show Inactive Employees', {
      exact: true,
    });
    await checkbox.waitFor({ state: 'visible' });
    return checkbox;
  }

  // Click on Show Inactive Employees
  async clickShowInactiveEmployeesCheckbox() {
    const checkbox = this.page.getByLabel('Show Inactive Employees', {
      exact: true,
    });
    await checkbox.click({ state: 'visible' });
    await this.page.waitForLoadState('networkidle');
  }

  // Verify Show All Employees checkbox is visible
  async verifyShowAllEmployeesCheckbox() {
    const checkbox = this.page.getByLabel('Show All Employees', {
      exact: true,
    });
    await checkbox.waitFor({ state: 'visible' });
    return checkbox;
  }

  // Verify section headings are visible
  async verifySectionHeading(sectionText) {
    const section = this.page.locator(EmployeeLocators.sectionHeading, {
      hasText: new RegExp(`^\\s*${sectionText}\\s*$`),
    });
    await section.waitFor({ state: 'visible' });
    return section;
  }

  // Fill First Name input
  async fillFirstName(firstName) {
    const input = this.page.locator(EmployeeLocators.firstNameInput);
    await input.fill(firstName);
  }

  // Fill Last Name input
  async fillLastName(lastName) {
    const input = this.page.locator(EmployeeLocators.lastNameInput);
    await input.fill(lastName);
  }

  // Fill User Name input
  async fillUserName(userName) {
    const input = this.page.locator(EmployeeLocators.userNameInput);
    await input.fill(userName);
  }

  // Fill Password input
  async fillPassword(password) {
    const input = this.page.locator(EmployeeLocators.passwordInput);
    await input.fill(password);
  }

  // Select random job title from dropdown
  async selectRandomJobTitle() {
    const dropdown = this.page.locator(EmployeeLocators.jobTitleDropdown);
    await dropdown.click();

    const options = this.page.locator(EmployeeLocators.jobTitleDropdownOptions);
    await options.first().waitFor({ state: 'visible' });

    const optionCount = await options.count();
    const randomIndex = Math.floor(Math.random() * (optionCount - 1)) + 1;
    const randomOptionText = await options.nth(randomIndex).innerText();

    // Set up dialog handler BEFORE clicking
    this.page.once('dialog', async (dialog) => {
      await dialog.accept();
    });

    await options.nth(randomIndex).click();
    return randomOptionText;
  }

  // Fill State/Province input
  async fillStateProvince(state) {
    const input = this.page.locator(EmployeeLocators.stateProvinceInput);
    await input.click();
    await input.clear();
    await input.fill(state);
  }

  // Fill Address input
  async fillAddress(address) {
    const input = this.page.locator(EmployeeLocators.addressInput);
    await input.click();
    await input.fill(address);
  }

  // Fill Zip Code input
  async fillZipCode(zipCode) {
    const input = this.page.locator(EmployeeLocators.zipCodeInput);
    await input.click();
    await input.fill(zipCode);
  }

  // Fill City input
  async fillCity(city) {
    const input = this.page.locator(EmployeeLocators.cityInput);
    await input.click();
    await input.fill(city);
  }

  // Fill Email input
  async fillEmail(email) {
    const input = this.page.locator(EmployeeLocators.emailInput);
    await input.click();
    await input.fill(email);
  }

  // Click Save button
  async clickSaveButton() {
    const button = this.page.locator(EmployeeLocators.saveButton);
    await button.click();
    await this.page.waitForLoadState('networkidle');
  }

  // Verify success message
  async verifySuccessMessage(expectedMessage) {
    const message = this.page.locator(EmployeeLocators.successMessage);
    await message.waitFor({ state: 'visible', timeout: 10000 });
    return message;
  }

  // Click Back button
  async clickBackButton() {
    const button = this.page.locator(EmployeeLocators.backButton);
    await button.click();
    await this.page.waitForLoadState('networkidle');
  }

  // Click Show All Employees radio button
  async clickShowAllRadioButton() {
    const radio = this.page.locator(EmployeeLocators.showAllRadioButton);
    await radio.click();
    await this.page.waitForLoadState('networkidle');
  }

  // Search by User ID in grid
  async searchByUserId(userId) {
    const input = this.page.locator(EmployeeLocators.userIdGridInput);
    await input.click();
    await input.fill(userId);
    await input.press('Enter');
    // Wait for all network activity to stop (networkidle)
    await this.page.waitForLoadState('networkidle', { timeout: 20000 });
    // Small buffer to ensure grid is fully updated
    await this.page.waitForTimeout(5000);
  }

  // Search by user name in grid
  async searchByUserNameInGrid(userName) {
    const input = this.page.locator(EmployeeLocators.gridSearchInput);
    await input.click();
    await input.fill(userName);
    await input.press('Enter');
    await this.page.waitForLoadState('networkidle');
  }

  // Verify grid data div is visible
  async verifyGridDataVisible() {
    const gridDiv = this.page.locator(EmployeeLocators.gridDataDiv);
    await gridDiv.waitFor({ state: 'visible', timeout: 10000 });
    await this.page.waitForLoadState('domcontentloaded');
    return gridDiv;
  }

  // Verify grid table is visible
  async verifyGridTableVisible() {
    const gridTable = this.page.locator(EmployeeLocators.gridTable);
    await gridTable.waitFor({ state: 'visible', timeout: 10000 });
    await this.page.waitForLoadState('domcontentloaded');
    return gridTable;
  }

  // Search by name in grid filter
  async searchByNameInGrid(name) {
    // Wait for grid table to be visible first
    await this.page
      .locator(EmployeeLocators.gridTable)
      .waitFor({ state: 'visible', timeout: 10000 });
    const searchInput = this.page.locator(EmployeeLocators.gridSearchInput);
    await searchInput.waitFor({ state: 'visible', timeout: 30000 });
    await searchInput.fill(name);
    await this.page.keyboard.press('Enter');
    await this.page.waitForLoadState('networkidle');
    // Wait for the first row to match the search name (ensures grid is refreshed)
    const firstRow = this.page
      .locator(`${EmployeeLocators.gridTable} tr.rgRow, ${EmployeeLocators.gridTable} tr.rgAltRow`)
      .first();
    await firstRow.waitFor({ state: 'visible', timeout: 10000 });
    await this.page.waitForTimeout(3000); // Small buffer for grid update
  }

  // Get edit links count
  async getEditLinksCount() {
    await this.page.waitForLoadState('networkidle');
    const gridTable = this.page.locator(EmployeeLocators.gridTable);
    const editLinks = gridTable.locator(EmployeeLocators.editLinks, {
      hasText: 'Edit',
    });
    await this.page.waitForLoadState('domcontentloaded');
    return await editLinks.count();
  }

  // Click on edit link
  async clickEditLinkByName() {
    const gridTable = this.page.locator(EmployeeLocators.gridTable);
    const editLink = gridTable.locator(EmployeeLocators.editLinks, {
      hasText: 'Edit',
    });
    await editLink.first().click();
    await this.page.waitForLoadState('networkidle');
  }

  // Verify deactivate checkbox is visible
  async verifyDeactivateCheckboxVisible() {
    const checkbox = this.page.locator(EmployeeLocators.deactivateCheckbox);
    await checkbox.waitFor({ state: 'visible' });
    return checkbox;
  }

  // Verify deactivate checkbox is not checked
  async verifyDeactivateCheckboxNotChecked() {
    const checkbox = this.page.locator(EmployeeLocators.deactivateCheckbox);
    await checkbox.waitFor({ state: 'visible' });
    return checkbox;
  }

  // Check deactivate checkbox
  async checkDeactivateCheckbox() {
    const checkbox = this.page.locator(EmployeeLocators.deactivateCheckbox);
    await checkbox.check();
    await this.page.waitForLoadState('networkidle');
  }

  // Verify reassign modal is visible
  async verifyReassignModalVisible() {
    const modal = this.page.locator(EmployeeLocators.reassignModal);
    await modal.waitFor({ state: 'visible', timeout: 20000 });
    return modal;
  }

  // Verify reassign modal heading
  async verifyReassignModalHeading() {
    const heading = this.page.locator(EmployeeLocators.reassignModalHeading);
    await heading.waitFor({ state: 'visible' });
    return heading;
  }

  // Verify reassign iframe is visible
  async verifyReassignIframeVisible() {
    const iframe = this.page.locator(EmployeeLocators.reassignIframe);
    await iframe.waitFor({ state: 'visible', timeout: 20000 });
    return iframe;
  }

  // Click OK button in reassign modal and handle dialog
  async clickReassignOkButton() {
    const reassignFrame = this.page.frameLocator(EmployeeLocators.reassignIframe);
    const okButton = reassignFrame.locator(EmployeeLocators.reassignOkButton);
    await okButton.waitFor({ state: 'visible', timeout: 10000 });

    // Prepare to accept the alert dialog after modal closes
    this.page.once('dialog', async (dialog) => {
      await dialog.accept();
    });

    await okButton.click();
  }

  // Wait for reassign modal to close
  async waitForReassignModalToClose() {
    const modal = this.page.locator(EmployeeLocators.reassignModal);
    await modal.waitFor({ state: 'hidden', timeout: 20000 });
    await this.page.waitForLoadState('networkidle');
  }
}

export default EmployeePage;
