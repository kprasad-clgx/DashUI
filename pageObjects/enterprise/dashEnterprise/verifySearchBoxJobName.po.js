import { expect } from '@playwright/test';

class VerifySearchBoxJobNamePage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Open advanced search box
   */
  async openAdvancedSearch() {
    const searchBox = this.page.locator('#ctl00_ctl45_ClientLackingButton');
    await searchBox.waitFor({ state: 'visible', timeout: 30000 });
    await searchBox.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Search by job name (ensures the correct job name is selected from the dropdown)
   * @param {string} jobName - Job name to search
   */
  async searchByJobName(jobName) {
    const jobNameInput = this.page.locator('#ctl00_ctl45_ddlJobName_Input');
    const dropdownList = this.page.locator('#ctl00_ctl45_ddlJobName_DropDown ul.rcbList li');
    const loadingIndicator = this.page.locator('#ctl00_ctl45_ddlJobName_DropDown .loading-class');
    const searchButton = this.page.locator('#ctl00_ctl45_JobNameSearchBtn');

    // Focus and fill the job name input
    await jobNameInput.click();
    await jobNameInput.fill(jobName);

    // Wait for loading indicator to disappear if present
    if (await loadingIndicator.isVisible({ timeout: 10000 }).catch(() => false)) {
      await loadingIndicator.waitFor({ state: 'hidden', timeout: 10000 });
    }

    // Wait for the specific item containing the full text to appear and select the first match
    const specificItem = dropdownList.filter({ hasText: jobName }).first();
    await specificItem.waitFor({ state: 'visible', timeout: 10000 });

    // Click the specific suggestion in the dropdown
    await specificItem.click();

    // Click the search button if present
    if (await searchButton.isVisible().catch(() => false)) {
      await searchButton.click();
    }

    // Wait for navigation to the job page
    await this.page.waitForURL((url) => url.toString().includes('jJobSlideBoard.aspx'), {
      timeout: 30000,
    });
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Verify job name in the header
   * @param {string} expectedJobName - Expected job name
   */
  async verifyJobName(expectedJobName) {
    // Extract and verify the job name from the header
    const jobNameElement = this.page.locator('span[title="Job Name"]');
    // Wait for the element to be visible with increased timeout
    await jobNameElement.waitFor({ state: 'visible', timeout: 30000 });
    // Get the text content
    const jobNameText = await jobNameElement.textContent();
    // Clean up the text (remove leading pipe and spaces)
    const jobName = jobNameText.trim().replace(/^\|/, '').trim();
    // Assert the job name
    expect(jobName).toBe(expectedJobName);
  }

  /**
   * Complete search by job name workflow
   * @param {string} jobName - Job name to search and verify
   */
  async searchAndVerifyJobName(jobName) {
    await this.openAdvancedSearch();
    await this.searchByJobName(jobName);
    await this.verifyJobName(jobName);
  }
}

export default VerifySearchBoxJobNamePage;
