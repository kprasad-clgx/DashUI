export class AccountingSettingsPage {
  constructor(page) {
    this.page = page;

    // Header
    this.accountingSettingsHeader = page.getByText('Accounting Settings', { exact: true });
    this.administrationMenu = page
      .locator('span.rmText.rmExpandDown')
      .filter({ hasText: 'Administration' });
    this.companySettings = page.getByText('Company Settings', { exact: true });
    this.accounting = page.getByText('Accounting', { exact: true });

    // Invoice and Payment Settings
    this.allowPastDatesForInvoicesLabel = page.locator(
      '#ctl00_ContentPlaceHolder1_Label_AllowPastDatesForInvoices',
    );
    this.allowPastDatesForInvoicesCheckbox = page.locator(
      '#ctl00_ContentPlaceHolder1_CheckBox_AllowPastDatesForInvoices',
    );
    this.invoiceExceptionDaysDropdownArrow = page.locator(
      '#ctl00_ContentPlaceHolder1_RadComboBox_InvoiceExceptionDays_Arrow',
    );
    this.invoiceExceptionDaysInput = page.locator(
      '#ctl00_ContentPlaceHolder1_RadComboBox_InvoiceExceptionDays_Input',
    );

    this.allowPastDatesForPaymentsLabel = page.locator(
      '#ctl00_ContentPlaceHolder1_Label_AllowPastDatesForPayments',
    );
    this.allowPastDatesForPaymentsCheckbox = page.locator(
      '#ctl00_ContentPlaceHolder1_CheckBox_AllowPastDatesForPayments',
    );
    this.paymentExceptionDaysDropdownArrow = page.locator(
      '#ctl00_ContentPlaceHolder1_RadComboBox_PaymentExceptionDays_Arrow',
    );

    this.allowOverInvoicingLabel = page.locator(
      '#ctl00_ContentPlaceHolder1_Label_AllowOverInvoicing',
    );
    this.allowOverInvoicingCheckbox = page.locator(
      '#ctl00_ContentPlaceHolder1_CheckBox_AllowOverInvoicing',
    );

    // Accounting Field Settings
    this.externalFileNumberLabel = page.locator(
      '#ctl00_ContentPlaceHolder1_Label_ExternalFileNumber',
    );
    this.externalFileNumberCheckbox = page.locator(
      '#ctl00_ContentPlaceHolder1_CheckBox_ExternalFileNumber',
    );

    // Estimate Settings
    this.pdfRequiredEstimateLabel = page.locator(
      '#ctl00_ContentPlaceHolder1_PDFRequiredEstimateLabel',
    );
    this.pdfRequiredEstimateCheckbox = page.locator(
      '#ctl00_ContentPlaceHolder1_PDFRequiredEstimateCheckBox',
    );

    // Buttons
    this.saveButton = page.locator(
      '#ctl00_ContentPlaceHolder1_Button_SaveAccountingSettings_input',
    );
    this.backButton = page.locator('#ctl00_ContentPlaceHolder1_Button_Cancel_input');
  }
  async openAccountSettings() {
    await this.administrationMenu.waitFor({ state: 'visible', timeout: 30000 });
    await this.administrationMenu.hover();
    await this.companySettings.click();
    await this.page.waitForLoadState('networkidle');
    await this.accounting.click();
    await this.page.waitForLoadState('networkidle');
  }

  // Verify if Accounting Settings header is displayed
  async isAccountingSettingsDisplayed() {
    return await this.accountingSettingsHeader.isVisible();
  }

  // Verify if Allow past dates for invoices label is displayed
  async isAllowPastDatesForInvoicesDisplayed() {
    return await this.allowPastDatesForInvoicesLabel.isVisible();
  }

  // Check if Allow past dates for invoices checkbox is selected
  async isAllowPastDatesForInvoicesChecked() {
    return await this.allowPastDatesForInvoicesCheckbox.isChecked();
  }

  // Select exception days for invoices
  async selectInvoiceExceptionDays(days) {
    // Wait for the dropdown arrow to be visible and click it
    await this.invoiceExceptionDaysDropdownArrow.waitFor({ state: 'visible', timeout: 5000 });
    await this.invoiceExceptionDaysDropdownArrow.click();

    // Wait a moment for the dropdown to open and select the option using nth-child
    await this.page.waitForTimeout(500);
    const itemIndex = days + 1;
    await this.page
      .locator(
        `#ctl00_ContentPlaceHolder1_RadComboBox_InvoiceExceptionDays_DropDown>.rcbScroll>.rcbList>li:nth-child(${itemIndex})`,
      )
      .click();
  }

  // Save settings
  async saveSettings() {
    await this.saveButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  // Check if updated successfully message is displayed
  async isUpdatedSuccessfullyDisplayed() {
    // Wait for success message with flexible matching
    const successMessage = this.page.locator('text=/Updated Successfully|Success|Saved/i');
    await successMessage.waitFor({ state: 'visible', timeout: 10000 });
    return await successMessage.isVisible();
  }

  // Configure invoice exception days and re-enable past dates feature
  async configureInvoiceExceptionDaysAndEnablePastDates(days) {
    // Check current checkbox state
    const isChecked = await this.isAllowPastDatesForInvoicesChecked();

    // If checked, uncheck it first to enable dropdown editing
    if (isChecked) {
      await this.allowPastDatesForInvoicesCheckbox.uncheck();
    }

    // Configure invoice exception days
    await this.selectInvoiceExceptionDays(days);
    await this.saveSettings();

    // Re-enable past dates feature
    await this.allowPastDatesForInvoicesCheckbox.check();
    await this.saveSettings();
  }
}
