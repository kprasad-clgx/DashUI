/**
 * @typedef {Object} DashboardEquipmentTabLocatorsType
 * @property {string} equipmentTab
 * @property {string} refreshButton
 * @property {string} exportToExcelButton
 * @property {string} exportToPDFButton
 * @property {string} equipmentNameColumnHeader
 * @property {string} equipmentTypeColumnHeader
 * @property {string} barcodeTextColumnHeader
 * @property {string} startDateColumnHeader
 * @property {string} endDateColumnHeader
 * @property {string} daysOnJobColumnHeader
 */

/** @type {DashboardEquipmentTabLocatorsType} */
const DashboardEquipmentTabLocators = {
  equipmentTab: '#ctl00_ContentPlaceHolder1_dockJobTabs_C_tabStripJobTabs .rtsTxt',
  refreshButton:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_JobEquipment_userControl_RadGrid_JobEquipment_ctl00_ctl02_ctl00_RefreshGridButton',
  exportToExcelButton:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_JobEquipment_userControl_RadGrid_JobEquipment_ctl00_ctl02_ctl00_ExportToExcelButton',
  exportToPDFButton:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_JobEquipment_userControl_RadGrid_JobEquipment_ctl00_ctl02_ctl00_ExportToPdfButton',
  equipmentNameColumnHeader:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_JobEquipment_userControl_RadGrid_JobEquipment_GridHeader .rgHeader a',
  equipmentTypeColumnHeader:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_JobEquipment_userControl_RadGrid_JobEquipment_GridHeader .rgHeader a',
  barcodeTextColumnHeader:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_JobEquipment_userControl_RadGrid_JobEquipment_GridHeader .rgHeader a',
  startDateColumnHeader:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_JobEquipment_userControl_RadGrid_JobEquipment_GridHeader .rgHeader a',
  endDateColumnHeader:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_JobEquipment_userControl_RadGrid_JobEquipment_GridHeader .rgHeader a',
  daysOnJobColumnHeader:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_JobEquipment_userControl_RadGrid_JobEquipment_GridHeader .rgHeader a',
};

class DashboardEquipmentTabPage {
  constructor(page) {
    this.page = page;
  }

  // Navigate to Equipment tab
  async navigateToEquipmentTab() {
    const equipmentTab = this.page.locator(DashboardEquipmentTabLocators.equipmentTab, {
      hasText: 'Equipment',
    });
    await equipmentTab.waitFor({ state: 'visible', timeout: 5000 });
    await equipmentTab.click();
    await this.page.waitForTimeout(5000);
  }

  // Verify Refresh button is visible
  async verifyRefreshButtonVisible() {
    const refreshButton = this.page.locator(DashboardEquipmentTabLocators.refreshButton);
    await refreshButton.waitFor({ state: 'visible' });
    return refreshButton;
  }

  // Verify Export to Excel button is visible
  async verifyExportToExcelButtonVisible() {
    const exportToExcelButton = this.page.locator(
      DashboardEquipmentTabLocators.exportToExcelButton,
    );
    await exportToExcelButton.waitFor({ state: 'visible' });
    return exportToExcelButton;
  }

  // Click on Export to Excel button and wait for download
  async clickExportToExcelAndAssertDownload() {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.clickExportToExcelButton(),
    ]);
    const suggestedFilename = await download.suggestedFilename();
    // Assert filename starts with 'Equipment' and ends with '.xlsx'
    return suggestedFilename.startsWith('Equipment') && suggestedFilename.endsWith('.xlsx');
  }

  // Verify Export to PDF button is visible
  async verifyExportToPDFButtonVisible() {
    const exportToPDFButton = this.page.locator(DashboardEquipmentTabLocators.exportToPDFButton);
    await exportToPDFButton.waitFor({ state: 'visible' });
    return exportToPDFButton;
  }

  // Click on Export to PDF button and wait for download
  async clickExportToPDFAndAssertDownload() {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.clickExportToPDFButton(),
    ]);
    const suggestedFilename = await download.suggestedFilename();
    // Assert filename starts with 'Equipment' and ends with '.pdf'
    return suggestedFilename.startsWith('Equipment') && suggestedFilename.endsWith('.pdf');
  }

  // Verify Equipment Name column header is visible
  async verifyEquipmentNameColumnHeaderVisible() {
    const equipmentNameColumnHeader = this.page.locator(
      DashboardEquipmentTabLocators.equipmentNameColumnHeader,
      { hasText: 'Equipment Name' },
    );
    await equipmentNameColumnHeader.waitFor({ state: 'visible' });
    return equipmentNameColumnHeader;
  }

  // Verify Equipment Type column header is visible
  async verifyEquipmentTypeColumnHeaderVisible() {
    const equipmentTypeColumnHeader = this.page.locator(
      DashboardEquipmentTabLocators.equipmentTypeColumnHeader,
      { hasText: 'Equipment Type' },
    );
    await equipmentTypeColumnHeader.waitFor({ state: 'visible' });
    return equipmentTypeColumnHeader;
  }

  // Verify Barcode Text column header is visible
  async verifyBarcodeTextColumnHeaderVisible() {
    const barcodeTextColumnHeader = this.page.locator(
      DashboardEquipmentTabLocators.barcodeTextColumnHeader,
      { hasText: 'Barcode Text' },
    );
    await barcodeTextColumnHeader.waitFor({ state: 'visible' });
    return barcodeTextColumnHeader;
  }

  // Verify Start Date column header is visible
  async verifyStartDateColumnHeaderVisible() {
    const startDateColumnHeader = this.page.locator(
      DashboardEquipmentTabLocators.startDateColumnHeader,
      { hasText: 'Start Date' },
    );
    await startDateColumnHeader.waitFor({ state: 'visible' });
    return startDateColumnHeader;
  }

  // Verify End Date column header is visible
  async verifyEndDateColumnHeaderVisible() {
    const endDateColumnHeader = this.page.locator(
      DashboardEquipmentTabLocators.endDateColumnHeader,
      { hasText: 'End Date' },
    );
    await endDateColumnHeader.waitFor({ state: 'visible' });
    return endDateColumnHeader;
  }

  // Verify Days on Job column header is visible
  async verifyDaysOnJobColumnHeaderVisible() {
    const daysOnJobColumnHeader = this.page.locator(
      DashboardEquipmentTabLocators.daysOnJobColumnHeader,
      { hasText: 'Days on Job' },
    );
    await daysOnJobColumnHeader.waitFor({ state: 'visible' });
    return daysOnJobColumnHeader;
  }
}

export default DashboardEquipmentTabPage;
