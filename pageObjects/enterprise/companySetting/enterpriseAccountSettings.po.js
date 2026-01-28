import { expect } from '@playwright/test';

export const EnterpriseAccountSettingsLocators = {
  // Administration Menu
  administrationMenu: 'span:has-text("Administration")',
  companySettingsLink: 'a:has-text("Company Settings")',

  // Company Settings Cards
  accountingLogoCard: '.card_20309',

  // Account Settings
  accountSettingsAllowPastDateForInvoicesCheckbox:
    '#ctl00_ContentPlaceHolder1_CheckBox_AllowPastDatesForInvoices',
  accountSettingsSaveBtn: '#ctl00_ContentPlaceHolder1_Button_SaveAccountingSettings_input',
  accountSettingsBackBtn: '#ctl00_ContentPlaceHolder1_Button_Cancel_input',
};

class EnterpriseAccountSettingsPage {
  constructor(page) {
    this.page = page;
  }

  // ==================== Navigation Methods ====================

  /**
   * Hover over Administration menu
   */
  async hoverAdministrationMenu() {
    await this.page.locator(EnterpriseAccountSettingsLocators.administrationMenu).first().hover();
  }

  /**
   * Click Company Settings link
   */
  async clickCompanySettingsLink() {
    await this.page.locator(EnterpriseAccountSettingsLocators.companySettingsLink).first().click();
  }

  /**
   * Navigate to Company Settings page
   */
  async navigateToCompanySettings() {
    await this.hoverAdministrationMenu();
    await this.clickCompanySettingsLink();
  }

  /**
   * Click on Accounting Logo Card
   */
  async clickAccountingLogoCard() {
    await this.page.locator(EnterpriseAccountSettingsLocators.accountingLogoCard).click();
    await this.page.waitForLoadState('networkidle');
  }

  // ==================== Action Methods ====================

  /**
   * Click Allow Past Date checkbox for invoices
   */
  async clickAllowPastDateCheckbox() {
    await this.page
      .locator(EnterpriseAccountSettingsLocators.accountSettingsAllowPastDateForInvoicesCheckbox)
      .click();
  }

  /**
   * Click Save button on account settings
   */
  async clickSaveButton() {
    await this.page.locator(EnterpriseAccountSettingsLocators.accountSettingsSaveBtn).click();
    await this.page.waitForLoadState('networkidle');
  }

  // ==================== Assertion Methods ====================

  /**
   * Assert Accounting Logo Card is visible
   */
  async assertAccountingLogoCardVisible() {
    await expect(
      this.page.locator(EnterpriseAccountSettingsLocators.accountingLogoCard),
    ).toBeVisible();
  }

  /**
   * Assert Allow Past Date checkbox is visible
   */
  async assertAllowPastDateCheckboxVisible() {
    await expect(
      this.page.locator(
        EnterpriseAccountSettingsLocators.accountSettingsAllowPastDateForInvoicesCheckbox,
      ),
    ).toBeVisible();
  }

  /**
   * Assert success message is displayed
   */
  async assertSuccessMessageVisible() {
    await expect(this.page.getByText('Updated Successfully....', { exact: true })).toBeVisible();
    await this.page.waitForLoadState('networkidle');
  }
}

export default EnterpriseAccountSettingsPage;
