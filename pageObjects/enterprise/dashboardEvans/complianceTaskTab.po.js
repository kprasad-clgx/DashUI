import { expect } from '@playwright/test';

const ComplianceTaskTabLocators = {
  complianceTaskTab: '#ctl00_ContentPlaceHolder1_dockJobTabs_C_tabStripJobTabs .rtsTxt',
  complianceManagerLabel:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_ComplianceTasks_userControl_Label_Heading',
  gridHeader:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_ComplianceTasks_userControl_ComplianceManagerGridView_ctl00_Header .rgHeader a',
  exportToExcelButton:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_ComplianceTasks_userControl_ComplianceManagerGridView_ctl00_ctl02_ctl00_ExportToExcelButton',
  refreshButton:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_ComplianceTasks_userControl_ComplianceManagerGridView_ctl00_ctl02_ctl00_RefreshGridButton',
};

class ComplianceTaskTabPage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to Compliance Tasks tab
   */
  async navigateToComplianceTasksTab() {
    const complianceTaskTabLocator = this.page.locator(
      ComplianceTaskTabLocators.complianceTaskTab,
      { hasText: 'Compliance Tasks' },
    );
    await expect(complianceTaskTabLocator).toBeVisible();
    await complianceTaskTabLocator.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Assert Compliance Manager label is visible and has correct text
   */
  async assertComplianceManagerLabel() {
    const complianceManagerLabel = this.page.locator(
      ComplianceTaskTabLocators.complianceManagerLabel,
    );
    await complianceManagerLabel.waitFor({ state: 'visible' });
    await expect(complianceManagerLabel).toHaveText('Compliance Manager');
  }

  /**
   * Assert all grid headers are visible
   * @param {Array<string>} headers - Array of expected header texts
   */
  async assertGridHeaders(headers) {
    for (const headerText of headers) {
      const headerLocator = this.page.locator(ComplianceTaskTabLocators.gridHeader, {
        hasText: headerText,
      });
      await expect(headerLocator).toBeVisible();
    }
  }

  /**
   * Assert export to Excel button is visible
   */
  async assertExportToExcelButton() {
    const exportToExcelButton = this.page.locator(ComplianceTaskTabLocators.exportToExcelButton);
    await expect(exportToExcelButton).toBeVisible();
  }

  /**
   * Download and assert Excel file
   */
  async downloadAndAssertExcel() {
    const exportToExcelButton = this.page.locator(ComplianceTaskTabLocators.exportToExcelButton);
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      exportToExcelButton.click(),
    ]);
    const suggestedFilename = await download.suggestedFilename();
    expect(
      suggestedFilename.includes('ComplianceTask') && suggestedFilename.endsWith('.xlsx'),
    ).toBeTruthy();
  }

  /**
   * Assert refresh button is visible
   */
  async assertRefreshButton() {
    const refreshButton = this.page.locator(ComplianceTaskTabLocators.refreshButton);
    await expect(refreshButton).toBeVisible();
  }
}

export default ComplianceTaskTabPage;
