import { expect } from '@playwright/test';

export const EnterpriseAccountValidationLocators = {
  // Inherits job search locators from EnterpriseAccountingDetailsPage

  // Report with POs
  accountingReportPOBtn: '#ctl00_ContentPlaceHolder1_ReportWithPOButton',
};

class EnterpriseAccountValidationPage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Search for a job by job number - Account Validation specific implementation
   * @param {string} jobNumber - The job number to search for
   * @param {string} jobNumberWithName - The job number with name to select from dropdown (optional)
   */
  async searchJobByNumber(jobNumber, jobNumberWithName) {
    const clientLackingButton = '#ctl00_ctl45_ClientLackingButton';
    const jobNumberInput = '#ctl00_ctl45_ddlJobNumber_Input';
    const jobNumberDropdownList = '#ctl00_ctl45_ddlJobNumber_DropDown ul.rcbList li';
    const loadingIndicator = '#ctl00_ctl45_ddlJobNumber_DropDown .loading-class';
    const searchBoxBtn = '#ctl00_ctl45_btnMJobSearch';

    const searchBox = this.page.locator(clientLackingButton);
    await searchBox.waitFor({ state: 'visible', timeout: 30000 });
    await searchBox.click();
    await this.page.waitForLoadState('networkidle');

    const searchBoxInput = this.page.locator(jobNumberInput);
    await searchBoxInput.click();
    await searchBoxInput.fill(jobNumber);

    const loadingIndicatorElement = this.page.locator(loadingIndicator);
    if (await loadingIndicatorElement.isVisible({ timeout: 10000 }).catch(() => false)) {
      await loadingIndicatorElement.waitFor({
        state: 'hidden',
        timeout: 10000,
      });
    }

    const dropdownList = this.page.locator(jobNumberDropdownList);

    // Wait for the specific item containing the full text to appear
    const specificItem = dropdownList.filter({
      hasText: jobNumberWithName,
    });
    await specificItem.waitFor({ state: 'visible', timeout: 10000 });

    // Click the specific suggestion in the dropdown
    await specificItem.click();

    // Click the search button
    const searchBoxBtnElement = this.page.locator(searchBoxBtn);
    await searchBoxBtnElement.click();
    await this.page.waitForLoadState('networkidle');
  }

  // ==================== Action Methods ====================

  /**
   * Wait for Acct. Details image to be visible and click it
   */
  async waitAndClickAcctDetailsImg() {
    const acctDetailsImg = this.page.getByRole('link', {
      name: 'Acct. Details',
    });
    await acctDetailsImg.waitFor({ state: 'visible', timeout: 10000 });
    await acctDetailsImg.click();
  }
  /**
   * Wait for and click accounting report with POs button
   */
  async waitAndClickAccountingReportPOButton() {
    const accountingReportPOBtn = this.page.locator(
      EnterpriseAccountValidationLocators.accountingReportPOBtn,
    );
    await accountingReportPOBtn.waitFor({ state: 'visible', timeout: 10000 });
    await accountingReportPOBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Download accounting report with POs file
   * @returns {Promise<Download>} The download object
   */
  async downloadAccountingReportWithPOs() {
    const accountingReportPOBtn = this.page.locator(
      EnterpriseAccountValidationLocators.accountingReportPOBtn,
    );

    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      accountingReportPOBtn.click(),
    ]);

    return download;
  }

  // ==================== Assertion Methods ====================
  /**
   * Assert job number is displayed correctly
   * @param {string} expectedJobNumber
   */
  async assertJobNumberContains(expectedJobNumber) {
    // Looks for the text "Job Number: <jobNumber>" anywhere on the page
    await expect(this.page.getByText(`Job Number: ${expectedJobNumber}`)).toBeVisible();
  }
  /**
   * Assert downloaded file name matches pattern for accounting report with POs
   * @param {Download} download - The download object
   */
  async assertAccountingReportWithPOsFileName(download) {
    const fileName = await download.suggestedFilename();
    expect(fileName).toMatch(/^AccountingReport_WithPOs(\(\d+\))?\.xls$/);
  }
}

export default EnterpriseAccountValidationPage;
