import { BasePage } from '../basePage/enterpriseBasePage.po';

export class AccountsReceivableTrackingPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    // Page elements
    this.pageTitle = page.locator('#ctl00_ContentPlaceHolder1_Label_AccountsReceivableTracking');
    this.exportToExcelButton = page.locator(
      '#ctl00_ContentPlaceHolder1_AccountsReceivableTrackingGrid_ctl00_ctl02_ctl00_ExportToExcelButton',
    );
    // Grid
    this.accountsReceivableGrid = page.locator(
      '#ctl00_ContentPlaceHolder1_AccountsReceivableTrackingGrid',
    );
    // Grid headers
    this.requestIdHeader = page.locator('th:has-text("Request ID")');
    this.typeHeader = page.locator('th:has-text("Type")');
    this.statusHeader = page.locator('th:has-text("Status")').first();
    this.statusDateHeader = page.locator('th:has-text("Status Date")');
    this.completedByHeader = page.locator('th:has-text("Completed By")');
    this.amountHeader = page.locator('th:has-text("Amount")');
    this.termsHeader = page.locator('th:has-text("Terms")');
    this.jobNumberHeader = page.locator('th:has-text("Job Number")');
    this.customerHeader = page.locator('th:has-text("Customer")');
    this.billToHeader = page.locator('th:has-text("Bill To")');
    this.createdByHeader = page.locator('th:has-text("Created By")');
    this.createdDateHeader = page.locator('th:has-text("Created Date")');
    this.specialInstructionsHeader = page.locator('th:has-text("Special Instructions")');
    this.actionsHeader = page.locator('th:has-text("Actions")');
    // Grid rows
    this.gridRows = page.locator(
      '#ctl00_ContentPlaceHolder1_AccountsReceivableTrackingGrid_ctl00 tbody tr[class*="rgRow"]',
    );
    // Pagination
    this.paginationInfo = page.locator('.rgInfoPart');
    this.firstPageButton = page.locator('.rgPageFirst');
    this.previousPageButton = page.locator('.rgPagePrev');
    this.nextPageButton = page.locator('.rgPageNext');
    this.lastPageButton = page.locator('.rgPageLast');
    this.pageSizeDropdown = page.locator(
      '#ctl00_ContentPlaceHolder1_AccountsReceivableTrackingGrid_ctl00_ctl03_ctl01_PageSizeComboBox_Input',
    );
    // Notification
    this.dashNotificationBar = page.locator('.dashNotificationBarDesc');
    // Radio button filters
    this.showAllRadio = page.locator('#ctl00_ContentPlaceHolder1_RadioButtonList_Status_0');
    this.showRequestedRadio = page.locator('#ctl00_ContentPlaceHolder1_RadioButtonList_Status_1');
    this.showProcessedRadio = page.locator('#ctl00_ContentPlaceHolder1_RadioButtonList_Status_2');
    this.showRejectedRadio = page.locator('#ctl00_ContentPlaceHolder1_RadioButtonList_Status_3');
  }

  /**
   * Validates the grid headers by comparing actual header texts to expected.
   * Returns { expected, actual } for assertion in tests.
   */
  async validateGridHeaders() {
    const expected = [
      'Request ID',
      'Type',
      'Status',
      'Status Date',
      'Completed By',
      'Amount',
      'Terms',
      'Job Number',
      'Customer',
      'Bill To',
      'Created By',
      'Created Date',
      'Special Instructions',
      'Actions',
    ];
    // Wait for the grid to be visible
    await this.accountsReceivableGrid.waitFor({ state: 'visible', timeout: 10000 });
    // Query all visible th elements in the grid
    const headerLocators = this.accountsReceivableGrid.locator('thead tr th:visible');
    const count = await headerLocators.count();
    const actual = [];
    for (let i = 0; i < count; i++) {
      const text = ((await headerLocators.nth(i).textContent()) || '').trim();
      if (text) actual.push(text);
    }
    return { expected, actual };
  }

  async navigateToAccountsReceivableTracking() {
    await this.navigateTo('Dashboards', 'Accounts Receivable Tracking');
    await this.pageTitle.waitFor({ state: 'visible' });
  }

  async getPageTitle() {
    return await this.pageTitle.textContent();
  }

  async isPageTitleVisible() {
    return await this.pageTitle.isVisible();
  }

  // Filter methods
  async selectShowAll() {
    await this.showAllRadio.check();
    await this.page.waitForLoadState('networkidle');
  }

  async selectShowRequested() {
    await this.showRequestedRadio.check();
    await this.page.waitForLoadState('networkidle');
  }

  async selectShowProcessed() {
    await this.showProcessedRadio.check();
    await this.page.waitForLoadState('networkidle');
  }

  async selectShowRejected() {
    await this.showRejectedRadio.check();
    await this.page.waitForLoadState('networkidle');
  }

  async isShowAllSelected() {
    return await this.showAllRadio.isChecked();
  }

  async isShowRequestedVisible() {
    return await this.showRequestedRadio.isVisible();
  }

  // Grid validation methods
  async getGridData() {
    const rows = await this.gridRows.all();
    const data = [];

    for (const row of rows) {
      const cells = await row.locator('td').all();
      const rowData = {
        requestId: await cells[0].textContent(),
        type: await cells[1].textContent(),
        status: await cells[2].textContent(),
        statusDate: await cells[3].textContent(),
        completedBy: await cells[4].textContent(),
        amount: await cells[5].textContent(),
        terms: await cells[6].textContent(),
        jobNumber: await cells[7].textContent(),
        customer: await cells[8].textContent(),
        billTo: await cells[9].textContent(),
        createdBy: await cells[10].textContent(),
        createdDate: await cells[11].textContent(),
        specialInstructions: await cells[12].textContent(),
      };
      data.push(rowData);
    }

    return data;
  }

  async getGridRowCount() {
    return await this.gridRows.count();
  }

  async isGridVisible() {
    return await this.accountsReceivableGrid.isVisible();
  }

  // Header validation
  async areHeadersVisible() {
    return {
      requestId: await this.requestIdHeader.isVisible(),
      type: await this.typeHeader.isVisible(),
      status: await this.statusHeader.isVisible(),
      statusDate: await this.statusDateHeader.isVisible(),
      completedBy: await this.completedByHeader.isVisible(),
      amount: await this.amountHeader.isVisible(),
      terms: await this.termsHeader.isVisible(),
      jobNumber: await this.jobNumberHeader.isVisible(),
      customer: await this.customerHeader.isVisible(),
      billTo: await this.billToHeader.isVisible(),
      createdBy: await this.createdByHeader.isVisible(),
      createdDate: await this.createdDateHeader.isVisible(),
      specialInstructions: await this.specialInstructionsHeader.isVisible(),
      actions: await this.actionsHeader.isVisible(),
    };
  }

  // Actions on grid rows
  async clickProcessLink(rowIndex = 0) {
    const row = this.gridRows.nth(rowIndex);
    await row.locator('a:has-text("Process")').click();
  }

  async clickRejectLink(rowIndex = 0) {
    const row = this.gridRows.nth(rowIndex);
    await row.locator('a:has-text("Reject")').click();
  }

  async clickJobNumberLink(rowIndex = 0) {
    const row = this.gridRows.nth(rowIndex);
    await row.locator('td').nth(7).locator('a').click();
  }

  // Export functionality
  async clickExportToExcel() {
    await this.exportToExcelButton.click();
  }

  async waitForExportNotification() {
    await this.dashNotificationBar.waitFor({ state: 'visible', timeout: 30000 });
  }

  async getExportNotificationText() {
    return await this.dashNotificationBar.textContent();
  }

  async isExportNotificationVisible() {
    return await this.dashNotificationBar.isVisible();
  }

  // Pagination methods
  async getPaginationInfo() {
    return await this.paginationInfo.textContent();
  }

  async clickNextPage() {
    await this.nextPageButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickPreviousPage() {
    await this.previousPageButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickFirstPage() {
    await this.firstPageButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickLastPage() {
    await this.lastPageButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async changePageSize(size) {
    await this.pageSizeDropdown.click();
    await this.page.locator(`.rcbList li:has-text("${size}")`).click();
    await this.page.waitForLoadState('networkidle');
  }
}
