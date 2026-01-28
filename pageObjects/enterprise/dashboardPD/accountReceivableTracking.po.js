import { expect } from '@playwright/test';

const AccountReceivableTrackingLocators = {
  // Menu
  dashboardsMenu: "span:has-text('Dashboards')",

  // Page Elements
  pageHeader: '#ctl00_ContentPlaceHolder1_Label_AccountsReceivableTracking',
  radioButtonGroup: '#ctl00_ContentPlaceHolder1_RadioButtonList_Status label',
};

class AccountReceivableTrackingPage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to Accounts Receivable Tracking from Dashboards menu
   */
  async navigateToAccountsReceivableTracking() {
    await this.page.locator(AccountReceivableTrackingLocators.dashboardsMenu).first().hover();

    const accountsReceivableTrackingOption = this.page.getByText('Accounts Receivable Tracking', {
      exact: true,
    });

    await accountsReceivableTrackingOption.waitFor({
      state: 'visible',
      timeout: 5000,
    });
    await accountsReceivableTrackingOption.click();
    await this.page.waitForLoadState('networkidle');

    //
  }

  /**
   * Assert page header text
   */
  async assertPageHeader() {
    const header = this.page.locator(AccountReceivableTrackingLocators.pageHeader);
    await expect(header).toHaveText('Accounts Receivable Tracking Dashboard');
  }

  /**
   * Assert all radio button options are visible
   */
  async assertAllRadioButtonsVisible() {
    const radioButtonGroupLocator = this.page.locator(
      AccountReceivableTrackingLocators.radioButtonGroup,
    );

    const expectedRadioOptions = ['Show All', 'Show Requested', 'Show Processed', 'Show Rejected'];

    for (const optionText of expectedRadioOptions) {
      const expectedRadioOptionsLabel = radioButtonGroupLocator.filter({
        hasText: optionText,
      });
      await expect(expectedRadioOptionsLabel).toBeVisible();
    }
  }
}

export default AccountReceivableTrackingPage;
