import path from 'path';
import fs from 'fs';
import { BasePage } from '../basePage/enterpriseBasePage.po.js';

export class AddEstimatesPage extends BasePage {
  constructor(page) {
    super(page);

    // --- PARENT PAGE LOCATORS ---
    this.addEstimateIcon = page.locator('#AccountingHeaderLinkPanel > div:nth-child(1) > a > img');
    this.closeModalButton = page.locator('.rwCloseButton');

    // --- IFRAME SETUP ---
    this.modalIframeName = 'iframe[name="RadWindow_Common"]';
    this.iframe = page.frameLocator(this.modalIframeName);

    // --- IFRAME LOCATORS ---
    this.originalEstimateRadio = this.iframe.locator('#OrignalEstimateRadio');

    // Dropdown Elements (Inside Iframe)
    this.typeArrow = this.iframe.locator('#OrignalEstimateDDL_Arrow');
    this.typeInput = this.iframe.locator('#OrignalEstimateDDL_Input');
    this.typeList = this.iframe.locator('#OrignalEstimateDDL_DropDown');

    this.amountInput = this.iframe.locator('#AmountTextBox');
    this.descriptionInput = this.iframe.locator('#DescriptionTextBox');

    // File Input (generic file input inside frame)
    this.fileInput = this.iframe.locator('input[type="file"]');

    this.submitButton = this.iframe.locator('#btnUploadEstimate');

    this.estimatesDataPath = path.resolve('testData', 'enterprise', 'estimates');
  }

  resolveFilePath(fileName) {
    const filePath = path.resolve(this.estimatesDataPath, fileName);
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath} - Check data/estimates/`);
    }
    return filePath;
  }

  async openAddEstimateModal() {
    // 1. Click Header Icon
    await this.page
      .locator('#AccountingHeaderLinkPanel')
      .waitFor({ state: 'visible', timeout: 10000 });
    await this.addEstimateIcon.click();

    // 2. Wait for Iframe to Load
    await this.page.locator(this.modalIframeName).waitFor({ state: 'visible', timeout: 15000 });

    // 3. Wait for content inside Iframe
    await this.originalEstimateRadio.waitFor({ state: 'visible', timeout: 10000 });
  }

  async selectEstimateType(preferredType = 'Main') {
    // 1. Open
    await this.typeArrow.click();
    await this.iframe.locator('.rcbList li').first().waitFor({ state: 'visible', timeout: 2000 });

    // 2. Find Option
    const preferredOption = this.iframe
      .locator('.rcbList li')
      .filter({ hasText: preferredType })
      .first();

    if (await preferredOption.isVisible()) {
      await preferredOption.click();
    } else {
      console.warn(`Estimate type '${preferredType}' not found. Defaulting to 'Supplement'.`);
      const fallbackOption = this.iframe
        .locator('.rcbList li')
        .filter({ hasText: 'Supplement' })
        .first();
      await fallbackOption.click();
    }

    // 3. Ensure dropdown is closed (only wait for the visible one to hide)
    const visibleDropdown = this.iframe.locator('.rcbList').filter({ has: this.typeInput });
    // Fallback: if filter is not supported, fallback to waiting for all to be hidden
    try {
      await visibleDropdown.waitFor({ state: 'hidden', timeout: 2000 });
    } catch {
      // fallback: wait for all dropdowns to be hidden
      await Promise.all([
        ...(await this.iframe.locator('.rcbList').all()).map((dropdown) =>
          dropdown.waitFor({ state: 'hidden', timeout: 2000 }),
        ),
      ]);
    }
  }

  async addEstimate({ type = 'Main', amount, description, fileName }) {
    await this.openAddEstimateModal();

    // 1. Select Radio
    await this.originalEstimateRadio.click();

    // 2. Select Type
    await this.selectEstimateType(type);

    // 3. Fill Text Fields
    await this.amountInput.fill(String(amount));
    await this.descriptionInput.fill(description);

    // 4. Upload File
    const filePath = this.resolveFilePath(fileName);
    await this.fileInput.setInputFiles(filePath);

    // 5. Submit & Wait
    await this.submitButton.click();

    // 6. Wait for modal to close, or close it if needed
    try {
      // Wait up to 5s for the modal to close automatically
      await this.page.locator(this.modalIframeName).waitFor({ state: 'hidden', timeout: 5000 });
    } catch {
      // If still open, try to close if the button is visible and stable
      if (await this.closeModalButton.isVisible()) {
        try {
          await this.closeModalButton.waitFor({ state: 'visible', timeout: 2000 });
          await this.closeModalButton.click();
          await this.page.locator(this.modalIframeName).waitFor({ state: 'hidden', timeout: 5000 });
        } catch {
          // If still not closable, log and continue
          console.warn('Modal did not close after submit and close button was not clickable.');
        }
      }
    }
  }
}
