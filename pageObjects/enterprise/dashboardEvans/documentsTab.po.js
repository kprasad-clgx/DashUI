/**
 * @typedef {Object} DashboardDocumentsTabLocatorsType
 * @property {string} tabDocuments
 * @property {string} createCategoryButton
 * @property {string} uploadDocumentButton
 * @property {string} manageJobDocumentsButton
 * @property {string} categoryNameLabel
 * @property {string} descriptionLabel
 * @property {string} isPublicLabel
 * @property {string} createButton
 * @property {string} cancelButton
 * @property {string} documentsCategoriesTableHeader
 * @property {string} accountingAlbumInDocumentCategories
 * @property {string} moistureMappingAlbumInDocumentCategories
 * @property {string} signedChangeOrdersAlbumInDocumentCategories
 * @property {string} uploadPopupCloseButton
 */

/** @type {DashboardDocumentsTabLocatorsType} */
const DashboardDocumentsTabLocators = {
  tabDocuments: '#ctl00_ContentPlaceHolder1_dockJobTabs_C_tabStripJobTabs .rtsTxt',
  createCategoryButton:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Documents_userControl_Button_CreateCategory',
  uploadDocumentButton:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Documents_userControl_Button_UploadDocuments',
  manageJobDocumentsButton:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Documents_userControl_ManageJobDocumentsButton',
  categoryNameLabel: '#Label5',
  descriptionLabel: '#Label1',
  isPublicLabel: '#lblIsPublic',
  createButton: '#btnSave_input',
  cancelButton: '#btnClose',
  documentsCategoriesTableHeader:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Documents_userControl_div_Category .white-segoe-13',
  accountingAlbumInDocumentCategories:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Documents_userControl_div_Category a',
  moistureMappingAlbumInDocumentCategories:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Documents_userControl_div_Category a',
  signedChangeOrdersAlbumInDocumentCategories:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Documents_userControl_div_Category a',
  uploadPopupCloseButton: '#photoUploadClose',
};

class DashboardDocumentsTabPage {
  constructor(page) {
    this.page = page;
  }

  // Navigate to Documents tab
  async navigateToDocumentsTab() {
    const tabDocuments = this.page.locator(DashboardDocumentsTabLocators.tabDocuments, {
      hasText: 'Documents',
    });
    await tabDocuments.waitFor({ state: 'visible', timeout: 5000 });
    await tabDocuments.click();
    await this.page.waitForTimeout(5000);
  }

  // Verify Document Categories Option Header is visible
  async verifyDocumentCategoriesOptionHeaderVisible(headerText) {
    // This regex matches headerText with any number in parentheses, e.g., Accounting(0), Accounting(5)
    const regex = new RegExp(`^${headerText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\(\\d+\\)$`);
    const documentCategoriesOptionHeader = this.page.locator('a.grey_text_l2_b', {
      hasText: regex,
    });
    await documentCategoriesOptionHeader.waitFor({ state: 'visible' });
    return documentCategoriesOptionHeader;
  }

  // Verify Create Category button is visible
  async verifyCreateCategoryButtonVisible() {
    const createCategoryButton = this.page.locator(
      DashboardDocumentsTabLocators.createCategoryButton,
    );
    await createCategoryButton.waitFor({ state: 'visible' });
    return createCategoryButton;
  }

  // Verify Upload Document button is visible
  async verifyUploadDocumentButtonVisible() {
    const uploadDocumentButton = this.page.locator(
      DashboardDocumentsTabLocators.uploadDocumentButton,
    );
    await uploadDocumentButton.waitFor({ state: 'visible' });
    return uploadDocumentButton;
  }

  // Verify Manage Job Documents button is visible
  async verifyManageJobDocumentsButtonVisible() {
    const manageJobDocumentsButton = this.page.locator(
      DashboardDocumentsTabLocators.manageJobDocumentsButton,
    );
    await manageJobDocumentsButton.waitFor({ state: 'visible' });
    return manageJobDocumentsButton;
  }

  // Click on Manage Job Documents button
  async clickManageJobDocumentsButton() {
    const manageJobDocumentsButton = this.page.locator(
      DashboardDocumentsTabLocators.manageJobDocumentsButton,
    );
    await manageJobDocumentsButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  // Verify on Manage Job Documents is redirected to Manage Job Documents page
  async verifyOnManageJobDocumentsPage() {
    return this.page.url().includes('JImageDocument');
  }

  // Click Create Category button
  async clickCreateCategoryButton() {
    const createCategoryButton = this.page.locator(
      DashboardDocumentsTabLocators.createCategoryButton,
    );
    await createCategoryButton.click();
    await this.page.waitForTimeout(3000);
  }

  // Verify Category Name label in popup is visible
  async verifyCategoryNameLabelVisible() {
    const popupFrame = this.page.frame({ name: 'RadWindow_Common' });
    const categoryNameLabel = popupFrame.locator(DashboardDocumentsTabLocators.categoryNameLabel);
    await categoryNameLabel.waitFor({ state: 'visible' });
    return categoryNameLabel;
  }

  // Verify Description label in popup is visible
  async verifyDescriptionLabelVisible() {
    const popupFrame = this.page.frame({ name: 'RadWindow_Common' });
    const descriptionLabel = popupFrame.locator(DashboardDocumentsTabLocators.descriptionLabel);
    await descriptionLabel.waitFor({ state: 'visible' });
    return descriptionLabel;
  }

  // Verify Is Public label in popup is visible
  async verifyIsPublicLabelVisible() {
    const popupFrame = this.page.frame({ name: 'RadWindow_Common' });
    const isPublicLabel = popupFrame.locator(DashboardDocumentsTabLocators.isPublicLabel);
    await isPublicLabel.waitFor({ state: 'visible' });
    return isPublicLabel;
  }

  // Verify Create button in popup is visible
  async verifyCreateButtonVisible() {
    const popupFrame = this.page.frame({ name: 'RadWindow_Common' });
    const createButton = popupFrame.locator(DashboardDocumentsTabLocators.createButton);
    await createButton.waitFor({ state: 'visible' });
    return createButton;
  }

  // Verify Cancel button in popup is visible
  async verifyCancelButtonVisible() {
    const popupFrame = this.page.frame({ name: 'RadWindow_Common' });
    const cancelButton = popupFrame.locator(DashboardDocumentsTabLocators.cancelButton);
    await cancelButton.waitFor({ state: 'visible' });
    return cancelButton;
  }

  // Click Cancel button in popup
  async clickCancelButton() {
    const popupFrame = this.page.frame({ name: 'RadWindow_Common' });
    const cancelButton = popupFrame.locator(DashboardDocumentsTabLocators.cancelButton);
    await cancelButton.click();
    await this.page.waitForTimeout(3000);
  }

  // Verify Documents Categories Table header is visible
  async verifyDocumentsCategoriesTableHeaderVisible() {
    const documentsCategoriesTableHeader = this.page.locator(
      DashboardDocumentsTabLocators.documentsCategoriesTableHeader,
    );
    await documentsCategoriesTableHeader.waitFor({ state: 'visible' });
    return documentsCategoriesTableHeader;
  }

  // Verify Accounting album in Document Categories is visible
  async verifyAccountingAlbumVisible() {
    const accountingAlbum = this.page.locator(
      DashboardDocumentsTabLocators.accountingAlbumInDocumentCategories,
      { hasText: /Accounting\(\d+\)/ },
    );
    await accountingAlbum.waitFor({ state: 'visible' });
    return accountingAlbum;
  }

  // Verify Moisture Mapping album in Document Categories is visible
  async verifyMoistureMappingAlbumVisible() {
    const moistureMappingAlbum = this.page.locator(
      DashboardDocumentsTabLocators.moistureMappingAlbumInDocumentCategories,
      { hasText: /Moisture_Mapping\(\d+\)/ },
    );
    await moistureMappingAlbum.waitFor({ state: 'visible' });
    return moistureMappingAlbum;
  }

  // Verify Signed Change Orders album in Document Categories is visible
  async verifySignedChangeOrdersAlbumVisible() {
    const signedChangeOrdersAlbum = this.page.locator(
      DashboardDocumentsTabLocators.signedChangeOrdersAlbumInDocumentCategories,
      { hasText: /Signed Change Orders\(\d+\)/ },
    );
    await signedChangeOrdersAlbum.waitFor({ state: 'visible' });
    return signedChangeOrdersAlbum;
  }

  // Click Upload Document button
  async clickUploadDocumentButton() {
    const uploadDocumentButton = this.page.locator(
      DashboardDocumentsTabLocators.uploadDocumentButton,
    );
    await uploadDocumentButton.click();
    await this.page.waitForTimeout(3000);
  }

  // Verify Upload popup close button is visible and click it
  async verifyUploadPopupCloseButtonVisible() {
    const uploadPopupCloseButton = this.page.locator(
      DashboardDocumentsTabLocators.uploadPopupCloseButton,
    );
    await uploadPopupCloseButton.waitFor({ state: 'visible' });
    return uploadPopupCloseButton;
  }

  // Click Upload popup close button
  async clickUploadPopupCloseButton() {
    const uploadPopupCloseButton = this.page.locator(
      DashboardDocumentsTabLocators.uploadPopupCloseButton,
    );
    await uploadPopupCloseButton.click();
  }
}

export default DashboardDocumentsTabPage;
