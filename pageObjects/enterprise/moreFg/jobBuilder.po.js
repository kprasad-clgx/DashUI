import { expect } from '@playwright/test';

export class JobBuilderPage {
  constructor(page) {
    this.page = page;
    this.moreMenuHover = page.locator("span:has-text('More...')").first();
    this.jobBuilderMenuItem = page.getByText('Job File Builder', {
      exact: true,
    });
    this.jobTemplateBuilderHeading = page.locator('#ctl00_ContentPlaceHolder1_lblFBBuilder');
    this.gridHeaderLocator = page.locator(
      '#ctl00_ContentPlaceHolder1_TemplatesGridView_GridHeader a',
    );
    this.addNewJobTemplateButton = page.locator(
      '#ctl00_ContentPlaceHolder1_AddNewJobTemplateButton',
    );
    this.saveTemplateButton = page.locator('#ctl00_ContentPlaceHolder1_SaveTemplateButton');
    this.resetEditorButton = page.locator('#ctl00_ContentPlaceHolder1_ResetEditorButton');
    this.previewButton = page.locator('#ctl00_ContentPlaceHolder1_PreviewTemplateButton');
    this.renameFileButton = page.locator('#ctl00_ContentPlaceHolder1_RenameTemplateButton');
    this.deleteFileButton = page.locator('#ctl00_ContentPlaceHolder1_DeleteTemplateButton');
    this.clearSectionButton = page.locator('#ctl00_ContentPlaceHolder1_ClearSelectionButton');
    this.addNewEmailTemplateButton = page.locator(
      '#ctl00_ContentPlaceHolder1_AddNewEmailTemplateButton',
    );
    this.uploadToFranchiseesButton = page.locator(
      '#ctl00_ContentPlaceHolder1_UploadTemplateToFranchiseeButton',
    );
    this.exportEditorContentToPDFButton = page.locator(
      '#ctl00_ContentPlaceHolder1_ExportToPDFButton1',
    );
    this.jobTemplateBuilderTableLocator = page.locator('#ctl00_ContentPlaceHolder1_FBTree .rtIn');
  }

  async navigateToJobBuilder() {
    await this.moreMenuHover.hover();
    await this.jobBuilderMenuItem.waitFor({ state: 'visible', timeout: 5000 });
    await this.jobBuilderMenuItem.click();
    await this.page.waitForLoadState('networkidle');
  }

  async validateHeading() {
    await expect(this.jobTemplateBuilderHeading).toBeVisible();
  }

  async validateGridHeaders(gridHeaders) {
    for (const headerText of gridHeaders) {
      const headerLocator = this.gridHeaderLocator.filter({
        hasText: headerText,
      });
      await expect(headerLocator).toBeVisible();
    }
  }

  async validateAddNewJobTemplateButton() {
    await expect(this.addNewJobTemplateButton).toBeVisible();
  }

  async validateSaveAndResetButtons() {
    await expect(this.saveTemplateButton).toBeVisible();
    await expect(this.resetEditorButton).toBeVisible();
  }

  async validatePreviewButton() {
    await expect(this.previewButton).toBeVisible();
  }

  async validateRenameFileButton() {
    await expect(this.renameFileButton).toBeVisible();
  }

  async validateDeleteFileButton() {
    await expect(this.deleteFileButton).toBeVisible();
  }

  async validateClearSectionButton() {
    await expect(this.clearSectionButton).toBeVisible();
  }

  async validateAddNewEmailTemplateButton() {
    await expect(this.addNewEmailTemplateButton).toBeVisible();
  }

  async validateUploadToFranchiseesButton() {
    await expect(this.uploadToFranchiseesButton).toBeVisible();
  }

  async validateExportToPDFButton() {
    await expect(this.exportEditorContentToPDFButton).toBeVisible();
  }

  async validateTemplateBuilderTableOptions(jobTemplateBuilderTableOptions) {
    for (const optionText of jobTemplateBuilderTableOptions) {
      const optionLocator = this.jobTemplateBuilderTableLocator.getByText(optionText, {
        exact: true,
      });
      await expect(optionLocator).toBeVisible();
    }
  }
}
