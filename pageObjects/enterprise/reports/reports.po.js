import { BasePage } from '../basePage/enterpriseBasePage.po.js';

export class ReportsPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    // 1. NAVIGATION & HEADERS
    this.reportsTab = page.getByRole('link', { name: 'Reports' });
    this.reportsToggle = page.getByRole('link', { name: 'Reports Toggle' });

    // Header Locators
    this.createReportHeader = page.locator('#ctl00_ContentPlaceHolder1_lbTitle');
    this.newReportHeading = page.locator('#ctl00_ContentPlaceHolder1_label_NewReport');
    this.legacyReportHeading = page.locator('#ctl00_ContentPlaceHolder1_label_LagacyReport');

    this.newReportCreatorText = page.getByText('New Report Creator', { exact: true });
    this.legacyReportCreatorText = page.getByText('Legacy Report Creator', { exact: true });
    this.addNewReportButton = page.locator('a').filter({ hasText: 'Add New Report' }).first();

    // 2. REPORT LINKS
    this.jobsReceivedReportLink = page.getByRole('link', { name: 'Jobs Received Report' });
    this.jobsReceivedButNotStarted = page.getByRole('link', {
      name: 'Jobs Received But Not Started',
    });
    this.showTotalEstimatesForAllJobs = page.getByRole('link', {
      name: 'Show Total Estimates for all Jobs',
    });
    this.openJobsReport = page.getByRole('link', { name: 'Open Jobs Report' });
    this.salesAndMarketingReport = page.getByRole('link', { name: 'Sales and Marketing Report' });
    this.openLeadReport = page.getByRole('link', { name: 'Open Lead Report' });
    this.jobsWithZipPostal = page.getByRole('link', { name: 'Jobs with Zip/Postal' });
    this.jobGPReportNew = page.getByRole('link', { name: 'Job GP Report (New)' });
    this.jobsInspectionReport = page.getByRole('link', { name: 'Jobs Inspection Report' });
    this.jobsEstimateReport = page.getByRole('link', { name: 'Jobs Estimate Report' });
    this.jobFinancialsNew = page.getByRole('link', { name: 'Job Financials (New)' });
    this.jobAgingReport = page.getByRole('link', { name: 'Job Aging Report' });
    this.jobStatusReport = page.getByRole('link', { name: 'Job Status Report' });
    this.milestoneReport = page.getByRole('link', { name: 'Milestone Report' });
    this.hour48Report = page.getByRole('link', { name: '48-Hour Report' });
    this.monthlySalesReport = page.getByRole('link', { name: 'Monthly Sales Report' });
    this.tlsMonthlyReport = page.getByRole('link', { name: 'TLS Monthly Report' });
    this.salesByInsuranceCompany = page.getByRole('link', { name: 'Sales By Insurance Company' });
    this.workInProgressReportByJob = page.getByRole('link', {
      name: 'Work In Progress Report By Job',
    });
    this.workInProgressReportDetailsListing = page.getByRole('link', {
      name: 'Work In Progress Report Details Listing',
    });
    this.dashAccountComparisonReport = page.getByRole('link', {
      name: 'Dash Account Comparison Report',
    });
    this.completedContractReport = page.getByRole('link', { name: 'Completed Contract Report' });
    this.jobProgressByAssociate = page.getByRole('link', { name: 'Job Progress by Associate' });
    this.agedReceivablesReport = page.getByRole('link', { name: 'Aged Receivables Report' });
    this.registerReport = page.getByRole('link', { name: 'Register Report' });
    this.compensationReport = page.getByRole('link', { name: 'Compensation Report' });
    this.productionSummaryByEmployee = page.getByRole('link', {
      name: 'Production Summary By Employee',
    });
  }

  // 3. ACTIONS
  async navigateToReports() {
    await this.reportsTab.hover();
    await this.reportsToggle.waitFor({ state: 'visible', timeout: 5000 });
    await this.reportsToggle.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Helper to get header locators so tests can assert visibility/text.
   */
  getHeaders() {
    return {
      createReport: this.createReportHeader,
      newReport: this.newReportHeading,
      legacyReport: this.legacyReportHeading,
    };
  }

  // 4. REPORT WORKFLOW METHODS
  async openJobsReceivedReport() {
    const [reportPopup] = await Promise.all([
      this.page.waitForEvent('popup'),
      this.jobsReceivedReportLink.click(),
    ]);
    await reportPopup.waitForLoadState('networkidle');
    return reportPopup;
  }

  async createJobReceivedReport(reportPopup, startDate, endDate) {
    const startDateInput = reportPopup.locator('#txtStartDate_dateInput');
    const endDateInput = reportPopup.locator('#txtEndDate_dateInput');
    const goButton = reportPopup.locator('#btnSubmit');

    await startDateInput.fill(startDate);
    await endDateInput.fill(endDate);
    const downloadPromise = reportPopup.waitForEvent('download');
    await goButton.click();
    const download = await downloadPromise;
    return download;
  }

  async verifyJobReportsLinks() {
    await this.page.waitForLoadState('networkidle');
    const popupLinks = [
      this.jobsReceivedButNotStarted,
      this.showTotalEstimatesForAllJobs,
      this.jobsReceivedReportLink,
      this.salesAndMarketingReport,
      this.openLeadReport,
      this.jobsWithZipPostal,
      this.jobGPReportNew,
      this.jobsInspectionReport,
      this.jobsEstimateReport,
      this.jobFinancialsNew,
      this.jobAgingReport,
      this.jobStatusReport,
      this.milestoneReport,
      this.hour48Report,
      this.monthlySalesReport,
      this.tlsMonthlyReport,
      this.salesByInsuranceCompany,
      this.workInProgressReportByJob,
      this.workInProgressReportDetailsListing,
      this.dashAccountComparisonReport,
      this.completedContractReport,
      this.jobProgressByAssociate,
      this.agedReceivablesReport,
      this.registerReport,
      this.compensationReport,
      this.productionSummaryByEmployee,
    ];

    for (const link of popupLinks) {
      let popup = null;
      try {
        [popup] = await Promise.all([
          this.page.waitForEvent('popup', { timeout: 5000 }),
          link.click(),
        ]);
      } catch {
        console.warn(`Popup did not open for link: ${await link.innerText()}`);
        continue;
      }

      if (popup && !popup.isClosed()) {
        try {
          await popup.waitForLoadState('domcontentloaded', { timeout: 5000 });
          await popup.close();
        } catch {
          // Ignore close errors
        }
      }
    }
  }

  async verifyOpenJobsReport() {
    await this.openJobsReport.scrollIntoViewIfNeeded();
    let download = null;
    try {
      [download] = await Promise.all([
        this.page.waitForEvent('download', { timeout: 30000 }),
        this.openJobsReport.click(),
      ]);
    } catch {
      console.warn('No download detected for Open Jobs Report link.');
    }
    return download;
  }

  async verifyJobStatusReport() {
    const [reportPopup] = await Promise.all([
      this.page.waitForEvent('popup'),
      this.jobStatusReport.click(),
    ]);

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
  async verifyCreateReportHeader() {
    await this.createReportHeader.waitFor({ state: 'visible' });
  }

  async verifyNewReportHeading() {
    await this.newReportHeading.waitFor({ state: 'visible' });
  }

  async verifyLegacyReportCreatorHeading() {
    await this.legacyReportHeading.waitFor({ state: 'visible' });
  }
}
