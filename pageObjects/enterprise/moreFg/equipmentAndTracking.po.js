import { expect } from '@playwright/test';

export class EquipmentAndTrackingPage {
  constructor(page) {
    this.page = page;
    this.moreMenuHover = page.locator("span:has-text('More...')").first();
    this.equipmentAndTrackingMenuItem = page.getByText('Equipment and Tracking', { exact: true });
    this.equipmentDashboardText = page.locator(
      '#ctl00_ContentPlaceHolder1_lblDashBoard.Heading_red + .Heading_blue',
      { hasText: 'Equipment Dashboard' },
    );
    this.addViewUpdateEquipmentButton = page.locator('#ctl00_ContentPlaceHolder1_Button2');
    this.moveEquipmentButton = page.locator('#ctl00_ContentPlaceHolder1_Button1');

    // Tab 1: Equipment Currently Being Billed
    this.equipmentCurrentlyBilledTab = page.locator(
      '#ctl00_ContentPlaceHolder1_RadTabStrip1 .rtsTxt',
      { hasText: 'Equipment Currently Being Billed' },
    );
    this.equipmentCurrentlyBilledExportToExcelButton = page.locator(
      '#ctl00_ContentPlaceHolder1_grEquipmentBilled_ctl00_ctl02_ctl00_ExportToExcelButton',
    );
    this.equipmentCurrentlyBilledExportToPdfButton = page.locator(
      '#ctl00_ContentPlaceHolder1_grEquipmentBilled_ctl00_ctl02_ctl00_ExportToPdfButton',
    );
    this.equipmentCurrentlyBilledGridColumnHeaders = page.locator(
      '#ctl00_ContentPlaceHolder1_grEquipmentBilled_GridHeader .rgHeader a',
    );

    // Tab 2: Equipment Available
    this.equipmentAvailableTab = page.locator('#ctl00_ContentPlaceHolder1_RadTabStrip1 .rtsTxt', {
      hasText: 'Equipment Available',
    });
    this.equipmentAvailableGridColumnHeaders = page.locator(
      '#ctl00_ContentPlaceHolder1_rdEqupAvailable_GridHeader a',
    );
    this.equipmentAvailableExportToExcelButton = page.locator(
      '#ctl00_ContentPlaceHolder1_rdEqupAvailable_ctl00_ctl02_ctl00_ExportToExcelButton',
    );
    this.equipmentAvailableExportToPdfButton = page.locator(
      '#ctl00_ContentPlaceHolder1_rdEqupAvailable_ctl00_ctl02_ctl00_ExportToPdfButton',
    );

    // Tab 3: Equipment Coming Available
    this.equipmentComingAvailableTab = page.locator(
      '#ctl00_ContentPlaceHolder1_RadTabStrip1 .rtsTxt',
      { hasText: 'Equipment Coming Available' },
    );
    this.equipmentComingAvailableGridColumnHeaders = page.locator(
      '#ctl00_ContentPlaceHolder1_rdEquipComAvailable_GridHeader a',
    );
    this.equipmentComingAvailableExportToExcelButton = page.locator(
      '#ctl00_ContentPlaceHolder1_rdEquipComAvailable_ctl00_ctl02_ctl00_ExportToExcelButton',
    );
    this.equipmentComingAvailableExportToPdfButton = page.locator(
      '#ctl00_ContentPlaceHolder1_rdEquipComAvailable_ctl00_ctl02_ctl00_ExportToPdfButton',
    );
  }

  async navigateToEquipmentAndTracking() {
    await this.moreMenuHover.hover();
    await this.equipmentAndTrackingMenuItem.waitFor({
      state: 'visible',
      timeout: 5000,
    });
    await this.equipmentAndTrackingMenuItem.click();
    await this.page.waitForLoadState('networkidle');
  }

  async validateDashboardText() {
    await expect(this.equipmentDashboardText).toBeVisible();
  }

  async validateActionButtons() {
    await expect(this.addViewUpdateEquipmentButton).toBeVisible();
    await expect(this.addViewUpdateEquipmentButton).toHaveAttribute('type', 'submit');
    await expect(this.moveEquipmentButton).toBeVisible();
    await expect(this.moveEquipmentButton).toHaveAttribute('type', 'submit');
  }

  async validateEquipmentCurrentlyBilledTab(headers) {
    await expect(this.equipmentCurrentlyBilledTab).toBeVisible();
    await expect(this.equipmentCurrentlyBilledExportToExcelButton).toBeVisible();
    await expect(this.equipmentCurrentlyBilledExportToPdfButton).toBeVisible();

    for (const headerText of headers) {
      await expect(
        this.equipmentCurrentlyBilledGridColumnHeaders.filter({
          hasText: headerText,
        }),
      ).toBeVisible();
    }
  }

  async validateEquipmentAvailableTab(headers) {
    await expect(this.equipmentAvailableTab).toBeVisible();
    await this.equipmentAvailableTab.click();

    await expect(this.equipmentAvailableGridColumnHeaders.first()).toBeVisible({
      timeout: 10000,
    });

    for (const headerText of headers) {
      await expect(
        this.equipmentAvailableGridColumnHeaders.filter({ hasText: headerText }),
      ).toBeVisible();
    }

    await expect(this.equipmentAvailableExportToExcelButton).toBeVisible();
    await expect(this.equipmentAvailableExportToPdfButton).toBeVisible();
  }

  async validateEquipmentComingAvailableTab(headers) {
    await expect(this.equipmentComingAvailableTab).toBeVisible();
    await this.equipmentComingAvailableTab.click();

    await expect(this.equipmentComingAvailableGridColumnHeaders.first()).toBeVisible({
      timeout: 10000,
    });

    for (const headerText of headers) {
      await expect(
        this.equipmentComingAvailableGridColumnHeaders.filter({
          hasText: headerText,
        }),
      ).toBeVisible();
    }

    await expect(this.equipmentComingAvailableExportToExcelButton).toBeVisible();
    await expect(this.equipmentComingAvailableExportToPdfButton).toBeVisible();
  }
}
