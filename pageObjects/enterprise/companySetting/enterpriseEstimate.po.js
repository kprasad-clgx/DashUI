import { expect } from '@playwright/test';

export const EnterpriseEstimateLocators = {
  // Estimate Details
  estimateBtn: '#ctl00_ContentPlaceHolder1_EstimateButton',
  addNewEstimateBtn: '#ctl00_ContentPlaceHolder1_gvInvoice_ctl00_ctl02_ctl00_AddNewRecordButton',

  // Estimate Form Fields
  estimateNumberLabel: '#ctl00_ContentPlaceHolder1_gvInvoice_ctl00_ctl02_ctl04_lblEstimateNumber',
  invoicedLabel: '#ctl00_ContentPlaceHolder1_gvInvoice_ctl00_ctl02_ctl04_lblInvoiced',
  invoicedCheckBox: '#ctl00_ContentPlaceHolder1_gvInvoice_ctl00_ctl02_ctl04_chkInvoiced',
  descriptionLabel: '#ctl00_ContentPlaceHolder1_gvInvoice_ctl00_ctl02_ctl04_lblEstimateDescription',
  descriptionInput: '#ctl00_ContentPlaceHolder1_gvInvoice_ctl00_ctl02_ctl04_txtEstimateDescription',
  billToLabel: '#ctl00_ContentPlaceHolder1_gvInvoice_ctl00_ctl02_ctl04_lblBillTo',
  billToDropdown:
    '#ctl00_ContentPlaceHolder1_gvInvoice_ctl00_ctl02_ctl04_RadComboBox_BillToContact_Input',
  estimateDateLabel: '#ctl00_ContentPlaceHolder1_gvInvoice_ctl00_ctl02_ctl04_lblInvoiceDate',
  estimateDateInput: '#ctl00_ContentPlaceHolder1_gvInvoice_ctl00_ctl02_ctl04_txtDays1_popupButton',
  estimateTypeLabel: '#ctl00_ContentPlaceHolder1_gvInvoice_ctl00_ctl02_ctl04_Label4',
  estimateTypeDropdown:
    '#ctl00_ContentPlaceHolder1_gvInvoice_ctl00_ctl02_ctl04_ddlEstimateType_Input',
  careOfLabel: '#ctl00_ContentPlaceHolder1_gvInvoice_ctl00_ctl02_ctl04_lblCareOf',
  careOfInput: '#ctl00_ContentPlaceHolder1_gvInvoice_ctl00_ctl02_ctl04_ddlCareOf_Input',
  notesLabel: '#ctl00_ContentPlaceHolder1_gvInvoice_ctl00_ctl02_ctl04_lblReceivableNotes',
  notesInput: '#ctl00_ContentPlaceHolder1_gvInvoice_ctl00_ctl02_ctl04_txtReceivableNotes',
  classLabel: '#ctl00_ContentPlaceHolder1_gvInvoice_ctl00_ctl02_ctl04_lblClass',
  classDropdown: '#ctl00_ContentPlaceHolder1_gvInvoice_ctl00_ctl02_ctl04_ddlClass_Input',
  estimateAmountLabel: '#ctl00_ContentPlaceHolder1_gvInvoice_ctl00_ctl02_ctl04_Label5',
  estimateAmountInput: '#ctl00_ContentPlaceHolder1_gvInvoice_ctl00_ctl02_ctl04_txtNetClaim',
  cancelButton: '#ctl00_ContentPlaceHolder1_gvInvoice_ctl00_ctl02_ctl04_btnCancel',
  saveButton: '#ctl00_ContentPlaceHolder1_gvInvoice_ctl00_ctl02_ctl04_btnUpdate',

  // Download
  estimatePDFDownload: '#ctl00_ContentPlaceHolder1_gvInvoice_ctl00_ctl02_ctl00_ExportToExcelButton',
};

class EnterpriseEstimatePage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Search for a job by job number - Estimate specific implementation
   * @param {string} jobNumber - The job number to search for
   * @param {string} jobNumberWithName - The job number with name to select from dropdown (optional)
   */
  async searchJobByNumber(jobNumber, jobNumberWithName) {
    const clientLackingButton = '#ctl00_ctl45_ClientLackingButton';
    const jobNumberInput = '#ctl00_ctl45_ddlJobNumber_Input';
    const jobNumberDropdownList = '#ctl00_ctl45_ddlJobNumber_DropDown ul.rcbList li';
    const loadingIndicator = '#ctl00_ctl45_ddlJobNumber_DropDown .loading-class';
    const searchBoxBtn = '#ctl00_ctl45_btnMJobSearch';

    const searchBox = this.page.locator(clientLackingButton);
    await searchBox.waitFor({ state: 'visible', timeout: 30000 });
    await searchBox.click();
    await this.page.waitForLoadState('networkidle');

    const searchBoxInput = this.page.locator(jobNumberInput);
    await searchBoxInput.click();
    await searchBoxInput.fill(jobNumber);

    const loadingIndicatorElement = this.page.locator(loadingIndicator);
    if (await loadingIndicatorElement.isVisible({ timeout: 10000 }).catch(() => false)) {
      await loadingIndicatorElement.waitFor({
        state: 'hidden',
        timeout: 10000,
      });
    }

    const dropdownList = this.page.locator(jobNumberDropdownList);

    // Wait for the specific item containing the full text to appear
    const specificItem = dropdownList.filter({
      hasText: jobNumberWithName,
    });
    await specificItem.waitFor({ state: 'visible', timeout: 10000 });

    // Click the specific suggestion in the dropdown
    await specificItem.click();

    // Click the search button
    const searchBoxBtnElement = this.page.locator(searchBoxBtn);
    await searchBoxBtnElement.click();
    await this.page.waitForLoadState('networkidle');
  }

  // ==================== Navigation Methods ====================

  /**
   * Click Estimate button
   */
  async clickEstimateButton() {
    const estimateBtn = this.page.locator(EnterpriseEstimateLocators.estimateBtn);
    await estimateBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Click Add New Estimate button
   */
  async clickAddNewEstimateButton() {
    const addNewEstimateBtn = this.page.locator(EnterpriseEstimateLocators.addNewEstimateBtn);
    await addNewEstimateBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async waitAndClickAcctDetailsImg() {
    const acctDetailsImg = this.page.getByRole('img', {
      name: 'Acct. Details',
    });
    await acctDetailsImg.waitFor({ state: 'visible', timeout: 10000 });
    await acctDetailsImg.click();
    await this.page.waitForLoadState('networkidle');
  }

  // ==================== Action Methods ====================

  /**
   * Fill description
   * @param {string} description - The description text
   */
  async fillDescription(description) {
    const descriptionInput = this.page.locator(EnterpriseEstimateLocators.descriptionInput);
    await descriptionInput.fill(description);
  }

  /**
   * Fill Bill To dropdown
   * @param {string} billTo - The bill to contact name
   */
  async fillBillTo(billTo) {
    const billToDropdown = this.page.locator(EnterpriseEstimateLocators.billToDropdown);
    await billToDropdown.click();
    await billToDropdown.fill(billTo);
  }

  /**
   * Fill estimate type dropdown
   * @param {string} type - The estimate type
   */
  async fillEstimateType(type) {
    const estimateTypeDropdown = this.page.locator(EnterpriseEstimateLocators.estimateTypeDropdown);
    await estimateTypeDropdown.click();
    await estimateTypeDropdown.fill(type);
  }

  /**
   * Fill Care Of input
   * @param {string} careOf - The care of contact name
   */
  async fillCareOf(careOf) {
    const careOfInput = this.page.locator(EnterpriseEstimateLocators.careOfInput);
    await careOfInput.click();
    await careOfInput.fill(careOf);
  }

  /**
   * Fill notes
   * @param {string} notes - The notes text
   */
  async fillNotes(notes) {
    const notesInput = this.page.locator(EnterpriseEstimateLocators.notesInput);
    await notesInput.click();
    await notesInput.fill(notes);
  }

  /**
   * Fill class dropdown
   * @param {string} classValue - The class value
   */
  async fillClass(classValue) {
    const classDropdown = this.page.locator(EnterpriseEstimateLocators.classDropdown);
    await classDropdown.click();
    await classDropdown.fill(classValue);
  }

  /**
   * Fill estimate amount
   * @param {string} amount - The estimate amount
   */
  async fillEstimateAmount(amount) {
    const estimateAmountInput = this.page.locator(EnterpriseEstimateLocators.estimateAmountInput);
    await estimateAmountInput.click();
    await estimateAmountInput.fill(amount);
  }

  /**
   * Click Save button
   */
  async clickSaveButton() {
    const saveButton = this.page.locator(EnterpriseEstimateLocators.saveButton);
    await saveButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Download estimate Excel file
   * @returns {Promise<Download>} The download object
   */
  async downloadEstimateExcel() {
    const estimatePDFDownload = this.page.locator(EnterpriseEstimateLocators.estimatePDFDownload);
    await estimatePDFDownload.click();
    await this.page.waitForLoadState('networkidle');

    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      estimatePDFDownload.click(),
    ]);

    return download;
  }

  // ==================== Assertion Methods ====================

  /**
   * Assert Add New Estimate button is visible
   */
  async assertAddNewEstimateButtonVisible() {
    const addNewEstimateBtn = this.page.locator(EnterpriseEstimateLocators.addNewEstimateBtn);
    await expect(addNewEstimateBtn).toBeVisible();
  }

  /**
   * Assert Estimate Number label is visible
   */
  async assertEstimateNumberLabelVisible() {
    const estimateNumberLabel = this.page.locator(EnterpriseEstimateLocators.estimateNumberLabel);
    await expect(estimateNumberLabel).toBeVisible();
  }

  /**
   * Assert Invoiced label is visible
   */
  async assertInvoicedLabelVisible() {
    const invoicedLabel = this.page.locator(EnterpriseEstimateLocators.invoicedLabel);
    await expect(invoicedLabel).toBeVisible();
  }

  /**
   * Assert Invoiced checkbox is visible
   */
  async assertInvoicedCheckBoxVisible() {
    const invoicedCheckBox = this.page.locator(EnterpriseEstimateLocators.invoicedCheckBox);
    await expect(invoicedCheckBox).toBeVisible();
  }

  /**
   * Assert Description label is visible
   */
  async assertDescriptionLabelVisible() {
    const descriptionLabel = this.page.locator(EnterpriseEstimateLocators.descriptionLabel);
    await expect(descriptionLabel).toBeVisible();
  }

  /**
   * Assert Bill To label is visible
   */
  async assertBillToLabelVisible() {
    const billToLabel = this.page.locator(EnterpriseEstimateLocators.billToLabel);
    await expect(billToLabel).toBeVisible();
  }

  /**
   * Assert Bill To dropdown is visible
   */
  async assertBillToDropdownVisible() {
    const billToDropdown = this.page.locator(EnterpriseEstimateLocators.billToDropdown);
    await expect(billToDropdown).toBeVisible();
  }

  /**
   * Assert Estimate Date label is visible
   */
  async assertEstimateDateLabelVisible() {
    const estimateDateLabel = this.page.locator(EnterpriseEstimateLocators.estimateDateLabel);
    await expect(estimateDateLabel).toBeVisible();
  }

  /**
   * Assert Estimate Date input is visible
   */
  async assertEstimateDateInputVisible() {
    const estimateDateInput = this.page.locator(EnterpriseEstimateLocators.estimateDateInput);
    await expect(estimateDateInput).toBeVisible();
  }

  /**
   * Assert Estimate Type label is visible
   */
  async assertEstimateTypeLabelVisible() {
    const estimateTypeLabel = this.page.locator(EnterpriseEstimateLocators.estimateTypeLabel);
    await expect(estimateTypeLabel).toBeVisible();
  }

  /**
   * Assert Estimate Type dropdown is visible
   */
  async assertEstimateTypeDropdownVisible() {
    const estimateTypeDropdown = this.page.locator(EnterpriseEstimateLocators.estimateTypeDropdown);
    await expect(estimateTypeDropdown).toBeVisible();
  }

  /**
   * Assert Care Of label is visible
   */
  async assertCareOfLabelVisible() {
    const careOfLabel = this.page.locator(EnterpriseEstimateLocators.careOfLabel);
    await expect(careOfLabel).toBeVisible();
  }

  /**
   * Assert Care Of input is visible
   */
  async assertCareOfInputVisible() {
    const careOfInput = this.page.locator(EnterpriseEstimateLocators.careOfInput);
    await expect(careOfInput).toBeVisible();
  }

  /**
   * Assert Notes label is visible
   */
  async assertNotesLabelVisible() {
    const notesLabel = this.page.locator(EnterpriseEstimateLocators.notesLabel);
    await expect(notesLabel).toBeVisible();
  }

  /**
   * Assert Notes input is visible
   */
  async assertNotesInputVisible() {
    const notesInput = this.page.locator(EnterpriseEstimateLocators.notesInput);
    await expect(notesInput).toBeVisible();
  }

  /**
   * Assert Class label is visible
   */
  async assertClassLabelVisible() {
    const classLabel = this.page.locator(EnterpriseEstimateLocators.classLabel);
    await expect(classLabel).toBeVisible();
  }

  /**
   * Assert Class dropdown is visible
   */
  async assertClassDropdownVisible() {
    const classDropdown = this.page.locator(EnterpriseEstimateLocators.classDropdown);
    await expect(classDropdown).toBeVisible();
  }

  /**
   * Assert Estimate Amount label is visible
   */
  async assertEstimateAmountLabelVisible() {
    const estimateAmountLabel = this.page.locator(EnterpriseEstimateLocators.estimateAmountLabel);
    await expect(estimateAmountLabel).toBeVisible();
  }

  /**
   * Assert Estimate Amount input is visible
   */
  async assertEstimateAmountInputVisible() {
    const estimateAmountInput = this.page.locator(EnterpriseEstimateLocators.estimateAmountInput);
    await expect(estimateAmountInput).toBeVisible();
  }

  /**
   * Assert Cancel button is visible
   */
  async assertCancelButtonVisible() {
    const cancelButton = this.page.locator(EnterpriseEstimateLocators.cancelButton);
    await expect(cancelButton).toBeVisible();
  }

  /**
   * Assert Save button is visible
   */
  async assertSaveButtonVisible() {
    const saveButton = this.page.locator(EnterpriseEstimateLocators.saveButton);
    await expect(saveButton).toBeVisible();
  }

  /**
   * Assert Estimate PDF download button is visible
   */
  async assertEstimatePDFDownloadVisible() {
    const estimatePDFDownload = this.page.locator(EnterpriseEstimateLocators.estimatePDFDownload);
    await expect(estimatePDFDownload).toBeVisible();
  }

  /**
   * Assert downloaded estimate file name matches pattern
   * @param {Download} download - The download object
   * @param {string} jobNumber - The job number to match in filename
   */
  async assertEstimateFileName(download, jobNumber) {
    const fileName = await download.suggestedFilename();
    const pattern = new RegExp(
      `^Job-Estimate-${jobNumber.replace(/-/g, '\\-')}(-[A-Z]+)?(\\(\\d+\\))?\\.xls$`,
    );
    expect(fileName).toMatch(pattern);
  }
}

export default EnterpriseEstimatePage;
