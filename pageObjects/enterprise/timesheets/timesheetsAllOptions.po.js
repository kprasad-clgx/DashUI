import { expect } from '@playwright/test';

export class TimesheetsAllOptionsPage {
  constructor(page) {
    this.page = page;

    // Timesheets Page Locators
    this.timesheetsMenuHover = page.locator("span:has-text('Timesheets')").first();
    this.timesheetsMenuItem = page.getByText('Timesheets', { exact: true }).nth(1);
    this.timesheetsHeader = page.locator('h2', { hasText: 'Timesheets' });
    this.approveAllButton = page.locator('#btnApproveAll');
    this.refreshButton = page.locator('#btnRefresh');
    this.dropdownValue = page.locator('span.k-input', { hasText: '10' });

    // Settings Page Locators
    this.settingsMenuItem = page.getByText('Settings', { exact: true });
    this.generalSettingsHeader = page.locator('h1', {
      hasText: 'General Settings',
    });
    this.saveChangesButton = page.locator('#btnSave');

    // Activity Codes Page Locators
    this.activityCodesMenuItem = page.getByText('Activity Codes', {
      exact: true,
    });
    this.activityCodesHeader = page.locator('h2', {
      hasText: 'Activity Codes',
    });
    this.locationLabel = page.locator('#Location_label');
    this.addButton = page.locator('a.k-button.k-grid-add', { hasText: 'Add' });
    this.activityCodesGridHeader = page.locator('.k-grid-header .k-link');

    // Approver Settings Page Locators
    this.approverSettingsMenuItem = page.getByText('Approver Settings', {
      exact: true,
    });
    this.approverSettingsHeader = page.locator('h2', {
      hasText: 'Approver Settings',
    });
    this.approverSettingsGridHeader = page.locator('.k-grid-header .k-link');

    // Usage Report Page Locators
    this.usageReportMenuItem = page.getByText('Usage_Report For Timesheets', {
      exact: true,
    });
    this.getUsageReportButton = page.locator('#btnGetUsageReport');
    this.exportToExcelButton = page.locator('#btnExportToExcel');
    this.usageReportGridHeader = page.locator('.k-header a');
  }

  async navigateToTimesheets() {
    await this.timesheetsMenuHover.hover();
    await this.timesheetsMenuItem.waitFor({ state: 'visible', timeout: 10000 });
    await this.timesheetsMenuItem.click();
    await this.timesheetsHeader.waitFor({ state: 'visible', timeout: 10000 });
  }

  async validateTimesheetsHeader() {
    await expect(this.timesheetsHeader).toBeVisible();
    await expect(this.timesheetsHeader).toHaveText('Timesheets');
  }

  async validateRadioButtons(radioButtonLabels) {
    for (const label of radioButtonLabels) {
      const radioButton = this.page.locator(`.k-radio-label`, {
        hasText: label,
      });
      await expect(radioButton).toBeVisible();
      await expect(radioButton).toHaveText(label);
    }
  }

  async validateApproveAllButton() {
    await expect(this.approveAllButton).toBeVisible();
  }

  async validateRefreshButton() {
    await expect(this.refreshButton).toBeVisible();
  }

  async validateGridColumnHeaders(gridColumnHeaders) {
    for (const header of gridColumnHeaders) {
      const thLocators = await this.page
        .locator('thead tr th.k-header[data-title]')
        .elementHandles();

      let found = false;
      for (const th of thLocators) {
        const dataTitle = ((await th.getAttribute('data-title')) || '').trim();
        if (dataTitle === header.trim()) {
          const span = await th.$('span.k-link');
          expect(span).not.toBeNull();
          const textContent = ((await span.textContent()) || '').trim();
          expect(textContent).toBe(header.trim());
          found = true;
          break;
        }
      }
      expect(found).toBe(true);
    }
  }

  async validateDropdownValue() {
    await expect(this.dropdownValue).toBeVisible();
    await expect(this.dropdownValue).toHaveText('10');
  }

  async navigateToSettings() {
    await this.timesheetsMenuHover.hover();
    await this.settingsMenuItem.waitFor({ state: 'visible', timeout: 10000 });
    await this.settingsMenuItem.click();
    await this.generalSettingsHeader.waitFor({ state: 'visible', timeout: 10000 });
  }

  async validateGeneralSettingsHeader() {
    await expect(this.generalSettingsHeader).toBeVisible();
    await expect(this.generalSettingsHeader).toHaveText('General Settings');
  }

  async validateSaveChangesButton() {
    await expect(this.saveChangesButton).toBeVisible();
  }

  async navigateToActivityCodes() {
    await this.timesheetsMenuHover.hover();
    await this.activityCodesMenuItem.waitFor({ state: 'visible', timeout: 10000 });
    await this.activityCodesMenuItem.click();
    await this.activityCodesHeader.waitFor({ state: 'visible', timeout: 10000 });
  }

  async validateActivityCodesHeader() {
    await expect(this.activityCodesHeader).toBeVisible();
  }

  async validateLocationLabel() {
    await expect(this.locationLabel).toBeVisible();
    await expect(this.locationLabel).toHaveText('Location');
  }

  async validateAddButton() {
    await expect(this.addButton).toBeVisible();
    await expect(this.addButton).toHaveText(/Add/);
  }

  async validateActivityCodesGridHeaders(gridColumnHeaders) {
    for (const header of gridColumnHeaders) {
      const headerLocator = this.activityCodesGridHeader.filter({
        hasText: header.trim(),
      });
      await expect(headerLocator).toBeVisible();
      const textContent = await headerLocator.evaluate((el) => el.textContent.trim());
      expect(textContent).toBe(header.trim());
    }
  }

  async navigateToApproverSettings() {
    await this.timesheetsMenuHover.hover();
    await this.approverSettingsMenuItem.waitFor({ state: 'visible', timeout: 15000 });
    await this.approverSettingsMenuItem.click();
    await this.approverSettingsHeader.waitFor({ state: 'visible', timeout: 10000 });
  }

  async validateApproverSettingsHeader() {
    await expect(this.approverSettingsHeader).toBeVisible();
  }

  async validateApproverSettingsGridHeaders(gridColumnHeaders) {
    for (const header of gridColumnHeaders) {
      const headerLocator = this.approverSettingsGridHeader.filter({
        hasText: header.trim(),
      });
      await expect(headerLocator).toBeVisible();
      const textContent = await headerLocator.evaluate((el) => el.textContent.trim());
      expect(textContent).toBe(header.trim());
    }
  }

  async navigateToUsageReport() {
    await this.timesheetsMenuHover.hover();
    await this.usageReportMenuItem.waitFor({ state: 'visible', timeout: 10000 });
    await this.usageReportMenuItem.click();
    await this.getUsageReportButton.waitFor({ state: 'visible', timeout: 10000 });
  }

  async validateGetUsageReportButton() {
    await expect(this.getUsageReportButton).toBeVisible();
  }

  async validateExportToExcelButton() {
    await expect(this.exportToExcelButton).toBeVisible();
  }

  async validateUsageReportGridHeaders(gridColumnHeaders) {
    for (const header of gridColumnHeaders) {
      const headerLocator = this.usageReportGridHeader.filter({
        hasText: header.trim(),
      });
      await expect(headerLocator).toBeVisible();
      const textContent = await headerLocator.evaluate((el) => el.textContent.trim());
      expect(textContent).toBe(header.trim());
    }
  }
}
