/**
 * @typedef {import('@playwright/test').Page} Page
 */

const DashboardComplianceTasksTabPageLocators = {
  complianceTasksTab: '#ctl00_ContentPlaceHolder1_dockJobTabs_C_tabStripJobTabs .rtsTxt',
  complianceManagerLabel:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_ComplianceTasks_userControl_Label_Heading',
  reassignButton:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_ComplianceTasks_userControl_ReassignEmployeeButton',
  statusTextContainer:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_ComplianceTasks_userControl_SlideboardPendingDiv .compliance_status_text',
  refreshButton:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_ComplianceTasks_userControl_ComplianceManagerGridView_ctl00_ctl02_ctl00_RefreshGridButton',
  exportToExcelButton:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_ComplianceTasks_userControl_ComplianceManagerGridView_ctl00_ctl02_ctl00_ExportToExcelButton',
};

class DashboardComplianceTasksTabPage {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to Compliance Tasks tab
   */
  async navigateToComplianceTasksTab() {
    const complianceTasksTab = this.page.locator(
      DashboardComplianceTasksTabPageLocators.complianceTasksTab,
      { hasText: 'Compliance Tasks' },
    );
    await complianceTasksTab.waitFor({ state: 'visible', timeout: 5000 });
    await complianceTasksTab.click();
    await this.page.waitForTimeout(5000);
  }

  /**
   * Verify Compliance Manager label
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  async verifyComplianceManagerLabel() {
    return this.page.locator(DashboardComplianceTasksTabPageLocators.complianceManagerLabel);
  }

  /**
   * Verify Reassign button is visible
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  async verifyReassignButtonVisible() {
    return this.page.locator(DashboardComplianceTasksTabPageLocators.reassignButton);
  }

  /**
   * Verify Pending color indicator is visible
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  async verifyPendingLabelVisible() {
    return this.page
      .locator(DashboardComplianceTasksTabPageLocators.statusTextContainer)
      .filter({ hasText: 'Pending' });
  }

  /**
   * Verify Warning color indicator is visible
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  async verifyWarningLabelVisible() {
    return this.page
      .locator(DashboardComplianceTasksTabPageLocators.statusTextContainer)
      .filter({ hasText: 'Warning' });
  }

  /**
   * Verify Overdue color indicator is visible
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  async verifyOverdueLabelVisible() {
    return this.page
      .locator(DashboardComplianceTasksTabPageLocators.statusTextContainer)
      .filter({ hasText: 'Overdue' });
  }

  /**
   * Verify Refresh button is visible
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  async verifyRefreshButtonVisible() {
    return this.page.locator(DashboardComplianceTasksTabPageLocators.refreshButton);
  }

  /**
   * Verify Export to Excel button is visible
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  async verifyExportToExcelButtonVisible() {
    return this.page.locator(DashboardComplianceTasksTabPageLocators.exportToExcelButton);
  }
}

export default DashboardComplianceTasksTabPage;
