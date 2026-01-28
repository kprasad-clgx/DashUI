import { expect } from '@playwright/test';
import { EnterpriseAccountingDetailsLocators } from '../dashboardEvans/enterpriseDashboardAccountingNotes.po.js';

class VerifySearchBoxJobNumberPage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Open advanced search box
   */
  async openAdvancedSearch() {
    const searchBox = this.page.locator(EnterpriseAccountingDetailsLocators.clientLackingButton);
    await searchBox.waitFor({ state: 'visible', timeout: 30000 });
    await searchBox.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Search by job number
   * @param {string} jobNumber - Job number to search
   */
  async searchByJobNumber(jobNumber) {
    const jobNumberSearchBox = this.page.locator(
      EnterpriseAccountingDetailsLocators.jobNumberInput,
    );
    await jobNumberSearchBox.click();
    await jobNumberSearchBox.fill(jobNumber);

    // Wait for loading indicator to disappear
    const loadingIndicator = this.page.locator(
      EnterpriseAccountingDetailsLocators.loadingIndicator,
    );
    if (await loadingIndicator.isVisible({ timeout: 10000 }).catch(() => false)) {
      await loadingIndicator.waitFor({ state: 'hidden', timeout: 10000 });
    }

    // Wait for the dropdown to appear and select the matching item
    const dropdownList = this.page.locator(
      EnterpriseAccountingDetailsLocators.jobNumberDropdownList,
    );

    // Wait for the specific item containing the job number to appear
    const specificItem = dropdownList.filter({ hasText: jobNumber });
    await specificItem.waitFor({ state: 'visible', timeout: 10000 });

    // Click the specific suggestion in the dropdown
    await specificItem.click();

    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Click search button
   */
  async clickSearchButton() {
    const searchBoxBtn = this.page.locator(EnterpriseAccountingDetailsLocators.searchBoxBtn);
    await searchBoxBtn.waitFor({ state: 'visible', timeout: 10000 });
    await searchBoxBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Verify URL contains job number
   * @param {string} jobNumber - Job number to verify in URL
   */
  async verifyJobNumberInURL(jobNumber) {
    const currentUrl = this.page.url();
    expect(currentUrl).toContain(jobNumber);
  }

  /**
   * Complete search by job number workflow
   * @param {string} jobNumber - Job number to search and verify
   */
  async searchAndVerifyJobNumber(jobNumber) {
    await this.openAdvancedSearch();
    await this.searchByJobNumber(jobNumber);
    await this.clickSearchButton();
    await this.verifyJobNumberInURL(jobNumber);
  }
}

export default VerifySearchBoxJobNumberPage;
