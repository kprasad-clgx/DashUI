import { BasePage } from '../basePage/enterpriseBasePage.po.js';

export class NotesPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    this.grid = page.locator('#grid');
    this.gridContent = this.grid.locator('.k-grid-content');
    this.filterRow = page.locator('tr.k-filter-row');

    // Grouped Action Buttons
    this.buttons = {
      clearGlobalSearchButton: page.locator('button[onclick*="clearGlobalSearchFilter"]'),
      clearGridFiltersButton: page.locator('button[onclick*="clearAllFilter()"]'),
      exportExcel: page.locator(
        '#ctl00_ContentPlaceHolder1_AllNotesUserControl_imageButtonExportToExcell',
      ),
      backToDashboard: page.locator('#ctl00_ContentPlaceHolder1_buttonBackToNotesDashboard'),
    };

    // Grouped Headers
    this.headers = {
      jobNumber: page.locator('th[data-field="JobNumber"]'),
      customer: page.locator('th[data-field="Customer"]'),
      employee: page.locator('th[data-field="AddedBy"]'),
      note: page.locator('th[data-field="Notes"]'),
      eventDate: page.locator('th[data-field="DateEnter"]'),
      visibility: page.locator('th[data-field="Visibility"]'),
    };
  }

  async waitForGridToLoad() {
    await this.grid.waitFor({ state: 'visible', timeout: 10000 });
    await this.page.waitForLoadState('networkidle');
    await this.waitForPageReady();
  }

  async getGridRowCount() {
    return await this.gridContent.locator('tbody tr').count();
  }

  getFirstRowCell(fieldName) {
    return this.gridContent.locator('tbody tr').first().locator(`td[data-field="${fieldName}"]`);
  }
}
