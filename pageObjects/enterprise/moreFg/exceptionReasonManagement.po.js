import { expect } from '@playwright/test';

export class ExceptionReasonManagementPage {
  constructor(page) {
    this.page = page;
    this.moreMenuHover = page.locator("span:has-text('More...')").first();
    this.exceptionReasonManagementMenuItem = page.getByText('Exception Reason Management', {
      exact: true,
    });
    this.assignExceptionReasonButton = page.locator('#ctl00_ContentPlaceHolder1_AssignButton');
    this.refreshButton = page.locator(
      '#ctl00_ContentPlaceHolder1_ComplianceManagerGridView_ctl00_ctl02_ctl00_RefreshButton',
    );
    this.exportToExcelButton = page.locator(
      '#ctl00_ContentPlaceHolder1_ComplianceManagerGridView_ctl00_ctl02_ctl00_RefreshButton',
    );
    this.gridHeaderLocator = page.locator(
      '#ctl00_ContentPlaceHolder1_ComplianceManagerGridView_GridHeader a',
    );
  }

  async navigateToExceptionReasonManagement() {
    await this.moreMenuHover.hover();
    await this.exceptionReasonManagementMenuItem.waitFor({
      state: 'visible',
      timeout: 5000,
    });
    await this.exceptionReasonManagementMenuItem.click();
    await this.page.waitForLoadState('networkidle');
  }

  async validateAssignButton() {
    await expect(this.assignExceptionReasonButton).toBeVisible();
    await expect(this.assignExceptionReasonButton).toHaveAttribute('type', 'submit');
  }

  async validateRefreshButton() {
    await expect(this.refreshButton).toBeVisible();
    await expect(this.refreshButton).toHaveAttribute('type', 'button');
  }

  async validateExportToExcelButton() {
    await expect(this.exportToExcelButton).toBeVisible();
    await expect(this.exportToExcelButton).toHaveAttribute('type', 'button');
  }

  async validateGridHeaders(gridHeaders) {
    for (const headerText of gridHeaders) {
      const headerLocator = this.gridHeaderLocator.filter({
        hasText: headerText,
      });
      await expect(headerLocator).toBeVisible();
    }
  }
}
