/**
 * @typedef {Object} ResetPurchaseOrderLocatorsType
 * @property {string} administrationMenu
 * @property {string} menuContainer
 * @property {string} resetPurchaseOrderMenuOption
 * @property {string} resetPurchaseOrderText
 * @property {string} convertPurchaseOrderToWorkOrderButton
 * @property {string} exportToExcelButton
 * @property {string} backToHomePageButton
 * @property {string} purchaseOrderGridHeader
 * @property {string} workOrderGridHeader
 * @property {string} statusGridHeader
 */

/** @type {ResetPurchaseOrderLocatorsType} */
const ResetPurchaseOrderLocators = {
  administrationMenu: "span:has-text('Administration')",
  menuContainer: 'div.rmSlide[style*="display: block"]',
  resetPurchaseOrderMenuOption: 'ul.rmVertical.rmGroup.rmLevel1 li.rmItem a.rmLink span.rmText',
  resetPurchaseOrderText: '#ctl00_ContentPlaceHolder1_lbResetPurchaseOrder',
  convertPurchaseOrderToWorkOrderButton: '#ctl00_ContentPlaceHolder1_btnreset',
  exportToExcelButton: '#ctl00_ContentPlaceHolder1_ButtonExcelExport',
  backToHomePageButton: '#ctl00_ContentPlaceHolder1_btnBackToHomepage',
  purchaseOrderGridHeader: '#ctl00_ContentPlaceHolder1_gvPurchaseOrder_ctl00_Header th.rgHeader a',
  workOrderGridHeader: '#ctl00_ContentPlaceHolder1_gvPurchaseOrder_ctl00_Header th.rgHeader a',
  statusGridHeader: '#ctl00_ContentPlaceHolder1_gvPurchaseOrder_ctl00_Header th.rgHeader a',
};

class ResetPurchaseOrderPage {
  constructor(page) {
    this.page = page;
  }

  // Navigate to Reset Purchase Order page through Administration menu
  async navigateToResetPurchaseOrder() {
    await this.page.locator(ResetPurchaseOrderLocators.administrationMenu).first().hover();
    await this.page
      .locator(ResetPurchaseOrderLocators.menuContainer)
      .waitFor({ state: 'visible', timeout: 5000 });
    await this.page
      .locator(ResetPurchaseOrderLocators.resetPurchaseOrderMenuOption, {
        hasText: /^Reset Purchase Order$/,
      })
      .first()
      .waitFor({ state: 'visible', timeout: 10000 });
    await this.page
      .locator(ResetPurchaseOrderLocators.resetPurchaseOrderMenuOption, {
        hasText: /^Reset Purchase Order$/,
      })
      .first()
      .click();
    await this.page.waitForLoadState('networkidle');
  }

  // Verify Reset Purchase Order text is visible on the page
  async verifyResetPurchaseOrderText() {
    const text = this.page.locator(ResetPurchaseOrderLocators.resetPurchaseOrderText);
    await text.waitFor({ state: 'visible' });
    return text;
  }

  // Verify Convert Purchase Order to Work Order button is visible and is submit type
  async verifyConvertPurchaseOrderToWorkOrderButton() {
    const button = this.page.locator(
      ResetPurchaseOrderLocators.convertPurchaseOrderToWorkOrderButton,
    );
    await button.waitFor({ state: 'visible' });
    return button;
  }

  // Verify Export To Excel button is visible and is submit type
  async verifyExportToExcelButton() {
    const button = this.page.locator(ResetPurchaseOrderLocators.exportToExcelButton);
    await button.waitFor({ state: 'visible' });
    return button;
  }

  // Verify Back to HomePage button is visible and is submit type
  async verifyBackToHomePageButton() {
    const button = this.page.locator(ResetPurchaseOrderLocators.backToHomePageButton);
    await button.waitFor({ state: 'visible' });
    return button;
  }

  // Verify Purchase Order grid header is visible
  async verifyPurchaseOrderGridHeader() {
    const header = this.page.locator(ResetPurchaseOrderLocators.purchaseOrderGridHeader, {
      hasText: /^Purchase Order$/,
    });
    await header.waitFor({ state: 'visible' });
    return header;
  }

  // Verify Work Order grid header is visible
  async verifyWorkOrderGridHeader() {
    const header = this.page.locator(ResetPurchaseOrderLocators.workOrderGridHeader, {
      hasText: /^Work Order$/,
    });
    await header.waitFor({ state: 'visible' });
    return header;
  }

  // Verify Status grid header is visible
  async verifyStatusGridHeader() {
    const header = this.page.locator(ResetPurchaseOrderLocators.statusGridHeader, {
      hasText: /^Status$/,
    });
    await header.waitFor({ state: 'visible' });
    return header;
  }
}

export { ResetPurchaseOrderPage, ResetPurchaseOrderLocators };
