import { expect } from '@playwright/test';

/**
 * @typedef {Object} ReportsLocatorsType
 * @property {string} reportsTab
 * @property {string} reportsSubTab
 * @property {string} createReportHeader
 * @property {string} newReportHeading
 * @property {string} legacyReportCreatorHeading
 */

/** @type {ReportsLocatorsType} */
const ReportsLocators = {
  reportsTab: "link[name='Reports']",
  reportsSubTab: "a:has-text('Reports')",
  createReportHeader: '#ctl00_ContentPlaceHolder1_lbTitle',
  newReportHeading: '#ctl00_ContentPlaceHolder1_label_NewReport',
  legacyReportCreatorHeading: '#ctl00_ContentPlaceHolder1_label_LagacyReport',
};

class ReportsPage {
  constructor(page) {
    this.page = page;
  }

  // Navigate to Reports page
  async navigateToReports() {
    const reportsTabLocator = this.page.getByRole('link', {
      name: 'Reports',
    });
    await reportsTabLocator.hover();

    const reportsLocator = this.page.getByRole('link', { name: 'Reports Toggle' });
    await reportsLocator.waitFor({ timeout: 5000 });
    await reportsLocator.click();
    await this.page.waitForLoadState('networkidle');
  }

  // Verify Create Report header
  async verifyCreateReportHeader() {
    const createReportHeaderLocator = this.page.locator(ReportsLocators.createReportHeader);
    await expect(createReportHeaderLocator).toBeVisible();
    await expect(createReportHeaderLocator).toHaveText('Create Report');
  }

  // Verify New Report heading
  async verifyNewReportHeading() {
    const newReportHeadingLocator = this.page.locator(ReportsLocators.newReportHeading);
    await expect(newReportHeadingLocator).toBeVisible();
    await expect(newReportHeadingLocator).toHaveText('New Report Creator');
  }

  // Verify Legacy Report Creator heading
  async verifyLegacyReportCreatorHeading() {
    const legacyReportCreatorHeadingLocator = this.page.locator(
      ReportsLocators.legacyReportCreatorHeading,
    );
    await expect(legacyReportCreatorHeadingLocator).toBeVisible();
    await expect(legacyReportCreatorHeadingLocator).toHaveText('Legacy Report Creator');
  }

  // Click on Jobs Received Report Option, handle new tab, and assert URL
  async clickJobsReceivedReportOptionAndAssertUrl(expectedUrlSuffix = 'JobsReceivedReport.aspx') {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.page.locator("a:has-text('Jobs Received Report')").click(),
    ]);
    await newPage.waitForLoadState('domcontentloaded');
    const url = newPage.url();
    expect(url.endsWith(expectedUrlSuffix)).toBeTruthy();
    return newPage;
  }

  // Select Date Range and Generate Report for one month back from today
  async selectLastMonthDateRangeAndGenerateReport() {
    const today = new Date();
    const lastMonth = new Date(today);
    lastMonth.setMonth(today.getMonth() - 1);

    // Format: MM/D/YYYY (no leading zero for day)
    const formatDate = (date) => {
      const mm = date.getMonth() + 1;
      const d = date.getDate();
      const yyyy = date.getFullYear();
      return `${mm}/${d}/${yyyy}`;
    };

    const startDate = formatDate(lastMonth);
    const endDate = formatDate(today);

    await this.selectDateRangeAndGenerateReport(startDate, endDate);
  }

  // Select Date Range and Generate Report, assert .xlsx download
  async selectDateRangeAndGenerateReport(startDate, endDate) {
    const startDateInput = this.page.locator('#txtStartDate_dateInput');
    const endDateInput = this.page.locator('#txtEndDate_dateInput');
    const generateReportButton = this.page.locator('#btnSubmit');

    await startDateInput.fill(startDate);
    await endDateInput.fill(endDate);

    // Wait for download event triggered by clicking the button
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      generateReportButton.click(),
    ]);

    // Assert the file name contains 'JobsReceived_Report' and ends with .xlsx
    const suggestedFilename = await download.suggestedFilename();
    expect(suggestedFilename).toContain('JobsReceived_Report');
  }

  // Click on Job Status report Option and Assert Url
  async clickJobStatusReportOptionAndAssertUrl(expectedUrlSuffix = 'NewJobStatusReport.aspx') {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.page.locator("a:has-text('Job Status Report')").click(),
    ]);
    await newPage.waitForLoadState('domcontentloaded');
    const url = newPage.url();
    expect(url.endsWith(expectedUrlSuffix)).toBeTruthy();
    return newPage;
  }

  // Select the second option from the Job Number dropdown after loading
  async selectSecondJobNumberDropdownOption() {
    // Wait for dropdown to be visible
    const dropdown = this.page.locator('#JobNumberComboBox_DropDown');
    await dropdown.waitFor({ state: 'visible', timeout: 10000 });

    // Select the second option (li.rcbHovered or the second li.rcbItem)
    const secondOption = dropdown.locator('ul.rcbList > li').nth(1);
    await secondOption.click();
  }

  // Select Job from dropdown, Generate Report, and assert network request
  async selectJobStatusReportJobAndGenerateReport(expectedRequestUrl = 'NewJobStatusReport.aspx') {
    const jobDropdown = this.page.locator('#JobNumberComboBox_Arrow');
    await expect(jobDropdown).toBeVisible();
    await jobDropdown.click();

    // Wait for dropdown to be visible
    const dropdown = this.page.locator('#JobNumberComboBox_DropDown');
    await dropdown.waitFor({ state: 'visible', timeout: 10000 });
    const secondOption = dropdown.locator('ul.rcbList > li').nth(1);
    await secondOption.click();

    const goButton = this.page.locator('#GoButton');

    // Wait for the network request to the expected URL after clicking Go
    const [request] = await Promise.all([
      this.page.waitForRequest((req) => req.url().includes(expectedRequestUrl)),
      goButton.click(),
    ]);
    expect(request.url()).toContain(expectedRequestUrl);
  }
}

export { ReportsPage, ReportsLocators };
