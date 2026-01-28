/**
 * @typedef {Object} DashboardInvoicesTabLocatorsType
 * @property {string} invoicesTab
 * @property {string} addNewButton
 * @property {string} refreshButton
 * @property {string} exportToExcelButton
 * @property {string} exportToPDFButton
 * @property {string} invoicePDFColumnHeader
 * @property {string} invoiceNoColumnHeader
 * @property {string} noteColumnHeader
 * @property {string} customerColumnHeader
 * @property {string} invoiceDateColumnHeader
 * @property {string} amountColumnHeader
 * @property {string} taxIncludedColumnHeader
 * @property {string} invoiceDetailPage
 * @property {string} invoiceDetailAddNewButton
 * @property {string} invoiceDetailRefreshButton
 * @property {string} jobNumberColumnHeader
 * @property {string} invoiceNumberColumnHeader
 * @property {string} invoiceMemoColumnHeader
 * @property {string} invoiceMemoLabel
 * @property {string} invoiceAmountLabel
 * @property {string} saveButton
 * @property {string} cancelButton
 * @property {string} backToSlideBoardButton
 */

// Expected values for invoices tab
const invoicesTabExpectedValues = {
  invoiceDetail: 'Invoice Detail for Job',
};

/** @type {DashboardInvoicesTabLocatorsType} */
const DashboardInvoicesTabLocators = {
  invoicesTab: '#ctl00_ContentPlaceHolder1_dockJobTabs_C_tabStripJobTabs .rtsTxt',
  addNewButton:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Invoices_userControl_gvInvoices_ctl00_ctl02_ctl00_AddNewButton',
  refreshButton:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Invoices_userControl_gvInvoices_ctl00_ctl02_ctl00_RefreshGridButton',
  exportToExcelButton:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Invoices_userControl_gvInvoices_ctl00_ctl02_ctl00_ExportToExcelButton',
  exportToPDFButton:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Invoices_userControl_gvInvoices_ctl00_ctl02_ctl00_ExportToPdfButton',
  invoicePDFColumnHeader:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Invoices_userControl_gvInvoices_GridHeader .rgHeader',
  invoiceNoColumnHeader:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Invoices_userControl_gvInvoices_GridHeader .rgHeader a',
  noteColumnHeader:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Invoices_userControl_gvInvoices_GridHeader .rgHeader a',
  customerColumnHeader:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Invoices_userControl_gvInvoices_GridHeader .rgHeader a',
  invoiceDateColumnHeader:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Invoices_userControl_gvInvoices_GridHeader .rgHeader a',
  amountColumnHeader:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Invoices_userControl_gvInvoices_GridHeader .rgHeader a',
  taxIncludedColumnHeader:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Invoices_userControl_gvInvoices_GridHeader .rgHeader a',
  invoiceDetailPage: '#ctl00_ContentPlaceHolder1_Label1',
  invoiceDetailAddNewButton:
    '#ctl00_ContentPlaceHolder1_gvInvoices_ctl00_ctl02_ctl00_InitInsertButton',
  invoiceDetailRefreshButton:
    '#ctl00_ContentPlaceHolder1_gvInvoices_ctl00_ctl02_ctl00_ExportToExcelButton',
  jobNumberColumnHeader: '#ctl00_ContentPlaceHolder1_gvInvoices_GridHeader th a',
  invoiceNumberColumnHeader: '#ctl00_ContentPlaceHolder1_gvInvoices_GridHeader th a',
  invoiceMemoColumnHeader: '#ctl00_ContentPlaceHolder1_gvInvoices_GridHeader th a',
  invoiceMemoLabel: '#ctl00_ContentPlaceHolder1_gvInvoices_ctl00_ctl02_ctl04_lblReceivableNotes',
  invoiceAmountLabel: '#ctl00_ContentPlaceHolder1_gvInvoices_ctl00_ctl02_ctl04_lblAmount',
  invoiceMemoInput: '#ctl00_ContentPlaceHolder1_gvInvoices_ctl00_ctl02_ctl04_txtReceivableNotes',
  invoiceAmountInput: '#ctl00_ContentPlaceHolder1_gvInvoices_ctl00_ctl02_ctl04_txtAmount',
  saveButton: '#ctl00_ContentPlaceHolder1_gvInvoices_ctl00_ctl02_ctl04_btnUpdate',
  cancelButton: '#ctl00_ContentPlaceHolder1_gvInvoices_ctl00_ctl02_ctl04_btnCancel',
  backToSlideBoardButton: '#ctl00_ContentPlaceHolder1_btnBacktoSlideBoard',
  noteFilterInput:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Invoices_userControl_gvInvoices_ctl00_ctl02_ctl03_FilterTextBox_ReceivableNote',
  invoiceRows:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Invoices_userControl_gvInvoices_GridData table.rgMasterTable > tbody > tr.rgRow, ' +
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Invoices_userControl_gvInvoices_GridData table.rgMasterTable > tbody > tr.rgAltRow',
};

class DashboardInvoicesTabPage {
  constructor(page) {
    this.page = page;
  }

  // Navigate to Invoices tab
  async navigateToInvoicesTab() {
    const invoicesTab = this.page.locator(DashboardInvoicesTabLocators.invoicesTab, {
      hasText: 'Invoices',
    });
    await invoicesTab.waitFor({ state: 'visible', timeout: 5000 });
    await invoicesTab.click();
    await this.page.waitForTimeout(5000);
  }

  // Verify Add New button is visible
  async verifyAddNewButtonVisible() {
    const addNewButton = this.page.locator(DashboardInvoicesTabLocators.addNewButton);
    await addNewButton.waitFor({ state: 'visible' });
    return addNewButton;
  }

  // Verify Refresh button is visible
  async verifyRefreshButtonVisible() {
    const refreshButton = this.page.locator(DashboardInvoicesTabLocators.refreshButton);
    await refreshButton.waitFor({ state: 'visible' });
    return refreshButton;
  }

  // Click on Refresh button
  async clickRefreshButton() {
    const refreshButton = this.page.locator(DashboardInvoicesTabLocators.refreshButton);
    await refreshButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  // Verify Export to Excel button is visible
  async verifyExportToExcelButtonVisible() {
    const exportToExcelButton = this.page.locator(DashboardInvoicesTabLocators.exportToExcelButton);
    await exportToExcelButton.waitFor({ state: 'visible' });
    return exportToExcelButton;
  }

  // Click on Export to Excel button and wait for download
  async clickExportToExcelAndAssertDownload() {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      (await this.verifyExportToExcelButtonVisible()).click(),
    ]);
    const suggestedFilename = await download.suggestedFilename();
    // Assert filename contains 'Invoices' and ends with '.xlsx'
    return suggestedFilename.includes('Invoices') && suggestedFilename.endsWith('.xlsx');
  }

  // Verify Export to PDF button is visible
  async verifyExportToPDFButtonVisible() {
    const exportToPDFButton = this.page.locator(DashboardInvoicesTabLocators.exportToPDFButton);
    await exportToPDFButton.waitFor({ state: 'visible' });
    return exportToPDFButton;
  }

  // Click on Export to PDF button and wait for download
  async clickExportToPDFAndAssertDownload() {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      (await this.verifyExportToPDFButtonVisible()).click(),
    ]);
    const suggestedFilename = await download.suggestedFilename();
    // Assert filename contains 'Invoices' and ends with '.pdf'
    return suggestedFilename.includes('Invoices') && suggestedFilename.endsWith('.pdf');
  }

  // Verify Invoice PDF column header is visible
  async verifyInvoicePDFColumnHeaderVisible() {
    const invoicePDFColumnHeader = this.page.locator(
      DashboardInvoicesTabLocators.invoicePDFColumnHeader,
      { hasText: 'Invoice PDF' },
    );
    await invoicePDFColumnHeader.waitFor({ state: 'visible', timeout: 60000 });
    return invoicePDFColumnHeader;
  }

  // Verify Invoice No. column header is visible
  async verifyInvoiceNoColumnHeaderVisible() {
    const invoiceNoColumnHeader = this.page.locator(
      DashboardInvoicesTabLocators.invoiceNoColumnHeader,
      { hasText: 'Invoice No.' },
    );
    await invoiceNoColumnHeader.waitFor({ state: 'visible' });
    return invoiceNoColumnHeader;
  }

  // Verify Note column header is visible
  async verifyNoteColumnHeaderVisible() {
    const noteColumnHeader = this.page.locator(DashboardInvoicesTabLocators.noteColumnHeader, {
      hasText: 'Note',
    });
    await noteColumnHeader.waitFor({ state: 'visible' });
    return noteColumnHeader;
  }

  // Verify Customer column header is visible
  async verifyCustomerColumnHeaderVisible() {
    const customerColumnHeader = this.page.locator(
      DashboardInvoicesTabLocators.customerColumnHeader,
      { hasText: 'Customer' },
    );
    await customerColumnHeader.waitFor({ state: 'visible' });
    return customerColumnHeader;
  }

  // Verify Invoice Date column header is visible
  async verifyInvoiceDateColumnHeaderVisible() {
    const invoiceDateColumnHeader = this.page.locator(
      DashboardInvoicesTabLocators.invoiceDateColumnHeader,
      { hasText: 'Invoice Date' },
    );
    await invoiceDateColumnHeader.waitFor({ state: 'visible' });
    return invoiceDateColumnHeader;
  }

  // Verify Amount column header is visible
  async verifyAmountColumnHeaderVisible() {
    const amountColumnHeader = this.page.locator(DashboardInvoicesTabLocators.amountColumnHeader, {
      hasText: 'Amount',
    });
    await amountColumnHeader.waitFor({ state: 'visible' });
    return amountColumnHeader;
  }

  // Verify Tax Included column header is visible
  async verifyTaxIncludedColumnHeaderVisible() {
    const taxIncludedColumnHeader = this.page.locator(
      DashboardInvoicesTabLocators.taxIncludedColumnHeader,
      { hasText: 'Tax Included' },
    );
    await taxIncludedColumnHeader.waitFor({ state: 'visible' });
    return taxIncludedColumnHeader;
  }

  // Click Add New button
  async clickAddNewButton() {
    const addNewButton = this.page.locator(DashboardInvoicesTabLocators.addNewButton);
    await addNewButton.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(3000); // Wait for page to fully render
  }

  // Verify invoice detail page is visible and has correct text
  async verifyInvoiceDetailPageVisible() {
    const invoiceDetailPage = this.page.locator(DashboardInvoicesTabLocators.invoiceDetailPage);
    await invoiceDetailPage.waitFor({ state: 'visible' });
    return invoiceDetailPage;
  }

  // Verify Invoice detail page Add New button is visible
  async verifyInvoiceDetailAddNewButtonVisible() {
    const invoiceDetailAddNewButton = this.page.locator(
      DashboardInvoicesTabLocators.invoiceDetailAddNewButton,
    );
    await invoiceDetailAddNewButton.waitFor({ state: 'visible' });
    return invoiceDetailAddNewButton;
  }

  // Verify Invoice detail page Refresh button is visible
  async verifyInvoiceDetailRefreshButtonVisible() {
    const invoiceDetailRefreshButton = this.page.locator(
      DashboardInvoicesTabLocators.invoiceDetailRefreshButton,
    );
    await invoiceDetailRefreshButton.waitFor({ state: 'visible' });
    return invoiceDetailRefreshButton;
  }

  // Verify Job Number column header is visible
  async verifyJobNumberColumnHeaderVisible() {
    const jobNumberColumnHeader = this.page.locator(
      DashboardInvoicesTabLocators.jobNumberColumnHeader,
      { hasText: 'Job Number' },
    );
    await jobNumberColumnHeader.waitFor({ state: 'visible' });
    return jobNumberColumnHeader;
  }

  // Verify Invoice Number column header is visible
  async verifyInvoiceNumberColumnHeaderVisible() {
    const invoiceNumberColumnHeader = this.page.locator(
      DashboardInvoicesTabLocators.invoiceNumberColumnHeader,
      { hasText: 'Invoice Number' },
    );
    await invoiceNumberColumnHeader.waitFor({
      state: 'visible',
      timeout: 90000,
    });
    return invoiceNumberColumnHeader;
  }

  // Verify Invoice Memo column header is visible
  async verifyInvoiceMemoColumnHeaderVisible() {
    const invoiceMemoColumnHeader = this.page.locator(
      DashboardInvoicesTabLocators.invoiceMemoColumnHeader,
      { hasText: 'Invoice Memo' },
    );
    await invoiceMemoColumnHeader.waitFor({ state: 'visible' });
    return invoiceMemoColumnHeader;
  }

  // Click Invoice Detail Add New button
  async clickInvoiceDetailAddNewButton() {
    const invoiceDetailAddNewButton = this.page.locator(
      DashboardInvoicesTabLocators.invoiceDetailAddNewButton,
    );
    await invoiceDetailAddNewButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  // Verify Invoice Memo label is visible
  async verifyInvoiceMemoLabelVisible() {
    const invoiceMemoLabel = this.page.locator(DashboardInvoicesTabLocators.invoiceMemoLabel);
    await invoiceMemoLabel.waitFor({ state: 'visible' });
    return invoiceMemoLabel;
  }

  // Verify Invoice Amount label is visible
  async verifyInvoiceAmountLabelVisible() {
    const invoiceAmountLabel = this.page.locator(DashboardInvoicesTabLocators.invoiceAmountLabel);
    await invoiceAmountLabel.waitFor({ state: 'visible' });
    return invoiceAmountLabel;
  }

  // Verify Save button is visible
  async verifySaveButtonVisible() {
    const saveButton = this.page.locator(DashboardInvoicesTabLocators.saveButton);
    await saveButton.waitFor({ state: 'visible' });
    return saveButton;
  }

  // Verify Cancel button is visible
  async verifyCancelButtonVisible() {
    const cancelButton = this.page.locator(DashboardInvoicesTabLocators.cancelButton);
    await cancelButton.waitFor({ state: 'visible' });
    return cancelButton;
  }

  // Verify Back to Slide Board button is visible
  async verifyBackToSlideBoardButtonVisible() {
    const backToSlideBoardButton = this.page.locator(
      DashboardInvoicesTabLocators.backToSlideBoardButton,
    );
    await backToSlideBoardButton.waitFor({ state: 'visible' });
    return backToSlideBoardButton;
  }

  // Click Back to Slide Board button
  async clickBackToSlideBoardButton() {
    const backToSlideBoardButton = this.page.locator(
      DashboardInvoicesTabLocators.backToSlideBoardButton,
    );
    await backToSlideBoardButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  // Fill invoice memo field
  async fillInvoiceMemo(memoText) {
    const invoiceMemoInput = this.page.locator(DashboardInvoicesTabLocators.invoiceMemoInput);
    await invoiceMemoInput.waitFor({ state: 'visible' });
    await invoiceMemoInput.click();
    await invoiceMemoInput.fill(memoText.toString());
  }

  // Fill invoice amount field
  async fillInvoiceAmount(amount) {
    const invoiceAmountInput = this.page.locator(DashboardInvoicesTabLocators.invoiceAmountInput);
    await invoiceAmountInput.waitFor({ state: 'visible' });
    await invoiceAmountInput.click();
    await invoiceAmountInput.fill(amount.toString());
  }

  // Click Save button
  async clickSaveButton() {
    const saveButton = this.page.locator(DashboardInvoicesTabLocators.saveButton);
    await saveButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  // Filter invoices by note
  async filterByNote(noteText) {
    const noteInput = this.page.locator(DashboardInvoicesTabLocators.noteFilterInput);
    await noteInput.waitFor({ state: 'visible' });
    await noteInput.click();
    await noteInput.fill(noteText.toString());
    await this.page.keyboard.press('Enter');
    await this.page.waitForLoadState('networkidle');
  }

  // Assert invoice row count
  async assertInvoiceRowCount() {
    const invoiceRows = this.page.locator(DashboardInvoicesTabLocators.invoiceRows);
    await invoiceRows.first().waitFor({ state: 'visible', timeout: 5000 });
    return invoiceRows;
  }

  // Get expected invoice detail text
  getExpectedInvoiceDetail() {
    return invoicesTabExpectedValues.invoiceDetail;
  }
}

export default DashboardInvoicesTabPage;
export { invoicesTabExpectedValues };
