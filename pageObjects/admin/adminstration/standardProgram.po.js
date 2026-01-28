import { expect } from '@playwright/test';

const StandardProgramLocators = {
  administrationMenu:
    '#ctl00_RadMenu1 .rmRootGroup > li.rmItem > a.rmLink.rmRootLink > span.rmText.rmExpandDown',
  standardProgramOption: '#ctl00_RadMenu1 .rmSlide ul.rmGroup li.rmItem a.rmLink span.rmText',
  standardProgramsHeading:
    '#ctl00_ContentPlaceHolder1_StandardProgramControl_SPRow .Heading_blue_new',
  unpublishedExportToExcelButton:
    '#ctl00_ContentPlaceHolder1_StandardProgramControl_GridView_UnPublishedPrograms_ctl00_ctl02_ctl00_ExportToExcelButton',
  addNewProgramButton:
    '#ctl00_ContentPlaceHolder1_StandardProgramControl_GridView_UnPublishedPrograms_ctl00_TopPager a',
  addNewProgramModal:
    '#RadWindowWrapper_ctl00_ContentPlaceHolder1_StandardProgramControl_RadWindow_AddProgram',
  addNewProgramModalHeader: 'em[unselectable="on"]',
  addNewProgramModalIframe: 'iframe[name="RadWindow_AddProgram"]',
  programNameInput: 'input[name="TextBox_ProgramName"]',
  jobInProgressInput: 'input[name="RadNumericTextBox_JobInProgress"]',
  effectiveDateInput: 'input#RadDatePicker_EffectiveDate_dateInput',
  accountReceivableInput: 'input#RadNumericTextBox_AccountsReceivable',
  allowProgramRequirementCheckbox: 'input#ChangeProgramRequirementsAfterDispatchCheckBox',
  divisionLabels: '#CheckBoxList_Divisions label',
  categoryLabels: '#CheckBoxList_Category label',
  appliesToStateEditLink: '#RadGrid_States_ctl00_ctl06_Button_EditState',
  selectStateModal: '#RadWindowWrapper_RadWindow_SelectState',
  stateSourceList: '#RadWindow_SelectState_C_StatesControl_RadListBox_Source .rlbItem',
  allToRightButton: 'a.rlbButton.rlbTransferAllFrom',
  selectStateOkButton: 'input#RadWindow_SelectState_C_Button_OK',
  saveButton: 'input#Button_Save',
  unpublishedProgramNameSearchInput:
    '#ctl00_ContentPlaceHolder1_StandardProgramControl_GridView_UnPublishedPrograms_ctl00_ctl02_ctl03_FilterTextBox_ProgramName',
  unpublishedProgramNameFilterButton:
    '#ctl00_ContentPlaceHolder1_StandardProgramControl_GridView_UnPublishedPrograms_ctl00_ctl02_ctl03_Filter_ProgramName',
  unpublishedFilterDropdown:
    '#ctl00_ContentPlaceHolder1_StandardProgramControl_GridView_UnPublishedPrograms_rfltMenu_detached ul.rmActive.rmVertical.rmGroup.rmLevel1',
  unpublishedGridRows:
    '#ctl00_ContentPlaceHolder1_StandardProgramControl_GridView_UnPublishedPrograms_ctl00 > tbody > tr',
  publishProgramModal:
    '#RadWindowWrapper_ctl00_ContentPlaceHolder1_StandardProgramControl_RadWindow_PublishProgram',
  publishProgramModalHeader: 'em[unselectable="on"]',
  publishProgramModalIframe: 'iframe[name="RadWindow_PublishProgram"]',
  publishProgramCheckbox: 'input#CheckBox_PublishProgram',
  inviteesTab: '#RadTabStrip_PublishPrograms .rtsTxt',
  providerHeader: '#GridView_Providers_GridHeader th.rgHeader a',
  providerGrid: '#GridView_Providers_GridData',
  providerSearchInput: '#GridView_Providers_ctl00_ctl02_ctl01_FilterTextBox_FranchiseeName',
  providerFilterButton: '#GridView_Providers_ctl00_ctl02_ctl01_Filter_FranchiseeName',
  providerFilterDropdown: 'ul.rmActive.rmVertical.rmGroup.rmLevel1',
  publishButton: 'input#Button_PublishInvitee',
  publishedTab: '#ctl00_ContentPlaceHolder1_StandardProgramControl_RadTabStrip_Programs .rtsTxt',
  publishedGrid:
    '#ctl00_ContentPlaceHolder1_StandardProgramControl_GridView_PublishedPrograms_ctl00',
  publishedExportToExcelButton:
    '#ctl00_ContentPlaceHolder1_StandardProgramControl_GridView_PublishedPrograms_ctl00_ctl02_ctl00_ExportToExcelButton',
  publishedProgramNameSearchInput:
    '#ctl00_ContentPlaceHolder1_StandardProgramControl_GridView_PublishedPrograms_ctl00_ctl02_ctl03_FilterTextBox_ProgramName',
  publishedProgramNameFilterButton:
    '#ctl00_ContentPlaceHolder1_StandardProgramControl_GridView_PublishedPrograms_ctl00_ctl02_ctl03_Filter_ProgramName',
  publishedFilterDropdown:
    '#ctl00_ContentPlaceHolder1_StandardProgramControl_GridView_PublishedPrograms_rfltMenu_detached ul.rmActive.rmVertical.rmGroup.rmLevel1',
  publishedGridRows:
    '#ctl00_ContentPlaceHolder1_StandardProgramControl_GridView_PublishedPrograms_ctl00 > tbody > tr',
};

class StandardProgramPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToStandardPrograms() {
    await this.page.reload();
    await this.page.waitForLoadState('networkidle');

    const administrationMenu = this.page.locator(StandardProgramLocators.administrationMenu, {
      hasText: 'Administration',
    });
    await administrationMenu.hover();

    const standardProgramOption = this.page.locator(StandardProgramLocators.standardProgramOption, {
      hasText: 'Standard Programs',
    });
    await standardProgramOption.waitFor({ state: 'visible', timeout: 5000 });
    await standardProgramOption.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyStandardProgramsPage() {
    const heading = this.page.locator(StandardProgramLocators.standardProgramsHeading);
    await heading.waitFor({ state: 'visible', timeout: 5000 });

    const exportButton = this.page.locator(StandardProgramLocators.unpublishedExportToExcelButton);
    await expect(exportButton).toBeVisible({ timeout: 10000 });
  }

  async clickAddNewProgram() {
    const addNewProgramButton = this.page.locator(StandardProgramLocators.addNewProgramButton, {
      hasText: 'Add New Program',
    });
    await expect(addNewProgramButton).toBeVisible();
    await addNewProgramButton.click();
  }

  async verifyAddNewProgramModal() {
    const modal = this.page.locator(StandardProgramLocators.addNewProgramModal);
    await expect(modal).toBeVisible({ timeout: 10000 });

    const modalHeader = modal.locator(StandardProgramLocators.addNewProgramModalHeader, {
      hasText: 'Add New Program',
    });
    await expect(modalHeader).toBeVisible();
    await expect(modalHeader).toHaveText('Add New Program');

    const modalIframe = modal.frameLocator(StandardProgramLocators.addNewProgramModalIframe);
    await expect(modalIframe.locator('body')).toBeVisible({ timeout: 10000 });

    return modalIframe;
  }

  async fillProgramDetails(modalIframe, programName, jobInProgress, accountReceivable) {
    const programNameInput = modalIframe.locator(StandardProgramLocators.programNameInput);
    await expect(programNameInput).toBeVisible({ timeout: 10000 });
    await programNameInput.click();
    await programNameInput.fill(programName);

    const jobInProgressInput = modalIframe.locator(StandardProgramLocators.jobInProgressInput);
    await expect(jobInProgressInput).toBeVisible({ timeout: 10000 });
    await jobInProgressInput.click();
    await jobInProgressInput.fill(`${jobInProgress}`);

    const today = new Date();
    const formattedDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
    const effectiveDateInput = modalIframe.locator(StandardProgramLocators.effectiveDateInput);
    await expect(effectiveDateInput).toBeVisible({ timeout: 10000 });
    await effectiveDateInput.click();
    await effectiveDateInput.fill(formattedDate);

    const accountReceivableInput = modalIframe.locator(
      StandardProgramLocators.accountReceivableInput,
    );
    await expect(accountReceivableInput).toBeVisible({ timeout: 10000 });
    await accountReceivableInput.click();
    await accountReceivableInput.fill(`${accountReceivable}`);
  }

  async checkAllowProgramRequirement(modalIframe) {
    const checkbox = modalIframe.locator(StandardProgramLocators.allowProgramRequirementCheckbox);
    await expect(checkbox).toBeVisible({ timeout: 10000 });
    await checkbox.check();
  }

  async selectRandomDivision(modalIframe) {
    const divisionLabels = await modalIframe.locator(StandardProgramLocators.divisionLabels).all();
    const randomIndex = Math.floor(Math.random() * divisionLabels.length);
    await divisionLabels[randomIndex].click();
  }

  async selectWaterMitigation(modalIframe) {
    const waterMitigationCheckbox = modalIframe.locator('#CheckBoxList_Divisions_19');
    await expect(waterMitigationCheckbox).toBeVisible({ timeout: 10000 });
    await waterMitigationCheckbox.check();
  }

  async selectRandomCategory(modalIframe) {
    const categoryLabels = await modalIframe.locator(StandardProgramLocators.categoryLabels).all();
    const randomIndex = Math.floor(Math.random() * categoryLabels.length);
    await categoryLabels[randomIndex].click();
  }

  async selectResidentialCategory(modalIframe) {
    const residentialCheckbox = modalIframe.locator('#CheckBoxList_Category_3');
    await expect(residentialCheckbox).toBeVisible({ timeout: 10000 });
    await residentialCheckbox.check();
  }

  async selectAllStates(modalIframe) {
    const editLink = modalIframe.locator(StandardProgramLocators.appliesToStateEditLink);
    await expect(editLink).toBeVisible({ timeout: 10000 });
    await editLink.click();

    const selectStateModal = modalIframe.locator(StandardProgramLocators.selectStateModal);
    await expect(selectStateModal).toBeVisible({ timeout: 10000 });

    const stateSourceList = selectStateModal.locator(StandardProgramLocators.stateSourceList);
    await expect(stateSourceList.first()).toBeVisible({ timeout: 10000 });

    const allToRightButton = selectStateModal.locator(StandardProgramLocators.allToRightButton);
    await expect(allToRightButton).toBeVisible({ timeout: 10000 });
    await allToRightButton.click();

    const okButton = selectStateModal.locator(StandardProgramLocators.selectStateOkButton);
    await expect(okButton).toBeVisible({ timeout: 10000 });
    await okButton.click();

    await expect(selectStateModal).toBeHidden({ timeout: 10000 });
  }

  async saveProgram(modalIframe) {
    const saveButton = modalIframe.locator(StandardProgramLocators.saveButton);
    await expect(saveButton).toBeVisible({ timeout: 10000 });
    await saveButton.click();

    const modal = this.page.locator(StandardProgramLocators.addNewProgramModal);
    await expect(modal).toBeHidden({ timeout: 10000 });
  }

  async searchUnpublishedProgram(programName) {
    const searchInput = this.page.locator(
      StandardProgramLocators.unpublishedProgramNameSearchInput,
    );
    await expect(searchInput).toBeVisible({ timeout: 10000 });
    await searchInput.click();
    await searchInput.fill(programName);

    const filterButton = this.page.locator(
      StandardProgramLocators.unpublishedProgramNameFilterButton,
    );
    await expect(filterButton).toBeVisible({ timeout: 10000 });
    await filterButton.click();

    const dropdown = this.page.locator(StandardProgramLocators.unpublishedFilterDropdown);
    await expect(dropdown).toBeVisible({ timeout: 10000 });

    const containsOption = dropdown.locator('.rmText', { hasText: 'Contains' });
    await expect(containsOption).toBeVisible({ timeout: 10000 });
    await containsOption.click();

    await this.page.waitForLoadState('networkidle');
  }

  async verifyUnpublishedProgramExists() {
    const gridRows = this.page.locator(StandardProgramLocators.unpublishedGridRows);
    await expect(gridRows.first()).toBeVisible({ timeout: 10000 });
    await expect(gridRows).toHaveCount(1);
  }

  async clickPublishProgram() {
    const firstGridRow = this.page.locator(StandardProgramLocators.unpublishedGridRows).first();
    const publishLink = firstGridRow.locator('a[title="Publish Program"]');
    await expect(publishLink).toBeVisible({ timeout: 10000 });
    await publishLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyPublishProgramModal() {
    const modal = this.page.locator(StandardProgramLocators.publishProgramModal);
    await expect(modal).toBeVisible({ timeout: 60000 });

    const modalHeader = modal.locator(StandardProgramLocators.publishProgramModalHeader, {
      hasText: 'Publish Program',
    });
    await expect(modalHeader).toBeVisible();
    await expect(modalHeader).toHaveText('Publish Program');

    const modalIframe = modal.frameLocator(StandardProgramLocators.publishProgramModalIframe);
    await expect(modalIframe.locator('body')).toBeVisible({ timeout: 60000 });

    return modalIframe;
  }

  async checkPublishProgramCheckbox(modalIframe) {
    const checkbox = modalIframe.locator(StandardProgramLocators.publishProgramCheckbox);
    await expect(checkbox).toBeVisible({ timeout: 60000 });
    await checkbox.check();
  }

  async clickInviteesTab(modalIframe) {
    const inviteesTab = modalIframe.locator(StandardProgramLocators.inviteesTab, {
      hasText: 'Invitees',
    });
    await expect(inviteesTab).toBeVisible({ timeout: 10000 });
    await inviteesTab.click();

    const providerHeader = modalIframe
      .locator(StandardProgramLocators.providerHeader)
      .filter({ hasText: /^Provider$/ });
    await expect(providerHeader).toBeVisible({ timeout: 10000 });

    const providerGrid = modalIframe.locator(StandardProgramLocators.providerGrid);
    await expect(providerGrid).toBeVisible({ timeout: 10000 });
  }

  async searchProvider(modalIframe, providerName) {
    const searchInput = modalIframe.locator(StandardProgramLocators.providerSearchInput);
    await expect(searchInput).toBeVisible({ timeout: 5000 });
    await searchInput.click();
    await searchInput.fill(providerName);

    const filterButton = modalIframe.locator(StandardProgramLocators.providerFilterButton);
    await expect(filterButton).toBeVisible({ timeout: 10000 });
    await filterButton.click();

    const dropdown = modalIframe.locator(StandardProgramLocators.providerFilterDropdown);
    await expect(dropdown).toBeVisible({ timeout: 10000 });

    const containsOption = dropdown.locator('.rmText', { hasText: 'Contains' });
    await expect(containsOption).toBeVisible({ timeout: 10000 });
    await containsOption.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async selectFirstProvider(modalIframe) {
    const providerGrid = modalIframe.locator(StandardProgramLocators.providerGrid);
    await expect(providerGrid).toBeVisible({ timeout: 10000 });

    const firstCheckbox = providerGrid.locator('tbody > tr.rgRow input[type="checkbox"]').first();
    await expect(firstCheckbox).toBeVisible({ timeout: 10000 });
    await firstCheckbox.check();
  }

  async publishProgram(modalIframe) {
    const publishButton = modalIframe.locator(StandardProgramLocators.publishButton);
    await expect(publishButton).toBeVisible({ timeout: 10000 });

    this.page.once('dialog', async (dialog) => {
      await dialog.accept();
    });
    await publishButton.click();

    const modal = this.page.locator(StandardProgramLocators.publishProgramModal);
    await expect(modal).toBeHidden({ timeout: 10000 });
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToPublishedTab() {
    const publishedTab = this.page
      .locator(StandardProgramLocators.publishedTab)
      .filter({ hasText: /^Published$/ });
    await expect(publishedTab).toBeVisible({ timeout: 10000 });
    await publishedTab.click();

    const publishedGrid = this.page.locator(StandardProgramLocators.publishedGrid);
    await expect(publishedGrid).toBeVisible({ timeout: 10000 });
    await this.page.waitForLoadState('networkidle');
  }

  async verifyPublishedExportButton() {
    const exportButton = this.page.locator(StandardProgramLocators.publishedExportToExcelButton);
    await expect(exportButton).toBeVisible({ timeout: 10000 });
  }

  async searchPublishedProgram(programName) {
    const searchInput = this.page.locator(StandardProgramLocators.publishedProgramNameSearchInput);
    await expect(searchInput).toBeVisible({ timeout: 10000 });
    await searchInput.click();
    await searchInput.fill(programName);

    const filterButton = this.page.locator(
      StandardProgramLocators.publishedProgramNameFilterButton,
    );
    await expect(filterButton).toBeVisible({ timeout: 10000 });
    await filterButton.click();

    const dropdown = this.page.locator(StandardProgramLocators.publishedFilterDropdown);
    await expect(dropdown).toBeVisible({ timeout: 10000 });

    const containsOption = dropdown.locator('.rmText', { hasText: 'Contains' });
    await expect(containsOption).toBeVisible({ timeout: 10000 });
    await containsOption.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyPublishedProgramExists() {
    const gridRows = this.page.locator(StandardProgramLocators.publishedGridRows);
    await expect(gridRows.first()).toBeVisible({ timeout: 10000 });
    await expect(gridRows).toHaveCount(1);
  }
}

export default StandardProgramPage;
