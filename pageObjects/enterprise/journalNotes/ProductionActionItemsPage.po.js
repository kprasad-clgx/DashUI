import { BasePage } from '../basePage/enterpriseBasePage.po.js';

export class ProductionActionItemsPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    // 1. GRID CONTAINER
    this.grid = page.locator('.k-grid');
    this.gridContent = page.locator('.k-grid-content');
    this.gridRows = this.gridContent.locator('tbody tr');

    // 2. CONTROLS & DROPDOWNS

    // Employee Dropdown
    this.employeeDropdown = {
      input: page.locator('#ctl00_ContentPlaceHolder1_ProductionTaskControl_ddlEmployee_Input'),
      arrow: page.locator('#ctl00_ContentPlaceHolder1_ProductionTaskControl_ddlEmployee_Arrow'),
      list: page.locator('#ctl00_ContentPlaceHolder1_ProductionTaskControl_ddlEmployee_DropDown'),
      items: page.locator(
        '#ctl00_ContentPlaceHolder1_ProductionTaskControl_ddlEmployee_DropDown .rcbItem',
      ),
    };

    // Action Buttons
    this.refreshButton = page.locator('#btnRefresh');
    this.exportToExcelButton = page.locator(
      '#ctl00_ContentPlaceHolder1_ProductionTaskControl_btnExportToExcell',
    );
    this.clearAllFiltersButton = page.locator(
      'button.clear-button[onclick="return clearAllFilter()"]',
    );
    this.backToDashboardButton = page.locator('#ctl00_ContentPlaceHolder1_buttonBackToDashboard');

    // 3. HEADERS (Iteratable Object)
    this.headers = {
      jobNumber: page.locator('th[data-field="JobNumber"]'),
      customer: page.locator('th[data-field="Customer"]'),
      dateReceived: page.locator('th[data-field="DateReceived"]'),
      summary: page.locator('th[data-field="Summary"]'),
      task: page.locator('th[data-field="Task"]'),
      activity: page.locator('th[data-field="Activity"]'),
      productionType: page.locator('th[data-field="ProductionType"]'),
      service: page.locator('th[data-field="Service"]'),
    };

    // 4. FILTERS (Iteratable Object)
    this.filters = {
      jobNumber: page.locator('th[data-field="JobNumber"] span.k-filtercell input'),
      customer: page.locator('th[data-field="Customer"] span.k-filtercell input'),
      dateReceived: page.locator('th[data-field="DateReceived"] span.k-filtercell input'),
      summary: page.locator('th[data-field="Summary"] span.k-filtercell input'),
      task: page.locator('th[data-field="Task"] span.k-filtercell input'),
      activity: page.locator('th[data-field="Activity"] span.k-filtercell input'),
      productionType: page.locator('th[data-field="ProductionType"] span.k-filtercell input'),
      service: page.locator('th[data-field="Service"] span.k-filtercell input'),
    };
  }

  // ACTIONS
  async waitForGridToLoad() {
    await this.grid.waitFor({ state: 'visible', timeout: 15000 });
    await this.page.waitForLoadState('networkidle');
    await this.waitForPageReady();
  }

  async getGridRowCount() {
    return await this.gridRows.count();
  }

  /**
   * Selects an employee from the top dropdown
   * @param {string} employeeName - Exact text to match (e.g., "admin, admin")
   */
  async selectEmployee(employeeName) {
    await this.employeeDropdown.arrow.click();
    await this.employeeDropdown.list.waitFor({ state: 'visible' });

    const option = this.employeeDropdown.items.filter({ hasText: employeeName }).first();
    await option.scrollIntoViewIfNeeded();
    await option.click();

    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Returns locators for cells in a specific row.
   * Useful for validating data structure in the test.
   */
  getRowCells(index = 0) {
    const row = this.gridRows.nth(index);
    return {
      jobNumber: row.locator('td[data-field="JobNumber"]'),
      customer: row.locator('td[data-field="Customer"]'),
      dateReceived: row.locator('td[data-field="DateReceived"]'),
      summary: row.locator('td[data-field="Summary"]'),
      task: row.locator('td[data-field="Task"]'),
      activity: row.locator('td[data-field="Activity"]'),
      productionType: row.locator('td[data-field="ProductionType"]'),
      service: row.locator('td[data-field="Service"]'),
    };
  }
}
