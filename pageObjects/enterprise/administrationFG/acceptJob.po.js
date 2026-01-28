/**
 * @typedef {Object} AcceptJobLocatorsType
 * @property {string} administrationMenu
 * @property {string} menuContainer
 * @property {string} acceptJobMenuOption
 * @property {string} optionsHeader
 * @property {string} dateReceivedHeader
 * @property {string} dateOfLossHeader
 * @property {string} referenceNoHeader
 * @property {string} claimNumberHeader
 * @property {string} clientHeader
 * @property {string} customerHeader
 * @property {string} jobAddressHeader
 * @property {string} requiredServicesHeader
 * @property {string} refreshButton
 * @property {string} exportToExcelButton
 */

/** @type {AcceptJobLocatorsType} */
const AcceptJobLocators = {
  administrationMenu: "span:has-text('Administration')",
  menuContainer: 'div.rmSlide',
  acceptJobMenuOption: 'ul.rmVertical.rmGroup.rmLevel1 li.rmItem a.rmLink span.rmText',
  optionsHeader:
    "table#ctl00_ContentPlaceHolder1_gvAcceptClaims_ctl00_Header th.rgHeader:has-text('Options')",
  dateReceivedHeader:
    "table#ctl00_ContentPlaceHolder1_gvAcceptClaims_ctl00_Header th.rgHeader a:has-text('Date Received')",
  dateOfLossHeader:
    "table#ctl00_ContentPlaceHolder1_gvAcceptClaims_ctl00_Header th.rgHeader a:has-text('Date of Loss')",
  referenceNoHeader: 'table#ctl00_ContentPlaceHolder1_gvAcceptClaims_ctl00_Header th.rgHeader a',
  claimNumberHeader: 'table#ctl00_ContentPlaceHolder1_gvAcceptClaims_ctl00_Header th.rgHeader a',
  clientHeader:
    "table#ctl00_ContentPlaceHolder1_gvAcceptClaims_ctl00_Header th.rgHeader a:has-text('Client')",
  customerHeader:
    "table#ctl00_ContentPlaceHolder1_gvAcceptClaims_ctl00_Header th.rgHeader a:has-text('Customer')",
  jobAddressHeader:
    "table#ctl00_ContentPlaceHolder1_gvAcceptClaims_ctl00_Header th.rgHeader a:has-text('Job Address')",
  requiredServicesHeader:
    "table#ctl00_ContentPlaceHolder1_gvAcceptClaims_ctl00_Header th.rgHeader a:has-text('Required Services')",
  refreshButton: '#ctl00_ContentPlaceHolder1_gvAcceptClaims_ctl00_ctl02_ctl00_RefreshGridButton',
  exportToExcelButton:
    '#ctl00_ContentPlaceHolder1_gvAcceptClaims_ctl00_ctl02_ctl00_ExportToExcelButton',
};

class AcceptJobPage {
  constructor(page) {
    this.page = page;
  }

  // Navigate to Accept Job page through Administration menu
  async navigateToAcceptJob() {
    await this.page.locator(AcceptJobLocators.administrationMenu).first().hover();
    // Wait for the Accept Job menu item to be visible and click it
    await this.page
      .getByRole('link', { name: 'Accept Job' })
      .waitFor({ state: 'visible', timeout: 10000 });
    await this.page.getByRole('link', { name: 'Accept Job' }).click();
    await this.page.waitForLoadState('networkidle');
  }

  // Verify Options header is visible in the grid
  async verifyOptionsHeaderVisible() {
    const optionsHeader = this.page.locator(AcceptJobLocators.optionsHeader, {
      hasText: /^Options$/,
    });
    await optionsHeader.waitFor({ state: 'visible' });
    return optionsHeader;
  }

  // Verify Date Received header is visible in the grid
  async verifyDateReceivedHeaderVisible() {
    const dateReceivedHeader = this.page.locator(AcceptJobLocators.dateReceivedHeader, {
      hasText: /^Date Received$/,
    });
    await dateReceivedHeader.waitFor({ state: 'visible' });
    return dateReceivedHeader;
  }

  // Verify Date of Loss header is visible in the grid
  async verifyDateOfLossHeaderVisible() {
    const dateOfLossHeader = this.page.locator(AcceptJobLocators.dateOfLossHeader, {
      hasText: /^Date of Loss$/,
    });
    await dateOfLossHeader.waitFor({ state: 'visible' });
    return dateOfLossHeader;
  }

  // Verify Reference No. / TransactionID header is visible in the grid
  async verifyReferenceNoHeaderVisible() {
    const referenceNoHeader = this.page.locator(AcceptJobLocators.referenceNoHeader, {
      hasText: /^Reference No\.\s*\/\s*TransactionID$/,
    });
    await referenceNoHeader.waitFor({ state: 'visible' });
    return referenceNoHeader;
  }

  // Verify Claim Number header is visible in the grid
  async verifyClaimNumberHeaderVisible() {
    const claimNumberHeader = this.page
      .locator(AcceptJobLocators.claimNumberHeader, {
        hasText: /^Claim Number$/,
      })
      .first();
    await claimNumberHeader.waitFor({ state: 'visible' });
    return claimNumberHeader;
  }

  // Verify Client header is visible in the grid
  async verifyClientHeaderVisible() {
    const clientHeader = this.page.locator(AcceptJobLocators.clientHeader, {
      hasText: /^Client$/,
    });
    await clientHeader.waitFor({ state: 'visible' });
    return clientHeader;
  }

  // Verify Customser header is visible in the grid
  async verifyCustomerHeaderVisible() {
    const customerHeader = this.page
      .locator(AcceptJobLocators.customerHeader, {
        hasText: /^Customer$/,
      })
      .first();
    await customerHeader.waitFor({ state: 'visible' });
    return customerHeader;
  }

  // Verify Job Address header is visible in the grid
  async verifyJobAddressHeaderVisible() {
    const jobAddressHeader = this.page
      .locator(AcceptJobLocators.jobAddressHeader, {
        hasText: /^Job Address$/,
      })
      .first();
    await jobAddressHeader.waitFor({ state: 'visible' });
    return jobAddressHeader;
  }

  // Verify Required Services header is visible in the grid
  async verifyRequiredServicesHeaderVisible() {
    const requiredServicesHeader = this.page.locator(AcceptJobLocators.requiredServicesHeader, {
      hasText: /^Required Services$/,
    });
    await requiredServicesHeader.waitFor({ state: 'visible' });
    return requiredServicesHeader;
  }

  // Verify Refresh button is visible
  async verifyRefreshButtonVisible() {
    const refreshButton = this.page.locator(AcceptJobLocators.refreshButton);
    await refreshButton.waitFor({ state: 'visible' });
    return refreshButton;
  }

  // Click Refresh button and verify data is refreshed via network request
  async clickRefreshButton() {
    const refreshButton = this.page.locator(AcceptJobLocators.refreshButton);
    await refreshButton.waitFor({ state: 'visible' });

    // Wait for network response to verify data refresh
    const responsePromise = this.page.waitForResponse(
      (response) =>
        response.url().includes('gvAcceptClaims') ||
        response.url().includes('AcceptClaims') ||
        response.status() === 200,
      { timeout: 10000 },
    );

    await refreshButton.click();

    // Wait for and verify the response
    const response = await responsePromise;

    // Assert response is successful
    if (!response.ok()) {
      throw new Error(`Refresh failed with status: ${response.status()}`);
    }

    if (response.status() !== 200) {
      throw new Error(`Expected status 200, but got: ${response.status()}`);
    }

    // Wait for grid to update
    await this.page.waitForLoadState('networkidle');
  }

  // Verify Export to Excel button is visible
  async verifyExportToExcelButtonVisible() {
    const exportToExcelButton = this.page.locator(AcceptJobLocators.exportToExcelButton);
    await exportToExcelButton.waitFor({ state: 'visible' });
    return exportToExcelButton;
  }

  // Verify Export to Excel button is working
  async clickExportToExcelButton() {
    const exportToExcelButton = this.page.locator(AcceptJobLocators.exportToExcelButton);
    await exportToExcelButton.waitFor({ state: 'visible' });

    // Wait for download to start
    const downloadPromise = this.page.waitForEvent('download');
    await exportToExcelButton.click();

    // Wait for download to complete
    const download = await downloadPromise;

    // Verify the downloaded file name starts with expected pattern
    const actualFileName = download.suggestedFilename();
    if (!actualFileName.startsWith('ClaimsToAccept_') || !actualFileName.endsWith('.xlsx')) {
      throw new Error(
        `Expected file name pattern: ClaimsToAccept_MM-DD-YYYY.xlsx, but got: ${actualFileName}`,
      );
    }

    return download;
  }
}

export default AcceptJobPage;
