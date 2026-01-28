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
  async searchJobByNumber(jobNumber, jobNumberWithName = null) {
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
}

export default EnterpriseAccountingDetailsPage;
