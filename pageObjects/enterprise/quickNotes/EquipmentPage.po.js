import { BasePage } from '../basePage/enterpriseBasePage.po.js';

export class EquipmentPage extends BasePage {
  constructor(page) {
    super(page);

    // --- PARENT PAGE LOCATORS ---
    this.quickNotesIcon = page.locator('#RAD_SLIDING_PANE_ICON_ctl00_ctl44_QuickMenuSlidingPane');
    this.quickNotesContentPane = page.locator(
      '#RAD_SLIDING_PANE_CONTENT_ctl00_ctl44_QuickMenuSlidingPane',
    );
    this.createEquipmentQuickLink = page
      .locator('div[id$="QuickMenudDiv"]')
      .getByRole('link', { name: 'Equipment', exact: true });

    // --- FORM INPUTS
    this.equipmentNameInput = '#ctl00_ContentPlaceHolder1_txtEquipmentName';
    this.equipmentIdInput = '#ctl00_ContentPlaceHolder1_txtEquipmentCodeId';
    this.barcodeInput = '#ctl00_ContentPlaceHolder1_txtBarCodeText';

    // Validation Spinner
    this.validationSpinner = page.locator('img[src*="spinner.gif"], span[id*="Availability"] img');

    // Dropdowns
    this.storageLocationArrow = '#ctl00_ContentPlaceHolder1_ddlStorageLocation_Arrow';
    this.currentLocationArrow = '#ctl00_ContentPlaceHolder1_ddlCurrentLocation_Arrow';
    this.statusArrow = '#ctl00_ContentPlaceHolder1_ddlStatus_Arrow';
    this.equipmentTypeArrow = '#ctl00_ContentPlaceHolder1_ddlEquipmentType_Arrow';
    this.secondaryTypeArrow = '#ctl00_ContentPlaceHolder1_ddlSecondryType_Arrow';

    // Optional Inputs
    this.modelIdInput = '#ctl00_ContentPlaceHolder1_ddlModelId';
    this.manufacturerIdInput = '#ctl00_ContentPlaceHolder1_ddlManufacturerId';
    this.purchaseAmountInput = '#ctl00_ContentPlaceHolder1_txtPurchaseAmount';
    this.serialNumberInput = '#ctl00_ContentPlaceHolder1_txtSerialNumber';
    this.licenseNumberInput = '#ctl00_ContentPlaceHolder1_txtLicenseNumber';
    this.pucNumberInput = '#ctl00_ContentPlaceHolder1_txtPUCNumber';
    this.purchaseDateInput = '#ctl00_ContentPlaceHolder1_txtPurchaseDate_dateInput';
    this.defaultDaysOnJobInput = '#ctl00_ContentPlaceHolder1_txtDaysOnJob';
    this.crateAssignmentInput = '#ctl00_ContentPlaceHolder1_txtCrateAssignment';

    // Financials
    this.hourlyCostInput = '#ctl00_ContentPlaceHolder1_txtHourlyCost';
    this.hourlyChargeInput = '#ctl00_ContentPlaceHolder1_txtHourlyCharge';
    this.dailyCostInput = '#ctl00_ContentPlaceHolder1_txtDailyCost';
    this.dailyChargeInput = '#ctl00_ContentPlaceHolder1_txtDailyCharge';
    this.weeklyCostInput = '#ctl00_ContentPlaceHolder1_txtWeeklyCost';
    this.weeklyChargeInput = '#ctl00_ContentPlaceHolder1_txtWeeklyCharge';
    this.monthlyCostInput = '#ctl00_ContentPlaceHolder1_txtMonthlyCost';
    this.monthlyChargeInput = '#ctl00_ContentPlaceHolder1_txtMonthlyCharge';
    this.mileageCostInput = '#ctl00_ContentPlaceHolder1_txtMileageCost';
    this.mileageChargeInput = '#ctl00_ContentPlaceHolder1_txtMileageCharge';
    this.monthlyLeaseDepreciationInput = '#ctl00_ContentPlaceHolder1_txtMonthlyDepriciation';

    // Text Areas
    this.descriptionTextarea = '#ctl00_ContentPlaceHolder1_txtDescription';
    this.noteTextarea = '#ctl00_ContentPlaceHolder1_txtNote';

    // --- ACTIONS ---
    this.saveButton = '#ctl00_ContentPlaceHolder1_Button1';
    this.backToEquipmentButton = page
      .locator('a, input, button')
      .filter({ hasText: 'Back to Equipment' });

    // --- GRID SEARCH ---
    this.equipmentNameSearchBox =
      '#ctl00_ContentPlaceHolder1_gvEquipment_ctl00_ctl02_ctl03_FilterTextBox_EquipmentName';
    this.searchFilterButton = page.locator(
      'input[id*="Filter_EquipmentName"], button[id*="Filter_EquipmentName"]',
    );
    this.filterMenuContext = page.locator('div[class*="RadMenu_Context"]');
    this.containsOption = this.filterMenuContext.locator('.rmItem .rmLink .rmText', {
      hasText: 'Contains',
    });
    this.gridId = '#ctl00_ContentPlaceHolder1_gvEquipment_ctl00';
  }

  // ================= NAVIGATION =================

  async openQuickNotesCreateEquipment() {
    await this.quickNotesIcon.click();
    // Wait for slide animation
    await this.quickNotesContentPane.waitFor({ state: 'visible', timeout: 5000 });
    await this.createEquipmentQuickLink.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.locator(this.equipmentNameInput).waitFor({ state: 'visible', timeout: 10000 });
  }

  // ================= FORM ACTIONS =================

  async selectDropdown(arrowLocator, valueText) {
    if (!valueText) return;
    const arrow = this.page.locator(arrowLocator);
    await arrow.click();
    // Wait for the dropdown list to become visible instead of using a fixed timeout
    const list = this.page.locator('.rcbSlide .rcbList').filter({ hasText: valueText }).first();
    try {
      await list.waitFor({ state: 'visible', timeout: 3000 });
    } catch {
      const dropdownHtml = await this.page.evaluate(() => {
        const el = document.querySelector('.rcbSlide .rcbList');
        return el ? el.outerHTML : 'Dropdown not found';
      });
      console.warn(
        `[selectDropdown] Dropdown for '${valueText}' not visible after first click. HTML:`,
        dropdownHtml,
      );
      // Retry click
      await arrow.click();
      await list.waitFor({ state: 'visible', timeout: 2000 });
    }
    const option = list.locator('li').filter({ hasText: valueText }).first();
    await option.scrollIntoViewIfNeeded();
    await option.click();
    await list.waitFor({ state: 'hidden', timeout: 3000 });
  }

  async createEquipment(data) {
    await this.page.locator(this.equipmentNameInput).fill(data.equipmentName);
    await this.page.locator(this.equipmentIdInput).fill(data.equipmentId);
    await this.page.locator(this.equipmentIdInput).press('Tab');
    await this.waitForValidation();

    await this.page.locator(this.barcodeInput).fill(data.barcode);
    await this.page.locator(this.barcodeInput).press('Tab');
    await this.waitForValidation();

    await this.selectDropdown(this.currentLocationArrow, data.currentLocation);
    await this.selectDropdown(this.statusArrow, data.status);
    await this.selectDropdown(this.equipmentTypeArrow, data.equipmentType);
    await this.selectDropdown(this.storageLocationArrow, data.storageLocation);

    if (data.secondaryType) {
      await this.selectDropdown(this.secondaryTypeArrow, data.secondaryType);
    } else {
      await this.page.locator(this.secondaryTypeArrow).click();
      const list = this.page.locator('.rcbSlide .rcbList').filter({ hasText: 'Select' }).first();
      await list.waitFor({ state: 'visible' });
      await list.locator('li').nth(1).click();
    }

    if (data.purchaseAmount)
      await this.page.locator(this.purchaseAmountInput).fill(data.purchaseAmount);
    if (data.modelId) {
      try {
        await this.page.locator(this.modelIdInput).waitFor({ state: 'visible', timeout: 5000 });
        await this.page.locator(this.modelIdInput).fill(data.modelId);
      } catch (e) {
        console.error('[EquipmentPage] modelIdInput not visible or not found:', e);
      }
    }
    if (data.manufacturerId)
      await this.page.locator(this.manufacturerIdInput).fill(data.manufacturerId);
    if (data.serialNumber) await this.page.locator(this.serialNumberInput).fill(data.serialNumber);
    if (data.licenseNumber)
      await this.page.locator(this.licenseNumberInput).fill(data.licenseNumber);
    if (data.pucNumber) await this.page.locator(this.pucNumberInput).fill(data.pucNumber);
    if (data.purchaseDate) await this.page.locator(this.purchaseDateInput).fill(data.purchaseDate);
    if (data.defaultDaysOnJob)
      await this.page.locator(this.defaultDaysOnJobInput).fill(data.defaultDaysOnJob);
    if (data.crateAssignment)
      await this.page.locator(this.crateAssignmentInput).fill(data.crateAssignment);

    if (data.monthlyLeaseDepreciation)
      await this.page
        .locator(this.monthlyLeaseDepreciationInput)
        .fill(data.monthlyLeaseDepreciation);
    if (data.hourlyCost) await this.page.locator(this.hourlyCostInput).fill(data.hourlyCost);
    if (data.hourlyCharge) await this.page.locator(this.hourlyChargeInput).fill(data.hourlyCharge);
    if (data.dailyCost) await this.page.locator(this.dailyCostInput).fill(data.dailyCost);
    if (data.dailyCharge) await this.page.locator(this.dailyChargeInput).fill(data.dailyCharge);
    if (data.weeklyCost) await this.page.locator(this.weeklyCostInput).fill(data.weeklyCost);
    if (data.weeklyCharge) await this.page.locator(this.weeklyChargeInput).fill(data.weeklyCharge);
    if (data.monthlyCost) await this.page.locator(this.monthlyCostInput).fill(data.monthlyCost);
    if (data.monthlyCharge)
      await this.page.locator(this.monthlyChargeInput).fill(data.monthlyCharge);
    if (data.mileageCost) await this.page.locator(this.mileageCostInput).fill(data.mileageCost);
    if (data.mileageCharge)
      await this.page.locator(this.mileageChargeInput).fill(data.mileageCharge);

    if (data.description) await this.page.locator(this.descriptionTextarea).fill(data.description);
    if (data.note) await this.page.locator(this.noteTextarea).fill(data.note);
  }

  // Helper to wait for "Is Available?" spinners to finish
  async waitForValidation() {
    try {
      // If spinner appears, wait for it to disappear
      await this.validationSpinner.waitFor({ state: 'visible', timeout: 1000 });
      await this.validationSpinner.waitFor({ state: 'hidden', timeout: 5000 });
    } catch {
      // Spinner might have been too fast to catch, which is fine.
    }
  }

  async clickSave() {
    await this.page.locator(this.saveButton).click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page
      .locator(this.equipmentNameSearchBox)
      .waitFor({ state: 'visible', timeout: 20000 });
  }

  // ================= GRID SEARCH & VERIFY =================

  async searchEquipment(equipmentName) {
    await this.page.locator(this.gridId).waitFor({ state: 'visible' });
    await this.page.locator(this.equipmentNameSearchBox).fill(equipmentName);
    await this.searchFilterButton.click();
    await this.filterMenuContext.waitFor({ state: 'visible' });
    await this.containsOption.click();
    await this.waitForAjax();
  }

  async verifyEquipmentExists(equipmentName) {
    const rows = this.page.locator(`${this.gridId} tbody tr`);
    await rows.first().waitFor({ state: 'visible', timeout: 5000 });
    const link = rows.locator(`a:has-text("${equipmentName}")`).first();
    return await link.isVisible();
  }

  async clickEquipment(equipmentName) {
    const link = this.page
      .locator(`${this.gridId} tbody tr a`)
      .filter({ hasText: equipmentName })
      .first();
    await link.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async verifyEquipmentEditPage() {
    await this.page.waitForURL(/eEditEquipment\.aspx/, { timeout: 10000 });
    return this.page.locator(this.equipmentNameInput);
  }
}
