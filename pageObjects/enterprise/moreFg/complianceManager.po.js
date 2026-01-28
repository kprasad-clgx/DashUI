import { expect } from '@playwright/test';

export class ComplianceManagerPage {
  constructor(page) {
    this.page = page;
    this.moreMenuHover = page.locator("span:has-text('More...')").first();
    this.complianceManagerMenuItem = page.getByText('Compliance Manager', { exact: true }).first();
    this.complianceManagerPageTitle = page.locator(
      '#ctl00_ContentPlaceHolder1_ComplianceMangerControl_Label_Heading',
    );
    this.employeeLabel = page.locator(
      '#ctl00_ContentPlaceHolder1_ComplianceMangerControl_EmployeeLabel',
    );
    this.divisionLabel = page.locator(
      '#ctl00_ContentPlaceHolder1_ComplianceMangerControl_DivisionLabel',
    );
    this.officeLabel = page.locator(
      '#ctl00_ContentPlaceHolder1_ComplianceMangerControl_OfficeLabel',
    );
    this.reassignButton = page.locator(
      '#ctl00_ContentPlaceHolder1_ComplianceMangerControl_ReassignEmployeeButton',
    );
    this.refreshButton = page.locator(
      '#ctl00_ContentPlaceHolder1_ComplianceMangerControl_ComplianceManagerGridView_ctl00_ctl02_ctl00_RefreshGridButton',
    );
    this.exportToExcelButton = page.locator(
      '#ctl00_ContentPlaceHolder1_ComplianceMangerControl_ComplianceManagerGridView_ctl00_ctl02_ctl00_ExportToExcelButton',
    );
    this.pendingTaskLabelRow = page.locator(
      '#ctl00_ContentPlaceHolder1_ComplianceMangerControl_PendingImagesDiv span',
    );
    this.completedTaskRadioButton = page.locator(
      '#ctl00_ContentPlaceHolder1_ComplianceMangerControl_StatusOptionsRadioButtonList_1',
    );
    this.completedTaskRow = page.locator(
      '#ctl00_ContentPlaceHolder1_ComplianceMangerControl_CompletedImagesDiv .compliance_status_text',
    );
  }

  // Static task label data (moved from complianceManagerData.json)
  static taskLabels = {
    pending: ['Pending', 'Warning', 'Overdue', 'All'],
    completed: ['Completed', 'Completed Late', 'Rejected'],
  };

  async navigateToComplianceManager() {
    await this.moreMenuHover.hover();
    await this.complianceManagerMenuItem.waitFor({
      state: 'visible',
      timeout: 5000,
    });
    await this.complianceManagerMenuItem.click();
    await this.page.waitForLoadState('networkidle');
  }

  async validatePageTitle() {
    await expect(this.complianceManagerPageTitle).toBeVisible();
    await expect(this.complianceManagerPageTitle).toHaveText('Compliance Manager');
  }

  async validateLabels() {
    await expect(this.employeeLabel).toBeVisible();
    await expect(this.employeeLabel).toHaveText('Employee');
    await expect(this.divisionLabel).toBeVisible();
    await expect(this.divisionLabel).toHaveText('Division');
    await expect(this.officeLabel).toBeVisible();
    await expect(this.officeLabel).toHaveText('Office');
  }

  async validateButtons() {
    await expect(this.reassignButton).toBeVisible();
    await expect(this.reassignButton).toHaveAttribute('type', 'button');
    await expect(this.refreshButton).toBeVisible();
    await expect(this.exportToExcelButton).toBeVisible();
  }

  async validatePendingTaskLabels(pendingTaskLabelText) {
    for (const text of pendingTaskLabelText) {
      const rowLocator = this.pendingTaskLabelRow.filter({ hasText: text });
      await expect(rowLocator).toBeVisible();
    }
  }

  async clickCompletedTaskRadioButton() {
    await expect(this.completedTaskRadioButton).toBeVisible();
    await expect(this.completedTaskRadioButton).not.toBeChecked();
    await this.completedTaskRadioButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async validateCompletedTaskLabels(completedTaskRowText) {
    await this.completedTaskRow.first().waitFor({ state: 'visible', timeout: 15000 });
    for (const text of completedTaskRowText) {
      const rowLocator = this.completedTaskRow.getByText(text, { exact: true });
      await expect(rowLocator).toBeVisible();
    }
  }
}
