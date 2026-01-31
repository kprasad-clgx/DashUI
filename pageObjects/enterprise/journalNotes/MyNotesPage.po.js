import { BasePage } from '../basePage/enterpriseBasePage.po.js';

export class MyNotesPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    // Main Containers
    this.grid = page.locator('#grid');
    this.gridContent = this.grid.locator('.k-grid-content');
    this.filterRow = page.locator('tr.k-filter-row');

    // Action Buttons
    this.buttons = {
      refresh: page.locator('#ctl00_ContentPlaceHolder1_MyNotesUserControl_btnRefresh'),
      exportExcel: page.locator(
        '#ctl00_ContentPlaceHolder1_MyNotesUserControl_imageButtonExportToExcell',
      ),
      exportPdf: page.locator(
        '#ctl00_ContentPlaceHolder1_MyNotesUserControl_ImageButtonExportToPdf',
      ),
      clearFilters: page.locator(
        '#ctl00_ContentPlaceHolder1_MyNotesUserControl_labelClearAllFilter',
      ),
      backToDashboard: page.locator('#ctl00_ContentPlaceHolder1_buttonBackToNotesDashboard'),
    };

    // Grid Headers (Mapped by logical name)
    this.headers = {
      jobNumber: page.locator('th[data-field="JobNumber"]'),
      customer: page.locator('th[data-field="Customer"]'),
      employee: page.locator('th[data-field="AddedBy"]'),
      relatedTask: page.locator('th[data-field="RelatedTask"]'),
      note: page.locator('th[data-field="Notes"]'),
      eventDate: page.locator('th[data-field="DateEnter"]'),
      visibility: page.locator('th[data-field="Visibility"]'),
    };
  }

  // Action: Wait for stability
  async waitForGridToLoad() {
    await this.grid.waitFor({ state: 'visible', timeout: 10000 });
    await this.page.waitForLoadState('networkidle');
    await this.waitForPageReady();
  }

  // Helper: Get row count (Action/Data retrieval)
  async getGridRowCount() {
    return await this.gridContent.locator('tbody tr').count();
  }

  // Helper: Return locator for a specific cell in the first row
  getFirstRowCell(fieldName) {
    return this.gridContent.locator('tbody tr').first().locator(`td[data-field="${fieldName}"]`);
  }
}
