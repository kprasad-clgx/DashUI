import { expect } from '@playwright/test';

export const EnterpriseJobCostingLocators = {
  // Job Costing Navigation
  jobCostingBtn: '#ctl00_ContentPlaceHolder1_JobCostingButton',
  backtoAccountingBtn: 'ctl00_ContentPlaceHolder1_BackToAccountingButton',
  allCategoryCostLocator: '#ctl00_ContentPlaceHolder1_AllCategoryCostsButton',

  // Job Costing Header
  jobCostingForJobNumberLocator: '#ctl00_ContentPlaceHolder1_lblUpperJobNumber',
  addNewRecordBtn: '#ctl00_ContentPlaceHolder1_gvJobCosting_ctl00_ctl02_ctl00_AddNewRecordButton',
  categoryAllCostTableLabelLocator: '#ctl00_ContentPlaceHolder1_lblJCT',
  backToJobCostingButton: '#ctl00_ContentPlaceHolder1_btnBacktoJobCosting',

  // Job Costing Form Fields
  addNewDateInput: '#ctl00_ContentPlaceHolder1_gvJobCosting_ctl00_ctl02_ctl04_Date_popupButton',
  billableCheckbox: '#ctl00_ContentPlaceHolder1_gvJobCosting_ctl00_ctl02_ctl04_chkBillable',
  expenseAccountInput: '#ctl00_ContentPlaceHolder1_gvJobCosting_ctl00_ctl02_ctl04_txtDescription',
  memoInput: '#ctl00_ContentPlaceHolder1_gvJobCosting_ctl00_ctl02_ctl04_txtMemo',
  paidToDropdown: '#ctl00_ContentPlaceHolder1_gvJobCosting_ctl00_ctl02_ctl04_ddlPaymentTo_Input',
  paidToLoadingIndicator:
    '#ctl00_ContentPlaceHolder1_gvJobCosting_ctl00_ctl02_ctl04_ddlPaymentTo_DropDown .loading-class',
  paidToDropdownList:
    '#ctl00_ContentPlaceHolder1_gvJobCosting_ctl00_ctl02_ctl04_ddlPaymentTo_DropDown ul.rcbList li',
  quantityInput: '#ctl00_ContentPlaceHolder1_gvJobCosting_ctl00_ctl02_ctl04_txtQuantity',
  unitOfMeasureInput: '#ctl00_ContentPlaceHolder1_gvJobCosting_ctl00_ctl02_ctl04_txtUOM',
  jobCostTypeDropdown:
    '#ctl00_ContentPlaceHolder1_gvJobCosting_ctl00_ctl02_ctl04_ddlJobCostType_Input',
  rateInput: '#ctl00_ContentPlaceHolder1_gvJobCosting_ctl00_ctl02_ctl04_txtRate',
  transactionTypeDropdown: '#ctl00_ContentPlaceHolder1_gvJobCosting_ctl00_ctl02_ctl04_ddlTxnType',
  extendedAmountInput: '#ctl00_ContentPlaceHolder1_gvJobCosting_ctl00_ctl02_ctl04_txtExtended',
  allCategoryCostSaveBtn: '#ctl00_ContentPlaceHolder1_gvJobCosting_ctl00_ctl02_ctl04_btnUpdate',

  // Cost Category Buttons
  consumableBtn: '#ctl00_ContentPlaceHolder1_ConsumablesButton',
  equipmentBtn: '#ctl00_ContentPlaceHolder1_EquipmentButton',
  extraCostBtn: '#ctl00_ContentPlaceHolder1_ExtraCostsButton',
  laborBtn: '#ctl00_ContentPlaceHolder1_LaborButton',
  materialsBtn: '#ctl00_ContentPlaceHolder1_MaterialsButton',
  othersBtn: '#ctl00_ContentPlaceHolder1_OthersButton',
  professionalFeeBtn: '#ctl00_ContentPlaceHolder1_ProfessionalButton',
  referralFeeBtn: '#ctl00_ContentPlaceHolder1_ReferralFeeButton',
  subTradBtn: '#ctl00_ContentPlaceHolder1_SubTradeButton',
  warrantyBtn: '#ctl00_ContentPlaceHolder1_WarrantyButton',
};

class EnterpriseJobCostingPage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Search for a job by job number - Job Costing specific implementation
   * @param {string} jobNumber - The job number to search for
   * @param {string} jobNumberWithName - The job number with name to select from dropdown (optional)
   */
  async searchJobByNumber(jobNumber, jobNumberWithName) {
    const clientLackingButton = '#ctl00_ctl45_ClientLackingButton';
    const jobNumberInput = '#ctl00_ctl45_ddlJobNumber_Input';
    const jobNumberDropdownList = '#ctl00_ctl45_ddlJobNumber_DropDown ul.rcbList li';
    const loadingIndicator = '#ctl00_ctl45_ddlJobNumber_DropDown .loading-class';
    const searchBoxBtn = '#ctl00_ctl45_btnMJobSearch';

    const searchBox = this.page.locator(clientLackingButton);
    await searchBox.waitFor({ state: 'visible', timeout: 30000 });
    await searchBox.click();
    await this.page.waitForLoadState('networkidle');

    const searchBoxInput = this.page.locator(jobNumberInput);
    await searchBoxInput.click();
    await searchBoxInput.fill(jobNumber);

    const loadingIndicatorElement = this.page.locator(loadingIndicator);
    if (await loadingIndicatorElement.isVisible({ timeout: 10000 }).catch(() => false)) {
      await loadingIndicatorElement.waitFor({
        state: 'hidden',
        timeout: 10000,
      });
    }

    const dropdownList = this.page.locator(jobNumberDropdownList);

    // Wait for the specific item containing the full text to appear
    const specificItem = dropdownList.filter({
      hasText: jobNumberWithName,
    });
    await specificItem.waitFor({ state: 'visible', timeout: 10000 });

    // Click the specific suggestion in the dropdown
    await specificItem.click();

    // Click the search button
    const searchBoxBtnElement = this.page.locator(searchBoxBtn);
    await searchBoxBtnElement.click();
    await this.page.waitForLoadState('networkidle');
  }

  // ==================== Navigation Methods ====================

  /**
   * Click Job Costing button
   */
  async clickJobCostingButton() {
    const jobCostingBtn = this.page.locator(EnterpriseJobCostingLocators.jobCostingBtn);
    await expect(jobCostingBtn).toBeVisible();
    await jobCostingBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Wait for Acct. Details image to be visible and click it
   */
  async waitAndClickAcctDetailsImg() {
    const acctDetailsImg = this.page.getByRole('img', {
      name: 'Acct. Details',
    });
    await acctDetailsImg.waitFor({ state: 'visible', timeout: 10000 });
    await acctDetailsImg.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Click All Category Cost button
   */
  async clickAllCategoryCostButton() {
    const allCategoryCostLocator = this.page.locator(
      EnterpriseJobCostingLocators.allCategoryCostLocator,
    );
    await expect(allCategoryCostLocator).toBeVisible();
    await allCategoryCostLocator.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Click Add New Record button
   */
  async clickAddNewRecordButton() {
    const addNewRecordBtn = this.page.locator(EnterpriseJobCostingLocators.addNewRecordBtn);
    await expect(addNewRecordBtn).toBeVisible();
    await addNewRecordBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  // ==================== Action Methods ====================

  /**
   * Check billable checkbox
   */
  async checkBillableCheckbox() {
    const billableCheckbox = this.page.locator(EnterpriseJobCostingLocators.billableCheckbox);
    await expect(billableCheckbox).toBeVisible();
    await billableCheckbox.check();
  }

  /**
   * Fill expense account
   * @param {string} expenseAccount - The expense account text
   */
  async fillExpenseAccount(expenseAccount) {
    const expenseAccountInput = this.page.locator(EnterpriseJobCostingLocators.expenseAccountInput);
    await expect(expenseAccountInput).toBeVisible();
    await expenseAccountInput.click();
    await expenseAccountInput.fill(expenseAccount);
  }

  /**
   * Fill memo
   * @param {string} memo - The memo text
   */
  async fillMemo(memo) {
    const memoInput = this.page.locator(EnterpriseJobCostingLocators.memoInput);
    await expect(memoInput).toBeVisible();
    await memoInput.click();
    await memoInput.fill(memo);
  }

  /**
   * Select Paid To from dropdown
   */
  async selectPaidToFirstOption() {
    const paidToDropdown = this.page.locator(EnterpriseJobCostingLocators.paidToDropdown);
    await expect(paidToDropdown).toBeVisible();
    await paidToDropdown.click();

    // Wait for loading indicator to disappear
    const paidToLoadingIndicator = this.page.locator(
      EnterpriseJobCostingLocators.paidToLoadingIndicator,
    );
    if (await paidToLoadingIndicator.isVisible({ timeout: 10000 }).catch(() => false)) {
      await paidToLoadingIndicator.waitFor({ state: 'hidden', timeout: 10000 });
    }

    // Wait for dropdown list and click first option
    const paidToDropdownList = this.page.locator(EnterpriseJobCostingLocators.paidToDropdownList);
    await paidToDropdownList.first().waitFor({ state: 'visible', timeout: 10000 });
    await paidToDropdownList.first().click();
  }

  /**
   * Fill quantity
   * @param {string} quantity - The quantity value
   */
  async fillQuantity(quantity) {
    const quantityInput = this.page.locator(EnterpriseJobCostingLocators.quantityInput);
    await quantityInput.click();
    await quantityInput.fill(quantity);
  }

  /**
   * Fill unit of measure
   * @param {string} unit - The unit of measure
   */
  async fillUnitOfMeasure(unit) {
    const unitOfMeasureInput = this.page.locator(EnterpriseJobCostingLocators.unitOfMeasureInput);
    await expect(unitOfMeasureInput).toBeVisible();
    await unitOfMeasureInput.click();
    await unitOfMeasureInput.fill(unit);
  }

  /**
   * Fill job cost type
   * @param {string} costType - The job cost type
   */
  async fillJobCostType(costType) {
    const jobCostTypeDropdown = this.page.locator(EnterpriseJobCostingLocators.jobCostTypeDropdown);
    await expect(jobCostTypeDropdown).toBeVisible();
    await jobCostTypeDropdown.click();
    await jobCostTypeDropdown.fill(costType);
  }

  /**
   * Fill rate
   * @param {string} rate - The rate value
   */
  async fillRate(rate) {
    const rateInput = this.page.locator(EnterpriseJobCostingLocators.rateInput);
    await expect(rateInput).toBeVisible();
    await rateInput.click();
    await rateInput.fill(rate);
  }

  /**
   * Select transaction type
   * @param {string} transactionType - The transaction type value
   */
  async selectTransactionType(transactionType) {
    const transactionTypeDropdown = this.page.locator(
      EnterpriseJobCostingLocators.transactionTypeDropdown,
    );
    await expect(transactionTypeDropdown).toBeVisible();
    await transactionTypeDropdown.click();
    await transactionTypeDropdown.selectOption({ value: transactionType });
  }

  /**
   * Click Save button
   */
  async clickSaveButton() {
    const allCategoryCostSaveBtn = this.page.locator(
      EnterpriseJobCostingLocators.allCategoryCostSaveBtn,
    );
    await expect(allCategoryCostSaveBtn).toBeVisible();
    await allCategoryCostSaveBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  // ==================== Assertion Methods ====================

  async assertJobNumberContains(expectedJobNumber) {
    const jobNumberLocator = this.page.locator('SELECTOR_FOR_JOB_NUMBER');
    await expect(jobNumberLocator).toContainText(expectedJobNumber);
  }

  /**
   * Assert back to accounting button is visible
   */
  async clickonBackToJobCostingButton() {
    const backtoAccountingBtn = this.page.locator(
      EnterpriseJobCostingLocators.backToJobCostingButton,
    );
    await backtoAccountingBtn.waitFor({ state: 'visible', timeout: 10000 });
    await expect(backtoAccountingBtn).click();
  }

  /**
   * Assert job number in job costing page contains expected value
   * @param {string} expectedJobNumber - The expected job number
   */
  async assertJobCostingJobNumberContains(expectedJobNumber) {
    const jobCostingForJobNumberLocator = this.page.locator(
      EnterpriseJobCostingLocators.jobCostingForJobNumberLocator,
    );
    const jobCostingForJobNumberText = await jobCostingForJobNumberLocator.textContent();
    expect(jobCostingForJobNumberText).toContain(expectedJobNumber);
  }

  /**
   * Assert category all cost table label
   */
  async assertCategoryAllCostTableLabel() {
    const categoryAllCostTableLabelLocator = this.page.locator(
      EnterpriseJobCostingLocators.categoryAllCostTableLabelLocator,
    );
    await expect(categoryAllCostTableLabelLocator).toBeVisible();
    await expect(categoryAllCostTableLabelLocator).toHaveText('Category: All Category Costs');
  }

  /**
   * Assert add new date input is visible
   */
  async assertAddNewDateInputVisible() {
    const addNewDateInput = this.page.locator(EnterpriseJobCostingLocators.addNewDateInput);
    await expect(addNewDateInput).toBeVisible();
  }

  /**
   * Assert extended amount input is visible
   */
  async assertExtendedAmountInputVisible() {
    const extendedAmountInput = this.page.locator(EnterpriseJobCostingLocators.extendedAmountInput);
    await expect(extendedAmountInput).toBeVisible();
  }

  /**
   * Assert all cost category buttons are visible
   */
  async assertAllCostCategoryButtonsVisible() {
    const categoryButtons = [
      {
        name: 'Consumable',
        locator: EnterpriseJobCostingLocators.consumableBtn,
      },
      { name: 'Equipment', locator: EnterpriseJobCostingLocators.equipmentBtn },
      {
        name: 'Extra Cost',
        locator: EnterpriseJobCostingLocators.extraCostBtn,
      },
      { name: 'Labor', locator: EnterpriseJobCostingLocators.laborBtn },
      { name: 'Materials', locator: EnterpriseJobCostingLocators.materialsBtn },
      { name: 'Others', locator: EnterpriseJobCostingLocators.othersBtn },
      {
        name: 'Professional fee',
        locator: EnterpriseJobCostingLocators.professionalFeeBtn,
      },
      {
        name: 'Referral fee',
        locator: EnterpriseJobCostingLocators.referralFeeBtn,
      },
      { name: 'SubTrad', locator: EnterpriseJobCostingLocators.subTradBtn },
      { name: 'Warranty', locator: EnterpriseJobCostingLocators.warrantyBtn },
    ];

    for (const button of categoryButtons) {
      const btn = this.page.locator(button.locator);
      await expect(btn).toBeVisible();
    }
  }
}

export default EnterpriseJobCostingPage;
