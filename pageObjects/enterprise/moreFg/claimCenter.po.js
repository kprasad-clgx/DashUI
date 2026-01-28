import { expect } from '@playwright/test';

export class ClaimCenterPage {
  constructor(page) {
    this.page = page;
    this.moreMenuHover = page.locator("span:has-text('More...')").first();
    this.claimCenterMenuItem = page.getByText('Claim Center', { exact: true });
    this.backToHomePageButton = page.locator('#ctl00_ContentPlaceHolder1_btnBackToHomepage');
    this.exportToExcelButton = page.locator(
      '#ctl00_ContentPlaceHolder1_JobParentInformation_btnExportToExcel',
    );
    this.exportToPdfButton = page.locator(
      '#ctl00_ContentPlaceHolder1_JobParentInformation_btnExportToPdf',
    );
    this.clearAllFiltersLabel = page.locator(
      '#ctl00_ContentPlaceHolder1_JobParentInformation_lblClearAllFilter',
    );
    this.claimCenterGridHeaderLocator = page.locator('#grid .k-link');
    this.exportToPdfButton = page.locator(
      '#ctl00_ContentPlaceHolder1_JobParentInformation_btnExportToPdf',
    );
  }

  async navigateToClaimCenter() {
    await this.moreMenuHover.hover();
    await this.claimCenterMenuItem.waitFor({ state: 'visible', timeout: 5000 });
    await this.claimCenterMenuItem.click();
    await this.page.waitForLoadState('networkidle');
  }

  async validateBackToHomePageButton() {
    await expect(this.backToHomePageButton).toBeVisible();
    await expect(this.backToHomePageButton).toHaveAttribute('type', 'submit');
  }

  async validateExportButtons() {
    await expect(this.exportToExcelButton).toBeVisible();
    await expect(this.exportToPdfButton).toBeVisible();
  }

  async validateExportPdfButton() {
    await expect(this.exportToPdfButton).toBeVisible();
    await expect(this.exportToPdfButton).toHaveAttribute('type', 'submit');
  }

  async validateClearAllFiltersLabel() {
    await expect(this.clearAllFiltersLabel).toBeVisible();
  }

  async validateGridHeaders(claimCenterGridHeaders) {
    for (const headerText of claimCenterGridHeaders) {
      const headerLocator = this.claimCenterGridHeaderLocator.filter({
        hasText: headerText,
      });
      await expect(headerLocator).toBeVisible();
    }
  }

  async clickBackToHomePage() {
    await this.backToHomePageButton.click();
    await this.page.waitForLoadState('networkidle');
    await expect(this.page).toHaveURL(/Module\/User\/uPostLogin\.aspx/);
  }

  async downloadAndAssertExcel() {
    const [excelDownload] = await Promise.all([
      this.page.waitForEvent('download'),
      this.exportToExcelButton.click(),
    ]);
    const excelSuggestedFilename = await excelDownload.suggestedFilename();
    expect(excelSuggestedFilename).toBe('JobsDetails.xlsx');
  }

  async downloadAndAssertPDF() {
    await this.exportToPdfButton.click();
    // Click on notification icon to expand dropdown
    const notificationButton = this.page.locator('#dashNotificationButton');
    await notificationButton.click();

    // Wait for dropdown to expand and be visible
    const notificationDropdown = this.page.locator('#Dash_notifications');
    await expect(notificationDropdown).toBeVisible();

    // Find the row with "Export Jobs Report PDF"
    const exportRow = notificationDropdown
      .locator('tr', { hasText: 'Export Jobs Report PDF' })
      .first();
    await expect(exportRow).toBeVisible();

    // Click on the download icon in that row
    const downloadLink = exportRow.locator('a img[title="Download"]');
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      downloadLink.click(),
    ]);

    // Assert the downloaded file name starts with "JobsDetails" and ends with ".pdf"
    const fileName = await download.suggestedFilename();
    expect(fileName).toContain('JobsDetails');
    expect(fileName.endsWith('.pdf')).toBe(true);
  }
}
