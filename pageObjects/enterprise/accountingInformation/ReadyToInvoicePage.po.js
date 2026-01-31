import { BasePage } from '../basePage/enterpriseBasePage.po.js';

export class ReadyToInvoicePage extends BasePage {
  constructor(page) {
    super(page);
    this.readyToInvoiceIcon = page.locator(
      '#AccountingHeaderLinkPanel > div:nth-child(7) > a > img',
    );
    this.addNewRecordButton = page.locator(
      '#ctl00_ContentPlaceHolder1_AccountsReceivableTrackingGrid_ctl00_ctl02_ctl00_AddNewRecordButton',
    );
    this.modalIframeName = 'iframe[name="window_Common"]';
  }

  get iframe() {
    return this.page.frameLocator(this.modalIframeName);
  }

  async openReadyToInvoice() {
    // Wait for the accounting icons panel to be visible (replace ensureAccountingIconsVisible)
    await this.page
      .locator('#AccountingHeaderLinkPanel')
      .waitFor({ state: 'visible', timeout: 10000 });
    await this.readyToInvoiceIcon.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickAddNewRecord() {
    await this.addNewRecordButton.click();
    await this.page.locator(this.modalIframeName).waitFor({ state: 'visible', timeout: 10000 });
  }

  async fillDateOfInvoice(date) {
    await this.iframe.locator('#DateOfInVoiceDateTimePicker_dateInput').fill(date);
  }

  async selectBillTo(customerLastName) {
    const billToInput = this.iframe.locator('#BillToRadComboBox_Input');
    const billToOption = this.iframe
      .locator('#BillToRadComboBox_DropDown li')
      .filter({ hasText: customerLastName })
      .first();

    await this.selectFromDropdown(billToInput, customerLastName, billToOption);
  }

  async fillInvoiceAmount(amount) {
    await this.iframe.locator('#InvoiceAmountRadTextBox').fill(String(amount));
  }

  async fillInvoiceNumber(invoiceNumber) {
    await this.iframe.locator('#InvoiceNumberRadTextBox').fill(invoiceNumber);
  }

  async fillTerms(terms) {
    await this.iframe.locator('#TermsRadTextBox').fill(terms);
  }

  async selectAssignee(assigneeName = 'admin') {
    const assigneeInput = this.iframe.locator('#AssigneeRadComboBox_Input');
    const assigneeOption = this.iframe
      .locator('#AssigneeRadComboBox_DropDown li')
      .filter({ hasText: assigneeName })
      .first();

    await this.selectFromDropdown(assigneeInput, assigneeName, assigneeOption);
  }

  async checkCopyNoticeToEstimator() {
    await this.iframe.locator('#CopyNoticeToCheckBoxList_0').check();
  }

  async fillSpecialInstructions(instructions) {
    await this.iframe.locator('#SpecialInstructionsTextBox').fill(instructions);
  }

  async clickSave() {
    await this.iframe
      .locator('input[type="submit"][value="Save"], button:has-text("Save")')
      .click();
  }

  async createInvoice({
    dateOfInvoice,
    customerLastName,
    invoiceAmount,
    invoiceNumber,
    terms,
    assignee,
    copyNoticeToEstimator,
    specialInstructions,
  }) {
    await this.openReadyToInvoice();
    await this.clickAddNewRecord();

    await this.fillDateOfInvoice(dateOfInvoice);
    await this.selectBillTo(customerLastName);
    await this.fillInvoiceAmount(invoiceAmount);
    await this.fillInvoiceNumber(invoiceNumber);
    await this.fillTerms(terms);
    await this.selectAssignee(assignee);

    if (copyNoticeToEstimator) {
      await this.checkCopyNoticeToEstimator();
    }

    await this.fillSpecialInstructions(specialInstructions);
    await this.clickSave();
  }
}
