import { BasePage } from '../basePage/enterpriseBasePage.po.js';

export class SchedulerPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    this.jobSummary = page.getByText('Job Summary', { exact: true });
    this.menuButton = page.locator('.area-open-menu');
    this.budgetHoursCheckIcon = page
      .locator('div.menu_default_item')
      .filter({ hasText: 'Budget Hours' })
      .locator('.icon');
    this.workOrderNumberCheckIcon = page
      .locator('div.menu_default_item')
      .filter({ hasText: 'Work Order Number' })
      .locator('.icon');
    this.budgetCostCheckIcon = page
      .locator('div.menu_default_item')
      .filter({ hasText: 'Budget Cost' })
      .locator('.icon');
    this.assigneeCheckIcon = page
      .locator('div.menu_default_item')
      .filter({ hasText: 'Assignee' })
      .locator('.icon');

    // Dropdowns
    this.viewDropdown = page.locator('#SchedulerViewDropDownList');
    this.sortDropdown = page.locator('#SortDropDownList');
    this.filterDropdown = page.locator('#FilterDropDownList');
    this.scaleDropdown = page.locator('#ScaleDropDown');
    this.exportScaleDropdown = page.locator('#area');

    // Buttons
    this.shareButton = page.locator('#ShareSchedule');
    this.exportPNGButton = page.locator('#ExportPNG');
    this.exportPDFButton = page.locator('#ExportPDF');

    // PDF/PNG Download Popup
    this.downloadPopup = page.locator('.ui-dialog');
    this.popupScaleDropdown = page.locator('#ScaleDropDownList');
    this.popupRowsDropdown = page.locator('#rows');
    this.popupDownloadButton = page
      .locator('.ui-dialog-buttonset .buttonCore')
      .filter({ hasText: 'Download' });
    this.popupCancelButton = page
      .locator('.ui-dialog-buttonset .buttonCore')
      .filter({ hasText: 'Cancel' });
  }

  // Method to check if an icon is checked (has 'icon-checked' class)
  async isIconChecked(iconLocator) {
    const classAttribute = await iconLocator.getAttribute('class');
    return classAttribute && classAttribute.includes('icon-checked');
  }

  // Share scheduler with all employees and internal participants
  async shareScheduler() {
    // Open share dialog
    await this.shareButton.click();

    // Wait for RadWindow iframe and get frame locator
    await this.page
      .locator('iframe[name="NotificationCenterRadWindow"]')
      .waitFor({ state: 'visible', timeout: 30000 });
    const shareFrame = this.page.frameLocator('iframe[name="NotificationCenterRadWindow"]');

    // Wait for iframe content to load
    await shareFrame.locator('input').first().waitFor({ state: 'attached', timeout: 15000 });
    // Wait for the "EmailEmployeeAll" checkbox to be visible instead of using a timeout
    await shareFrame.locator('#EmailEmployeeAll').waitFor({ state: 'visible', timeout: 10000 });

    // Select all employees - email and notification
    await shareFrame.locator('#EmailEmployeeAll').check();
    await shareFrame.locator('#NotificationEmployeeAll').check();

    // Select all internal participants - email and notification (only if enabled and visible)
    const emailInternalAll = shareFrame.locator('#EmailInternalAll');
    const notificationInternalAll = shareFrame.locator('#NotificationInternalParticipantAll');
    if ((await emailInternalAll.isVisible()) && !(await emailInternalAll.isDisabled())) {
      await emailInternalAll.check();
    } else {
      console.warn('#EmailInternalAll is not visible or is disabled, skipping.');
    }
    if (
      (await notificationInternalAll.isVisible()) &&
      !(await notificationInternalAll.isDisabled())
    ) {
      await notificationInternalAll.check();
    } else {
      console.warn('#NotificationInternalParticipantAll is not visible or is disabled, skipping.');
    }

    // Save and close dialog
    await shareFrame.locator('#SaveButton').click();
    // Wait for the share dialog to close after saving (increase timeout and add fallback log)
    try {
      await this.page
        .locator('iframe[name="NotificationCenterRadWindow"]')
        .waitFor({ state: 'detached', timeout: 20000 });
    } catch {
      console.warn('Share dialog iframe did not close within 20s after saving.');
    }
  }
}
