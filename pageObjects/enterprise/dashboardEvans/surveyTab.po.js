/**
 * @typedef {import('@playwright/test').Page} Page
 */

const DashboardSurveyTabPageLocators = {
  surveyTab: '#ctl00_ContentPlaceHolder1_dockJobTabs_C_tabStripJobTabs .rtsTxt',
  takeSurveyButton:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Survey_userControl_SrveyDetails_Grid_ctl00_ctl02_ctl00_TakeSurveyButton',
  refreshButton:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Survey_userControl_SrveyDetails_Grid_ctl00_ctl02_ctl00_RefreshGridButton',
  exportToExcelButton:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Survey_userControl_SrveyDetails_Grid_ctl00_ctl02_ctl00_ExportToExcelButton',
  exportToPDFButton:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Survey_userControl_SrveyDetails_Grid_ctl00_ctl02_ctl00_ExportToPdfButton',
  sNoColumnHeader:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Survey_userControl_SrveyDetails_Grid_GridHeader th a',
  questionColumnHeader:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Survey_userControl_SrveyDetails_Grid_GridHeader th a',
  surveyPointsColumnHeader:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Survey_userControl_SrveyDetails_Grid_GridHeader th a',
  averageScoreColumnHeader:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Survey_userControl_SrveyDetails_Grid_GridHeader th a',
  customerServiceSurveyForm: '#ctl00_ContentPlaceHolder1_lbOpenJobs',
};

class DashboardSurveyTabPage {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to Survey tab
   */
  async navigateToSurveyTab() {
    const surveyTab = this.page.locator(DashboardSurveyTabPageLocators.surveyTab, {
      hasText: 'Survey',
    });
    await surveyTab.waitFor({ state: 'visible', timeout: 5000 });
    await surveyTab.click();
    await this.page.waitForTimeout(5000);
  }

  /**
   * Verify Take a Survey button is visible
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  async verifyTakeSurveyButtonVisible() {
    return this.page.locator(DashboardSurveyTabPageLocators.takeSurveyButton);
  }

  /**
   * Verify Refresh button is visible
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  async verifyRefreshButtonVisible() {
    return this.page.locator(DashboardSurveyTabPageLocators.refreshButton);
  }

  /**
   * Verify Export to Excel button is visible
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  async verifyExportToExcelButtonVisible() {
    return this.page.locator(DashboardSurveyTabPageLocators.exportToExcelButton);
  }

  /**
   * Verify Export to PDF button is visible
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  async verifyExportToPDFButtonVisible() {
    return this.page.locator(DashboardSurveyTabPageLocators.exportToPDFButton);
  }

  /**
   * Verify SNo. column header is visible
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  async verifySNoColumnHeaderVisible() {
    return this.page.locator(DashboardSurveyTabPageLocators.sNoColumnHeader, {
      hasText: 'SNo.',
    });
  }

  /**
   * Verify Question column header is visible
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  async verifyQuestionColumnHeaderVisible() {
    return this.page.locator(DashboardSurveyTabPageLocators.questionColumnHeader, {
      hasText: 'Question',
    });
  }

  /**
   * Verify Survey Points column header is visible
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  async verifySurveyPointsColumnHeaderVisible() {
    return this.page.locator(DashboardSurveyTabPageLocators.surveyPointsColumnHeader, {
      hasText: 'Survey Points',
    });
  }

  /**
   * Verify Average Score column header is visible
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  async verifyAverageScoreColumnHeaderVisible() {
    return this.page.locator(DashboardSurveyTabPageLocators.averageScoreColumnHeader, {
      hasText: 'Average Score',
    });
  }

  /**
   * Click Take a Survey button
   */
  async clickTakeSurveyButton() {
    const takeSurveyButton = this.page.locator(DashboardSurveyTabPageLocators.takeSurveyButton);
    await takeSurveyButton.click();
    await this.page.waitForTimeout(3000);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Verify Customer Service Survey Form title
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  async verifyCustomerServiceSurveyFormTitle() {
    return this.page.locator(DashboardSurveyTabPageLocators.customerServiceSurveyForm);
  }

  /**
   * Download and assert Excel file
   * @returns {Promise<boolean>}
   */
  async downloadAndAssertExcel() {
    const exportToExcelButton = this.page.locator(
      DashboardSurveyTabPageLocators.exportToExcelButton,
    );
    await exportToExcelButton.waitFor({ state: 'visible' });

    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      exportToExcelButton.click(),
    ]);
    const suggestedFilename = await download.suggestedFilename();
    await this.page.waitForLoadState('networkidle');
    return suggestedFilename.includes('Surveys') && suggestedFilename.endsWith('.xlsx');
  }

  /**
   * Download and assert PDF file
   * @returns {Promise<boolean>}
   */
  async downloadAndAssertPDF() {
    const exportToPDFButton = this.page.locator(DashboardSurveyTabPageLocators.exportToPDFButton);
    await exportToPDFButton.waitFor({ state: 'visible' });

    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      exportToPDFButton.click(),
    ]);
    const suggestedFilename = await download.suggestedFilename();
    await this.page.waitForLoadState('networkidle');
    return suggestedFilename.includes('Surveys') && suggestedFilename.endsWith('.pdf');
  }
}

export default DashboardSurveyTabPage;
