import { expect } from '@playwright/test';

const createLeadJobPageLocators = {
  // Menu
  dashboardsMenu: "span:has-text('Dashboards')",

  // Page Elements
  radioButtonGroup: '#ctl00_ContentPlaceHolder1_RadioButtonList_Status label',
  errorMessage: '#ctl00_ContentPlaceHolder1_Label1',
};

class CreateLeadJobPage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to Accounts Receivable Tracking from Dashboards menu
   */
  async navigateToAccountsReceivableTracking() {
    await this.page.locator(createLeadJobPageLocators.dashboardsMenu).first().hover();

    const createLeadJobOption = this.page.getByText('Create Lead/Job (Legacy)', {
      exact: true,
    });

    await createLeadJobOption.waitFor({
      state: 'visible',
      timeout: 5000,
    });
    await createLeadJobOption.click();
    await this.page.waitForLoadState('networkidle');

    //
  }

  /**
   * Assert the error message 'We're sorry.' is visible
   */
  async assertErrorMessageVisible() {
    const errorMsg = this.page.locator(createLeadJobPageLocators.errorMessage);
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toHaveText("We're sorry.");
  }

  /**
   * Assert and click the Source URL button
   */
  async assertAndClickSourceURLButton() {
    const sourceURLButton = this.page.locator('#ctl00_ContentPlaceHolder1_buttonSourceURL');
    await expect(sourceURLButton).toBeVisible();
    await sourceURLButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Assert the error message 'Sorry, we\'ve encountered an error' is visible
   */
  async assertGenericErrorMessageVisible() {
    const errorMsg = this.page.locator(createLeadJobPageLocators.errorMessage);
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText("Sorry, we've encountered an error");
  }
}

export default CreateLeadJobPage;
