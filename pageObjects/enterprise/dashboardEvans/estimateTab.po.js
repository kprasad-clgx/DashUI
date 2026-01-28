/**
 * @typedef {Object} DashboardEstimateTabLocatorsType
 * @property {string} estimateTab
 * @property {string} refreshButton
 * @property {string} exportToExcelButton
 * @property {string} estimateNumberColumnHeader
 * @property {string} addedByColumnHeader
 * @property {string} sourceColumnHeader
 * @property {string} profitColumnHeader
 */

/** @type {DashboardEstimateTabLocatorsType} */
const DashboardEstimateTabLocators = {
  estimateTab: '#ctl00_ContentPlaceHolder1_dockJobTabs_C_tabStripJobTabs .rtsTxt',
  refreshButton:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Estimates_userControl_gvEstimate_ctl00_ctl02_ctl00_RefreshGridButton',
  exportToExcelButton:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Estimates_userControl_gvEstimate_ctl00_ctl02_ctl00_ExportToExcelButton',
  estimateNumberColumnHeader:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Estimates_userControl_gvEstimate_GridHeader  .rgHeader a',
  addedByColumnHeader:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Estimates_userControl_gvEstimate_GridHeader  .rgHeader a',
  sourceColumnHeader:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Estimates_userControl_gvEstimate_GridHeader  .rgHeader a',
  profitColumnHeader:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Estimates_userControl_gvEstimate_GridHeader  .rgHeader a',
};

class DashboardEstimateTabPage {
  constructor(page) {
    this.page = page;
  }

  // Navigate to Estimate tab
  async navigateToEstimateTab() {
    const estimateTab = this.page.locator(DashboardEstimateTabLocators.estimateTab, {
      hasText: 'Estimate',
    });
    await estimateTab.waitFor({ state: 'visible', timeout: 5000 });
    await estimateTab.click();
    await this.page.waitForLoadState('networkidle');
  }

  // Verify Refresh button is visible
  async verifyRefreshButtonVisible() {
    const refreshButton = this.page.locator(DashboardEstimateTabLocators.refreshButton);
    await refreshButton.waitFor({ state: 'visible', timeout: 60000 });
    return refreshButton;
  }

  // Verify Export to Excel button is visible
  async verifyExportToExcelButtonVisible() {
    const exportToExcelButton = this.page.locator(DashboardEstimateTabLocators.exportToExcelButton);
    await exportToExcelButton.waitFor({ state: 'visible' });
    return exportToExcelButton;
  }

  // Click on Export to Excel button and assert file download
  async clickExportToExcelAndAssertDownload() {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.clickExportToExcelButton(),
    ]);
    const suggestedFilename = await download.suggestedFilename();
    return suggestedFilename.startsWith('Estimates');
  }

  // Verify Estimate Number column header is visible
  async verifyEstimateNumberColumnHeaderVisible() {
    const estimateNumberColumnHeader = this.page.locator(
      DashboardEstimateTabLocators.estimateNumberColumnHeader,
      { hasText: 'Estimate Number' },
    );
    await estimateNumberColumnHeader.waitFor({ state: 'visible' });
    return estimateNumberColumnHeader;
  }

  // Verify Added By column header is visible
  async verifyAddedByColumnHeaderVisible() {
    const addedByColumnHeader = this.page.locator(
      DashboardEstimateTabLocators.addedByColumnHeader,
      { hasText: 'Added By' },
    );
    await addedByColumnHeader.waitFor({ state: 'visible' });
    return addedByColumnHeader;
  }

  // Verify Source column header is visible
  async verifySourceColumnHeaderVisible() {
    const sourceColumnHeader = this.page.locator(DashboardEstimateTabLocators.sourceColumnHeader, {
      hasText: 'Source',
    });
    await sourceColumnHeader.waitFor({ state: 'visible' });
    return sourceColumnHeader;
  }

  // Verify Profit column header is visible
  async verifyProfitColumnHeaderVisible() {
    const profitColumnHeader = this.page.locator(DashboardEstimateTabLocators.profitColumnHeader, {
      hasText: 'Profit',
    });
    await profitColumnHeader.waitFor({ state: 'visible' });
    return profitColumnHeader;
  }
}

export default DashboardEstimateTabPage;
