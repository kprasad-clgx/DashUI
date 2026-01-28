import { expect } from '@playwright/test';

export const EnterpriseAddPaymentLocators = {
  // Payment Details
  paymentsBtn: '#ctl00_ContentPlaceHolder1_PaymentButton',
  paymentRows:
    '#ctl00_ContentPlaceHolder1_gvPayments_ctl00 tbody tr[id^="ctl00_ContentPlaceHolder1_gvPayments_ctl00__"]',
  gridTable: '#ctl00_ContentPlaceHolder1_gvPayments_ctl00',
  addNewPaymentBtn: '#ctl00_ContentPlaceHolder1_gvPayments_ctl00_ctl02_ctl00_AddNewRecordButton',

  // Payment Form Fields
  paymentModeLabel: '#ctl00_ContentPlaceHolder1_gvPayments_ctl00_ctl02_ctl04_Lebel_PaymentMode',
  paymentModeDropdown:
    '#ctl00_ContentPlaceHolder1_gvPayments_ctl00_ctl02_ctl04_PaymentModeRadComboBox_Input',
  memoLabel: '#ctl00_ContentPlaceHolder1_gvPayments_ctl00_ctl02_ctl04_Label_Memo',
  memoInput: '#ctl00_ContentPlaceHolder1_gvPayments_ctl00_ctl02_ctl04_txtMemo',
  invoiceNumberLabel: '#ctl00_ContentPlaceHolder1_gvPayments_ctl00_ctl02_ctl04_Label_InvoiceNumber',
  invoiceNumberDropdown:
    '#ctl00_ContentPlaceHolder1_gvPayments_ctl00_ctl02_ctl04_ddlInvoiceId_Input',
  invoiceDropdownItems:
    '#ctl00_ContentPlaceHolder1_gvPayments_ctl00_ctl02_ctl04_ddlInvoiceId_DropDown ul.rcbList li',
  calendarPopupBtn:
    '#ctl00_ContentPlaceHolder1_gvPayments_ctl00_ctl02_ctl04_txtDateOfPayment_popupButton',
  calendarTitle:
    '#ctl00_ContentPlaceHolder1_gvPayments_ctl00_ctl02_ctl04_txtDateOfPayment_calendar_Title',
  calendarNextBtn:
    '#ctl00_ContentPlaceHolder1_gvPayments_ctl00_ctl02_ctl04_txtDateOfPayment_calendar_NN',
  referenceNumberLabel: '#ctl00_ContentPlaceHolder1_gvPayments_ctl00_ctl02_ctl04_Label_ReferenceNo',
  referenceNumberInput: '#ctl00_ContentPlaceHolder1_gvPayments_ctl00_ctl02_ctl04_txtRefferenceNo',
  paymentAmountLabel: '#ctl00_ContentPlaceHolder1_gvPayments_ctl00_ctl02_ctl04_Label_PaymentAmount',
  paymentAmountInput: '#ctl00_ContentPlaceHolder1_gvPayments_ctl00_ctl02_ctl04_txtPaymentAmount',
  discountAmountLabel: '#ctl00_ContentPlaceHolder1_gvPayments_ctl00_ctl02_ctl04_Label2',
  discountAmountInput:
    '#ctl00_ContentPlaceHolder1_gvPayments_ctl00_ctl02_ctl04_RadNumericTextBox_DiscountAmount',
  saveBtn: '#ctl00_ContentPlaceHolder1_gvPayments_ctl00_ctl02_ctl04_btnUpdate',
};

class EnterpriseAddPaymentPage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Search for a job by job number - Add Payment specific implementation
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

    // For Add Payment, we'll select first dropdown option if jobNumberWithName not provided
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

  // ==================== Navigation Methods ====================

  /**
   * Click Payments button
   */
  async clickPaymentsButton() {
    const paymentsBtn = this.page.locator(EnterpriseAddPaymentLocators.paymentsBtn);
    await paymentsBtn.isVisible();
    await paymentsBtn.click();
  }

  /**
   * Get total payment rows count
   * @returns {Promise<number>} The count of payment rows
   */
  async getPaymentRowsCount() {
    const gridTable = this.page.locator(EnterpriseAddPaymentLocators.gridTable);
    await gridTable.waitFor({ state: 'visible', timeout: 10000 });

    const paymentRows = this.page.locator(EnterpriseAddPaymentLocators.paymentRows);
    return await paymentRows.count();
  }

  /**
   * Click Add New Payment button
   */
  async clickAddNewPaymentButton() {
    const addNewPaymentBtn = this.page.locator(EnterpriseAddPaymentLocators.addNewPaymentBtn);
    await addNewPaymentBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  // ==================== Action Methods ====================

  /**
   * Fill payment mode dropdown
   * @param {string} mode - The payment mode
   */
  async fillPaymentMode(mode) {
    const paymentModeDropdown = this.page.locator(EnterpriseAddPaymentLocators.paymentModeDropdown);
    await paymentModeDropdown.click();
    await paymentModeDropdown.fill(mode);
  }

  /**
   * Fill memo input
   * @param {string} memo - The memo text
   */
  async fillMemo(memo) {
    const memoInput = this.page.locator(EnterpriseAddPaymentLocators.memoInput);
    await memoInput.fill(memo);
  }

  /**
   * Select first invoice from dropdown
   */
  async selectFirstInvoice() {
    const invoiceNumberDropdown = this.page.locator(
      EnterpriseAddPaymentLocators.invoiceNumberDropdown,
    );
    await invoiceNumberDropdown.click();

    const invoiceDropdownItems = this.page.locator(
      EnterpriseAddPaymentLocators.invoiceDropdownItems,
    );
    await invoiceDropdownItems.first().waitFor({ state: 'visible', timeout: 10000 });
    await invoiceDropdownItems.first().click();
  }

  /**
   * Select today's date from calendar
   */
  async selectTodayDateForPayment() {
    const calendarPopupBtn = this.page.locator(EnterpriseAddPaymentLocators.calendarPopupBtn);
    await calendarPopupBtn.click();

    const calendarTitle = this.page.locator(EnterpriseAddPaymentLocators.calendarTitle);
    await calendarTitle.waitFor({ state: 'visible', timeout: 10000 });

    const today = new Date();
    const targetMonthYear = today.toLocaleString('en-US', {
      month: 'long',
      year: 'numeric',
    });

    // Navigate to the correct month/year if needed
    while ((await calendarTitle.textContent()).trim() !== targetMonthYear) {
      const nextBtn = this.page.locator(EnterpriseAddPaymentLocators.calendarNextBtn);
      await nextBtn.click();
      await this.page.waitForTimeout(500);
    }

    const formattedTitle = today.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    });

    const todayCell = this.page.locator(
      `#ctl00_ContentPlaceHolder1_gvPayments_ctl00_ctl02_ctl04_txtDateOfPayment_calendar td[title="${formattedTitle}"] a`,
    );
    await todayCell.waitFor({ state: 'visible', timeout: 10000 });
    await todayCell.click();
  }

  /**
   * Fill reference number
   * @param {string} refNumber - The reference number
   */
  async fillReferenceNumber(refNumber) {
    const referenceNumberInput = this.page.locator(
      EnterpriseAddPaymentLocators.referenceNumberInput,
    );
    await referenceNumberInput.fill(refNumber);
  }

  /**
   * Fill payment amount
   * @param {string} amount - The payment amount
   */
  async fillPaymentAmount(amount) {
    const paymentAmountInput = this.page.locator(EnterpriseAddPaymentLocators.paymentAmountInput);
    await paymentAmountInput.fill(amount);
  }

  /**
   * Fill discount amount
   * @param {string} amount - The discount amount
   */
  async fillDiscountAmount(amount) {
    const discountAmountInput = this.page.locator(EnterpriseAddPaymentLocators.discountAmountInput);
    await discountAmountInput.fill(amount);
  }

  /**
   * Click Save button
   */
  async clickSavePaymentButton() {
    const saveBtn = this.page.locator(EnterpriseAddPaymentLocators.saveBtn);
    await saveBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Wait for payment rows to increase
   * @param {number} initialCount - The initial row count
   * @returns {Promise<number>} The new row count
   */
  async waitForPaymentRowsIncrease(initialCount) {
    const paymentRows = this.page.locator(EnterpriseAddPaymentLocators.paymentRows);
    let newCount = await paymentRows.count();
    const maxWait = 10000;
    const pollInterval = 500;
    const startTime = Date.now();

    while (newCount <= initialCount && Date.now() - startTime < maxWait) {
      await this.page.waitForTimeout(pollInterval);
      newCount = await paymentRows.count();
    }

    return newCount;
  }

  // ==================== Assertion Methods ====================

  /**
   * Assert job number is displayed correctly
   * @param {string} expectedJobNumber
   */
  async assertJobNumberContains(expectedJobNumber) {
    // Looks for the text "Job Number: <jobNumber>" anywhere on the page
    await expect(this.page.getByText(`Job Number: ${expectedJobNumber}`)).toBeVisible();
  }

  /**
   * Assert payment mode label is visible
   */
  async assertPaymentModeLabelVisible() {
    const paymentModeLabel = this.page.locator(EnterpriseAddPaymentLocators.paymentModeLabel);
    await paymentModeLabel.isVisible();
  }

  /**
   * Assert memo label is visible
   */
  async assertMemoLabelVisible() {
    const memoLabel = this.page.locator(EnterpriseAddPaymentLocators.memoLabel);
    await memoLabel.isVisible();
  }

  /**
   * Assert invoice number label is visible
   */
  async assertInvoiceNumberLabelVisible() {
    const invoiceNumberLabel = this.page.locator(EnterpriseAddPaymentLocators.invoiceNumberLabel);
    await invoiceNumberLabel.isVisible();
  }

  /**
   * Assert reference number label is visible
   */
  async assertReferenceNumberLabelVisible() {
    const referenceNumberLabel = this.page.locator(
      EnterpriseAddPaymentLocators.referenceNumberLabel,
    );
    await referenceNumberLabel.isVisible();
  }

  /**
   * Assert payment amount label is visible
   */
  async assertPaymentAmountLabelVisible() {
    const paymentAmountLabel = this.page.locator(EnterpriseAddPaymentLocators.paymentAmountLabel);
    await paymentAmountLabel.isVisible();
  }

  /**
   * Assert discount amount label is visible
   */
  async assertDiscountAmountLabelVisible() {
    const discountAmountLabel = this.page.locator(EnterpriseAddPaymentLocators.discountAmountLabel);
    await discountAmountLabel.isVisible();
  }

  /**
   * Assert payment rows increased
   * @param {number} newCount - The new row count
   * @param {number} initialCount - The initial row count
   */
  async assertPaymentRowsIncreased(newCount, initialCount) {
    expect(newCount).toBeGreaterThan(initialCount);
  }
}

export default EnterpriseAddPaymentPage;
