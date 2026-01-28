import { expect } from '@playwright/test';

export class EmailTemplatePage {
  constructor(page) {
    this.page = page;
    this.moreMenuHover = page.locator("span:has-text('More...')").first();
    this.emailTemplateBuilderMenuItem = page.getByText('E-mail Template Builder', { exact: true });
    this.emailTemplateBuilderHeading = page.locator(
      '#ctl00_ContentPlaceHolder1_lblEmailTemplateBuilder',
    );
    this.backToMarketingDashboardButton = page.locator(
      '#ctl00_ContentPlaceHolder1_btnBackToMarketing',
    );
    this.gridHeaderLocator = page.locator('#ctl00_ContentPlaceHolder1_grdFB_ctl00 .rgHeader');
    this.selectBoxMinus = page.locator('span.rtMinus[unselectable="on"]');
    this.selectBoxPlus = page.locator('span.rtPlus[unselectable="on"]');
    this.expandOptionHeader = page.locator('#ctl00_ContentPlaceHolder1_FBTree .rtIn');
  }

  async navigateToEmailTemplateBuilder() {
    await this.moreMenuHover.hover();
    await this.emailTemplateBuilderMenuItem.waitFor({
      state: 'visible',
      timeout: 5000,
    });
    await this.emailTemplateBuilderMenuItem.click();
    await this.page.waitForLoadState('networkidle');
  }

  async validateHeading() {
    await expect(this.emailTemplateBuilderHeading).toBeVisible();
  }

  async validateBackButton() {
    await expect(this.backToMarketingDashboardButton).toBeVisible();
  }

  async validateGridHeaders(gridHeaders) {
    for (const headerText of gridHeaders) {
      const headerLocator = this.gridHeaderLocator.filter({
        hasText: headerText,
      });
      await expect(headerLocator).toBeVisible();
    }
  }

  async testCollapseExpand() {
    await expect(this.selectBoxMinus).toBeVisible();
    await this.selectBoxMinus.click();
    await this.page.waitForSelector('span.rtPlus[unselectable="on"]', {
      state: 'visible',
      timeout: 5000,
    });
    await expect(this.selectBoxPlus).toBeVisible();
    await expect(this.selectBoxMinus).toBeHidden();
    await this.selectBoxPlus.click();
  }

  async validateExpandOptionHeaders(expandOptionHeaders) {
    for (const headerText of expandOptionHeaders) {
      const headerLocator = this.expandOptionHeader.filter({
        hasText: headerText,
      });
      await expect(headerLocator).toBeVisible();
    }
  }

  async validateAllButtons(allButtons) {
    for (const buttonValue of allButtons) {
      const buttonLocator = this.page.locator(
        `#ctl00_ContentPlaceHolder1_MainPnl input.btn[value="${buttonValue}"]`,
      );
      await expect(buttonLocator).toBeVisible();
    }
  }
}
