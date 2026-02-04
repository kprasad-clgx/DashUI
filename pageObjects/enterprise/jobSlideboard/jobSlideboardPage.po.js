import { BasePage } from '../basePage/enterpriseBasePage.po.js';
import { expect } from '@playwright/test';

export class JobSlideboardPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    // --- Accounting Header Links ---
    this.accountingHeaderPanel = page.locator('#AccountingHeaderLinkPanel');

    // Helper to find link by text
    const headerLink = (name) => this.accountingHeaderPanel.locator(`a`).filter({ hasText: name });

    this.addEstimateLink = headerLink('Add Estimate');
    this.uploadEstimateLink = headerLink('Upload Estimate');
    this.importEstimateLink = headerLink('Import Estimate');
    this.estimateTrackerLink = headerLink('Estimate Tracker');
    this.acctDetailsLink = headerLink('Acct. Details');
    this.woPoLink = headerLink('WO / PO');
    this.readyToInvoiceLink = headerLink('Ready To Invoice');

    // --- Accounting Information Panel ---
    this.accountingInformationPanel = page.locator('#AccountingInformationPanel');

    // --- Financial Data Locators (Using Strict Regex) ---
    this.totalEstimates = this.getAccountingValue('Total Estimates');
    this.invoicedSubtotal = this.getAccountingValue('Invoiced Subtotal');
    this.workOrderBudget = this.getAccountingValue('Work Order Budget');
    this.creditMemos = this.getAccountingValue('Credit Memos');
    this.estimatedGP = this.getAccountingValue(/^Estimated GP$/);
    this.estimatedGPPercentage = this.getAccountingValue(/^Estimated GP\(%\)$/);
    this.adjustedInvoiceSubtotal = this.getAccountingValue('Adj. Invoice Subtotal');
    this.invoicedTax = this.getAccountingValue('Invoiced Tax');
    this.workingGPPercentage = this.getAccountingValue('Working GP(%)');
    this.totalInvoiced = this.getAccountingValue('Total Invoiced');
    this.burdenTotal = this.getAccountingValue('Burden Total');
    this.paymentReceived = this.getAccountingValue('Payment Received');
    this.actualCost = this.getAccountingValue('Actual Cost');
    this.discount = this.getAccountingValue('Discount');
    this.totalJobCost = this.getAccountingValue('Total Job Cost');
    this.totalCollected = this.getAccountingValue('Total Collected');
    this.balanceOwing = this.getAccountingValue('Balance Owing');
    this.actualGP = this.getAccountingValue(/^Actual GP$/);
    this.actualGPPercentage = this.getAccountingValue(/^Actual GP\(%\)$/);
    this.lienRights = this.getAccountingValue(/^Lien Rights$/);
    this.lienRightsDays = this.getAccountingValue('Lien Rights Days');

    // --- Upload Estimate Dialog ---
    this.radWindowBase = page.locator('.RadWindow.rwNormalWindow');
    this.uploadEstimateWindow = page.locator('.RadWindow.rwNormalWindow').filter({
      has: page.locator('.rwTitlebar', { hasText: 'Upload Estimate' }),
    });
    // --- Cotality Data Modal & Roof Locators ---
    this.cotalityButton = page.getByText('Cotality Data', { exact: true });
    this.editCustomerLink = page.locator('#link_EditCustomer'); // Update selector as needed
    this.editDialog = page.locator('#RadWindowWrapper_ctl00_ContentPlaceHolder1_RadWindow_Common');

    this.dialogFrame = page.frameLocator('[name="RadWindow_Common"]');
    this.dialogSaveButton = this.dialogFrame.getByText('Save');
    this.cotalityIframe = page.frameLocator('iframe[name="RadWindow_Common"]');
    this.roofIcon = this.cotalityIframe.locator('img[alt="RoofCategory"]');
    this.roofMaterialField = this.cotalityIframe.locator('#RoofCategory').locator('div').nth(1);

    this.closeButton = this.page.locator('.RadWindow.rwNormalWindow:visible .rwCloseButton');
    this.uploadEstimateIframeElement = page.locator('iframe[name="RadWindow_Common"]');

    //---ASSIGN DIALOG & JOB INFO LOCATORS---

    this.assignDialogSelector = 'iframe[name="RadWindow_Common"]';
    this.frameLocator = page.frameLocator(this.assignDialogSelector);
    this.estimatorInput = this.frameLocator.locator('#comboBox_Estimator_Input');
    this.estimatorOption = (index = 3) =>
      this.frameLocator.locator(`#comboBox_Estimator_DropDown > div > ul > li:nth-child(${index})`);
    this.coordinatorInput = this.frameLocator.locator('#comboBox_Coordinator_Input');
    this.coordinatorOption = (index = 3) =>
      this.frameLocator.locator(
        `#comboBox_Coordinator_DropDown > div > ul > li:nth-child(${index})`,
      );
    this.saveButton = this.frameLocator.locator('#button_SaveAssignEstimator');
    this.jobNumberElement = page.locator(
      '#JobInfoPanel > tr > td:nth-child(2) > div:nth-child(1) > span:nth-child(1)',
    );
    this.editJobInformationButton = page.locator('#img_EditDivision');

    // EXTERNAL PARTICIPANTS LOCATORS

    this.externalParticipantButton = page
      .frameLocator('[name="RadWindow_Common"]')
      .getByText('External Participants', { exact: true });
    this.externalFirstParticipantInput = page
      .frameLocator('[name="RadWindow_Common"]')
      .locator('#ExternalParticipants_CustomCompanyParticipantCombobox_1214_Input');
    this.externalSecondParticipantInput = page
      .frameLocator('[name="RadWindow_Common"]')
      .locator('#ExternalParticipants_CustomIndividualParticipantCombobox_1209_Input');
    this.externalFirstParticipantDropdownOption = page
      .frameLocator('[name="RadWindow_Common"]')
      .locator('#ExternalParticipants_CustomCompanyParticipantCombobox_1214_DropDown ul.rcbList li')
      .first();
    this.externalSecondParticipantDropdownOption = page
      .frameLocator('[name="RadWindow_Common"]')
      .locator(
        '#ExternalParticipants_CustomIndividualParticipantCombobox_1209_DropDown ul.rcbList li',
      )
      .first();
    this.saveJobInformation = page
      .frameLocator('[name="RadWindow_Common"]')
      .locator('#button_Save_input');

    // ACTIONS PANEL LOCATORS

    this.actionsPanel = page.locator('#DivisionActionsPanel');
    this.dryTrackButton = this.actionsPanel.getByRole('button', {
      name: 'DryTrack',
      exact: true,
    });
    this.dryingChartButton = this.actionsPanel.getByRole('button', {
      name: 'Drying Chart',
    });
    this.dryTrackReportButton = this.actionsPanel.getByRole('button', {
      name: 'DryTrack Report',
    });
    this.equipServiceButton = this.actionsPanel.getByRole('button', {
      name: 'Equip & Service',
    });
    this.composeEmailButton = this.actionsPanel.getByRole('button', {
      name: 'Compose Email',
    });
    this.emailLinkForJobButton = this.actionsPanel.getByRole('button', {
      name: 'Email Link for Job',
    });
    this.closeJobButton = this.actionsPanel.getByRole('button', {
      name: 'Close Job',
    });
    this.deleteJobButton = this.actionsPanel.getByRole('button', {
      name: 'Delete Job',
    });

    // JOB TABS LOCATORS

    this.tabStrip = page.locator('#ctl00_ContentPlaceHolder1_dockJobTabs_C_tabStripJobTabs');
    this.datesTab = this.tabStrip.getByRole('link', {
      name: 'Dates',
      exact: true,
    });
    this.documentsTab = this.tabStrip.getByRole('link', {
      name: 'Documents',
      exact: true,
    });
    this.checklistTab = this.tabStrip.getByRole('link', {
      name: 'Checklist',
      exact: true,
    });
    this.estimatesTab = this.tabStrip.getByRole('link', {
      name: 'Estimates',
      exact: true,
    });
    this.invoicesTab = this.tabStrip.getByRole('link', {
      name: 'Invoices',
      exact: true,
    });
    this.jobTasksTab = this.tabStrip.getByRole('link', {
      name: 'Job Tasks',
      exact: true,
    });
    this.complianceTasksTab = this.tabStrip.getByRole('link', {
      name: 'Compliance Tasks',
      exact: true,
    });
    this.notesTab = this.tabStrip.getByRole('link', {
      name: 'Notes',
      exact: true,
    });
    this.accountingNotesTab = this.tabStrip.getByRole('link', {
      name: 'Accounting Notes',
      exact: true,
    });
    this.photosTab = page.getByRole('img', { name: 'Photos', exact: true });
    this.surveyTab = this.tabStrip.getByRole('link', {
      name: 'Survey',
      exact: true,
    });
    this.equipmentTab = this.tabStrip.getByRole('link', {
      name: 'Equipment',
      exact: true,
    });

    // Job Tasks Tab Specifics
    this.addNewTaskButton = page.locator(
      '#ctl00_ContentPlaceHolder1_dockJobTabs_C_JobTasks_userControl_gvActionItem_ctl00_ctl02_ctl00_AddNewButton',
    );
    this.actionFilterTextBox = page.locator(
      '#ctl00_ContentPlaceHolder1_dockJobTabs_C_JobTasks_userControl_gvActionItem_ctl00_ctl02_ctl03_FilterTextBox_Action',
    );
    this.taskDescriptionLink = page.locator(
      '#ctl00_ContentPlaceHolder1_dockJobTabs_C_JobTasks_userControl_gvActionItem_ctl00_ctl04_lnkAction',
    );
    this.startDateColumn = page.locator(
      '#ctl00_ContentPlaceHolder1_dockJobTabs_C_JobTasks_userControl_gvActionItem_ctl00__0 > td:nth-child(3)',
    );
    this.taskStatusFilterArrow = page.locator(
      '#ctl00_ContentPlaceHolder1_dockJobTabs_C_ComplianceTasks_userControl_ComplianceManagerGridView_ctl00_ctl02_ctl03_TaskStatusFilterRadComboBox_Arrow',
    );
    this.taskStatusFilterDropdown = page.locator(
      '#ctl00_ContentPlaceHolder1_dockJobTabs_C_ComplianceTasks_userControl_ComplianceManagerGridView_ctl00_ctl02_ctl03_TaskStatusFilterRadComboBox_DropDown',
    );
    this.exportToExcelButton = page.locator(
      '#ctl00_ContentPlaceHolder1_dockJobTabs_C_ComplianceTasks_userControl_ComplianceManagerGridView_ctl00_ctl02_ctl00_ExportToExcelButton',
    );
    this.statusOptionsRadioButtonList = page.locator(
      '#ctl00_ContentPlaceHolder1_dockJobTabs_C_ComplianceTasks_userControl_StatusOptionsRadioButtonList',
    );

    // Customer Information Panel
    this.yearBuiltValue = page
      .locator('#ctl00_ContentPlaceHolder1_dockCustomerInformation_C .innerDiv20pct')
      .filter({ hasText: 'Year Built' })
      .locator('xpath=following-sibling::div[1]');
    this.customerInfoPanel = page.locator('[id$="dockCustomerInformation_C"]');
    this.editCustomerInfoLink = page.locator('#link_CustomerEdit');
    this.editCustomerDialog = page.frameLocator('[name="RadWindow_Common"]');
    this.customerAddressInput = this.editCustomerDialog.locator('#textBox_CustomerAddress_Input');
    this.sameAddressCheckbox = this.editCustomerDialog.locator('#SameAddressCheckBox');
    this.yearBuiltInputDialog = this.editCustomerDialog.locator('#textBox_YearBuilt');
    this.customerName = page.locator(
      '#ctl00_ContentPlaceHolder1_dockCustomerInformation_C .innerDiv30pct.fontBold span',
    );

    // Dates Tab Specifics
    this.currentDateTimeDiv = page.locator(
      '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Dates_userControl_CurrentDateTimeDiv_1',
    );
    this.saveDatesButton = page.locator(
      '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Dates_userControl_button_UpdateDate',
    );
    this.deleteConfirmButton = page
      .frameLocator('[name="RadWindow_Common"]')
      .locator('#DeleteButton');

    // The content is inside an iframe named 'RadWindow_Common'
    this.frame = page.frameLocator('iframe[name="RadWindow_Common"]');

    // Define External Participants Label Locators (INSIDE the frame)
    this.sectionHeader = this.frame
      .locator('.DashTitle')
      .filter({ hasText: 'External Participants' });
    this.brokerLabel = this.frame
      .locator('span, div, td')
      .filter({ hasText: /^Broker\/Agent$/ })
      .first();
    this.brokerContactLabel = this.frame
      .locator('span, div, td')
      .filter({ hasText: /^Broker\/Agent Contact$/ })
      .first();
    this.insuranceCarrierLabel = this.frame
      .locator('span, div, td')
      .filter({ hasText: /^Insurance Carrier$/ })
      .first();
    this.primaryAdjusterLabel = this.frame
      .locator('span, div, td')
      .filter({ hasText: /^Primary Adjuster$/ })
      .first();
    this.primaryFieldAdjusterLabel = this.frame
      .locator('span, div, td')
      .filter({ hasText: /^Primary Field Adjuster$/ })
      .first();
    this.propertyManagementLabel = this.frame
      .locator('span, div, td')
      .filter({ hasText: /^Property Management$/ })
      .first();
    this.propertyMgmtContactLabel = this.frame
      .locator('span, div, td')
      .filter({ hasText: /^Property Management Contact$/ })
      .first();
    this.contractorCompanyLabel = this.frame
      .locator('span, div, td')
      .filter({ hasText: /^Contractor Company$/ })
      .first();
    this.contractorContactLabel = this.frame
      .locator('span, div, td')
      .filter({ hasText: /^Contractor Contact$/ })
      .first();
    this.independentFirmLabel = this.frame
      .locator('span, div, td')
      .filter({ hasText: /^Independent Adjusting Firm$/ })
      .first();
    this.independentAdjusterLabel = this.frame
      .locator('span, div, td')
      .filter({ hasText: /^Independent Adjuster Contact$/ })
      .first();
    this.publicFirmLabel = this.frame
      .locator('span, div, td')
      .filter({ hasText: /^Public Adjusting Firm$/ })
      .first();
    this.publicAdjusterLabel = this.frame
      .locator('span, div, td')
      .filter({ hasText: /^Public Adjuster Contact$/ })
      .first();
    this.primaryMortgageLabel = this.frame
      .locator('span, div, td')
      .filter({ hasText: /^Primary Mortgage/ })
      .first();
    this.secondaryMortgageLabel = this.frame
      .locator('span, div, td')
      .filter({ hasText: /^Secondary Mortgage$/ })
      .first();
    this.tpaCompanyLabel = this.frame
      .locator('span, div, td')
      .filter({ hasText: /^TPA Company$/ })
      .first();
    this.tpaLabel = this.frame.locator('span, div, td').filter({ hasText: /^TPA$/ }).first();
    this.billToCompanyLabel = this.frame
      .locator('span, div, td')
      .filter({ hasText: /^Bill To Company$/ })
      .first();
    this.billToContactLabel = this.frame
      .locator('span, div, td')
      .filter({ hasText: /^Bill To Contact$/ })
      .first();

    // Button to open the popup
    this.openLinksButton = page.locator(
      '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Photos_userControl_ctl00_LinksButton',
    );
    this.linksPopup = page.frameLocator('#LinksIframe').getByRole('button', { name: 'Link' });

    // --- Iframe Context ---
    this.linksFrame = page.frameLocator('#LinksIframe');

    // --- Dynamic Locators inside Iframe ---
    // 1. Provider Tabs (DocuSketch, Matterport, Hover)
    this.providerTab = (providerName) =>
      this.linksFrame.locator(`.rtsLink .rtsTxt:has-text("${providerName}")`).first();

    // 2. Common Action Buttons
    this.addLinkButton = this.linksFrame.getByRole('button', { name: 'Add Link' });
    this.saveLinkButton = this.linksFrame.getByRole('button', { name: 'Save' });
    this.cancelLinkButton = this.linksFrame.getByRole('button', { name: 'Cancel' });

    // 3. Input Fields
    this.linkTitleInput = this.linksFrame.locator('input[id*="Title"], input[name*="Title"]');
    this.linkUrlInput = this.linksFrame.locator('input[id*="Url"], input[name*="Url"]');

    //copy jobs
    this.copyJobButton = page.getByText('Copy Job', { exact: true });

    this.copyJobIframe = page.frameLocator('#MergeJobIframe');
    // --- Elements INSIDE the iframe ---
    this.jobNumberSearchBox = this.copyJobIframe.locator('div.k-multiselect-wrap.k-floatwrap');
    this.selectRow = this.copyJobIframe.getByRole('checkbox', { name: 'Select row' });
    this.nextButton = this.copyJobIframe.locator('#SendButton');
    this.copyAllCheckbox = this.copyJobIframe
      .locator('div')
      .filter({ hasText: 'Copy all available fields' })
      .locator('input[type="checkbox"]')
      .first();
    this.claimInformationTab = this.copyJobIframe
      .locator('.tab')
      .filter({ hasText: 'Claim Information' });
    this.copyJobNotesTab = this.copyJobIframe.locator('.tab').filter({ hasText: 'Notes' });
    this.copyAllNotesCheckbox = this.copyJobIframe.getByRole('checkbox', {
      name: 'Select all rows',
    });
    this.copyJobPhotosTab = this.copyJobIframe.locator('.tab').filter({ hasText: 'Photos' });
    this.copyAllPhotosCheckbox = this.copyJobIframe.locator(
      "//div[@class='column_External']//div[1]//input[1]",
    );
    this.copyJobDocumentsTab = this.copyJobIframe.locator('.tab').filter({ hasText: 'Documents' });
    this.copyAllDocumentsCheckbox = this.copyJobIframe
      .locator('label')
      .filter({ hasText: 'Copy All Completed Document in' });
    this.copyJobDatesTab = this.copyJobIframe.locator('.tab').filter({ hasText: 'Dates' });
    this.copyAllDatesCheckbox = this.page
      .frameLocator('#MergeJobIframe')
      .locator('#MergeAllJobDatesCheckbox');
    this.assignments = this.copyJobIframe.locator('.tab').filter({ hasText: 'Assignments' });
    this.copyJobFinalButton = this.page
      .frameLocator('#MergeJobIframe')
      .locator('#SendButton:visible');

    // Compliance Tasks Locators
    this.actionTitleSearchBox = page.locator(
      '#ctl00_ContentPlaceHolder1_dockJobTabs_C_ComplianceTasks_userControl_ComplianceManagerGridView_ctl00_ctl02_ctl03_FilterTextBox_Action',
    );
    this.resultElement = page.locator(
      '#ctl00_ContentPlaceHolder1_dockJobTabs_C_ComplianceTasks_userControl_ComplianceManagerGridView_ctl00__0 > td.enabledHyperlink',
    );
    this.taskDialog = page.locator('.rwContentRow');
    this.taskFrame = page.frameLocator('iframe[name="RadWindow_CommonWindow"]');

    // Notes Tab Locators
    this.relatedTaskFilter = page.locator(
      '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Notes_userControl_radGrid_Notes_ctl00_ctl02_ctl03_FilterTextBox_RelatedTask',
    );
    this.notesTable = page.locator(
      '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Notes_userControl_radGrid_Notes_ctl00',
    );
  }

  // --- Helper for Accounting Values ---
  getAccountingValue(labelText) {
    return this.accountingInformationPanel
      .locator('.innerDiv50pct')
      .filter({
        has: this.page.locator('.innerDiv20pct', { hasText: labelText }),
      })
      .locator('.innerDivRightAlign20pct');
  }

  // --- Accounting Data Retrieval (Verbose Execution) ---
  async getAccountingInformation() {
    await this.accountingInformationPanel.waitFor({ state: 'visible' });
    await this.totalEstimates.waitFor({ state: 'visible', timeout: 10000 });

    // Fetching values line by line (as per original style)
    const totalEstimates = await this.totalEstimates.innerText();
    const invoicedSubtotal = await this.invoicedSubtotal.innerText();
    const workOrderBudget = await this.workOrderBudget.innerText();
    const creditMemos = await this.creditMemos.innerText();
    const estimatedGP = await this.estimatedGP.innerText();
    const adjustedInvoiceSubtotal = await this.adjustedInvoiceSubtotal.innerText();
    const estimatedGPPercentage = await this.estimatedGPPercentage.innerText();
    const invoicedTax = await this.invoicedTax.innerText();
    const workingGPPercentage = await this.workingGPPercentage.innerText();
    const totalInvoiced = await this.totalInvoiced.innerText();
    const burdenTotal = await this.burdenTotal.innerText();
    const paymentReceived = await this.paymentReceived.innerText();
    const actualCost = await this.actualCost.innerText();
    const discount = await this.discount.innerText();
    const totalJobCost = await this.totalJobCost.innerText();
    const totalCollected = await this.totalCollected.innerText();
    const balanceOwing = await this.balanceOwing.innerText();
    const actualGP = await this.actualGP.innerText();
    const lienRights = await this.lienRights.innerText();
    const actualGPPercentage = await this.actualGPPercentage.innerText();
    const lienRightsDays = await this.lienRightsDays.innerText();

    return {
      totalEstimates: totalEstimates.trim(),
      invoicedSubtotal: invoicedSubtotal.trim(),
      workOrderBudget: workOrderBudget.trim(),
      creditMemos: creditMemos.trim(),
      estimatedGP: estimatedGP.trim(),
      adjustedInvoiceSubtotal: adjustedInvoiceSubtotal.trim(),
      estimatedGPPercentage: estimatedGPPercentage.trim(),
      invoicedTax: invoicedTax.trim(),
      workingGPPercentage: workingGPPercentage.trim(),
      totalInvoiced: totalInvoiced.trim(),
      burdenTotal: burdenTotal.trim(),
      paymentReceived: paymentReceived.trim(),
      actualCost: actualCost.trim(),
      discount: discount.trim(),
      totalJobCost: totalJobCost.trim(),
      totalCollected: totalCollected.trim(),
      balanceOwing: balanceOwing.trim(),
      actualGP: actualGP.trim(),
      lienRights: lienRights.trim(),
      actualGPPercentage: actualGPPercentage.trim(),
      lienRightsDays: lienRightsDays.trim(),
    };
  }

  async openAddEstimateDialog() {
    await this.addEstimateLink.waitFor({
      state: 'visible',
      timeout: 10000,
    });
    await this.addEstimateLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  // --- Upload Estimate Dialog---
  async openUploadEstimateDialog() {
    await this.accountingHeaderPanel.waitFor({
      state: 'visible',
      timeout: 10000,
    });
    await this.uploadEstimateLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async waitForUploadEstimateDialog() {
    await this.uploadEstimateWindow.waitFor({
      state: 'visible',
      timeout: 10000,
    });
    await this.uploadEstimateIframeElement.waitFor({
      state: 'attached',
      timeout: 10000,
    });
    return true;
  }

  async closeUploadEstimateDialog() {
    await this.closeButton.waitFor({ state: 'visible' });
    await this.closeButton.click();
    await this.uploadEstimateWindow.waitFor({ state: 'hidden' });
  }

  // --- Action Methods ---

  async reloadSlideboard() {
    await this.page.reload();
    await this.page.waitForLoadState('networkidle');
  }

  async save() {
    await this.saveButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  // --- Job Actions ---
  async getJobNumber() {
    await this.page.waitForLoadState('networkidle');
    await this.jobNumberElement.waitFor({ state: 'visible' });
    const jobNumber = await this.jobNumberElement.textContent();
    return jobNumber.trim();
  }

  async editJobInformation() {
    await this.editJobInformationButton.click();
    // Wait for the iframe to be attached and loaded
    await this.page
      .locator('iframe[name="RadWindow_Common"]')
      .waitFor({ state: 'attached', timeout: 15000 });
    const frame = this.page.frame({ name: 'RadWindow_Common' });
    if (frame) {
      await frame.waitForLoadState('domcontentloaded', { timeout: 10000 }).catch(() => {});
    }
    // Do NOT wait for the section header here; it is only visible after switching to the correct tab
  }

  async fillExternalParticipant() {
    await this.externalParticipantButton.click();
    await this.externalFirstParticipantInput.click();
    await this.externalFirstParticipantDropdownOption.click();
    await this.externalSecondParticipantInput.click();
    await this.externalSecondParticipantDropdownOption.click();
    await this.saveJobInformation.click();
  }

  // --- Tab Clicks (Verbose) ---

  async clickDatesTab() {
    await this.datesTab.waitFor({ state: 'visible' });
    await this.datesTab.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickDocumentsTab() {
    await this.documentsTab.waitFor({ state: 'visible' });
    await this.documentsTab.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickChecklistTab() {
    await this.checklistTab.waitFor({ state: 'visible' });
    await this.checklistTab.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickEstimatesTab() {
    await this.estimatesTab.waitFor({ state: 'visible' });
    await this.estimatesTab.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickInvoicesTab() {
    await this.invoicesTab.waitFor({ state: 'visible' });
    await this.invoicesTab.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickJobTasksTab() {
    await this.jobTasksTab.waitFor({ state: 'visible' });
    await this.jobTasksTab.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickAddNewTask() {
    await this.addNewTaskButton.waitFor({ state: 'visible' });
    await this.addNewTaskButton.click();
  }

  async filterTasksByAction(actionText) {
    await this.actionFilterTextBox.waitFor({ state: 'visible' });
    await this.actionFilterTextBox.fill(actionText);
    await this.actionFilterTextBox.press('Enter');
    await this.page.waitForTimeout(2000); // Wait for filter to apply
  }

  async getTaskDescriptionText() {
    await this.taskDescriptionLink.waitFor({ state: 'visible' });
    return await this.taskDescriptionLink.textContent();
  }

  async getStartDateText() {
    // The start date is in a td element with the date text
    const startDateElement = this.page
      .locator('td')
      .filter({ hasText: /\d{1,2}\/\d{1,2}\/\d{4}/ })
      .first();
    await startDateElement.waitFor({ state: 'visible', timeout: 10000 });
    return await startDateElement.textContent();
  }

  async clickComplianceTasksTab() {
    await this.complianceTasksTab.waitFor({ state: 'visible' });
    await this.complianceTasksTab.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async searchAndCompleteComplianceTask(actionTitle) {
    await this.actionTitleSearchBox.waitFor({ state: 'attached', timeout: 15000 });
    await this.actionTitleSearchBox.scrollIntoViewIfNeeded();

    await this.actionTitleSearchBox.fill(actionTitle);
    await this.actionTitleSearchBox.click();
    await this.page.keyboard.press('Enter');

    await this.resultElement.waitFor({ state: 'visible', timeout: 15000 });
    await expect(this.resultElement).toHaveText(actionTitle);

    await this.resultElement.click();

    await this.taskDialog.waitFor({ state: 'visible', timeout: 10000 });

    await this.taskFrame.locator('input[type="checkbox"]').first().check();
    await this.taskFrame.locator('#Button_Complete').click();
    await this.taskDialog.waitFor({ state: 'hidden', timeout: 10000 });
  }

  async verifyUniqueNoteCount(uniqueActionItem) {
    await this.notesTab.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle');
    await this.relatedTaskFilter.waitFor({ state: 'attached', timeout: 15000 });
    await this.relatedTaskFilter.scrollIntoViewIfNeeded();
    await this.relatedTaskFilter.fill(uniqueActionItem);
    await this.relatedTaskFilter.press('Enter');
    await this.notesTable.waitFor({ state: 'visible', timeout: 10000 });

    const matchingRows = this.notesTable.locator('tbody tr').filter({ hasText: uniqueActionItem });
    const count = await matchingRows.count();
    expect(count).toBe(1);
  }

  async openTaskStatusFilter() {
    try {
      await this.taskStatusFilterArrow.waitFor({ state: 'visible', timeout: 5000 });
      await this.taskStatusFilterArrow.click();
      // Optionally, wait for dropdown to appear (if needed)
      if (this.taskStatusFilterDropdown) {
        await this.taskStatusFilterDropdown.waitFor({ state: 'visible', timeout: 5000 });
      }
    } catch (err) {
      console.error('[JobSlideboardPage] Error in openTaskStatusFilter:', err);
      throw err;
    }
  }

  async selectTaskStatusFilter(optionText) {
    for (let i = 0; i < 3; i++) {
      const option = this.taskStatusFilterDropdown.getByText(optionText, { exact: true });
      try {
        await this.page.waitForTimeout(300);
        await option.waitFor({ state: 'visible', timeout: 3000 });
        await option.click();
        return;
      } catch (e) {
        // If not visible/stable, try re-opening the dropdown and retry
        await this.openTaskStatusFilter();
        await this.page.waitForTimeout(300);
        if (i === 2) {
          console.error(`[JobSlideboardPage] All attempts failed to select '${optionText}'.`);
          throw e;
        }
      }
    }
  }

  async clickExportToExcel() {
    await this.exportToExcelButton.waitFor({ state: 'visible' });
    await this.exportToExcelButton.click();
  }

  async selectStatusOption(optionIndex) {
    const radioButton = this.page.locator(
      `#ctl00_ContentPlaceHolder1_dockJobTabs_C_ComplianceTasks_userControl_StatusOptionsRadioButtonList_${optionIndex}`,
    );
    await radioButton.waitFor({ state: 'visible' });
    await radioButton.click();
  }

  async clickNotesTab() {
    await this.notesTab.waitFor({ state: 'visible' });
    await this.notesTab.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickAccountingNotesTab() {
    await this.accountingNotesTab.waitFor({ state: 'visible' });
    await this.accountingNotesTab.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickPhotosTab() {
    await this.photosTab.waitFor({ state: 'visible' });
    await this.photosTab.scrollIntoViewIfNeeded();
    await this.photosTab.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickSurveyTab() {
    await this.surveyTab.waitFor({ state: 'visible' });
    await this.surveyTab.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickEquipmentTab() {
    await this.equipmentTab.waitFor({ state: 'visible' });
    await this.equipmentTab.click();
    await this.page.waitForLoadState('domcontentloaded');
  }
  // --- Action Buttons (Verbose) ---

  async verifyDryTrack() {
    await this.dryTrackButton.waitFor({ state: 'visible' });
    await this.dryTrackButton.click();
    await this.page.frameLocator('[name="RadWindow_Common"]').locator('#CloseButton').click();
  }

  async verifyDryingChart() {
    await this.dryingChartButton.waitFor({ state: 'visible' });
    // Listen for the new page event
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.dryingChartButton.click(),
    ]);
    await newPage.waitForLoadState('domcontentloaded');

    // Selectors for the two report links
    const atmosphericReportChartLink = newPage.locator(
      '#ctl00_ContentPlaceHolder1_AtmosphericReportChartLink',
    );
    const moistureReadingReportChartLink = newPage.locator(
      '#ctl00_ContentPlaceHolder1_MoistureReadingReportChartLink',
    );

    // Verify both links are visible and enabled
    await atmosphericReportChartLink.waitFor({ state: 'visible', timeout: 5000 });
    await moistureReadingReportChartLink.waitFor({ state: 'visible', timeout: 5000 });
    if (!(await atmosphericReportChartLink.isEnabled())) {
      throw new Error('Atmospheric Report Chart link is not enabled');
    }
    if (!(await moistureReadingReportChartLink.isEnabled())) {
      throw new Error('Moisture Reading Report Chart link is not enabled');
    }

    // Close the new page
    await newPage.close();
  }

  async verifyDryTrackReport() {
    await this.dryTrackReportButton.waitFor({ state: 'visible' });
    // Listen for the new page event
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.dryTrackReportButton.click(),
    ]);
    await newPage.waitForLoadState('domcontentloaded');

    // Assert the report page loaded by checking for a unique element
    const reportHeaderLogo = newPage.locator('#ctl02_PageHeaderLogo');
    await reportHeaderLogo.waitFor({ state: 'visible', timeout: 5000 });

    // Check for a generic report title: bold, underlined, centered, in a span (matches Water Mitigation, Art Restoration, etc.)
    const reportTitle = newPage.locator('span b u');
    await reportTitle.waitFor({ state: 'visible', timeout: 5000 });

    // Optionally, ensure the title is not empty
    const titleText = await reportTitle.textContent();
    if (!titleText || !titleText.trim()) {
      throw new Error('Report title is missing or empty');
    }

    // Close the new page
    await newPage.close();
  }

  async verifyEquipAndService() {
    await this.equipServiceButton.waitFor({ state: 'visible' });
    // Listen for the new page event
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.equipServiceButton.click(),
    ]);
    try {
      await newPage.waitForLoadState('domcontentloaded');
    } catch (e) {
      // If the page is closed or fails to load, close and rethrow for diagnostics
      if (!newPage.isClosed()) {
        await newPage.close();
      }
      throw new Error('Equipment And Services Report page did not load: ' + e.message);
    }

    // Assert the Equipment And Services Report title is present (centered, large font)
    const reportTitle = newPage.locator('span b', { hasText: 'Equipment And Services Report' });
    await reportTitle.waitFor({ state: 'visible', timeout: 5000 });

    // Assert the Export To PDF button is present
    const exportToPdfButton = newPage.locator('#ctl02_ExportToPdfSplitButton_input');
    await exportToPdfButton.waitFor({ state: 'visible', timeout: 5000 });

    // Assert the Export To Excel button is present
    const exportToExcelButton = newPage.locator('#ctl02_ExportToExcelButton_input');
    await exportToExcelButton.waitFor({ state: 'visible', timeout: 5000 });

    // Assert the Back To Slideboard button is present
    const backToSlideboardButton = newPage.locator('#ctl02_BackToSlideBoardButton_input');
    await backToSlideboardButton.waitFor({ state: 'visible', timeout: 5000 });

    // Optionally, check for Policyholder Information section
    const policyholderInfo = newPage.locator('span', { hasText: 'Policyholder Information' });
    await policyholderInfo.waitFor({ state: 'visible', timeout: 5000 });

    // Optionally, check for Insurance Information section
    const insuranceInfo = newPage.locator('span', { hasText: 'Insurance Information' });
    await insuranceInfo.waitFor({ state: 'visible', timeout: 5000 });

    // Optionally, check for Job Dates section
    const jobDates = newPage.locator('span', { hasText: 'Job Dates' });
    await jobDates.waitFor({ state: 'visible', timeout: 5000 });

    // Close the new page
    await newPage.close();
  }

  /**
   * Verifies the Compose Email page that opens in a new tab.
   * Checks for key fields and buttons, then closes the tab.
   */
  async verifyComposeEmail() {
    // Wait for the new window/tab to open
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.composeEmailButton.click(),
    ]);

    // New windows take longer to initialize than tabs
    await newPage.waitForLoadState('load');
    await newPage.waitForLoadState('domcontentloaded');
    await newPage.waitForLoadState('networkidle');
    await newPage.waitForTimeout(5000);

    // Verify page loaded
    const pageTitle = await newPage.title();
    if (!pageTitle) {
      throw new Error('Compose Email page did not load - no title');
    }

    // Close the new window/tab
    if (!newPage.isClosed()) {
      await newPage.close();
    }
  }

  async verifyEmailLinkForJob() {
    await this.emailLinkForJobButton.waitFor({ state: 'visible' });
    // Listen for the new window/tab event
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.emailLinkForJobButton.click(),
    ]);

    // New windows take longer to initialize than tabs
    await newPage.waitForLoadState('load');
    await newPage.waitForLoadState('domcontentloaded');
    await newPage.waitForLoadState('networkidle');
    await newPage.waitForTimeout(5000);

    // Verify page loaded
    const pageTitle = await newPage.title();
    if (!pageTitle) {
      throw new Error('Email Link page did not load - no title');
    }

    // Close the new window/tab
    await newPage.close();
  }

  async verifyCloseJob() {
    await this.closeJobButton.waitFor({ state: 'visible' });
    await this.closeJobButton.click();

    // Assert the confirmation dialog (RadWindow) appears
    await this.page
      .locator('iframe[name="RadWindow_Common"]')
      .waitFor({ state: 'attached', timeout: 5000 });

    // Assert the titlebar contains 'Confirmation'
    const confirmationTitle = this.page.locator('.rwTitlebar em', { hasText: 'Confirmation' });
    await confirmationTitle.waitFor({ state: 'visible', timeout: 5000 });

    // Check if the close button is present
    const closeButton = this.page.locator('.rwCloseButton[title="Close"]');
    const isCloseButtonVisible = await closeButton.isVisible().catch(() => false);

    if (isCloseButtonVisible) {
      // Close button exists, job can be closed
      await closeButton.waitFor({ state: 'visible', timeout: 5000 });
    } else {
      // Close button not found, check for incomplete compliance tasks error message
      const errorMessage = this.page.locator('span#MessageLabel', {
        hasText: /incomplete compliance tasks.*close job/i,
      });
      await errorMessage.waitFor({ state: 'visible', timeout: 5000 });

      // Click the Cancel button
      const cancelButton = this.page.locator('input#CancelButton');
      await cancelButton.waitFor({ state: 'visible', timeout: 5000 });
      await cancelButton.click();
    }
  }

  async getYearBuiltValue() {
    // Wait for either the customer info panel or the year built value to be visible
    let found = false;
    for (let i = 0; i < 40; i++) {
      // up to 20s
      if ((await this.customerInfoPanel.isVisible()) && (await this.yearBuiltValue.isVisible())) {
        await this.yearBuiltValue.scrollIntoViewIfNeeded();
        return await this.yearBuiltValue.textContent();
      }
      await this.page.waitForTimeout(500);
    }
    throw new Error('Year Built value or customer info panel did not become visible in time');
  }

  async clickEditCustomerInfo() {
    await this.editCustomerInfoLink.waitFor({ state: 'visible' });
    await this.editCustomerInfoLink.click();
  }

  async fillCustomerAddress(address) {
    await this.customerAddressInput.waitFor({ state: 'visible' });
    await this.customerAddressInput.clear();
    await this.customerAddressInput.pressSequentially(address);
    await this.page.waitForTimeout(1000);
    // Try to select the address option that contains the address string
    const options = this.editCustomerDialog.locator('.rsbPopup .rsbList li');
    const count = await options.count();
    let found = false;
    for (let i = 0; i < count; i++) {
      const optionText = (await options.nth(i).textContent())?.trim();
      if (optionText && optionText.includes(address)) {
        await options.nth(i).waitFor({ state: 'visible' });
        await options.nth(i).click();
        found = true;
        break;
      }
    }
    // Wait for Cotality logo to appear (indicates address enrichment is complete)
    await this.page.locator('#LossAddressClipIcon').waitFor({ state: 'visible', timeout: 5000 });
  }

  async checkSameAddress() {
    await this.sameAddressCheckbox.waitFor({ state: 'visible' });
    await this.sameAddressCheckbox.scrollIntoViewIfNeeded();
    await this.sameAddressCheckbox.check();
  }

  async fillYearBuiltInDialog(year) {
    await this.yearBuiltInputDialog.waitFor({ state: 'visible' });
    await this.yearBuiltInputDialog.fill(year);
  }

  async getCustomerName() {
    await this.customerInfoPanel.waitFor({ state: 'visible', timeout: 15000 });

    const panelText = await this.customerInfoPanel.innerText();
    const nameMatch = panelText.match(/Customer\s+(.+)/i);

    if (nameMatch && nameMatch[1]) {
      const name = nameMatch[1].trim();
      return name;
    }
  }

  async goToExternalParticipantsTab() {
    // Wait for the iframe to be attached and available
    await this.page
      .locator('iframe[name="RadWindow_Common"]')
      .waitFor({ state: 'attached', timeout: 15000 });
    let frame = null;
    for (let i = 0; i < 30; i++) {
      // up to 3s
      frame = this.page.frame({ name: 'RadWindow_Common' });
      if (frame) break;
      await this.page.waitForTimeout(100);
    }
    if (!frame) throw new Error('RadWindow_Common iframe not found after waiting');
    // The tab is likely a link or button with the text "External Participants"
    const tab = frame.locator('a,button,[role="tab"]', { hasText: 'External Participants' });
    await tab.first().waitFor({ state: 'visible', timeout: 10000 });
    await tab.first().click();
  }

  async validateExternalParticipantLabels() {
    await this.goToExternalParticipantsTab();
    // Wait for the tab content to load
    await this.page.waitForTimeout(2000);

    // Validate List of Labels
    const labelsToCheck = [
      this.brokerLabel,
      this.brokerContactLabel,
      this.insuranceCarrierLabel,
      this.primaryAdjusterLabel,
      this.primaryFieldAdjusterLabel,
      this.propertyManagementLabel,
      this.propertyMgmtContactLabel,
      this.contractorCompanyLabel,
      this.contractorContactLabel,
      this.independentFirmLabel,
      this.independentAdjusterLabel,
      this.publicFirmLabel,
      this.publicAdjusterLabel,
      this.primaryMortgageLabel,
      this.secondaryMortgageLabel,
      this.tpaCompanyLabel,
      this.tpaLabel,
      this.billToCompanyLabel,
      this.billToContactLabel,
    ];

    // Validate that each label is visible with scrolling
    for (const label of labelsToCheck) {
      try {
        await label.scrollIntoViewIfNeeded();
        await label.waitFor({ state: 'visible', timeout: 8000 });
      } catch (error) {
        // If label not found, log for debugging
        console.error(`Failed to validate label:`, error);
        throw error;
      }
    }
  }
  /**
   * Opens the Cotality Data modal for the current job.
   */
  async openCotalityDataModal() {
    await this.ensureCotalityDataReady();
    await this.cotalityButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.cotalityButton.click();
    await this.cotalityIframe.locator('body').waitFor({ state: 'visible', timeout: 10000 });
  }

  /**
   * Waits for the roof icon to be visible in the Cotality Data modal (indicates roof data is loaded).
   */
  async waitForRoofIcon() {
    try {
      // Wait for roof icon with extended timeout for slow data loading
      await this.roofIcon.waitFor({ state: 'visible', timeout: 30000 });
    } catch {
      // Fallback: wait for modal title as indication data loaded
      const modalTitle = this.cotalityIframe.getByText('Cotality Enriched Data', { exact: false });
      await modalTitle.waitFor({ state: 'visible', timeout: 30000 });
    }
  }

  /**
   * Waits for the roof material field to be visible and returns its text content.
   * @returns {Promise<string>} The text content of the roof material field.
   */
  async getRoofMaterialFieldText() {
    // Add extra wait for iframe content to fully load
    await this.page.waitForTimeout(2000);
    await this.roofMaterialField.waitFor({ state: 'visible', timeout: 15000 });
    return (await this.roofMaterialField.textContent())?.trim();
  }
  /**
   *  Checks if Cotality Data button is enabled.
   */
  async ensureCotalityDataReady() {
    await this.cotalityButton.waitFor({ state: 'visible', timeout: 10000 });

    if (!(await this.cotalityButton.isEnabled())) {
      // Open dialog
      await this.clickEditCustomerInfo();
      await this.editDialog.waitFor({ state: 'visible', timeout: 5000 });

      // Clear and fill the address field in Job Address Information (inside iframe)
      const addressToEnter = '6907 KEYSER WAY # 6907B';
      const jobAddressInput = this.dialogFrame.locator('#textBox_LossAddress_Input');
      await jobAddressInput.waitFor({ state: 'visible' });
      await jobAddressInput.clear();
      await jobAddressInput.pressSequentially(addressToEnter);
      await this.page.waitForTimeout(2000);

      // Wait for autocomplete dropdown and select the matching address
      const options = this.dialogFrame.locator('.rsbPopup .rsbList li');
      try {
        await options.first().waitFor({ state: 'visible', timeout: 5000 });
        const count = await options.count();
        for (let i = 0; i < count; i++) {
          const optionText = (await options.nth(i).textContent())?.trim();
          if (optionText && optionText.includes('6907B')) {
            await options.nth(i).click();
            break;
          }
        }
        await this.page.waitForTimeout(500);
      } catch {
        // If no dropdown, just continue
      }

      // Click save
      await this.dialogSaveButton.waitFor({ state: 'visible' });
      await this.dialogSaveButton.click();

      // Wait for dialog to close and page to fully update
      await this.page.waitForLoadState('load');
      await this.page.waitForLoadState('domcontentloaded');
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(2000);
    }
  }
  /**
   * Opens the links popup if not already visible
   */
  async openLinksPopup() {
    // Button should be visible after tab click; wait for it directly
    await this.openLinksButton.waitFor({ state: 'visible', timeout: 20000 });
    await this.openLinksButton.click({ force: true });

    // Wait for iframe to attach and load
    await this.page.locator('#LinksIframe').waitFor({ state: 'attached', timeout: 15000 });
    await this.page.waitForLoadState('networkidle');

    // Now wait for the popup/button inside the iframe
    await this.linksPopup.waitFor({ state: 'visible', timeout: 10000 });
  }
  /**
   * Adds and verifies a DocuSketch link in the Links popup iframe.
   * @param {string} title - The title for the link.
   * @param {string} url - The URL for the link.
   * @param {object} expect - The Playwright expect object.
   */
  async addAndVerifyDocuSketchLink(title, url, expect) {
    const addLink = this.page.frameLocator('#LinksIframe').getByRole('button', { name: 'Link' });
    const linkTitleInput = this.page
      .frameLocator('#LinksIframe')
      .getByRole('textbox', { name: /Enter Title/i });
    const linkUrlInput = this.page
      .frameLocator('#LinksIframe')
      .getByRole('textbox', { name: 'Enter Link' });
    const saveLinkButton = this.page.frameLocator('#LinksIframe').locator('#updateButton');
    await addLink.click();
    await linkTitleInput.fill('');
    await linkTitleInput.fill(title);
    await linkUrlInput.fill(url);
    await saveLinkButton.click();
    const docuLinkAnchor = this.linksFrame.locator(`.k-grid-content span.title > a[href="${url}"]`);
    await expect(docuLinkAnchor).toBeVisible();
  }

  /**
   * Adds and verifies a Matterport link in the Links popup iframe.
   * @param {string} title - The title for the link.
   * @param {string} url - The URL for the link.
   * @param {object} expect - The Playwright expect object.
   */
  async addAndVerifyMatterportLink(title, url, expect) {
    await this.page.frameLocator('#LinksIframe').locator('#MatterportButton').click();
    const addLink = this.page.frameLocator('#LinksIframe').getByRole('button', { name: 'Link' });
    const linkTitleInput = this.page
      .frameLocator('#LinksIframe')
      .getByRole('textbox', { name: /Enter Title/i });
    const linkUrlInput = this.page
      .frameLocator('#LinksIframe')
      .getByRole('textbox', { name: 'Enter Link' });
    const saveLinkButton = this.page.frameLocator('#LinksIframe').locator('#updateButton');
    await addLink.click();
    await linkTitleInput.fill('');
    await linkTitleInput.fill(title);
    await linkUrlInput.fill(url);
    await saveLinkButton.click();
    const matterLinkAnchor = this.linksFrame.locator(
      `.k-grid-content span.title > a[href="${url}"]`,
    );
    await expect(matterLinkAnchor).toBeVisible();
  }

  /**
   * Adds and verifies a Hover link in the Links popup iframe.
   * @param {string} title - The title for the link.
   * @param {string} url - The URL for the link.
   * @param {object} expect - The Playwright expect object.
   */
  async addAndVerifyHoverLink(title, url, expect) {
    await this.page.frameLocator('#LinksIframe').locator('#HoverButton').click();
    const addLink = this.page.frameLocator('#LinksIframe').getByRole('button', { name: 'Link' });
    const linkTitleInput = this.page
      .frameLocator('#LinksIframe')
      .getByRole('textbox', { name: /Enter Title/i });
    const linkUrlInput = this.page
      .frameLocator('#LinksIframe')
      .getByRole('textbox', { name: 'Enter Link' });
    const saveLinkButton = this.page.frameLocator('#LinksIframe').locator('#updateButton');
    await addLink.click();
    await linkTitleInput.fill('');
    await linkTitleInput.fill(title);
    await linkUrlInput.fill(url);
    await saveLinkButton.click();
    const hoverLinkAnchor = this.linksFrame.locator(
      `.k-grid-content span.title > a[href="${url}"]`,
    );
    await expect(hoverLinkAnchor).toBeVisible();
  }

  async performCopyJobWorkflow() {
    // 1. Click on copyJobButton
    await this.copyJobButton.click();

    // 2. Wait till iframe is attached and visible
    await this.page.locator('#MergeJobIframe').waitFor({ state: 'visible', timeout: 30000 });

    // 3. Click on jobNumberSearchBox
    await this.jobNumberSearchBox.click();

    // 4. Select one job number that is available
    await this.page.waitForTimeout(2000);
    await this.page.keyboard.press('ArrowDown');
    await this.page.keyboard.press('Enter');

    // 5. Click on selectRow
    // We wait for the row to become enabled/visible after selection
    await this.selectRow.waitFor({ state: 'visible' });
    await this.selectRow.click();

    // 6. Ensure button is in view and click
    const iframe = this.page.frameLocator('#MergeJobIframe');
    const sendButton = iframe.locator('#SendButton');

    await sendButton.waitFor({ state: 'visible' });

    // Use JavaScript click to bypass Playwright's iframe viewport limitations
    await sendButton.evaluate((el) => {
      el.scrollIntoView({ behavior: 'instant', block: 'center' });
      el.click();
    });

    // 7. Click on copy all checkbox (General Info)
    await this.copyAllCheckbox.waitFor({ state: 'visible' });
    await this.copyAllCheckbox.click();

    // 8. Click on notesTab then copyAllNotesCheckbox
    await this.copyJobNotesTab.click();
    await this.copyAllNotesCheckbox.waitFor({ state: 'visible' });
    await this.copyAllNotesCheckbox.click();

    // 9. Copy photoTab then copyAllPhotosCheckbox
    await this.copyJobPhotosTab.click();
    await this.copyAllPhotosCheckbox.waitFor({ state: 'visible' });
    await this.copyAllPhotosCheckbox.click();

    // 10. DocumentsTab then copyAllDocumentsCheckbox
    await this.copyJobDocumentsTab.click();
    await this.copyAllDocumentsCheckbox.waitFor({ state: 'visible' });
    await this.copyAllDocumentsCheckbox.click();

    // 11. DatesTab then copyAllDatesCheckbox
    await this.copyJobDatesTab.click();
    await this.copyAllDatesCheckbox.waitFor({ state: 'visible' });
    await this.copyAllDatesCheckbox.click();

    // 12. Click on assignments
    await this.assignments.click();

    // 13. Click on copyJobFinalButton
    await this.copyJobFinalButton.waitFor({ state: 'visible' });
    await this.copyJobFinalButton.click();
  }
}
