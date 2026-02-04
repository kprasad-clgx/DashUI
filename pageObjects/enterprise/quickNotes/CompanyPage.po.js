import { BasePage } from '../basePage/enterpriseBasePage.po.js';
export class CompanyPage extends BasePage {
  constructor(page) {
    super(page);
    this.quickNotesIcon = page.locator('#RAD_SLIDING_PANE_ICON_ctl00_ctl44_QuickMenuSlidingPane');
    this.createCompanyQuickLink = page.locator('td').filter({ hasText: 'Company' }).first();
    this.contactManagerBtn = 'text="Contact Manager"';
    this.addNewCompanyBtn = '#ctl00_ContentPlaceHolder1_companyControl_buttonAddRecordCompany';
    this.companyTypeDropdown = '#ctl00_ContentPlaceHolder1_ddlCompanyType_Input';
    this.companyTypeList = '#ctl00_ContentPlaceHolder1_ddlCompanyType_DropDown .rcbList li';
    this.companyNameInput = '#ctl00_ContentPlaceHolder1_RadTxtCompanyName';
    this.companyMainPhone = '#ctl00_ContentPlaceHolder1_txtMainPhone';
    this.saveAndBackBtn = '#ctl00_ContentPlaceHolder1_btnSaveAndBack';
    this.companyNameFilter = 'input[data-role="autocomplete"][aria-label="Company Name"]';
    this.companyCells = 'tbody[role="rowgroup"] td[data-field="Company"]';
  }
  //Click on Contact Manager
  async clickContactManager() {
    await this.page.getByText('Contact Manager', { exact: true }).click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  // Click on Add New Company button
  async clickAddNewCompany() {
    await this.page.locator(this.addNewCompanyBtn).click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  // Select Company Type "Lead Company"
  async selectCompanyType(companyType) {
    await this.page.locator(this.companyTypeDropdown).click();
    await this.page
      .locator(this.companyTypeList)
      .first()
      .waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.companyTypeList).filter({ hasText: companyType }).first().click();
  }

  // Fill Company Name
  async fillCompanyName(companyName) {
    await this.page.locator(this.companyNameInput).fill(companyName);
  }

  // Verify Company Name is filled and return the value
  async getCompanyNameValue() {
    const input = this.page.locator(this.companyNameInput);
    await input.waitFor({ state: 'visible', timeout: 5000 });
    return await input.inputValue();
  }

  // Fill Company Main Phone
  async fillCompanyMainPhone(phone) {
    await this.page.locator(this.companyMainPhone).fill(phone);
  }

  // Verify Company Main Phone is filled and return the value
  async getCompanyMainPhoneValue() {
    const input = this.page.locator(this.companyMainPhone);
    await input.waitFor({ state: 'visible', timeout: 5000 });
    return await input.inputValue();
  }

  // Click Save and Back to Contact Manager
  async clickSaveAndBack() {
    await this.page.locator(this.saveAndBackBtn).click();
    await this.page.waitForLoadState('domcontentloaded');
  } // Filter by Company Name
  async filterByCompanyName(companyName) {
    const filter = this.page.locator(this.companyNameFilter).first();
    await filter.fill(companyName);
    await this.page.waitForTimeout(500);
    await filter.press('Enter');

    // Wait for grid to update with filtered results
    await this.page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
    await this.page.waitForTimeout(1000); // Additional wait for grid re-render
  }

  // Wait for company rows to be visible and return the count
  async waitForCompanyRowsAndGetCount() {
    const companyCells = this.page.locator(this.companyCells);
    await companyCells.first().waitFor({ state: 'visible', timeout: 5000 });
    return await companyCells.count();
  }

  // Get the company name text from the first row
  async getFirstCompanyName() {
    const companyLink = this.page.locator('[role="treegrid"] a[href*="AddCompany"]').first();

    // Wait for the company link to be visible
    await companyLink.waitFor({ state: 'visible', timeout: 10000 });

    // Get the text content from the company link
    const companyName = await companyLink.textContent();

    // Return the company name, trimmed
    return companyName ? companyName.trim() : '';
  }

  // Helper: Get company row count for logging
  async getCompanyRowCount() {
    const companyCells = this.page.locator(this.companyCells);
    return await companyCells.count();
  }
  async openQuickNotesCreateCompany() {
    await this.quickNotesIcon.click();
    await this.createCompanyQuickLink.click();
    await this.page.waitForLoadState('networkidle');
  }
}
