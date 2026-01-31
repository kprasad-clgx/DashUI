import EnterpriseHomePage from '../homePage/enterpriseHomePage.po.js';

export class ImportEstimatePage extends EnterpriseHomePage {
  constructor(page) {
    super(page);
    this.importEstimateIcon = page.locator(
      '#AccountingHeaderLinkPanel > div:nth-child(3) > a > img',
    );
    this.modalWrapper = page.locator(
      '#RadWindowWrapper_ctl00_ContentPlaceHolder1_RadWindow_Common',
    );
    this.modalIframeName = 'iframe[name="RadWindow_Common"]';
    this.closeModalButton = page.locator('.rwCloseButton');
  }

  get iframe() {
    return this.page.frameLocator(this.modalIframeName);
  }

  async openImportEstimateModal() {
    // Wait for the import icon to be visible before clicking
    await this.importEstimateIcon.waitFor({ state: 'visible', timeout: 10000 });
    await this.importEstimateIcon.click();

    // Wait for modal wrapper to be visible
    await this.modalWrapper.waitFor({ state: 'visible', timeout: 10000 });

    // Wait for iframe to be attached and visible
    await this.page.locator(this.modalIframeName).waitFor({ state: 'visible', timeout: 10000 });

    // Validate file input is visible inside the modal
    await this.iframe.locator('input[type="file"]').waitFor({ state: 'visible', timeout: 5000 });
  }

  async closeModal() {
    try {
      await this.closeModalButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.closeModalButton.click();
    } catch (error) {
      console.error('Failed to close modal:', error);
    }
  }

  async verifyImportEstimate() {
    await this.openImportEstimateModal();
    await this.closeModal();
  }
}
