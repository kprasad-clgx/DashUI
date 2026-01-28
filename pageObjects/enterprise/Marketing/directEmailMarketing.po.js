import { expect } from '@playwright/test';

/**
 * @typedef {Object} BizDevDashboardLocatorsType
 * @property {string} marketingTab
 * @property {string} bizDevDashboardSubTab
 * @property {string} pageLabel
 * @property {string} dashboardLabel
 * @property {string} employeeLabel
 * @property {string} employeeValue
 * @property {string} employeeSetButton
 * @property {string} divisionLabel
 * @property {string} divisionValue
 * @property {string} divisionSetButton
 * @property {string} officeLabel
 * @property {string} officeValue
 * @property {string} officeSetButton
 * @property {string} timeFrameLabel
 * @property {string} timeFrameDropdown
 * @property {string} timeFrameOption
 * @property {string} employeeDropdown
 * @property {string} employeeOptions
 */

/** @type {DirectEmailMarketingPage} */
const directEmailMarketingLocators = {
  marketingTab: "a.rmLink.rmRootLink:has-text('Marketing')",
  bizDevDashboardSubTab: "a.rmLink.menuNoChildSubHeader:has-text('Biz Dev Dashboard')",
  pageLabel: '#ctl00_ContentPlaceHolder1_lblEmailTemplateBuilder',
  backToDashboardButton: '#ctl00_ContentPlaceHolder1_btnBackToMarketing',
  gridHeader: '#ctl00_ContentPlaceHolder1_grdFB_ctl00 .rgHeader',
  buttonRow: '#ctl00_ContentPlaceHolder1_MainPnl input[type="button"]',
};

class DirectEmailMarketingPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToDirectEmailMarketing() {
    await this.page.locator(directEmailMarketingLocators.marketingTab).hover();
    await this.page
      .locator(directEmailMarketingLocators.bizDevDashboardSubTab)
      .waitFor({ state: 'visible', timeout: 10000 });
    await this.page.locator(directEmailMarketingLocators.bizDevDashboardSubTab).click();
    await this.page.waitForLoadState('networkidle');
  }

  async assertPageLabel() {
    const pageLabelLocator = this.page.locator(directEmailMarketingLocators.pageLabel);
    await expect(pageLabelLocator).toBeVisible();
    await expect(pageLabelLocator).toHaveText('E-mail Template Builder');
  }

  async assertBackToDashboardButton() {
    const backToMarketingDashboardButton = this.page.locator(
      directEmailMarketingLocators.backToDashboardButton,
    );
    await expect(backToMarketingDashboardButton).toBeVisible();
  }

  async assertGridHeaders(expectedHeaders) {
    for (const labelText of expectedHeaders) {
      const labelLocator = this.page.locator(
        `${directEmailMarketingLocators.gridHeader} :has-text('${labelText}')`,
      );
      await labelLocator.waitFor({ state: 'visible', timeout: 5000 });
    }
  }

  async assertButtonRow(expectedButtons) {
    for (const labelText of expectedButtons) {
      const buttonLocator = this.page.locator(
        `${directEmailMarketingLocators.buttonRow}[value="${labelText}"]`,
      );
      await buttonLocator.waitFor({ state: 'visible', timeout: 5000 });
    }
  }
}

export default DirectEmailMarketingPage;
