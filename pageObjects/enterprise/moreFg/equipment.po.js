import { expect } from '@playwright/test';

export class EquipmentPage {
  constructor(page) {
    this.page = page;
    this.moreMenuHover = page.locator("span:has-text('More...')").first();
    this.dropdown = page.locator('.rmSlide:visible').first();
    this.equipmentMenuItem = this.dropdown.getByText('Equipment', { exact: true }).first();
    this.equipmentPageTitle = page.locator('#ctl00_ContentPlaceHolder1_Label_Equipment_Details');
    this.backToEquipmentDashboardButton = page.locator('#ctl00_ContentPlaceHolder1_Button1');
    this.moveDateLabel = page.locator('#ctl00_ContentPlaceHolder1_Label3');
    this.addNewEquipmentButton = page.locator(
      '#ctl00_ContentPlaceHolder1_gvEquipment_ctl00_ctl02_ctl00_InitInsertButton',
    );
    this.gridCommonHeader = page.locator('#ctl00_ContentPlaceHolder1_gvEquipment_GridHeader  a');
    this.exportToExcelButton = page.locator(
      '#ctl00_ContentPlaceHolder1_gvEquipment_ctl00_ctl02_ctl00_ExportToExcelButton',
    );
    this.exportToPDFButton = page.locator(
      '#ctl00_ContentPlaceHolder1_gvEquipment_ctl00_ctl02_ctl00_ExportToPdfButton',
    );
  }

  async navigateToEquipment() {
    await this.moreMenuHover.hover();
    await this.dropdown.waitFor({ state: 'visible', timeout: 10000 });
    await this.equipmentMenuItem.waitFor({ state: 'visible', timeout: 10000 });
    await this.equipmentMenuItem.click();
    await this.page.waitForLoadState('networkidle');
  }

  async validatePageTitle() {
    await expect(this.equipmentPageTitle).toBeVisible();
    await expect(this.equipmentPageTitle).toHaveText('Equipment Details');
  }

  async validateBackButton() {
    await expect(this.backToEquipmentDashboardButton).toBeVisible();
    await expect(this.backToEquipmentDashboardButton).toHaveAttribute('type', 'submit');
  }

  async validateMoveDateLabel() {
    await expect(this.moveDateLabel).toBeVisible();
    await expect(this.moveDateLabel).toHaveText('Move Date');
  }

  async validateAddNewEquipmentButton() {
    await expect(this.addNewEquipmentButton).toBeVisible();
  }

  async validateGridHeaders(expectedHeaders) {
    for (const headerText of expectedHeaders) {
      const headerLocator = this.page.getByRole('link', {
        name: headerText,
        exact: true,
      });
      await expect(headerLocator).toBeVisible();
    }
  }

  async validateExportButtons() {
    await expect(this.exportToExcelButton).toBeVisible();
    await expect(this.exportToPDFButton).toBeVisible();
  }
}
