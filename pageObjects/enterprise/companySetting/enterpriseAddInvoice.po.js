import { expect } from '@playwright/test';

export const EnterpriseAddInvoiceLocators = {
  // Invoice Details
  invoiceDetailsBtn: '#ctl00_ContentPlaceHolder1_InvoiceButton',
  invoiceDetailsJobNumberLocator: '#ctl00_ContentPlaceHolder1_lblJN',
  addNewInvoiceBtn: '#ctl00_ContentPlaceHolder1_gvInvoices_ctl00_ctl02_ctl00_AddNewRecordButton',

  // Invoice Form Fields
  invoiceMemoLabel: '#ctl00_ContentPlaceHolder1_gvInvoices_ctl00_ctl02_ctl04_lblReceivableNotes',
  invoiceMemoInput: '#ctl00_ContentPlaceHolder1_gvInvoices_ctl00_ctl02_ctl04_txtReceivableNotes',
  additionalInfoLabel:
    '#ctl00_ContentPlaceHolder1_gvInvoices_ctl00_ctl02_ctl04_Label_AdditionalInfoAmount',
  additionalInfoInput:
    '#ctl00_ContentPlaceHolder1_gvInvoices_ctl00_ctl02_ctl04_RadNumericTextBox_AdditionalInfoAmount',
  dateInvoicedLabel: '#ctl00_ContentPlaceHolder1_gvInvoices_ctl00_ctl02_ctl04_lblInvoiceDate',
  calendarPopupBtn:
    '#ctl00_ContentPlaceHolder1_gvInvoices_ctl00_ctl02_ctl04_InvoiceDate_CalendarPopupButton',
  calendarTitle:
    '#ctl00_ContentPlaceHolder1_gvInvoices_ctl00_ctl02_ctl04_InvoiceDate_calendar_Title',
  billToLabel: '#ctl00_ContentPlaceHolder1_gvInvoices_ctl00_ctl02_ctl04_lblBillTo0',
  billToDropdown:
    '#ctl00_ContentPlaceHolder1_gvInvoices_ctl00_ctl02_ctl04_RadComboBox_BillToContact_Input',
  classLabel: '#ctl00_ContentPlaceHolder1_gvInvoices_ctl00_ctl02_ctl04_lblClass1',
  classInput: '#ctl00_ContentPlaceHolder1_gvInvoices_ctl00_ctl02_ctl04_txtClass0',
  invoicedAmountLabel: '#ctl00_ContentPlaceHolder1_gvInvoices_ctl00_ctl02_ctl04_lblAmount',
  invoicedAmountInput: '#ctl00_ContentPlaceHolder1_gvInvoices_ctl00_ctl02_ctl04_txtAmount',
  salesTaxLabel: '#ctl00_ContentPlaceHolder1_gvInvoices_ctl00_ctl02_ctl04_lblTax',
  salesTaxInput: '#ctl00_ContentPlaceHolder1_gvInvoices_ctl00_ctl02_ctl04_txtSalesTaxTotal',
  saveInvoiceBtn: '#ctl00_ContentPlaceHolder1_gvInvoices_ctl00_ctl02_ctl04_btnUpdate',

  // Download
  downloadInvoiceBtn: '#ctl00_ContentPlaceHolder1_gvInvoices_ctl00_ctl02_ctl00_ExportToExcelButton',
};

class EnterpriseAddInvoicePage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Search for a job by job number - Add Invoice specific implementation
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

    // For Add Invoice, we'll select first dropdown option if jobNumberWithName not provided
    if (jobNumberWithName) {
      const specificItem = dropdownList.filter({
        hasText: jobNumberWithName,
      });
      await specificItem.waitFor({ state: 'visible', timeout: 10000 });
      await specificItem.click();
    } else {
      await dropdownList.first().waitFor({ state: 'visible', timeout: 10000 });
      await dropdownList.first().click();
    }

    // Click the search button
    const searchBoxBtnElement = this.page.locator(searchBoxBtn);
    await searchBoxBtnElement.click();
    await this.page.waitForLoadState('networkidle');
  }

  // ==================== Navigation Methods ====================

  /**
   * Click Invoice Details button
   */
  async clickInvoiceDetailsButton() {
    const invoiceDetailsBtn = this.page.locator(EnterpriseAddInvoiceLocators.invoiceDetailsBtn);
    await invoiceDetailsBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Click Add New Invoice button
   */
  async clickAddNewInvoiceButton() {
    const addNewInvoiceBtn = this.page.locator(EnterpriseAddInvoiceLocators.addNewInvoiceBtn);
    await addNewInvoiceBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  // ==================== Action Methods ====================

  /**
   * Fill invoice memo
   * @param {string} memo - The memo text
   */
  async fillInvoiceMemo(memo) {
    const invoiceMemoInput = this.page.locator(EnterpriseAddInvoiceLocators.invoiceMemoInput);
    await invoiceMemoInput.fill(memo);
  }

  /**
   * Fill additional info amount
   * @param {string} amount - The amount
   */
  async fillAdditionalInfo(amount) {
    const additionalInfoInput = this.page.locator(EnterpriseAddInvoiceLocators.additionalInfoInput);
    await additionalInfoInput.fill(amount);
  }

  /**
   * Select today's date from calendar
   */
  async selectTodayDate() {
    const calendarPopupBtn = this.page.locator(EnterpriseAddInvoiceLocators.calendarPopupBtn);
    await calendarPopupBtn.click();

    const calendarTitle = this.page.locator(EnterpriseAddInvoiceLocators.calendarTitle);
    await calendarTitle.waitFor({ state: 'visible', timeout: 10000 });

    const today = new Date();
    const formattedTitle = today.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    });

    const todayCell = this.page.locator(
      `#ctl00_ContentPlaceHolder1_gvInvoices_ctl00_ctl02_ctl04_InvoiceDate_calendar td[title="${formattedTitle}"] a`,
    );
    await todayCell.waitFor({ state: 'visible', timeout: 10000 });
    await todayCell.click();
  }

  /**
   * Fill Bill To dropdown
   * @param {string} billTo - The bill to contact name
   */
  async fillBillTo(billTo) {
    const billToDropdown = this.page.locator(EnterpriseAddInvoiceLocators.billToDropdown);
    await billToDropdown.click();
    await billToDropdown.fill(billTo);
  }

  /**
   * Fill class input
   * @param {string} classValue - The class value
   */
  async fillClass(classValue) {
    const classInput = this.page.locator(EnterpriseAddInvoiceLocators.classInput);
    await classInput.fill(classValue);
  }

  /**
   * Fill invoiced amount
   * @param {string} amount - The invoiced amount
   */
  async fillInvoicedAmount(amount) {
    const invoicedAmountInput = this.page.locator(EnterpriseAddInvoiceLocators.invoicedAmountInput);
    await invoicedAmountInput.fill(amount);
  }

  /**
   * Fill sales tax
   * @param {string} tax - The sales tax amount
   */
  async fillSalesTax(tax) {
    const salesTaxInput = this.page.locator(EnterpriseAddInvoiceLocators.salesTaxInput);
    await salesTaxInput.fill(tax);
  }

  /**
   * Click Save Invoice button
   */
  async clickSaveInvoiceButton() {
    const saveInvoiceBtn = this.page.locator(EnterpriseAddInvoiceLocators.saveInvoiceBtn);
    await saveInvoiceBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Download invoice Excel file
   * @returns {Promise<Download>} The download object
   */
  async downloadInvoiceExcel() {
    const downloadInvoiceBtn = this.page.locator(EnterpriseAddInvoiceLocators.downloadInvoiceBtn);

    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      downloadInvoiceBtn.click(),
    ]);

    return download;
  }

  /**
   * Wait for Acct. Details image to be visible and click it
   */
  async waitAndClickAcctDetailsImg() {
    const acctDetailsImg = this.page.getByRole('link', {
      name: 'Acct. Details',
    });
    await acctDetailsImg.waitFor({ state: 'visible', timeout: 10000 });
    await acctDetailsImg.click();
  }

  // ==================== Assertion Methods ====================

  /**
   * Assert job number is displayed correctly
   */
  async assertJobNumberContains(expectedJobNumber) {
    // Looks for the text "Job Number: <jobNumber>" anywhere on the page
    await expect(this.page.getByText(`Job Number: ${expectedJobNumber}`)).toBeVisible();
  }

  /**
   * Assert invoice details job number contains expected value
   * @param {string} expectedJobNumber - The expected job number
   */
  async assertInvoiceDetailsJobNumber(expectedJobNumber) {
    const invoiceDetailsJobNumberLocator = this.page.locator(
      EnterpriseAddInvoiceLocators.invoiceDetailsJobNumberLocator,
    );
    const invoiceDetailsJobNumberText = await invoiceDetailsJobNumberLocator.textContent();
    expect(invoiceDetailsJobNumberText).toContain(expectedJobNumber);
  }

  /**
   * Assert invoice memo label is visible
   */
  async assertInvoiceMemoLabelVisible() {
    const invoiceMemo = this.page.locator(EnterpriseAddInvoiceLocators.invoiceMemoLabel);
    await expect(invoiceMemo).toBeVisible();
  }

  /**
   * Assert additional info label is visible
   */
  async assertAdditionalInfoLabelVisible() {
    const additionalInfo = this.page.locator(EnterpriseAddInvoiceLocators.additionalInfoLabel);
    await expect(additionalInfo).toBeVisible();
  }

  /**
   * Assert date invoiced label is visible
   */
  async assertDateInvoicedLabelVisible() {
    const dateInvoiced = this.page.locator(EnterpriseAddInvoiceLocators.dateInvoicedLabel);
    await expect(dateInvoiced).toBeVisible();
  }

  /**
   * Assert bill to label is visible
   */
  async assertBillToLabelVisible() {
    const billTo = this.page.locator(EnterpriseAddInvoiceLocators.billToLabel);
    await expect(billTo).toBeVisible();
  }

  /**
   * Assert class label is visible
   */
  async assertClassLabelVisible() {
    const classLabel = this.page.locator(EnterpriseAddInvoiceLocators.classLabel);
    await expect(classLabel).toBeVisible();
  }

  /**
   * Assert invoiced amount label is visible
   */
  async assertInvoicedAmountLabelVisible() {
    const invoicedAmountLabel = this.page.locator(EnterpriseAddInvoiceLocators.invoicedAmountLabel);
    await expect(invoicedAmountLabel).toBeVisible();
  }

  /**
   * Assert sales tax label is visible
   */
  async assertSalesTaxLabelVisible() {
    const salesTaxLabel = this.page.locator(EnterpriseAddInvoiceLocators.salesTaxLabel);
    await expect(salesTaxLabel).toBeVisible();
  }

  /**
   * Assert success message is visible
   */
  async assertInvoiceSavedSuccessfully() {
    const successMessage = this.page.locator('span[style*="color:red"]', {
      hasText: 'Invoice saved successfully.',
    });
    await successMessage.waitFor({ state: 'visible', timeout: 10000 });
    await expect(successMessage).toBeVisible();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Assert downloaded invoice file name matches pattern
   * @param {Download} download - The download object
   * @param {string} jobNumber - The job number to match in filename
   */
  async assertInvoiceFileName(download, jobNumber) {
    const fileName = await download.suggestedFilename();
    const pattern = new RegExp(
      `^Job-Invoices-${jobNumber.replace(/-/g, '\\-')}(\\(\\d+\\))?\\.xls$`,
    );
    expect(fileName).toMatch(pattern);
  }
}

export default EnterpriseAddInvoicePage;
