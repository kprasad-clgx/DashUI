/**
 * @typedef {Object} AdminMarketingLocatorsType
 * @property {string} marketingTab
 * @property {string} adminMarketingSubTab
 * @property {string} marketingDashboardPageTitle
 * @property {string} marketingDashboardLabel
 * @property {string} adminMarketingHeader
 * @property {string} adminMarketingLabel
 */

/** @type {AdminMarketingLocatorsType} */
const AdminMarketingLocators = {
  marketingTab: "a.rmLink.rmRootLink:has-text('Marketing')",
  adminMarketingSubTab: "a.rmLink.menuNoChildSubHeader:has-text('Admin Marketing')",
  menuContainer: "div.rmSlide[style*='display: block']",
  marketingDashboardPageTitle: '#ctl00_ContentPlaceHolder1_lblTitle',
  marketingDashboardLabel: '#ctl00_ContentPlaceHolder1_divG1 b',
  adminMarketingHeader: '#ctl00_ContentPlaceHolder1_AdminMarketing span.Heading_blue',
  adminMarketingLabel: '#ctl00_ContentPlaceHolder1_adminpanel b',
};

class AdminMarketingPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToAdminMarketing() {
    // Hover over the Marketing menu
    await this.page.locator(AdminMarketingLocators.marketingTab).hover();
    // Wait for the Admin Marketing submenu item to be visible
    await this.page
      .locator(AdminMarketingLocators.adminMarketingSubTab)
      .waitFor({ state: 'visible', timeout: 10000 });
    // Click on Admin Marketing
    await this.page.locator(AdminMarketingLocators.adminMarketingSubTab).click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyDashboardTitleVisible() {
    const title = this.page.locator(AdminMarketingLocators.marketingDashboardPageTitle);
    await title.waitFor({ state: 'visible' });
    return title;
  }

  async verifyDashboardLabelsVisible(labels) {
    for (const labelText of labels) {
      const labelLocator = this.page.locator(
        `${AdminMarketingLocators.marketingDashboardLabel}:has-text('${labelText}')`,
      );
      await labelLocator.waitFor({ state: 'visible', timeout: 5000 });
    }
  }

  async verifyAdminMarketingHeaderVisible() {
    const header = this.page.locator(AdminMarketingLocators.adminMarketingHeader);
    await header.waitFor({ state: 'visible' });
    return header;
  }

  async verifyAdminMarketingLabelsVisible(labels) {
    for (const labelText of labels) {
      const labelLocator = this.page.locator(
        `${AdminMarketingLocators.adminMarketingLabel}:has-text('${labelText}')`,
      );
      await labelLocator.waitFor({ state: 'visible', timeout: 5000 });
    }
  }
}

export default AdminMarketingPage;
