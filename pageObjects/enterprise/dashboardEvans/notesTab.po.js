/**
 * @typedef {Object} DashboardNotesTabLocatorsType
 * @property {string} notesTab
 * @property {string} tabStrip
 * @property {string} visibilityDropdown
 * @property {string} dropdownList
 * @property {string} privateOption
 * @property {string} publicAdminOption
 * @property {string} publicOption
 * @property {string} changeVisibilityButton
 * @property {string} copyNotesButton
 * @property {string} addedByHeader
 * @property {string} dateHeader
 * @property {string} notesHeader
 * @property {string} emailAttachmentsHeader
 * @property {string} noteEmailedToHeader
 * @property {string} visibilityHeader
 * @property {string} refreshNotesGridButton
 * @property {string} exportToExcelButton
 * @property {string} exportToPDFButton
 * @property {string} addNewNoteButton
 * @property {string} gridFirstCheckBox
 * @property {string} visibilityColumnFirstData
 */

/** @type {DashboardNotesTabLocatorsType} */
const DashboardNotesTabLocators = {
  notesTab: 'Notes',
  tabStrip: '#ctl00_ContentPlaceHolder1_dockJobTabs_C_tabStripJobTabs',
  visibilityDropdown:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Notes_userControl_RadComboBox_Visibility_Input',
  dropdownList:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Notes_userControl_RadComboBox_Visibility_DropDown .rcbList',
  privateOption: "li.rcbItem:has-text('Private')",
  publicAdminOption: "li.rcbItem:has-text('Public Admin')",
  publicOption: 'li.rcbItem, li.rcbHovered',
  changeVisibilityButton:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Notes_userControl_Button_ChangeVisibility',
  copyNotesButton: '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Notes_userControl_CopyNotesButton',
  addedByHeader:
    "table#ctl00_ContentPlaceHolder1_dockJobTabs_C_Notes_userControl_radGrid_Notes_ctl00_Header th.rgHeader:has-text('Added By')",
  dateHeader:
    "table#ctl00_ContentPlaceHolder1_dockJobTabs_C_Notes_userControl_radGrid_Notes_ctl00_Header th.rgHeader:has-text('Date'):not(:has-text('Event'))",
  notesHeader:
    'table#ctl00_ContentPlaceHolder1_dockJobTabs_C_Notes_userControl_radGrid_Notes_ctl00_Header',
  emailAttachmentsHeader:
    "table#ctl00_ContentPlaceHolder1_dockJobTabs_C_Notes_userControl_radGrid_Notes_ctl00_Header th.rgHeader:has-text('Email Attachments')",
  noteEmailedToHeader:
    "table#ctl00_ContentPlaceHolder1_dockJobTabs_C_Notes_userControl_radGrid_Notes_ctl00_Header th.rgHeader:has-text('Note E-mailed To')",
  visibilityHeader:
    "table#ctl00_ContentPlaceHolder1_dockJobTabs_C_Notes_userControl_radGrid_Notes_ctl00_Header th.rgHeader a:has-text('Visibility')",
  refreshNotesGridButton:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Notes_userControl_radGrid_Notes_ctl00_ctl02_ctl00_RefreshGridButton',
  exportToExcelButton:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Notes_userControl_radGrid_Notes_ctl00_ctl02_ctl00_ExportToExcelButton',
  exportToPDFButton:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Notes_userControl_radGrid_Notes_ctl00_ctl02_ctl00_ExportToPdfButton',
  addNewNoteButton:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Notes_userControl_radGrid_Notes_ctl00_ctl02_ctl00_AddNewButton',
  gridFirstCheckBox:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Notes_userControl_radGrid_Notes_ctl00_ctl04_CheckBox1',
  visibilityColumnFirstData:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Notes_userControl_radGrid_Notes_ctl00__0',
  copyNotesModal: '#CopyNotePopup',
  copyNotesIframe: 'iframe#CopyNoteIframe',
  copyNotesIframeName: 'CopyNoteIframe',
  modalHeader: 'div.header',
  selectAllCheckbox: 'th .k-checkbox[type="checkbox"]',
  sendButton: 'input#SendButton',
  cancelButton: 'input#CancelButton',
};

class DashboardNotesTabPage {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page object
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to Notes tab
   * @returns {Promise<void>}
   */
  async navigateToNotesTab() {
    const tabStrip = this.page.locator(DashboardNotesTabLocators.tabStrip);
    const notesTab = tabStrip.getByText(DashboardNotesTabLocators.notesTab, {
      exact: true,
    });
    await notesTab.waitFor({ state: 'visible', timeout: 5000 });
    await notesTab.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Navigate to compliance tab
   * @returns {Promise<void>}
   */
  async navigateToComplianceTab() {
    const tabStrip = this.page.locator(DashboardNotesTabLocators.tabStrip);
    const complianceTab = tabStrip.getByText('Compliance Tasks', { exact: true });
    await complianceTab.waitFor({ state: 'visible', timeout: 5000 });
    await complianceTab.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Verify visibility dropdown is visible
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  async verifyVisibilityDropdownVisible() {
    const visibilityDropdown = this.page.locator(DashboardNotesTabLocators.visibilityDropdown);
    await visibilityDropdown.waitFor({ state: 'visible' });
    return visibilityDropdown;
  }

  /**
   * Click visibility dropdown
   * @returns {Promise<void>}
   */
  async clickVisibilityDropdown() {
    const visibilityDropdown = this.page.locator(DashboardNotesTabLocators.visibilityDropdown);
    await visibilityDropdown.waitFor({ state: 'visible' });
    await visibilityDropdown.click();
  }

  // Verify dropdown options are visible
  async verifyDropdownOptionsVisible() {
    const dropdownList = this.page.locator(DashboardNotesTabLocators.dropdownList);
    const privateOption = dropdownList.locator(DashboardNotesTabLocators.privateOption);
    const publicAdminOption = dropdownList.locator(DashboardNotesTabLocators.publicAdminOption);
    const publicOption = dropdownList
      .locator(DashboardNotesTabLocators.publicOption, { hasText: 'Public' })
      .filter({ has: this.page.getByText('Public', { exact: true }) });

    await privateOption.waitFor({ state: 'visible' });
    await publicAdminOption.waitFor({ state: 'visible' });
    await publicOption.waitFor({ state: 'visible' });

    return { privateOption, publicAdminOption, publicOption };
  }

  // Verify Copy Notes button is disabled
  async verifyCopyNotesButtonDisabled() {
    const copyNotesButton = this.page.locator(DashboardNotesTabLocators.copyNotesButton);
    await copyNotesButton.waitFor({ state: 'visible' });
    const isDisabled = await copyNotesButton.isDisabled();
    if (!isDisabled) {
      throw new Error('Copy Notes button should be disabled initially');
    }
  }

  // Verify Change Visibility button is visible
  async verifyChangeVisibilityButtonVisible() {
    const changeVisibilityButton = this.page.locator(
      DashboardNotesTabLocators.changeVisibilityButton,
    );
    await changeVisibilityButton.waitFor({ state: 'visible' });
    return changeVisibilityButton;
  }

  // Verify Added By header is visible
  async verifyAddedByHeaderVisible() {
    const addedByHeader = this.page.locator(DashboardNotesTabLocators.addedByHeader);
    await addedByHeader.waitFor({ state: 'visible' });
    return addedByHeader;
  }

  // Verify Date header is visible
  async verifyDateHeaderVisible() {
    const dateHeader = this.page.locator(DashboardNotesTabLocators.dateHeader);
    await dateHeader.waitFor({ state: 'visible' });
    return dateHeader;
  }

  // Verify Notes header is visible
  async verifyNotesHeaderVisible() {
    const notesHeaderTable = this.page.locator(DashboardNotesTabLocators.notesHeader);
    const notesHeader = notesHeaderTable.getByRole('columnheader', {
      name: 'Notes',
      exact: true,
    });
    await notesHeader.waitFor({ state: 'visible' });
    return notesHeader;
  }

  // Verify Email Attachments header is visible
  async verifyEmailAttachmentsHeaderVisible() {
    const emailAttachmentsHeader = this.page.locator(
      DashboardNotesTabLocators.emailAttachmentsHeader,
    );
    await emailAttachmentsHeader.waitFor({ state: 'visible' });
    return emailAttachmentsHeader;
  }

  // Verify Note E-mailed To header is visible
  async verifyNoteEmailedToHeaderVisible() {
    const noteEmailedToHeader = this.page.locator(DashboardNotesTabLocators.noteEmailedToHeader);
    await noteEmailedToHeader.waitFor({ state: 'visible' });
    return noteEmailedToHeader;
  }

  // Verify Visibility header is visible
  async verifyVisibilityHeaderVisible() {
    const visibilityHeader = this.page.locator(DashboardNotesTabLocators.visibilityHeader);
    await visibilityHeader.waitFor({ state: 'visible' });
    return visibilityHeader;
  }

  // Verify Refresh Notes Grid button is visible
  async verifyRefreshNotesGridButtonVisible() {
    const refreshNotesGridButton = this.page.locator(
      DashboardNotesTabLocators.refreshNotesGridButton,
    );
    await refreshNotesGridButton.waitFor({ state: 'visible' });
    return refreshNotesGridButton;
  }

  // Verify Export to Excel button is visible
  async verifyExportToExcelButtonVisible() {
    const exportToExcelButton = this.page.locator(DashboardNotesTabLocators.exportToExcelButton);
    await exportToExcelButton.waitFor({ state: 'visible' });
    return exportToExcelButton;
  }

  // Verify Export to PDF button is visible
  async verifyExportToPDFButtonVisible() {
    const exportToPDFButton = this.page.locator(DashboardNotesTabLocators.exportToPDFButton);
    await exportToPDFButton.waitFor({ state: 'visible' });
    return exportToPDFButton;
  }

  // Verify Add New Note button is visible
  async verifyAddNewNoteButtonVisible() {
    const addNewNoteButton = this.page.locator(DashboardNotesTabLocators.addNewNoteButton);
    await addNewNoteButton.waitFor({ state: 'visible' });
    return addNewNoteButton;
  }

  // Verify Add New Note button type is button
  async verifyAddNewNoteButtonType() {
    const addNewNoteButton = this.page.locator(DashboardNotesTabLocators.addNewNoteButton);
    await addNewNoteButton.waitFor({ state: 'visible' });
    const buttonType = await addNewNoteButton.getAttribute('type');
    if (buttonType !== 'button') {
      throw new Error(`Expected button type to be "button", but got: "${buttonType}"`);
    }
  }

  // Verify grid first checkbox is visible
  async verifyGridFirstCheckBoxVisible() {
    const gridFirstCheckBox = this.page.locator(DashboardNotesTabLocators.gridFirstCheckBox);
    await gridFirstCheckBox.waitFor({ state: 'visible' });
    return gridFirstCheckBox;
  }

  /**
   * Click grid first checkbox
   * @returns {Promise<void>}
   */
  async clickGridFirstCheckBox() {
    const gridFirstCheckBox = this.page.locator(DashboardNotesTabLocators.gridFirstCheckBox);
    await gridFirstCheckBox.waitFor({ state: 'visible' });
    await gridFirstCheckBox.click();
  }

  /**
   * Verify Copy Notes button is enabled
   * @returns {Promise<void>}
   */
  async verifyCopyNotesButtonEnabled() {
    const copyNotesButton = this.page.locator(DashboardNotesTabLocators.copyNotesButton);
    await copyNotesButton.waitFor({ state: 'visible' });
    const isEnabled = await copyNotesButton.isEnabled();
    if (!isEnabled) {
      throw new Error('Copy Notes button should be enabled after selecting a note');
    }
  }

  /**
   * Click Copy Notes button
   * @returns {Promise<void>}
   */
  async clickCopyNotesButton() {
    const copyNotesButton = this.page.locator(DashboardNotesTabLocators.copyNotesButton);
    await copyNotesButton.waitFor({ state: 'visible' });
    await copyNotesButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Select visibility option and change visibility
   * @param {string} visibilityOption - The visibility option to select (default: 'Public')
   * @returns {Promise<void>}
   */
  async selectVisibilityAndChange(visibilityOption = 'Private') {
    await this.page.locator(DashboardNotesTabLocators.visibilityDropdown).click();
    const dropdownList = this.page.locator(DashboardNotesTabLocators.dropdownList);
    // Wait for the dropdown list to be visible
    await dropdownList.waitFor({ state: 'visible', timeout: 10000 });
    // Select by exact text match, handling both rcbItem and rcbHovered classes
    const option = dropdownList
      .locator('li.rcbItem, li.rcbHovered')
      .getByText(visibilityOption, { exact: true });
    await option.waitFor({ state: 'visible', timeout: 10000 });
    await option.click({ force: true });
    // Wait a moment for UI to update after dropdown selection
    await this.page.waitForTimeout(3000);

    // Wait for any loading panels to be hidden
    await this.page.waitForLoadState('domcontentloaded');

    const changeVisibilityButton = this.page.locator(
      DashboardNotesTabLocators.changeVisibilityButton,
    );
    await changeVisibilityButton.waitFor({ state: 'visible', timeout: 10000 });
    await changeVisibilityButton.click({ force: true });
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Verify visibility column first data
   * @param {string} expectedVisibility - Expected visibility value (default: 'Public')
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  async verifyVisibilityColumnFirstData(expectedVisibility = 'Private') {
    const visibilityColumnFirstData = this.page.locator(
      DashboardNotesTabLocators.visibilityColumnFirstData,
      { hasText: expectedVisibility },
    );
    await visibilityColumnFirstData.waitFor({ state: 'visible' });
    return visibilityColumnFirstData;
  }

  /**
   * Verify Copy Notes modal is visible
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  async verifyCopyNotesModalVisible() {
    const copyNotesModal = this.page.locator(DashboardNotesTabLocators.copyNotesModal);
    return copyNotesModal;
  }

  /**
   * Verify Copy Notes iframe is visible
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  async verifyCopyNotesIframeVisible() {
    const copyNotesModal = this.page.locator(DashboardNotesTabLocators.copyNotesModal);
    return copyNotesModal.locator(DashboardNotesTabLocators.copyNotesIframe);
  }

  /**
   * Get Copy Notes iframe
   * @returns {import('@playwright/test').Frame}
   */
  getCopyNotesFrame() {
    return this.page.frame({ name: DashboardNotesTabLocators.copyNotesIframeName });
  }

  /**
   * Verify modal header
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  async verifyModalHeader() {
    const frame = this.getCopyNotesFrame();
    return frame.locator(DashboardNotesTabLocators.modalHeader);
  }

  /**
   * Click select all checkbox in modal
   * @returns {Promise<void>}
   */
  async clickSelectAllCheckbox() {
    const frame = this.getCopyNotesFrame();
    const selectAllCheckbox = frame.locator(DashboardNotesTabLocators.selectAllCheckbox);
    await selectAllCheckbox.click();
  }

  /**
   * Verify select all checkbox is visible
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  async verifySelectAllCheckboxVisible() {
    const frame = this.getCopyNotesFrame();
    return frame.locator(DashboardNotesTabLocators.selectAllCheckbox);
  }

  /**
   * Verify Send button is disabled
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  async verifySendButtonDisabled() {
    const frame = this.getCopyNotesFrame();
    return frame.locator(DashboardNotesTabLocators.sendButton);
  }

  /**
   * Verify Cancel button is visible
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  async verifyCancelButtonVisible() {
    const frame = this.getCopyNotesFrame();
    return frame.locator(DashboardNotesTabLocators.cancelButton);
  }

  /**
   * Click Cancel button
   * @returns {Promise<void>}
   */
  async clickCancelButton() {
    // Use frameLocator for better iframe handling
    const copyNotesIframe = this.page.frameLocator(DashboardNotesTabLocators.copyNotesIframe);
    const cancelButton = copyNotesIframe.locator(DashboardNotesTabLocators.cancelButton);

    // Wait for button to be visible
    await cancelButton.waitFor({ state: 'visible', timeout: 10000 });
    
    // Scroll the button into view within the iframe and click with force
    await cancelButton.scrollIntoViewIfNeeded();
    await cancelButton.click({ force: true });
  }

  /**
   * Download and assert Excel file
   * @returns {Promise<boolean>}
   */
  async downloadAndAssertExcel() {
    const exportToExcelButton = this.page.locator(DashboardNotesTabLocators.exportToExcelButton);
    await exportToExcelButton.waitFor({ state: 'visible' });

    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      exportToExcelButton.click(),
    ]);
    const suggestedFilename = await download.suggestedFilename();
    await this.page.waitForLoadState('networkidle');
    return suggestedFilename.includes('Notes') && suggestedFilename.endsWith('.xlsx');
  }

  /**
   * Download and assert PDF file
   * @returns {Promise<boolean>}
   */
  async downloadAndAssertPDF() {
    const exportToPDFButton = this.page.locator(DashboardNotesTabLocators.exportToPDFButton);
    await exportToPDFButton.waitFor({ state: 'visible' });

    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      exportToPDFButton.click(),
    ]);
    const suggestedFilename = await download.suggestedFilename();
    await this.page.waitForLoadState('networkidle');
    return suggestedFilename.includes('Notes') && suggestedFilename.endsWith('.pdf');
  }
}

export default DashboardNotesTabPage;
