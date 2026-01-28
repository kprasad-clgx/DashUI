import { expect } from '@playwright/test';

export const EnterpriseAccountingDetailsLocators = {
  // Job Search & Selection
  clientLackingButton: '#ctl00_ctl45_ClientLackingButton',
  jobNumberInput: '#ctl00_ctl45_ddlJobNumber_Input',
  jobNumberDropdown: '#ctl00_ctl45_ddlJobNumber_DropDown',
  jobNumberDropdownList: '#ctl00_ctl45_ddlJobNumber_DropDown ul.rcbList li',
  loadingIndicator: '#ctl00_ctl45_ddlJobNumber_DropDown .loading-class',
  searchBoxBtn: '#ctl00_ctl45_btnMJobSearch',

  // Accounting Details Page
  upperJobNumberLabel: '#ctl00_ContentPlaceHolder1_UpperJobNumberLabel',
  accountingReportButton: '#ctl00_ContentPlaceHolder1_ReportButton',

  // Navigation
  backToAccountingDetailsButton: '#btnBacktoEstimate',
};

class EnterpriseAccountingDetailsPage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Search for a job by job number
   * @param {string} jobNumber - The job number to search for
   * @param {string} jobNumberWithName - The job number with name to select from dropdown (optional)
   */
  async searchJobByNumber(jobNumber, jobNumberWithName) {
    const searchBox = this.page.locator(EnterpriseAccountingDetailsLocators.clientLackingButton);
    await searchBox.waitFor({ state: 'visible', timeout: 30000 });
    await searchBox.click();
    await this.page.waitForLoadState('networkidle');

    const searchBoxInput = this.page.locator(EnterpriseAccountingDetailsLocators.jobNumberInput);
    await searchBoxInput.click();
    await searchBoxInput.fill(jobNumber);

    const loadingIndicator = this.page.locator(
      EnterpriseAccountingDetailsLocators.loadingIndicator,
    );
    if (await loadingIndicator.isVisible({ timeout: 10000 }).catch(() => false)) {
      await loadingIndicator.waitFor({ state: 'hidden', timeout: 10000 });
    }

    const dropdownList = this.page.locator(
      EnterpriseAccountingDetailsLocators.jobNumberDropdownList,
    );

    // Wait for the specific item containing the full text to appear
    const specificItem = dropdownList.filter({
      hasText: jobNumberWithName,
    });
    await specificItem.waitFor({ state: 'visible', timeout: 10000 });

    // Click the specific suggestion in the dropdown
    await specificItem.click();

    // Click the search button
    const searchBoxBtn = this.page.locator(EnterpriseAccountingDetailsLocators.searchBoxBtn);
    await searchBoxBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Wait for Acct. Details image to be visible and click it
   */
  async waitAndClickAcctDetailsImg() {
    const acctDetailsImg = this.page.getByRole('img', {
      name: 'Acct. Details',
    });
    await acctDetailsImg.waitFor({ state: 'visible', timeout: 10000 });
    await acctDetailsImg.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Wait for accounting report button to be visible and click it
   */
  async waitAndClickAccountingReportButton() {
    const accountingReportLocator = this.page.locator(
      EnterpriseAccountingDetailsLocators.accountingReportButton,
    );
    await accountingReportLocator.waitFor({ state: 'visible', timeout: 10000 });
    await accountingReportLocator.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Get the job number text from the page
   */
  async getJobNumberText() {
    const jobNumberLocator = this.page.locator(
      EnterpriseAccountingDetailsLocators.upperJobNumberLabel,
    );
    return await jobNumberLocator.textContent();
  }

  /**
   * Click the accounting report button
   */
  async clickAccountingReportButton() {
    const accountingReportLocator = this.page.locator(
      EnterpriseAccountingDetailsLocators.accountingReportButton,
    );
    await accountingReportLocator.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Get element by text
   * @param {string} text - The text to search for
   */
  getElementByText(text) {
    return this.page.getByText(text, { exact: true });
  }

  /**
   * Click back to accounting details button
   */
  async clickBackToAccountingDetails() {
    const backButton = this.page.locator(
      EnterpriseAccountingDetailsLocators.backToAccountingDetailsButton,
    );
    await backButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  // ==================== Assertion Methods ====================

  /**
   * Assert URL contains job number (case-insensitive)
   * @param {string} jobNumber - The job number to check in URL
   */
  async assertUrlContainsJobNumber(jobNumber) {
    const currentUrl = this.page.url();
    expect(currentUrl.toLowerCase()).toContain(jobNumber.toLowerCase());
  }

  /**
   * Assert job number contains expected value
   * @param {string} expectedJobNumber - The expected job number
   */
  async assertJobNumberContains(expectedJobNumber) {
    const jobNumberText = await this.getJobNumberText();
    expect(jobNumberText).toContain(expectedJobNumber);
  }

  /**
   * Assert Invoiced element is visible
   */
  async assertInvoicedVisible() {
    const element = this.getElementByText('Invoiced');
    await expect(element).toBeVisible();
  }

  /**
   * Assert Taxes element is visible
   */
  async assertTaxesVisible() {
    const element = this.getElementByText('Taxes');
    await expect(element).toBeVisible();
  }

  /**
   * Assert Revenue element is visible
   */
  async assertRevenueVisible() {
    const element = this.getElementByText('Revenue');
    await expect(element).toBeVisible();
  }

  /**
   * Assert Costs element is visible
   */
  async assertCostsVisible() {
    const element = this.getElementByText('Costs');
    await expect(element).toBeVisible();
  }

  /**
   * Assert Gross Profit element is visible
   */
  async assertGrossProfitVisible() {
    const element = this.getElementByText('Gross Profit');
    await expect(element).toBeVisible();
  }

  /**
   * Assert Hourly Labor element is visible
   */
  async assertHourlyLaborVisible() {
    const element = this.getElementByText('Hourly Labor');
    await expect(element).toBeVisible();
  }

  /**
   * Assert Labor Burden element is visible
   */
  async assertLaborBurdenVisible() {
    const element = this.getElementByText('Labor Burden');
    await expect(element).toBeVisible();
  }

  /**
   * Assert Sub/Materials element is visible
   */
  async assertSubMaterialsVisible() {
    const element = this.getElementByText('Sub/Materials');
    await expect(element).toBeVisible();
  }

  // Add these locators to your page object
  static accountingHeaderLocators = {
    headerPanel: '#AccountingHeaderLinkPanel',
    addEstimate: 'img[alt="Add Estimate"]',
    uploadEstimate: 'img[alt="Upload Estimate"]',
    importEstimate: 'img[alt="Import Estimate"]',
    estimateTracker: 'img[alt="Estimate Tracker"]',
    acctDetails: 'img[alt="Acct. Details"]',
    woPo: 'img[alt="WO / PO"]',
    readyToInvoice: 'img[alt="Ready To Invoice"]',
  };

  /**
   * Assert Accounting Header is visible
   */
  async assertAccountingHeaderVisible() {
    const element = this.page.locator('#AccountingHeaderLinkPanel');
    await element.waitFor({ state: 'visible', timeout: 10000 });
    await expect(element).toBeVisible();
  }

  /**
   * Assert Add Estimate button is visible
   */
  async assertAddEstimateVisible() {
    const element = this.page.locator('img[alt="Add Estimate"]');
    await element.waitFor({ state: 'visible', timeout: 10000 });
    await expect(element).toBeVisible();
  }

  /**
   * Assert Upload Estimate button is visible
   */
  async assertUploadEstimateVisible() {
    const element = this.page.locator('img[alt="Upload Estimate"]');
    await element.waitFor({ state: 'visible', timeout: 10000 });
    await expect(element).toBeVisible();
  }

  /**
   * Assert Import Estimate button is visible
   */
  async assertImportEstimateVisible() {
    const element = this.page.locator('img[alt="Import Estimate"]');
    await element.waitFor({ state: 'visible', timeout: 10000 });
    await expect(element).toBeVisible();
  }

  /**
   * Assert Estimate Tracker button is visible
   */
  async assertEstimateTrackerVisible() {
    const element = this.page.locator('img[alt="Estimate Tracker"]');
    await element.waitFor({ state: 'visible', timeout: 10000 });
    await expect(element).toBeVisible();
  }

  /**
   * Assert Acct. Details button is visible
   */
  async assertAcctDetailsVisible() {
    const element = this.page.locator('img[alt="Acct. Details"]');
    await element.waitFor({ state: 'visible', timeout: 10000 });
    await expect(element).toBeVisible();
  }

  /**
   * Assert WO / PO button is visible
   */
  async assertWoPoVisible() {
    const element = this.page.locator('img[alt="WO / PO"]');
    await element.waitFor({ state: 'visible', timeout: 10000 });
    await expect(element).toBeVisible();
  }

  /**
   * Assert Ready To Invoice button is visible
   */
  async assertReadyToInvoiceVisible() {
    const element = this.page.locator('img[alt="Ready To Invoice"]');
    await element.waitFor({ state: 'visible', timeout: 10000 });
    await expect(element).toBeVisible();
  }

  /**
   * Assert all Accounting Header options are visible
   */
  async assertAllAccountingHeaderOptionsVisible() {
    await this.assertAccountingHeaderVisible();
    await this.assertAddEstimateVisible();
    await this.assertUploadEstimateVisible();
    await this.assertImportEstimateVisible();
    await this.assertEstimateTrackerVisible();
    await this.assertAcctDetailsVisible();
    await this.assertWoPoVisible();
    await this.assertReadyToInvoiceVisible();
  }
}

export default EnterpriseAccountingDetailsPage;
