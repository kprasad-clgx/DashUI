/**
 * @typedef {Object} DashboardAccountingNotesLocatorsType
 * @property {string} tabAccountingNotes
 * @property {string} exportToExcelButton
 * @property {string} refreshButton
 * @property {string} exportToPDFButton
 * @property {string} assignedToColumnHeader
 * @property {string} addedByColumnHeader
 */

/** @type {DashboardAccountingNotesLocatorsType} */
const DashboardAccountingNotesLocators = {
  tabAccountingNotes: '#ctl00_ContentPlaceHolder1_dockJobTabs_C_tabStripJobTabs .rtsTxt',
  exportToExcelButton:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_AccountingNotes_userControl_radGrid_AccountingNotes_ctl00_ctl02_ctl00_ExportToExcelButton',
  refreshButton:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_AccountingNotes_userControl_radGrid_AccountingNotes_ctl00_ctl02_ctl00_RefreshGridButton',
  exportToPDFButton:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_AccountingNotes_userControl_radGrid_AccountingNotes_ctl00_ctl02_ctl00_ExportToPdfButton',
  assignedToColumnHeader:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_AccountingNotes_userControl_radGrid_AccountingNotes_GridHeader a',
  addedByColumnHeader:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_AccountingNotes_userControl_radGrid_AccountingNotes_GridHeader a',
};

class DashboardAccountingNotesPage {
  constructor(page) {
    this.page = page;
  }

  // Navigate to Accounting Notes tab
  async navigateToAccountingNotesTab() {
    const tabAccountingNotes = this.page.locator(
      DashboardAccountingNotesLocators.tabAccountingNotes,
      { hasText: 'Accounting Notes' },
    );
    await tabAccountingNotes.waitFor({ state: 'visible', timeout: 5000 });
    await tabAccountingNotes.click();
    await this.page.waitForTimeout(5000);
  }

  // Verify Export to Excel button is visible
  async verifyExportToExcelButtonVisible() {
    const exportToExcelButton = this.page.locator(
      DashboardAccountingNotesLocators.exportToExcelButton,
    );
    await exportToExcelButton.waitFor({ state: 'visible' });
    return exportToExcelButton;
  }

  // Verify Refresh button is visible
  async verifyRefreshButtonVisible() {
    const refreshButton = this.page.locator(DashboardAccountingNotesLocators.refreshButton);
    await refreshButton.waitFor({ state: 'visible' });
    return refreshButton;
  }

  // Verify Export to PDF button is visible
  async verifyExportToPDFButtonVisible() {
    const exportToPDFButton = this.page.locator(DashboardAccountingNotesLocators.exportToPDFButton);
    await exportToPDFButton.waitFor({ state: 'visible' });
    return exportToPDFButton;
  }

  // Verify Assigned To column header is visible
  async verifyAssignedToColumnHeaderVisible() {
    const assignedToColumnHeader = this.page.locator(
      DashboardAccountingNotesLocators.assignedToColumnHeader,
      { hasText: 'Assigned To' },
    );
    await assignedToColumnHeader.waitFor({ state: 'visible' });
    return assignedToColumnHeader;
  }

  // Verify Added By column header is visible
  async verifyAddedByColumnHeaderVisible() {
    const addedByColumnHeader = this.page.locator(
      DashboardAccountingNotesLocators.addedByColumnHeader,
      { hasText: 'Added By' },
    );
    await addedByColumnHeader.waitFor({ state: 'visible' });
    return addedByColumnHeader;
  }
}

export default DashboardAccountingNotesPage;
