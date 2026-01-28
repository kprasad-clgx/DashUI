import { expect } from '@playwright/test';

const OpenJobLocators = {
  // Menu
  dashboardsMenu: "span:has-text('Dashboards')",

  // Page Elements
  globalJobSearch: '#ctl00_ContentPlaceHolder1_JobParentInformation_lblGlobalJobSearch',

  // Grid Column Headers
  jobNumberHeader: 'th[data-field="JobNumber"] a',
  jobNameHeader: 'th[data-field="JobName"] a',

  // Export Buttons
  exportToExcelButton: '#ctl00_ContentPlaceHolder1_JobParentInformation_btnExportToExcel',
  exportToPdfButton: '#ctl00_ContentPlaceHolder1_JobParentInformation_btnExportToPdf',
  notificationButton: '#dashNotificationButton',
  notificationDropdown: '#Dash_notifications',
};

class OpenJobPage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to Open Job from Dashboards menu
   */
  async navigateToOpenJob() {
    await this.page.locator(OpenJobLocators.dashboardsMenu).first().hover();

    const openJobOption = this.page.getByText('Open Job', {
      exact: true,
    });

    await openJobOption.waitFor({ state: 'visible', timeout: 5000 });
    await openJobOption.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Assert Global Job Search is visible and has correct text
   */
  async assertGlobalJobSearch() {
    const globalJobSearch = this.page.locator(OpenJobLocators.globalJobSearch);
    await expect(globalJobSearch).toBeVisible();
    await expect(globalJobSearch).toHaveText('Global Job Search');
  }

  /**
   * Assert Job Number column header is visible
   */
  async assertJobNumberHeaderVisible() {
    const jobNumberHeader = this.page.locator(OpenJobLocators.jobNumberHeader, {
      hasText: 'Job Number',
    });
    await expect(jobNumberHeader).toBeVisible();
  }

  /**
   * Assert Job Name column header is visible
   */
  async assertJobNameHeaderVisible() {
    const jobNameHeader = this.page.locator(OpenJobLocators.jobNameHeader, {
      hasText: 'Job Name',
    });
    await expect(jobNameHeader).toBeVisible();
  }

  /**
   * Assert all grid column headers are visible
   */
  async assertAllGridHeadersVisible() {
    await this.assertJobNumberHeaderVisible();
    await this.assertJobNameHeaderVisible();
  }

  /**
   * Download and assert Excel file
   */
  async downloadAndAssertExcel() {
    const exportButton = this.page.locator(OpenJobLocators.exportToExcelButton);
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      exportButton.click(),
    ]);
    const suggestedFilename = await download.suggestedFilename();
    expect(suggestedFilename).toContain('JobsDetails');
    expect(suggestedFilename.endsWith('.xlsx')).toBeTruthy();
  }

  /**
   * Download and assert PDF file via notification dropdown
   */
  async downloadAndAssertPDF() {
    const exportPdfButton = this.page.locator(OpenJobLocators.exportToPdfButton);
    await exportPdfButton.waitFor({ state: 'visible', timeout: 5000 });
    await exportPdfButton.click();

    // Click on notification icon to expand dropdown
    const notificationButton = this.page.locator(OpenJobLocators.notificationButton);
    await notificationButton.click();

    // Wait for dropdown to expand and be visible
    const notificationDropdown = this.page.locator(OpenJobLocators.notificationDropdown);
    await expect(notificationDropdown).toBeVisible();

    // Find the row with "Export Jobs Report PDF"
    const exportRow = notificationDropdown
      .locator('tr', { hasText: 'Export Jobs Report PDF' })
      .first();
    await expect(exportRow).toBeVisible();

    // Click on the download icon in that row
    const downloadLink = exportRow.locator('a img[title="Download"]');
    const [downloadPDF] = await Promise.all([
      this.page.waitForEvent('download'),
      downloadLink.click(),
    ]);

    // Assert the downloaded file name starts with "JobsDetails" and ends with ".pdf"
    const fileName = await downloadPDF.suggestedFilename();
    expect(fileName).toContain('JobsDetails');
    expect(fileName.endsWith('.pdf')).toBe(true);
  }
}

export default OpenJobPage;
