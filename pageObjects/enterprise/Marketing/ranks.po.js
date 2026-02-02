import { expect } from '@playwright/test';

/**
 * @typedef {Object} rankMarketingLocatorsType
 * @property {string} marketingTab
 * @property {string} ranksSubTab
 * @property {string} pageLabel
 * @property {string} backToDashboardButton
 * @property {string} addNewRecordButton
 * @property {string} gridHeader
 * @property {string} exportToExcelButton
 * @property {string} exportToPDFButton
 */

/** @type {rankMarketingLocatorsType} */
const rankMarketingLocators = {
  marketingTab: "a.rmLink.rmRootLink:has-text('Marketing')",
  ranksSubTab: "a.rmLink.menuNoChildSubHeader:has-text('Ranks')",
  pageLabel: '#ctl00_ContentPlaceHolder1_lbDivision',
  backToDashboardButton: '#ctl00_ContentPlaceHolder1_btnBackToHomepage',
  addNewRecordButton: '#ctl00_ContentPlaceHolder1_RadGrid1_ctl00_ctl02_ctl00_InitInsertButton',
  gridHeader: '#ctl00_ContentPlaceHolder1_RadGrid1_ctl00_Header .rgHeader',
  exportToExcelButton: '#ctl00_ContentPlaceHolder1_RadGrid1_ctl00_ctl02_ctl00_ExportToExcelButton',
  exportToPDFButton: '#ctl00_ContentPlaceHolder1_RadGrid1_ctl00_ctl02_ctl00_ExportToPdfButton',
};

class RankMarketingPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToRankMarketing() {
    await this.page.locator(rankMarketingLocators.marketingTab).hover();
    await this.page
      .locator(rankMarketingLocators.ranksSubTab)
      .waitFor({ state: 'visible', timeout: 10000 });
    await this.page.locator(rankMarketingLocators.ranksSubTab).click();
    await this.page.waitForLoadState('networkidle');
  }

  async assertPageLabel() {
    const pageLabelLocator = this.page.locator(rankMarketingLocators.pageLabel);
    await expect(pageLabelLocator).toBeVisible();
    await expect(pageLabelLocator).toHaveText('Rank');
  }

  async assertBackToDashboardButton() {
    const backToMarketingDashboardButton = this.page.locator(
      rankMarketingLocators.backToDashboardButton,
    );
    await expect(backToMarketingDashboardButton).toBeVisible();
  }

  async assertAddNewRecordButton() {
    const addNewRecordButton = this.page.locator(rankMarketingLocators.addNewRecordButton);
    await expect(addNewRecordButton).toBeVisible();
  }

  async assertGridHeaders(expectedHeaders) {
    for (const labelText of expectedHeaders) {
      const labelLocator = this.page
        .locator(rankMarketingLocators.gridHeader)
        .getByText(labelText, {
          exact: true,
        });
      await expect(labelLocator).toBeVisible();
    }
  }

  async assertExportToExcelButton() {
    const exportToExcelButton = this.page.locator(rankMarketingLocators.exportToExcelButton);
    await expect(exportToExcelButton).toBeVisible();
  }

  async assertExportToPDFButton() {
    const exportToPDFButton = this.page.locator(rankMarketingLocators.exportToPDFButton);
    await expect(exportToPDFButton).toBeVisible();
  }

  async downloadAndAssertExcel() {
    const exportToExcelButton = this.page.locator(rankMarketingLocators.exportToExcelButton);
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      exportToExcelButton.click(),
    ]);
    const suggestedFilename = await download.suggestedFilename();
    expect(suggestedFilename).toContain('RankDetails');
    expect(suggestedFilename.endsWith('.xls')).toBeTruthy();
  }

  async downloadAndAssertPDF() {
    const exportToPDFButton = this.page.locator(rankMarketingLocators.exportToPDFButton);
    const [pdfDownload] = await Promise.all([
      this.page.waitForEvent('download'),
      exportToPDFButton.click(),
    ]);
    const pdfFilename = await pdfDownload.suggestedFilename();
    expect(pdfFilename).toContain('RankDetails');
    expect(pdfFilename.endsWith('.pdf')).toBeTruthy();
  }
}

export default RankMarketingPage;
