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

  // Open Open Jobs Report and generate download
  async verifyOpenJobsReport() {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.page.locator("a:has-text('Open Jobs Report')").click(),
    ]);
    await newPage.waitForLoadState('networkidle', { timeout: 60000 });

    const [download] = await Promise.all([
      newPage.waitForEvent('download', { timeout: 30000 }),
    ]);

    return download;
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

    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      generateReportButton.click(),
    ]);

    const suggestedFilename = await download.suggestedFilename();
    expect(suggestedFilename).toContain('JobsReceived_Report');
  }

  // New method for Job Status Popup handling (Resolved from your branch)
  async handleJobStatusReportPopup(reportPopup) {
    const header = reportPopup.locator('span').filter({ hasText: 'Job Status Report' }).first();
    const jobNumberInput = reportPopup.locator('#JobNumberComboBox_Input');
    const firstOption = reportPopup.locator('#JobNumberComboBox_DropDown li').first();
    const goButton = reportPopup.getByRole('button', { name: 'Go' });
    const notification = reportPopup.locator('#dashNotificationBar');

    await header.waitFor({ state: 'visible', timeout: 10000 });
    await jobNumberInput.click();
    await firstOption.click();
    await goButton.click();
    await notification.waitFor({ state: 'visible', timeout: 30000 });
    
    return { reportPopup, notification };
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
    const dropdown = this.page.locator('#JobNumberComboBox_DropDown');
    await dropdown.waitFor({ state: 'visible', timeout: 10000 });

    const secondOption = dropdown.locator('ul.rcbList > li').nth(1);
    await secondOption.click();
  }

  // Select Job from dropdown, Generate Report, and assert network request
  async selectJobStatusReportJobAndGenerateReport(expectedRequestUrl = 'NewJobStatusReport.aspx') {
    const jobDropdown = this.page.locator('#JobNumberComboBox_Arrow');
    await expect(jobDropdown).toBeVisible();
    await jobDropdown.click();

    const dropdown = this.page.locator('#JobNumberComboBox_DropDown');
    await dropdown.waitFor({ state: 'visible', timeout: 10000 });
    const secondOption = dropdown.locator('ul.rcbList > li').nth(1);
    await secondOption.click();

    const goButton = this.page.locator('#GoButton');

    const [request] = await Promise.all([
      this.page.waitForRequest((req) => req.url().includes(expectedRequestUrl)),
      goButton.click(),
    ]);
    expect(request.url()).toContain(expectedRequestUrl);
  }

  // Select Job received but not started and assert URL
  async clickjobReceivedButNotStartedOptionAndAssertUrl(expectedUrlSuffix = 'JobsReceivedButNotStarted.aspx') {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.page.locator('#ctl00_ContentPlaceHolder1_TreeView1t1').click(),
    ]);
    await newPage.waitForLoadState('domcontentloaded');
    const url = newPage.url();
    expect(url.endsWith(expectedUrlSuffix)).toBeTruthy();
    return newPage;
  }

   async selectDateRange(startDate, endDate) {
    const startDateInput = this.page.locator('#txtDays1_dateInput');
    const endDateInput = this.page.locator('#txtEndDate1_dateInput');
    const goButton = this.page.locator('#btnContinue');

    await startDateInput.fill(startDate);
    await endDateInput.fill(endDate);
    
    // Capture network request when Go button is clicked
    const [request] = await Promise.all([
      this.page.waitForRequest(() => true), // Capture any network request
      goButton.click(),
    ]);
    
    // Assert that a network call was made
    expect(request).toBeDefined();
    expect(request.url()).toBeTruthy();
    return request;
  }
}

export { ReportsPage, ReportsLocators };